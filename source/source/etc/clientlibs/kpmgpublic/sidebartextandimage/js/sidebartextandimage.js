define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var Sidebartextandimage = function(elem) {
			// Keep the following lines at the bottom of the Sidebartextandimage function
            var trck = new Tracking(elem, 'Sidebartextandimage');
			$(document).trigger('template.loaded');
        };

        return Sidebartextandimage;
    }
);