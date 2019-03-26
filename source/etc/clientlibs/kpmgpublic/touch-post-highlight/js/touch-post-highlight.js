define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchPostHighlight = function(elem) {

            /***
            **  When the page loads:
            **  Set digitalData.component.postHighlight=<component title> // keyfacts
            **  If the page does not contain a post highlight component, do not set anything.
            ***/
            var postTitle = $('.module-touch-post-highlight > .highlight-title');
            if( !postTitle.is(':empty') ) {
                window.digitalData.component = window.digitalData.component || {};
                window.digitalData.component.postHighlight = postTitle.text();
            }

			// Keep the following lines at the bottom of the TouchPostHighlight function
            var tracking = new Tracking(elem, 'TouchPostHighlight');
			$(document).trigger('template.loaded');
        };

        return TouchPostHighlight;
    }
);
