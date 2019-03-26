define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var CaasDocumentBreadCrumb = function(elem) {
			// Keep the following lines at the bottom of the Caasdocumentbreadcrumb function
            var trck = new Tracking(elem, 'CaasDocumentBreadCrumb');
			$(document).trigger('template.loaded');
        };

        return CaasDocumentBreadCrumb;
    }
);
