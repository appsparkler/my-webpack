define(['jquery','tracking', 'responsiveTabs'], function ($,Tracking) {
    'use strict';
    var AlumniLinks = function (elem) {
        // Keep the following line at the bottom of the AlumniLinks function
        $('.module-alumnilinks-tabs').easyResponsiveTabs({
            type: 'vertical',
            width: 'auto',
            fit: true,
            activate: function(event) {
                var tab = $(this);
                var tabPanelId = tab.attr("responsive-tab-aria-controls");
                $(".resp-tabs-container .resp-tab-content[aria-labelledby=" + tabPanelId + "]").trigger('focus').addClass("focusOutline");
            }
        });

        $(".resp-tabs-container .resp-tab-content", elem).on("blur", function(e) {
            $(this).removeClass("focusOutline");
        });

        /* Handle tab and shift+tab within the tabs and tabpanels */
        $(".subRegions .countryName a", elem).on("keydown", function(e) {
            var activeTab = $(".resp-tab-item.resp-tab-active");
            var subRegion = $(this).parents(".subRegions");
            var countries = $(this).parents(".countries");
            if (e.shiftKey && e.which === 9) {
                if ($(this).data("index") === 0) { // first country in the list
                    e.preventDefault();
                    $(activeTab).find("a").trigger('focus');
                }
            } else if (e.which === 9) {
                if ($(this).data("index") === $(".countryName", countries).length - 1) { // last country in the list
                    if ($(subRegion).data("index") !== $(".subRegions", elem).length - 1) { // not the last tabpanel
                        e.preventDefault();
                        $(activeTab).next(".resp-tab-item").find("a").trigger('focus');
                    }
                }
            }
        });

        /* Handle moving out of country section if press tab on last tab item which is not active */
        $(".resp-tab-item a", elem).on("keydown", function(e) {
            if (e.which === 9) {
                if ((!$(this).parent(".resp-tab-item").hasClass("resp-tab-active")) && ($(this).parent(".resp-tab-item").data("index") === $(".resp-tab-item", elem).length - 1)) { // last tabpanel
                    e.preventDefault();
                    $(".alumnilinks-tab-exit").trigger('focus');
                }
            }
        });

        if ($(document).width() <= 641) {
            $(".resp-tab-content").first().css("display", "none");
            $(".resp-tabs-container").css("min-width", "auto");
            $(".resp-accordion").first().removeClass("resp-tab-active");
        }

        $(".resp-accordion").on('click', function () {
            if($(this).hasClass('resp-tab-active')) {
                $(".resp-accordion").find('.right-container').children('.resp-arrow').removeClass('icon-chevron-up');
                $(".resp-accordion").find('.right-container').children('.resp-arrow').addClass('icon-chevron-down');
                $(this).find('.right-container').children('.resp-arrow').removeClass('icon-chevron-down');
                $(this).find('.right-container').children('.resp-arrow').addClass('icon-chevron-up');
            } else {
                $(this).find('.right-container').children('.resp-arrow').removeClass('icon-chevron-up');
                $(this).find('.right-container').children('.resp-arrow').addClass('icon-chevron-down');
            }
        });

        /* Commented by Mahesh on 19/10/2015 - KPMG BrandRefresh
        $(".resp-tabs-container h2").each(function (i, item) {
            if ($(this).hasClass('resp-tab-active')) {
                $(this).find('.right-container').children('.resp-arrow').removeClass('icon-chevron-up');
            } else {
                $(this).find('.right-container').children('.resp-arrow').addClass('icon-chevron-down');
            }
        });


        $(".resp-accordion").on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('resp-tab-active')) {
                console.log("active");
                $(this).find('.right-container').children('.resp-arrow').removeClass('icon-chevron-up');
                $(this).find('.right-container').children('.resp-arrow').addClass('icon-chevron-down');
            } else {
                console.log('inactive');
                $(this).find('.right-container').children('.resp-arrow').removeClass('icon-chevron-down');
                $(this).find('.right-container').children('.resp-arrow').addClass('icon-chevron-up');
            }
        });*/
        /*$(".tabbedComponentTab").each(function (i, item) {
            var tab = $(item);
            if (tab.hasClass('resp-tab-active')) {
                tab.children().children().first().children().addClass('icon-chevron-right');
            } else {
                tab.children().children().first().children().removeClass('icon-chevron-right');
            }
        });
        $(".resp-tab-item").on('click', function (e) {
            e.preventDefault();
            $(".tabbedComponentTab").each(function (i, item) {
                var tab = $(item);
                if (tab.hasClass('resp-tab-active')) {
                    tab.children().children().first().children().addClass('icon-chevron-right');
                } else {
                    tab.children().children().first().children().removeClass('icon-chevron-right');
                }
            });
        });*/
        function equalHeight(container) {

            var currentTallest = 0,
                currentRowStart = 0,
                rowDivs = [],
                $el,
                topPosition = 0,
                currentDiv = 0;

            $(container).each(function() {

                $el = $(this);
                $($el).height('auto');
                topPosition = $el.position().top;

                if (currentRowStart !== topPosition) {
                    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                        rowDivs[currentDiv].height(currentTallest);
                    }
                    rowDivs.length = 0; // empty the array
                    currentRowStart = topPosition;
                    currentTallest = $el.height();
                    rowDivs.push($el);
                } else {
                    rowDivs.push($el);
                    currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
                }
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
            });
        }
        if($(document).width() >= 640) {
            $('.resp-tab-content').css('display','block');
            equalHeight('.resp-tab-content .countryName');
            $('.resp-tab-content').css('display','none');
            $('.resp-tab-content.resp-tab-content-active').css('display','block');
        }
        // Keep the following line at the bottom of the Address function
        var trck = new Tracking(elem, 'AlumniLinks');
        $(document).trigger('template.loaded');
    };
    return AlumniLinks;
});