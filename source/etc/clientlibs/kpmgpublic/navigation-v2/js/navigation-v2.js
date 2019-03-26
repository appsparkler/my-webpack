define([
        'jquery',
        'tracking',
        'mykpmgflyout',
        'vue',
        'vuex-store',
        // CommonUtils
        'common-utils',
        // Vue directives
        'vue-dev-directive',
        'v-process-url',
        // NAVBAR
        'vue-components/navbar/js/navbar'
    ],

    // Define Function
    function navigationV2($, Tracking, MyKpmgFlyout, Vue, Store, CommonUtils) {
        'use strict';
        //
        var NavigationVue;
        //
        NavigationVue = {};
        //
        var navigationV2Elem;
        //
        navigationV2Elem = '#navigation-v2';
        //
        NavigationVue.initializeVue = initializeVue;
        //
        addNavigationV2ClassToBody();

        // private functions
        function initializeVue() {
            var tracking = new Tracking($('.global-navigation'), 'Navigation-V2');
            Store
                .dispatch('data/navigation/setNavbarState')
                .then(function() {
                    return new Vue({
                        store: Store,
                        el: navigationV2Elem,
                        mounted: function() {
                            CommonUtils.setBrowserNameOnAllTags();
                            MyKpmgFlyout();
                            setUpSkipLink();
                        },
                        data: function() {
                            return {
                                isDev: false
                            };
                        }
                    });
                });

        }

        function addNavigationV2ClassToBody() {
            $('body').addClass('navigation-v2');
        }
        //Accessibility
        function setUpSkipLink() {
            $(navigationV2Elem + " .skip-nav").on("click", function() {
                    $("#page-content").trigger('focus');
                })
                .on("focus", function() {
                    $(this).addClass("focusOutline");
                })
                .on("blur", function() {
                    $(this).removeClass("focusOutline");
                })
                .on("keydown", function(e) {
                    if (e.which === 13) {
                        $(this).trigger("click");
                    }
                });
        }
        return NavigationVue;
    }


);
