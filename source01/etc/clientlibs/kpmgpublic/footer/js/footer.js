/* global privacyJSON */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var Footer = function (elem) {
                var flag = false;
				if($(window).width() > 641) {
                    var getLang = $('html').attr('lang');
                    if(getLang === 'ko-KR' || getLang === 'ja-JP' || getLang === 'zh-CN' || getLang === 'zh-TW') {
                        $('.links .desktop-only li' , elem).each(function(){var _this = $(this); _this.css('width', _this.width() + 7);});
                    }
                    else {
                        $('.links .desktop-only li' , elem).each(function(){var _this = $(this); _this.css('width', _this.width() + 5);});
                    }
                }
                if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                    $(".module-socialchannels", elem).find("li").last().on("keyup", function() {
                        if (flag) {
                            $(".focusOutline", elem).removeClass("focusOutline");
                        }
                        flag = true;
                    });
                }

                $(".module-footer li").on('blur', function(e) {
                    $(this).removeAttr("tabindex").removeClass('focusOutline');
                });

                var tracking = new Tracking($('.global-footer'), 'footer');
                $(document).trigger('template.loaded');
            };
            return Footer;
        }
);