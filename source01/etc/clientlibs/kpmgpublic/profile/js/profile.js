/* global calanderProperties */
/* global dateFormatProperties */
define(['jquery', 'underscore', 'tracking', 'handlebars', 'helpers', 'personalizationUtils', 'genericErrorDialog', 'bootstrap', 'resendVerificationEmail'],
    function ($, _, Tracking, Handlebars, helpers, personalizationUtils, genericErrorDialog, bootstrap, resendVerificationEmail) {
        'use strict';
        var Profile = function (elem, componentName) {
            var tracking = new Tracking(elem, 'Profile');
            var links = {};

            personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                links = data.links;
            });

            // Keep the following lines at the bottom of the Profile function
            var processInputText = personalizationUtils.commonUtils.processLibraryName;

            if (personalizationUtils.accountUtils.isLoggedIn()) {
                personalizationUtils.commonUtils.checkForGigyaObject(getAccountInfo);
            }
            function getAccountInfo() {
                window.gigya.accounts.getAccountInfo({
                    extraProfileFields: 'work',
                    callback: loadData
                });
            }

            function errorHandlerForGigyaResponse(response) {
                if (response.errorCode !== 0) {
                    genericErrorDialog.showDialog();
                    return true;
                }
            }

            function loadData(personObj) {
                if (errorHandlerForGigyaResponse(personObj)) {
                    return;
                }

                var profiledata = personObj.profile;
                var dataObj = personObj.data;
                var loginProvider = personObj.loginProvider;
                profiledata.work = !Array.isArray(profiledata.work) ? new Array(profiledata.work) : profiledata.work;
                                
                var personObjToPass = {
                    "profile": {
                        "email": profiledata.email,
                        "firstName": profiledata.firstName || "",
                        "lastName": profiledata.lastName || "",
                        "work": [{
                            "title": profiledata.work ? processInputText(profiledata.work[0].title) : "",
                            "company": profiledata.work ? processInputText(profiledata.work[0].company) : ""
                        }],
                        "country": profiledata.country || ""
                    },
                    "data": {
                        "feedbackOptOut": dataObj.feedbackOptOut || false,
                        "salutation": dataObj.salutation || "",
                        "kpmg": {
                            "client": (dataObj.kpmg && dataObj.kpmg.client) ?  dataObj.kpmg.client : false,
                            "employee": (dataObj.kpmg && dataObj.kpmg.employee) ?  dataObj.kpmg.employee : false
                        },
                        "organizations": dataObj.organizations || []
                    },
                    callback: setAccountInfoResponse
                };

                personObjToPass = $.extend({}, personObj, personObjToPass);
                updateView(personObjToPass);

                var personObjInfo = personalizationUtils.accountUtils.getInfo(),
                    dateFormatMon = (helpers.dateFormat(personObjInfo.registered)).toString().slice(4, 7),
                    dateFormatYear = (helpers.dateFormat(personObjInfo.registered)).toString().slice(11, 15),
                    regDate = dateFormatMon + ", " + dateFormatYear;

                $('.registeredDate span').text(regDate);

                //Update View Mode
                //updateView(personObj);

                function getBoardCount() {
                    return $(".porginput").length;
                }

                $(".module-profile").on("click", ".add-board", function () {
                    if (getBoardCount() < 10) {
                        var newRow = "<div class='row org-row'><div class='col-md-11 col-xs-10'><input type='org' name='org' placeholder='" + window.kpmgPersonalize.i18n.customMsgs.organization + "' class='form-control porginput'></div><a href='javascript:void(0)' class='col-md-1 col-xs-2 linkcta remove-board1'><span class='icon-close'></span></a></div>";
                        $("form.edit-myprofile #board-group").append(newRow);
                    }
                    if (getBoardCount() >= 10) {
                        $(".board-wrap").hide();
                    }
                });

                $(".module-profile").on("click", ".remove-board1", function () {
                    $(this).parent().remove();
                    if (getBoardCount() < 10) {
                        $(".board-wrap").show();
                    }
                });

                //Update Edit Mode
                $(".updateAccount", elem).on("click", function (evt) {
                    window.gigya.accounts.getAccountInfo({
                        extraProfileFields: "work",
                        callback: updatedData
                    });

                    function updatedData(personObjToPass) {
                        if (errorHandlerForGigyaResponse(personObjToPass)) {
                            return;
                        }

                        var profiledata = personObjToPass.profile,
                            dataObj = personObjToPass.data,
                            loginProvider = personObjToPass.loginProvider,
                            companyName = _.isObject(window.kpmgPersonalize.db.data) ? window.kpmgPersonalize.db.data.company_name : "";

                        profiledata.work = !Array.isArray(profiledata.work) ? new Array(profiledata.work) : profiledata.work;

                        personObjToPass = {
                            "profile": {
                                "email": profiledata.email,
                                "firstName": profiledata.firstName || "",
                                "lastName": profiledata.lastName || "",
                                "work": [{
                                    "title": profiledata.work ? processInputText(profiledata.work[0].title) : "",
                                    "company": profiledata.work ? processInputText(profiledata.work[0].company) : companyName
                                }],
                                "country": profiledata.country || ""
                            },
                            "data": {
                                "feedbackOptOut": dataObj.feedbackOptOut || false,
                                "salutation": dataObj.salutation || "",
                                "kpmg": {
                                    "client": (dataObj.kpmg && dataObj.kpmg.client) ?  dataObj.kpmg.client : false,
                                    "employee": (dataObj.kpmg && dataObj.kpmg.employee) ?  dataObj.kpmg.employee : false
                                },
                                "organizations": dataObj.organizations || []
                            }
                        };

                        $(".form-horizontal.edit-myprofile-mode").hide();
                        $(".edit-myprofile").show();

                        // Todo: verify this code
                        if (loginProvider !== "site") {
                            $(".passwordblock").remove();
                            $(".password-info").remove();
                            $('.email-value').remove();
                            $('.account-information').find('.email-read-value').css('display', 'block');
                        }

                        $("label.pemailinput").html(personObjToPass.profile.email);
                        $("input.ppasswordinput").val(personObjToPass.password);
                        $("input.pfninput").val(personObjToPass.profile.firstName);
                        $("input.plninput").val(personObjToPass.profile.lastName);
                        $("input.pcompanyinput").val(personObjToPass.profile.work ? processInputText(personObjToPass.profile.work[0].company) : "");
                        $("input.ptitleinput").val(personObjToPass.profile.work ? processInputText(personObjToPass.profile.work[0].title) : "");

                        // If country is blank, set it to current country
                        if (personObjToPass.profile.country !== "") {
                            $("select.pcountryinput").val(personObjToPass.profile.country);
                        } else {
                            $("select.pcountryinput").val(setCountrytoCurr());
                        }
                        $("select.salutation-input").val(personObjToPass.data.salutation);

                        var org = "";
                        if (personObjToPass.data.organizations && Array.isArray(personObjToPass.data.organizations) && personObjToPass.data.organizations.length) {
                            $(personObjToPass.data.organizations).each(function () {
                                org = org + "<div class='row org-row'><div class='col-md-11 col-xs-10'><input type='org' name='org' placeholder='" + window.kpmgPersonalize.i18n.customMsgs.organization + "' class='form-control porginput' value='" + processInputText(this) + "'></div><a href='javascript:void(0);' class='col-md-1 col-xs-2 linkcta remove-board1'><span class='icon-close'></span></a></div></div>";
                            });
                        } else {
                            org = "<div class='row org-row'><div class='col-md-11 col-xs-10'><input type='org' name='org' placeholder='" + window.kpmgPersonalize.i18n.customMsgs.organization + "' class='form-control porginput' ></div><a href='javascript:void(0);' class='col-md-1 col-xs-2 linkcta remove-board1'><span class='icon-close'></span></a></div></div>";
                        }

                        $(".edit-myprofile #board-group").html(org);
                        $('.registeredDate span').html(regDate);

                        $(".pkpmgclientinput").each(function () {
                            if (personObjToPass.data.kpmg.client === false) {
                                $('.pkpmgclientinput:checkbox[name=KPMGClient]').prop('checked', false);
                            } else {
                                $('.pkpmgclientinput:checkbox[name=KPMGClient]').prop('checked', true);
                            }
                        });

                        $(".pkpmgemployeeinput").each(function () {
                            if (personObjToPass.data.kpmg.employee === false) {
                                $('.pkpmgemployeeinput:checkbox[name=KPMGEmployee]').prop('checked', false);
                            } else {
                                $('.pkpmgemployeeinput:checkbox[name=KPMGEmployee]').prop('checked', true);
                            }
                        });

                        if (personObjToPass.data.feedbackOptOut === true) {
                            $('.feedback-input:checkbox[name=KPMGFeedback]').prop('checked', false);
                        } else {
                            $('.feedback-input:checkbox[name=KPMGFeedback]').prop('checked', true);
                        }

                        //remove all errors if any
                        $("#Firstname,#Lastname").removeClass("error-field").prev().remove("span.error-message");
                        $("#password,#newpassword,#confirmpassword").val('').removeClass('error-field').prev().remove("span.error-message");

                        // Adding class to delete component;
                        $(".module-deleteaccountlink").addClass("delete-class");
                    }

                    $("#password,#newpassword,#confirmpassword").on("keyup", function () {
                        if ($(this).prev("span").hasClass('error-message')) {
                            $(this).css("border", '1px solid #999').prev("span.error-message").remove();
                        }
                    });
                });

                //Save Changes from edit mode

                var gatherFormData = function () {
                    var erroFlag = false;
                    var span = "<span class='error-message required'> " + window.kpmgPersonalize.i18n.gigyaMsgs.this_field_is_required + "</span>";

                    $(".edit-myprofile input,.edit-myprofile select").each(function () {
                        //-SP Do we need this check? Anyways it is not going to be much of data.
                        var curr;
                        if ($(this).attr("id")) {
                            curr = $(this).attr("id").toLowerCase();
                        } else {
                            curr = $(this).attr("name").toLowerCase();
                        }

                        switch (curr) {
                            case "firstname":
                                if ($(this).val().length === 0) {
                                    $("#Firstname").addClass("error-field");
                                    $(this).prev("span.invalid").remove();
                                    if (!($("#Firstname").prev("span").hasClass("required"))) {
                                        $("#Firstname").before(span);
                                    }
                                    ScrollToTop(".module-profile");
                                    erroFlag = true;
                                } else if ((/[0-9|"~`!@#$%^&()_={}[\]:;,.<>+*\/\\?-]/).test($(this).val())) {
                                    $("#Firstname").addClass("error-field");
                                    $(this).prev("span.required").remove();
                                    if (!($(this).prev("span").hasClass("invalid"))) {
                                        var errorMsgSpanOne = "<span class='error-message invalid'>" + window.kpmgPersonalize.i18n.customMsgs.gigya_name_validation_error_message + "<span/>";
                                        $(this).before(errorMsgSpanOne);
                                    }
                                    ScrollToTop(".module-profile");
                                    erroFlag = true;
                                } else {
                                    personObjToPass.profile.firstName = $(this).val();
                                    $("#Firstname").removeClass("error-field");
                                }
                                break;
                            case "lastname":
                                if ($(this).val().length === 0) {
                                    $("#Lastname").addClass("error-field");
                                    $(this).prev("span.invalid").remove();
                                    if (!($("#Lastname").prev("span").hasClass("required"))) {
                                        $("#Lastname").before(span);
                                    }
                                    ScrollToTop(".module-profile");
                                    erroFlag = true;
                                } else if ((/[0-9|"~`!@#$%^&()_={}[\]:;,.<>+*\/\\?-]/).test($(this).val())) {
                                    $("#Lastname").addClass("error-field");
                                    $(this).prev("span.required").remove();
                                    if (!($(this).prev("span").hasClass("invalid"))) {
                                        var errorMsgSpanTwo = "<span class='error-message invalid'>" + window.kpmgPersonalize.i18n.customMsgs.gigya_name_validation_error_message + "<span/>";
                                        $(this).before(errorMsgSpanTwo);
                                    }
                                    ScrollToTop(".module-profile");
                                    erroFlag = true;
                                } else {
                                    personObjToPass.profile.lastName = $(this).val();
                                    $("#Lastname").removeClass("error-field");
                                }
                                break;
                            case "title":
                                personObjToPass.profile.work[0].title = processInputText($(this).val());
                                break;
                            case "company":
                                personObjToPass.profile.work[0].company = processInputText($(this).val());
                                break;
                            case "locations":
                                if($(this).val()===""){
                                    $("#Locations").addClass("error-field");
                                    $(this).parent('.custom-select').prev("span.required").remove();
                                    if (!($("#Locations").parent('.custom-select').prev("span").hasClass("required"))) {
                                        $("#Locations").parent('.custom-select').before(span);
                                    }                                    
                                    ScrollToTop(".module-profile");
                                    erroFlag = true;
                                }else{
                                    personObjToPass.profile.country = $(this).val();
                                }                               
                                break;
                            case "salutations":
                                personObjToPass.data.salutation = $(this).val() || "";
                                break;
                            case "kpmgclient":
                                if ($("input[name=KPMGClient]:checked").val() === "Yes") {
                                    personObjToPass.data.kpmg.client = true;
                                } else {
                                    personObjToPass.data.kpmg.client = false;
                                }
                                break;
                            case "kpmgemployee":
                                if ($("input[name=KPMGEmployee]:checked").val() === "Yes") {
                                    personObjToPass.data.kpmg.employee = true;
                                } else {
                                    personObjToPass.data.kpmg.employee = false;
                                }
                                break;
                            case "kpmgfeedback":
                                if ($("input[name=KPMGFeedback]:checked").val() === "Yes") {
                                    personObjToPass.data.feedbackOptOut = false;
                                } else {
                                    personObjToPass.data.feedbackOptOut = true;
                                }
                                break;
                            case "org":
                                var porginput = {};
                                $(".porginput").each(function (index) {
                                    porginput[index] = processInputText($(this).val());
                                });
                                personObjToPass.data.organizations = porginput;
                                break;
                            case "password":
                                if ($("#password").val() && (loginProvider === "site")) {
                                    $("#password").removeClass("error-field");
                                    personObjToPass.password = $("#password").val();
                                }
                                break;
                            case "newpassword":
                                if ($("#newpassword").val() && (loginProvider === "site")) {
                                    $("#newpassword").removeClass("error-field");
                                    personObjToPass.newPassword = $("#newpassword").val();
                                } else if (($("#password").val() !== "") && $("#newpassword").val() === "") {
                                    $("#newpassword").addClass("error-field");
                                    if (!($(this).prev("span").hasClass("error-message"))) {
                                        span = "<span class='error-message'> " + window.kpmgPersonalize.i18n.gigyaMsgs.this_field_is_required + " </span>";
                                        $(this).before(span);
                                    }
                                    $("#newpassword").trigger('focus');
                                    ScrollToTop(".module-profile");
                                    erroFlag = true;
                                    return false;
                                }
                                break;
                            case "confirmpassword":
                                var password = $("#newpassword").val(),
                                    confirmPassword = $(this).val();
                                if (password !== confirmPassword) {
                                    if (!($(this).prev("span").hasClass("error-message"))) {
                                        span = "<span class='error-message'>" + window.kpmgPersonalize.i18n.gigyaMsgs.passwords_do_not_match + "<span/>";
                                        $("#confirmpassword").before(span);
                                    }
                                    return false;
                                } else {
                                    $("#confirmpassword").prev("span.error-message").remove();
                                }
                                break;
                        }
                    });


                    var porginput = [];
                    $(".porginput").each(function (index) {
                        if ($(this).val() !== "") {
                            porginput[index] = processInputText($(this).val());
                        }
                    });

                    personObjToPass.data.organizations = porginput;
                    personObjToPass.callback = setAccountInfoResponse;

                    if (erroFlag) {
                        return false;
                    }

                    return personObjToPass;
                };

                function ScrollToTop(el) {
                    if (window.kpmg.isMobile) {
                        $('html, body').animate({
                            scrollTop: $(el).offset().top + 10
                        }, 'slow');
                    } else {
                        $('html, body').animate({
                            scrollTop: $(el).offset().top - 150
                        }, 'slow');
                    }
                }

                $("#Locations").on("change", function () {
                    var locationVal = false;                
                    var optionFirstval = $('#Locations option:first-child').val().trim();
                    var countrySelected = $("#Locations").val().trim();
                    var errorSpan = "<span class='error-message required'> " + window.kpmgPersonalize.i18n.gigyaMsgs.this_field_is_required + "</span>";

                    if(optionFirstval===countrySelected){
                        locationVal = false;
                    }else{
                        locationVal = true;
                    }

                    if(locationVal){
                        $("#Locations").removeClass("error-field");
                        $(this).parent('.custom-select').prev("span.required").remove();
                    }else{                        
                        $("#Locations").addClass("error-field");
                        $(this).parent('.custom-select').prev("span.required").remove();
                        if (!($("#Locations").parent('.custom-select').prev("span").hasClass("required"))) {
                            $("#Locations").parent('.custom-select').before(errorSpan);
                        }            
                    }
                });

                $("#Firstname").on("blur", function () {
                    if ((/[0-9|"~`!@#$%^&()_={}[\]:;,.<>+*\/\\?-]/).test($(this).val())) {
                        $(this).prev("span.error-message.required").remove();
                        $(this).addClass("error-field");
                        if (!($(this).prev("span").hasClass("invalid"))) {
                            var span = "<span class='error-message invalid'>" + window.kpmgPersonalize.i18n.customMsgs.gigya_name_validation_error_message + "<span/>";
                            $(this).before(span);
                        }
                        return false;
                    } else {
                        $(this).removeClass("error-field");
                        $(this).prev("span.error-message").remove();
                    }
                    return true;
                });

                $("#Lastname").on("blur", function () {
                    if ((/[0-9|"~`!@#$%^&()_={}[\]:;,.<>+*\/\\?-]/).test($(this).val())) {
                        $(this).prev("span.error-message.required").remove();
                        $(this).addClass("error-field");
                        if (!($(this).prev("span").hasClass("invalid"))) {
                            var span = "<span class='error-message invalid'>" + window.kpmgPersonalize.i18n.customMsgs.gigya_name_validation_error_message + "<span/>";
                            $(this).before(span);
                        }
                        return false;
                    } else {
                        $(this).removeClass("error-field");
                        $(this).prev("span.error-message").remove();
                    }
                    return true;
                });

                $("#confirmpassword").on("blur", function () {
                    var password = $("#newpassword").val();
                    var confirmPassword = $(this).val();

                    if (password !== confirmPassword) {
                        if (!($(this).prev("span").hasClass("error-message"))) {
                            var span = "<span class='error-message'>" + window.kpmgPersonalize.i18n.gigyaMsgs.passwords_do_not_match + "<span/>";
                            $("#confirmpassword").before(span);
                        }
                        return false;
                    } else {
                        if (loginProvider === "site") {
                            personObjToPass.newPassword = $("#newpassword").val();
                            personObjToPass.password = $("#password").val(); //old
                        }
                        $("span.error-message").remove();
                    }
                    return true;
                });

                $(".save-changes").on("click", function () {
                    //update params.data
                    var params = gatherFormData(),
                        password = $("#newpassword").val(),
                        confirmPassword = $("#confirmpassword").val();
                    if (password !== confirmPassword) {
                        ScrollToTop(".module-profile");
                        return false;
                    }
                    if (confirmPassword === "" && password === "" && $("#password").val() === "") {
                        delete personObjToPass.password;
                        delete personObjToPass.newPassword;
                        $("#password,#newpassword,#confirmpassword").val('').removeClass('error-field').prev().remove("span.error-message");
                    }
                    if (params) {
                        window.gigya.accounts.setAccountInfo(params);
                        // tracking profile update after successful save
                        tracking.satelliteTracking({
                            'Profile': {
                                ProfileManagement: 'Update Info'
                            }
                        }, 'profileManagement', false);
                        tracking.track('profileManagement');
                    }
                });

                //Cancel Save
                $(".cancel-save").on("click", function () {
                    delete personObjToPass.password;
                    delete personObjToPass.newPassword;
                    $(".form-horizontal.edit-myprofile-mode").show();
                    $(".edit-myprofile").hide();
                    $(".module-deleteaccountlink").removeClass("delete-class");
                });
                //Onsuccess of Set Account Info update View mode
            }

            function setAccountInfoResponse(response) {
                if (response.errorCode === 0) {
                    window.gigya.accounts.getAccountInfo({
                        include: personalizationUtils.constants.UserAccountIncludes.join(','),
                        extraProfileFields: personalizationUtils.constants.IPGFilter.join(','),
                        callback: getAccountInfoResponse
                    });
                }
                else {
                    var span = "<span class='error-message'>" + window.kpmgPersonalize.i18n.gigyaMsgs.invalid_login_or_password + "</span>";
                    if (response.errorCode === 403042) {
                        $("#password").addClass("error-field");
                        if (!($("#password").prev("span").hasClass("error-message"))) {
                            $("#password").before(span);
                            ScrollToTop(".edit-myprofile");
                        }
                        return false;
                    }
                    if (response.errorCode === 401030) {
                        $("#newpassword").addClass("error-field");
                        span = "<span class='error-message'>" + window.kpmgPersonalize.i18n.gigyaMsgs.old_password_cannot_be_the_same_as_new_password + "</span>";
                        if (!($("#newpassword").prev("span").hasClass("error-message"))) {
                            $("#newpassword").before(span);
                            ScrollToTop(".module-profile");
                        }
                        return false;
                    }
                    if (response.errorCode === 400006) {
                        if (response.errorDetailsCode === 100001) {
                            span = "<span class='error-message'>" + window.kpmgPersonalize.i18n.gigyaMsgs.old_password_cannot_be_the_same_as_new_password + "</span>";
                        } else {
                            span = "<span class='error-message'>" + window.kpmgPersonalize.i18n.gigyaMsgs.password_does_not_meet_complexity_requirements + "</span>";
                        }
                        $("#newpassword").addClass("error-field");
                        if (!($("#newpassword").prev("span").hasClass("error-message"))) {
                            $("#newpassword").before(span);
                            ScrollToTop(".module-profile");
                        }
                        return false;
                    }
                    if (response.errorCode === 400002) {
                        $("#password").addClass("error-field");
                        span = "<span class='error-message'>" + window.kpmgPersonalize.i18n.gigyaMsgs.password_does_not_meet_complexity_requirements + "</span>";
                        if (!($("#password").prev("span").hasClass("error-message"))) {
                            $("#password").before(span);
                            ScrollToTop(".module-profile");
                        }
                        return false;
                    }
                }

                showModalDialog('.changes-saved');
                $(".loading-container").css("display", "block");
                $(".module-deleteaccountlink").removeClass("delete-class");
            }

            function getAccountInfoResponse(response) {
                if (response.errorCode === 0) {
                    // var IPGFiltered = personalizationUtils.accountUtils.IPGFilter(response);
                    // window.gigya.accounts.setAccountInfo({profile: IPGFiltered.profile});
                    personalizationUtils.accountUtils.setInfo(response);
                    $(".form-horizontal.edit-myprofile-mode").show();
                    $(".edit-myprofile").hide();
                    updateView(response);
                    return true;
                } else {
                    console.log('Error :' + response.errorMessage);
                    genericErrorDialog.showDialog();
                }
            }

            function showModalDialog(dialogSelector, timeout) {
                timeout = timeout || 3000;
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
                $(dialogSelector).bs3modal('show');
                setTimeout(function () {
                    $(dialogSelector).bs3modal('hide');
                }, timeout);
            }

            function ScrollToTop(el) {
                $('html, body').animate({
                    scrollTop: $(el).offset().top - 50
                }, 'slow');
            }

            function updateView(personObj) {
                $("label.pemail").html(personObj.profile.email);
                $("label.pfirstname").html(personObj.profile.firstName);
                $("label.plastname").html(personObj.profile.lastName);
                $("label.pcompany").html(personObj.profile.work ? processInputText(personObj.profile.work[0].company) : "");
                $("label.ptitle").html(personObj.profile.work ? processInputText(personObj.profile.work[0].title) : "");

                // If country is blank, set it to current country
                if (personObj.profile.country !== "") {
                    $("label.pcountry").html(personObj.profile.country);
                } else {
                    $("label.pcountry").html(setCountrytoCurr());
                }
                
                $("label.selected-salutation").html(personObj.data.salutation);
                $("label.pkpmgclient").html((personObj.data.kpmg.client === true) ? window.kpmgPersonalize.i18n.customMsgs.yes : window.kpmgPersonalize.i18n.customMsgs.no);
                $("label.pkpmgemployee").html((personObj.data.kpmg.employee === true) ? window.kpmgPersonalize.i18n.customMsgs.yes : window.kpmgPersonalize.i18n.customMsgs.no);
                $("label.providefeedback").html((personObj.data.feedbackOptOut === false) ? window.kpmgPersonalize.i18n.customMsgs.yes : window.kpmgPersonalize.i18n.customMsgs.no);

                if (personObj.data.organizations) {
                    var org = "";
                    $(personObj.data.organizations).each(function () {
                        org = org + '<p class="org-list">' + processInputText(this) + '</p>';
                    });
                    $(".edit-myprofile-mode #board-group").html(org);
                }

                if( personObj.data.salutation && $('#salutations').has('option').length !== 0 ) {
                    $('.salutation-block').show();
                }
                else {
                    $('.salutation-block').hide();
                }

                if (personObj.loginProvider !== "site") {
                    $(".pwd-block").remove();
                    $(".account-information .social-login").css("display", "block");
                    $(".account-information .social-login-form").css("display", "block");
                    $("div.social-login-form label.pname").html(personObj.profile.firstName + " " + personObj.profile.lastName);
                    if( personObj.profile.country && personObj.profile.country !== "" ) {
                        $("div.social-login-form label.pcountry").html(personObj.profile.country);
                    }
                    $(".social-login-form span.picon").addClass("icon-" + personObj.loginProvider);
                    $('.account-information .account-info-header').hide();
                }
                if (!personObj.isVerified) {
                    $(".resend-info").css("display", "inline-block");
                    $(".email-resend-info").css("display", "inline-block");
                    $('.info-colon').css('display', 'inline-block');
                    $(".edit-myprofile-mode .form-group:last-child").addClass("site-login");
                    $(".edit-myprofile-mode").find('.account-information').addClass("verified-border");
                    $(".edit-myprofile-mode").find(".account-information > .header-wrapper > p").addClass("verified-label");
                } else {
                    $(".resend-info").css("display", "none");
                    $(".email-resend-info").css("display", "none");
                    $('.info-colon').css('display', 'none');
                    $(".edit-myprofile-mode .form-group:last-child").removeClass("site-login");
                    $(".edit-myprofile-mode").find('.account-information').removeClass("verified-border");
                    $(".edit-myprofile-mode").find(".account-information > .header-wrapper > p").removeClass("verified-label");
                }

                $(".loading-container").css("display", "none");
            }

            $(document).ready(function(){
                var hashArr = ['#general_information_container', '#communication_preferences_container', '#privacy_preferences_container'],
                profileTabParameter = personalizationUtils.commonUtils.getUrlParamsObj().tab || '',profileTabId;
                if(profileTabParameter) {
                    profileTabId ="#"+profileTabParameter;
                    if(hashArr.indexOf(profileTabId) !== -1) {
                        var hash = profileTabId.split('_').join('-');
                        $('.accordion .show').removeClass('show');
                        $('.accordion .icon-chevron-up').removeClass('icon-chevron-up white-color').addClass('icon-chevron-down blue-icon-color');
                        $('.accordion .card button:not(.collapsed)').addClass('collapsed').attr('aria-expanded', 'false');
                        $(hash).addClass('show');
                        $(hash).parent('.card').find('span.icon-chevron-down').removeClass('icon-chevron-down blue-icon-color').addClass('icon-chevron-up white-color');
                        $(hash).parent('.card').find('button.accordian-btn').removeClass('collapsed').attr('aria-expanded', 'true');
                    }
                } else if (personalizationUtils.commonUtils.getValue('origin')){
                    return false;
                } else {
                    $('#general-information-container').addClass('show');
                    $('#general-information-container').parent('.card').find('span.icon-chevron-down').removeClass('icon-chevron-down blue-icon-color').addClass('icon-chevron-up white-color');
                    $('#general-information-container').parent('.card').find('button.accordian-btn').removeClass('collapsed').attr('aria-expanded', 'true');
                }
                tabsOnLoad();
            });

            // accordian click events handling
            $('.card-header .btn-link').on('click', function() {                
                handleTabClick($(this).next());
                handleColorChange($(this).parents('.card-header'));
                showProfileReadModeAlways();
            });

            // show profile in read mode always when accordion opens
            function showProfileReadModeAlways() {
                $(".form-horizontal.edit-myprofile-mode").show();
                $(".edit-myprofile").hide();
            }

            // handling other open tabs on click
            function handleOtherTabs() {
                $( ".card" ).each(function( index ) {
                    if( $(this).find('button').attr('aria-expanded') === "true") {
                        $(this).find('.accordion-header').closest('.card-header').addClass('gray-background');
                        $(this).find('.accordion-header>button').addClass('medium-blue-color');
                        $(this).find('.accordion-header>span').addClass('blue-icon-color');
                        $(this).find('.accordion-header>span').addClass("icon-chevron-down").removeClass("icon-chevron-up");

                        $(this).find('.card-header').removeClass('blue-background');
                        $(this).find('.accordion-header>button').removeClass('white-color');
                        $(this).find('.accordion-header>span').removeClass('white-color');
                    }
                });
            }

            // changing tab colors dynamically
            function handleColorChange(currentActive) {
                if( currentActive.find('button').attr('aria-expanded') === "true" ) {
                    // currentActive.css('background', '#00338D');
                    currentActive.addClass('gray-background');
                    currentActive.find('button').addClass('medium-blue-color');
                    currentActive.find('span').addClass('blue-icon-color');

                    currentActive.removeClass('blue-background');
                    currentActive.find('button').removeClass('white-color');
                    currentActive.find('span').removeClass('white-color');
                }
                else {
                    currentActive.removeClass('gray-background');
                    currentActive.find('button').removeClass('medium-blue-color');
                    currentActive.find('span').removeClass('blue-icon-color');

                    currentActive.addClass('blue-background');
                    currentActive.find('button').addClass('white-color');
                    currentActive.find('span').addClass('white-color');
                }
                handleOtherTabs();
            }

            // changing arrows on click
            function handleTabClick(currentElement){
                if( currentElement.hasClass("icon-chevron-down") ) {
                    currentElement.removeClass("icon-chevron-down").addClass("icon-chevron-up");
                }
                else {
                    currentElement.addClass("icon-chevron-down").removeClass("icon-chevron-up");
                }
            }

            /*
             * Return the country name based on the current country indicated in the window.kpmgPersonalize.snp.params.countryCode object.
             * Obtains country name from the country <select> <option> elements
             */
            function setCountrytoCurr() {
                var country = "",
                    countryCode = "";
                var currCountry = (window.kpmgPersonalize.snp.params.countryCode).toLowerCase();
                $(".pcountryinput option.country-option").each(function() {
                    countryCode = $(this).data("countrycode").toLowerCase();
                    if (countryCode === currCountry) {
                        country = $(this).attr("title");
                        return false;
                    }
                });
                return country;
            }

            // show salutation field in author always
            if( window.kpmgPersonalize.misc.isAuthor ) {
                $('.salutation-block').show();
            }

            // triggerring accordion open on arrow click
            $('.card-header > h5:nth-child(1) > span:nth-child(2)').on('click', function() {
                $(this).prev().trigger('click');
            });

            $(document).on('click', '#communication-preferences-tabs .card-header .accordion-icon', function() {
                $(this).prev().trigger('click');
            });

            function tabsOnLoad(){                    
                $( ".card" ).each(function( index ) {                
                    if( $(this).find('.collapse.show').length ) {
                        $(this).find('.card-header').addClass('blue-background');
                        $(this).find('.accordion-header > button').addClass('white-color');
                        $(this).find('.accordion-header span').addClass('white-color');
                    }
                    else {
                        $(this).find('.card-header').addClass('gray-background');
                        $(this).find('.accordion-header > button').addClass('medium-blue-color');
                        $(this).find('.accordion-header span').addClass('blue-icon-color');
                    }
                });
            }

            // accessibility implementation
            $(".kpmgclient").on("keyup", function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).find('.clientCheckbox>label').addClass('focusOutline');
                }
                else if (e.which === 13 ) {
                    $(this).find('.clientCheckbox>input').trigger("click");
                }
            });

            $(".kpmgclient", elem).on("blur", function() {
                $(this).find('.clientCheckbox>label').removeClass('focusOutline');
            });

            $(".kpmgemployee").on("keyup", function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).find('.employeeCheckbox>label').addClass('focusOutline');
                }
                else if (e.which === 13 ) {
                    $(this).find('.employeeCheckbox>input').trigger("click");
                }
            });

            $(".kpmgemployee", elem).on("blur", function() {
                $(this).find('.employeeCheckbox>label').removeClass('focusOutline');
            });

            $(".kpmgfeedback").on("keyup", function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).find('.feedbackCheckbox>label').addClass('focusOutline');
                }
                else if (e.which === 13 ) {
                    $(this).find('.feedbackCheckbox>input').trigger("click");
                }
            });

            $(".kpmgfeedback", elem).on("blur", function() {
                $(this).find('.feedbackCheckbox>label').removeClass('focusOutline');
            });

            $(document).trigger('template.loaded');
        };

        return Profile;
    }
);
