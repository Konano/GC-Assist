const metaBanner = `
// ==UserScript==
// @name         GC Assist
// @description  A userscript to enhance the geocaching.com experience.
// @author       Konano
// @version      0.0.1
// @license      GNU General Public License v2.0
// @supportURL   https://github.com/Konano/GC-Assist/issues
// @namespace    https://github.com/Konano
// @run-at       document-end
// @match        https://www.geocaching.com/geocache/*
// @grant        none
// ==/UserScript==
`;

module.exports = {
    input: 'src/main.js',
    output: {
        file: 'geocaching-assist.user.js',
        format: 'iife',
        // format: 'esm',
        name: 'GCAssist',
        banner: metaBanner.trimStart(),
    }
};