define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchBloglikesandshare = function(elem) {
			// Keep the following lines at the bottom of the TouchBloglikesandshare function
            var trck = new Tracking(elem, 'TouchBloglikesandshare');
			$(document).trigger('template.loaded');
        };

        return TouchBloglikesandshare;
    }
);