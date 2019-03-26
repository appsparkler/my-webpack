/* global s */
/* global calanderProperties */
/* global dateFormatProperties */
define(['jquery', 'tracking', 'helpers', 'addtolibrary'],
    function ($, Tracking, Helpers, AddToLibrary) {
        'use strict';
        var ArticleIntroduction = function (elem) {
            var publishDate = $(".publish-date", elem),
                date = publishDate.attr("data-publishedDate"),
                showTime = publishDate.attr("data-showTime");

            if(calanderProperties && date && dateFormatProperties) {
                if(showTime === "true") {
                    $.merge(dateFormatProperties.fields, [{"item4":"time"}]);
                }
                publishDate.html(Helpers.dateFormat(date, calanderProperties, dateFormatProperties));
            }
            if(window.kpmgPersonalize.misc.isAuthor){
                $(".library-desktop").css({"top": "45px"});
            }

            var trck = new Tracking(elem, 'ArticleIntroduction');
            $(document).trigger('template.loaded');

            // initialize the add to library funtionality
            AddToLibrary($('.module-addtolibrary', elem));
        };
        return ArticleIntroduction;
    }
);