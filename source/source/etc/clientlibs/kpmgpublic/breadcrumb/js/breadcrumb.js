/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var BreadCrumb = function (elem) {
                var trck = new Tracking(elem, 'BreadCrumb');
                $(document).trigger('template.loaded');
            };
            return BreadCrumb;
        }
);