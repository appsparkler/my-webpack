/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */
;
define(['jquery'], function ($) {
    $.fn.unveil = function (threshold, callback) {

        var $w = $(window),
                th = threshold || 0,
                mobile = window.kpmg.isMobile,
                attrib = mobile ? "data-mobile" : "data-desktop",
                images = this,
                loaded;

        this.one("unveil", function () {
            var source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-desktop");
            if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") {
                    $.event.trigger('unveil.loaded');
                    callback.call(this);
                }
            }
        });

        function unveil() {
            var inview = images.filter(function () {
                var $e = $(this);
                if ($e.is(":hidden"))
                    return;

                var wt = $w.scrollTop(),
                        wb = wt + $w.height(),
                        et = $e.offset().top,
                        eb = et + $e.height();

                return eb >= wt - th && et <= wb + th;
            });

            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }

        $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

        unveil();

        return this;

    };
});
