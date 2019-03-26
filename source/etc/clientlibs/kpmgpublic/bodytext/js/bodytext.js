/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var BodyText = function (elem) {
                var trck = new Tracking(elem, 'BodyText');
                $(document).trigger('template.loaded');
            };
            return BodyText;
        }
);