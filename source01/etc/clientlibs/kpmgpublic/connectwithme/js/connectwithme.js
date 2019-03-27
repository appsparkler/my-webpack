/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var ConnectWithMe = function (elem) {
                var telNumber = $('.usrtel', elem).html();
                function truncateString(str, length) {
                    if(str!==undefined){
                        return str.length > length ? str.substring(0, length) : str;
                    }
                }
                var truncatedTelNumber = truncateString($.trim(telNumber), 19);
                $('.usrtel', elem).html(truncatedTelNumber);
                $('.tel-anchor', elem).attr('title', truncatedTelNumber);
                $('.rfp-loading',elem).addClass('hide').removeClass('show');
                $('.connectwithme-rfp span',elem).removeClass('hide');
                $(".module-connectwithme .people-modal, elem").on('keydown', function(e) {
                    if (e.which === 13) {
                        $(this).find('span').trigger("click");
                    }
                });
                if($(".module-connectwithme .people-modal, elem").hasClass('focusOutline')) {
                    $('.tel-anchor').parent().removeClass('focusOutline');
                }

                $(".module-connectwithme .people-modal, elem").on('focus', function(e) {
                    $(this).addClass('focusOutline');
                });

                $(".module-connectwithme .people-modal, elem").on('blur', function(e) {
                    $(this).removeClass('focusOutline');
                });

                $('.tel-anchor').on('keydown', function(e) {
                    $(this).find('input').attr('tabindex',"-1");
                    if (e.which === 9) {
                        $(this).parent().removeClass('focusOutline').removeAttr('tabindex');
                        $(this).removeAttr('tabindex');
                        $(".people-modal", elem).addClass('focusOutline').attr('tabindex',0);
                    }

                    if (e.shiftKey && e.which === 9) {
                        $(this).parent().removeClass('focusOutline');
                        $(".people-modal", elem).removeClass('focusOutline');
                        $(this).parents(".list-group-item").removeClass("focusOutline");
                    }
                });

                $(".module-connectwithme .submit_focus, elem").on('keydown', function(e) {
                    if (e.which === 13) {
                        $(this).find('span').trigger("click");
                    }
                });

                $(".module-connectwithme .submit_focus, elem").on('focus', function(e) {
                    $(this).addClass('focusOutline');
                });

                $(".module-connectwithme .submit_focus, elem").on('blur', function(e) {
                    $(this).removeClass('focusOutline');
                });
                var trck = new Tracking(elem, 'ConnectWithMe');
                $(document).trigger('template.loaded');             
            };
            return ConnectWithMe;
        }
);