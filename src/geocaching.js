import { appendCssStyle, dlc, injectPageScript, isPage, logError } from './utils.js';

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
    //         } catch(e) {ga_error("Hide Facebook",e);}
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
    //         } catch(e) {ga_error("Improve print page cache listing",e);}
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
    showThumbnails();
}; // End of mainGC.

// Is Basic Member in PMO Cache?
const isMemberInPmoCache = () => isPage('cache_listing') && !!document.querySelector('#premium-upgrade-widget');

// Show thumbnails.
const showThumbnails = () => {
    // TODO: use settings_show_thumbnails to enable/disable this function.
    // if (settings_show_thumbnails) {
    try {
        const placeToolTip = (element, stop) => {
            $('a.ga_thumb_img:hover span').position({
                my: 'center bottom',
                at: 'center top',
                of: 'a.ga_thumb_img:hover',
                collision: 'flipfit flipfit',
            });

            if (!stop) {
                $('a.ga_thumb_img:hover span img').on('load', () => placeToolTip(element, true));
            }
        };
        function buildThumb(link, href, title, showName, topSp) {
            const hrefLarge = /\/large\//.test(href) ? href : href.replace(/\/cache\//, '/cache/large/');
            link.classList.add('ga_thumb_img');
            link.href = hrefLarge.replace(/\/large\//, '/');
            link.onmouseover = placeToolTip;

            let html = `<img src="${hrefLarge.replace(/\/large\//, '/thumb/')}" title="${title}">`;
            if (showName) html += `<br>${title}`;

            const thumbLarge = hrefLarge.replace(/\/large\//, '/thumb/large/');

            html += `<span>#top#<img class="ga_large_img" src="${thumbLarge}" /><br>#bot#</span>`;
            // TODO: use settings_show_thumbnails to enable/disable caption on top
            // if (settings_imgcaption_on_top) html = html.replace('#top#', title).replace('#bot#', '');
            // else html = html.replace('#top#', '').replace('#bot#', title);
            html = html.replace('#top#', '').replace('#bot#', title);
            link.innerHTML = html;

            // TODO: Spolier 检测
            // if (topSp && settings_spoiler_strings != '' && title.match(regexp)) {
            //     var div = document.createElement('div');
            //     div.innerHTML = 'Spoiler warning';
            //     div.setAttribute(
            //         'style',
            //         'transform: rotate(-30grad); width: 130px; position: relative; top: ' +
            //             topSp +
            //             '; left: -5px; font-size: 11px; line-height: 0;'
            //     );
            //     links[i].childNodes[0].src = urlImages + 'ga_logo.png';
            //     links[i].childNodes[0].style.opacity = '0.05';
            //     if (showName) links[i].childNodes[3].remove();
            //     else links[i].childNodes[1].remove();
            //     links[i].parentNode.appendChild(div);
            // }
        }
        // var regexp = new RegExp('soplier', 'i');
        let css = '';

        // Cache Listing.
        if (isPage('cache_listing') && !isMemberInPmoCache()) {
            // Logs.
            if (true) {
                // if (settings_load_logs_with_gclh) {  // TODO: setting to enable/disable this function
                let newImTpl =
                    "<a class='tb_images lnk ga_thumb_img' onmouseover='placeToolTip;' rel='fb_images_${LogID}' href='https://img.geocaching.com/cache/log/${FileName}' title='<span class=&quot;LogImgTitle&quot;>${Name} &nbsp;</span><span class=&quot;LogImgLink&quot;> <a target=&quot;_blank&quot; href=&quot;/seek/log.aspx?LID=${LogID}&amp;IID=${ImageGuid}&quot;>View Log</a></span><br><span class=&quot;LogImgDescription&quot;>${Descr}</span>'>" +
                    "<img title='${Name}' alt='${Name}' src='https://img.geocaching.com/cache/log/thumb/${FileName}'/> " +
                    "<span title=''>#top#<img title='${Descr}' class='ga_large_img' src='https://img.geocaching.com/cache/log/thumb/large/${FileName}'><br>#bot#</span>" +
                    '</a>';
                // TODO: setting to enable/disable caption on top
                // if (settings_imgcaption_on_top) newImTpl = newImTpl.replace('#top#', '${Name}').replace('#bot#', '');
                // else newImTpl = newImTpl.replace('#top#', '').replace('#bot#', '${Name}');
                newImTpl = newImTpl.replace('#top#', '').replace('#bot#', '${Name}');
                const code = `
                    function ga_updateTmpl(waitCount) {
                    if (typeof $ !== 'undefined' && typeof $.template !== 'undefined') {
                        delete $.template['tmplCacheLogImages'];
                        $.template("tmplCacheLogImages", "${newImTpl}");
                    } else {
                        waitCount++;
                        if (waitCount <= 50) setTimeout(() => ga_updateTmpl(waitCount), 200);
                    }
                    }
                    ga_updateTmpl(0);
                    ${placeToolTip.toString()}
                `;
                injectPageScript(code, 'body');
            }
            // Listing.
            css += '.CachePageImages li { margin-bottom: 12px; background: unset; padding-left: 0px; }';
            const links = $('.CachePageImages').find('a[href*="img.geocaching.com/cache/"]');
            links.each((i, link) => buildThumb(link, link.href, link.innerHTML, true, '-70px'));
            // for (var i = 0; i < links.length; i++) {
            //     buildThumb(links[i].href, links[i].innerHTML, true, '-70px');
            // }

            //     // Galerien Public Profile, Cache, TB.
            // } else if (
            //     (is_page('publicProfile') && $('#ctl00_ContentBody_ProfilePanel1_lnkGallery.Active')[0]) ||
            //     document.location.href.match(/\.com\/(seek\/gallery\.aspx?|track\/gallery\.aspx?)/)
            // ) {
            //     var links = $('.Table.GalleryTable').find(
            //         'a[href*="img.geocaching.com/track/"], a[href*="img.geocaching.com/cache/"]'
            //     );
            //     for (var i = 0; i < links.length; i++) {
            //         buildThumb(
            //             links[i].href,
            //             links[i].nextElementSibling.innerHTML,
            //             false,
            //             document.location.href.match(/\.com\/seek\/gallery\.aspx?/) ? '-90px' : false
            //         );
            //     }

            //     // TB Listing.
            // } else if (document.location.href.match(/\.com\/track\/details\.aspx?/)) {
            //     css += 'a.ga_thumb_img img {margin-bottom: unset !important; margin-right: unset;}';
            //     var links = $('.imagelist, table.Table .log_images').find('a[href*="img.geocaching.com/track/"]');
            //     for (var i = 0; i < links.length; i++) {
            //         buildThumb(links[i].href, links[i].children[0].alt, links[i].href.match(/log/) ? false : true, false);
            //     }
        }
        // // Public Profile. Show bigger avatar image while hovering with the mouse.
        // if (
        //     is_page('publicProfile') &&
        //     settings_public_profile_avatar_show_thumbnail &&
        //     $('div.profile-image-wrapper')[0]
        // ) {
        //     var img = document.createElement('img');
        //     img.src = $('div.profile-image-wrapper')[0]
        //         .style.backgroundImage.replace(/url\(('|")/, '')
        //         .replace(/('|")\)/, '');
        //     img.setAttribute('style', 'margin-bottom: 0px; height: 94px; width: 94px;');
        //     var a = document.createElement('a');
        //     a.className = 'profile-image-wrapper';
        //     a.setAttribute(
        //         'style',
        //         'position: absolute; top: unset; left: unset; margin-top: -69px; margin-left: 80px; z-index: 1;'
        //     );
        //     a.appendChild(img);
        //     $('div.profile-image-wrapper')[0].parentNode.parentNode.insertBefore(
        //         a,
        //         $('div.profile-image-wrapper')[0].parentNode
        //     );
        //     $('div.profile-image-wrapper').remove();
        //     avatarThumbnail($('a.profile-image-wrapper')[0]);
        //     a.href = $('a.profile-image-wrapper .ga_large_img')[0].src;
        // }

        css += `
        a.ga_thumb_img:hover { white-space: unset; position: relative; }
        a.ga_thumb_img { overflow: visible !important; display: unset !important; max-width: none !important; }
        /* Limit anchor width to its intrinsic content (image + optional caption) inside flex column */
        .LogImagesTable a.ga_thumb_img { display: inline-block !important; width: auto !important; max-width: none !important; align-self: flex-start; }
        a.ga_thumb_img span { white-space: unset !important; visibility: hidden; position: absolute; top: -310px; left: 0px; padding: 2px; text-decoration: none; text-align: left; vertical-align: top; }
        a.ga_thumb_img:hover span { visibility: visible; z-index: 9999; border: 1px solid #8c9e65; background-color: #dfe1d2; text-decoration: none !important; }
        a.ga_thumb_img:hover img { margin-bottom: -4px; }
        a.ga_thumb_img img { margin-bottom: -4px; height: 75px; }
        .ga_large_img { height: unset !important; vertical-align: unset !important; margin-right: 0 !important; max-height: ${settings_hover_image_max_size}px; max-width: ${settings_hover_image_max_size}px; }
        .Clear.LogContent.markdown-output { overflow: visible !important; }
        .Clear.LogContent.markdown-output .LogImagesTable { overflow: visible !important; }
        `;
        appendCssStyle(css);
    } catch (e) {
        logError('Show Thumbnails', e);
    }
    // }
    // function avatarThumbnail(link) {
    //     var thumb = link.children[0];
    //     var img = document.createElement('img');
    //     img.src = thumb.src.replace(
    //         /img\.geocaching\.com\/user\/(avatar|display|square250)/,
    //         's3.amazonaws.com/gs-geo-images'
    //     );
    //     img.className = 'ga_large_img';
    //     img.setAttribute('style', 'display: unset;');
    //     var span = document.createElement('span');
    //     span.appendChild(img);
    //     link.className += ' ga_thumb_img';
    //     link.onmouseover = placeToolTip;
    //     link.appendChild(span);
    // }
    // Build avatar thumbnail without an explicit "load" is necessary if the mouse is just already above the small image which has to be transferred
    // to a big image.
    // function avatarThumbnailWithoutLoad(link) {
    //     var thumb = link.children[0];
    //     var img = document.createElement('img');
    //     img.src = thumb.src.replace(
    //         /img\.geocaching\.com\/user\/(avatar|display|square250)/,
    //         's3.amazonaws.com/gs-geo-images'
    //     );
    //     img.className = 'ga_large_img';
    //     img.setAttribute('style', 'display: unset;');
    //     var span = document.createElement('span');
    //     span.appendChild(img);
    //     link.className += ' ga_thumb_img';
    //     link.appendChild(span);
    //     link.addEventListener('mouseover', function (e) {
    //         placeToolTip(e, true);
    //     });
    // }
    // function showBiggerAvatarsLink() {
    //     addButtonOverLogs(
    //         showBiggerAvatars,
    //         'ga_show_bigger_avatars',
    //         true,
    //         'Show bigger avatars',
    //         'Bigger avatars',
    //         'Show bigger avatar images while hovering with the mouse'
    //     );
    // }
    // function showBiggerAvatars() {
    //     try {
    //         if ($('#ga_show_bigger_avatars.working')[0]) return;
    //         $('#ga_show_bigger_avatars').addClass('working');
    //         $('#ga_show_bigger_avatars input')[0].setAttribute('disabled', '');
    //         setTimeout(function () {
    //             var links = document.getElementsByClassName('logOwnerAvatar');
    //             for (var i = 0; i < links.length; i++) {
    //                 if (links[i].children[0] && links[i].children[0].children[0] && !links[i].children[0].children[1]) {
    //                     links[i].children[0].children[0].setAttribute('style', 'margin-bottom: 0px; height: 48px;');
    //                     avatarThumbnail(links[i].children[0]);
    //                 }
    //             }
    //             $('#ga_show_bigger_avatars').removeClass('working');
    //             $('#ga_show_bigger_avatars input')[0].removeAttribute('disabled');
    //         }, 100);
    //     } catch (e) {
    //         ga_error('showBiggerAvatars', e);
    //     }
    // }
    // function showBiggerAvatar() {
    //     try {
    //         var link = $(this)[0];
    //         if (link && link.children[0] && link.children[0].children[0] && !link.children[0].children[1]) {
    //             link.removeEventListener('mouseover', showBiggerAvatar);
    //             link.children[0].children[0].setAttribute('style', 'margin-bottom: 0px; height: 48px;');
    //             avatarThumbnailWithoutLoad(link.children[0]);
    //         }
    //     } catch (e) {
    //         ga_error('showBiggerAvatar', e);
    //     }
    // }
};
