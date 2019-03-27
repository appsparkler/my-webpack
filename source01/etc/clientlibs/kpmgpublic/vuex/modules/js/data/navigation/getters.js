define(['moment'], function (moment) {
    return {
        navbarState: navbarState,
        userLoggedInLinks: userLoggedInLinks,
        snpResults: snpResults,
        personalizableNavbarItems: personalizableNavbarItems,
        personlizedData: personlizedData,
        navbarNavItem: navbarNavItem,
        siteSelectorI18n: siteSelectorI18n,
        siteSelectorLinkUrl: siteSelectorLinkUrl,
        promotionalData: promotionalData 
    };
    // private functions
    function navbarState(state, getter, rootState) {
        var state;
        //
        state = {
            site: {
                isPersonalized: rootState.data.siteInfo.isPersonalized,
                isAuthor: rootState.data.siteInfo.isAuthor
            },
            user: {
                isLoggedIn: rootState.data.personalization.personalizationUtils.isUserLoggedIn,
                loginCount: 0,
                preferencesCount: 0
            },
            p13n: {
                policyAccepted: rootState.data.personalization.personalizationUtils.privacyPolicyAccepted
            }
        };
        //
        return state;
    }

    function userLoggedInLinks(state, getters, rootState) {
        try {
            return gettingLoggedInLinks();
        } catch (err) {
            return [];
        }
        //
        function gettingLoggedInLinks() {
            var loggedInLinks;
            loggedInLinks = state.accountActionList.loggedInLinks;
            loggedInLinks.map(mapFn);
            return loggedInLinks;
            // private functions
            function mapFn(link, idx) {
                var KEYS, linksJSONlinks;
                //
                linksJSONlinks = rootState.data.personalization.personalizationUtils.linksJSON.links;
                //
                KEYS = {
                    DASHBOARD: 'kpmg.personalization.homepage.mykpmgflyout.dashboard',
                    LIBRARY: 'kpmg.personalization.homepage.mykpmgflyout.library',
                    ABOUT: 'kpmg.personalization.homepage.mykpmgflyout.aboutMyKpmg',
                    INTERESTS: 'kpmg.personalization.homepage.mykpmgflyout.interests',
                    PROFILE: 'kpmg.personalization.homepage.mykpmgflyout.profile',
                    LOGOUT: 'kpmg.personalization.homepage.mykpmgflyout.logout'
                };
                //
                switch (link.key) {
                    case KEYS.DASHBOARD:
                        link.label = linksJSONlinks.dashboard.label;
                        link.url = linksJSONlinks.dashboard.url;
                        break;

                    case KEYS.LIBRARY:
                        link.label = linksJSONlinks.library.label;
                        link.url = linksJSONlinks.library.url;
                        break;

                    case KEYS.ABOUT:
                        link.label = linksJSONlinks.aboutmykpmg.label;
                        link.url = linksJSONlinks.aboutmykpmg.url;
                        break;

                    case KEYS.INTERESTS:
                        link.label = linksJSONlinks.interests.label;
                        link.url = linksJSONlinks.interests.url;
                        break;

                    case KEYS.PROFILE:
                        link.label = linksJSONlinks.profile.label;
                        link.url = linksJSONlinks.profile.url;
                        break;

                    case KEYS.LOGOUT:
                        link.label = linksJSONlinks.logout.label;
                        link.url = linksJSONlinks.logout.url;
                        break;
                };
                //
                return link;
            }
        }
    }

    function snpResults(state, getters, rootState) {
        try {
            var mappedSnpResults;
            mappedSnpResults = rootState.data.personalization.snpResults["personalized-results"].resultset.results.result.map(mapFn);
            return mappedSnpResults;
            // private functions
            function mapFn(cardLink) {
                return {
                    altText: cardLink.KPMG_Title,
                    description: cardLink.KPMG_Description,
                    imgUrl: cardLink.KPMG_Image,
                    linkUrl: cardLink.KPMG_URL,
                    title: cardLink.KPMG_Title,
                    type: "card-link"
                };
            }
        } catch (e) {
            return [];
        }
    }

    function personlizedData(state, getters) {
        try {
            return getters.snpResults[0];
        } catch (e) {
            return false;
        }
    }

    function personalizableNavbarItems(state) {
        try {
            return Object.keys(state.navbarNav).filter(filterFn);
            // private functions
            function filterFn(item) {
                return (item.indexOf('optional') === -1);
            }
        } catch (e) {
            return [];
        }
    }

    function navbarNavItem(state) {
        return function (name) {
            return state.navbarNav[name];
        }
    }

    function siteSelectorI18n(state, getters, rootState) {
        try {
            return rootState.data.personalization.i18nLabels.siteSelector;
        } catch (err) {
            return {};
        }
    }

    function siteSelectorLinkUrl(state, getters, rootState) {
        try {
            return prepareLinkUrl();
        } catch(e) {
            return false;
        }
        // private functions
        function prepareLinkUrl() {
            var linkUrl, isUserLoggedIn, ext;
            //
            isUserLoggedIn = rootState.data.personalization.personalizationUtils.isUserLoggedIn || false;
            ext = '.html';
            //
            if (isUserLoggedIn) {
                var url = rootState.data.personalization.personalizationUtils.linksJSON.links.interests.url;
                linkUrl = (url.indexOf(ext) === -1) ? url + ext : url;
                linkUrl = linkUrl + '#countries'
            } else {
                var url = rootState.data.personalization.personalizationUtils.linksJSON.anonymousSiteSettingURL;
                linkUrl = (url.indexOf(ext) === -1) ? url + ext : url;
            }
            //
            return linkUrl;
        }
    }
    
    function promotionalData(state, getters, rootState) {
		try {
            var promotionalData;
            composePromotionalData();
            return promotionalData;
        } catch(e) {
            return false;
        }
		// private functions
		function composePromotionalData() {
			var profile, personalizationState, i18nLabels,
            nameSwitchlog = window.kpmgPersonalize.firstnameLastnameSwitch ? window.kpmgPersonalize.firstnameLastnameSwitch : false;
			//
			personalizationState = rootState.data.personalization;
			profile = personalizationState.personalizationUtils.accountInfo.profile;
			i18nLabels = personalizationState.i18nLabels.promotional;
			//
			promotionalData = {};
			promotionalData.type = "promotional";
			promotionalData.welcomeLabel = i18nLabels.welcome;
            if (nameSwitchlog) {
                promotionalData.userName = (profile) ? profile.lastName + " " + profile.firstName : '';
            } else {
                promotionalData.userName = (profile) ? profile.firstName + " " + profile.lastName : '';
            }
			
			promotionalData.text = i18nLabels.oldUser + " " + getFormattedRegistrationDate();
			promotionalData.label = i18nLabels.myProfileCTA;
			promotionalData.linkUrl = state.accountActionList.loggedInLinks[0].url;
			promotionalData.imgUrl = "/etc/designs/kpmgpublic/images/icon-tag.png";
			promotionalData.newUser1 = i18nLabels.newUser1;
			promotionalData.newUser2 = i18nLabels.newUser2; 
			promotionalData.newUser3 = i18nLabels.newUser3; 
			promotionalData.newUser4 = i18nLabels.newUser4;
			promotionalData.interestUrl = state.accountActionList.loggedInLinks[3].url;
			promotionalData.learnMoreUrl = state.accountActionList.loggedOutLinks[2].url;
			promotionalData.unknownUser = i18nLabels.unknownUser;

			// private functions
			function getFormattedRegistrationDate() {
				var formattedRegistrationDate;
				//
				formattedRegistrationDate = moment(personalizationState.personalizationUtils.accountInfo.registered).format("MMMM Do, YYYY");
				//
				return formattedRegistrationDate;
			}
		}
	}

});
