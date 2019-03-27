define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var Facets = function (elem) {
                $(".nestedFacetsToogleBtn", elem).on('click', function (e) {
                    $(this).parent().children(".nestedFacets").slideToggle();
                    if ($(this).hasClass("icon-chevron-down")) {
                        $(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
                    } else {
                        $(this).addClass("icon-chevron-down").removeClass("icon-chevron-up");
                    }
                });
                if ($(document).width() <= 640) {
                    $(".component-head").addClass("mblAccordion");
                    $(".mblAccordion", elem).on('click', function () {
                        $(this).parent().children(".facetsContainer").slideToggle();
                        $(this).parent().children(".moreFacets").slideToggle();
                        if ($(this).children().hasClass("icon-chevron-down")) {
                            $(this).find('.icon-chevron-down').removeClass('icon-chevron-down').addClass('icon-chevron-up');
                        } else {
                            $(this).find('.icon-chevron-up').removeClass('icon-chevron-up').addClass('icon-chevron-down');
                        }
                    });
                }
                // Keep the following line at the bottom of the Facets function
                var trck = new Tracking(elem, 'Facets');
                $(document).trigger('template.loaded');
            };
            return Facets;
        }
);