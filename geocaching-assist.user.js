// ==UserScript==
// @name         GC Assist
// @description  A userscript to enhance the geocaching.com experience.
// @author       Konano
// @version      0.0.1
// @license      GNU General Public License v2.0
// @supportURL   https://github.com/Konano/GC-Assist/issues
// @namespace    https://github.com/Konano
// @charset      UTF-8
// @run-at       document-end
// @match        https://www.geocaching.com/geocache/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Add meta info.
    const appendMetaId = (id) => {
        const head = document.head;
        const meta = document.createElement('meta');
        meta.id = id;
        head.appendChild(meta);
    };

    // Debug log console.
    const dlc = (output) => {
        // TODO: use test_log_console to control logging
        if (output?.trim()) console.info(`GCAssist: ${output}`);
    };

    // import * as utils from './utils.js';

    const main = (t) => {
        checksBeforeRunning();
        // setTestLogConsole();
        quitOnAdFrames()
            // .then(function () { return jqueryInit(t); })
            // .then(function () { return browserInit(t); })
            // .then(function () { return constInit(t); })
            // .then(function () { return variablesInit(t); })
            .then(() => {
                const checkBodyContent = (waitCount = 0) => {
                    // if (bodyChildren > 1 || (bodyChildren == 1 && url.match(/^https:\/\/www\.certitudes\.org\/(certify|certitude\?wp=[A-Z0-9]{1,15})/))) {
                    if ($('body').children().length > 1) {
                        dlc('BodyContent found');
                        const url = document.location.href;
                        dlc(`URL: ${url}`);
                        /* if (url.match(/^https:\/\/maps\.google\./) || url.match(/^https:\/\/www\.google\.[a-zA-Z.]*\/maps/)) {
                            mainGMaps();
                            } else if (url.match(/^https:\/\/www\.google\.[a-zA-Z.]*\/search/)) {
                                mainGSearch();
                            } else if (url.match(/^https:\/\/www\.openstreetmap\.org/)) {
                                mainOSM();
                        } else */
                        //  if (url.match(/^https:\/\/www\.geocaching\.com/)) {
                        //     mainGCWait();
                        //     // } else if (url.match(/^https:\/\/project-gc\.com\/Tools\/PQSplit/)) {
                        //     //     mainPGC();
                        //     // } else if (url.match(/^https:\/\/www\.certitudes\.org\/(certify|certitude\?wp=[A-Z0-9]{1,15})/)) {
                        //     //     mainCertitudes();
                        // }
                    } else {
                        if (waitCount <= 5000) setTimeout(() => checkBodyContent(waitCount + 1), 10);
                    }
                };
                dlc('START checkBodyContent');
                checkBodyContent(0);
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

    main();
    dlc('GCAssist main.js loaded.');

})();
