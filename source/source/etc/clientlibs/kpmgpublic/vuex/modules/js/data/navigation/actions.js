define([], function () {
    return {
        setNavbarState: setNavbarState,
        setPersonalizedSiteState: setPersonalizedSiteState,
        setNonPersonalizedSiteState: setNonPersonalizedSiteState,
        setUnauthenticatedState: setUnauthenticatedState,
        setAuthenticatedState: setAuthenticatedState,
        personalizeNavbarNav: personalizeNavbarNav,
        personalizeAccountActionFlyout: personalizeAccountActionFlyout,
        personalizeSiteSelectorFlyoutCell3: personalizeSiteSelectorFlyoutCell3,
        setupSiteSelectorCard: setupSiteSelectorCard,
        setPromotionalCell: setPromotionalCell,
        setInterestSummaryCell: setInterestSummaryCell
    };
    // private functions
    function setNavbarState(ctx) {
        var promise;
        promise = new Promise(promiseFn);
        return promise;
        // private functions
        function promiseFn(resolve, reject) {
            ctx
                .dispatch('data/personalization/setupPersonalizationObject', null, {
                    root: true
                })
                .then(function () {
                    return ctx.getters.navbarState
                })
                .then(function (navbarState) {
                    var isSitePersonalized,
                        isPolicyAccepted,
                        isUserLoggedIn, loginCount, preferencesCount;
                    //
                    isAuthor = navbarState.site.isAuthor;
                    isSitePersonalized = navbarState.site.isPersonalized;
                    isPolicyAccepted = navbarState.p13n.policyAccepted;
                    isUserLoggedIn = navbarState.user.isLoggedIn;
                    loginCount = navbarState.user.loginCount;
                    preferencesCount = navbarState.user.preferencesCount;

                    // MANAGE STATES
                    // OK
                    if (isAuthor) {
                        if (isSitePersonalized) {
                            ctx
                                .dispatch('setPersonalizedSiteState')
                                .then(ctx.dispatch('setUnauthenticatedState'))
                                .then(resolve);
                        } else {
                            ctx
                                .dispatch('setNonPersonalizedSiteState')
                                .then(resolve);
                        }
                    } else {
                        if (isSitePersonalized && !isPolicyAccepted && !isUserLoggedIn) {
                            ctx
                                .dispatch('setPersonalizedSiteState')
                                .then(ctx.dispatch('setUnauthenticatedState'))
                                .then(ctx.dispatch('setupSiteSelectorCard'))
                                .then(resolve);
                        }

                        // OK
                        else if (isSitePersonalized && isPolicyAccepted && !isUserLoggedIn) {
                            ctx
                                .dispatch('setPersonalizedSiteState')
                                .then(ctx.dispatch('setUnauthenticatedState'))
                                // PERSONALIZE SITE SELECTOR
                                //.then(ctx.dispatch('personalizeNavbarNav'))
                                // PERONALIZE
                                //.then(ctx.dispatch('personalizeAccountActionFlyout'))
                                .then(ctx.dispatch('setupSiteSelectorCard'))
                                //.then(ctx.dispatch('personalizeSiteSelectorFlyoutCell3'))
                        
                                .then(resolve);
                        }

                        
                        // OK
                        else if (isUserLoggedIn) {
                            ctx
                                .dispatch('setPersonalizedSiteState')
                                .then(ctx.dispatch('setAuthenticatedState'))
                                // account-action-list-flyout setup
                                .then(ctx.dispatch('setInterestSummaryCell'))
                                .then(ctx.dispatch('setPromotionalCell'))
                                // site-selector-flyout setup
                                .then(ctx.dispatch('setupSiteSelectorCard'))
                                //
                                .then(resolve);
                        }

                        // OK
                        else if (!isSitePersonalized && !isUserLoggedIn) {
                            ctx
                                .dispatch('setNonPersonalizedSiteState')
                                .then(resolve);
                        }
                    }
                });
        }
    }

    function setPersonalizedSiteState(ctx) {
        var promise;
        promise = new Promise(promiseFn);
        return promise;
        //
        function promiseFn(resolve, reject) {
            ctx.commit('SET_PERSONALIZED_SITE_STATE');
            resolve();
        }
    }

    function setNonPersonalizedSiteState(ctx) {
        var promise;
        promise = new Promise(promiseFn);
        return promise;
        //
        function promiseFn(resolve, reject) {
            ctx.commit('SET_NON_PERSONALIZED_SITE_STATE');
            resolve();
        }
    }

    function setUnauthenticatedState(ctx) {
        var promise;
        promise = new Promise(promiseFn);
        return promise;
        // private functions
        function promiseFn(resolve, reject) {
            var payload;
            payload = {
                loggedOutLinks: ctx.state.accountActionList.loggedOutLinks,
                iconStyle: "icon-logged-out"
            };
            ctx.commit('SET_UNAUTHENTICATED_STATE', payload);
            resolve();
        }
    }

    function setAuthenticatedState(ctx) {
        var promise;
        promise = new Promise(promiseFn);
        return promise;
        // private functions
        function promiseFn(resolve, reject) {
            var payload;
            payload = {
                loggedInLinks: ctx.getters.userLoggedInLinks,
                iconStyle: "icon-person1"
            };
            ctx.commit('SET_AUTHENTICATED_STATE', payload);
            resolve();
        }
    }

    function personalizeNavbarNav(ctx) {
        var promise;
        promise = new Promise(promiseFn);
        return promise;
        // private functions
        function promiseFn(resolve, reject) {
            //
            var personalizableItems;
            //
            personalizableItems = ctx.getters.personalizableNavbarItems;
            personalizableItems.forEach(eachFn);
            resolve();
            // private functions
            function eachFn(cellPath) {
                var flyoutIsAuthored, personalizedCardLink, personlizedData;
                //
                flyoutIsAuthored = ctx.getters.navbarNavItem(cellPath).flyout.cell2;
                personlizedData = ctx.getters.personlizedData;
                //
                if (flyoutIsAuthored && personlizedData) {
                    personalizedCardLink = personlizedData;
                    ctx.commit('PERSONALIZE_NAVBAR_NAV_CELL', {
                        cellPath: cellPath,
                        personalizedCardLink: personalizedCardLink
                    });
                    ctx.commit('data/personalization/SHIFT_SNP_RESULTS', null, {
                        root: true
                    });
                }
            }
        }
    }

    function personalizeAccountActionFlyout(ctx) {
        var promise;
        promise = new Promise(promiseFn);
        return promise;
        // private functions
        function promiseFn(resolve, reject) {
            var cells;
            cells = ['cell2', 'cell3'];
            //
            cells.forEach(function (cell) {
                var personalizedData;
                //
                personalizedData = ctx.getters.personlizedData;
                if (personalizedData) {
                    ctx.commit('PERSONALIZE_ACCOUNT_ACTION_LIST_NAV_CELL', {
                        cell: cell,
                        personalizedCardLink: personalizedData
                    });
                    ctx.commit('data/personalization/SHIFT_SNP_RESULTS', null, {
                        root: true
                    });
                }
            });
            //
            resolve();
        }
    }

    function personalizeSiteSelectorFlyoutCell3(ctx) {
        var promise;
        promise = new Promise(promiseFn);
        return promise;
        // private functions
        function promiseFn(resolve, reject) {
            var personalizedCardLink;
            personalizedCardLink = ctx.getters.personlizedData;
            if (personalizedCardLink) {
                ctx.commit('PERSONALIZE_SITE_SELECTOR_CELL3', personalizedCardLink);
                ctx.commit('data/personalization/SHIFT_SNP_RESULTS', null, {
                    root: true
                });
            }
            resolve();
        }
    }

    function setupSiteSelectorCard(ctx) {
        var promise;
        promise = new Promise(promiseFn);
        return promise;
        // private functions
        function promiseFn(resolve, reject) {
            var siteSelectorCard, i18nLabels;
            //
            i18nLabels = ctx.getters.siteSelectorI18n;
            siteSelectorCard = {
                'title': i18nLabels.title,
                'description': i18nLabels.description,
                'type': 'site-selector-card',
                'imgUrl': '/etc/designs/kpmgpublic/images/site-selector-card.png',
                'altText': '',
                'linkUrl': ctx.getters.siteSelectorLinkUrl
            };
            ctx.commit('SET_SITE_SELECTOR_CARD', siteSelectorCard);
            resolve();
        }
    }

    function setPromotionalCell(ctx) {
        var promise;
        promise = new Promise(promiseFn);
        return promise;
        //
        function promiseFn(resolve, reject) {
            var promotionalData;
            promotionalData = ctx.getters.promotionalData;
            ctx.commit('SET_PROMOTIONAL_CELL', promotionalData);
            resolve();
        }
    }

    function setInterestSummaryCell(ctx) {
        var interestSummaryData;
        //
        composeInterestSummaryData();
        //
        ctx.commit('SET_INTEREST_SUMMARY_CELL', interestSummaryData);
        // private functions
        function composeInterestSummaryData() {
            var personalizationState, preferencesCount, i18nLabels;
            //
            interestSummaryData = {};
            personalizationState = ctx.rootState.data.personalization;
            preferencesCount = personalizationState.personalizationUtils.preferencesCount;
            i18nLabels = personalizationState.i18nLabels.interestSummary;
            //
            interestSummaryData.type = 'interest-summary';
            interestSummaryData.title = i18nLabels.title;
            interestSummaryData.includesText = i18nLabels.yourInterests;
            interestSummaryData.selectText = i18nLabels.description;
            interestSummaryData.label = i18nLabels.selectedInterests;
            interestSummaryData.summaryList = getSummaryList();
            interestSummaryData.linkUrl = ctx.state.accountActionList.loggedInLinks[3].url;
            // private functions
            function getSummaryList() {
                var summaryList;
                //
                composeSummaryList();
                //
                return summaryList;
                // private functions
                function composeSummaryList() {
                    summaryList = [];
                    //
                    i18nLabels = personalizationState.i18nLabels.interestSummary;
                    //
                    Object.keys(preferencesCount).forEach(iterateKeys);
                }

                function iterateKeys(key) {
                    if (key !== 'total') {
                        summaryList.push(preferencesCount[key] + " " + i18nLabels[key]);
                    }
                }
            }
        }
    }

});
