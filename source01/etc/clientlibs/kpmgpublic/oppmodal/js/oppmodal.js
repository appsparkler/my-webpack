define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var OppModal = function(elem) {
			// Keep the following lines at the bottom of the OppModal function
            var trck = new Tracking(elem, 'OppModal');
			$(document).trigger('template.loaded');
        };

        return OppModal;
    }
);