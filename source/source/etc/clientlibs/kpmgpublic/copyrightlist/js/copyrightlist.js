/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var CopyrightList = function (elem) {
                var trck = new Tracking(elem, 'CopyrightList');
                $(document).trigger('template.loaded');
            };
            return CopyrightList;
        }
);