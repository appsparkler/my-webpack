/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var DownloadButton = function (elem, attr) {
                var trck = new Tracking(elem, 'DownloadButton');
                $(document).trigger('template.loaded');
            };
            return DownloadButton;
        }
);