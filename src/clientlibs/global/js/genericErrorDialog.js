define(['jquery', 'underscore', 'personalizationUtils'], function ($, _, personalizationUtils) {
    var logger = personalizationUtils.loggerUtils,
        GenericErrorDialog = {};

    GenericErrorDialog.id = "generic-error-dialog";

    GenericErrorDialog.templateHTML = '<div class="modal fade generic-error-dialog" id="' + GenericErrorDialog.id + '" data-role="dialog">' +
        '<div class="modal-dialog">' +
            '<div class="modal-content">' +
                '<div class="modal-header">' +
                    '<span class="modal-title" tabindex="0"></span>' +
                    '<span class="icon-close btn-close close" tabindex="0" data-dismiss="modal"></span>' +
                '</div>' +
                '<div class="separator">' +
                '</div>' +
                '<div class="modal-body" tabindex="0">' +
                    '<span class="msg-holder"></span>' +
                '</div>' +
                '<div class="cta-holder">' +
                    '<span class="ok-cta icon-chevron-right" tabindex="0" aria-label="Ok" role="button"></span>' +
                    '<span class="clear-floating"></span>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

    GenericErrorDialog.showDialog = function showDialog(options) {
        options = options || {};
        // handling account disabled case based on errorcode "403041" from gigyaMsgs
        if(options.errorCode === 403041 ) {
            description = window.kpmgPersonalize.i18n.customMsgs.gigya_account_disabled_error_description;
            title = window.kpmgPersonalize.i18n.customMsgs.gigya_account_disabled_error_title;
            primaryAction = window.kpmgPersonalize.i18n.customMsgs.gigya_account_disabled_error_primary_action;
        } else if(options.cross_site_flow) {
            description = window.kpmgPersonalize.i18n.customMsgs.cross_site_error_description;
            title = window.kpmgPersonalize.i18n.customMsgs.cross_site_error_title;
            primaryAction = window.kpmgPersonalize.i18n.customMsgs.gigya_error_primary_action;
        } else { // all other error conditions are handled in else
            description = window.kpmgPersonalize.i18n.customMsgs.gigya_error_description;
            title = window.kpmgPersonalize.i18n.customMsgs.gigya_error_title;
            primaryAction = window.kpmgPersonalize.i18n.customMsgs.gigya_error_primary_action;
        }

        var dialogSelector = "#" + GenericErrorDialog.id;

        $("html, body").animate({
            scrollTop: 0
        }, "slow");

        $(dialogSelector + " .modal-title").html(title);
        $(dialogSelector + " .msg-holder").html(description);
        $(dialogSelector + " .ok-cta").html(primaryAction);
        $(dialogSelector).bs3modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
        $(dialogSelector + " .ok-cta").trigger('focus');

        if (options.closingTimeout) {
            setTimeout(function () {
                $(dialogSelector).bs3modal('hide');
            }, options.closingTimeout);
        }
    }

    /**
     * Initialization sequence
     */

    //Add error dialog template to body
    if (!$("#" + GenericErrorDialog.id).length) {
        $("body").append($(GenericErrorDialog.templateHTML));
    }

    //Attach events
    $("#" + GenericErrorDialog.id + " .ok-cta").on('click', function () {
        var newPath,
            currentPath = window.location.pathname.split("/");

        newPath = currentPath.slice(1, window.kpmgPersonalize.misc.isAuthor ? 5 : 3);
        newPath.unshift(window.location.origin);
        newPath.push("home.html");
        personalizationUtils.pathUtils.gotoPage(newPath.join("/"));
    });

    window.kpmgPersonalize.genericErrorDialog = GenericErrorDialog;
    return GenericErrorDialog;
});
