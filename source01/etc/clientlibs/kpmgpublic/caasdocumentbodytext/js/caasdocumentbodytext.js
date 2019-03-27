define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var CaaSDocumentBodyText = function(elem) {
			// Keep the following lines at the bottom of the Caasdocumentbodytext function
            var trck = new Tracking(elem, 'CaaSDocumentBodyText');
			$(document).trigger('template.loaded');
        };

        return CaaSDocumentBodyText;
    }
);
