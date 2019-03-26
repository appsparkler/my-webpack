define(['jquery', 'tracking', 'helpers'],
    function($, Tracking, Helpers) {
        'use strict';

        var TouchPromotional = function(elem) {
            var publishDate = $(".format-publish-date", elem),
                _date = publishDate.attr("data-publishedDate");

            if(window.calanderProperties && _date && window.dateFormatProperties) {
                publishDate.html(Helpers.dateFormat(_date, window.calanderProperties, window.dateFormatProperties));
            } else if(_date) {
                publishDate.html(_date);
            }
            
			// Keep the following lines at the bottom of the TouchPromotional function
            var tracking = new Tracking(elem, 'TouchPromotional');
			$(document).trigger('template.loaded');
        };

        return TouchPromotional;
    }
);
