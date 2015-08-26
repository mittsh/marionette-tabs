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
