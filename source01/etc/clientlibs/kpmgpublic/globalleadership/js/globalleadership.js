define([ 'jquery', 'handlebars', 'helpers', 'tracking'], function($, HBS, Helpers, Tracking) {
        'use strict';

        var globalLeadership = function(elem) {
            //Lets find how many items are in that last row
            var leaders = $('.globalLeadership .leaders article');
            var leadersLength = leaders.length;
            var leaderWidth = leaders.outerWidth(true);
            var bottomCount = ( parseFloat( (leadersLength/5).toString().split(".").reverse()[0]) * 0.1 ) * 5;

            switch( bottomCount ){
                case 1 :
                    // default layout
                    break;
                case 2 :
                    // spacing logic here
                    if (!window.kpmg.isMobile) { 
                        $(".globalLeadership .leaders")
                            .css("justify-content", "flex-start")
                            .find("article:nth-last-child(2)")
                            .last()
                            .css("margin-left", leaderWidth ); 
                    }
                    break;
                case 3 :
                // default layout
                    break;
                case 4 :
                    //spacing logic here
                    if (!window.kpmg.isMobile) {
                        $(".globalLeadership .leaders").css("justify-content", "flex-start");
                    }
                    break;
                default:
                // default layout
            }

        
            // Keep the following lines at the bottom of the Global Leadership function
            var trck = new Tracking(elem, 'globalLeadership');
                
            $(document).trigger('template.loaded');
        };

        return globalLeadership;
    }
);