import { dlc } from './utils.js';

// Initialize variables.
export const variablesInit = (t) => {
    dlc('START variablesInit');
    // var variablesInitDeref = new jQuery.Deferred();
    // c.userInfo = c.userInfo || window.userInfo || null;
    // c.isLoggedIn = c.isLoggedIn || window.isLoggedIn || null;
    // c.userDefinedCoords = c.userDefinedCoords || window.userDefinedCoords || null;
    // c.userToken = c.userToken || window.userToken || null;
    // c.http = "http";
    // if (document.location.href.toLowerCase().indexOf("https") === 0) c.http = "https";
    // c.global_dependents = new Array();
    // c.global_mod_reset = false;
    // c.global_rc_data = "";
    // c.global_rc_status = "";
    t.user_me = false;
    t.user_isBasic = false;
    t.user_avatarUrl = false;
    t.user_findCount = false;
    t.user_locale = false;

    // t.settings_hover_image_max_size = getValue('settings_hover_image_max_size', 600);
    t.settings_hover_image_max_size = 600;

    // tlc('START userToken');
    // try {
    //     if (c.userToken === null) {
    //         c.userData = $('#aspnetForm script:not([src])').filter(function() {
    //             return this.innerHTML.indexOf("ccConversions") != -1;
    //         }).html();
    //         if (c.userData !== null) {
    //             if (typeof c.userData !== "undefined") {
    //                 c.userData = c.userData.replace('{ID: ', '{"ID": ');
    //                 var regex = /([a-zA-Z0-9öÖäÄüÜß]+)([ ]?=[ ]?)(((({.+})(;)))|(((\[.+\])(;)))|(((".+")(;)))|((('.+')(;)))|(([^'"{\[].+)(;)))/g;
    //                 var match;
    //                 while (match = regex.exec(userData)) {
    //                     if (match[1] == "eventCacheData") continue;
    //                     var data = (match[6] || match[10] || match[14] || match[18] || match[21]).trim();
    //                     if (data.charAt(0) == '"' || data.charAt(0) == "'") data = data.slice(1, data.length - 1);
    //                     data = data.trim();
    //                     if (data.charAt(0) == '{' || data.charAt(0) == '[') data = JSON.parse(data);
    //                     if (typeof c.chromeUserData === "undefined") c.chromeUserData = {};
    //                     c.chromeUserData[match[1].replace('"', '').replace("'", "").trim()] = data;
    //                 }
    //                 if (c.chromeUserData["userInfo"]) c.userInfo = chromeUserData["userInfo"];
    //                 if (c.chromeUserData["isLoggedIn"]) c.isLoggedIn = chromeUserData["isLoggedIn"];
    //                 if (c.chromeUserData["userDefinedCoords"]) c.userDefinedCoords = c.chromeUserData["userDefinedCoords"];
    //                 if (c.chromeUserData["userToken"]) c.userToken = c.chromeUserData["userToken"];
    //             }
    //         }
    //     }
    // } catch(e) {gclh_error("Error parsing userdata from page",e);}
    // variablesInitDeref.resolve();
    // return variablesInitDeref.promise();
};
