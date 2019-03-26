/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var ContactDetail = function (elem) {
                var trck = new Tracking(elem, 'ContactDetail');
                $(document).trigger('template.loaded');
            };
            return ContactDetail;
        }
);