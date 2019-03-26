define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchDetails = function(elem) {
			// Keep the following lines at the bottom of the TouchDetails function
            var trck = new Tracking(elem, 'TouchDetails');
			$(document).trigger('template.loaded');
        };

        return TouchDetails;
    }
);
