define(["jquery"], function($) {
    "use strict";
    var NavbarHelpers;
    //
    NavbarHelpers = {
        rearrangeAuthorComponentDialog: rearrangeAuthorComponentDialog
    };
    //
    return NavbarHelpers;
    // private functions
    function rearrangeAuthorComponentDialog(VueComponent) {
        try {
            rearrange.apply(null, arguments);
            $(window).on('resize', function() {
                rearrange.call(null, VueComponent);
            });
        } catch (e) {
            console.log(e);
        }
    }

    function rearrange(VueComponent) {
        var itemId, authorDialogId, $authorDialogTrigger;
        //
        itemId = VueComponent.vm.id;
        authorDialogId = "#navigation-v2-author-" + itemId + "-editor";
        $authorDialogTrigger = $(authorDialogId);
        if (
            VueComponent &&
            VueComponent.vm &&
            typeof VueComponent.vm.isVisible === "boolean" &&
            !VueComponent.vm.isVisible
        ) {
            $authorDialogTrigger.remove();
        } else {
            rearrangeAuthorDialogTrigger.call(
                null,
                VueComponent,
                $authorDialogTrigger
            );
        }
    }

    function rearrangeAuthorDialogTrigger(VueComponent, $authorDialogTrigger) {
        var elemOffset, elemInnerWidth, authorDialogInnerWidth;
        //
        elemInnerWidth = $(VueComponent.$el).innerWidth();
        elemOffset = $(VueComponent.$el).offset();
        authorDialogInnerWidth = $authorDialogTrigger.innerWidth();
        //
        $authorDialogTrigger
            .css("top", elemOffset.top + 35)
            .css(
                "left",
                elemOffset.left +
                    elemInnerWidth / 2 -
                    authorDialogInnerWidth / 2
            );
    }
});
