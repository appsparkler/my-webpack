define(['jquery', 'underscore', 'tracking', 'personalizationUtils', 'genericErrorDialog', 'sticky-bar-service'], function ($, _, Tracking, personalizationUtils, genericErrorDialog, stickyBarService) {
    'use strict';
    var logger = personalizationUtils.loggerUtils,
        personObj = personalizationUtils.accountUtils.getInfo() || {},
        ResendVerificationEmail = {};
    // var stickyBarService = new stickyBarService();

    ResendVerificationEmail.id = "verfyEmailModal";

    ResendVerificationEmail.templateHTML = '<div class="modal fade verfyEmailModal" tabindex="0" id="verfyEmailModal" role="alert">'
        + '<div class="modal-dialog">'
        + '<div class="modal-content" role="dialog" aria-labelledby="verifyEmailTitle verifyEmailContent">'
        + '<div class="modal-header">'
        + '<span class="icon-close btn-close close" data-dismiss="modal">'
        + '<span class="sr-only modal-title"></span>'
        + '</span>'
        + '<h4 class="verfyEmailModal-title" id="verifyEmailTitle ">' + window.kpmgPersonalize.i18n.customMsgs.verifyemaillabel + '</h4>'
        + '</div>'
        + '<div class="modal-body">'
        + '<p id="verifyEmailContent">' + window.kpmgPersonalize.i18n.customMsgs.verifyemail + '</p>'
        + '</div>'
        + '<div class="modal-footer">'
        + '<div class="col-md-6 rsnd-align">'
        + '<button type="button" class="btn btn-default" data-toggle="modal"  id="verifyEmail" data-dismiss="modal">'
        + '<span class="icon-chevron-right"></span><span class="ok-cta">' + window.kpmgPersonalize.i18n.customMsgs.resendconfirmation + '</span>'
        + '</button>'
        + '</div>'
        + '<div class="col-md-5 close-align">'
        + '<button type="button" class="no-btn btn" data-dismiss="modal">'
        + '<span class="icon-close  "></span>' + window.kpmgPersonalize.i18n.customMsgs.close
        + '</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';

    ResendVerificationEmail.successModal = '<div class="modal fade verfyEmailModal" tabindex="0" id="verfyEmailSuccessModal" role="dialog">'
        + ' <div class="modal-dialog">'
        + '<div class="modal-content">'
        + '<div class="modal-header">'
        + '<span class="icon-close btn-close close" data-dismiss="modal">'
        + '<span class="sr-only">' + window.kpmgPersonalize.i18n.customMsgs.close + '</span>'
        + '</span>'
        + '<h4 class="verfyEmailModal-title">' + window.kpmgPersonalize.i18n.customMsgs.verifyemaillabel + '</h4>'
        + '</div>'
        + '<div class="modal-body">'
        + '<p class="success-msg alert-success">'
        + '<span class="icon-checkmark"></span>' + window.kpmgPersonalize.i18n.customMsgs.resentemail + '&nbsp;<span class="success-email"></span>'
        + '</p>'
        + '</div>'
        + '<div class="modal-footer">'
        + '<button type="button" class="btn-default col-md-6 pull-left btn" data-dismiss="modal">'
        + '<span class="icon-close"></span>' + window.kpmgPersonalize.i18n.customMsgs.close
        + '</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';

    ResendVerificationEmail.errModal = '<div class="modal fade verfyEmailAlreadySentModal" tabindex="0" id="errModal" role="dialog">'
        + ' <div class="modal-dialog">'
        + '<div class="modal-content">'
        + '<div class="modal-header">'
        + '<span class="icon-close btn-close close" data-dismiss="modal">'
        + '<span class="sr-only">' + window.kpmgPersonalize.i18n.customMsgs.close + '</span>'
        + '</span>'
        + '<h4 class="verfyEmailAlreadySentModal-title">' + window.kpmgPersonalize.i18n.customMsgs.verify_email_err_title + '</h4>'
        + '</div>'
        + '<div class="modal-body">'
        + '<p class="success-msg alert-success">'
        + '<span class="icon-checkmark"></span> ' + window.kpmgPersonalize.i18n.customMsgs.verify_email_err_desc
        + '</p>'
        + '</div>'
        + '<div class="modal-footer">'
        + '<button type="button" class="btn-default col-md-6 pull-left btn" data-dismiss="modal">'
        + '<span class="icon-close"></span>' + window.kpmgPersonalize.i18n.customMsgs.close
        + '</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';

    ResendVerificationEmail.loader = '<div style="width:96%; position:absolute; z-index:999; top:1%; height:68%; display:none" class="loading-container">'
        + '<img style="margin:200px auto;" src="/etc/designs/kpmgpublic/images/loading.gif"/>'
        + '</div>';

    ResendVerificationEmail.validate = function validate() {
        if (personalizationUtils.accountUtils.isLoggedIn()) {
            personObj = personalizationUtils.accountUtils.getInfo()
            if (!personObj.isVerified) {
                if (localStorage && !localStorage.getItem("verifyEmailAlert") && stickyBarService.isRequestEmailTimerWindowExpired()) {
                    localStorage.setItem("verifyEmailAlert", "true");

                    var dialogSelector = "#" + ResendVerificationEmail.id;
                    $("html, body").animate({
                        scrollTop: 0
                    }, "slow");
                    $(dialogSelector).bs3modal({
                        show: true,
                        backdrop: 'static',
                        keyboard: false
                    });
                    $(dialogSelector + ".ok-cta").trigger('focus');                   

                    tracking.satelliteTracking({
                        'user': {
                            gigyaID: personObj.UID
                        }
                    }, 'verifyEmailPopup', false);
                    tracking.track('verifyEmailPopup');
                }
            }
        }
    }

    ResendVerificationEmail.verify = function showDialog() {
        var personObj = personalizationUtils.accountUtils.getInfo(),
            uid = encodeURIComponent(personObj.UID),
            UIDSignature = encodeURIComponent(personObj.UIDSignature),
            signatureTimestamp = personObj.signatureTimestamp,
            locale = personalizationUtils.accountUtils.getLocale(),
            languageCode = window.kpmgPersonalize.snp.params.languageCode,
            countryCode = window.kpmgPersonalize.snp.params.countryCode,
            currentLocale = '/' + countryCode + '/' + languageCode,
            urlPrefix = '',
            urlFragment;

        locale = '/' + locale.countryCode + '/' + locale.languageCode;
        urlFragment = window.location.href.split(currentLocale)[1];

        for (var i = 0; i < ((urlFragment.match(/\//g) || []).length) - 1; i++) {
            urlPrefix = urlPrefix + '../';
        }

        $.ajax({
            method: "POST",
            data: {
                uid: uid,
                UIDSignature: UIDSignature,
                signatureTimestamp: signatureTimestamp,
                locale: locale
            },
            url: urlPrefix + "home.resendVerificationCode.json"
        }).done(function (data) {
            $.when(getAccountInfo())
                .done(function (response) {
                    personalizationUtils.accountUtils.setInfo(response);
                    $('.loading-spinner').hide();
                    $("html, body").animate({
                        scrollTop: 0
                    }, "slow", function () {
                        $("#verfyEmailSuccessModal").bs3modal({
                            show: true,
                            backdrop: 'static',
                            keyboard: false
                        });
                    });

                    $(".success-email").html(personObj.profile.email);
                    $('#emailVerifyStickyBar').trigger('show:hide');
                    $("#verfyEmailSuccessModal button").trigger('focus');
                    //showing the stickybar after default time
                    // var date = new Date();
                    // var currentTime = date.getTime();
                    // var refreshTime = (stickyBarService.getEmailRequestedTime() + stickyBarService.getDefaultTimer() + 1) - currentTime;
                    // setTimeout(function () {
                    //     $('#emailVerifyStickyBar').trigger('show:hide');
                    // }, refreshTime);
                }).fail(function (response) {
                    genericErrorDialog.showDialog();
                    logger.error("Error in Setting data.\n\tMSG:", response.errorMessage);
                });


            tracking.satelliteTracking({
                'user': {
                    gigyaID: personObj.UID
                }
            }, 'resendConfirmation', false);
            tracking.track('resendConfirmation', "resend confirmation");
        }).fail(function (err) {
            $('.loading-spinner').hide();
            genericErrorDialog.showDialog();
        });
    }

    ResendVerificationEmail.error = function errorDialog() {
        $('.loading-spinner').hide();
        $("html, body").animate({
            scrollTop: 0
        }, "slow", function () {
            $("#errModal").bs3modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
        });
        $("#errModal button").trigger('focus');
    }

    //Add resend verification dialog template to body
    $("body").append($(ResendVerificationEmail.templateHTML));
    $("body").append($(ResendVerificationEmail.successModal));
    $("body").append($(ResendVerificationEmail.errModal));
    $("body").append($(ResendVerificationEmail.loader));

    function getAccountInfo() {
        var deferred = $.Deferred();
        if (personalizationUtils.accountUtils.isLoggedIn()) {
            window.gigya.accounts.getAccountInfo({
                include: personalizationUtils.constants.UserAccountIncludes.join(','),
                callback: function (response) {
                    if (response.errorCode === 0) {
                        deferred.resolve(response);
                    } else {
                        deferred.reject("Error in getting account info");
                    }
                }
            });
        } else {
            deferred.reject("User is not logged in");
        }

        return deferred.promise();
    }


    //Attach events
    $("#verfyEmail, #verifyEmail").on("click", function () {
        $(".loading-spinner").show();
        if (stickyBarService.isRequestEmailTimerWindowExpired()) {
            ResendVerificationEmail.verify();
        } else {
            ResendVerificationEmail.error();
        }
    });

    var tracking = new Tracking($('#verfyEmailModal'), 'ResendVerificationEmail');

    window.kpmgPersonalize.resendVerificationEmail = ResendVerificationEmail;
    return ResendVerificationEmail;
});
