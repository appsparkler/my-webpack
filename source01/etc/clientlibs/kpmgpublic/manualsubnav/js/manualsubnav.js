define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var Manualsubnav = function(elem) {
			// Keep the following lines at the bottom of the Manualsubnav function
            var trck = new Tracking(elem, 'Manualsubnav');
			$(document).trigger('template.loaded');
        };

        return Manualsubnav;
    }
);