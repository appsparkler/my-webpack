define(['jquery', 'tracking', 'personalizationUtils'],
    function($, Tracking, personalizationUtils) {
        'use strict';
        /*jshint -W116 */
        /*
              (the elem will be hidden initially)
              //
              setup_eventHandlers();

              function setup_eventHandlers() {
                  setEmailFieldEventHandler();
                  setTextFieldEventHandlers();
                  setTextAreaFieldEventHandlers();
                  setFormCTAEventHandler();
                  setCloseFormButtonEventHandler();
              }

              function setCloseFormButtonEventHandler() {
                $(elem).on('click', 'close-button', closeFormButtonEventHandler);
              }

              function closeFormButtonEventHandler() {
                closeTheFormWithRequiredAnimation`();
              }

              function setTextFieldEventHandlers() {
                $(elem).on('change', '[type=text]', handleTextFieldChangeEvent);
              }

              function setTextAreaFieldEventHandlers() {
                $(elem).on('change', textarea, handleTextAreaFieldChangeEvt);
              }

              function handleTextAreaFieldChangeEvt(evt) {

              }

              function handleTextFieldChangeEvent(evt) {

              }

              function setEmailFieldEventHandler() {
                $('email-field').on('change', function(){
                    validateForm();
                    if(isRegisteredUser()) display_requestUserToLoginStateOfComponent();
                })
              }

              function validateForm() {
                if(!isEmailFieldValid()) showEmailValidationError();
                ;
                areTextAreaFieldsValid();

                if(isEmailValid() && areTextFieldsValid() && areTextAreaFieldsValid()) display_validStateOfForm();
                else display_invalidStateOfForm();
              }

              function display_validStateOfForm() {

              }

              function display_invalidStateOfForm() {

              }

              function areTextFieldsValid() {
                returns Boolean;
              }

              function areTextAreaFieldsValid() {
                returns Boolean;
              }

              function renderFormWithAnimation() {
                if(is_userLoggedIn() && FGE_ID_IsFoundUnderUsersProfile()) display_registeredStateOfComponent();
                else if(is_userLoggedIn()  && !FGE_ID_IsFoundUnderUsersProfile()) display_readyToCompleteStateOfComponent();
                else renderDefaultStateOfForm();
              }
            */
        /*jshint validthis:true */

        /* FormBuilder Constructor */
        var GLOBALS = {
            // grecaptchaSiteKey: '6Ld0xZgUAAAAAP3XoIX_RrWB9osWbmPHv59vIPqk'
            grecaptchaSiteKey: '6Ld0xZgUAAAAAP3XoIX_RrWB9osWbmPHv59vIPqk'
        };

        var FormBuilder = function(elem) {
            this.elem = elem;
            this.defaultForm = $(elem)
                .find('.default-form')
                .get(0);
            this.existingUserLoginForm = $(elem)
                .find('.existing-user-login-form')
                .get(0);
            this.init()
        };

        FormBuilder.isAvailableLoginID = function(loginID) {
            try {
                return new window.Promise(function(resolve, reject) {
                    window.gigya.accounts.isAvailableLoginID({
                        loginID: loginID,
                        callback: resolve
                    });
                });
            } catch (e) {
                console.log('error in isAvailableLoginID ' + e);
            }
        };

        FormBuilder.get_userAccountInfo = function() {
            return new window.Promise(function(resolve, reject) {
                try {
                    window.gigya.accounts.getAccountInfo({
                        callback: resolve
                    });
                } catch (e) {
                    console.error('get_userAccountInfo error : ', e);
                    reject(e);
                }
            });
        };

        FormBuilder.prototype.init = function() {
            this.move_elementToFormBuilderContainer();
            $(this.elem).on(
                'kpmg-formbuilder:display-form', this.handle_displayForm.bind(this)
            );

            // Keep the following lines at the bottom of the Formbuilder function
            // this.execute_defaultCode();
        };

        FormBuilder.prototype.handle_displayForm = function(evt) {
            var is_FGE_ID_Listed_Under_UsersProfile = this.is_FGE_ID_Listed_Under_UsersProfile();
            var isUserLoggedIn = personalizationUtils.accountUtils.isLoggedIn();

            this.setup_cancelButtons();

            if(isUserLoggedIn && is_FGE_ID_Listed_Under_UsersProfile)
                this.display_registeredStateOfComponent(evt);
            else if(isUserLoggedIn && !is_FGE_ID_Listed_Under_UsersProfile)
                this.setup_defaultForm.call(this, evt, isUserLoggedIn);
            else this.setup_defaultForm.call(this, evt, isUserLoggedIn);
        };

        FormBuilder.prototype.setup_cancelButtons = function() {
            $('.cancelButton', this.elem).click(this.handle_cancelButtonClicked.bind(this));
        };

        FormBuilder.prototype.handle_cancelButtonClicked = function(evt) {
            var $flexContainerObj = $('.module-tmpl-flex .flex-container');
            var $flexCtaContainerObj = $('.module-tmpl-flex .flex-container .flex-cta-container');
            var $formBuilderObj = $('.module-tmpl-flex .form-builder');
            var $informativeImageObj = $('.module-tmpl-flex .flex-informative-image');

            $flexContainerObj.removeClass('left-flex');
            $flexCtaContainerObj.removeClass('cta-hide');
            $formBuilderObj.removeClass('form-builder-show');
            $informativeImageObj.removeClass('show-informative-image');
            $(this.elem).hide(300);
            if(this.defaultFormObj) this.defaultFormObj.clear();
            if(this.defaultFormObj) delete this.defaultFormObj;

            $('.grecaptcha-badge').remove();
        };

        FormBuilder.prototype.move_elementToFormBuilderContainer = function() {
            var formbuilder = this;
            // CODE ONLY TO MOVE THE ELEMENT TO FORM BUILDER CONTAINER.
            // move formbuilders to .form-builder container
            $('.form-builder').append(formbuilder.elem);
        };

        FormBuilder.prototype.execute_defaultCode = function() {
            // Keep the following lines at the bottom of the Formbuilder function
            var formbuilder = this;
            var trck = new Tracking(formbuilder.elem, 'Formbuilder');
            $(document).trigger('template.loaded');
        };

        FormBuilder.prototype.setup_defaultForm = function(evt, isUserLoggedIn) {
            // to be contd...
            // Setup the blur event on the email field (also set emailField on formbuilder properties)
            // $(formbuilder.emailField)...
            var defaultForm = new DefaultForm(this.defaultForm, isUserLoggedIn);
            defaultForm.init();
            this.defaultFormObj = defaultForm;
            this.animate_slideInDefaultForm(evt);
            // EVENTS SPECIFIC TO DEFAULT FORM
            // setup_changeEventOnEmailField();
        };

        FormBuilder.prototype.animate_slideInDefaultForm = function(evt) {
            // KEEP ALL CODE FOR RENDERING THE DEFAULT-FORM WITHIN THIS BLOCK
            var flexContainerObj = $('.module-tmpl-flex .flex-container'),
                flexCtaContainerObj = $('.module-tmpl-flex .flex-container .flex-cta-container'),
                formBuilderObj = $('.module-tmpl-flex .form-builder'),
                informativeImageObj = $('.module-tmpl-flex .flex-informative-image');

            flexContainerObj.addClass('left-flex');
            flexCtaContainerObj.addClass('cta-hide');
            formBuilderObj.addClass('form-builder-show');
            informativeImageObj.addClass('show-informative-image');

            $(this.elem).show();
            $(this.defaultForm).show();

            $("html, body").animate({ scrollTop: 0 }, "slow");
            $('input[name="email"]:visible,input[name="Email"]:visible').focus();
            reset_contentFrameHeightInAuthorMode();
        };

        FormBuilder.prototype.setup_changeEventOnEmailField = function() {
            var formbuilder = this;
            if(!formbuilder.is_userLoggedIn())
                $('[name=email]', formbuilder.defaultForm).on('change',
                    formbuilder.handle_changeEventOnEmailField.bind(this, formbuilder));
        };

        FormBuilder.prototype.is_registeredUser = function() {
            var formbuilder = this;
            return true;
        };

        FormBuilder.prototype.is_emailValid = function(email) {
            var formbuilder = this;
            return true;
        };

        FormBuilder.prototype.is_FGE_ID_Listed_Under_UsersProfile = function() {
            var formbuilder = this;
            return false;
        };

        FormBuilder.prototype.display_registeredStateOfComponent = function(evt) {
            var formbuilder = this;
            // alert('ready to display registered state of component?');
        };

        FormBuilder.prototype.is_userLoggedIn = function() {
            return false;
        };

        // DefaultForm Constructor
        var DefaultForm = function(elem, isUserLoggedIn) {
            this.elem = elem;
            this.isUserLoggedIn = isUserLoggedIn;
            this.$elem = $(elem);
            this.$submitButton = $('.submit-form', elem);
            this.$textFields = $('input, select, textarea', elem);
            this.$form = $('form', elem);
            // TODO set email field
            this.$emailField = $(elem).find('input[name=email][type=email]');
        };

        DefaultForm.prototype.init = function() {
            this.setup_eventHandlers();
            this.setup_customCheckboxes();
            this.setup_dynamicSelectCountryFields();
            if(this.isUserLoggedIn) this.autofill_userForm();
            if(!this.isUserLoggedIn) this.setup_blurEventOnEmailField();
        };

        DefaultForm.prototype.setup_blurEventOnEmailField = function() {
            this.$emailField.on('blur', this.handle_emailBlurEvent.bind(this));
        };

        DefaultForm.prototype.handle_emailBlurEvent = function(evt) {
            var loginID = evt.target.value;
            FormBuilder
                .isAvailableLoginID(loginID)
                .then(this.conditionallyShow_loginForm.bind(this, loginID));
        };

        DefaultForm.prototype.conditionallyShow_loginForm = function(loginID, res) {
            try {
                var isUserAlreadyRegistered = res.isAvailable === false;
                if(isUserAlreadyRegistered) this.setupLoginForm(loginID);
            } catch (e) {
                console.log('error in conditionallyShow_loginForm : ', e);
            }
        };

        DefaultForm.prototype.setupLoginForm = function(loginID) {
            var $formbuilderModule = this.$elem.closest('.module-formbuilder');
            var existingUserLoginDiv = $formbuilderModule.find('.existing-user-login-form').get(0);
            this.existingUserLoginForm = new ExistingUserLoginForm(existingUserLoginDiv, loginID);
            this.existingUserLoginForm.init();
            this.existingUserLoginForm.$elem.addClass('slideInRight').show();
            this.$elem.hide();
        };

        DefaultForm.prototype.validate = function() {
            // VALIDATION AND FORM SUBMISSION HERE.
            // alert("TEst");
            var $required = this.$textFields.filter('[required]:visible');
            // var allRequired = true;
            $required.each(function() {
                if($(this).val() === '') {
                    if($(this).attr("name") === "email" || $(this).attr("name") === "Email") {
                        $(this).prev().removeClass("hide-errormsg");
                    } else {
                        $(this).parents(".formfield-wrapper").find(".error-message").removeClass("hide-errormsg");
                    }
                    $(this).addClass("errorfield");
                } else {
                    $(this).parents(".formfield-wrapper").find(".error-message").addClass("hide-errormsg");
                    $(this).removeClass("errorfield");
                }
            });
        };

        DefaultForm.prototype.setup_eventHandlers = function() {
            this.$submitButton
                .on('click', this.validate.bind(this));
            this.$textFields
                .on('change', this.validate.bind(this));
        };

        DefaultForm.prototype.autofill_userForm = function(evt) {
            FormBuilder.get_userAccountInfo()
                .then(this.autofill_formFields.bind(this));
            this.$emailField.attr('disabled', true);
        };

        DefaultForm.prototype.autofill_formFields = function(userInfo) {
            try {
                var $formFields = $('select, textarea, input', this.defaultForm); // MOVE this to DefaultFormObject
                var profile = userInfo.profile;
                $formFields.each(function() {
                    if(this.name === 'email') this.value = profile.email;
                    if(this.name === 'country') $(this).val(profile.country).trigger('change');
                    if(this.name === 'firstname') this.value = profile.firstName;
                    if(this.name === 'lastname') this.value = profile.lastName;
                });
            } catch (e) {
                console.log('error in autofill_formFields : ', e);
            }
        };

        DefaultForm.prototype.clear = function() {
            if(this.$form) this.$form.trigger('reset').find('select').trigger('change');
            this.$form.find(".error-message").addClass("hide-errormsg");
            this.$form.find('.errorfield').removeClass("errorfield");
        };

        DefaultForm.prototype.setup_dynamicSelectCountryFields = function() {
            var $dynamicSelectCountryFields = $('.dynamic-select-country[name="country"]', this.elem);
            $dynamicSelectCountryFields.each(function() {
                new DynamicSelectCountryField(this).init();
            });
        };

        DefaultForm.prototype.setup_customCheckboxes = function() {
            var $customCheckboxes = $('.custom-tc', this.elem);
            $.each($customCheckboxes, function() {
                var checkbox = new CustomCheckbox(this);
                checkbox.init();
            });
        };

        /* CustomCheckbox Constructor */
        var CustomCheckbox = function(elem) {
            var $customCheckbox = $(elem);
            this.elem = elem;
            this.$checkbox = $customCheckbox.find('input[type=checkbox]');
            this.$checkboxButton = $customCheckbox.find('button.custom-checkbox');
            this.$iconCheckmark = $customCheckbox.find('span.icon-checkmark');
            this.setInitialStateOfCheckbox();
        };

        CustomCheckbox.prototype.isCheckboxChecked = function() {
            try {
                var isChecked = this.$checkbox.is(':checked');
                return isChecked;
            } catch (e) {
                console.log('error in isCheckboxChecked' + e);
            }
        };

        CustomCheckbox.prototype.setInitialStateOfCheckbox = function() {
            if(this.isCheckboxChecked()) this.$iconCheckmark.show();
            else this.$iconCheckmark.hide();
        };

        CustomCheckbox.prototype.handle_checkboxClicked = function(evt) {
            var $checkbox = this.$checkbox;
            var isChecked = $checkbox.is(':checked');
            var $iconCheckmark = this.$iconCheckmark;
            //
            if(isChecked) $checkbox.prop('checked', false);
            else $checkbox.prop('checked', true);
            // toggle checkmark
            this.$iconCheckmark.toggle();
        };

        CustomCheckbox.prototype.init = function() {
            var customCheckbox = this;
            var $checkboxButton = this.$checkboxButton;
            this.$checkboxButton.click(this.handle_checkboxClicked.bind(this));
        };

        var DynamicSelectCountryField = function(elem) {
            this.elem = elem;
            this.$select = $(this.elem);
        };

        DynamicSelectCountryField.prototype.init = function() {
            var dynamicSelect = this;
            var $select = dynamicSelect.$select;
            dynamicSelect.setup_placeholderStyles();
            // this
            promise_countryList()
                .then(dynamicSelect.setDynamicOptions.bind(this));
        };

        DynamicSelectCountryField.prototype.setup_placeholderStyles = function() {
            var $select = $(this.elem);
            set_selectElemColorBasedOnValue.call(this.elem);
            $select.on('change', set_selectElemColorBasedOnValue.bind(this.elem));
        };

        DynamicSelectCountryField.prototype.setDynamicOptions = function(optionValues) {
            optionValues.forEach(iterateOptionValues.bind(this));
        };

        var ExistingUserLoginForm = function(elem, loginID) {
            var recaptchaContainerID = 'formbuilder-loginform-g-recaptcha-container';
            this.elem = elem;
            this.$elem = $(elem);
            this.loginID = loginID;
            this.$emailField = $('[type=email][name=email]', elem);
            this.$passwordField = $('[type=password][name=password]', elem);
            this.$cancelButton = $(elem).find('.cancelButton');
            this.$loginButtons = $(elem).find('.login-button');
            // remove existing if available and set a new container on initialization.
            $('#' + 'formbuilder-loginform-g-recaptcha-container').remove();
            this.$recaptchaContainer = $('<div>', { id: recaptchaContainerID }).appendTo('body');
        };

        ExistingUserLoginForm.prototype.init = function() {
            this.autofill_loingID();
            this.setup_cancelButtonClickHandler();
            this.setup_loginButtons();
        };

        ExistingUserLoginForm.prototype.autofill_loingID = function() {
            this.$emailField.val(this.loginID);
        };

        ExistingUserLoginForm.prototype.setup_loginButtons = function() {
            this.$loginButtons.each(this.iterateLoginButtons.bind(this));
        };

        ExistingUserLoginForm.prototype.iterateLoginButtons = function(idx, elem) {
            var loginButton = new LoginButton(elem, this);
            loginButton.init();
        };

        ExistingUserLoginForm.prototype.setup_cancelButtonClickHandler = function() {
            var existingUserLoginForm = this;
            this.$cancelButton.click(function() {
                existingUserLoginForm.$elem.hide();
            });
        };

        // LOGIN BUTTON
        var LoginButton = function(elem, existingUserLoginForm) {
            this.$el = $(elem);
            this.existingUserLoginForm = existingUserLoginForm;
            this.$button = $(elem).find('button');
            this.provider = $(elem).attr('data-provider');
        };

        LoginButton.prototype.initializeSocialLogin = function() {
            window.gigya.accounts.socialLogin({
                provider: this.provider,
                callback: function() {
                    console.log(arguments);
                }
            });
        };

        LoginButton.prototype.initializeSiteLogin = function($recaptchaContainer) {
            var config = {
                loginID: this.existingUserLoginForm.$emailField.val(),
                password: this.existingUserLoginForm.$passwordField.val(),
                callback: this.userLoginSuccess.bind(this, $recaptchaContainer)
            };
            console.log(config);
            window.gigya.accounts.login(config);
        };

        LoginButton.prototype.userLoginSuccess = function($recaptchaContainer, res) {
            if(res.isRegistered) alert('User is successfully logged in.');
        };

        LoginButton.prototype.initializeUserLogin = function($recaptchaContainer) {
            if(this.provider !== 'site') this.initializeSocialLogin($recaptchaContainer);
            else if(this.provider == 'site') this.initializeSiteLogin($recaptchaContainer);
        };

        LoginButton.prototype.recaptchaCallback = function($recaptchaContainer, token) {
            var response = window.grecaptcha.getResponse(this.widgetID);
            window.grecaptcha.reset(this.widgetID);
            if(token === response) this.initializeUserLogin($recaptchaContainer);
        };

        LoginButton.prototype.render_reCaptchaWidget_and_set_widgetID = function() {
            var $recaptchaContainer = $('<div>', {
                id: 're-captcha-container-' + new Date().getTime()
            }).appendTo(this.existingUserLoginForm.$recaptchaContainer);
            var recaptchaContainer = $recaptchaContainer.get(0);
            var widgetID = window.grecaptcha.render(recaptchaContainer, {
                size: 'invisible',
                sitekey: GLOBALS.grecaptchaSiteKey,
                callback: this.recaptchaCallback.bind(this, $recaptchaContainer),
                theme: 'light'
            });
            this.widgetID = widgetID;
        };

        LoginButton.prototype.setup_loginCTAClickEvent = function() {
            this.$button.on('click', this.handle_loginCTAClick.bind(this));
        };

        LoginButton.prototype.handle_loginCTAClick = function(evt) {
            window.grecaptcha.execute(this.widgetID);
        };

        LoginButton.prototype.setup_recaptcha_and_login_CTA_Event = function() {
            this.render_reCaptchaWidget_and_set_widgetID();
            this.setup_loginCTAClickEvent();
        };

        LoginButton.prototype.init = function() {
            window.grecaptcha.ready(this.setup_recaptcha_and_login_CTA_Event.bind(this));
        };

        // independent scoped functions
        function set_elemColor(color) {
            $(this).css({
                color: color
            });
        }

        function set_selectElemColorBasedOnValue() {
            var color = {
                black: '#000',
                gray: '#ccc'
            };
            if(this.value) set_elemColor.call(this, color.black);
            else set_elemColor.call(this, color.gray);
        }

        function promise_countryList() {
            return new window.Promise(function(resolve, reject) {
                var languageCode = personalizationUtils.accountUtils.getLocale().languageCode;
                $.getJSON('/bin/kpmg/listAllCountries.' + languageCode + '.json', resolve, reject);
            });
        }

        function iterateOptionValues(optionObj, idx) {
            var $option = $('<option />', {
                value: optionObj.countryname,
                text: optionObj.countryname
            });
            $(this.$select).append($option);
        }

        function handle_changeEventOnEmailField(formbuilder, evt) {
            if(formbuilder.is_emailValid(evt.target.value) &&
                formbuilder.is_registeredUser(evt.target.value)
            ) formbuilder.display_existingUserLoginForm();
        }

        function display_existingUserLoginForm(formbuilder, evt) {
            formbuilder.animateOut_defaultForm(formbuilder, evt);
            formbuilder.animateIn_existingUserLoginForm(formbuilder, evt);
        }

        function animateOut_defaultForm(formbuilder, evt) {
            $(formbuilder.defaultForm)
                .removeClass('slideInRight')
                .hide();
        }

        function animateIn_existingUserLoginForm(formbuilder, evt) {
            $(formbuilder.existingUserLoginForm)
                .removeClass('slideOutRight')
                .show()
                .addClass('slideInRight');
        }

        function reset_contentFrameHeightInAuthorMode() {
            /*jshint -W117 */
            try {
                if(window.Granite) {
                    setTimeout(window.Granite.author.inner.EditorFrame.postMessage.bind(null, 'kpmg-cq-contentframe-layout-change-auto', null, -1), 500);
                }
            } catch (e) {
                console.log(e);
            }
        }

        return FormBuilder;
    }
);
