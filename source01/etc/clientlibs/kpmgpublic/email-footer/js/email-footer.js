define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var EmailFooter = function(elem) {
			// Keep the following lines at the bottom of the EmailFooter function
            var trck = new Tracking(elem, 'EmailFooter');
			$(document).trigger('template.loaded');
        };

        return EmailFooter;
    }
);