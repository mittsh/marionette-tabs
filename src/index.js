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

  // @include ./TabItem.js
  // @include ./TabItemView.js
  // @include ./TabsCollection.js
  // @include ./TabCollectionView.js
  // @include ./TabbedBehavior.js

  return Tab;
}));
