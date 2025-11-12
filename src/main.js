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
}

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
}

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
    // t.global_open_popup_count = 0;
    // c.global_open_popups = new Array();
    // c.map_url = "https://www.geocaching.com/map/default.aspx";
    // c.new_map_url = "https://www.geocaching.com/play/map/";
    // c.remove_navi_play = getValue("remove_navi_play", false);
    // c.remove_navi_community = getValue("remove_navi_community", false);
    // c.remove_navi_shop = getValue("remove_navi_shop", false);
    // c.settings_submit_log_button = getValue("settings_submit_log_button", true);
    // c.settings_log_inline = getValue("settings_log_inline", false);
    // c.settings_log_inline_pmo4basic = getValue("settings_log_inline_pmo4basic", true);
    // c.settings_bookmarks_show = getValue("settings_bookmarks_show", true);
    // c.settings_change_header_layout = getValue("settings_change_header_layout", true);
    // c.settings_fixed_header_layout = getValue("settings_fixed_header_layout", false);
    // c.settings_remove_logo = getValue("settings_remove_logo", false);
    // c.settings_remove_message_in_header = getValue("settings_remove_message_in_header", false);
    // c.settings_bookmarks_on_top = getValue("settings_bookmarks_on_top", true);
    // c.settings_bookmarks_top_menu = getValue("settings_bookmarks_top_menu", "true");
    // c.settings_bookmarks_search = getValue("settings_bookmarks_search", "true");
    // c.settings_bookmarks_search_default = repApo(getValue("settings_bookmarks_search_default", ""));
    // c.settings_redirect_to_map = getValue("settings_redirect_to_map", false);
    // c.settings_new_width = getValue("settings_new_width", 1000);
    // c.settings_hide_facebook = getValue("settings_hide_facebook", false);
    // c.settings_hide_socialshare = getValue("settings_hide_socialshare", false);
    // c.settings_hide_disclaimer = getValue("settings_hide_disclaimer", true);
    // c.settings_hide_cache_notes = getValue("settings_hide_cache_notes", false);
    // c.settings_adapt_height_cache_notes = getValue("settings_adapt_height_cache_notes", true);
    // c.settings_hide_empty_cache_notes = getValue("settings_hide_empty_cache_notes", true);
    // c.settings_show_all_logs = getValue("settings_show_all_logs", true);
    // c.settings_show_all_logs_count = getValue("settings_show_all_logs_count", "30");
    // c.settings_decrypt_hint = getValue("settings_decrypt_hint", true);
    // c.settings_visitCount_geocheckerCom = getValue("settings_visitCount_geocheckerCom", true);
    // c.settings_show_bbcode = getValue("settings_show_bbcode", true);
    // c.settings_show_mail = getValue("settings_show_mail", true);
    // c.settings_font_size_menu = getValue("settings_font_size_menu", 16);
    // c.settings_font_size_submenu = getValue("settings_font_size_submenu", 15);
    // c.settings_distance_menu = getValue("settings_distance_menu", 16);
    // c.settings_distance_submenu = getValue("settings_distance_submenu", 8);
    // c.settings_font_color_menu_submenu = getValue("settings_font_color_menu_submenu", "93B516");
    // c.settings_font_color_menu = getValue("settings_font_color_menu", getValue("settings_font_color_menu_submenu", "93B516"));
    // c.settings_font_color_submenu = getValue("settings_font_color_submenu", getValue("settings_font_color_menu_submenu", "93B516"));
    // c.settings_menu_number_of_lines = getValue("settings_menu_number_of_lines", 1);
    // c.settings_menu_show_separator = getValue("settings_menu_show_separator", false);
    // c.settings_menu_float_right = getValue("settings_menu_float_right", false);
    // c.settings_gc_tour_is_working = getValue("settings_gc_tour_is_working", false);
    // c.settings_show_smaller_gc_link = getValue("settings_show_smaller_gc_link", true);
    // c.settings_show_message = getValue("settings_show_message", true);
    // c.settings_show_remove_ignoring_link = getValue("settings_show_remove_ignoring_link", true);
    // c.settings_use_one_click_ignoring = getValue("settings_use_one_click_ignoring", true);
    // c.settings_show_common_lists_in_zebra = getValue("settings_show_common_lists_in_zebra", true);
    // c.settings_show_common_lists_color_user = getValue("settings_show_common_lists_color_user", true);
    // c.settings_show_cache_listings_in_zebra = getValue("settings_show_cache_listings_in_zebra", false);
    // c.settings_show_cache_listings_color_user = getValue("settings_show_cache_listings_color_user", true);
    // c.settings_show_cache_listings_color_owner = getValue("settings_show_cache_listings_color_owner", true);
    // c.settings_show_cache_listings_color_reviewer = getValue("settings_show_cache_listings_color_reviewer", true);
    // c.settings_show_cache_listings_color_vip = getValue("settings_show_cache_listings_color_vip", true);
    // c.settings_show_tb_listings_in_zebra = getValue("settings_show_tb_listings_in_zebra", true);
    // c.settings_show_tb_listings_color_user = getValue("settings_show_tb_listings_color_user", true);
    // c.settings_show_tb_listings_color_owner = getValue("settings_show_tb_listings_color_owner", true);
    // c.settings_show_tb_listings_color_reviewer = getValue("settings_show_tb_listings_color_reviewer", true);
    // c.settings_show_tb_listings_color_vip = getValue("settings_show_tb_listings_color_vip", true);
    // c.settings_lines_color_zebra = getValue("settings_lines_color_zebra", "EBECED");
    // c.settings_lines_color_user = getValue("settings_lines_color_user", "C2E0C3");
    // c.settings_lines_color_owner = getValue("settings_lines_color_owner", "E0E0C3");
    // c.settings_lines_color_reviewer = getValue("settings_lines_color_reviewer", "EAD0C3");
    // c.settings_lines_color_vip = getValue("settings_lines_color_vip", "F0F0A0");
    // c.settings_show_mail_in_allmyvips = getValue("settings_show_mail_in_allmyvips", true);
    // c.settings_show_mail_in_viplist = getValue("settings_show_mail_in_viplist", true);
    // c.settings_process_vup = getValue("settings_process_vup", true);
    // c.settings_show_vup_friends = getValue("settings_show_vup_friends", false);
    // c.settings_vup_hide_avatar = getValue("settings_vup_hide_avatar", false);
    // c.settings_vup_hide_log = getValue("settings_vup_hide_log", false);
    // c.settings_f2_save_gclh_config = getValue("settings_f2_save_gclh_config", true);
    // c.settings_esc_close_gclh_config = getValue("settings_esc_close_gclh_config", true);
    // c.settings_f4_call_gclh_config = getValue("settings_f4_call_gclh_config", true);
    // c.settings_call_config_via_sriptmanager = getValue("settings_call_config_via_sriptmanager", true);
    // c.settings_f10_call_gclh_sync = getValue("settings_f10_call_gclh_sync", true);
    // c.settings_call_sync_via_sriptmanager = getValue("settings_call_sync_via_sriptmanager", true);
    // c.settings_show_sums_in_bookmark_lists = getValue("settings_show_sums_in_bookmark_lists", true);
    // c.settings_show_sums_in_watchlist = getValue("settings_show_sums_in_watchlist", true);
    // c.settings_show_save_message = getValue("settings_show_save_message", true);
    // c.settings_map_overview_build = getValue("settings_map_overview_build", true);
    // c.settings_map_overview_zoom = getValue("settings_map_overview_zoom", 11);
    // c.settings_map_overview_layer = getValue("settings_map_overview_layer", "Geocaching");
    // c.settings_logit_for_basic_in_pmo = getValue("settings_logit_for_basic_in_pmo", true);
    // c.settings_log_statistic = getValue("settings_log_statistic", true);
    // c.settings_log_statistic_percentage = getValue("settings_log_statistic_percentage", true);
    // c.settings_log_statistic_reload = getValue("settings_log_statistic_reload", 8);
    // c.settings_count_own_matrix = getValue("settings_count_own_matrix", true);
    // c.settings_count_foreign_matrix = getValue("settings_count_foreign_matrix", true);
    // c.settings_count_own_matrix_show_next = getValue("settings_count_own_matrix_show_next", true);
    // c.settings_count_own_matrix_show_count_next = getValue("settings_count_own_matrix_show_count_next", 2);
    // c.settings_count_own_matrix_show_color_next = getValue("settings_count_own_matrix_show_color_next", "5151FB");
    // c.settings_count_own_matrix_links_radius = getValue("settings_count_own_matrix_links_radius", 25);
    // c.settings_count_own_matrix_links = getValue("settings_count_own_matrix_links", "map");
    // c.settings_hide_left_sidebar_on_google_maps = getValue("settings_hide_left_sidebar_on_google_maps", true);
    // c.settings_add_link_gc_map_on_google_maps = getValue("settings_add_link_gc_map_on_google_maps", true);
    // c.settings_switch_from_google_maps_to_gc_map_in_same_tab = getValue("settings_switch_from_google_maps_to_gc_map_in_same_tab", false);
    // c.settings_add_link_new_gc_map_on_google_maps = getValue("settings_add_link_new_gc_map_on_google_maps", true);
    // c.settings_switch_from_google_maps_to_new_gc_map_in_same_tab = getValue("settings_switch_from_google_maps_to_new_gc_map_in_same_tab", false);
    // c.settings_add_link_google_maps_on_gc_map = getValue("settings_add_link_google_maps_on_gc_map", true);
    // c.settings_switch_to_google_maps_in_same_tab = getValue("settings_switch_to_google_maps_in_same_tab", false);
    // c.settings_add_links_google_maps_on_google_search = getValue("settings_add_links_google_maps_on_google_search", false);
    // c.settings_add_link_gc_map_on_osm = getValue("settings_add_link_gc_map_on_osm", true);
    // c.settings_switch_from_osm_to_gc_map_in_same_tab = getValue("settings_switch_from_osm_to_gc_map_in_same_tab", false);
    // c.settings_add_link_new_gc_map_on_osm = getValue("settings_add_link_new_gc_map_on_osm", true);
    // c.settings_switch_from_osm_to_new_gc_map_in_same_tab = getValue("settings_switch_from_osm_to_new_gc_map_in_same_tab", false);
    // c.settings_add_link_osm_on_gc_map = getValue("settings_add_link_osm_on_gc_map", true);
    // c.settings_switch_to_osm_in_same_tab = getValue("settings_switch_to_osm_in_same_tab", false);
    // c.settings_add_link_flopps_on_gc_map = getValue("settings_add_link_flopps_on_gc_map", true);
    // c.settings_switch_to_flopps_in_same_tab = getValue("settings_switch_to_flopps_in_same_tab", false);
    // c.settings_add_link_geohack_on_gc_map = getValue("settings_add_link_geohack_on_gc_map", true);
    // c.settings_switch_to_geohack_in_same_tab = getValue("settings_switch_to_geohack_in_same_tab", false);
    // c.settings_add_link_komoot_on_gc_map = getValue("settings_add_link_komoot_on_gc_map", true);
    // c.settings_switch_to_komoot_in_same_tab = getValue("settings_switch_to_komoot_in_same_tab", false);
    // c.settings_add_link_wmthiking_on_gc_map = getValue("settings_add_link_wmthiking_on_gc_map", true);
    // c.settings_switch_to_wmthiking_in_same_tab = getValue("settings_switch_to_wmthiking_in_same_tab", false);
    // c.settings_add_link_wmtcycling_on_gc_map = getValue("settings_add_link_wmtcycling_on_gc_map", true);
    // c.settings_switch_to_wmtcycling_in_same_tab = getValue("settings_switch_to_wmtcycling_in_same_tab", false);
    // c.settings_add_link_wmtmtb_on_gc_map = getValue("settings_add_link_wmtmtb_on_gc_map", true);
    // c.settings_switch_to_wmtmtb_in_same_tab = getValue("settings_switch_to_wmtmtb_in_same_tab", false);
    // c.settings_sort_default_bookmarks = getValue("settings_sort_default_bookmarks", true);
    // c.settings_make_vip_lists_hideable = getValue("settings_make_vip_lists_hideable", true);
    // c.settings_show_latest_logs_symbols = getValue("settings_show_latest_logs_symbols", true);
    // c.settings_show_latest_logs_symbols_count = getValue("settings_show_latest_logs_symbols_count", 10);
    // c.settings_set_default_langu = getValue("settings_set_default_langu", false);
    // c.settings_default_langu = getValue("settings_default_langu", "English");
    // c.settings_hide_colored_versions = getValue("settings_hide_colored_versions", false);
    // c.settings_make_config_main_areas_hideable = getValue("settings_make_config_main_areas_hideable", true);
    // c.settings_faster_profile_trackables = getValue("settings_faster_profile_trackables", false);
    // c.settings_show_eventday = getValue("settings_show_eventday", true);
    // c.settings_show_eventtime_with_24_hours = getValue("settings_show_eventtime_with_24_hours", false);
    // c.settings_show_eventinfo_in_desc = getValue("settings_show_eventinfo_in_desc", true);
    // c.settings_show_eventinfo_in_desc_bold = getValue("settings_show_eventinfo_in_desc_bold", true);
    // c.settings_show_google_maps = getValue("settings_show_google_maps", true);
    // c.settings_show_log_it = getValue("settings_show_log_it", true);
    // c.settings_show_nearestuser_profil_link = getValue("settings_show_nearestuser_profil_link", true);
    // c.settings_show_homezone = getValue("settings_show_homezone", true);
    // c.settings_homezone_radius = getValue("settings_homezone_radius", "10");
    // c.settings_homezone_color = getValue("settings_homezone_color", "#0000FF");
    // c.settings_homezone_opacity = getValue("settings_homezone_opacity", 10);
    // c.settings_multi_homezone = JSON.parse(getValue("settings_multi_homezone", "{}"));
    // c.settings_show_hillshadow = getValue("settings_show_hillshadow", false);
    // c.settings_map_layers = getValue("settings_map_layers", "").split("###");
    // c.settings_default_logtype_control = getValue("settings_default_logtype_control", true);
    // c.settings_default_logtype = getValue("settings_default_logtype", "-1");
    // c.settings_default_logtype_event = getValue("settings_default_logtype_event", c.settings_default_logtype);
    // c.settings_default_logtype_owner = getValue("settings_default_logtype_owner", c.settings_default_logtype);
    // c.settings_default_tb_logtype = getValue("settings_default_tb_logtype", "-1");
    // c.settings_bookmarks_list = JSON.parse(getValue("settings_bookmarks_list", JSON.stringify(c.bookmarks_def)).replace(/, (?=,)/g, ",null"));
    // if (c.settings_bookmarks_list.length == 0) c.settings_bookmarks_list = c.bookmarks_def;
    // c.settings_sync_last = new Date(getValue("settings_sync_last", "Thu Jan 01 1970 01:00:00 GMT+0100 (Mitteleuropäische Zeit)"));
    // c.settings_sync_hash = getValue("settings_sync_hash", "");
    // c.settings_sync_time = getValue("settings_sync_time", 36000000);  // 10 Stunden
    // c.settings_sync_autoImport = getValue("settings_sync_autoImport", false);
    // c.settings_hide_advert_link = getValue('settings_hide_advert_link', true);
    // c.settings_hide_spoilerwarning = getValue('settings_hide_spoilerwarning', true);
    // c.settings_hide_hint = getValue('settings_hide_hint', true);
    // c.settings_strike_archived = getValue('settings_strike_archived', true);
    // c.settings_highlight_usercoords = getValue('settings_highlight_usercoords', true);
    // c.settings_highlight_usercoords_bb = getValue('settings_highlight_usercoords_bb', false);
    // c.settings_highlight_usercoords_it = getValue('settings_highlight_usercoords_it', true);
    // c.settings_map_hide_found = getValue('settings_map_hide_found', true);
    // c.settings_map_hide_hidden = getValue('settings_map_hide_hidden', true);
    // c.settings_map_hide_dnfs = getValue('settings_map_hide_dnfs', true);
    // c.settings_map_hide_2 = getValue('settings_map_hide_2', false);
    // c.settings_map_hide_9 = getValue('settings_map_hide_9', false);
    // c.settings_map_hide_5 = getValue('settings_map_hide_5', false);
    // c.settings_map_hide_3 = getValue('settings_map_hide_3', false);
    // c.settings_map_hide_6 = getValue('settings_map_hide_6', false);
    // c.settings_map_hide_453 = getValue('settings_map_hide_453', false);
    // c.settings_map_hide_7005 = getValue('settings_map_hide_7005', false);
    // c.settings_map_hide_13 = getValue('settings_map_hide_13', false);
    // c.settings_map_hide_1304 = getValue('settings_map_hide_1304', false);
    // c.settings_map_hide_4 = getValue('settings_map_hide_4', false);
    // c.settings_map_hide_11 = getValue('settings_map_hide_11', false);
    // c.settings_map_hide_137 = getValue('settings_map_hide_137', false);
    // c.settings_map_hide_8 = getValue('settings_map_hide_8', false);
    // c.settings_map_hide_1858 = getValue('settings_map_hide_1858', false);
    // c.settings_show_fav_percentage = getValue('settings_show_fav_percentage', true);
    // c.settings_show_vip_list = getValue('settings_show_vip_list', true);
    // c.settings_show_owner_vip_list = getValue('settings_show_owner_vip_list', true);
    // c.settings_show_thumbnails = getValue("settings_show_thumbnails", true);
    // c.settings_imgcaption_on_top = getValue("settings_imgcaption_on_top", false);
    // c.settings_hide_avatar = getValue("settings_hide_avatar", false);
    // c.settings_link_big_listing = getValue("settings_link_big_listing", true);
    // c.settings_show_big_gallery = getValue("settings_show_big_gallery", false);
    // c.settings_automatic_friend_reset = getValue("settings_automatic_friend_reset", false);
    // c.settings_show_long_vip = getValue("settings_show_long_vip", false);
    // c.settings_load_logs_with_gclh = getValue("settings_load_logs_with_gclh", true);
    // c.settings_map_add_layer = getValue("settings_map_add_layer", true);
    // c.settings_map_default_layer = getValue("settings_map_default_layer", "OpenStreetMap Default");
    // c.settings_hide_map_header = getValue("settings_hide_map_header", false);
    // c.settings_spoiler_strings = repApo(getValue("settings_spoiler_strings", "spoiler|hinweis"));
    // c.settings_replace_log_by_last_log = getValue("settings_replace_log_by_last_log", false);
    // c.settings_hide_top_button = getValue("settings_hide_top_button", false);
    // c.settings_show_real_owner = getValue("settings_show_real_owner", false);
    // c.settings_hide_archived_in_owned = getValue("settings_hide_archived_in_owned", false);
    // c.settings_show_button_for_hide_archived = getValue("settings_show_button_for_hide_archived", true);
    // c.settings_hide_visits_in_profile = getValue("settings_hide_visits_in_profile", false);
    // c.settings_add_log_templates = getValue("settings_add_log_templates", true);
    // c.settings_add_cache_log_signature_as_log_template = getValue("settings_add_cache_log_signature_as_log_template", false);
    // c.settings_add_tb_log_signature_as_log_template = getValue("settings_add_tb_log_signature_as_log_template", false);
    // c.settings_add_cache_log_signature = getValue("settings_add_cache_log_signature", true);
    // c.settings_log_signature_on_fieldnotes = getValue("settings_log_signature_on_fieldnotes", true);
    // c.settings_add_tb_log_signature = getValue("settings_add_tb_log_signature", true);
    // c.settings_map_hide_sidebar = getValue("settings_map_hide_sidebar", true);
    // c.settings_hover_image_max_size = getValue("settings_hover_image_max_size", 600);
    // c.settings_vip_show_nofound = getValue("settings_vip_show_nofound", true);
    // c.settings_use_gclh_layercontrol = getValue("settings_use_gclh_layercontrol", true);
    // c.settings_use_gclh_layercontrol_on_browse_map = getValue("settings_use_gclh_layercontrol_on_browse_map", true);
    // c.settings_use_gclh_layercontrol_on_search_map = getValue("settings_use_gclh_layercontrol_on_search_map", true);
    // c.settings_fixed_pq_header = getValue("settings_fixed_pq_header", true);
    // c.settings_friendlist_summary = getValue("settings_friendlist_summary", true);
    // c.settings_friendlist_summary_viponly = getValue("settings_friendlist_summary_viponly", false);
    // c.settings_search_data = JSON.parse(getValue("settings_search_data", "[]"));
    // c.settings_search_enable_user_defined = getValue("settings_search_enable_user_defined",true);
    // c.settings_pq_warning = getValue("settings_pq_warning",true);
    // c.settings_pq_set_cachestotal = getValue("settings_pq_set_cachestotal",true);
    // c.settings_pq_cachestotal = getValue("settings_pq_cachestotal",1000);
    // c.settings_pq_option_ihaventfound = getValue("settings_pq_option_ihaventfound",true);
    // c.settings_pq_option_idontown = getValue("settings_pq_option_idontown",true);
    // c.settings_pq_option_ignorelist = getValue("settings_pq_option_ignorelist",true);
    // c.settings_pq_option_isenabled = getValue("settings_pq_option_isenabled",true);
    // c.settings_pq_option_filename = getValue("settings_pq_option_filename",true);
    // c.settings_pq_set_terrain = getValue("settings_pq_set_terrain",true);
    // c.settings_pq_set_difficulty = getValue("settings_pq_set_difficulty",true);
    // c.settings_pq_difficulty = getValue("settings_pq_difficulty",">=");
    // c.settings_pq_difficulty_score = getValue("settings_pq_difficulty_score","1");
    // c.settings_pq_terrain = getValue("settings_pq_terrain",">=");
    // c.settings_pq_terrain_score = getValue("settings_pq_terrain_score","1");
    // c.settings_pq_automatically_day = getValue("settings_pq_automatically_day",false);
    // c.settings_pq_previewmap = getValue("settings_pq_previewmap",true);
    // c.settings_pq_previewmap_layer = getValue("settings_pq_previewmap_layer","Geocaching");
    // c.settings_mail_icon_new_win = getValue("settings_mail_icon_new_win",false);
    // c.settings_message_icon_new_win = getValue("settings_message_icon_new_win",false);
    // c.settings_hide_cache_approvals = getValue("settings_hide_cache_approvals", true);
    // c.settings_driving_direction_link = getValue("settings_driving_direction_link",true);
    // c.settings_driving_direction_parking_area = getValue("settings_driving_direction_parking_area",false);
    // c.settings_show_elevation_of_waypoints = getValue("settings_show_elevation_of_waypoints", true);
    // c.settings_primary_elevation_service = getValue("settings_primary_elevation_service", 3);
    // c.settings_secondary_elevation_service = getValue("settings_secondary_elevation_service", 2);
    // c.settings_distance_units = getValue("settings_distance_units", "");
    // c.settings_img_warning = getValue("settings_img_warning", false);
    // c.settings_remove_banner = getValue("settings_remove_banner", false);
    // c.settings_remove_banner_text_ids = JSON.parse(getValue("settings_remove_banner_text_ids", "[]"));
    // c.settings_compact_layout_bm_lists = getValue("settings_compact_layout_bm_lists", true);
    // c.settings_compact_layout_pqs = getValue("settings_compact_layout_pqs", true);
    // c.settings_compact_layout_list_of_pqs = getValue("settings_compact_layout_list_of_pqs", true);
    // c.settings_compact_layout_nearest = getValue("settings_compact_layout_nearest", true);
    // c.settings_compact_layout_recviewed = getValue("settings_compact_layout_recviewed", true);
    // c.settings_map_links_statistic = getValue("settings_map_links_statistic", true);
    // c.settings_map_statistic_set_name_in_map = getValue("settings_map_statistic_set_name_in_map", true);
    // c.settings_map_percentage_statistic = getValue("settings_map_percentage_statistic", true);
    // c.settings_improve_add_to_list_height = getValue("settings_improve_add_to_list_height", 205);
    // c.settings_improve_add_to_list = getValue("settings_improve_add_to_list", true);
    // c.settings_show_individual_links = getValue("settings_show_individual_links", true);
    // c.settings_individual_links = JSON.parse(getValue("settings_individual_links", "{}"));
    // c.settings_show_flopps_link = getValue("settings_show_flopps_link", true);
    // c.settings_show_brouter_link = getValue("settings_show_brouter_link", true);
    // c.settings_show_gpsvisualizer_link = getValue("settings_show_gpsvisualizer_link", true);
    // c.settings_show_gpsvisualizer_gcsymbols = getValue("settings_show_gpsvisualizer_gcsymbols", true);
    // c.settings_show_gpsvisualizer_typedesc = getValue("settings_show_gpsvisualizer_typedesc", true);
    // c.settings_show_openrouteservice_link = getValue("settings_show_openrouteservice_link", true);
    // c.settings_show_openrouteservice_home = getValue("settings_show_openrouteservice_home", false);
    // c.settings_show_openrouteservice_medium = getValue("settings_show_openrouteservice_medium", "2b");
    // c.settings_show_copydata_menu = getValue("settings_show_copydata_menu", true);
    // c.settings_show_default_links = getValue("settings_show_default_links", true);
    // c.settings_bm_changed_and_go = getValue("settings_bm_changed_and_go", true);
    // c.settings_bml_changed_and_go = getValue("settings_bml_changed_and_go", true);
    // c.settings_show_tb_inv = getValue("settings_show_tb_inv", true);
    // c.settings_but_search_map = getValue("settings_but_search_map", true);
    // c.settings_but_search_map_new_tab = getValue("settings_but_search_map_new_tab", false);
    // c.settings_but_searchmap = getValue("settings_but_searchmap", false);
    // c.settings_but_searchmap_new_tab = getValue("settings_but_searchmap_new_tab", false);
    // c.settings_show_pseudo_as_owner = getValue("settings_show_pseudo_as_owner", true);
    // c.settings_fav_proz_nearest = getValue("settings_fav_proz_nearest", true);
    // c.settings_open_tabs_nearest = getValue("settings_open_tabs_nearest", true);
    // c.settings_fav_proz_pqs = getValue("settings_fav_proz_pqs", true);
    // c.settings_open_tabs_pqs = getValue("settings_open_tabs_pqs", true);
    // c.settings_fav_proz_recviewed = getValue("settings_fav_proz_recviewed", true);
    // c.settings_show_all_logs_but = getValue("settings_show_all_logs_but", true);
    // c.settings_show_log_counter_but = getValue("settings_show_log_counter_but", true);
    // c.settings_show_log_counter = getValue("settings_show_log_counter", false);
    // c.settings_show_bigger_avatars_but = getValue("settings_show_bigger_avatars_but", true);
    // c.settings_hide_feedback_icon = getValue("settings_hide_feedback_icon", false);
    // c.settings_compact_layout_new_dashboard = getValue("settings_compact_layout_new_dashboard", true);
    // c.settings_row_hide_new_dashboard = getValue("settings_row_hide_new_dashboard", false);
    // c.settings_show_draft_indicator = getValue("settings_show_draft_indicator", true);
    // c.settings_show_enhanced_map_popup = getValue("settings_show_enhanced_map_popup", true);
    // c.settings_show_enhanced_map_coords = getValue("settings_show_enhanced_map_coords", true);
    // c.settings_show_latest_logs_symbols_count_map = getValue("settings_show_latest_logs_symbols_count_map", 16);
    // c.settings_modify_new_drafts_page = getValue("settings_modify_new_drafts_page", true);
    // c.settings_gclherror_alert = getValue("settings_gclherror_alert", false);
    // c.settings_embedded_smartlink_ignorelist = getValue("settings_embedded_smartlink_ignorelist", true);
    // c.settings_both_tabs_list_of_pqs_one_page = getValue("settings_both_tabs_list_of_pqs_one_page", false);
    // c.settings_past_events_on_bm = getValue("settings_past_events_on_bm", true);
    // c.settings_show_log_totals = getValue("settings_show_log_totals", true);
    // c.settings_show_reviewer_as_vip = getValue("settings_show_reviewer_as_vip", true);
    // c.settings_show_lackey_as_vip = getValue("settings_show_lackey_as_vip", false);
    // c.settings_hide_found_count = getValue("settings_hide_found_count", false);
    // c.settings_show_compact_logbook_but = getValue("settings_show_compact_logbook_but", true);
    // c.settings_log_status_icon_visible = getValue("settings_log_status_icon_visible", true);
    // c.settings_cache_type_icon_visible = getValue("settings_cache_type_icon_visible", true);
    // c.settings_showUnpublishedHides = getValue("settings_showUnpublishedHides", true);
    // c.settings_set_showUnpublishedHides_sort = getValue("settings_set_showUnpublishedHides_sort", true);
    // c.settings_showUnpublishedHides_sort = getValue("settings_showUnpublishedHides_sort", "abc");
    // c.settings_lists_compact_layout = getValue("settings_lists_compact_layout", false);
    // c.settings_lists_disabled = getValue("settings_lists_disabled", false);
    // c.settings_lists_disabled_color = getValue("settings_lists_disabled_color", "4A4A4A");
    // c.settings_lists_disabled_strikethrough = getValue("settings_lists_disabled_strikethrough", true);
    // c.settings_lists_archived = getValue("settings_lists_archived", false);
    // c.settings_lists_archived_color = getValue("settings_lists_archived_color", "8C0B0B");
    // c.settings_lists_archived_strikethrough = getValue("settings_lists_archived_strikethrough", true);
    // c.settings_lists_icons_visible = getValue("settings_lists_icons_visible", false);
    // c.settings_lists_log_status_icons_visible = getValue("settings_lists_log_status_icons_visible", true);
    // c.settings_lists_cache_type_icons_visible = getValue("settings_lists_cache_type_icons_visible", true);
    // c.settings_lists_premium_column = getValue("settings_lists_premium_column", false);
    // c.settings_lists_found_column_bml = getValue("settings_lists_found_column_bml", false);
    // c.settings_lists_show_log_it = getValue("settings_lists_show_log_it", false);
    // c.settings_lists_back_to_top = getValue("settings_lists_back_to_top", false);
    // c.settings_searchmap_autoupdate_after_dragging = getValue("settings_searchmap_autoupdate_after_dragging", true);
    // c.settings_improve_character_counter = getValue("settings_improve_character_counter", true);
    // c.settings_searchmap_compact_layout = getValue("settings_searchmap_compact_layout", true);
    // c.settings_searchmap_disabled = getValue("settings_searchmap_disabled", false);
    // c.settings_searchmap_disabled_strikethrough = getValue("settings_searchmap_disabled_strikethrough", true);
    // c.settings_searchmap_disabled_color = getValue("settings_searchmap_disabled_color", '4A4A4A');
    // c.settings_searchmap_show_hint = getValue("settings_searchmap_show_hint", false);
    // c.settings_show_copydata_own_stuff_show = getValue("settings_show_copydata_own_stuff_show", false);
    // c.settings_show_copydata_own_stuff_name = getValue("settings_show_copydata_own_stuff_name", 'Photo file name');
    // c.settings_show_copydata_own_stuff_value = getValue("settings_show_copydata_own_stuff_value", '#yyyy#.#mm#.#dd# - #GCName# - #GCCode# - 01');
    // c.settings_show_copydata_own_stuff = JSON.parse(getValue("settings_show_copydata_own_stuff", "{}"));
    // c.settings_relocate_other_map_buttons = getValue("settings_relocate_other_map_buttons", true);
    // c.settings_show_radius_on_flopps = getValue("settings_show_radius_on_flopps", true);
    // c.settings_show_edit_links_for_logs = getValue("settings_show_edit_links_for_logs", true);
    // c.settings_show_copydata_plus = getValue("settings_show_copydata_plus", false);
    // c.settings_show_copydata_separator = getValue("settings_show_copydata_separator", "\n");
    // c.settings_lists_show_dd = getValue("settings_lists_show_dd", true);
    // c.settings_lists_hide_desc = getValue("settings_lists_hide_desc", true);
    // c.settings_lists_upload_file = getValue("settings_lists_upload_file", true);
    // c.settings_lists_open_tabs = getValue("settings_lists_open_tabs", true);
    // c.settings_profile_old_links = getValue("settings_profile_old_links", false);
    // c.settings_listing_old_links = getValue("settings_listing_old_links", false);
    // c.settings_searchmap_show_btn_save_as_pq = getValue("settings_searchmap_show_btn_save_as_pq", true);
    // c.settings_map_overview_browse_map_icon = getValue("settings_map_overview_browse_map_icon", true);
    // c.settings_map_overview_browse_map_icon_new_tab = getValue("settings_map_overview_browse_map_icon_new_tab", false);
    // c.settings_map_overview_search_map_icon = getValue("settings_map_overview_search_map_icon", true);
    // c.settings_map_overview_search_map_icon_new_tab = getValue("settings_map_overview_search_map_icon_new_tab", false);
    // c.settings_cache_notes_min_size = getValue("settings_cache_notes_min_size", 54);
    // c.settings_show_link_to_browse_map = getValue("settings_show_link_to_browse_map", false);
    // c.settings_show_hide_upvotes_but = getValue("settings_show_hide_upvotes_but", false);
    // c.settings_hide_upvotes = getValue("settings_hide_upvotes", false);
    // c.settings_smaller_upvotes_icons = getValue("settings_smaller_upvotes_icons", true);
    // c.settings_no_wiggle_upvotes_click = getValue("settings_no_wiggle_upvotes_click", true);
    // c.settings_show_country_in_place = getValue("settings_show_country_in_place", true);
    // c.settings_color_bg = getValue("settings_color_bg", "D8CD9D");
    // c.settings_color_if = getValue("settings_color_if", "D8CD9D");
    // c.settings_color_ht = getValue("settings_color_ht", "D8CD9D");
    // c.settings_color_bh = getValue("settings_color_bh", "D8CD9D");
    // c.settings_color_bu = getValue("settings_color_bu", "D8CD9D)");
    // c.settings_color_bo = getValue("settings_color_bo", "778555");
    // c.settings_color_nv = getValue("settings_color_nv", "F0DFC6");
    // c.settings_color_navi_search = getValue("settings_color_navi_search", false);
    // c.settings_map_show_btn_hide_header = getValue("settings_map_show_btn_hide_header", true);
    // c.settings_searchmap_show_cache_display_options = getValue("settings_searchmap_show_cache_display_options", true);
    // c.settings_save_as_pq_set_defaults = getValue("settings_save_as_pq_set_defaults", false);
    // c.settings_save_as_pq_set_all = getValue("settings_save_as_pq_set_all", true);
    // c.settings_compact_layout_cod = getValue("settings_compact_layout_cod", false);
    // c.settings_show_button_fav_proz_cod = getValue("settings_show_button_fav_proz_cod", true);
    // c.settings_show_compact_certitude_information = getValue("settings_show_compact_certitude_information", true);
    // c.settings_anonymous_on_certitude = getValue("settings_anonymous_on_certitude", false);
    // c.settings_change_font_cache_notes = getValue("settings_change_font_cache_notes", false);
    // c.settings_larger_map_as_browse_map = getValue("settings_larger_map_as_browse_map", false);
    // c.settings_fav_proz_cod = getValue("settings_fav_proz_cod", true);
    // c.settings_prevent_watchclick_popup = getValue("settings_prevent_watchclick_popup", false);
    // c.settings_upgrade_button_header_remove = getValue("settings_upgrade_button_header_remove", false);
    // c.settings_unsaved_log_message = getValue("settings_unsaved_log_message", true);
    // c.settings_sort_map_layers = getValue("settings_sort_map_layers", false);
    // c.settings_add_overlay_wmthiking = getValue("settings_add_overlay_wmthiking", true);
    // c.settings_add_overlay_wmtcycling = getValue("settings_add_overlay_wmtcycling", true);
    // c.settings_add_overlay_wmtmtb = getValue("settings_add_overlay_wmtmtb", true);
    // c.settings_add_search_in_logs_func = getValue("settings_add_search_in_logs_func", true);
    // c.settings_show_add_cache_info_in_log_page = getValue("settings_show_add_cache_info_in_log_page", true);
    // c.settings_pq_splitter_pqname = getValue("settings_pq_splitter_pqname", 'PQ_Splitter_');
    // c.settings_pq_splitter_how_often = getValue("settings_pq_splitter_how_often", 2);
    // c.settings_pq_splitter_not_ignored = getValue("settings_pq_splitter_not_ignored", false);
    // c.settings_pq_splitter_is_enabled = getValue("settings_pq_splitter_is_enabled", false);
    // c.settings_pq_splitter_email = getValue("settings_pq_splitter_email", 1);
    // c.settings_pq_splitter_include_pq_name = getValue("settings_pq_splitter_include_pq_name", false);
    // c.settings_show_create_pq_from_pq_splitter = getValue("settings_show_create_pq_from_pq_splitter", true);
    // c.settings_drafts_cache_link = getValue("settings_drafts_cache_link", true);
    // c.settings_drafts_cache_link_new_tab = getValue("settings_drafts_cache_link_new_tab", false);
    // c.settings_drafts_color_visited_link = getValue("settings_drafts_color_visited_link", true);
    // c.settings_drafts_old_log_form = getValue("settings_drafts_old_log_form", false);
    // c.settings_drafts_log_icons = getValue("settings_drafts_log_icons", true);
    // c.settings_drafts_go_automatic_back = getValue("settings_drafts_go_automatic_back", false);
    // c.settings_drafts_after_new_logging_view_log = getValue("settings_drafts_after_new_logging_view_log", false);
    // c.settings_drafts_after_new_logging_view_log_button = getValue("settings_drafts_after_new_logging_view_log_button", true);
    // c.settings_after_new_logging_view_log = getValue("settings_after_new_logging_view_log", false);
    // c.settings_listing_hide_external_link_warning = getValue("settings_listing_hide_external_link_warning", false);
    // c.settings_listing_links_new_tab = getValue("settings_listing_links_new_tab", false);
    // c.settings_public_profile_avatar_show_thumbnail = getValue("settings_public_profile_avatar_show_thumbnail", true);
    // c.settings_drafts_download_show_button = getValue("settings_drafts_download_show_button", true);
    // c.settings_drafts_download_change_logdate = getValue("settings_drafts_download_change_logdate", false);
    // c.settings_dashboard_show_logs_in_markdown = getValue("settings_dashboard_show_logs_in_markdown", true);
    // c.settings_public_profile_smaller_privacy_btn = getValue("settings_public_profile_smaller_privacy_btn", false);
    // c.settings_searchmap_improve_add_to_list = getValue("settings_searchmap_improve_add_to_list", true);
    // c.settings_searchmap_improve_add_to_list_height = getValue("settings_searchmap_improve_add_to_list_height", 130);
    // c.settings_improve_notifications = getValue("settings_improve_notifications", true);
    // c.settings_remove_target_log_form = getValue("settings_remove_target_log_form", false);
    // c.settings_remove_target_log_view = getValue("settings_remove_target_log_view", false);
    // c.settings_hide_locked_tbs_log_form = getValue("settings_hide_locked_tbs_log_form", true);
    // c.settings_hide_own_tbs_log_form = getValue("settings_hide_own_tbs_log_form", false);
    // c.settings_hide_share_log_button_log_view = getValue("settings_hide_share_log_button_log_view", false);
    // c.settings_dashboard_hide_tb_activity = getValue("settings_dashboard_hide_tb_activity", false);
    // c.settings_button_sort_tbs_by_name_log_form = getValue("settings_button_sort_tbs_by_name_log_form", true);
    // c.settings_larger_content_width_log_form = getValue("settings_larger_content_width_log_form", true);
    // c.settings_less_space_log_lines_log_form = getValue("settings_less_space_log_lines_log_form", true);
    // c.settings_listing_bigger_avatar_with_mouse = getValue("settings_listing_bigger_avatar_with_mouse", true);
    // c.settings_listing_ctoc_coords_waypoints = getValue("settings_listing_ctoc_coords_waypoints", true);
    // c.settings_listing_add_county_to_place = getValue("settings_listing_add_county_to_place", false);
    // c.settings_maps_add_county_to_place = getValue("settings_maps_add_county_to_place", false);
    // c.settings_message_add_gc_code = getValue("settings_message_add_gc_code", true);

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
