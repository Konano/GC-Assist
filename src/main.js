import { appendMetaId, dlc } from './utils.js';
import { mainGCInit } from './gc.js';

const main = (t) => {
    checksBeforeRunning();
    // setTestLogConsole();
    quitOnAdFrames()
        // .then(function () { return jqueryInit(t); })
        // .then(function () { return browserInit(t); })
        // .then(function () { return constInit(t); })
        .then(() => variablesInit(t))
        .then(() => {
            const handleBodyContentFound = (observer) => {
                dlc('BodyContent found');
                dlc(`URL: ${document.location.href}`);
                // 如果传入了 MutationObserver 实例，则停止监听 DOM 变化
                if (observer) observer.disconnect();
                // 通过 URL 判断并调用相应的初始化函数
                // TODO: 添加更多情况
                const url = document.location.href;
                if (url.match(/^https:\/\/www\.geocaching\.com/)) mainGCInit();
            };
            const observeBodyContent = () => {
                const targetNode = document.body;
                const config = { childList: true, subtree: false };
                // MutationObserver 回调函数，当监听到 DOM 变化时触发
                const callback = (mutationsList, observer) => {
                    if (document.body.children.length > 1) {
                        handleBodyContentFound(observer);
                    }
                };
                // 创建 MutationObserver 实例并开始监听
                const observer = new MutationObserver(callback);
                observer.observe(targetNode, config);
                // 页面初始加载时立即检查一次（避免内容已经加载但没有触发 MutationObserver 的情况）
                if (document.body.children.length > 1) {
                    handleBodyContentFound(observer);
                }
            };
            dlc('START observeBodyContent');
            observeBodyContent();
        });
};

// Checks before running the main function.
const checksBeforeRunning = () => {
    /*if (typeof GM.info != "undefined" && typeof GM.info.scriptHandler != "undefined" && GM.info.scriptHandler == 'Greasemonkey') {
        var text = 'Sorry, the script GC little helper II does not run with script manager Greasemonkey. Please use the script manager Tampermonkey or an other similar script manager.\n\nDo you want to see the "Tips for the installation"?\n ';
        var url = 'https://github.com/2Abendsegler/GClh/blob/master/docu/tips_installation.md#en';
        if (window.confirm(text)) window.open(url, '_blank');
        throw Error('Abort because of GClh II installation under script manager Greasemonkey.');
    }
    if (document.getElementsByTagName('head')[0] && document.getElementById('GClh_II_running')) {
        var text = 'Sorry, the script GC little helper II is already running. Please make sure that it runs only once.\n\nDo you want to see tips on how this could happen and what you can do about it?';
        var url = 'https://github.com/2Abendsegler/GClh/blob/master/docu/faq.md#1-en';
        if (window.confirm(text)) window.open(url, '_blank');
        throw Error('Abort because of GClh II already running.');
    } else */ appendMetaId('GC_Assist_running');
    // function checkForOldGClh(waitCount) {
    //     var linklists = 0;
    //     $('gclh_nav ul li a.Dropdown').each(function () { if ($(this)[0].innerHTML == 'Linklist') linklists++; });
    //     if (linklists > 1) {
    //         var text = 'Sorry, the script GC little helper II does not run together with the OLDER GC little helper (without the "II").\n\nYou have installed also the older GC little helper as script in your script manager or as add on in your browser. This older GC little helper has not been maintained since 2016 and works not correctly.\n\nPlease delete this older GC little helper.\n';
    //         alert(text);
    //         throw Error('Abort because of older GClh installation.');
    //     } else { waitCount++; if (waitCount <= 20) setTimeout(function () { checkForOldGClh(waitCount); }, 500); }
    // }
    // checkForOldGClh(0);
};

// function setTestLogConsole() {
//     test_log_console = GM_getValue('test_log_console', false);
//     GM_setValue('test_log_console', test_log_console);
// };

// Quit on Ad Frames.
const quitOnAdFrames = () => {
    dlc('START quitOnAdFrames');
    return new Promise((resolve, reject) => {
        const { name } = window;
        if (!name || !name) {
            resolve();
        } else {
            reject();
        }
    });
};

const variablesInit = (t) => {
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

main(globalThis);
dlc('GCAssist main.js loaded.');
