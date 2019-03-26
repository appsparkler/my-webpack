/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var NewsTool = function (elem) {
                var trck = new Tracking(elem, 'NewsTool');
                $(document).trigger('template.loaded');
            };
            return NewsTool;
        }
);