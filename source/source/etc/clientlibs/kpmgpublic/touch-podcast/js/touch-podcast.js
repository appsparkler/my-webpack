define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchPodcast = function(elem) {
			// Keep the following lines at the bottom of the TouchPodcast function
            var trck = new Tracking(elem, 'TouchPodcast');
			$(document).trigger('template.loaded');
        };

        return TouchPodcast;
    }
);