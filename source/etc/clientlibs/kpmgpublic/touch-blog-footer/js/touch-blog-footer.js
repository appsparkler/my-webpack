define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchBlogFooter = function(elem) {
			// Keep the following lines at the bottom of the TouchBlogFooter function
			$(document).trigger('template.loaded');
        };

        return TouchBlogFooter;
    }
);
