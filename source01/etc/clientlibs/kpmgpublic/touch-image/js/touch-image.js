define(['jquery', 'tracking', 'common-utils'],
    function($, Tracking, CommonUtils) {
        'use strict';

        var TouchImage = function(elem) {
			// Keep the following lines at the bottom of the TouchImage function
            var trck = new Tracking(elem, 'TouchImage');
            if (window.KPMG.isAuthor) {
                CommonUtils.fixChromeIssueForAuthor('.module-touch-image');
            }
            $(document).trigger('template.loaded');
            if(!!$('div[data-picture] img').length)
            {
                $('div[data-picture] img').addClass('img-responsive lazy');
            }
        };

        return TouchImage;
    }
);
