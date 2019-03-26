define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchColumncontrol = function(elem) {
			// Keep the following lines at the bottom of the TouchColumncontrol function
            var trck = new Tracking(elem, 'TouchColumncontrol');
			$(document).trigger('template.loaded');
        };

        return TouchColumncontrol;
    }
);