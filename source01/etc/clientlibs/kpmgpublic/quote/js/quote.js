define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var Quote = function(elem) {
			// Keep the following lines at the bottom of the Quote function
            var trck = new Tracking(elem, 'Quote');
			$(document).trigger('template.loaded');
        };

        return Quote;
    }
);