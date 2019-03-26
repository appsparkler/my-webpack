define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchPopularposts = function(elem) {
            var $popularPostsList = $('.popular-posts-list', elem);

            function initializeComponent() {
                if($popularPostsList.data('type') === 'auto') {
                    console.log('Make S&P call and load component');
                } else {
                    $popularPostsList.removeClass('hidden');
                }
            }

            initializeComponent();

			// Keep the following lines at the bottom of the TouchPopularposts function
            var trck = new Tracking(elem, 'TouchPopularposts');
			$(document).trigger('template.loaded');
        };

        return TouchPopularposts;
    }
);
