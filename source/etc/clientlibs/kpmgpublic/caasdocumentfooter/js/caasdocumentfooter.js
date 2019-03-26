define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var CaaSDocumentFooter = function(elem) {
			// Keep the following lines at the bottom of the Caasdocumentfooter function
            var trck = new Tracking(elem, 'CaaSDocumentFooter');
			$(document).trigger('template.loaded');
        };

        return CaaSDocumentFooter;
    }
);
