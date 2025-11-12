import { dlc, logError } from './utils.js';

export const mainGCInit = () => {
    dlc('START mainGCInit');

    //     // Hide login procedures via Facebook, Google, Apple ... .
    //     if (settings_hide_facebook && (document.location.href.match(/\.com\/(account\/register|login|account\/login|account\/signin|account\/join)/))) {
    //         try {
    //             if ($('.btn.btn-facebook')[0]) $('.btn.btn-facebook')[0].style.display = "none";
    //             if ($('.divider-flex')[0]) $('.divider-flex')[0].style.display = "none";
    //             if ($('.divider')[0]) $('.divider')[0].style.display = "none";
    //             if ($('.disclaimer')[0]) $('.disclaimer')[0].style.display = "none";
    //             if ($('.login-with-facebook')[0]) $('.login-with-facebook')[0].style.display = "none";
    //             if ($('.horizontal-rule')[0]) $('.horizontal-rule')[0].style.display = "none";
    //             if ($('.oauth-providers-login')[0]) $('.oauth-providers-login')[0].style.display = "none";
    //         } catch(e) {gclh_error("Hide Facebook",e);}
    //     }

    // // Improve print page cache listing.
    //     dlc('START Improve print page');
    //     if (document.location.href.match(/\.com\/seek\/cdpf\.aspx/)) {
    //         try {
    //             // Hide disclaimer.
    //             if (settings_hide_disclaimer) {
    //                 var d = ($('.Note.Disclaimer')[0] || $('.DisclaimerWidget')[0] || $('.TermsWidget.no-print')[0]);
    //                 if (d) d.remove();
    //             }
    //             // Decrypt hints.
    //             if (settings_decrypt_hint) {
    //                 if ($('#uxDecryptedHint')[0]) $('#uxDecryptedHint')[0].style.display = 'none';
    //                 if ($('#uxEncryptedHint')[0]) $('#uxEncryptedHint')[0].style.display = '';
    //                 if ($('.EncryptionKey')[0]) $('.EncryptionKey')[0].remove();
    //             }
    //             // Show other coord formats.
    //             var box = document.getElementsByClassName("UTM Meta")[0];
    //             var coords = document.getElementsByClassName("LatLong Meta")[0];
    //             if (box && coords) {
    //                 var match = coords.innerHTML.match(/((N|S) [0-9][0-9]. [0-9][0-9]\.[0-9][0-9][0-9] (E|W) [0-9][0-9][0-9]. [0-9][0-9]\.[0-9][0-9][0-9])/);
    //                 if (match && match[1]) {
    //                     coords = match[1];
    //                     otherFormats(box, coords, "<br>");
    //                 }
    //             }
    //             // Hide side rights.
    //             if ($('#Footer')[0]) $('#Footer')[0].remove();
    //             // Display listing images in maximum available width for FF and chrome. Only for display, print was ok.
    //             appendCssStyle('.item-content img {max-width: -moz-available; max-width: -webkit-fill-available;}');
    //         } catch(e) {gclh_error("Improve print page cache listing",e);}
    //     }

    // Set global user data and check if logged in.

    const waitingForUserData = (waitCount = 0) => {
        if (typeof headerSettings !== 'undefined' && headerSettings?.username) {
            dlc('Global user data headerSettings found');
            user_me = headerSettings.username ?? user_me;
            user_avatarUrl = headerSettings.avatarUrl ?? user_avatarUrl;
            user_locale = headerSettings.locale ?? user_locale;
            user_findCount = headerSettings.findCount ?? user_findCount;
            user_isBasic = headerSettings.isBasic ?? user_isBasic;
        }
        if (typeof chromeSettings !== 'undefined' && chromeSettings?.username) {
            dlc('Global user data chromeSettings found');
            user_me = chromeSettings.username ?? user_me;
            user_avatarUrl = chromeSettings.avatarUrl ?? user_avatarUrl;
            user_locale = chromeSettings.locale ?? user_locale;
            user_findCount = chromeSettings.findCount ?? user_findCount;
            user_isBasic = chromeSettings.isBasic ?? user_isBasic;
        }
        // Used on page: https://www.geocaching.com/plan/lists
        if (typeof _gcUser !== 'undefined' && _gcUser?.username) {
            dlc('Global user data _gcUser found');
            user_me = _gcUser.username ?? user_me;
            if (_gcUser.image?.imageUrl) user_avatarUrl = _gcUser.image.imageUrl.replace(/\{0\}/, 'avatar');
            user_locale = _gcUser.locale ?? user_locale;
            user_findCount = _gcUser.findCount ?? user_findCount;
            if (_gcUser.membershipLevel === 1) user_isBasic = true;
        }
        // Used on page: https://www.geocaching.com/live/geocache/GC40/log
        const nextDataText = $('#__NEXT_DATA__')?.[0]?.innerText;
        if (nextDataText) {
            try {
                const userdata = JSON.parse(nextDataText);
                const gcUser = userdata?.props?.pageProps?.gcUser;
                if (gcUser?.username) {
                    dlc('Global user data userdata.props.pageProps.gcUser found');
                    user_me = gcUser.username ?? user_me;
                    if (gcUser.image?.imageUrl) user_avatarUrl = gcUser.image.imageUrl.replace(/\{0\}/, 'avatar');
                    user_locale = gcUser.locale ?? user_locale;
                    user_findCount = gcUser.findCount ?? user_findCount;
                    if (gcUser.membershipLevel === 1) user_isBasic = true;
                }
            } catch (e) {
                logError("Determine user data for id '__NEXT_DATA__'", e);
            }
        }

        if ([user_me, user_avatarUrl, user_locale, user_findCount].every((v) => v !== false)) {
            dlc('All global user data found');
            dlc(`- username: ${user_me} / avatarUrl: ${user_avatarUrl}`);
            dlc(`- findCount: ${user_findCount} / locale: ${user_locale} / isBasic: ${user_isBasic}`);
            mainGC();
        } else if (waitCount < 200) {
            setTimeout(() => waitingForUserData(waitCount + 1), 50);
        } else {
            dlc('STOP not all global user data found');
            dlc(`- username: ${user_me} / avatarUrl: ${user_avatarUrl}`);
            dlc(`- findCount: ${user_findCount} / locale: ${user_locale} / isBasic: ${user_isBasic}`);
        }
    };

    dlc('START waitingForUserData');
    waitingForUserData();
};

const mainGC = () => {
    dlc('START mainGC');
}; // End of mainGC.
