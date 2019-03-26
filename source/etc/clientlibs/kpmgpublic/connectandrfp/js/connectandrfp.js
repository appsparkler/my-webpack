/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var ConnectAndRFP = function (elem) {
                var trck = new Tracking(elem, 'ConnectAndRFP');
                $(document).trigger('template.loaded');
                $('.rfp-loading',elem).addClass('hide').removeClass('show');
                $('.connectandrfp-rfp span',elem).removeClass('hide');

                $(".module-connectandrfp .contact-modal, elem").on('keydown', function(e) {
                    if (e.which === 13) {
                        $(this).find('span').trigger("click");  
                    }

                });

                $(".module-connectandrfp .rfp-modal, elem").on('keydown', function(e) {
                    if (e.which === 13) {
                        $(this).find('span').trigger("click");
                    }
                });

                $(".module-connectandrfp .contact-modal, elem").on('focus', function(e) {
                    $(this).addClass('focusOutline');
                });

                $(".module-connectandrfp .contact-modal, elem").on('blur', function(e) {
                    $(this).removeClass('focusOutline');
                });

                $(".module-connectandrfp .rfp-modal, elem").on('focus', function(e) {
                    $(this).addClass('focusOutline');
                });

                $(".module-connectandrfp .rfp-modal, elem").on('blur', function(e) {
                    $(this).removeClass('focusOutline');
                });
                
                var esckey = false;
                $(document).on('keydown', function(event) {
                    var keycode = (event.keyCode ? event.keyCode : event.which),
                        esckey = true;
                    if (keycode === 27) {
                        $('#kpmgModal').bs3modal('hide');
                        $('.modal-dialog a.btn-close').attr('data-dismiss', 'modal').removeClass('contact-confirm hide');
                    }
                });
            };
            return ConnectAndRFP;
        }
);