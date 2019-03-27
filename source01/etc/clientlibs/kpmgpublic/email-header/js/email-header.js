define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var EmailHeader = function(elem) {
			// Keep the following lines at the bottom of the EmailHeader function
            var trck = new Tracking(elem, 'EmailHeader');
			$(document).trigger('template.loaded');
        };

        return EmailHeader;
    }
);