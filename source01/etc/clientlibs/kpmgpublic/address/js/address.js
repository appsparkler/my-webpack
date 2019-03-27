/* global s */
define(['jquery', 'tracking', 'clamp'],
    function($, Tracking, $clamp) {
        'use strict';
        var Address = function(elem) {
            var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
            var $clampAddress = $(".tertiary-head", elem);
            var $clampAuthor = $('.module-address .component-head');
            /*clampAddress.attr('style', '');
                if (clampAddress.is(':visible')) {
                    clampAddress.dotdotdot ({
                        ellipsis    : '...',
                        height      : 16 * 3,
                        wrap        : 'word',
                        fallbackToLetter: false,
                        watch: "window"
                    });
                }
                function clampText() {              
                    var $clampAuthor = $('.module-address .component-head');
                    $clampAuthor.each(function(data, element) {
                        $(this).attr('style', '');
                        if ($(this).is(':visible')) {
                            $(this).dotdotdot({
                                ellipsis: '...',
                                height: 16 * 3,
                                wrap: 'word',   
                                fallbackToLetter: false,
                                watch: "window"
                            });
                        }
                    }); 
         
                } */
            $clampAuthor.each(function(index, element) {
                if (!is_chrome && $(this).html().length < 81) {
                    $(this).removeClass('line-clamp');
                }
            });

            $clampAddress.each(function(index, element) {
                if (!is_chrome && $(this).html().length < 114) {
                    $(this).removeClass('line-clamp');
                }
            });
            // Keep the following line at the bottom of the Address function
            var trck = new Tracking(elem, 'Address');
            $(document).trigger('template.loaded');
            //clampText();
        };
        return Address;
    }
);