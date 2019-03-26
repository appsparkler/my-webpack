define(['jquery', 'tracking', 'registrationuserinfo', 'personalizationUtils'],
    function ($, Tracking, regUserInfo, personalizationUtils) {
        'use strict';

        var Loginform = function (elem, componentName) {
            var tracking = new Tracking(elem, 'ProfileManagement');

            regUserInfo.config.element = elem;
            regUserInfo.config.componentName = componentName;
            regUserInfo.config.startScreen = "gigya-login-screen";
            regUserInfo.config.containerID = "new-user-login-info-container";

            // pass the tracking instance into the userInfo class for gigya tracking.
            regUserInfo.config.tracking = tracking;

            if (personalizationUtils.pathUtils.getURIparam("pwrt")) {
                regUserInfo.showScreenSet({
                    containerID: "",
                    startScreen: "gigya-reset-password-screen"
                });
            }

            regUserInfo.showScreenSet();

            // Keep the following lines at the bottom of the Loginform function
            $(document).trigger('template.loaded');
        };

        return Loginform;
    }
);
