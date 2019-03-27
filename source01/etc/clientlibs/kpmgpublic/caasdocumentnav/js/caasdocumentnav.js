define(['jquery', 'tracking'],
function($, Tracking) {
    'use strict';

    var CaaSDocumentNav = function(elem) {

        var subNavChildAccordian = $('.subnavigation-accordiantrigger-sublevels', elem),
        activeItem = $(".current-true", elem),
        activeItemBlk = $('.subnavigation-accordiancontainer', activeItem.closest('li')),
        activeItemBlkLevel2 = activeItem.closest('.subnavigation-accordiancontainer'),
        activeItemSubBlk3 = activeItem.closest('.subnavigation-accordiancontainer-sublevels'),
        activeItemSubBlk2 = $('.subnavigation-accordiancontainer-sublevels', activeItem.closest('li'));

        function handleTitleColorChange() {
            if( $('.caas-page-title').find('a').hasClass('current-true') ) {
                $('.caas-page-title').css('background', "#005EB8");
            }
            else {
                $('.caas-page-title').css('background', "none");
            }
        }

        function anyChildSelected() {
            $('.first-menu li>a').each( function(i, element) {
                if( $(this).hasClass('current-true') ) {
                    $(this).closest('.parent-not-selected').css('background', "#005EB8");
                }
            });
        }

        function validateFirstLevel() {
            $('.subnavigation-list-group.first-menu>li>a').each( function(i, element) {
                if( $(this).hasClass('current-true') ) {
                    $(this).parent().css('background', "#005EB8");
                }
                else {
                    $(this).parent().css('background', "#333333");
                }
            });
        }

        // handling first level menu color changes for caas subnavigation selection
        function handleMenuColorChange() {
            if( $('.first-menu').find('>li').length > 0 ) {
                validateFirstLevel();
                anyChildSelected();
            }
        }

        // check by defalut which page is selected
        handleTitleColorChange();
        handleMenuColorChange();

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


        // Keep the following lines at the bottom of the Caasdocumentnav function
        var trck = new Tracking(elem, 'CaaSDocumentNav');
        $(document).trigger('template.loaded');
    };

    return CaaSDocumentNav;
}
);
