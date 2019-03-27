/*
 * component to show print CTA on
 * press release page
 * article details page
 **/
define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';
        var PrintButton = function(elem) {
            var tracking = new Tracking(elem, 'PrintButton'),
            $printCTA = $('.print-button', elem),
            printLabel = $('.print-label', $printCTA).text().trim();

            // read current page url and append print.html
            var printFriendlyURL = window.location.pathname.split('.').reverse().pop() + '.print.html';
            $printCTA.attr('href',printFriendlyURL);

            $printCTA.on('keyup', function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).trigger('focus').addClass('focusOutline');
                }
            });

            $printCTA.on('blur', function() {
                $(this).removeClass('focusOutline');
            });

            $printCTA.on("click", function(evt) {
                evt.preventDefault();
                tracking.track('printPreview',printLabel);
                window.open(printFriendlyURL, 'printFriendly');
            });

            $(document).trigger('template.loaded');
        };

        return PrintButton;
    });
