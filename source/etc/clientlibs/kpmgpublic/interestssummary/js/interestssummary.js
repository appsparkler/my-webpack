define(['jquery', 'tracking', 'jquerymobilereflow', "helpers", 'personalizationUtils'],
function($, Tracking, mobileReflow, helpers, personalizationUtils) {
    'use strict';

    var Interestssummary = function(elem,componentName) {
        // Keep the following lines at the bottom of the Interestssummary function
        var tracking = new Tracking(elem, 'Interestssummary');
        $(document).on('mobileBreakpoint', function(){
            if($(".interestssummary-design")) {
                $(".interestssummary-design").removeClass('interestssummary-design');
            }
        });
        $(document).on('desktopBreakpoint',function(){
            $(".module-interestssummary").parent().addClass('interestssummary-design');
        });

        $('.module-interestssummary.new-user').hide();
        $('.module-interestssummary .unknown-user').hide();
        if(personalizationUtils.accountUtils.getPreferencesCount().total <= $(".threshold-value").text()){
            $(".module-interestssummary .unknown-user").show();
        }
        else {
            var userAccountInfo = personalizationUtils.accountUtils.getPreferencesCount(),
            lastUpdatedDate = (helpers.dateFormat(personalizationUtils.accountUtils.getInfo().lastUpdated)).toString(),
            formattedDate = lastUpdatedDate.substring(4, 10) + ', ' + lastUpdatedDate.substring(11, 15) + '.',
            countryText = userAccountInfo.country === 1 ? $(".new-user .countries").data("countrytext") : $(".new-user .countries").data("countriestext");

            $(".new-user .industries").text(userAccountInfo.industry + " " + $(".new-user .industries").text());
            $(".new-user .countries").text(userAccountInfo.country + " " + countryText);
            $(".new-user .topics").text(userAccountInfo.topic + " " + $(".new-user .topics").text());
            $(".new-user .services").text(userAccountInfo.service + " " + $(".new-user .services").text());
            $('.new-user .last-updated').text($(".new-user .last-updated").text() + " " + formattedDate);
            $(".module-interestssummary.component .interestssummary-container.new-user").attr('style', 'display:block !important');
        }
        $('.my-interests-summary').on('click',function(){
            tracking.satelliteTracking({}, 'SelectInterests');
        });

        $('.module-interestssummary').parent().attr('title', $('.module-interestssummary').find('.interestssummary-container a').attr('title'));

        $('.module-interestssummary').parent().on('click', function(e) {
            //Check if user has made any changes in interests || preferences
            if( window.kpmgPersonalize.interestsChange || window.kpmgPersonalize.preferenceChange ) {
                $(document).trigger('interestssummary.click');
                return false;
            }
            e.stopImmediatePropagation();
            if($(e.target).is("div")){
                window.location.href = $('.module-interestssummary').find('.interestssummary-container a').attr('href');
            }
        });

        $(document).trigger('template.loaded');
    };

    return Interestssummary;
}
);
