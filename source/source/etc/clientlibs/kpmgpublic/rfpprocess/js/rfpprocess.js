/* global s */
/* _satellite */
/* global CQ */
define(['jquery', 'helpers', 'personalizationUtils'],
    function($, Helpers, personalizationUtils) {
        'use strict';

        var RfpProcess = function() {
            // helper to convert form data to JSON
            var $components = $('.component');
            $.each($components, function (index, val) {
                var name = $(val).attr('class'),
                    module = name.substring(7, name.indexOf(' '));
                require([module], function (mod) {
                    mod(val, module);
                });
            });
            $.fn.serializeObject = function() {
                var o = {};
                var a = this.serializeArray();
                $.each(a, function() {
                    if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            };
            var locationHref = window.location.href,
                firstEmptyElementFocused = false, // used for accessibility focus handling
                rfpModalArray = {
                    RFPModal: JSON.parse($("#RFPModal").attr('data-RFPModal'))
                };

            if (!rfpModalArray.RFPModal.author) {
                $('.request-details,.contact-info,#rfpConfirmBox').hide();
                //$("#rfpConfirmBox").insertAfter(".rfp-header");
                $('.contact-info,.request-details').css("float", "none");
            }

            var moduleRFP = $('.module-rfpprocess'),
                fileSize = 0,
                curStep = 0,
                rfpID = null,
                fileName = '',
                tempChar = '',
                macGen = rfpModalArray.RFPModal.macgenurl,
                rfpServiceURL = rfpModalArray.RFPModal.serviceurl,
                rfpFileUploadURL = rfpModalArray.RFPModal.fileuploadurl,
                rfpModifyURL = rfpModalArray.RFPModal.modifyurl,
                rfpGetURL = rfpModalArray.RFPModal.geturl,
                rfpSubmitURL = rfpModalArray.RFPModal.submiturl,
                rfpCaptchaURL = rfpModalArray.RFPModal.captchaurl,
                rfpDeleteURL = rfpModalArray.RFPModal.deleteurl,
                rfpCanceluploadURL = rfpModalArray.RFPModal.cancelurl,
                rfpCancel = rfpModalArray.RFPModal.cancel,
                rfpRemove = rfpModalArray.RFPModal.remove,
                rfpBrowse = rfpModalArray.RFPModal.browse,
                rfpCountryId = rfpModalArray.RFPModal.countryid,
                rfpAnalyticId = rfpModalArray.RFPModal.analyticid,
                rfpClientYes = rfpModalArray.RFPModal.alreadyclientyes,
                rfpClientNo = rfpModalArray.RFPModal.alreadyclientno,
                rfpLangId = rfpModalArray.RFPModal.industrylangid,
                rfpLanguage = rfpModalArray.RFPModal.industrylanguage,
                selectTerritory = rfpModalArray.RFPModal.selectterritory,
                corruptfile = rfpModalArray.RFPModal.corruptfile,
                invalidtoken = rfpModalArray.RFPModal.invalidtoken,
                uploadlimit = rfpModalArray.RFPModal.uploadlimit,
                generalerror = rfpModalArray.RFPModal.generalerror,
                duplicatefile = rfpModalArray.RFPModal.duplicatefile,
                invalidrfp = rfpModalArray.RFPModal.invalidrfp,
                connectionerror = rfpModalArray.RFPModal.connectionerror,
                nofileselected = rfpModalArray.RFPModal.nofileselected,
                servletUrl = rfpModalArray.RFPModal.servletUrl,
                errMessage = "",
                action = '',
                captchaStartTime = 0,
                msg = '',
                formClean = '',
                formUnClean = '';
            var $rfpFormStep0 = $('#rfpFormStep0'),
                $rfpFormStep1 = $('#rfpFormStep1'),
                stepOneLoading = $('.loading-step-one'),
                stepTwoLoading = $('.loading-step-two'),
                stepThreeLoading = $('.loading-step-three');
            var fileAbort = [],
                industryAjax,
                authAjax,
                getAjax,
                createAjax,
                modifyAjax,
                cancelRemoveAjax,
                submitAjax,
                lastvisitedUrl = localStorage.getItem("lastvisitedURL"),
                referealUrlRfp = lastvisitedUrl || "External Source";

            customizeHtml5Validation($rfpFormStep0);
            resetFormError();

            if(lastvisitedUrl) {
                $(".removeRFP").attr("href", lastvisitedUrl);
                localStorage.removeItem("lastvisitedURL");
            } else {
                $(".removeRFP").attr("href", $('a.logo-image-component').attr("href"));
            }

            $("label[for='overview-privacy'],label[for='AlreadyClient'],.rfpChecks").on("mouseenter", function() {
                $(this).addClass("hover-effect-in");
            });
            $("label[for='overview-privacy'],label[for='AlreadyClient'],.rfpChecks").on("mouseleave", function() {
                $(this).removeClass("hover-effect-in");
            });

            $('.step2 .btn-group a').on('click', function(evt) {
                evt.preventDefault();
                if (!$(this).hasClass('disableCancelRemove')) {
                    handleFileCancelRemove(evt.target);
                }
            });

            $('.input-file').on('mouseover', function() {
                $(this).prev('.btn-group').find('.text-rfpBrowse').addClass("file-browse-underline");
            });

            $('.input-file').on('mouseout', function() {
                $(this).prev('.btn-group').find('.text-rfpBrowse').removeClass("file-browse-underline");
            });

            $('.input-file').on('change', function(evt) {
                var objFile = evt.target.files[0],
                    $target = $(evt.currentTarget).parent();
                if (objFile) {
                    fileSize = objFile.size;
                    fileName = objFile.name;
                    $('#output-' + $(this).attr('id')).addClass('file-nobrdr');
                    $('#output-' + $(this).attr('id')).html(fileName + "&nbsp;<span class='file-size'>(" + formatFileSize(fileSize) + ")</span>");
                    $('<span class="icon-spinner"></span>').insertAfter('#output-' + $(this).attr('id'));
                    var fileFullPath = $(this).val();
                    var fileNameIndex = fileFullPath.lastIndexOf("\\") + 1;
                    var filename = fileFullPath.substr(fileNameIndex);
                    handleFormUpload(objFile, filename, $target, $(this).attr('id'));
                }
            });
            captchaTimer();
            customizeHtml5Validation($rfpFormStep1);
            //Removing consolidated error messages as per requirement change
            // $('#rfpFormStep1 .rfp-nav button.btn-step1').on('click', function() {
            //     customizeHtml5ValidationErrorMessage($rfpFormStep1);
            // });
            //Removing step2 button disabled until the user fills all the form data
            // $("form#rfpFormStep1 :input").on('change keyup', function() {
            //     enableSubmitStepOne($rfpFormStep1);
            // });


            $('#rfpcq_captchaimg').hide();

            function captchaImage() {
                getAuthToken(function(dataToken) {
                    var xh;
                    if (window.XMLHttpRequest) {
                        xh = new XMLHttpRequest();
                    } else if (window.ActiveXObject) {
                        xh = new window.ActiveXObject('Microsoft.XMLHTTP');
                    } else {
                        throw new Error("Could not create XMLHttpRequest object.");
                    }
                    tempChar = Math.floor((1 + Math.random()) * 0x10000000000).toString(16).substring(1) +
                        Math.floor((1 + Math.random()) * 0x10000000000).toString(16).substring(1) +
                        Math.floor((1 + Math.random()) * 0x10000000000).toString(16).substring(1) +
                        Math.floor((1 + Math.random()) * 0x100).toString(16).substring(1);
                    xh.open("GET", rfpCaptchaURL + "?get=image&c=RFPCaptcha&t=" + tempChar, true);
                    xh.setRequestHeader("AUTH_TOKEN", dataToken.token);
                    xh.responseType = 'arraybuffer';
                    xh.send();
                    xh.onreadystatechange = function() {
                        if (xh.readyState === 4) {
                            if (xh.status === 200) {
                                var uInt8Array = new Uint8Array(this.response);
                                var i = uInt8Array.length;
                                var biStr = new Array(i);
                                while (i--) {
                                    biStr[i] = String.fromCharCode(uInt8Array[i]);
                                }
                                var data = biStr.join('');
                                var base64 = window.btoa(data);
                                $('.rfp-captchaDescription').html('<img src="data:image/jpeg;base64,' + base64 + '"/>');
                            }

                        }
                    };
                });
            }

            if ($("<input type='file'>").get(0).files === undefined) {
                $('.IE9-msg-area').show();
                $("input[type='file']").hide();
                $(".file-browse").removeClass("file-browse").addClass('disable-browse');
                $(".icon-browse,.output-file").prop('disabled', true).addClass('browse-disable');
                $(".form-modify .output-file").css('border-color', '#dedede');
            }

            var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
            var isIE = false || !!document.documentMode;

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
            var isIE9 = ie_version.major === 9;

            if (isIE) {
                $('#rfpFormStep0,#rfpFormStep1').h5Validate({
                    errorClass: 'field-invalid'
                });
            }

            if (isSafari) {
                $('#rfpFormStep1').on("submit", function(e) {
                    if (!this.checkValidity()) {
                        return false;
                    }
                });
            }
            document.querySelector('form').addEventListener("invalid", function(event) {
                event.preventDefault();
            }, true);
            document.querySelector('form[name="rfp-step1"]').addEventListener("invalid", function(event) {
                event.preventDefault();
            }, true);
            document.querySelector('form[name="rfp-step2"]').addEventListener("invalid", function(event) {
                event.preventDefault();
            }, true);

            $('.modal-rfpdialog a.btn-close').removeAttr('data-dismiss').addClass('rfp-confirm').removeClass('hide');

            var esckey = false;
            $(document).on('keydown', function(event) {
                var keycode = (event.keyCode ? event.keyCode : event.which),
                    esckey = true;
                if (keycode === 27) {
                    if (curStep !== 4) {
                        confirmationDialog(keycode, event);
                    } else {
                        $('#kpmgModal').bs3modal('hide');
                        $('.modal-dialog a.btn-close').attr('data-dismiss', 'modal').removeClass('rfp-confirm hide');
                    }
                }
            });


            $('.rfp-confirm,#kpmgModal').on('click', function(e) {
                e.preventDefault();
                if (curStep !== 4) {
                    confirmationDialog();
                } else {
                    $('#kpmgModal').bs3modal('hide');
                    $('.modal-dialog a.btn-close').attr('data-dismiss', 'modal').removeClass('rfp-confirm hide');
                }

            });

            function confirmationDialog(keycode, event) {
                if (keycode === 27 && esckey) {
                    event.preventDefault();
                }
                $('#rfpMain').hide();
                $('#rfpConfirmBox').show();
                //$('.rfp-head').html($('.rfp-head').data('confirmtitle'));
                $('.modal-rfpdialog a.btn-close').addClass('hide');
            }

            $('.rfpCancel').on('click', function(evt) {
                evt.preventDefault();
                $('#rfpConfirmBox').hide();
                $('.modal-rfpdialog a.btn-close').removeClass('hide');
                $('#rfpMain').show();
                //$('.rfp-head').html($('.rfp-head').data('starttitle'));

            });

            $("#kpmgModal .modal-content").on('click', function(event) {
                var _target = $(event.target);
                if (_target.attr('class') === 'removeRFP' || _target.attr('id') === 'removeRFP') {
                    event.preventDefault();
                    $('.modal-dialog a.btn-close').attr('data-dismiss', 'modal').removeClass('rfp-confirm hide');
                    //$('.modal-rfpdialog a.btn-close').removeClass('hide');
                    $('#kpmgModal').bs3modal('hide');
                    $('#kpmgModal').modal('hide');
                    for (var k = 1; k <= 5; k++) {
                        if (fileAbort['file-' + k] && fileAbort['file-' + k].readyState !== 4) {
                            fileAbort['file-' + k].abort();
                        }
                    }
                    $.each([industryAjax, authAjax, getAjax, modifyAjax, cancelRemoveAjax, submitAjax], function(index, value) {
                        if (value && value.readyState !== 4) {
                            value.abort();
                        }
                    });

                } else {
                    event.stopPropagation();
                }

            });

            Helpers.triggerTracking({
                "formName1": "rfp-form",
                "formName2": "rfp-form",
                "events": "event5"
            }, "formStart");

            function getIndustry() {
                var rfpsmartLogicURL = '/ses?TBDB=disp_taxonomy&template=service.json&service=term&id=' + rfpLangId + '&language=' + rfpLanguage;
                industryAjax = $.ajax({
                    url: rfpsmartLogicURL,
                    type: 'GET',
                    cache: false,
                    success: function(msg) {

                        var industryOption = '';
                        for (var k = 0; k < msg.terms[0].term.hierarchy[1].fields.length; k++) {
                            industryOption += '<option ' + ' title="' + $.trim(msg.terms[0].term.hierarchy[1].fields[k].field.name) + '" value="' + $.trim(msg.terms[0].term.hierarchy[1].fields[k].field.name) + '">' + $.trim(msg.terms[0].term.hierarchy[1].fields[k].field.name) + '</option>';
                        }
                        $('#Industry').append(industryOption);
                    }
                });
            }

            $("#Locations").on('change', function(e) {
                var territoryArray = $(this).find(':selected').data('territory');
                if (territoryArray !== undefined && territoryArray.length > 0) {
                    $('#Territory').attr("required", "required");
                    $('#rfpTerritory').show();
                    $('#Territory').html('').val('');
                    var territoryOption, territoryTrim, rfpTerritory = '';
                    rfpTerritory = territoryArray.split(',');
                    territoryOption = "<option " + " title= '" + selectTerritory + "' value=''>" + selectTerritory + "</option>";
                    for (var terr = 0; terr < rfpTerritory.length; terr++) {
                        territoryTrim = $.trim(rfpTerritory[terr].replace(/[[\]]/g, ''));
                        territoryOption += "<option " + " title=  '" + territoryTrim + "' value='" + territoryTrim + "'>" + territoryTrim + "</option>";
                    }
                    $('#Territory').append(territoryOption);
                } else {
                    $('#rfpTerritory').hide();
                    $('#Territory').prop("required", false);
                }
                $('#Territory').val('');
            });



            function customizeHtml5Validation(_form) {
                $('input,textarea,select', _form).each(function(index, e) {
                    var $elem = $(this),
                        elem = $elem[0];
                    elem.oninvalid = onInvalidHandler;

                    //on blur code
                    $('.step1 input,select').on('blur', onInvalidHandler);

                    function onInvalidHandler(e) {
                        var $target = $(e.target),
                            $errorElem = $target.next('.label-invalid'),
                            $targetId = $target.attr('id');
                        $target.removeClass('field-invalid');
                        $target.parent().removeClass('rfpLableHighlight');
                        //$("label[for='overview-privacy']").find(".arrow-bg").removeClass("field-invalid-required");
                        //$("label[for='overview-privacy']").find(".arrow-label").removeClass("field-invalid-required");
                        //$("label[for='Required Checkbox']").find(".arrow-bg").removeClass("field-invalid-required");
                        //$("label[for='Required Checkbox']").find(".arrow-label").removeClass("field-invalid-required");
                        if ($target.attr('type') === "checkbox" && !$target.is(":checked")) {
                            if ($target.hasClass('fallback-check')) {
                                msg = $target.data("errormessageValueMissing");
                                e.target.setCustomValidity(msg);
                                $target.addClass('field-invalid');
                                $target.parent().find(".label-invalid").remove();
                                if ($targetId === "overview-privacy" || $targetId === "Required Checkbox") {
                                    $("<label class='label-invalid'>" + msg + "</label>").insertBefore($target);
                                } else {
                                    $("<label class='label-invalid'>" + msg + "</label>").insertBefore($target.parent().find("span"));
                                }
                                if ($targetId === "overview-privacy") {
                                    $("label[for='overview-privacy']").addClass("field-invalid");
                                    $("label[for='overview-privacy']").find(".arrow-bg").removeClass("field-valid-required").addClass("field-invalid-required");
                                    $("label[for='overview-privacy']").find(".arrow-label").removeClass("field-valid-required").addClass("field-invalid-required");
                                }
                                if ($targetId === "Required Checkbox") {
                                    $("label[for='Required Checkbox']").addClass("field-invalid");
                                    $("label[for='Required Checkbox']").find(".arrow-bg").removeClass("field-valid-required").addClass("field-invalid-required");
                                    $("label[for='Required Checkbox']").find(".arrow-label").removeClass("field-valid-required").addClass("field-invalid-required");
                                }
                            }
                        } else if ($.trim($target.val()) === "") {
                            msg = $target.data("errormessageValueMissing");
                            if ($errorElem.length) {
                                $errorElem.html(msg);
                            } else {
                                $target.parent().find(".label-invalid").remove();
                                if ($target.attr("id") === "Industry" || $target.attr("id") === "Locations" || $target.attr("id") === "Territory") {
                                    $target.parent().parent().find(".label-invalid").remove();
                                    $("<label class='label-invalid'>" + msg + "</label>").insertAfter($target.parent().find("label"));
                                    $target.parent().addClass("rfpLableHighlight");
                                } else if ($target.parent().find("span").length !== 0) {
                                    $("<label class='label-invalid'>" + msg + "</label>").insertBefore($target.parent().find("span"));
                                } else {
                                    $("<label class='label-invalid rfp-error-bottom-padding'>" + msg + "</label>").insertAfter($target.parent().find("label:first"));
                                    $target.parent().addClass("rfpLableHighlight");
                                }
                            }
                            $target.addClass('field-invalid');

                        } else if ($targetId === "Email") {
                            var emailmsg = $target.data("errormessageValueRequired");
                            if (!validateEmail($target.val())) {
                                if ($errorElem.length) {
                                    $errorElem.html(emailmsg);
                                } else {
                                    $target.parent().addClass("rfpLableHighlight");
                                    $target.parent().find(".label-invalid").remove();
                                    $("<label class='label-invalid'>" + emailmsg + "</label>").insertBefore($target.parent().find("input"));
                                }
                                $target.addClass('field-invalid');
                                e.target.setCustomValidity(emailmsg);
                            }
                        } else {
                            if ($elem.data("errormessageCustomError") !== undefined && $elem.data("errormessageCustomError") !== '') {
                                e.target.setCustomValidity($elem.data("errormessageCustomError"));
                            }
                        }


                    }

                    elem.onchange  =   function(e) {
                        if  (e.target.value.length  >  0) {
                            $elem.removeClass('field-invalid');
                            $elem.parent().removeClass("rfpLableHighlight");
                            e.target.setCustomValidity('');
                            $elem.parent().find('label.label-invalid').html('');

                        }
                        if ($elem.attr('id') === 'Industry' || $elem.attr('id') === 'Locations') {
                            if ($elem.index() > 0) {
                                $(e.target).parent().prev('label').html('');
                            }
                        } 
                        if ($elem.attr('id') === 'overview-privacy') {
                            if  ($elem.is(":checked")) {
                                $(".btn-step0").prop( 'disabled', false ).removeClass('btn-disabled');
                            } else {
                                $(".btn-step0").prop( 'disabled', true).addClass('btn-disabled');
                            }
                        } 
                    };
                    elem.oninput = function(e) {
                        e.target.setCustomValidity('');
                        $(e.target).removeClass('field-invalid');
                        $(e.target).next('.label-invalid').remove();
                    };
                });
            }

            function handleElementFocusOnError(input, $targetId ) {
                if( $targetId === "FirstName" ) {
                    firstEmptyElementFocused = true;
                    input.trigger('focus'); // setting focus on first element after form errors
                }
                else if( $targetId === "LastName" && !firstEmptyElementFocused ){
                    firstEmptyElementFocused = true;
                    input.trigger('focus'); // setting focus on first element after form errors
                }
                else if( $targetId === "Email" && !firstEmptyElementFocused ){
                    firstEmptyElementFocused = true;
                    input.trigger('focus'); // setting focus on first element after form errors
                }
                else if( $targetId === "Phone" && !firstEmptyElementFocused ){
                    firstEmptyElementFocused = true;
                    input.trigger('focus'); // setting focus on first element after form errors
                }
                else if( $targetId === "Company" && !firstEmptyElementFocused ){
                    firstEmptyElementFocused = true;
                    input.trigger('focus'); // setting focus on first element after form errors
                }
                else if( $targetId === "JobTitle" && !firstEmptyElementFocused ){
                    firstEmptyElementFocused = true;
                    input.trigger('focus'); // setting focus on first element after form errors
                }
                else if( $targetId === "Industry" && !firstEmptyElementFocused ){
                    firstEmptyElementFocused = true;
                    input.trigger('focus'); // setting focus on first element after form errors
                }
                else if( $targetId === "Locations" && !firstEmptyElementFocused ){
                    firstEmptyElementFocused = true;
                    input.trigger('focus'); // setting focus on first element after form errors
                }
                else if( $targetId === "captcha" && !firstEmptyElementFocused ){
                    firstEmptyElementFocused = true;
                    input.trigger('focus'); // setting focus on first element after form errors
                }
            }

            function customizeHtml5ValidationErrorMessage(_form) {
                $('.err-formmsg-area').hide();
                firstEmptyElementFocused = false;
                $(".modal-box-container .step1 ul.err-msg li").remove();
                $("form#rfpFormStep1 :input").each(function() {
                    var input = $(this),
                        markup = "",
                        msgText = input.parent().find("label.sr-only").text(),
                        m = input.parent().find("label.sr-only").attr("data-original-label"),
                        $targetId = input.attr('id'),
                        msg = $(".err-formmsg").attr('data-error-message-connection');
                    if ($targetId === "FirstName" || $targetId === "LastName" || $targetId === "Phone" || $targetId === "Company" || $targetId === "JobTitle" || $targetId === "Industry" || $targetId === "Locations" || $targetId === "captcha") {
                        if (input.val().trim() === "") {
                            markup = '<li><a href="' + locationHref + '#' + $targetId + '"><strong>' + '&middot; ' + msgText + '</strong></a>' + ' &mdash; ' + m + '</li>';
                            $('.err-formmsg-area').show();
                            $(".modal-box-container .step1 ul.err-msg").append(markup);
                            $('.err-msge-area').show();
                            handleElementFocusOnError(input, $targetId);
                        }
                    } else if ($targetId === "Email") {
                        if (!validateEmail(input.val())) {
                            markup = '<li><a href="' + locationHref + '#' + $targetId + '"><strong>' + '&middot; ' + msgText + '</strong></a>' + ' &mdash; ' + m + '</li>';
                            $('.err-formmsg-area').show();
                            $(".modal-box-container .step1 ul.err-msg").append(markup);
                            $('.err-msg-area').show();
                            handleElementFocusOnError(input, $targetId);
                        }
                    }
                });
            }

            function enableSubmitStepOne(_form) {
                var emptyInput = true;
                $("form#rfpFormStep1 :input").each(function() {                    
                    var input = $(this),
                        $targetId = input.attr('id');
                    if ($targetId === "FirstName" || $targetId === "LastName" || $targetId === "Phone" || $targetId === "Company" || $targetId === "JobTitle" || $targetId === "Industry" || $targetId === "Locations" || $targetId === "captcha") {
                        if (input.val().trim() === "") {
                            emptyInput = false;
                            return false;
                        }
                    } else if ($targetId === "Email") {
                        if (!validateEmail(input.val())) {
                            emptyInput = false;
                            return false;
                        }
                    } else {
                        emptyInput = true;
                    }
                });                
                if(emptyInput) {
                    $('.btn-step1').prop( 'disabled', false ).removeClass('btn-disabled');
                    
                } else {
                    $('.btn-step1').prop( 'disabled', true).addClass('btn-disabled');
                }
            }

            function messageHandler(evt) {
                var _this = $(evt.target);
                var chars = 5000 - _this.val().length;
                if (chars <= 0) {
                    $('#message').val(_this.val().substr(0, 5000));
                }
                _this.parent().find('span').html(chars);
            }

            function validateEmail(sEmail) {
                var filter = /([a-zA-Z0-9\.\+\_\-]+@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})/gi;
                return filter.test(sEmail);
            }

            $('form', '.step0').on('submit', handleStep0Submit);
            $('.mobile-nav').on('click', handleMobileStepJump);
            $('form', '.step1').on('submit', handleFormSubmit);
            $('form', '.step2').on('submit', handleModifyRFPSuccess);
            $('form', '.step3').on('submit', handleSubmitRFPProcess);
            $('.btn-refresh').on('click', captchaRefresh);
            $('.rfp-back').on('click', prevStep);
            $('#message').on('propertychange change click keyup input paste', messageHandler);
            $('.err-close').on('click', resetErrors);
            $('.rfp-cta-yes').on('click', areYouKpmgClientYes);
            $('.rfp-cta-no').on('click', areYouKpmgClientNo);

            function areYouKpmgClientYes() {
                $('.rfp-cta-yes,.rfp-cta-no').removeClass('isactive-client');
                $('#AlreadyClient').prop( 'checked', true );
                $('.rfp-cta-yes').addClass('isactive-client');
            }
            function areYouKpmgClientNo() {
                $('.rfp-cta-yes,.rfp-cta-no').removeClass('isactive-client');
                $('#AlreadyClient').prop( 'checked', false );
                $('.rfp-cta-no').addClass('isactive-client');
            }

            function displayeErrorMessage(msg) {
                $('.err-msg-area').show();
                $('.err-msg').append('&middot;&nbsp;' + msg + '</br>');
            }

            function resetErrors() {
                $('.err-msg-area').hide();
                $('.err-msg').html('');
            }

            function displayeFormErrorMessage(msg) {
                $('.err-formmsg-area').show();
                $('.err-formmsg').html(msg);
            }

            function displayeReviewFormErrorMessage(msg) {
                $('.err-reviewformmsg-area').show();
                $('.err-reviewformmsg').html(msg);
            }

            function resetFormError() {
                $('.err-msg-area,.err-reviewformmsg-area,.err-formmsg-area').hide();
                $('.err-formmsg,.err-msg,.err-reviewformmsg').html('');
            }

            function formatFileSize(kb) {
                var iSize = kb / 1024;
                if (iSize / 1024 > 1) {
                    if (((iSize / 1024) / 1024) > 1) {
                        iSize = (Math.round(((iSize / 1024) / 1024) * 100) / 100);
                        return iSize + " GB";
                    } else {
                        iSize = (Math.round((iSize / 1024) * 100) / 100);
                        return iSize + " MB";
                    }
                } else {
                    iSize = (Math.round(iSize * 100) / 100);
                    return iSize + " KB";
                }
            }

            function prevStep(evt) {
                evt.preventDefault();
                $('.err-msg-area,.err-reviewformmsg-area,.err-formmsg-area').hide();
                curStep = curStep - 2;
                var loopVar = 0;
                loopVar = curStep + 1;
                for (var j = loopVar; j < 4; j++) {
                    $('.current-step li').eq(j).removeClass('completed');
                    $('.current-step li').eq(j).off('click', handleStepJump);

                    $('.mobile-nav').eq(j).removeClass('completed');
                    $('.mobile-nav-container .completed').eq(j).off('click', handleMobileStepJump);
                }
                nextStep();
            }

            function nextStep(evt) {
                if (evt) {
                    evt.preventDefault();
                }
                curStep++;
                var preStep = curStep - 1;
                $('.mobile-nav[data-mobile-steps="step' + preStep + '"]').addClass('completed');
                var $li = $('.current-step li'),
                    $mNav = $('.mobile-nav[data-mobile-steps="step' + curStep + '"]'),
                    $next = $($li.get(curStep)),
                    $step = $('.step' + (curStep));
                $('.mobile-nav').removeClass('active');
                $li.removeClass('active');
                $next.addClass('active');
                $mNav.addClass('active');
                $next.prev().addClass('completed');
                $('.form-step').hide();
                $step.show();
                if (curStep === 1 || curStep === 2 || curStep === 3) {
                    $('.rfp-back').css('display', 'block');
                } else if (curStep === 0 || curStep === 4) {
                    $('.rfp-back').css('display', 'none');
                }
                if (curStep === 4) {
                    $($li.get(3)).addClass('completed');
                    //$li.css('color', '#CCC');
                    $('.current-step').addClass('completed');
                    $('.current-step .completed').off('click', handleStepJump);
                } else {
                    $li.attr('style', '');
                    $('.current-step').removeClass('completed');
                }
                $('.current-step .completed').on('click', handleStepJump);
                $('.rfp-page-stepcounter').animate({scrollTop: 0}, 1000);
                $('html, body').animate({
                    scrollTop: $("#RFPModal").offset().top
                }, 100);
            }

            function getAuthToken(callback) {
                authAjax = $.ajax({
                    url: macGen,
                    type: 'GET',
                    success: callback,
                    cache: false
                });
            }

            function getRFPdetail() {
                getAuthToken(function(data) {
                    getAjax = $.ajax({
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('AUTH_TOKEN', data.token);
                        },
                        url: rfpGetURL + '/' + rfpID,
                        type: 'GET',
                        cache: false,
                        success: handleGetRFPSuccess,
                        error: function(xhr, statusCode, errorText) {
                            stepTwoLoading.removeClass('show').next('.icon-chevron-right').show();
                            $(".btn-step2").prop( 'disabled', false );

                            switch (xhr.status) {

                                case 502:
                                    displayeErrorMessage(connectionerror);
                                    break;

                                case 401:
                                    displayeErrorMessage(invalidtoken);
                                    break;

                                case 500:
                                    displayeErrorMessage(invalidtoken);
                                    break;

                                default:
                                    displayeErrorMessage(generalerror);

                            }

                        }
                    });
                });
            }

            function handleStepJump(evt) {
                var loopVar = 0;
                if (curStep < 4) {
                    curStep = $(evt.currentTarget).index() - 1;
                    loopVar = curStep + 1;
                    for (var j = loopVar; j < 4; j++) {
                        $('.current-step li').eq(j).removeClass('completed');
                        $('.current-step li').eq(j).off('click', handleStepJump);
                    }
                    nextStep();
                }
            }


            function handleMobileStepJump(evt) {
                evt.preventDefault();
                if ($(evt.currentTarget).hasClass('completed') && curStep < 4) {
                    curStep = Number($(evt.currentTarget).attr('data-mobile-steps').substring(4)) - 1;
                    //$('.mobile-nav').removeClass('completed');
                    //$('.mobile-nav-container .completed').off('click', handleMobileStepJump);
                    for (var i = 0; i <= curStep; i++) {
                        $('.mobile-nav[data-mobile-steps="step' + i + '"]').addClass('completed');
                    }
                    for (var j = curStep; j < 4; j++) {
                        $('.mobile-nav').eq(j).removeClass('completed');
                        $('.mobile-nav-container .completed').eq(j).off('click', handleMobileStepJump);
                    }
                    nextStep();
                }
            }

            function handleGetRFPSuccess(data) {

                if (data && !data.ErrorInfo) {
                    resetFormError();
                    $('#message', moduleRFP).removeClass('field-success');
                    $(".btn-step2").prop( 'disabled', false );
                    stepTwoLoading.removeClass('show').next('.icon-chevron-right').show();
                    var formData = JSON.parse(rfpCleanHTML(JSON.stringify(data.ResultGetRFP.RFPData)));
                    $('.review-alreadyclient').find('span').remove();
                    var rfpClient = '';
                    $('.territoryBlock,#requestDetailsBlock').css('display', 'none');
                    formData.forEach(function(element) {
                        $('.review-' + element.Key.toLowerCase()).empty();
                        switch ('review-' + element.Key.toLowerCase()) {
                            case 'review-message':
                                if (element.Value !== '') {
                                    $('#message', moduleRFP).addClass('field-success');
                                    $('#requestDetailsBlock,.submit-message').css('display', 'block');
                                    $('.review-message').html(element.Value);
                                } else {
                                    $('.submit-message').css('display', 'none');
                                }
                                break;
                            case 'review-territory':
                                if (element.Value !== '') {
                                    $('.territoryBlock').css('display', 'block');
                                    $('.review-territory').html(element.Value);

                                }
                                break;

                            case 'review-alreadyclient':
                                if (element.Value === "True") {
                                    rfpClient = rfpClientYes;
                                } else {
                                    rfpClient = rfpClientNo;
                                }
                                $('.review-alreadyclient').html(rfpClient);
                                break;

                            case 'review-location':
                                $('.review-location').html($("#Locations option:selected").text());
                                break;

                            case 'review-attachments':
                                if (element.Value !== '') {
                                    $('#requestDetailsBlock,.attached-documents').css('display', 'block');
                                    var attachArray = element.Value.split(';');
                                    $('.review-attachments').empty();
                                    for (var i = 0; i < attachArray.length; i++) {
                                        if (typeof attachArray[i].split('#')[1] !== 'undefined') {
                                            $('.review-attachments').append("<li>"+attachArray[i].split('#')[0] + "&nbsp;<span class='file-size'>(" + formatFileSize(attachArray[i].split('#')[1]) + ")</span><div class='filepad'></div></li>");
                                        } else {
                                            if (typeof attachArray[i] !== 'undefined') {
                                                $('.review-attachments').append("<li>"+attachArray[i] + "<div class='filepad'></div></li>");
                                            }
                                        }
                                    }
                                } else {
                                    $('.attached-documents').css('display', 'none');

                                }
                                break;
                            default:
                                $('.review-' + element.Key.toLowerCase()).html(element.Value);

                        }
                    });
                    nextStep();
                }
            }


            function handleStep0Submit(evt) {
                evt.preventDefault();
                if ($('.fallback-check:checked').length !== $('.fallback-check').length) {
                    $('.fallback-check').not(':checked').addClass('fallback-checkbox');
                    return false;
                } else {
                    getIndustry();
                    nextStep();
                }
                $('.fallback-check:checked').removeClass('fallback-checkbox');
            }

            function rfpCleanHTML(unclean) {
                return unclean
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
            }

            function handleFormSubmit(evt) {
                evt.preventDefault();
                var $stepOneCheck = $('form', '.step1').find('input[required],select[required]');
                if (!isIE) {
                    $stepOneCheck.removeClass('field-invalid').next('.label-invalid').remove();
                }
                var emptyInputs = $stepOneCheck.filter(function() {
                    return $.trim($(this).val()) === "";
                });
                if (emptyInputs.length || !validateEmail($('#Email').val())) {
                    if (!isIE) {
                        $('form', '.step1').find('input[required],select[required]').trigger('focus');
                        return false;
                    } else {
                        $('form', '.step1').find('input[required],select[required]').not("#captcha").trigger('focus');
                        //return false;
                    }
                }
                $('.btn-step1').prop( 'disabled', true );
                stepOneLoading.addClass('show').next('.icon-chevron-right').hide();
                var $form = $(evt.currentTarget),
                    formUnClean = $form.serializeObject(),
                    formClean = JSON.stringify(formUnClean),
                    formData = JSON.parse(rfpCleanHTML(formClean)),
                    captchaElem = $('#captcha'),
                    captcha = captchaElem.val(),
                    captchakey = formData.rfpcq_captchakey;
                /* $('.label-invalid').remove();*/
                var Loc = formData.Locations.split('~', 2);
                formData.LocationEnglishName = Loc[0];
                formData.LocationCode = Loc[1];
                if (typeof(formData.Territory) === 'undefined') {
                    formData.Territory = '';
                }
                formData.AlreadyClient = (formData.AlreadyClient === "on");
                delete formData.Locations;
                delete formData.captcha;
                delete formData.rfpcq_captchakey;

                if (rfpID === null) {
                    formData.CAPTCHA_VALUE = $('#captcha').val();
                    formData.CAPTCHA_KEY = tempChar;
                    formData.RFPPageURL = encodeURI(referealUrlRfp);
                    formData.CountryId = rfpCountryId;
                    formData.AnalyticId = rfpAnalyticId;
                    var rfpOrigin = $(location).attr('href').split('/');
                    formData.OriginatingSiteURL = "/" + rfpOrigin[3] + "/" + rfpOrigin[4];
                    formData.Submitted_via = $(location).attr('protocol') + "//" + $(location).attr('host');
                    action = rfpServiceURL;
                    handleCreateRFP(formData, action);

                } else {
                    var modifyResults = [];
                    jQuery.each(formData, function(index, value) {
                        modifyResults.push({
                            "Key": index,
                            "Value": value
                        });
                    });


                    formData = {
                        RFPId: rfpID,
                        UpdatedFields: modifyResults
                    };
                    action = rfpModifyURL;
                    handleCreateRFP(formData, action);
                }
                //debugger; //1
                $(window).scrollTop($('div.modal-content').offset().top - 100);
            }

            function handleCreateRFP(formData, action) {

                getAuthToken(function(data) {
                    createAjax = $.ajax({
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Content-Type', 'application/json');
                            xhr.setRequestHeader('Accept', 'application/json');
                            xhr.setRequestHeader('AUTH_TOKEN', data.token);
                            xhr.setRequestHeader('CAPTCHA_KEY', tempChar);
                            xhr.setRequestHeader('CAPTCHA_VALUE', $('#captcha').val());
                        },
                        url: action,
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(formData),
                        success: handleCreateRFPSuccess,
                        error: function(xhr, statusCode, errorText) {
                            $(".btn-step1").prop( 'disabled', false );
                            stepOneLoading.removeClass('show').next('.icon-chevron-right').show();
                            $('#captcha').val('');
                            switch (xhr.status) {

                                case 502:
                                    displayeFormErrorMessage(connectionerror);
                                    break;

                                case 401:
                                    displayeFormErrorMessage(invalidtoken);
                                    break;

                                case 500:
                                    displayeFormErrorMessage(invalidtoken);
                                    break;

                                default:
                                    displayeFormErrorMessage(generalerror);

                            }



                        }

                    });
                });
            }

            function handleCreateRFPSuccess(data) {

                var result = data.CreateRFPResult || data.Result;
                if (!result.ErrorInfo) {
                    if (data.CreateRFPResult) {
                        $(".btn-step1").prop( 'disabled', false );
                        stepOneLoading.removeClass('show').next('.icon-chevron-right').show();
                        rfpID = data.CreateRFPResult.RFPId;
                        $('#captcha-block').css('display', 'none').find('#captcha').attr('type', 'hidden');
                    }
                    resetFormError();
                    nextStep();
                } else {
                    $('#captcha').val('');
                    if (result.ErrorInfo.ErrorCode === "ME1002") {
                        var captchaElem = $('#captcha');
                        $(".btn-step1").prop( 'disabled', false );
                        stepOneLoading.removeClass('show').next('.icon-chevron-right').show();
                        /*$('.label-invalid').remove();*/
                        errMessage = captchaElem.data('errormessageValueMissing');
                        captchaElem.parent().find(".label-invalid").remove();
                        $("<label class='label-invalid rfp-error-bottom-padding'>" + errMessage + "</label>").insertAfter(captchaElem.parent().find("label:first"));
                        captchaElem.parent().addClass("rfpLableHighlight");
                        captchaRefresh();
                        Helpers.triggerTracking({
                            "formName1": "rfp-form",
                            "formName2": "rfp-form",
                            "formError": "incorrectCaptcha"
                        }, "formError");
                    } else {
                        displayeFormErrorMessage(generalerror);
                    }
                }
                $(".btn-step1").prop( 'disabled', false );
                stepOneLoading.removeClass('show').next('.icon-chevron-right').show();
                //debugger; //4
                $(window).scrollTop($('div.modal-content').offset().top - 100);
            }

            function handleFormUpload(objFile, filename, target, uid) {
                var cleanFilename = filename.replace(/[^\w\s]/gi, ''),
                    btnGroup = $('.btn-group', target),
                    frmData = new FormData();
                btnGroup.next('.input-file').css('display', 'none');
                btnGroup.find('a')
                    .data('action', 'cancel')
                    .removeAttr("tabindex")
                    .attr("role" , 'button')
                    .data('filename', filename)
                    .addClass('cancel-browse').removeClass('file-browse').html('<span class="icon-close"></span><span class="text-Cancel-Browse">' + rfpCancel + '</span>');
                frmData.append(cleanFilename, objFile);
                btnGroup.next('.input-file').attr("tabindex" , -1);

                getAuthToken(function(data) {
                    fileAbort[uid] = $.ajax({
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('AUTH_TOKEN', data.token);
                            xhr.setRequestHeader('RFPId', rfpID);
                        },
                        url: rfpFileUploadURL,
                        type: 'POST',
                        data: frmData,
                        processData: false,
                        contentType: false,
                        success: function(res, status, xhr) {
                            if (xhr.getResponseHeader('upload_status') === 'PASS') {
                                $('#output-' + uid).next('.icon-spinner').remove();
                                btnGroup.find('a').data('action', 'remove').addClass('remove-browse').removeClass('cancel-browse file-browse').html('<span class="icon-close"></span><span class="text-Cancel-Browse">' + rfpRemove + '</span>');
                                btnGroup.next('.input-file').css('display', 'none');
                                $('<span class="icon-checkmark"></span>').insertAfter('#output-' + uid);
                                $('#' + uid).val('');
                                $('#' + uid).prev('.btn-group').find('.disableCancelRemove').removeClass('disableCancelRemove');
                            }
                        },
                        error: function(xhr, statusCode, errorText) {
                            $('#' + uid).val('');
                            $('#output-' + uid).html(nofileselected).removeClass('file-nobrdr');
                            $('#output-' + uid).next('span').remove();
                            btnGroup.find('a')
                                .data('action', '')
                                .data('filename', '')
                                .addClass('file-browse')
                                .removeAttr("role")
                                .attr("tabindex" , -1)
                                .removeClass('cancel-browse remove-browse')
                                .html('<span class="icon-search"></span><span class="text-rfpBrowse">' + rfpBrowse + '</span>');
                            btnGroup.next('.input-file').css('display', 'inline-block').removeAttr("tabindex");
                            $('#rfpfiletext').removeClass('hide');

                            switch (xhr.status) {

                                case 409:
                                    displayeErrorMessage(filename + "&nbsp;&mdash;&nbsp;<span class='fileerror'>" + invalidrfp + "</span>");
                                    break;

                                case 406:
                                    displayeErrorMessage(filename + "&nbsp;&mdash;&nbsp;<span class='fileerror'>" + corruptfile + "</span>");
                                    break;

                                case 412:
                                    displayeErrorMessage(filename + "&nbsp;&mdash;&nbsp;<span class='fileerror'>" + duplicatefile + "</span>");
                                    break;

                                case 413:
                                    displayeErrorMessage(filename + "&nbsp;&mdash;&nbsp;<span class='fileerror'>" + uploadlimit + "</span>");
                                    break;

                                case 502:
                                    displayeErrorMessage(filename + "&nbsp;&mdash;&nbsp;<span class='fileerror'>" + connectionerror + "</span>");
                                    break;

                                case 401:
                                    displayeErrorMessage(filename + "&nbsp;&mdash;&nbsp;<span class='fileerror'>" + invalidtoken + "</span>");
                                    break;

                                case 500:
                                    displayeErrorMessage(filename + "&nbsp;&mdash;&nbsp;<span class='fileerror'>" + invalidtoken + "</span>");
                                    break;
                                case 0:
                                    break;
                                default:
                                    displayeErrorMessage(filename + "&nbsp;&mdash;&nbsp;<span class='fileerror'>" + generalerror + "</span>");

                            }



                            $('#' + uid).prev('.btn-group').find('.disableCancelRemove').removeClass('disableCancelRemove');


                            Helpers.triggerTracking({
                                "formName1": "contact-form",
                                "formName2": "contact-form",
                                "formError": errorText
                            }, "formError");
                        }
                    });
                });
            }

            function handleModifyRFPSuccess(evt) {
                evt.preventDefault();
                $('.btn-step2').prop( 'disabled', true );
                stepTwoLoading.addClass('show').next('.icon-chevron-right').hide();
                getAuthToken(function(data) {
                    var kpmgRFP = rfpID;
                    var messageClean = rfpCleanHTML($("#message").val());
                    var modifyRFP = {
                        "RFPId": kpmgRFP,
                        "UpdatedFields": [{
                            "Key": "Message",
                            "Value": messageClean
                        }]
                    };
                    modifyAjax = $.ajax({
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Content-Type', 'application/json');
                            xhr.setRequestHeader('Accept', 'application/json');
                            xhr.setRequestHeader('AUTH_TOKEN', data.token);
                        },
                        url: rfpModifyURL,
                        type: 'POST',
                        data: JSON.stringify(modifyRFP),
                        success: getRFPdetail,
                        error: function(xhr, statusCode, errorText) {
                            $('#rfpfiletext').addClass('hide');
                            $(".btn-step2").prop( 'disabled', false );
                            stepTwoLoading.removeClass('show').next('.icon-chevron-right').show();

                            switch (xhr.status) {

                                case 502:
                                    displayeErrorMessage(connectionerror);
                                    break;

                                case 401:
                                    displayeErrorMessage(invalidtoken);
                                    break;

                                case 500:
                                    displayeErrorMessage(invalidtoken);
                                    break;

                                default:
                                    displayeErrorMessage(generalerror);

                            }


                        }
                    });
                });
                //debugger; //2
                $(window).scrollTop($('div.modal-content').offset().top - 100);
            }

            function handleFileCancelRemove(a) {
                var $a = $(a);
                if ($a.hasClass('icon-close') || $a.hasClass('text-Cancel-Browse')) {
                    $a = $a.parents('a');
                }
                $(a).addClass('disableCancelRemove');
                var filename = encodeURIComponent($a.data('filename')),
                    action = $a.data('action');
                if (action === 'cancel' || action === 'remove') {
                    var aid = $a.attr('id');
                    aid = aid.charAt(aid.length - 1);
                    if (action === 'cancel' && fileAbort['file-' + parseInt(aid)] && fileAbort['file-' + parseInt(aid)].readyState !== 4) {
                        fileAbort['file-' + parseInt(aid)].abort();
                    }
                    var actionURL = (action === 'cancel') ? rfpCanceluploadURL : rfpDeleteURL;
                    getAuthToken(function(data) {
                        cancelRemoveAjax = $.ajax({
                            beforeSend: function(xhr) {
                                xhr.setRequestHeader('AUTH_TOKEN', data.token);
                                xhr.setRequestHeader('RFPId', rfpID);
                                xhr.setRequestHeader('UploadedFileName', filename);
                            },
                            url: actionURL,
                            type: 'POST',
                            success: function() {
                                $('#output-file-' + aid).next('span').remove();
                                $('#file-' + aid).css('display', 'inline-block');
                                $('#file-' + aid).val('');
                                $a.html('<span class="icon-search"></span><span class="text-rfpBrowse">' + rfpBrowse + '</span>')
                                    .data('action', '')
                                    .data('filename', '')
                                    .addClass('file-browse')
                                    .removeAttr("role")
                                    .attr("tabindex" , -1)
                                    .removeClass('cancel-browse remove-browse');
                                $('#output-file-' + aid).html(nofileselected).removeClass('file-nobrdr');
                                $(a).removeClass('disableCancelRemove');


                            },
                            error: function(xhr, statusCode, errorText) {
                                $(a).removeClass('disableCancelRemove').removeAttr("role").attr("tabindex" , -1);
                                $('#rfpfiletext').removeClass('hide');
                                switch (xhr.status) {

                                    case 502:
                                        displayeErrorMessage(filename + "&nbsp;&mdash;&nbsp;<span class='fileerror'>" + connectionerror + "</span>");
                                        break;

                                    case 401:
                                        displayeErrorMessage(filename + "&nbsp;&mdash;&nbsp;<span class='fileerror'>" + invalidtoken + "</span>");
                                        break;

                                    case 500:
                                        displayeErrorMessage(filename + "&nbsp;&mdash;&nbsp;<span class='fileerror'>" + invalidtoken + "</span>");
                                        break;

                                    default:
                                        displayeErrorMessage(filename + "&nbsp;&mdash;&nbsp;<span class='fileerror'>" + generalerror + "</span>");

                                }
                            }
                        });
                    });
                }
            }

            function emailRequest() {
                var jsonURL = servletUrl;
                var email = $('#Email').val();
                var firstName = $('#FirstName').val();
                var lastName = $('#LastName').val();
                $.ajax({
                    url: jsonURL,
                    type: 'POST',
                    data: {
                        toMail: email,
                        rfpID: rfpID,
                        firstName: firstName,
                        lastName: lastName
                    },
                    success: function(response) {

                    }
                });
            }

            function handleSubmitRFPProcess(evt) {
                evt.preventDefault();
                $('.btn-step3').prop( 'disabled', true);
                stepThreeLoading.addClass('show').next('.icon-chevron-right').hide();
                getAuthToken(function(data) {
                    var submitData = {
                        'RFPId': rfpID
                    };
                    submitAjax = $.ajax({
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Content-Type', 'application/json');
                            xhr.setRequestHeader('Accept', 'application/json');
                            xhr.setRequestHeader('AUTH_TOKEN', data.token);
                        },
                        url: rfpSubmitURL,
                        type: 'POST',
                        data: JSON.stringify(submitData),
                        success: function(data) {
                            resetFormError();
                            var analyticRfpID = data.Result.ReferenceNo;
                            if (data && !data.ErrorInfo && data.Result.ReferenceNo) {
                                $('.rfpID').html(data.Result.ReferenceNo);
                                $('.mobile-close').addClass('hide');
                                rfpID = data.Result.ReferenceNo;
                                emailRequest();
                                rfpID = null;
                                $('.cancelRFP').attr('id', 'hide');
                            }
                            nextStep();
                            $('.current-step,.rfp-page-stepcounter').addClass('stepsDisable');
                            $('.current-step li').removeClass('completed');
                            $('.steps', moduleRFP).addClass('disable');
                            $('.current-step li .number-group span').html('&nbsp;');
                            $(".rfp-page-stepcounter li").removeAttr("title");
                            Helpers.triggerTracking({
                                "formName1": "rfp-form",
                                "formName2": "rfp-form",
                                "rfpID": analyticRfpID,
                                "events": "event6"
                            }, "formComplete");
                        },
                        error: function(xhr, statusCode, errorText) {
                            $(".btn-step3").prop( 'disabled', false );
                            stepThreeLoading.removeClass('show').next('.icon-chevron-right').show();

                            switch (xhr.status) {

                                case 502:
                                    displayeReviewFormErrorMessage(connectionerror);
                                    break;

                                case 401:
                                    displayeReviewFormErrorMessage(invalidtoken);
                                    break;

                                case 500:
                                    displayeReviewFormErrorMessage(invalidtoken);
                                    break;

                                default:
                                    displayeReviewFormErrorMessage(generalerror);

                            }


                            Helpers.triggerTracking({
                                "formName1": "rfp-form",
                                "formError": "can't create rfp"
                            }, "formError");


                        }


                    });
                });
                //debugger;//3
                $(window).scrollTop($('div.modal-content').offset().top - 100);
            }

            function captchaRefresh() {
                captchaImage();
                captchaStartTime = new Date().getTime();
            }

            function captchaTimer() {
                if (rfpID === null) {
                    var now = new Date().getTime(),
                        $captchatimer = $("#rfpcq_captchatimer"),
                        $captchaTimerBar = $(".rfpform_captchatimer_bar");
                    if ((now - captchaStartTime) > 60000) {
                        captchaRefresh();
                    }
                    if (!$captchatimer.length) {
                        return;
                    }
                    var width = Math.floor((60000 - (now - captchaStartTime)) / 60000 * 100);
                    $('.rfpform_captchatimer_bar').css('width', width + '%');
                    window.setTimeout(captchaTimer, 50);
                    $('#captcha-block').css('display', 'block');
                    var captaTimeRemainig = $captchaTimerBar.attr("style").split(":")[1].trim().substr(0, 3);
                    if (captaTimeRemainig.lastIndexOf("%") !== -1) {
                        captaTimeRemainig = captaTimeRemainig.substring(0, captaTimeRemainig.length - 1);
                    }
                    if (0 <= captaTimeRemainig && captaTimeRemainig <= 10) {
                        $captchaTimerBar.css("background-color", "red");
                    } else if (11 <= captaTimeRemainig && captaTimeRemainig <= 50) {
                        $captchaTimerBar.css("background-color", "#f68d2e");
                    } else if (51 <= captaTimeRemainig && captaTimeRemainig <= 100) {
                        $captchaTimerBar.css("background-color", "#005eb8");
                    }
                } else {
                    $('#captcha-block').css('display', 'none');
                }
            }

            $('#kpmgModal').on('shown.bs3.modal', function() {
                curStep = 0;
            });

            $("#printrfp").on('click', function(e) {
                e.preventDefault();

                var location = "RFP Form";
                Helpers.triggerTracking({
                        'linkLocationID1': location + '_' + $('#printrfp').text(),
                        'linkLocationID2': location + '_' + $('#printrfp').text(),
                        'linkLocation1': location,
                        'linkLocation2': location,
                        'events': 'event11'
                    },
                    'Internal Link');

                $('.privacy-container').hide();
                $('#printFooter').html($.trim($('.footer-footerText').html()));
                window.print();
            });

            $(".module-rfpprocess").on('click', '.removeRFP', function(e){
                e.preventDefault();

                var location = "RFP Form";
                Helpers.triggerTracking({
                        'linkLocationID1': location + '_' + $(this).text(),
                        'linkLocationID2': location + '_' + $(this).text(),
                        'linkLocation1': location,
                        'linkLocation2': location,
                        'events': 'event11'
                    },
                    'Internal Link');

                window.location.href = $(this).attr('href');
            });

            function analyticsFormValidation(fields) {
                var message = '';
                fields.each(function(index, e) {
                    if ($(this).hasClass("field-invalid")) {
                        //message = message + $(this).data("errormessage-value-missing") + ',';
                        message = message + $(this).attr("name") + ',';
                    }
                });
                if (message !== '') {
                    message = message.substring(0, message.length - 1);
                    Helpers.triggerTracking({
                        "formName1": "rfp-form",
                        "formName2": "rfp-form",
                        "formError": message
                    }, "formError");
                    message = '';
                } else {
                    Helpers.triggerSatteliteTracking('PrivacyAccept_RFP');
                }
            }

            $(".btn-step0").on("click", function() {
                if (isSafari || isIE) {
                    $(".step0").find("input").each(function(index, data) {
                        if ($(data).prop('checked') === true) {
                            $(data).addClass("field-valid").removeClass("field-invalid");
                        } else {
                            $(data).removeClass("field-valid").addClass("field-invalid");
                        }
                    });
                }
                setTimeout(function() {
                    $(".step0").find($("input")).each(function(index, data) {
                        var $targetId = $(data).attr('id'),
                            msg = $(data).data("errormessageValueMissing");
                        if (!$(data).hasClass("field-invalid")) {
                            $(data).addClass("field-valid");
                            $(data).parent().find(".label-invalid").remove();
                            if ($targetId === "overview-privacy") {
                                $("label[for='overview-privacy']").removeClass("field-invalid").addClass("field-valid");
                                $("label[for='overview-privacy']").find(".arrow-bg").removeClass("field-invalid-required").addClass("field-valid-required");
                                $("label[for='overview-privacy']").find(".arrow-label").removeClass("field-invalid-required").addClass("field-valid-required");
                            } else if ($targetId === "Required Checkbox") {
                                $("label[for='Required Checkbox']").removeClass("field-invalid").addClass("field-valid");
                                $("label[for='Required Checkbox']").find(".arrow-bg").removeClass("field-invalid-required").addClass("field-valid-required");
                                $("label[for='Required Checkbox']").find(".arrow-label").removeClass("field-invalid-required").addClass("field-valid-required");
                            }
                            if (isSafari || isIE) {
                                $(data).parent().find(".label-invalid").remove();
                            }
                        } else if (isSafari || isIE) {
                            $(data).parent().find(".label-invalid").remove();
                            if ($targetId === "overview-privacy" || $targetId === "Required Checkbox") {
                                $("<label class='label-invalid'>" + msg + "</label>").insertBefore($(data));
                            } else {
                                $("<label class='label-invalid'>" + msg + "</label>").insertBefore($(data).parent().find("span"));
                            }
                            if ($targetId === "overview-privacy") {
                                $("label[for='overview-privacy']").addClass("field-invalid").removeClass("field-valid");
                                $("label[for='overview-privacy']").find(".arrow-bg").addClass("field-invalid-required").removeClass("field-valid-required");
                                $("label[for='overview-privacy']").find(".arrow-label").addClass("field-invalid-required").removeClass("field-valid-required");
                            } else if ($targetId === "Required Checkbox") {
                                $("label[for='Required Checkbox']").addClass("field-invalid").removeClass("field-valid");
                                $("label[for='Required Checkbox']").find(".arrow-bg").addClass("field-invalid-required").removeClass("field-valid-required");
                                $("label[for='Required Checkbox']").find(".arrow-label").addClass("field-invalid-required").removeClass("field-valid-required");
                            }
                        }
                    });
                }, 100);
                setTimeout(function() {
                    analyticsFormValidation($('.field-invalid', '.step0'));
                }, 100);
            });
            $(".btn-step1").on("click", function() {
                setTimeout(function() {
                    $(".step1").find($("input , select")).each(function(index, data) {
                        var $targetId = $(data).attr('id');
                        if (!$(data).hasClass("field-invalid")) {
                            if (!isIE) {
                                $(data).addClass("field-valid");
                            } else if ($targetId !== "rfpcq_captchakey") {
                                $(data).addClass("field-valid");
                            }
                            if ($targetId !== "rfpcq_captchakey") {
                                $(data).parent().find(".label-invalid").remove();
                            }
                            if ($targetId === "overview-privacy") {
                                $("label[for='overview-privacy']").removeClass("field-invalid").addClass("field-valid");
                            } else if ($targetId === "Required Checkbox") {
                                $("label[for='Required Checkbox']").removeClass("field-invalid").addClass("field-valid");
                            } else if ($targetId === "Industry" || $targetId === "Locations" || $targetId === "Territory") {
                                $(data).parent().parent().find(".label-invalid").remove();
                            }
                        }
                    });
                }, 100);
                setTimeout(function() {
                    analyticsFormValidation($('.field-invalid', '.step1'));
                }, 100);
            });

            $('.module-rfpprocess').on('keyup', "a,:input,select,button[type=submit],textarea", function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(".step2 .form a").not(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                }
            });

            $('.module-rfpprocess').on('blur', "a,:input,select,button[type=submit],textarea", function(e) {
                $(".step2 .form a").not(this).removeAttr("tabindex").removeClass("focusOutline");
            });


            $(".rfp-privacy-entry").on("focusin", function(e) {
                $("label[for='overview-privacy']").addClass("focus-effect-in");
            });
            $(".rfp-privacy-exit").on("focus", function(e) {
                $("label[for='overview-privacy']").addClass("focus-effect-in");
            });
            $(".rfp-privacy-exit").on("focusout", function(e) {
                $("label[for='overview-privacy']").removeClass("focus-effect-in");
            });

            $(".rfp-required-entry").on("focusin", function(e) {
                $("label[for='Required Checkbox']").addClass("focus-effect-in");
            });
            $(".rfp-required-exit").on("focus", function(e) {
                $("label[for='Required Checkbox']").addClass("focus-effect-in");
            });
            $(".rfp-required-exit").on("focusout", function(e) {
                $("label[for='Required Checkbox']").removeClass("focus-effect-in");
            });


            $("label[for='AlreadyClient']").on("mouseenter", function() {
                $(this).addClass("hover-effect-in");
            });
            $("label[for='AlreadyClient']").on("mouseleave", function() {
                $(this).removeClass("hover-effect-in");
            });

            // $(".rfp-step-entry").on("focus", function(e) {
            //     $("label[for='AlreadyClient']").addClass("focus-effect-in");
            // });
            // $(".rfp-step-entry").on("focusout", function(e) {
            //     $("label[for='AlreadyClient']").removeClass("focus-effect-in");
            // });
            // $(".rfp-step-entry").on("keyup", function(e) {
            //     if (e.which === 32) {
            //         $('#AlreadyClient').trigger("click");
            //     }
            // });

            $(".rfp-privacy-entry").on("keyup", function(e) {
                if (e.which === 32) {
                    $('#overview-privacy').trigger("click");
                }
            });

            $(".rfp-required-entry,.rfp-required-exit").on("keyup", function(e) {
                if (e.which === 32) {
                    $(this).parent().find('.rfpCheck-input').trigger("click");
                }
            });

            if (ie_version.major === "9" || navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                $("select").addClass("custom-dropdown");
            }
            $('.module-rfpprocess').on('blur', "a,:input,select,button[type=submit],textarea", function(e) {
                if (!!navigator.userAgent.match(/iPhone|iPad/i)) {
                    $("#kpmgModal").css({
                        "margin-top": "0",
                        "bottom": "auto"
                    });
                }
            });

            function autoPopulate() {
                var profileInfo = personalizationUtils.accountUtils.getProfileInfo();
                if (profileInfo) {
                    var $firstName = $('#rfpFormStep1 #FirstName'),
                        $lastName = $('#rfpFormStep1 #LastName'),
                        $email = $('#rfpFormStep1 #Email'),
                        $company = $('#rfpFormStep1 #Company'),
                        $role = $('#rfpFormStep1 #JobTitle'),
                        $country = $('#rfpFormStep1 #Locations'),
                        $kpmgClient = $('#rfpFormStep1 #AlreadyClient');

                    $firstName.val(profileInfo.firstname);
                    $lastName.val(profileInfo.lastName);
                    $email.val(profileInfo.email);
                    $company.val(profileInfo.company);
                    $role.val(profileInfo.role);
                    $kpmgClient.prop('checked', profileInfo.kpmgClient);

                    $('#rfpFormStep1 #Locations option').each(function() {
                        var value = $(this).val(),
                            country = value.substr(0, value.length - 3);
                        if (country === profileInfo.country) {
                            $country.val(value);
                            var territoryArray = $("#Locations").find(':selected').data('territory');
                            if (territoryArray !== undefined && territoryArray.length > 0) {
                                $('#Territory').attr("required", "required");
                                $('#rfpTerritory').show();
                                $('#Territory').html('').val('');
                                var territoryOption, territoryTrim, rfpTerritory = '';
                                rfpTerritory = territoryArray.split(',');
                                territoryOption = "<option " + " title= '" + selectTerritory + "' value=''>" + selectTerritory + "</option>";
                                for (var terr = 0; terr < rfpTerritory.length; terr++) {
                                    territoryTrim = $.trim(rfpTerritory[terr].replace(/[[\]]/g, ''));
                                    territoryOption += "<option " + " title=  '" + territoryTrim + "' value='" + territoryTrim + "'>" + territoryTrim + "</option>";
                                }
                                $('#Territory').append(territoryOption);
                            }
                        }
                    });
                }
            }
            autoPopulate();
            window.digitalData.page.SignInStatus = personalizationUtils.accountUtils.isLoggedIn() ? 'SignedIn' : 'SignedOut';
            window.digitalData.page.UserType = personalizationUtils.accountUtils.getInfo() ? 'Registered User' : 'Anonymous User';

            $(document).trigger('template.loaded');
        };
        $(function(){
            var tmpl = new RfpProcess();
        });
    }
);