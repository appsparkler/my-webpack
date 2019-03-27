define(["vue", "vue-components/navbar/js/navbar-helpers"], function(
  Vue,
  NavbarHelpers
) {
    "use strict";
    var VueIkonTriggerWithNavFlyoutDropdown;
  //
    VueIkonTriggerWithNavFlyoutDropdown = Vue.component(
    "ikon-trigger-with-navflyout-dropdown",
    {
        template: "#ikon-trigger-with-navflyout-dropdown-component-template",
        props: ["vm"],
        methods: {
            showDropdown: showDropdown
        },
        mounted: mounted
    }
  );
  //
    return VueIkonTriggerWithNavFlyoutDropdown;
  // private functions
    function showDropdown(evt) {
        $(evt.target).dropdown("toggle");
    }
  //
    function mounted() {
    /*jshint validthis:true */
        var isAuthor;
        isAuthor = this.$store.state.data.siteInfo.isAuthor;
        if (isAuthor) {
            NavbarHelpers.rearrangeAuthorComponentDialog(this);
        }
    }
});
