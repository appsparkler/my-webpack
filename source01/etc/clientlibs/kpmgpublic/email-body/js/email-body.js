define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var EmailBody = function(elem) {
			// Keep the following lines at the bottom of the EmailBody function
            var trck = new Tracking(elem, 'EmailBody');
			$(document).trigger('template.loaded');
        };

        return EmailBody;
    }
);