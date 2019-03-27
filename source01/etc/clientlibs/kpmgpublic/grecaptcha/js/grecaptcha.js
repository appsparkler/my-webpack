define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';
        //
        var Grecaptcha = {
            config:{
                SITE_KEY: window.kpmgPersonalize.getCaptchaKey,
                THEME: "light",
                SIZE: "invisible",
                BADGE: "bottomright"
            },
            includeRecaptchaValidation : includeRecaptchaValidation
        };
        // private functions
        function includeRecaptchaValidation(cb, param1, selector) {
            var widgetID = window.grecaptcha.render(selector, {
                sitekey: Grecaptcha.config.SITE_KEY,
                callback: onRecaptchaValidation,
                theme: Grecaptcha.config.THEME,
                size: Grecaptcha.config.SIZE,
                badge: Grecaptcha.config.BADGE
            });

            function onRecaptchaValidation() {
                cb(param1);
                window.grecaptcha.reset(widgetID);
            }

            return widgetID;
        }
        //
        return Grecaptcha;
    }
);
