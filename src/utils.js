// Add meta info.
export const appendMetaId = (id) => {
    const head = document.head;
    const meta = document.createElement('meta');
    meta.id = id;
    head.appendChild(meta);
}

// Only for debugging.
export const dlc = (output) => {
    // TODO: use test_log_console to control logging
    if (output?.trim()) console.info(`GCAssist: ${output}`);
}

// Console error log.
export const logError = (module = 'Unknown Module', error = {}) => {
    const { message = 'No message', stack = '', stacktrace = '' } = error;
    const error_msg = `GCAssist_ERROR - ${module} - ${window.location.href}: ${message}` + "\nStacktrace:\n" + stack + (stacktrace ? ("\n" + stacktrace) : "");
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
}
