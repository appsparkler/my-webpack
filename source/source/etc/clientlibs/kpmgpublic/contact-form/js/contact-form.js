/* global s */
define(['jquery', 'handlebars', 'precompile', 'tracking', 'helpers', 'modernizr', 'handlebarshelpers', 'personalizationUtils', 'grecaptcha'],
    function($, Handlebars, PrecompiledHandlebars, Tracking, Helpers, Modernizr, handlebarshelpers, personalizationUtils, grecaptcha) {
        'use strict';
        var ContactForm = function(elem) {
            if (personalizationUtils.commonUtils.isDomInitialized(elem)) {
                return;
            }
            var $contactForm = $('#contactForm'),
                formReceiptElem = $('#formReceipt'),
                compName = 'formReciept',
                formReceiptTpl = PrecompiledHandlebars[compName],
                errors = [],
                messages = [],
                $message = $('#message', elem),
                $chatLeftMsg = $('.msgCharLeft .count', elem),
                locationHref = window.location.href,
                widgetId = '';
            $('#contactFormConfirmBox').hide();
            $('body').on('click', '.btn-cta', resetForm);
            var isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));

            function getIEVersion() {
                var agent = navigator.userAgent;
                var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
                var matches = agent.match(reg);
                if (matches !== null) {
                    return {
                        major: matches[1],
                        minor: matches[2]
                    };
                }
                return {
                    major: "-1",
                    minor: "-1"
                };
            }
            var ie_version = getIEVersion();
            var isIE10 = ie_version.major === 10;
            var charLeftNotification = function(evt) {
                var _this = $(evt.target),
                    maxChar = _this.data('maxAllowedChar'),
                    messageEntered = _this.val(),
                    charLeft = maxChar - messageEntered.length;
                if (charLeft <= 0) {
                    $('#message').val(_this.val().substr(0, maxChar));
                }

            };

            $message.on('keypress keyup paste blur', charLeftNotification);
            
            //if (!isIE11) {
            document.querySelector('form[id="contactForm"]').addEventListener("invalid", function(event) {
                event.preventDefault();
            }, true);
            //}

            //Initialize validation
            customizeHtml5Validation($contactForm);
            initContactForm($contactForm, formReceiptTpl, formReceiptElem);

            // track form start
            Helpers.triggerTracking({
                "formName1": "contact-form",
                "formName2": "contact-form",
                "events": "event5"
            }, "formStart");

            function initContactForm(_form, formReceiptTpl, formReceiptElem) {
                var doAjaxSubmit = function(_form) {
                    var processingIcon = $('.processing-submit-icon', elem),
                        submitChevron = $('.submit-chevron', elem);
                    _form.find("label.label-invalid").remove();
                    submitChevron.addClass('hide');
                    processingIcon.removeClass('hide');
                    $('button', _form).prop('disabled', true);
                    $.ajax({
                        url: _form.attr("action"),
                        type: "POST",
                        data: _form.serializeArray()
                    }).done(function(data) {
                        $('button', _form).prop('disabled', false);
                        processingIcon.addClass('hide');
                        submitChevron.removeClass('hide');
                        data = (typeof data === 'string') ? JSON.parse(data) : data;
                        if ((data.status === 1 || data.status === '1') && typeof data.contactForm !== 'undefined' && data.contactForm !== undefined) {
                            var _response = $.extend(data.contactForm, data.receipt);
                            formReceiptElem.html(formReceiptTpl(_response));
                            $(".main-form").hide();
                            $(".modal-contactdialog a.btn-close").attr('data-dismiss', 'modal').removeClass('contact-confirm hide');
                            formReceiptElem.removeClass('hide');
                            $(window).scrollTop($('div.modal-content').offset().top);
                            $(".cf-print-link").on('click', function(e) {
                                e.preventDefault();
                                window.print();
                            });

                            //Accessibility
                            $("a", "#formReceipt").on("keyup", function(e) {
                                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                                    if ($(this).is("a") && $(this).find("img").length > 0) {
                                        $(this).removeAttr("tabindex").find("img").addClass("focusOutline");
                                    } else {
                                        $(this).removeAttr("tabindex").addClass("focusOutline");
                                    }
                                }
                            });
                            $("a", "#formReceipt").on("blur", function() {
                                if ($(this).is("a") && $(this).find("img").length > 0) {
                                    $(this).find("img").removeClass("focusOutline");
                                } else {
                                    $(this).removeClass("focusOutline");
                                }
                            });
                            // track form success
                            Helpers.triggerTracking({
                                "formName1": "contact-form",
                                "formName2": "contact-form",
                                "events": "event6"
                            }, "formComplete");
                        } else if ((data.status === 0 || data.status === '0') && typeof data.errors !== 'undefined' && data.errors !== undefined) {
                            var errors = data.errors;
                            _form.find("input[required], textarea[required]").addClass('field-valid').css({
                                "margin-top": "19px"
                            });
                            $(".custom-select").removeClass("select-no-top-margin");

                            $.each(data.errors, function(i, v) {
                                var f = _form.find("[name='" + v.name + "']"),
                                    m = v.error;
                                if (f.length) {
                                    f.addClass('field-invalid').removeClass('field-valid');
                                    if (f.closest('.form-group').find("input").length !== 0 ||
                                        f.closest('.form-group').find("textarea").length !== 0 ||
                                        f.closest('.form-group').find("select").length !== 0) {
                                        if (v.name === "name") {
                                            $("<label class='label-invalid'>" + m + "</label>").insertBefore(f.closest('.form-group').find("input:last"));
                                            f.closest('.form-group').find("input:last").css({
                                                "margin-top": "0"
                                            });
                                        }
                                        if (v.name === "email") {
                                            $("<label class='label-invalid'>" + m + "</label>").insertBefore(f.closest('.form-group').find("input:last"));
                                            f.closest('.form-group').find("input:last").css({
                                                "margin-top": "0"
                                            });
                                        }
                                        if (v.name === "message") {
                                            $("<label class='label-invalid'>" + m + "</label>").insertBefore(f.closest('.form-group').find("input:last"));
                                        }
                                        if (v.name === "terms") {
                                            $("<label class='label-invalid'>" + m + "</label>").insertBefore(f.closest('.form-group').find("input:last"));
                                            f.closest('.form-group').find("input:last").css({
                                                "margin-top": "0"
                                            });
                                        }
                                        if (v.name === "inquiry") {
                                            $("<label class='label-invalid'>" + m + "</label>").insertBefore($("#inquiry").parent());
                                            f.closest('.form-group').find(".custom-select").addClass("select-no-top-margin");
                                        }
                                        if (v.name === "locations") {
                                            $("<label class='label-invalid'>" + m + "</label>").insertBefore($("#locations").parent());
                                            f.closest('.form-group').find(".custom-select").addClass("select-no-top-margin");
                                        }
                                        if (v.name === "message") {
                                            $("<label class='label-invalid'>" + m + "</label>").insertBefore(f.closest('.form-group').find(".textarea-content"));
                                            f.closest('.form-group').find("textarea:last").css({
                                                "margin-top": "0"
                                            });
                                        }

                                    }
                                    if (!f.hasClass("field-invalid")) {
                                        f.addClass("field-valid");
                                        if (f.attr("id") === "terms") {
                                            $("label[for='terms']").removeClass("field-invalid").addClass("field-valid");
                                            $(".outer-shape").removeClass("field-invalid").addClass("field-valid");
                                        }
                                        f.parent().find(".label-invalid").remove();
                                    } else {
                                        if (f.attr("id") === "terms") {
                                            $("label[for='terms']").removeClass("field-valid").addClass("field-invalid");
                                            $(".outer-shape").removeClass("field-valid").addClass("field-invalid");
                                        }
                                    }
                                }
                            });

                            showErrorSummary(_form, errors);
                            var analyticsError = [];
                            $.each(errors, function(index, value) {
                                var fieldName = value.name;

                                analyticsError.push(fieldName);
                            });
                            // track form error
                            Helpers.triggerTracking({
                                "formName1": "contact-form",
                                "formName2": "contact-form",
                                "formError": analyticsError.toString()
                            }, "formError");
                        }
                    });
                };
                document.getElementById('contactForm').onsubmit = function(e) {
                    e.preventDefault();
                    clearErrorSummary();
                    if (typeof widgetId === "number") {
                        window.grecaptcha.execute(widgetId);
                    }
                    return false;
                };
                // if (isIE11 || isIE10) {
                //     $(".btn-cta").on('click', function() {
                //         $('#contactForm').submit();
                //     });
                // }
                //
                widgetId = grecaptcha.includeRecaptchaValidation(doAjaxSubmit, _form, "recaptchaOverlay-gc");
            }

            function showErrorSummary(_form, errors) {
                if (errors.length) {
                    var markup = '',
                        errMsgArea = $('.err-msg-area');
                    $.each(errors, function(i, v) {
                        var f = _form.find("[name='" + v.name + "']"),
                            id = f.attr('id'),
                            m = f.closest('.form-group').length ? $("label:first", f.closest(".form-group")).attr('data-original-label') : '',
                            label = f.closest('.form-group').length ? $("label:first", f.closest(".form-group")).clone().children().remove().end().text() : '';
                        if (id === "inquiry") {
                            m = f.closest('.form-group').length ? $("label:last", f.closest(".form-group")).attr('data-original-label') : '';
                            label = f.closest('.form-group').length ? $("label:last", f.closest(".form-group")).clone().children().remove().end().text() : '';
                        }
                        if (id === "locations") {
                            m = f.closest('.form-group').length ? $("label:last", f.closest(".form-group")).attr('data-original-label') : '';
                            label = f.closest('.form-group').length ? $("label:last", f.closest(".form-group")).clone().children().remove().end().text() : '';
                        }
                        if (id === "terms") {
                            m = f.closest('.form-group').length ? $("label:last", f.closest(".form-group")).attr('data-original-value-missing') : '';
                            label = f.closest('.form-group').length ? $("label:last", f.closest(".form-group")).attr('data-original-label') : '';
                        }
                        messages.push(m);
                        if (label !== '' && m !== '') {
                            if (label.trim() === label.trim().toUpperCase()) {
                                markup += '<li><a href="' + locationHref + '#' + id + '"><strong class="all-caps">' + '&middot; ' + label.trim() + '</strong></a> ' + '&mdash; ' + m + '</li>';
                            } else {
                                markup += '<li><a href="' + locationHref + '#' + id + '"><strong>' + '&middot; ' + label.trim() + '</strong></a> ' + '&mdash; ' + m + '</li>';
                            }
                        }
                    });

                    $('.err-msg', errMsgArea).empty().html(markup);
                    errMsgArea.show();
                }
            }

            function clearErrorSummary(_form) {
                var errMsgArea = $('.err-msg-area');
                errMsgArea.find('.err-msg').html('');
            }

            function customizeHtml5Validation(_form) {

                $('input,textarea,select').on('blur', onInvalidHandler);
                $(".form-group .checkbox.terms").on('mouseenter', onInvalidHandler);

                function onInvalidHandler(e) {
                    var $target = $(e.target),
                        msg = '',
                    $targetId = $target.attr('id');
                    $target.removeClass('field-invalid');
                    if ($targetId === "inquiry" || $targetId === "locations") {
                        msg = $target.attr('data-errormessage-value-missing');
                        $target.removeClass('field-invalid');
                        if ($target.val().trim() === "") {
                            $target.prev().remove(".label-invalid");
                            $target.parent().prev().remove(".label-invalid");
                            $target.parent().find(".label-invalid").remove();
                            $("<label class='label-invalid'>" + msg + "</label>").insertBefore($target.parent());
                            $target.css('margin-top', '0px');
                            $target.parent().parent().find(".custom-select").css('margin-top', '0px');
                            $target.addClass('field-invalid');
                            $target.attr('aria-label', msg);
                        }
                    } else if ($targetId === "name") {
                        msg = $target.attr('data-errormessage-value-missing');
                        $target.removeClass('field-invalid');
                        if ($target.val().trim() === "") {
                            $target.prev().remove(".label-invalid");
                            $("<label class='label-invalid'>" + msg + "</label>").insertBefore($target);
                            $target.css('margin-top', '0px');
                            $target.addClass('field-invalid');
                            $target.attr('aria-label', msg);
                        }
                    } else if ($targetId === "email") {
                        msg = $target.attr('data-errormessage-value-missing');
                        $target.removeClass('field-invalid');
                        if (!validateEmail($target.val())) {
                            $target.prev().remove(".label-invalid");
                            $("<label class='label-invalid'>" + msg + "</label>").insertBefore($target);
                            $target.css('margin-top', '0px');
                            $target.addClass('field-invalid');
                            $target.attr('aria-label', msg);
                        }
                    } else if ($targetId === "message") {
                        msg = $target.attr('data-errormessage-value-missing');
                        $target.removeClass('field-invalid');
                        if ($target.val() === "") {
                            $target.parent().prev().remove(".label-invalid");
                            $target.find(".label-invalid").remove();
                            $("<label class='label-invalid'>" + msg + "</label>").insertBefore($target.parent());
                            $target.addClass('field-invalid');
                            $target.css('margin-top', '0px');
                            $target.attr('aria-label', msg);
                        }
                    }

                }

                function validateEmail(sEmail) {
                    var filter = /^([a-zA-Z0-9.+_-]*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
                    return filter.test(sEmail);
                }

                //Start of the on submit
                $('button[type="submit"]', _form).on('click', function() {
                    setTimeout(function() { // wait for the invalid fields to populate
                        if (errors.length) {
                            _form.find("[name='" + errors[0].name + "']").trigger('focus');
                        }
                        errors = [];
                        messages = [];
                    }, 100);
                });

                $('input,textarea,select', _form).each(function() {
                    var $elem = $(this),
                        elem = $elem[0],
                        msg = "";

                    // adding "addEventListener" alternative for "elem.oninvalid" as IE donot understand the same.
                    elem.addEventListener("invalid", function(e) {
                        var $target = $(e.target),
                            fieldName = $target.attr("id");
                        $target.removeClass('field-invalid').removeClass('field-valid');
                        $target.closest(".custom-select").removeClass("select-no-top-margin");
                        if ($elem.attr("#id") === "terms") {
                            $("label[for='terms']").removeClass('field-invalid').removeClass("field-valid");
                            $(".outer-shape").removeClass('field-invalid').removeClass("field-valid");
                        }
                        if (!e.target.validity.valid) {
                            if ($target.val() === "") {
                                msg = $target.data("errormessageValueMissing");
                                e.target.setCustomValidity(msg);
                                if (fieldName === "name" || fieldName === "email" || fieldName === ":cq:captcha" || fieldName === "terms") {
                                    $target.parent().find(".label-invalid").remove();
                                    $("<label class='label-invalid'>" + msg + "</label>").insertBefore($target);
                                    $elem.css({
                                        "margin-top": "0"
                                    });
                                    $('.checkbox.terms').css({
                                        "margin-top": "0"
                                    });
                                    $target.attr('aria-label', msg);
                                }

                                if (fieldName === "message") {
                                    $target.parent().parent().find(".label-invalid").remove();
                                    $("<label class='label-invalid'>" + msg + "</label>").insertBefore($target.parent());
                                    $elem.css({
                                        "margin-top": "0"
                                    });
                                    $('.checkbox.terms').css({
                                        "margin-top": "0"
                                    });
                                    $target.attr('aria-label', msg);
                                }


                                if (fieldName === "locations" || fieldName === "inquiry") {
                                    $target.parent().parent().find(".label-invalid").remove();
                                    $("<label class='label-invalid'>" + msg + "</label>").insertBefore($target.parent());
                                    $target.closest(".custom-select").addClass("select-no-top-margin");
                                    $target.attr('aria-label', msg);
                                }
                            } else {

                                if ($elem.data("errormessageCustomError") !== undefined && $elem.data("errormessageCustomError") !== '') {
                                    e.target.setCustomValidity($elem.data("errormessageCustomError"));
                                    msg = $elem.data("errormessageCustomError");
                                }
                            }
                            if ($elem.attr("type") === "checkbox" && !$elem.is(":checked")) {
                                msg = $elem.data("errormessageValueMissing");
                                e.target.setCustomValidity($elem.data("errormessageValueMissing"));
                                $target.parent().find(".label-invalid").remove();
                                $("<label class='label-invalid'>" + msg + "</label>").insertBefore($target);
                                $target.attr('aria-label', msg);
                            }
                            errors.push({
                                "error": msg,
                                "name": $elem.attr('name')
                            });
                            $target.addClass('field-invalid');
                        }
                        showErrorSummary(_form, errors);
                    },true);
                    elem.onchange = function(e) {
                        $elem.removeClass('field-invalid');
                        e.target.setCustomValidity('');
                        $(e.target).attr('aria-label', '');
                        if ($(e.target).attr('id') === 'message') {
                            $(e.target).parent().prev('label').html('');
                        } else {
                            $(e.target).prev('label').html('');
                        }
                        if ($elem.attr('id') === 'inquiry' || $elem.attr('id') === 'locations') {
                            if ($elem.index() > 0) {
                                $(e.target).parent().prev('label').html('');
                            }
                        }
                    };
                    elem.oninput = function(e) {
                        var pattern = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
                        if ($(e.target).attr('type') === 'email' && !pattern.test(pattern)) {
                            return false;
                        }
                        $(e.target).removeClass('field-invalid');
                        e.target.setCustomValidity('');
                    };

                });
            }

            $('#message').on('keyup', function() {
                var charLength = 5000 - $('#message').val().length;
                $('.count').html(charLength);
            });



            function resetForm() {
                $('div[class*="col"]').removeClass('has-error');
                $('.err-msg-area').hide();
                $('.err-msg').html('');
            }

            function analyticsFormValidation(fields) {
                var message = '';
                fields.each(function(index, e) {
                    if ($(this).hasClass("field-invalid")) {
                        var fieldName = $(this).attr("name");
                        if (fieldName === ":cq:captcha") {
                            fieldName = "CAPTCHA";
                        }
                        message = message + fieldName + ',';
                    }
                });
                if (message !== '') {
                    message = message.substring(0, message.length - 1);
                    Helpers.triggerTracking({
                        "formName1": "contact-form",
                        "formName2": "contact-form",
                        "formError": message
                    }, "formError");
                    message = '';
                } else {
                    Helpers.triggerSatteliteTracking('PrivacyAccept_Contact');
                }
            }

            $('button[type="submit"]', elem).on("click", function() {
                if (Modernizr.input.required) {
                    //if (!isIE11) {
                    setTimeout(function() {
                        $("[required]").each(function(index, data) {
                            var _this = $(data);
                            if (!_this.hasClass("field-invalid")) {
                                _this.addClass("field-valid");
                                _this.closest(".custom-select").removeClass("select-no-top-margin");
                                if (_this.attr("id") === "terms") {
                                    $("label[for='terms']").removeClass("field-invalid").addClass("field-valid");
                                    $(".outer-shape").removeClass("field-invalid").addClass("field-valid");
                                }
                                _this.parent().parent().find(".label-invalid").remove();
                                if (_this.attr("id") === "message") {
                                    _this.parent().parent().find(".label-invalid").remove();
                                }
                                _this.css({
                                    "margin-top": "19px"
                                });
                                $('.checkbox.terms').css({
                                    "margin-top": "19px"
                                });
                                $('select.field-valid').css({
                                    "margin-top": "0"
                                });
                            } else {
                                if (_this.attr("id") === "terms") {
                                    $("label[for='terms']").removeClass("field-valid").addClass("field-invalid");
                                    $(".outer-shape").removeClass("field-valid").addClass("field-invalid");
                                }
                            }
                        });
                    }, 100);
                    //}
                    setTimeout(function() {
                        analyticsFormValidation($('.field-invalid', elem));
                    }, 100);
                }
            });

            $('.module-contact-form').on('keyup', "a,:input,select,button[type=submit],textarea", function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {

                    if ($(this).parent().hasClass('custom-select')) {
                        $(this).parent().addClass('focusOutline');
                        $(this).attr("tabindex", "-1").trigger('focus');
                    } else {
                        $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    }
                }
            });

            $('.module-contact-form').on('blur', "a,:input,select,button[type=submit],textarea", function(e) {
                if ($(this).parent().hasClass('custom-select')) {
                    $(this).parent().removeClass('focusOutline');
                    $(this).removeAttr("tabindex");
                } else {
                    $(this).removeAttr("tabindex").removeClass("focusOutline");
                }
            });
            
            $("label[for='terms']").on("mouseenter", function() {
                $(this).addClass("hover-effect-in");
            });
            $("label[for='terms']").on("mouseleave", function() {
                $(this).removeClass("hover-effect-in");
            });

            $(".contact-tab-entry").on("focus", function(e) {
                $("label[for='terms']").addClass("focus-effect-in");
            });
            $(".contact-tab-entry").on("focusout", function(e) {
                $("label[for='terms']").removeClass("focus-effect-in");
            });

            $(".contact-tab-entry").on("keyup", function(e) {
                if (e.which === 32) {
                    $('#terms').trigger("click");
                }
            });
            if (ie_version.major === "9" || navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                $("select").addClass("custom-dropdown");
            }
            /*Confirmation pop up functionality start*/

            $('.modal-contactdialog a.btn-close').removeAttr('data-dismiss').addClass('contact-confirm').removeClass('hide');

            $('.modal-content').on('click', function(event) {

                var _target = $(event.target);
                if (_target.attr('class') === 'removeContactForm' || _target.attr('id') === 'removeContactForm' || _target.attr('class') === 'close-text' || _target.attr('class') === 'formReceiptCloseIcon') {
                    event.preventDefault();
                    $('.modal-dialog a.btn-close').attr('data-dismiss', 'modal').removeClass('contact-confirm hide');
                    $('#kpmgModal').bs3modal('hide');
                    $('#kpmgModal').modal('hide');
                } else if (_target.attr('class') === "contactCancel") {
                    return false;
                } else {
                    event.stopPropagation();
                }

            });
            var esckey = false;
            $(document).on('keydown', function(event) {
                var keycode = (event.keyCode ? event.keyCode : event.which),
                    esckey = true;
                if (keycode === 27) {
                    $('#kpmgModal').bs3modal('hide');
                    $('#kpmgModal').modal('hide');
                    $('.modal-dialog a.btn-close').attr('data-dismiss', 'modal').removeClass('contact-confirm hide');
                }
            });
            $('.contact-confirm,#kpmgModal').on('click', function(e) {
                e.preventDefault();
                confirmationDialog();
            });

            function confirmationDialog(keycode, event) {
                if (keycode === 27 && esckey) {
                    event.preventDefault();
                }
                $('#contactForm').hide();
                $('#contactFormConfirmBox').show();
                $('.description').hide();
                $('.pcf-required').hide();
                $('.confirmPopUpHeading').html($('.module-contact-form').data('confirmtitle')).show();
                $('.modal-contactdialog a.btn-close').removeClass('show').addClass('hide');
            }
            $('.contactCancel').on('click', function(evt) {

                evt.preventDefault();

                $('#contactFormConfirmBox').hide();
                $('.modal-contactdialog a.btn-close').removeClass('hide');
                $('#contactForm').show();
                $('.description').show();
                $('.pcf-required').show();
                if (window.kpmg.isMobile) {
                    $('.primary-head.mobile-only').show();
                    $('.description.mobile-only').show();
                    $('.primary-head.desktop-only').hide();
                    $('.description.desktop-only').hide();
                } else {
                    $('.primary-head.desktop-only').show();
                    $('.description.desktop-only').show();
                    $('.primary-head.mobile-only').hide();
                    $('.description.mobile-only').hide();
                }
                $('.confirmPopUpHeading').hide();
            });

            function autoPopulate() {
                var profileInfo = personalizationUtils.accountUtils.getProfileInfo();
                if (profileInfo) {
                    var $name = $('#contactForm #name'),
                        $email = $('#contactForm #email'),
                        $company = $('#contactForm #company'),
                        $role = $('#contactForm #role'),
                        $country = $('#contactForm #locations');

                    $name.val(profileInfo.firstname + ' ' + profileInfo.lastName);
                    $email.val(profileInfo.email);
                    $company.val(profileInfo.company);
                    $role.val(profileInfo.role);

                    $('#contactForm #locations option').each(function() {
                        var value = $(this).val(),
                            country = value.substr(0, value.length - 3);
                        if (country === profileInfo.country) {
                            $country.val(value);
                        }
                    });
                }
            }

            autoPopulate();

            var track = new Tracking(elem, 'ContactForm');
            window.digitalData.page.SignInStatus = personalizationUtils.accountUtils.isLoggedIn() ? 'SignedIn' : 'SignedOut';
            window.digitalData.page.UserType = personalizationUtils.accountUtils.getInfo() ? 'Registered User' : 'Anonymous User';

            /*Confirmation pop up functionality end*/
            $(document).trigger('template.loaded');
        };
        return ContactForm;
    }
);
