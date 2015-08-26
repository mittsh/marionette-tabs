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
