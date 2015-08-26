// Marionette Tabs
// ----------------------------------
// v0.2.0
//
// Copyright (c)2015 Stu Kabakoff
// Distributed under MIT license
//
// https://github.com/compstak/marionette-tabs

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', 'backbone.marionette',], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('underscore'), require('backbone'), require('backbone.marionette'));
  } else {
    root.Marionette.Tabs = factory(root._, root.Backbone, root.Backbone.Marionette);
  }

}(this, function(_, Backbone, Marionette) {
  'use strict';

  var Tab = {};

  Tab.Item = Backbone.Model.extend({
      initialize: function (options) {
          if (!_.isString(options.id)) {
              throw new Error('TabItem id must be a string. It is a ' + typeof options.id);
          }
  
          if (!_.isString(options.title)) {
              throw new Error('TabItem title of the tab with id "' + options.id + '" is not a string. It is a ' + typeof options.title);
          }
  
          if (!options.ContentView && !options.ContentView.render) {
              throw new Error('TabItem ContentView of the tab with id "' + options.id + '" does not have a render function');
          }
  
          return Backbone.Model.prototype.initialize.call(this, options);
      }
  });
  
  Tab.ItemView = Marionette.ItemView.extend({
      template: function (model) {
          return '<span>' + model.title + '</span>';
      },
  
      tagName: 'li',
  
      events: {
          'click': function (event) {
              event.preventDefault();
              this.trigger('select', this);
          }
      }
  
  });
  
  Tab.Collection = Backbone.Collection.extend({
      model: Tab.Item
  });
  
  Tab.CollectionView = Marionette.CollectionView.extend({
  
      tagName: 'ul',
  
      className: 'tab-item-view',
  
      itemView: Tab.ItemView,
  
      itemEvents: {
          'select': function (eventName, itemView) {
              console.log('triggering select');
              this.trigger('change', itemView);
          }
      }
  
  });
  
  Tab.Behavior = Marionette.Behavior.extend({
  
      initialize: function () {
          if (!this.view.tabs) {
              throw new Error('Tried to add TabbedBehavior to a layout without a "tabs" region.');
          }
          if (!this.view.content) {
              throw new Error('Tried to add TabbedBehavior to a layout without a "content" region.');
          }
          if (!this.options.tabs) {
              throw new Error('Tried to add TabbedBehavior to a layout wihtout providing a "tabs" collection.');
          }
          this.currentView = null;
      },
  
      defaults: {
          tabCollectionView: Tab.CollectionView
      },
  
      onRender: function () {
  
          var self = this;
  
          var extendObject = {
              collection: this.options.tabs
          };
  
          if (this.options.tabItemView) {
              extendObject.itemView = this.options.tabItemView;
          }
          var tabsView = new this.options.tabCollectionView(extendObject);
  
          this.view.tabs.show(tabsView);
  
          tabsView.on('change', function (tabView) {
              self.switchTabs(tabView);
          });
  
          var defaultTab;
  
          if (this.options.defaultTab) {
              tabsView.children.forEach(function (childView) {
                  if (childView.model.id === self.options.defaultTab) {
                      defaultTab = childView;
                  }
              });
          }
          if (!defaultTab) {
              defaultTab = tabsView.children.first();
          }
  
          if (defaultTab) {
              this.switchTabs(defaultTab);
          } else {
              this.listenToOnce(this.options.tabs, 'add', function () {
                  this.switchTabs(tabsView.children.first());
              }.bind(this));
          }
      },
  
      switchTabs: function (tabView) {
  
          var tab = this.options.tabs.findWhere({id: tabView.model.id});
  
          if (this.currentTab) {
              this.currentTab.$el.removeClass('selected');
          }
          this.currentTab = tabView;
  
          var options;
          if (this.options.getOptions) {
              options = this.options.getOptions(tabView.model);
          } else if (this.options.options) {
              options = this.options.options;
          }
  
          tabView.$el.addClass('selected');
          var newView = new (tab.get('ContentView'))(options);
          this.view.content.show(newView);
      }
  
  });
  

  return Tab;
}));
