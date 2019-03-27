define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchBreadcrumb = function(elem) {
			// Keep the following lines at the bottom of the TouchBreadcrumb function
            var trck = new Tracking(elem, 'TouchBreadcrumb');
			$(document).trigger('template.loaded');
        };

        return TouchBreadcrumb;
    }
);