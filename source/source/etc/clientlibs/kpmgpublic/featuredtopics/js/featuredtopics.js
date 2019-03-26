/* global s */
define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';
        var FeaturedTopics = function(elem) {

            $(document).on('desktopBreakpoint', function() {
                $('.title.visible-lg-FeatTopic', elem).attr('style', '');
                $('.title.visible-lg-FeatTopic', elem).each(function(idx, element) {
                    $(this).dotdotdot({
                        ellipsis: '...',
                        height: 36 * 3,
                        wrap: 'word',
                        fallbackToLetter: false,
                        watch: "window"
                    });
                });
            });
        /* Clamping removed - BrandRefresh - Aparna
            $('.visible-lg-FeatTopicHead', elem).each(function(idx, element) {
                $(this).dotdotdot({
                    ellipsis: '...',
                    height: 18 * 3,
                    wrap: 'word',
                    fallbackToLetter: false,
                    watch: "window"
                });
            });
            $(document).on('mobileBreakpoint', function() {
                $('.title.visible-xs-FeatTopic', elem).attr('style', '');
                $('.title.visible-xs-FeatTopic', elem).each(function(idx, element) {
                    $(this).dotdotdot({
                        ellipsis: '...',
                        height: 22 * 3,
                        wrap: 'word',
                        fallbackToLetter: false,
                        watch: "window"
                    });
                });
            });
        */

            $('.inner-container').find('.module-featuredtopics').parent().addClass('promotional-cell-hover');
            $(elem).closest('.promotional-cell-hover').on('click', function(e) {
                var href = $('.module-featuredtopics').find('a').attr('href');
                if($(e.target).is("div") && href){
                    e.stopImmediatePropagation();
                    window.location.href = href;
                }
            });

            $('.inner-container .module-featuredtopics').closest('.promotional-cell-hover').attr('title', $('.inner-container .module-featuredtopics').find('a').attr('title'));

            var trck = new Tracking(elem, 'FeaturedTopics');
            $(document).trigger('template.loaded');
        };
        return FeaturedTopics;
    }
);
