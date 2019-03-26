/* global s */
define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';
        var SubNavigation = function(elem) {

            var industryBlk = $('.subnavigation-industblock', elem),
                subNavTitle = $('.alt-secondary-head.image-title', elem).text(),
                industryList = $('#subnavigation-industrieslist', elem),
                subNavMain = $('#main-sub', elem),
                subNavAccordian = $('.subnavigation-accordiantrigger', elem),
                subNavChildAccordian = $('.subnavigation-accordiantrigger-sublevels', elem),
                activeItem = $(".current-true", elem),
                activeItemBlk = $('.subnavigation-accordiancontainer', activeItem.closest('li')),
                activeItemBlkLevel2 = activeItem.closest('.subnavigation-accordiancontainer'),
                activeItemSubBlk3 = activeItem.closest('.subnavigation-accordiancontainer-sublevels'),
                activeItemSubBlk2 = $('.subnavigation-accordiancontainer-sublevels', activeItem.closest('li'));

            if (activeItemBlk[0] && $('li', activeItemBlk).length) {
                activeItemBlk.css({
                    'display': 'block'
                });
                activeItemBlk.prev('span').removeClass('icon-chevron-down').addClass('icon-chevron-up');
            }
            if (activeItemBlkLevel2[0]) {
                if ($('li', activeItemSubBlk2).length) {
                    activeItemSubBlk2.css({
                        'display': 'block'
                    });
                }
                activeItemBlkLevel2.css({
                    'display': 'block'
                });
                activeItemBlkLevel2.prev('span').removeClass('icon-chevron-down').addClass('icon-chevron-up');
                activeItemSubBlk2.prev('span').removeClass('icon-chevron-down').addClass('icon-chevron-up');
            }
            if (activeItemSubBlk3[0]) {
                activeItemSubBlk3.css({
                    'display': 'block'
                });
                activeItemBlkLevel2.css({
                    'display': 'block'
                });
                activeItemSubBlk3.prev('span').removeClass('icon-chevron-down').addClass('icon-chevron-up');
                activeItemBlkLevel2.prev('span').removeClass('icon-chevron-down').addClass('icon-chevron-up');

            }

            $('.template').on('click', '#main-sub', function(e) {
                e.preventDefault();
                var mainLink = $(this),
                    mainContainer = $('.first-menu');
                if (mainContainer.is(':hidden')) {
                    mainLink.addClass('icon-chevron-up').removeClass('icon-chevron-down');
                    mainContainer.slideDown("slow");
                    $('.first-list').removeClass('pad-bottom');
                } else {
                    mainLink.removeClass('icon-chevron-up').addClass('icon-chevron-down');
                    mainContainer.slideUp("slow");
                    $('.first-list').addClass('pad-bottom');
                }
                return false;

            });



            $('.template').on('click', '.subnavigation-accordiantrigger', function(e) {

                e.preventDefault();

                var activeLink = $(this),
                    activeContainer = $('.subnavigation-accordiancontainer', activeLink.parent());
                if (activeContainer.is(':hidden')) {
                    activeLink.addClass('icon-chevron-up').removeClass('icon-chevron-down');
                    activeContainer.slideDown("slow");
                } else {
                    activeLink.removeClass('icon-chevron-up').addClass('icon-chevron-down');
                    activeContainer.slideUp("slow");
                }
                return false;

            });


            $('.template').on('click', '.subnavigation-accordiantrigger-sublevels', function(e) {
                e.preventDefault();
                var subActiveLink = $(this),
                    subActiveContainer = $('.subnavigation-accordiancontainer-sublevels', subActiveLink.parent());
                if (subActiveContainer.is(':hidden')) {
                    subActiveLink.addClass('icon-chevron-up').removeClass('icon-chevron-down');
                    subActiveContainer.slideDown("slow");
                } else {
                    subActiveLink.removeClass('icon-chevron-up').addClass('icon-chevron-down');
                    subActiveContainer.slideUp("slow");
                }
                return false;

            });


            /*
             * Attaching event based on template level, because inner elements will get repainted dynamically  in
             * in different cell for mobile and direct reference to those elements will not work
             * related with mobile reflow.
             */
            $('.template').on('click', '.subnavigation-industblock .icon-dots, .subnavigation-industriesexpand', function(e) {
                $('.subnavigation-industblock .icon-dots').remove();
                $('.subnavigation-industblock').addClass('expand-reset');
                $('#subnavigation-industrieslist', '.template').slideDown("slow");
            });

            $('.template').on('keydown', '.subnavigation-industriesexpand', function(e) {
                if (e.which === 32) {
                    $('.subnavigation-industblock .icon-dots').remove();
                    $('.subnavigation-industblock').addClass('expand-reset');
                    $('#subnavigation-industrieslist', '.template').slideDown("slow");
                }
            });

            $('.subnavigation-list-group-item', elem).on('keydown', function(e) {
                if (e.which === 32) {
                    var activeLink = $(this).find(".subnavigation-accordiantrigger"),
                        activeContainer = $('.subnavigation-accordiancontainer', activeLink.parent());
                    if (activeContainer.is(':hidden')) {
                        activeLink.addClass('icon-chevron-up').removeClass('icon-chevron-down');
                        activeContainer.slideDown("slow");
                    } else {
                        activeLink.removeClass('icon-chevron-up').addClass('icon-chevron-down');
                        activeContainer.slideUp("slow");
                    }
                    return false;
                }
            });

            $('li a', industryList).filter(function() {
                return $.trim($(this).text().toUpperCase()) === $.trim(subNavTitle.toUpperCase());
            }).css({
                'font-weight': 'bold'
            });

            var trck = new Tracking(elem, 'SubNavigation');
            $(document).trigger('template.loaded');
        };
        return SubNavigation;
    });