define(['jquery', 'tracking', 'jquerymobilereflow', "helpers", 'personalizationUtils'],
function($, Tracking, mobileReflow, helpers, personalizationUtils) {
    'use strict';

    var Librarysummary = function(elem,componentName) {
        // Keep the following lines at the bottom of the Librarysummary function
        var tracking = new Tracking(elem, 'Librarysummary');
        $('.module-librarysummary img').trigger('unveil');
        $(document).on('mobileBreakpoint', function(){
            if($(".librarysummary-design")) {
                $(".librarysummary-design").removeClass('librarysummary-design');
            }
        });
        $(document).on('desktopBreakpoint',function(){
            $(".module-librarysummary").parent().addClass('librarysummary-design');
        });

        $('.view-library').hide();
        $('.organize-library').hide();
        if(personalizationUtils.storeUtils.getLibraryListCount() === 0){
            $(".module-librarysummary .organize-library").show();
        } else {
            $(".view-library .articles").text(personalizationUtils.storeUtils.getAllArticles().length+" "+$(".view-library .articles").text());
            $(".view-library .lists").text(personalizationUtils.storeUtils.getLibraryListCount()+" "+$(".view-library .lists").text());
            $(".module-librarysummary .view-library").show();
        }

        $('.module-librarysummary').parent().attr('title', $('.module-librarysummary').find('.librarysummary-container a').attr('title'));

        $('.module-librarysummary').parent().on('click', function(e) {
            //Check if user has made any changes in interests || preferences
            if( window.kpmgPersonalize.interestsChange || window.kpmgPersonalize.preferenceChange ) {
                $(document).trigger('librarysummary.click');
                return false;
            }
            e.stopImmediatePropagation();
            if($(e.target).is("div")){
                window.location.href = $('.module-librarysummary').find('.librarysummary-container a').attr('href');
            }
        });

        $(document).trigger('template.loaded');
    };

    return Librarysummary;
}
);
