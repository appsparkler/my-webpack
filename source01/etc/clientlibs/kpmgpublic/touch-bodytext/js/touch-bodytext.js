define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchBodytext = function(elem) {
			// Keep the following lines at the bottom of the TouchBodytext function
            var trck = new Tracking(elem, 'TouchBodytext');
			$(document).trigger('template.loaded');
        };

        return TouchBodytext;
    }
);