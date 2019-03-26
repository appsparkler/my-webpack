define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var LoginDone = function(elem) {
			// Keep the following lines at the bottom of the LoginDone function
            var trck = new Tracking(elem, 'LoginDone');
			$(document).trigger('template.loaded');
        };

        return LoginDone;
    }
);