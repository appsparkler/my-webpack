/* global s */
define(['jquery', 'clamp', 'tracking'],
    function($, $clamp, Tracking) {
        'use strict';
        var ContactPromo = function(elem) {
            var contactClick = false;
            $(".module-contactpromo .contact-modal, elem").on('keydown', function(e) {
                if (e.which === 13) {
                    $(this).trigger("click");
                }
            });

            $(".module-contactpromo .contact-modal, elem").on('focus', function(e) {
                $(this).addClass('focusOutline');
            });

            $('.people-connect', elem).on('click', function(e){
                contactClick = true;
            });

            var isFlexTemplate = $('.module-tmpl-insights-flex').find('.module-contactpromo').length ||
                                 $('.module-tmpl-industries-flex').find('.module-contactpromo').length ||
                                 $('.module-tmpl-campaigns-flex').find('.module-contactpromo').length ||
                                 $('.module-tmpl-services-flex').find('.module-contactpromo').length;

            if( isFlexTemplate ) {
                $('.inner-container .module-contactpromo').each( function(i, element) {
                    $(this).parent().addClass('flex-cell-hover');
                    $(this).closest('.flex-cell-hover').attr('title', $(this).find('.contactpromo-item a').attr('title'));
                });
            }
            else {
                if(!window.kpmgPersonalize.misc.isAuthor) {
                    $('.inner-container').find('.module-contactpromo').parent().addClass('promotional-cell-hover');
                    $('.inner-container').find('.module-contactpromo').parent().attr('title', $('.inner-container .module-contactpromo').find('.contactpromo-item a').attr('title'));
                }
            }

            $(elem).closest('.promotional-cell-hover, .flex-cell-hover').on('click', function(e) {
                setTimeout( function() {
                    handleCellClick(e);
                }, 0);
            });

            $(".module-contactpromo .contact-modal, elem").on('blur', function(e) {
                $(this).removeClass('focusOutline').attr("tabindex", "0");
            });

            function handleCellClick(e) {
                if(!contactClick) {
                    var href = $('.module-contactpromo .contactpromo-item').find('a').attr('href');
                    e.stopImmediatePropagation();
                    if($(e.target).is("div") && href){
                        window.location.href = href;
                    }
                } else {
                    contactClick = false;
                }
            }
            // Keep the following line at the bottom of the ContactPromo function
            var trck = new Tracking(elem, 'ContactPromo');
            $(document).trigger('template.loaded');
        };
        return ContactPromo;
    }
);
