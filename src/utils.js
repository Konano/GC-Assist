// // Replace apostrophes.
// function repApo(s) {
//     return s.replace(/'/g, '&#39;');
// }

//////////////////////////////////////
// 修改类
//////////////////////////////////////

// Add CSS Style.
export const appendCssStyle = (css, name, id) => {
    if (id && document.getElementById(id)) return;
    if (!css) return;
    const tag = name ? document.querySelector(name) : document.head;
    if (!tag) return;
    const style = document.createElement('style');
    style.textContent = `GCAssist{} ${css}`;
    if (id) style.id = id;
    tag.appendChild(style);
};
// Add meta info.
export const appendMetaId = (id) => {
    const head = document.head;
    const meta = document.createElement('meta');
    meta.id = id;
    head.appendChild(meta);
};

// Inject script into site context.
export const injectPageScript = (scriptContent, tagName = 'head', idName) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    if (idName) script.id = idName; // 设置 id 属性
    script.textContent = scriptContent; // 将 JS 代码写入 script 标签
    const pageHead = document.querySelector(tagName); // 找到对应的标签，默认 head
    console.log(tagName, idName);
    pageHead.appendChild(script); // 把 script 插入到页面中
};

//////////////////////////////////////
// 日志类
//////////////////////////////////////

// Only for debugging.
export const dlc = (output) => {
    // TODO: use test_log_console to control logging
    if (output?.trim()) console.info(`GCAssist: ${output}`);
};

// Console error log.
export const logError = (module = 'Unknown Module', error = {}) => {
    const { message = 'No message', stack = '', stacktrace = '' } = error;
    const error_msg =
        `GCAssist_ERROR - ${module} - ${window.location.href}: ${message}` +
        '\nStacktrace:\n' +
        stack +
        (stacktrace ? '\n' + stacktrace : '');
    console?.error(error_msg);
    // else if (typeof (GM_log) != "undefined") GM_log(txt);
    // if (settings_gclherror_alert) {
    //     if ($("#gclh-gurumeditation").length == 0) {
    //         $("body").before('<div id="gclh-gurumeditation"></div>');
    //         $("#gclh-gurumeditation").append('<div></div>');
    //         $("#gclh-gurumeditation > div").append('<p style="font-weight: bold; font-size: large; padding-top: 4px;">GC little helper II Error</p>');
    //         $("#gclh-gurumeditation > div").append('<div></div>');
    //         $("#gclh-gurumeditation > div").append('<p style="font-size: smaller;">For more information see the console. <a href="https://github.com/2Abendsegler/GClh/issues" target="_blank">Create a new issue / bug report at GitHub.</a></p>');
    //     }
    //     $("#gclh-gurumeditation > div > div").append( "<p>"+modul + ": " + err.message+"</p>");
    // }
};

//////////////////////////////////////
// 判断类
//////////////////////////////////////

// Which webpage is it?
export const isPage = (name) => {
    let status = false;
    const url = document.location.pathname;

    if (name === 'cache_listing') {
        const isCacheDetails = /^\/(seek\/cache_details\.aspx|geocache\/)/.test(url);
        const hasNoSubmitOrGoBack = !document.querySelector('#cspSubmit') && !document.querySelector('#cspGoBack');

        if (isCacheDetails && hasNoSubmitOrGoBack) {
            status = true;
        }

        // Exclude (new) Log Page
        if (/^\/geocache\/.*\/log/.test(url)) status = false;

        // Exclude unpublished Caches
        if (document.querySelectorAll('.UnpublishedCacheSearchWidget').length > 0) status = false;

        // } else if (name == 'unpublished_cache') {
        //     if (
        //         document.getElementById('unpublishedMessage') !== null ||
        //         document.getElementById('ctl00_ContentBody_GeoNav_uxPostReviewerNoteLogType') !== null
        //     )
        //         status = true;
        // } else if (name == 'profile') {
        //     if (url.match(/^\/my(\/default\.aspx)?/)) status = true;
        // } else if (name == 'publicProfile') {
        //     if (url.match(/^\/(profile|p\/)/)) status = true;
        // } else if (name == 'lists') {
        //     if (url.match(/^\/plan\/lists/)) status = true;
        // } else if (name == 'searchmap') {
        //     if (url.match(/^(\/live|)\/play\/map/)) status = true;
        // } else if (name == 'map') {
        //     if (url.match(/^\/map/)) status = true;
        // } else if (name == 'find_cache') {
        //     if (url.match(/^\/play\/(results|search|geocache)/)) status = true;
        // } else if (name == 'collection_1') {
        //     if (url.match(/^\/play\/(friendleague|leaderboard|treasure|souvenircampaign|guidelines|promotions)/))
        //         status = true;
        // } else if (name == 'hide_cache') {
        //     if (url.match(/^\/play\/hide/)) status = true;
        // } else if (name == 'geotours') {
        //     if (url.match(/^\/play\/geotours/)) status = true;
        // } else if (name == 'drafts') {
        //     if (url.match(/^\/account\/drafts/)) status = true;
        // } else if (name == 'settings') {
        //     if (url.match(/^\/(account|live\/account)\/(settings|lists|drafts|documents)/)) status = true;
        // } else if (name == 'messagecenter') {
        //     if (url.match(/^\/account\/messagecenter/)) status = true;
        // } else if (name == 'dashboard') {
        //     if (url.match(/^\/account\/dashboard$/)) status = true;
        // } else if (name == 'owner_dashboard') {
        //     if (url.match(/^\/play\/owner/)) status = true;
        // } else if (name == 'dashboard-section') {
        //     if (url.match(/^\/account\/dashboard/)) status = true;
        // } else if (name == 'promos') {
        //     // Like 'Wonders of the World'.
        //     if (url.match(/^\/promos/)) status = true;
        // } else if (name == 'track') {
        //     if (url.match(/^\/track\/($|#$|edit|upload|default.aspx)/)) status = true;
        // } else if (name == 'souvenirs') {
        //     if (url.match(/^\/my\/souvenirs\.aspx/)) status = true;
        // } else if (name == 'logbook') {
        //     // View all logs.
        //     if (url.match(/^\/seek\/geocache_logs\.aspx/)) status = true;
        // } else if (name == 'logform') {
        //     if (url.match(/^\/live\/(?:geocache|trackable)\/(?:gc|tb)[a-z0-9]+/i)) status = true;
    } else {
        logError('isPage', `isPage(${name}, ... ): unknown name`);
    }
    return status;
};
