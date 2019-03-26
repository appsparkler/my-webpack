define(['personalizationUtils'],
    function (personalizationUtils) {
        'use strict';
        var stickyBarService = function () { };
        var accountInfo = personalizationUtils.accountUtils.getInfo(),
            locale = personalizationUtils.accountUtils.getLocale(),
            userLoggedIn = personalizationUtils.accountUtils.isLoggedIn() || false,
            countryCode = locale.countryCode,
            languageCode = locale.languageCode,
            // defaultTime_in_mins = 5,
            defaultTime_in_mins = parseInt(window.kpmgPersonalize.resendVerifyEmailDefaultTime),
            DEFAULTTIME_IN_MS = defaultTime_in_mins * 60000;

        /** Checks weather online privacy policy(OPP) has been changed or not, it will check for all the subscribed sites and if OPP is changed and user has not accepted then the value 'true' will be returned  */
        stickyBarService.prototype.isOPPChanged = function () { //boolean
            if (this.isUserLoggedIn() && accountInfo.subscriptions) {
                var sites = [],
                    ischanged = false,
                    subscriptions = accountInfo.subscriptions || {};

                for (var key in subscriptions) {
                    if (subscriptions.hasOwnProperty(key) && key.length === 2) {
                        sites = Object.keys(subscriptions[key]);
                        if (subscriptions[key] &&
                            subscriptions[key][sites[0]] &&
                            subscriptions[key][sites[0]].terms &&
                            subscriptions[key][sites[0]].terms.email &&
                            subscriptions[key][sites[0]].terms.email.isSubscribed === false) {
                            ischanged = true;
                            break;
                        }
                    }
                }
                return ischanged;
            }
        };

        /** Checks weather user's email(account) is verified or not, which returns boolean value */
        stickyBarService.prototype.isAccountVerified = function () { //boolean
            var latestAccountInfo = personalizationUtils.accountUtils.getInfo();
            return (this.isUserLoggedIn() && latestAccountInfo.isVerified) || false;
        };

        /** To avoid resending email again and again a default timer is set so that the email will not be sent if the email is requested between that time. This time is configarable, if not configured that the value will be 60mins */
        stickyBarService.prototype.getDefaultTimer = function () { //number
            return DEFAULTTIME_IN_MS;
        };

        /** This function will return the previous resend email requested time */
        stickyBarService.prototype.getEmailRequestedTime = function () { //number
            var latestAccountInfo, emailRequestTime,
                emailRequestTime_in_ms = 0;
            if (this.isUserLoggedIn()) {
                latestAccountInfo = personalizationUtils.accountUtils.getInfo();
                emailRequestTime = latestAccountInfo.data.resendVerifyEmailTime || 0;
                emailRequestTime_in_ms = new Date(emailRequestTime).getTime();
            }
            return emailRequestTime_in_ms;
        };

        /** Checks weather the email timer window is expired or not i.e compares the previous resend email requested time + default time and current time */
        stickyBarService.prototype.isRequestEmailTimerWindowExpired = function () { //boolean
            var returnValue = false;
            if (this.isUserLoggedIn()) {
                var _date = new Date(),
                    _currentTime = _date.getTime(),
                    emailRequestTime = this.getEmailRequestedTime(),
                    _expiryTime = DEFAULTTIME_IN_MS + emailRequestTime;
                if (_currentTime > _expiryTime) {
                    returnValue = true;
                }
            }
            return returnValue;
        };

        /** Function which checks user's login */
        stickyBarService.prototype.isUserLoggedIn = function () { //boolean
            return userLoggedIn;
        };

        return new stickyBarService();
    }
);