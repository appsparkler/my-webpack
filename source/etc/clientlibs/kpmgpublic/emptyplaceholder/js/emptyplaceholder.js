define(['jquery'],
        function ($) {
            'use strict';
            var EmptyPlaceHolder = function () {
                $(document).trigger('template.loaded');
            };
            return EmptyPlaceHolder;
        }
);