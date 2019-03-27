define(['jquery', 'underscore', 'tracking', 'personalizationUtils', 'genericErrorDialog','helpers'],
function ($, _, Tracking, personalizationUtils, genericErrorDialog,Helpers) {
    'use strict';
    var logger, emailRegistry, loginInfo, profileInfo, links, config, getAbsolutePath, Registrationuserinfo, tcData, isTCValidated,
    nameSwitchlog = window.kpmgPersonalize.firstnameLastnameSwitch || false,
    gigyaRegisterScreen = 'gigya-register-screen',
    gigyaRegisterCompleteScreen = 'gigya-complete-registration-screen';

    //
    isTCValidated = false;
    logger = personalizationUtils.loggerUtils;
    emailRegistry = {};
    loginInfo = {};
    profileInfo = {};
    //
    personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function (data) {
        links = data.links;
    });

    function showScreenSet(options) {
        options = options || {};
        options.startScreen = options.startScreen || config.startScreen;
        var defaultOptions = {
            screenSet: nameSwitchlog ? 'CustomEdit-FirstnameLastnameSwap':'CustomEdit-RegistrationLogin',
            lang: window.kpmgPersonalize.snp.params.languageCode,
            containerID: config.containerID,
            startScreen: config.startScreen,
            onFieldChanged: onFieldChangedCallback,
            onBeforeValidation: onBeforeSubmitCallbackWithLocalTCValidation,
            onBeforeSubmit: onBeforeSubmitCallback,
            onAfterScreenLoad: onAfterScreenLoadCallback,
            onHide: onHideCallback.bind(null, options.startScreen),
            onError: onErrorCallback.bind(null, options.startScreen)
        };

        for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
                defaultOptions[opt] = options[opt];
            }
        }

        personalizationUtils.commonUtils.checkForGigyaObject(function () {
            var tcIDs;
            //
            tcIDs = ['tc1', 'tc2', 'tc3'];
            // prepare TCData before showing the screenset
            setTCDataFromAuthoredContent(tcIDs);
            //
            window.gigya.accounts.showScreenSet(defaultOptions);
        });
    }
    function validateEmail(){
        var re, email;
        //
        email = $('[name=email]', config.element).val();
        re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //
        return re.test(email.toLowerCase());
    }

    function validateNameFields() {
        var firstName, lastName;
        //
        firstName = $('[name="profile.firstName"]', config.element).val();
        lastName =   $('[name="profile.lastName"]', config.element).val();
        //
        if (!firstName || ! lastName) {
            return false;
        } else {
            return true;
        }
    }

    function validateNameFieldsSpecialCharacter(fieldname) {
        var firstName, lastName, firstNameTest, lastNameTest,fieldSelect,firstnameErrorMsgSpan, specialCharRegex;
        
        firstName = $('[name="profile.firstName"]', config.element).val();
        lastName =   $('[name="profile.lastName"]', config.element).val();
        
        specialCharRegex = /[0-9|"~`!@#$%^&()_={}[\]:;,.<>+*\/\\?-]/g;

        if (fieldname === "profile.firstName"){
            firstNameTest = specialCharRegex.test(firstName);
            fieldSelect = $("input[name='profile.firstName']");
        }else if (fieldname === "profile.lastName"){
            lastNameTest = specialCharRegex.test(lastName);
            fieldSelect =  $("input[name='profile.lastName']");
        }
        
        firstnameErrorMsgSpan = fieldSelect.parent().find("span.gigya-error-msg");
        fieldSelect.removeClass('gigya-error');
        firstnameErrorMsgSpan.removeClass('gigya-error-msg-active');

        if ((fieldname === "profile.firstName" && firstNameTest) || (fieldname === "profile.lastName" && lastNameTest)) {
            fieldSelect.addClass("gigya-error");
            firstnameErrorMsgSpan.addClass("gigya-error-msg-active");
            firstnameErrorMsgSpan.html(window.kpmgPersonalize.i18n.customMsgs.gigya_name_validation_error_message);
        }
            
    }

    function validateCountryDropdown(){
        var countrySelected, optionFirstval;
        var fieldSelect = $("select[name='profile.country']"),
        countryErrorMsgSpan = fieldSelect.parent().find("span.gigya-error-msg");

        fieldSelect.removeClass('gigya-error');

        countryErrorMsgSpan.removeClass('gigya-error-msg-active');

        optionFirstval = $('[name="profile.country"] option:first-child', config.element).val().trim();

        countrySelected = $('[name="profile.country"]', config.element).val().trim();

        if(optionFirstval===countrySelected){

            fieldSelect.addClass("gigya-error");
            countryErrorMsgSpan.addClass("gigya-error-msg-active");
            countryErrorMsgSpan.html(window.kpmgPersonalize.i18n.gigyaMsgs.this_field_is_required);

            return false;
        }else{
            return true;
        }
    }

    function validatePasswordFields () {
        var password, confirmPassword;
        //
        password = $('[data-gigya-name="password"]', config.element).val();
        confirmPassword = $('[data-gigya-name="passwordRetype"]', config.element).val();
        //
        if (!password || !confirmPassword) {
            return false;
        }
        //
        if (password.length < 3) {
            return false;
        }
        //
        if(password !== confirmPassword) {
            return false;
        }
        //
        return true;
    }

    function validateRequiredFields(){
        return validateEmail() && validateNameFields() && validatePasswordFields() && validateCountryDropdown();
    }


    function validateNameAndEmailFields() {
        return validateEmail() && validateNameFields() && validateCountryDropdown();
    }

    function onBeforeSubmitCallbackWithLocalTCValidation(event) {

        if (event.screen === gigyaRegisterScreen || event.screen === gigyaRegisterCompleteScreen) {

            var isFormValid;
            //
            isTCValidated = true;
            isFormValid = validateTCBeforeSubmit();
            //
            /*
            * Watch out! we are returning true in case validation fails
            * to ensure validation of Required fields (name, email, password & confirm-password)
            * are performed by Gigya before terms & conditions local validation
            */

            if (event.screen === gigyaRegisterScreen && !validateRequiredFields() && !validateCountryDropdown()) {
                return true;
            }
            //
            if (event.screen === gigyaRegisterCompleteScreen && !validateCountryDropdown() && !validateNameAndEmailFields()) {
                return true;
            }
            //
            if(!isFormValid) {
                resetTCElements(event);
                return {
                    "form":"Local Validation failed."
                };
            }
        } else {
            return true;
        }
    }

    function resetTCElements(event) {
        setTimeout(deferredMethod);
        //
        function deferredMethod() {
            updateTCDataWithCurrentState();
            replaceGigyaTCWithTCData('#' + event.screen);
        }
    }

    function updateTCDataWithCurrentState() {
        tcData.forEach(processTCData);
        //
        function processTCData(tc) {
            if (tc.isCheckboxVisible) {
                var isChecked;
                //select gigya checkbox inputs that are only visible.
                isChecked = $('.gigya-' + tc.name + ' input[type=checkbox]:visible').is(':checked');
                //
                if (isChecked) {
                    tc.isCheckboxChecked = true;
                } else {
                    tc.isCheckboxChecked = false;
                }
            }
        }
    }

    function onFieldChangedCallback(response) {
        var parentContainer = config.element;

        if (response.screen === "gigya-login-screen") {

            //Upon changing field value in login screen, hide `Invalid login` msg
            $(".gigya-error-display-active", config.element).removeClass("gigya-error-display-active");
        }

        if (response.screen === "gigya-reset-password-screen") {
            parentContainer = $("#gigya-reset-password-screen");
        } else if (response.screen === "gigya-forgot-password-screen") {
            parentContainer = $("#gigya-forgot-password-screen");
        }

        if (response.eventName === "fieldChanged") {
            if (response.field === "newPassword" || response.field === "password") {
                var strength = (response.value) ? personalizationUtils.accountUtils.getPasswordStrength(response.value) : undefined;
                if (strength) {
                    $(".password-strength-indicator", parentContainer).attr("class", "password-strength-indicator " + strength.class);
                    $(".password-strength-indicator", parentContainer).html("<div></div><span style='text-transform:capitalize;'>" + strength.label + "</span>");
                }
            }

            if (response.screen === gigyaRegisterScreen || response.screen === gigyaRegisterCompleteScreen) {
                if (response.field === "password"       ||
                response.field === "data.terms"         ||
                response.field === "data.termsone"      ||
                response.field === "data.termstwo"      ||
                response.field === "passwordRetype") {
                    return false;
                } else if (response.field === 'profile.firstName' || response.field === 'profile.lastName') {                   
                    setTimeout(function () {
                        validateNameFieldsSpecialCharacter(response.field);
                    });
                } else if (response.field === 'profile.country') {
                    validateCountryDropdown();
                } else if (response.field === 'email' && response.isValid) {
                    checkEmail(response.value, false);
                    if (!isTCValidated) {
                        return false;
                    }
                } else if (response.field === 'email' && !response.isValid  && isTCValidated) {
                    if(isTCValidated) {
                        setTimeout(function () {
                            validateTCBeforeSubmit();
                        });
                    }
                }
            }
            if (response.screen === "gigya-forgot-password-screen") {
                //Hide form errors on form value update
                parentContainer.find("div.gigya-error-display.gigya-error-display-active").removeClass("gigya-error-display-active");
            }
        }
    }

    function validateTCBeforeSubmit() {
        var validationPassed;
        //
        validationPassed = true;
        //
        tcData.forEach(validate);
        //
        function validate(selected) {
            if(selected.isCheckboxVisible && selected.isMandatoryCheckbox) {
                var isTCValid;
                isTCValid = selected.validate();
                //
                if (isTCValid === false) {
                    validationPassed = false;
                }
            }
        }
        //
        return validationPassed;
    }

    function onBeforeSubmitCallback(event) {
        if (event.screen === gigyaRegisterScreen || event.screen === gigyaRegisterCompleteScreen) {
            var email;
            //
            email = event.formData.email || event.formData.profile.email;

            //
            if (emailRegistry.hasOwnProperty(email)) {
                if (!emailRegistry[email]) {
                    return true;
                }
            } else {
                checkEmail(email, true);
            }
            return false;
        }
    }

    function onAfterScreenLoadCallback(response) {
        setTimeout(onAfterScreenLoadCallbackTimedOut(response));
    }

    function onAfterScreenLoadCallbackTimedOut(response) {
        //Hide loading container
        $(".loading-container", config.element).css("display", "none");
        // reset isTCValidated
        isTCValidated = false;
        //
        if (!window.kpmgPersonalize.misc.isAuthor) {
            var url = links.learnmore.url;
            $("[data-name='learnmore']").attr({
                'data-modal-url': url,
                'data-remote': url,
                'data-target': '#kpmgModal',
                'data-toggle': 'modal',
                'data-backdrop': 'static'
            });
        }

        function seti18nOverlayHeader(header) {
            //Gigya is replacing the header on before and after loading the scree.
            //To overcome this we need to replace it immediately and also after some timeout.
            $('.gigya-screen-dialog .gigya-screen-dialog-caption, .gigya-screen-dialog-mobile .gigya-screen-dialog-caption').html(header);
            setTimeout(function () {
                $('.gigya-screen-dialog .gigya-screen-dialog-caption, .gigya-screen-dialog-mobile .gigya-screen-dialog-caption').html(header);
            }, 0);
            setTimeout(function () {
                $('.gigya-screen-dialog .gigya-screen-dialog-caption, .gigya-screen-dialog-mobile .gigya-screen-dialog-caption').html(header);
            }, 50);
            setTimeout(function () {
                $('.gigya-screen-dialog .gigya-screen-dialog-caption, .gigya-screen-dialog-mobile .gigya-screen-dialog-caption').html(header);
            }, 500);
        }

        function removePlaceholderStars() {
            //Remove * form placeholder text
            $("input[placeholder$=' *']", config.element).each(function () {
                this.placeholder = this.placeholder.replace(/ \*$/, "");
            });
            $("input[placeholder$=' *']", $(".gigya-screen-dialog, .gigya-screen-dialog-mobile")).each(function () {
                this.placeholder = this.placeholder.replace(/ \*$/, "");
            });
        }

        function focusElementInDialog(selector) {
            selector = selector || '';
            setTimeout(function () {
                $(".gigya-screen-dialog " + selector).trigger('focus');
                $(".gigya-screen-dialog-mobile " + selector).trigger('focus');
            }, 500);
        }

        function updatei18nLabel(key, ctx) {
            var elem, i18nStr, i18nKey;
            //
            elem = $('[data-translation-key=' + key +']', ctx);
            i18nStr = elem.data('translationKey');
            i18nKey = window.kpmgPersonalize.i18n.customMsgs[i18nStr];
            //
            elem.text(i18nKey);
        }
        function removeRegistrationTitleComponentForMobileScreen() {
            if(window.kpmgPersonalize.personalizationUtils.commonUtils.isMobile()) {
                $('.module-registrationpagetitle.component.reg-component').addClass('desktop-only');
            }
        }

        $("#" + response.currentScreen + " input[type='password']").attr("autocomplete", "off");
        var localeObj = personalizationUtils.accountUtils.getLocale(),
            countryurl = "/bin/kpmg/listAllCountries."+localeObj.languageCode+".json";

        if (response.currentScreen === gigyaRegisterScreen) {
            if(window.footersubscriptioncalloutval==="subscription"){
                var emailId = sessionStorage.getItem("email_Id");
                if(emailId && emailId.length>0){
                    $('input[name="email"]', config.element).val(emailId);
                }
            }
            removePlaceholderStars();
            updatei18nLabel('or_divider_text', 'form#gigya-register-form');

            // updating countryCode and languageCode during registration process.
            $(".registered-locale").attr('value',  localeObj.countryCode + "/" + localeObj.languageCode );

            var countrySelector = $(".country-select.registration select"),
            countryExist = countrySelector.length,
            regCountryCode = '';
            $(countrySelector).attr("data-required", "true");

            if(countryExist>0){
                $.ajax({
                    url: countryurl,
                    success: function(response) {
                        var option ="";

                        for(var i=0; i<response.length; i++){
                            regCountryCode = response[i].sitecode;

                            if( regCountryCode === localeObj.countryCode.toUpperCase() ){
                                countrySelector.addClass('others');
                                option = "<option class='others' title='"+response[i].countryname+"' value='"+response[i].countryname+"' selected='selected'>"+response[i].countryname+"</option>";
                            }else{
                                option = "<option class='others' title='"+response[i].countryname+"' value='"+response[i].countryname+"' >"+response[i].countryname+"</option>";
                            }
                            regCountryCode = '';
                            countrySelector.append(option);
                        }

                    },
                    error: function(response) {
                        console.log("Country list service error on registration");
                    }
                });
            }

            countrySelector.on('change', function() {
                this.className = this.options[this.selectedIndex].className;
                validateCountryDropdown();
            });

            if(document.referrer.indexOf('/' + window.kpmgPersonalize.blogPath + '/') > -1) {
                personalizationUtils.commonUtils.setValue('redirectToBlog', true);
            }

            // analytics for continue button in registration screen
            var registerBtnClassName = document.querySelector("#new-user-registration-info-container [type='submit']");
            $(registerBtnClassName).addClass('trackable');
            registerBtnClassName.addEventListener('click', function (event) {
                ["profile.firstName", "profile.lastName"].forEach(function (field) {
                    var inputField = $("input[name='" + field + "']", config.element);
                    validateNameFieldsSpecialCharacter(field); 
                    if (inputField.parent().find("span.gigya-error-msg-active").length) {
                        //Prevent form submission if there are errors in form
                        event.stopPropagation();
                        event.preventDefault();
                    }
                });
                if(countrySelector.parent().find("span.gigya-error-msg-active").length){
                    event.stopPropagation();
                    event.preventDefault();
                }

            }, true);
            $(".form-action-button.cancel a", config.element).on('click', function (event) {
                $(this).addClass('trackable');
                showScreenSet({
                    containerID: "",
                    startScreen: "gigya-registration-cancel-screen"
                });
            });

            //Update localized text, placeholders
            seti18nPlaceholderTextForInputFields('profile.firstName', 'kpmg_placeholder_first_name');
            seti18nPlaceholderTextForInputFields('profile.lastName', 'kpmg_placeholder_last_name');
            seti18nPlaceholderTextForInputFields('email', 'kpmg_placeholder_email');
            seti18nPlaceholderTextForInputFields('password', 'kpmg_placeholder_password');
            seti18nPlaceholderTextForInputFields('passwordRetype', 'kpmg_placeholder_confirm_password');
            seti18nPlaceholderTextForInputFields('profile.work.company', 'kpmg_placeholder_company_optional');
            seti18nPlaceholderTextForSelectFirstField('profile.country', 'kpmg_placeholder_select_country');

            $(".icon-email-information, .icon-password-information", config.element)
            .each(function () {
                $(this).on('click', function (event) {
                    event.stopPropagation();
                    if (personalizationUtils.commonUtils.isMobile()) {
                        var infoHolder = $(this).next(),
                        hasClass = infoHolder.hasClass("no-display");
                        //Hide all information tooltips
                        $(".icon-email-information, .icon-password-information", config.element)
                        .next()
                        .addClass("no-display");
                        //Show tooltip if previously hidden
                        if (hasClass) {
                            infoHolder.removeClass("no-display");
                        }
                    }
                });
            });
            $(document).on('click', function () {
                $(".icon-email-information, .icon-password-information", config.element).each(function () {
                    $(this).next().addClass("no-display");
                });
            });
            //
            replaceGigyaTCWithTCData('#' + response.currentScreen);
            return;
        } else if (response.currentScreen === "gigya-login-screen") {
            var origin = personalizationUtils.commonUtils.getUrlParamsObj().origin || '',
                regLink = $(".reg-link", config.element).attr('href');

            if(origin) {
                //Set origin value in localStorage for subscription on-boarding flow
                personalizationUtils.commonUtils.setValue('origin', origin);
                $(".reg-link", config.element).attr('href', regLink + '?origin=' + origin);
            }
            if(window.footersubscriptioncalloutval==="subscription"){
                var logInemailId = sessionStorage.getItem("email_Id");
                if(logInemailId && logInemailId.length>0){
                    $('input[name="username"]', config.element).val(logInemailId);
                }
            }

            if(document.referrer.indexOf('/' + window.kpmgPersonalize.blogPath + '/') > -1) {
                personalizationUtils.commonUtils.setValue('redirectToBlog', true);
            }

            removePlaceholderStars();
            updatei18nLabel('or_divider_text', 'form#gigya-login-form');
            $('input[name="username"]', config.element).attr("placeholder", window.kpmgPersonalize.i18n.customMsgs.kpmg_placeholder_email);
            $('input[name="password"]', config.element).attr("placeholder", window.kpmgPersonalize.i18n.customMsgs.kpmg_placeholder_password);

            // analytics for registration link in login screen
            $(".reg-link", config.element).on('click', function (event) {
                $(this).addClass('trackable');
                config.tracking.satelliteTracking({
                    'Register': {
                        RegistrationVar: "RegistrationStart"
                    }
                }, 'RegistrationStart', false);
            });

            $(".kpmg-login a.kpmg-link", config.element).on('click', function () {
                showScreenSet({
                    containerID: "",
                    startScreen: "gigya-forgot-password-screen"
                });
            });

        } else if (response.currentScreen === gigyaRegisterCompleteScreen) {
            var accountInfo = (response && response.response && response.response.response) || {};
            loginInfo = {
                uid: accountInfo.UID,
                uidSignature: accountInfo.UIDSignature,
                signatureTimestamp: accountInfo.signatureTimestamp
            };
            //
            removeRegistrationTitleComponentForMobileScreen();
            removePlaceholderStars();
            //
            replaceGigyaTCWithTCData('#' + response.currentScreen);

            // updating countryCode and languageCode during registration completion process.
            $(".registered-locale").attr('value',  localeObj.countryCode + "/" + localeObj.languageCode );

            $('input[name="profile.firstName"]', config.element).attr("placeholder", window.kpmgPersonalize.i18n.customMsgs.kpmg_placeholder_first_name);
            $('input[name="profile.lastName"]', config.element).attr("placeholder", window.kpmgPersonalize.i18n.customMsgs.kpmg_placeholder_last_name);
            $('input[name="email"]', config.element).attr("placeholder", window.kpmgPersonalize.i18n.customMsgs.kpmg_placeholder_email);
            $('input[name="profile.work.company"]', config.element).attr("placeholder", window.kpmgPersonalize.i18n.customMsgs.kpmg_placeholder_company_optional);
            $('select[name="profile.country"] option:first-child', config.element)
            .attr("title", window.kpmgPersonalize.i18n.customMsgs.kpmg_placeholder_select_country)
            .text(window.kpmgPersonalize.i18n.customMsgs.kpmg_placeholder_select_country);

            $(".social-icon-holder").append("<img src='https://cdns.gigya.com/gs/GetSprite.ashx?path=/HTMLLogin/FullLogoColored/[" + accountInfo.loginProvider + "]_70.png|180,70'>");

            var completionCountrySelector = $(".country-select.completion select"),
            completioncountryExist = completionCountrySelector.length,
            regCompletionCountryCode = '';

            $(completionCountrySelector).attr("data-required", "true");

            if(completioncountryExist>0){
                $.ajax({
                    url: countryurl,
                    success: function(response) {
                        var option ="";

                        for(var i=0; i<response.length; i++){
                            regCompletionCountryCode = response[i].sitecode;

                            if( regCompletionCountryCode === localeObj.countryCode.toUpperCase() ){
                                completionCountrySelector.addClass('others');
                                option = "<option class='others' title='"+response[i].countryname+"' value='"+response[i].countryname+"' selected='selected'>"+response[i].countryname+"</option>";
                            }else{
                                option = "<option class='others' title='"+response[i].countryname+"' value='"+response[i].countryname+"' >"+response[i].countryname+"</option>";
                            }
                            regCompletionCountryCode = '';
                            completionCountrySelector.append(option);
                        }

                    },
                    error: function(response) {
                        console.log("Country list service error on registration completion");
                    }
                });
            }

            completionCountrySelector.on('change', function() {
                this.className = this.options[this.selectedIndex].className;
                validateCountryDropdown();
            });
            setTimeout(function () {
                $("div.kpmg-input.terms-checkbox", config.element).removeClass("gigya-terms-valid");
            }, 500);

            $(".form-action-button.cancel a", config.element).on('click', function () {
                showScreenSet({
                    containerID: "",
                    startScreen: "gigya-registration-cancel-screen"
                });
            });

            var completeRegisterBtnClassName = document.querySelector("#new-user-registration-info-container [type='submit']");
            completeRegisterBtnClassName.addEventListener('click', function (event) {
                ["profile.firstName", "profile.lastName"].forEach(function (field) {
                    var inputField = $("input[name='" + field + "']", config.element);

                    if (inputField.parent().find("span.gigya-error-msg-active").length) {
                        //Prevent form submission if there are errors in form
                        event.stopPropagation();
                        event.preventDefault();
                    }
                });
                if(completionCountrySelector.parent().find("span.gigya-error-msg-active").length){
                    event.stopPropagation();
                    event.preventDefault();
                }

            }, true);

            landedRegConfirmPage = true;
            //

        } else if (response.currentScreen === "gigya-registration-cancel-screen") {
            controlScrolling(true);
            focusElementInDialog();
            seti18nOverlayHeader(window.kpmgPersonalize.i18n.gigyaMsgs.kpmg_cancel_registration_header);

            //Yes, cancel my registration
            $(".gigya-screen-dialog .form-action-button.submit a, .gigya-screen-dialog-mobile .form-action-button.submit a").on('click', function () {
                if (loginInfo.uid) {
                    deleteAccount();
                }
                personalizationUtils.pathUtils.gotoPage("../../home.html");
            });

            //No, take me back function
            $(".gigya-screen-dialog .form-action-button.return a, .gigya-screen-dialog-mobile .form-action-button.return a").on('click', function () {
                closeGigyaDialog();
            });
        } else if (response.currentScreen === "gigya-forgot-password-screen") {
            controlScrolling(true);
            removePlaceholderStars();
            seti18nOverlayHeader(window.kpmgPersonalize.i18n.gigyaMsgs.kpmg_forgot_password_header);

            $('input[name="username"]').attr("placeholder", window.kpmgPersonalize.i18n.customMsgs.kpmg_placeholder_email);

            var resetPasswordElem = document.querySelector(".kpmg-forgot-password-screen [type='submit']");
            $(resetPasswordElem).addClass('trackable');

            focusElementInDialog("input[name='username']");

            $(".gigya-screen-dialog .form-action-button.cancel a.cancel, .gigya-screen-dialog-mobile .form-action-button.cancel a.cancel").on('click', function () {
                closeGigyaDialog();
            });

        } else if (response.currentScreen === "gigya-forgot-password-success-screen") {
            controlScrolling(true);
            focusElementInDialog();
            seti18nOverlayHeader(window.kpmgPersonalize.i18n.gigyaMsgs.kpmg_forgot_password_header);

            $(".gigya-screen-dialog .form-action-button.submit a, .gigya-screen-dialog-mobile .form-action-button.submit a").on('click', function () {
                closeGigyaDialog();
            });
        } else if (response.currentScreen === "gigya-reset-password-success-screen") {
            controlScrolling(true);
            focusElementInDialog();
            seti18nOverlayHeader(window.kpmgPersonalize.i18n.gigyaMsgs.kpmg_reset_password);

            $(".gigya-screen-dialog .form-action-button.submit a, .gigya-screen-dialog-mobile .form-action-button.submit a").on('click', function () {
                closeGigyaDialog();
            });
        } else if (response.currentScreen === "gigya-too-many-failed-attempts-screen") {
            controlScrolling(true);
            focusElementInDialog("input[type='submit']");
            seti18nOverlayHeader(window.kpmgPersonalize.i18n.gigyaMsgs.kpmg_too_many_failed_attempts_header);

            $(".gigya-screen-dialog .form-action-button a.forgot-password, .gigya-screen-dialog-mobile .form-action-button a.forgot-password").on('click', function () {
                closeGigyaDialog();
                showScreenSet({
                    containerID: "",
                    startScreen: "gigya-forgot-password-screen"
                });
            });
            $(".gigya-screen-dialog .form-action-button a.contact-us, .gigya-screen-dialog-mobile .form-action-button a.contact-us").on('click', function () {
                personalizationUtils.pathUtils.gotoPage("../misc/contact.html");
            });
        } else if (response.currentScreen === "gigya-reset-password-screen") {
            controlScrolling(true);
            removePlaceholderStars();
            focusElementInDialog("#gigya-password-newPassword");
            seti18nOverlayHeader(window.kpmgPersonalize.i18n.gigyaMsgs.kpmg_reset_password);

            $('#gigya-reset-password-screen input[name="newPassword"]').attr("placeholder", window.kpmgPersonalize.i18n.customMsgs.kpmg_placeholder_password);
            $('#gigya-reset-password-screen input[name="passwordRetype"]').attr("placeholder", window.kpmgPersonalize.i18n.customMsgs.kpmg_placeholder_confirm_password);

            $(".gigya-screen-dialog .form-action-button.cancel a.cancel, .gigya-screen-dialog-mobile .form-action-button.cancel a.cancel").on('click', function () {
                closeGigyaDialog();
            });
            $(".gigya-screen-dialog .form-action-button.submit a, .gigya-screen-dialog-mobile .form-action-button.submit a").on('click', function (event) {

                //resetPasswordTracking(event);
                var noError = !($(".gigya-screen-dialog .gigya-error-msg-active").length || $(".gigya-screen-dialog-mobile .gigya-error-msg-active").length),
                pwd = $(".gigya-screen-dialog #gigya-password-newPassword").val() || $(".gigya-screen-dialog-mobile #gigya-password-newPassword").val(),
                confirmPwd = $(".gigya-screen-dialog #gigya-passsord-passwordRetype").val() || $(".gigya-screen-dialog-mobile #gigya-passsord-passwordRetype").val();
                if (noError && pwd && (pwd === confirmPwd)) {
                    window.gigya.accounts.resetPassword({
                        passwordResetToken: personalizationUtils.pathUtils.getURIparam("pwrt"),
                        newPassword: $("#gigya-password-newPassword").val(),
                        callback: function (response) {
                            if (response.errorCode !== 0) {
                                var reason,
                                errorDetails = response.errorDetails,
                                errorMessage = response.errorMessage;

                                reason = (errorDetails !== null && errorDetails.length > 0) ? errorDetails : errorMessage;
                                $($(".gigya-error-msg")[0]).html(reason);
                            } else {
                                //Reset password successful
                                $(".gigya-screen-dialog .form-action-button.cancel a.cancel, .gigya-screen-dialog-mobile .form-action-button.cancel a.cancel").on('click', function () {
                                    closeGigyaDialog();
                                });
                            }
                        }
                    });
                }
            });
        } else {
            logger.warn("onAfterScreenLoad callback is not handled for '" + response.currentScreen + "'...");
        }
    }

    function saveArticleToLibrary() {
        //If user is navigated from ArticleSave flow, save article to default list if not saved before
        var article = personalizationUtils.commonUtils.getValue('article-to-save'),
        libraryId = personalizationUtils.storeUtils.getLibraryIdByName('quicksavedlist');

        if (article && typeof article.href === 'string') {
            article.url = article.href;

            if (libraryId) {
                personalizationUtils.storeUtils.saveArticleToLibrary(libraryId, article);
            } else {
                personalizationUtils.storeUtils.createNewLibrary('quicksavedlist', article);
            }

            personalizationUtils.commonUtils.clearValues('article-to-save');
        }
    }

    function seti18nPlaceholderTextForInputFields(name, key) {
        var customMsgs;
        //
        customMsgs = window.kpmgPersonalize.i18n.customMsgs;
        //
        $('input[name="' + name +'"]', config.element).attr("placeholder", customMsgs[key]);
    }

    function seti18nPlaceholderTextForSelectFirstField(name, key) {
        var customMsgs;
        //
        customMsgs = window.kpmgPersonalize.i18n.customMsgs;
        //
        $('select[name="' + name +'"] option:first-child', config.element)
        .attr("title", customMsgs[key])
        .text(customMsgs[key]);
    }

    function setTCDataFromAuthoredContent(tcIDs) {
        tcData = [];
        //
        tcIDs.forEach(function(tcID) {
            tcData.push(new TC(tcID));
        });
    }

    function TC(tcID) {
        var GigyaMsgs;
        //
        GigyaMsgs = window.kpmgPersonalize.i18n.gigyaMsgs;
        this.name = tcID;
        this.element = $('#' + tcID + '-authored-data');
        //
        this.isIncludedOnSite = this.element.data('includeOnSite') ? true : false;
        this.termsText = this.element.data('termsText') ? this.element.data('termsText') : '';
        this.isCheckboxVisible = this.element.data('checkboxVisible') ? true : false;
        this.isCheckboxChecked = this.element.data('checkboxChecked') ? true : false;
        this.isMandatoryCheckbox = this.element.data('mandatoryCheckbox') ? true : false;

        if(this.isMandatoryCheckbox && this.isCheckboxVisible) {
            this.mandatoryErrorMessage = GigyaMsgs['kpmg_error_tc_authored_msg_' + tcID];
        }
    }

    TC.prototype.validate = function validateTC() {
        var tcID;
        //
        tcID = this.name;
        //     if tcID-checkbox is not checked, show the error message.
        //  return false
        if (!$('.kpmg-' + tcID + ' input[type=checkbox]').is(':checked')) {
            $('.kpmg-' + tcID)
            .removeClass('gigya-terms-valid')
            .addClass('gigya-terms-invalid gigya-terms-error');
            return false;
        } else {
            $('.kpmg-' + tcID)
            .removeClass('gigya-terms-invalid')
            .removeClass('gigya-terms-error')
            .addClass('gigya-terms-valid');
        }
    };

    function replaceGigyaTCWithTCData(ctx) {
        //
        tcData.forEach(function (selected) {
            var tcID;
            //
            tcID = selected.name;
            //
            if (selected.isIncludedOnSite) {
                setTermsTextInGigyaMeta(tcID);
                displayAuthoredTCOnUI(tcID);
                if (!selected.isCheckboxVisible) {
                    ensureCheckboxIsChecked(tcID);
                    hideCheckbox(tcID);
                } else {
                    if (selected.isCheckboxChecked) {
                        checkCheckbox(tcID);
                    }
                    if (selected.isMandatoryCheckbox) {
                        $
                        .when(appendErrorMessage(selected, tcID))
                        .then(setValidation(tcID))
                        .then(includeRequiredLabel(tcID))
                        .then(setI18nValOnLabel(tcID));
                    }
                }
            } else {
                hideTC(tcID);
            }
            // private functions for replaceGigyaTCWithAuthoredTC
            function setI18nValOnLabel(tcID) {
                var arrowLabelElem, jQueryElem, i18key, i18Val;
                //
                arrowLabelElem = '.kpmg-' + tcID + ' .arrow-label.left-box';
                jQueryElem = $(arrowLabelElem);
                i18key = jQueryElem.data('translation-key');
                i18Val = window.kpmgPersonalize.i18n.gigyaMsgs[i18key];
                //
                if (i18Val) {
                    jQueryElem.text(i18Val);
                }
            }

            function includeRequiredLabel(tcID) {
                var labelHtml;
                //
                labelHtml = '<div class="outer-shape arrow-bg field-valid-required"><div class="right-arrow"></div><div class="arrow-label left-box field-valid-required" data-translation-key="kpmg_required" data-screenset-element-id-publish="false" data-screenset-roles="instance">Required</div></div>';
                //
                $(labelHtml)
                .appendTo('.kpmg-' + tcID + ' .gigya-label.mimic-terms-checkbox .gigya-label-text.gigya-checkbox-text');
            }

            function ensureCheckboxIsChecked(tcID) {
                var checkbox, isChecked;
                //
                checkbox = $('.kpmg-' + tcID + ' input[type=checkbox]');
                isChecked = checkbox.is(':checked');
                //
                checkbox
                .on('change', function(){
                    if (!isChecked) {
                        checkbox.prop('checked', true);
                    }
                    //
                });
                //
                checkbox.prop('checked', true);
            }

            function setTermsTextInGigyaMeta(tcID) {
                $('#' + tcID + '-meta input', ctx)
                .val(jQuery(selected.termsText).text());
            }

            function displayAuthoredTCOnUI(){
                $('.kpmg-' + tcID + ' label.gigya-label span.gigya-label-text.gigya-checkbox-text', ctx)
                .html(selected.termsText);
            }

            function hideTC(tcID) {
                $('.kpmg-' + tcID).addClass('position-absolute v-hidden');
            }

            function checkCheckbox(tcID) {
                $('.kpmg-' + tcID + ' input[type=checkbox]').prop('checked', true);
            }

            function hideCheckbox(tcID) {
                $('.kpmg-' + tcID + ' label.gigya-label').addClass('d-none-before');
            }

            function appendErrorMessage(selected, tcID) {
                var errorHTML;
                //
                errorHTML =
                '<span class="gigya-error-msg privacy-ack">' +
                selected.mandatoryErrorMessage +
                '</span>';
                // insert error message only if it is not already present.
                if ($('.kpmg-' + tcID + ' .gigya-error-msg', ctx).length === 0) {
                    $(errorHTML).prependTo('.kpmg-' + tcID, ctx);
                }
            }

            function setValidation(tcID) {
                $('.kpmg-' + tcID + ' input[type=checkbox]')
                .on('change', changeHandler);
                //
                function changeHandler(evt) {
                    var $this;
                    //
                    $this = evt.currentTarget;
                    if (!$($this).is(':checked')) {
                        $('.kpmg-' + tcID)
                        .removeClass('gigya-terms-valid')
                        .addClass('gigya-terms-invalid gigya-terms-error');
                    } else {
                        $('.kpmg-' + tcID)
                        .removeClass('gigya-terms-invalid gigya-terms-error')
                        .addClass('gigyva-terms-valid');
                    }
                }
            }
        });
    }

    function onHideCallback(currentScreen, response) {
        controlScrolling();
    }

    function onErrorCallback(currentScreen, response) {
        logger.error(currentScreen, response);
        /**
        * Gigya error codes desc:
        * Refer to http://developers.gigya.com/display/GD/Response+Codes+and+Errors+REST for all error codes.
        *
        * 400006 - Invalid parameter value (Form input is not within parameter defined bound)
        * 400009 - Register validation error
        * 403042 - Invalid login ID and password
        * 403120 - Too many failed attempts
        * 403047 - Login ID does not exist
        */
        var filterList = [403042, 403120];

        if (currentScreen === gigyaRegisterScreen) {
            if ((response.errorCode === 400006) || (response.errorCode === 400009)) {
                filterList.push(400006, 400009);
            }
        } else if (currentScreen === "gigya-login-screen") {
            if (response.errorCode === 403120) {
                showScreenSet({
                    containerID: "",
                    startScreen: "gigya-too-many-failed-attempts-screen"
                });
            }
        } else if (currentScreen === "gigya-forgot-password-screen") {
            filterList.push(403047);
            if (response.errorCode === 403047) {
                //Suppress 'Login ID does not exist' message and show success screen
                showScreenSet({
                    containerID: "",
                    startScreen: "gigya-forgot-password-success-screen"
                });
            }
        } else if (currentScreen === "gigya-reset-password-screen") {
            filterList.push(400006);
            if (response.errorCode === 400006) {
                setTimeout(function () {
                    $(".kpmg-input .gigya-error-msg[data-bound-to='newPassword']")
                    .addClass("gigya-error-msg-active")
                    .addClass("gigya-error-code-400006");
                    //TODO: Localize the below error msg.
                    //      Ultimately it should be removed after Gigya fix.
                    //.html("Password does not meet complexity requirements");
                }, 500);
            }
        }

        if (filterList.indexOf(response.errorCode) === -1) {
            //Remove gigya dialog (if any)
            $("body > div[id*='showScreenSet']:first-child").remove();
            genericErrorDialog.showDialog(response);
        }
    }

    function checkEmail(email, onSubmit) {
        var fieldInput = $("input[name=email]"),
        errorSpan = fieldInput.parent().find("span.gigya-error-msg");
        //
        if(onSubmit) {
            validateTCBeforeSubmit();
        }
        //
        $.ajax({
            method: 'POST',
            data: {
                uid: loginInfo.uid ? encodeURIComponent(loginInfo.uid) : 'NA',
                emailID: email,
                locale: window.location.pathname.toLowerCase().substring(0, 6)
            },
            url: '../../' + 'home.checkemail.json'
        }).done(function (data) {

            if (data.errorCode === 0) {
                var isRegistered = data.isRegistered;
                emailRegistry[email] = isRegistered;

                if (isRegistered) {
                    fieldInput.addClass("gigya-error");
                    errorSpan.addClass("gigya-error-msg-active");
                    errorSpan.html(window.kpmgPersonalize.i18n.gigyaMsgs.email_already_exists);
                } else {
                    fieldInput.removeClass("gigya-error");
                }



                if (onSubmit) {
                    if ($("#new-user-registration-info-container").length) {
                        $("#new-user-registration-info-container [type='submit']").trigger('click');
                    } else {
                        $("#new-user-login-info-container [type='submit']").trigger('click');
                    }
                } else {
                    if (isTCValidated) {
                        setTimeout(function () {
                            validateTCBeforeSubmit();
                        });
                    }
                }
            } else {
                genericErrorDialog.showDialog(data);
            }
        }).fail(function (data) {
            genericErrorDialog.showDialog();
        });
    }

    function deleteAccount() {
        $.ajax({
            method: "POST",
            data: {
                uid: encodeURIComponent(loginInfo.uid),
                UIDSignature: encodeURIComponent(loginInfo.uidSignature),
                signatureTimestamp: loginInfo.signatureTimestamp,
                locale:  window.location.pathname.toLowerCase().substring(0, 6)
            },
            url: '../../' + "home.deleteaccount.json"
        });
    }

    function controlScrolling(enable) {
        if (enable) {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            $("body").addClass("modal-open");
        } else {
            $("body").removeClass("modal-open");
        }
    }

    function closeGigyaDialog() {
        $(".gigya-screen-dialog .gigya-screen-dialog-close, .gigya-screen-dialog-mobile .gigya-screen-dialog-close").trigger("click");
    }

    function _setUserLibrary(userInfo, cb) {
        var localeObj = personalizationUtils.accountUtils.getLocale(),
        localeStr = '/' + localeObj.countryCode + '/' + localeObj.languageCode;

        $.ajax({
            method: 'POST',
            data: {
                locale: localeStr,
                uid: userInfo.UID,
                UIDSignature: userInfo.UIDSignature,
                signatureTimestamp: userInfo.signatureTimestamp
            },
            url: personalizationUtils.constants.getUserLibraryServiceURL,
            success: cb,
            error: function (obj, msg, err) {
                logger.error("could not fetch user library information", err.message, err);
            }
        });
    }

    function _setAccountInfoAndRedirect(cb, logginIn) {
        window.gigya.accounts.getAccountInfo({
            include: personalizationUtils.constants.UserAccountIncludes.join(','),
            extraProfileFields: personalizationUtils.constants.IPGFilter.join(','),
            callback: function (response) {
                if (response.errorCode === 0) {
                    var IPGFiltered = personalizationUtils.accountUtils.IPGFilter(response),
                        currentLocaleObj = personalizationUtils.accountUtils.getLocale(),
                        currentCountryCode = currentLocaleObj.countryCode,
                        currentLanguageCode = currentLocaleObj.languageCode,
                        currentSubscription_opt_in = false, currentCommunication_opt_in = false,
                        subscriptions = {},
                        registeredLocale = '',
                        regSourceArray = ( typeof(response.regSource) === 'string' && response.regSource.split('/') ) || [],
                        regCountry = typeof(regSourceArray[3]) === 'string' && regSourceArray[3].length === 2 && regSourceArray[3],
                        regLanguage = typeof(regSourceArray[4]) === 'string' && regSourceArray[4].length === 2 && regSourceArray[4],
                        accountData = {},
                        loginCount = response.data.loginCount ? parseInt(response.data.loginCount) : 0,
                        storageKey = 'loginCount' + response.UID,
                        requestTime = (IPGFiltered.data && IPGFiltered.data.downloadData && IPGFiltered.data.downloadData.requestTime) || '',
                        timeDifferenceInSeconds = (new Date().getTime() - new Date(requestTime).getTime()) / 1000,
                        expiryInSeconds = (window.kpmgPersonalize && window.kpmgPersonalize.downloadDataExpiryWindow && window.kpmgPersonalize.downloadDataExpiryWindow * 60 * 60) || 24 * 60 * 60;

                    if( IPGFiltered.subscriptions &&
                        IPGFiltered.subscriptions.subscription_opt_in &&
                        IPGFiltered.subscriptions.subscription_opt_in.email &&
                        IPGFiltered.subscriptions.subscription_opt_in.email.isSubscribed ) {
                        currentSubscription_opt_in = IPGFiltered.subscriptions.subscription_opt_in.email.isSubscribed;
                    }

                    if( IPGFiltered.subscriptions &&
                        IPGFiltered.subscriptions.communication_opt_in &&
                        IPGFiltered.subscriptions.communication_opt_in.email &&
                        IPGFiltered.subscriptions.communication_opt_in.email.isSubscribed ) {
                        currentCommunication_opt_in = IPGFiltered.subscriptions.communication_opt_in.email.isSubscribed;
                    }

                    if(logginIn) {
                        registeredLocale = (response.data && response.data.kpmg && response.data.kpmg.registeredLocale) ? response.data.kpmg.registeredLocale : '';
                        registeredLocale = registeredLocale.split('/');
                        if(registeredLocale.length === 2) {
                            currentCountryCode = registeredLocale[0];
                            currentLanguageCode = registeredLocale[1];
                        }
                        else{
                            if(regCountry && regLanguage) {
                                accountData = {
                                    kpmg: {
                                        registeredLocale: regCountry + "/" + regLanguage
                                    }
                                };
                            }
                        }

                        if(IPGFiltered.data && IPGFiltered.data.downloadData && IPGFiltered.data.downloadData.status === "COMPLETED" && timeDifferenceInSeconds > expiryInSeconds) {
                            accountData.downloadData = {};
                            accountData.downloadData.status = "EXPIRED";
                            accountData.downloadData.filename = "";
                        }

                    } else {
                        subscriptions[currentCountryCode] = {};

                        subscriptions[currentCountryCode][currentLanguageCode] = {
                            "subscription_opt_in": {
                                "email": {
                                    "isSubscribed": currentSubscription_opt_in
                                }
                            },
                            "communication_opt_in": {
                                "email": {
                                    "isSubscribed": currentCommunication_opt_in
                                }
                            },
                            "terms": {
                                "email": {
                                    "isSubscribed": IPGFiltered.data.terms
                                }
                            }
                        };
                    }

                    //Store the login count to handle Promo component - KPMGS-11385
                    accountData.loginCount = loginCount + 1;
                    localStorage.setItem(storageKey, loginCount);

                    //setting nickname(will be set in twitter) to display username for comments KPMGS-16823
                    if(IPGFiltered.profile && IPGFiltered.profile.nickname) {
                        if(IPGFiltered.profile.firstName) {
                            IPGFiltered.profile.nickname = IPGFiltered.profile.firstName;

                            if(IPGFiltered.profile.lastName) {
                                IPGFiltered.profile.nickname = IPGFiltered.profile.nickname + ' ' + IPGFiltered.profile.lastName;
                            }
                        }
                    }

                    window.gigya.accounts.setAccountInfo({
                        profile: _.extend(IPGFiltered.profile, {
                            "photoURL": window.location.origin + "/content/dam/kpmg/images/platform/KPMG.png",
                            "profileURL": window.location.origin + "/content/dam/kpmg/images/platform/KPMG.png",
                            "thumbnailURL": window.location.origin + "/content/dam/kpmg/images/platform/KPMG.png"
                        }),
                        subscriptions:subscriptions,
                        data: accountData,
                        callback: function (setAccResponse) {
                            if (setAccResponse.errorCode === 0) {
                                _.extend(IPGFiltered.subscriptions, subscriptions);
                                _.extend(IPGFiltered.data, accountData);
                                personalizationUtils.accountUtils.setInfo(IPGFiltered);
                                if(response.subscriptions &&
                                    response.subscriptions !== null &&
                                    response.subscriptions.subscription_opt_in &&
                                    response.subscriptions.subscription_opt_in.email &&
                                    response.subscriptions.subscription_opt_in.email.isSubscribed) {
                                    window.kpmgPersonalize.isOptin = true;
                                } else {
                                    window.kpmgPersonalize.isOptin = false;
                                }

                                if (logginIn) {
                                    //tracking on successful login
                                    var loginProvider;
                                    if (response.loginProvider === "site") {
                                        loginProvider = "Login Form";
                                    } else {
                                        loginProvider = response.loginProvider;
                                    }
                                    config.tracking.satelliteTracking({
                                        'Profile': {
                                            ProfileManagement: 'Login',
                                            SignInMethod: loginProvider
                                        }
                                    }, 'profileManagement', false);
                                    config.tracking.track('profileManagement');

                                    _setUserLibrary(IPGFiltered, function (response) {
                                        logger.log(response);
                                        if (response.responseCode === 200) {
                                            personalizationUtils.storeUtils.setUserLibrary(response);
                                            cb();
                                        } else {
                                            genericErrorDialog.showDialog(response);
                                        }
                                    });
                                } else {
                                    //tracking on successful registration
                                    var regProvider;
                                    if (response.loginProvider === "site") {
                                        regProvider = "Form Registration";
                                    } else {
                                        regProvider = response.loginProvider;
                                    }
                                    var countryAndLocale = personalizationUtils.accountUtils.getLocale(),
                                        currentLocale = 'country:' + countryAndLocale.countryCode + ':selected',
                                        currentRegion = 'country:' + countryAndLocale.countryCode + ':' + countryAndLocale.languageCode,
                                        subscriptionValue = '',
                                        communicationValue = '',
                                        trackingObj = {
                                            Register: {
                                                RegistrationMethod: regProvider,
                                                Preferences: []
                                            }
                                        };

                                    if (response.subscriptions &&
                                        response.subscriptions !== null &&
                                        response.subscriptions.subscription_opt_in &&
                                        response.subscriptions.subscription_opt_in.email &&
                                        response.subscriptions.subscription_opt_in.email.isSubscribed) {
                                        subscriptionValue = countryAndLocale.countryCode + '_' + countryAndLocale.languageCode + '_' + 'SubscriptionOptIn:selected';
                                        trackingObj.Register.Preferences.push(subscriptionValue);
                                    }

                                    if (response.subscriptions &&
                                        response.subscriptions !== null &&
                                        response.subscriptions.communication_opt_in &&
                                        response.subscriptions.communication_opt_in.email &&
                                        response.subscriptions.communication_opt_in.email.isSubscribed) {
                                        communicationValue = countryAndLocale.countryCode + '_' + countryAndLocale.languageCode + '_' + 'CommunicationOptIn:selected';
                                        trackingObj.Register.Preferences.push(communicationValue);
                                    }

                                    trackingObj.Register.Preferences.push(currentLocale);
                                    trackingObj.Register.Preferences.push(currentRegion);
                                    config.tracking.satelliteTracking(trackingObj, 'registrationMethod', false);
                                    config.tracking.track('registrationMethod');
                                    cb();
                                }
                            } else {
                                genericErrorDialog.showDialog(response);
                                logger.error("Error updating account info.\n\tMSG:", response.errorMessage);
                            }
                        }
                    });

                } else {
                    genericErrorDialog.showDialog();
                    logger.error("Error in getting account info.\n\tMSG:", response.errorMessage);
                }
            }
        });
    }

    //A closure variable to capture if the user is registring/login
    var landedRegConfirmPage = false;

    function addGigyaListeners() {
        window.gigya.accounts.addEventHandlers({
            onLogin: function (response) {
                function cb() {
                    var processedPath,
                        localeObj = personalizationUtils.accountUtils.getLocale(),
                        localeStr = '/' + localeObj.countryCode + '/' + localeObj.languageCode + '/',
                        currentSite = window.kpmgPersonalize.snp.params.countryCode + '_' + window.kpmgPersonalize.snp.params.languageCode,
                        registeredSiteDashboardUrl = links.dashboard.url.replace(/^\/(\w+)\/(\w+)\//, localeStr),
                        registeredSiteProfileUrl = links.profile.url.replace(/^\/(\w+)\/(\w+)\//, localeStr),
                        accountInfo = personalizationUtils.accountUtils.getInfo(),
                        blogPostUrl = '',
                        onboardingSubscriptionsList;

                    if (window.kpmgPersonalize.misc.isAuthor) {
                        processedPath = window.location.pathname.replace(/^\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, "/$1/$2" + localeStr);
                    } else {
                        processedPath = window.location.pathname.replace(/^\/(\w+)\/(\w+)\//, localeStr);
                    }

                    if (response.newUser) {
                        if ( window.kpmgPersonalize.isPPC && window.kpmgPersonalize.isOptin && personalizationUtils.commonUtils.getValue('origin') ) {
                            analyticsStepCounterTracking(true);
                            personalizationUtils.pathUtils.gotoPage("../../../../" + links.subscriptionsLink.url + window.location.search);
                        } else {
                            analyticsStepCounterTracking(false);
                            personalizationUtils.pathUtils.gotoPage("../../../../" + links.registrationInterestsLink.url + window.location.search);
                        }
                    } else {

                        if (personalizationUtils.commonUtils.getUrlParamsObj().redirectURL) {
                            var loginDoneHeader,
                                loginRedirectURL = personalizationUtils.commonUtils.getUrlParamsObj().redirectURL || '',
                                $loginDoneModal = $('.login-done-modal');
                            if(nameSwitchlog){
                                loginDoneHeader = window.kpmgPersonalize.i18n.gigyaMsgs.kpmg_welcome_back + ' ' + profileInfo.lastName + ' ' + profileInfo.firstName;
                            } else {
                                loginDoneHeader = window.kpmgPersonalize.i18n.gigyaMsgs.kpmg_welcome_back + ' ' + profileInfo.firstName + ' ' + profileInfo.lastName;
                            }
                            saveArticleToLibrary();

                            $loginDoneModal.find('.heading').html(loginDoneHeader);
                            $loginDoneModal.find('.description').html(window.kpmgPersonalize.i18n.gigyaMsgs.kpmg_thank_you_text);
                            $loginDoneModal.find('.return-to-article').attr("href", decodeURIComponent(loginRedirectURL) || getAbsolutePath("../../home.html"));
                            $loginDoneModal.find('.go-to-dashboard').attr("href", getAbsolutePath(window.location.origin + links.dashboard.url));

                            $("html, body").animate({
                                scrollTop: 0
                            }, "slow", function() {
                                $loginDoneModal.bs3modal({
                                    show: true,
                                    backdrop: 'static',
                                    keyboard: false
                                });
                            });
                        } else {
                            if ( window.kpmgPersonalize.isPPC && personalizationUtils.commonUtils.getValue('origin') ) {
                                if (personalizationUtils.commonUtils.getValue('origin') === 'internal') {
                                    personalizationUtils.commonUtils.setValue('cross_site_referrer', document.referrer);
                                }
                                if (processedPath !== window.location.pathname) {
                                    personalizationUtils.commonUtils.setValue('cross_site', true);
                                    personalizationUtils.commonUtils.setValue('cross_site_name', currentSite);
                                }

                                if (accountInfo &&
                                        accountInfo.subscriptions &&
                                        accountInfo.subscriptions[localeObj.countryCode] &&
                                        accountInfo.subscriptions[localeObj.countryCode][localeObj.languageCode] &&
                                        accountInfo.subscriptions[localeObj.countryCode][localeObj.languageCode].terms.email &&
                                        accountInfo.subscriptions[localeObj.countryCode][localeObj.languageCode].terms.email.isSubscribed === false) {

                                    personalizationUtils.pathUtils.gotoPage("../../../../" + registeredSiteDashboardUrl);
                                } else {
                                    if (personalizationUtils.commonUtils.getValue('origin') === 'external') {
                                        onboardingSubscriptionsList = personalizationUtils.commonUtils.getUrlParamsObj().subid || '';
                                        if(onboardingSubscriptionsList !== undefined &&
                                        onboardingSubscriptionsList !== null &&
                                        onboardingSubscriptionsList !== ''){
                                            personalizationUtils.commonUtils.setValue('subid', onboardingSubscriptionsList);
                                        }
                                    }
                                    personalizationUtils.pathUtils.gotoPage("../../../../" + registeredSiteProfileUrl);
                                }
                            } else {
                                personalizationUtils.commonUtils.clearValues('origin');
                                personalizationUtils.commonUtils.clearValues('subid');
                                personalizationUtils.commonUtils.clearValues('cross_site');
                                personalizationUtils.commonUtils.clearValues('cross_site_name');

                                if (personalizationUtils.commonUtils.getValue('redirectToBlog')) {
                                    personalizationUtils.commonUtils.clearValues('redirectToBlog');
                                    blogPostUrl = personalizationUtils.commonUtils.getValue('blogPostUrl');
                                    if(blogPostUrl) {
                                        personalizationUtils.commonUtils.clearValues('blogPostUrl');
                                        personalizationUtils.pathUtils.gotoPage(blogPostUrl);
                                    } else {
                                        personalizationUtils.pathUtils.gotoPage("../../../../" + window.kpmgPersonalize.blogHomePage);
                                    }
                                } else {
                                    personalizationUtils.pathUtils.gotoPage("../../../../" + registeredSiteDashboardUrl);
                                }
                            }

                        }
                    }
                }

                profileInfo = {
                    firstName: response.profile.firstName,
                    lastName: response.profile.lastName
                };

                _setAccountInfoAndRedirect(cb, !response.newUser);
                personalizationUtils.privacyUtils.checkAndSetCookie();
            }
        });
    }

    personalizationUtils.commonUtils.checkForGigyaObject(addGigyaListeners);

    function analyticsStepCounterTracking(onboardingReg){
        var trackingObj={
            "linkLocationID1": "Step:1",
            "linkLocationID2": "Step:1",
            'linkLocation1': onboardingReg ? "Onboarding Registration":"Registration",
            'linkLocation2': onboardingReg ? "Onboarding Registration":"Registration",
            'events': 'event11'
        };
        Helpers.triggerTracking(trackingObj,'Internal Link');
    }

    config = {
        startScreen: "",
        containerID: "",
        element: null
    };
    getAbsolutePath = personalizationUtils.pathUtils.getAbsolutePath;

    Registrationuserinfo = function (elem, componentName) {
        var origin = personalizationUtils.commonUtils.getUrlParamsObj().origin || '',
            localeObj = personalizationUtils.accountUtils.getLocale(),
            localeStr = '/' + localeObj.countryCode + '/' + localeObj.languageCode + '/',
            registeredSiteDashboardUrl = links.dashboard.url.replace(/^\/(\w+)\/(\w+)\//, localeStr),
            registeredSiteProfileUrl = links.profile.url.replace(/^\/(\w+)\/(\w+)\//, localeStr);

        // clearing/setting industrycheck(session) variables to null before registration.
        personalizationUtils.commonUtils.clearValues('industrycheck');

        if(origin && !personalizationUtils.commonUtils.getValue('origin')) {
            //Set origin value in localStorage for subscription on-boarding flow
            personalizationUtils.commonUtils.setValue('origin', origin);

            // subscription ID to get all the subscriptions during on-boarding flow
            var subid = personalizationUtils.commonUtils.getUrlParamsObj().subid || '';
            if(subid && !personalizationUtils.commonUtils.getValue('subid')) {
                //Set "subid" subscription IDs value in localStorage for subscription on-boarding flow
                personalizationUtils.commonUtils.setValue('subid', subid);
            }
        }

        config.element = elem;
        config.componentName = componentName;
        config.startScreen = gigyaRegisterScreen;
        config.containerID = "new-user-registration-info-container";
        // Keep the following lines at the bottom of the Registrationuserinfo function
        config.tracking = new Tracking(elem, 'Registrationuserinfo');

        if (personalizationUtils.accountUtils.isLoggedIn() && !window.kpmgPersonalize.misc.isAuthor) {
            if( window.kpmgPersonalize.isPPC && origin )  {
                //personalizationUtils.commonUtils.clearValues('origin');
                //personalizationUtils.commonUtils.clearValues('subid');
                personalizationUtils.pathUtils.gotoPage("../../../../" + registeredSiteProfileUrl);
                return;
            } else {
                personalizationUtils.commonUtils.clearValues('origin');
                personalizationUtils.commonUtils.clearValues('subid');
                personalizationUtils.pathUtils.gotoPage("../../../../" + registeredSiteDashboardUrl);
                return;
            }
        }

        //Show registration screen
        showScreenSet();

        $(document).trigger('template.loaded');
    };

    Registrationuserinfo.config = config;
    Registrationuserinfo.showScreenSet = showScreenSet;
    Registrationuserinfo.saveArticleToLibrary = saveArticleToLibrary;

    return Registrationuserinfo;
});
