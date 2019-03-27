define(['jquery', 'tracking', 'helpers', 'personalizationUtils'],
    function($, Tracking, Helpers,personalizationUtils) {
        'use strict';

        var AuthorSummary = function(elem) {
            var publishDate = $(".publish-date", elem),
                _date = publishDate.attr("data-publishedDate");

            if(window.calanderProperties && _date && window.dateFormatProperties) {
                publishDate.html(Helpers.dateFormat(_date, window.calanderProperties, window.dateFormatProperties));
            } else if(_date) {
                publishDate.html(_date);
            }
            var domainArr =  window.location.href.split("/");
            var authorUrl = domainArr[0] + '//' + domainArr[2] + document.getElementById("authorDetailsUrl").getAttribute("data-authorUrl");

            $("#authorDetailsUrl").on('click', function(){
                if(window.kpmgPersonalize.personalizationUtils.commonUtils.isMobile()){
                    location.href = authorUrl;
                }
            });

			// Keep the following lines at the bottom of the TouchPostBody function
            var trck = new Tracking(elem, 'AuthorSummary');
			$(document).trigger('template.loaded');
        };

        return AuthorSummary;
    }
);
