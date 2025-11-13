const metaBanner = `
// ==UserScript==
// @name         GC Assist
// @description  A userscript to enhance the geocaching.com experience.
// @author       Konano
// @version      0.0.1
// @license      GNU General Public License v3.0
// @supportURL   https://github.com/Konano/GC-Assist/issues
// @namespace    https://github.com/Konano
// @run-at       document-end
// @match        https://www.geocaching.com/geocache/*
// @grant        none
// ==/UserScript==
`;

function stripComments() {
    return {
        name: 'strip-comments',
        renderChunk(code) {
            const withoutComments = code
                .replace(/(^|\s)\/\/.*$/gm, (match, prefix) => {
                    // prefix 是匹配到的前导字符（行首或空白）
                    // 如果是行首或只有空格/Tab，就删除整行注释
                    if (/^[ \t]\s*$/.test(prefix)) {
                        return ''; // 删除
                    }
                    return match; // 保留原注释
                })
                .replace(/^\s*[\r\n]/gm, '');
            return {
                code: withoutComments,
                map: null,
            };
        },
    };
}

module.exports = {
    input: 'src/main.js',
    output: {
        file: 'geocaching-assist.user.js',
        format: 'iife',
        // format: 'esm',
        name: 'GCAssist',
        banner: metaBanner.trimStart(),
    },
    plugins: [stripComments()],
};
