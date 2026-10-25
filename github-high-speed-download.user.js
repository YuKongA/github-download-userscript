// ==UserScript==
// @name         GitHub 下载加速
// @version      1.2.1
// @author       X.I.U, YuKongA
// @description  加速 Release、Raw、Code(ZIP)、Git Clone、单文件列表悬停下载
// @match        *://github.com/*
// @match        *://bgithub.xyz/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACEUExURUxpcRgWFhsYGBgWFhcWFh8WFhoYGBgWFiUlJRcVFRkWFhgVFRgWFhgVFRsWFhgWFigeHhkWFv////////////r6+h4eHv///xcVFfLx8SMhIUNCQpSTk/r6+jY0NCknJ97e3ru7u+fn51BOTsPCwqGgoISDg6empmpoaK2srNDQ0FhXV3eXcCcAAAAXdFJOUwCBIZXMGP70BuRH2Ze/LpIMUunHkpQR34sfygAAAVpJREFUOMt1U+magjAMDAVb5BDU3W25b9T1/d9vaYpQKDs/rF9nSNJkArDA9ezQZ8wPbc8FE6eAiQUsOO1o19JolFibKCdHGHC0IJezOMD5snx/yE+KOYYr42fPSufSZyazqDoseTPw4lGJNOu6LBXVUPBG3lqYAOv/5ZwnNUfUifzBt8gkgfgINmjxOpgqUA147QWNaocLniqq3QsSVbQHNp45N/BAwoYQz9oUJEiE4GMGfoBSMj5gjeWRIMMqleD/CAzUHFqTLyjOA5zjNnwa4UCEZ2YK3khEcBXHjVBtEFeIZ6+NxYbPqWp1DLKV42t6Ujn2ydyiPi9nX0TTNAkVVZ/gozsl6FbrktkwaVvL2TRK0C8Ca7Hck7f5OBT6FFbLATkL2ugV0tm0RLM9fedDvhWstl8Wp9AFDjFX7yOY/lJrv8AkYuz7fuP8dv9izCYH+x3/LBnj9fYPBTpJDNzX+7cAAAAASUVORK5CYII=
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_setClipboard
// @grant        window.onurlchange
// @sandbox      JavaScript
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/YuKongA/github-download-userscript
// @supportURL   https://github.com/YuKongA/github-download-userscript
// @homepageURL  https://github.com/YuKongA/github-download-userscript
// @downloadURL  https://raw.githubusercontent.com/YuKongA/github-download-userscript/main/github-high-speed-download.user.js
// @updateURL    https://raw.githubusercontent.com/YuKongA/github-download-userscript/main/github-high-speed-download.user.js
// ==/UserScript==
// 修改版（GPL-3.0）：基于 XIU2/UserScript（https://github.com/XIU2/UserScript）的
// GithubEnhanced-High-Speed-Download.user.js 修改，首次修改日期 2026-10-25。
// 原作者：X.I.U（XIU2），本修改版同样以 GPL-3.0 发布。
// 修改部分版权：Copyright (C) 2026 YuKongA
// 完整许可条款见 LICENSE；本程序不提供任何担保（GPL-3.0 §15、§16）。

(function () {
    'use strict';
    var menu_rawFast = GM_getValue('xiu2_menu_raw_fast'), menu_rawFast_ID, menu_rawDownLink_ID, menu_cloneFast_ID, menu_zipFast_ID, menu_customUrl_ID, menu_feedBack_ID;
    const download_url = [
        // 2026-10-25 实测排序：前 5 条启用，其余注释保留
        ['https://gh.monlor.com/https://github.com', 'monlor', '[美国 Cloudflare CDN] - 该公益加速源由 [gh.monlor.com] 提供'],                                                                 // 2.70 MB/s
        ['https://xget.xi-xu.me/gh', 'xget', '[美国 Cloudflare CDN] - 该公益加速源由 [github.com/xixu-me/Xget] 提供'],                                                                       // 2.66 MB/s
        ['https://gh.h233.eu.org/https://github.com', 'h233', '[美国 Cloudflare CDN] - 该公益加速源由 [@X.I.U/XIU2] 提供'],                                                                  // 2.40 MB/s
        ['https://ghpxy.hwinzniej.top/https://github.com', 'ghpxy', '[美国 Cloudflare CDN] - 该公益加速源由 [ghpxy.hwinzniej.top] 提供'],                                                     // 2.39 MB/s
        ['https://gh-proxy.org/https://github.com', 'gh-proxy', '[美国 Cloudflare CDN] - 该公益加速源由 [gh-proxy.com] 提供'],                                                                   // 2.30 MB/s
        //['https://gh.chjina.com/https://github.com', 'chjina', '[美国 Cloudflare CDN] - 该公益加速源由 [gh.chjina.com] 提供'],                                                               // 2.14 MB/s
        //['https://cdn.crashmc.com/https://github.com', 'crashmc', '[美国 Cloudflare CDN] - 该公益加速源由 [cdn.crashmc.com] 提供'],                                                           // 1.91 MB/s
        //['https://github.boki.moe/https://github.com', 'boki', '[美国 Cloudflare CDN] - 该公益加速源由 [blog.boki.moe] 提供'],                                                             // 1.88 MB/s
        //['https://github.ednovas.xyz/https://github.com', 'ednovas', '[美国 Cloudflare CDN] - 该公益加速源由 [github.ednovas.xyz] 提供'],                                                     // 1.76 MB/s
        //['https://ghfile.geekertao.top/https://github.com', 'geekertao', '[美国 Cloudflare CDN] - 该公益加速源由 [ghfile.geekertao.top] 提供'],                                                 // 1.46 MB/s
        //['https://git.yylx.win/https://github.com', 'yylx', '[美国 Cloudflare CDN] - 该公益加速源由 [git.yylx.win] 提供'],                                                                 // 1 次 2.10 MB/s，另 1 次 40 s 未下完
        //['https://hk.gh-proxy.org/https://github.com', 'hk-proxy', '[中国香港] - 该公益加速源由 [gh-proxy.com] 提供'],                                                                           // 40 s 内仅 3.3 MB
        //['https://cdn.gh-proxy.org/https://github.com', 'cdn-proxy', '[Fastly CDN] - 该公益加速源由 [gh-proxy.com] 提供'],                                                                    // 40 s 内仅 3.3 MB
        //['https://ghp.keleyaa.com/https://github.com', 'keleyaa', '[美国 Cloudflare CDN] - 该公益加速源由 [ghp.keleyaa.com] 提供'],                                                           // 40 s 内仅 2.8 MB
        //['https://edgeone.gh-proxy.org/https://github.com', 'edgeone', '[edgeone] - 该公益加速源由 [gh-proxy.com] 提供'],                                                                   // 40 s 内仅 1.8 MB
        //['https://ghproxy.net/https://github.com', 'ghproxy', '[法国] - 该公益加速源由 [ghproxy.net] 提供&#10;&#10;提示：希望大家尽量多使用美国节点（每次随机 负载均衡），&#10;避免流量都集中到亚洲公益节点，减少成本压力，公益才能更持久~'],         // 40 s 内仅 1.3 MB
        //['https://wget.la/https://github.com', 'wget', '[中国香港、中国台湾、日本、美国等]（CDN 不固定） - 该公益加速源由 [ucdn.me] 提供&#10;&#10;提示：希望大家尽量多使用美国节点（每次随机 负载均衡），&#10;避免流量都集中到亚洲公益节点，减少成本压力，公益才能更持久~'], // 40 s 内仅 0.3 MB
    ], clone_url = [
        // 2026-10-25 实测排序（git clone 3 轮取中位数），addGitClone 只展示前 3 条
        ['https://gh.monlor.com/https://github.com', 'monlor', '[美国 Cloudflare CDN] - 该公益加速源由 [gh.monlor.com] 提供'],                         // 226.6 KB/s
        ['https://hk.gh-proxy.org/https://github.com', 'hk-proxy', '[中国香港] - 该公益加速源由 [gh-proxy.com] 提供'],                                   // 224.1 KB/s
        ['https://gh-proxy.org/https://github.com', 'gh-proxy', '[美国 Cloudflare CDN] - 该公益加速源由 [gh-proxy.com] 提供'],                         // 192.1 KB/s
        //['https://ghpxy.hwinzniej.top/https://github.com', 'ghpxy', '[美国 Cloudflare CDN] - 该公益加速源由 [ghpxy.hwinzniej.top] 提供'],            // 186.8 KB/s
        //['https://cdn.gh-proxy.org/https://github.com', 'cdn-proxy', '[Fastly CDN] - 该公益加速源由 [gh-proxy.com] 提供'],                         // 148.7 KB/s
        //['https://edgeone.gh-proxy.org/https://github.com', 'edgeone', '[edgeone] - 该公益加速源由 [gh-proxy.com] 提供'],                          // 33.8 KB/s
        //['https://gitclone.com', 'gitclone', '[中国 国内] - 该公益加速源由 [GitClone] 提供&#10;&#10; - 缓存：有&#10; - 首次比较慢，缓存后较快'],                      // 502，仅国内可用时再启用
    ], raw_url = [
        // 2026-10-25 实测排序（948 KB raw 文件，2 次取中位数），addRawFile 只展示前 3 条
        ['https://raw.githubusercontent.com', 'Github 原生', '[日本 东京]&#10;&#10; - 缓存：无（或很短）'],
        ['https://cdn.gh-proxy.org/https://raw.githubusercontent.com', 'cdn-proxy', '[Fastly CDN] - 该公益加速源由 [gh-proxy.com] 提供&#10;&#10; - 缓存：有'],     // 3.68 MB/s
        ['https://hk.gh-proxy.org/https://raw.githubusercontent.com', 'hk-proxy', '[中国香港] - 该公益加速源由 [gh-proxy.com] 提供&#10;&#10; - 缓存：有（官方注明 2 小时）'],  // 3.50 MB/s
        ['https://testingcf.jsdelivr.net/gh', 'testingcf', '[Cloudflare CDN] - 该公益加速源由 [JSDelivr CDN] 提供&#10;&#10; - 缓存：有&#10; - 不支持大小超过 50 MB 的文件&#10; - 不支持版本号格式的分支名（如 v1.2.3）'], // 2.47 MB/s
        ['https://wget.la/https://raw.githubusercontent.com', 'wget', '[中国香港、中国台湾、日本、美国等]（CDN 不固定） - 该公益加速源由 [ucdn.me] 提供&#10;&#10; - 缓存：无（或很短）'],    // 0.77 MB/s（波动大）
        ['https://g.blfrp.cn/https://raw.githubusercontent.com', 'blfrp', '[日本 东京] - 该公益加速源由 [g.blfrp.cn] 提供'],                                       // 0.32 MB/s
        //['https://gh.catmak.name/https://raw.githubusercontent.com', 'catmak', '[韩国 首尔] - 该公益加速源由 [gh.catmak.name] 提供'],                            // 403，暂注释
    ];
    const cloudIcon = '<svg class="octicon octicon-cloud-download" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg>';

    if (menu_rawFast == null) { menu_rawFast = 1; GM_setValue('xiu2_menu_raw_fast', 1) };
    if (GM_getValue('menu_rawDownLink') == null) { GM_setValue('menu_rawDownLink', true) };
    if (GM_getValue('menu_cloneFast') == null) { GM_setValue('menu_cloneFast', true) };
    if (GM_getValue('menu_zipFast') == null) { GM_setValue('menu_zipFast', true) };
    // 已保存的自定义源插入 raw_url / clone_url
    if (GM_getValue('custom_raw_url')) { raw_url.splice(1, 0, [GM_getValue('custom_raw_url'), '自定义', '[由你自定义的 Raw 加速源]&#10;&#10;提示：点击浏览器右上角 Tampermonkey 扩展图标 - [ #️⃣ 自定义加速源 ]&#10;即可轮流设置 Raw、Git Clone、Release/Code(ZIP) 的自定义加速源地址（留空代表不设置）。']) };
    if (GM_getValue('custom_clone_url')) { clone_url.unshift([GM_getValue('custom_clone_url'), '自定义', '[由你自定义的 Git Clone 加速源]&#10;&#10;提示：点击浏览器右上角 Tampermonkey 扩展图标 - [ #️⃣ 自定义加速源 ]&#10;即可轮流设置 Raw、Git Clone、Release/Code(ZIP) 的自定义加速源地址（留空代表不设置）。']) };
    // 开关菜单：点击切换并提示刷新
    function registerToggle(key, label) {
        return GM_registerMenuCommand(`${GM_getValue(key) ? '✅' : '❌'} ${label}`, function () {
            const next = !GM_getValue(key);
            GM_setValue(key, next);
            GM_notification({ text: `已${next ? '开启' : '关闭'} [${label}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function () { location.reload(); } });
            registerMenuCommand();
        });
    }

    registerMenuCommand();
    function registerMenuCommand() {
        // 已注册过则先注销旧菜单
        if (menu_feedBack_ID) { GM_unregisterMenuCommand(menu_rawFast_ID); GM_unregisterMenuCommand(menu_rawDownLink_ID); GM_unregisterMenuCommand(menu_cloneFast_ID); GM_unregisterMenuCommand(menu_zipFast_ID); GM_unregisterMenuCommand(menu_customUrl_ID); GM_unregisterMenuCommand(menu_feedBack_ID); menu_rawFast = GM_getValue('xiu2_menu_raw_fast'); }
        // 数组缩短后防止索引越界
        if (menu_rawFast > raw_url.length - 1) menu_rawFast = 0
        if (GM_getValue('menu_rawDownLink')) menu_rawFast_ID = GM_registerMenuCommand(`${['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'][menu_rawFast]} [ ${raw_url[menu_rawFast][1]} ] 加速源 (☁) - 点击切换`, menu_toggle_raw_fast);
        menu_rawDownLink_ID = registerToggle('menu_rawDownLink', '项目列表单文件快捷下载 (☁)');
        menu_cloneFast_ID = registerToggle('menu_cloneFast', '代码下拉框 - Git Clone 加速');
        menu_zipFast_ID = registerToggle('menu_zipFast', '代码下拉框 - Download ZIP 加速');
        menu_customUrl_ID = GM_registerMenuCommand(`#️⃣ 自定义加速源`, function () {
            // 三种自定义源的键名与提示
            const customKeys = [
                { key: 'custom_raw_url', desc: 'Raw 加速源', placeholder: 'https://example.com/https://raw.githubusercontent.com' },
                { key: 'custom_clone_url', desc: 'Git Clone 加速源', placeholder: 'https://example.com/https://github.com' },
                { key: 'custom_download_url', desc: 'Release/Code(ZIP) 加速源', placeholder: 'https://example.com/https://github.com' }
            ];
            // 依次询问三种自定义源
            function promptCustomUrl(index = 0) {
                if (index >= customKeys.length) { GM_notification({ text: '自定义加速源设置已完成！\n（点击刷新网页后生效）', timeout: 3500, onclick: function () { location.reload(); } }); return; }
                const { key, desc, placeholder } = customKeys[index];
                let current = GM_getValue(key, '');
                let input = prompt(`请输入自定义${desc}地址：\n- 当前：\n${current || '(未设置)'}\n\n- 示例：\n${placeholder}\n\n- 留空为不设置\n- 点击 [确定] 保存 并 继续设置下一个\n- 点击 [取消] 不保存 并 终止后续设置`, current);
                if (input !== null) { GM_setValue(key, input.trim()); promptCustomUrl(index + 1); } // 取消即中止
            }
            promptCustomUrl();
        });
        menu_feedBack_ID = GM_registerMenuCommand('💬 反馈 & 建议 [Github]', function () { window.GM_openInTab('https://github.com/XIU2/UserScript', { active: true, insert: true, setParent: true }); window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/412245/feedback', { active: true, insert: true, setParent: true }); });
    }

    // 切换加速源
    function menu_toggle_raw_fast() {
        // 递增，越界归零
        if (menu_rawFast >= raw_url.length - 1) { menu_rawFast = 0; } else { menu_rawFast += 1; }
        GM_setValue('xiu2_menu_raw_fast', menu_rawFast);
        delRawDownLink(); // 先清旧链接
        addRawDownLink(); // 再按新源重建
        GM_notification({ text: "已切换加速源为：" + raw_url[menu_rawFast][1], timeout: 3000 });
        registerMenuCommand(); // 刷新菜单文案
    };

    setTimeout(addRawFile, 1000); // Raw 按钮
    setTimeout(addRawDownLink, 2000); // ☁ 延迟 2 s，避开 pjax

    // Tampermonkey 自带 onurlchange，其它管理器由本脚本派发
    if (window.onurlchange === undefined) addUrlChangeEvent();
    window.addEventListener('urlchange', function () {
        if (location.pathname.indexOf('/releases') > -1) setTimeout(addRelease, 1000); // Release 注入
        setTimeout(addRawFile, 1000); // Raw 按钮
        setTimeout(addRawDownLink, 2000); // ☁ 延迟 2 s，避开 pjax
        setTimeout(addRawDownLink_, 1000); // 前进/后退后重绑悬停
    });


    // Release 与 Code 下拉框动态渲染，需监听 DOM
    const callback = (mutationsList) => {
        if (location.pathname.indexOf('/releases') > -1) { // Release
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType !== 1) return
                    if (target.tagName === 'DIV' && target.dataset.viewComponent === 'true' && target.classList[0] === 'Box') addRelease();
                }
            }
        } else if (document.querySelector('#repo-title-component')) { // 项目首页
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType !== 1) return
                    if (target.tagName === 'DIV' && target.parentElement && target.parentElement.id === '__primerPortalRoot__') {
                        addGitClone(target);
                        addDownloadZIP(target);
                    }
                }
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document, { childList: true, subtree: true });


    // 切换 HTTPS / SSH / CLI 后重新同步加速行
    document.addEventListener('click', function (e) {
        let btn = e.target && e.target.closest ? e.target.closest('button[class*="SegmentedControl"]') : null; if (!btn) return
        let ul = btn.closest('ul'), section = ul && ul.parentElement; if (!section || !section.querySelector('input')) return
        [100, 350, 800].forEach(t => { setTimeout(() => syncClone(section), t) });
    }, true);

    function syncClone(section) {
        if (!section.isConnected) return
        // 只认原生输入框；仅 HTTPS 注入
        let input = [...section.querySelectorAll('input')].find(i => !i.closest('.XIU2-GC')),
            isHttps = input && (input.getAttribute('value') || '').indexOf('https:') === 0;
        if (isHttps && section.querySelector('.XIU2-GC')) return // 已经是 HTTPS 加速行
        section.querySelectorAll('.XIU2-GC').forEach((e) => { e.remove() }); // SSH / GitHub CLI 标签页不注入
        if (isHttps) addGitClone(section);
    }


    // 取前 count 条（已按速度排序），自定义源占一条
    function getDownloadUrls(count) {
        const custom = GM_getValue('custom_download_url'),
            pick = count - (custom ? 1 : 0);
        const picked = download_url.slice(0, pick);
        return custom ? [[custom, '自定义', '[由你自定义的 Release/Code(ZIP) 加速源地址]&#10;&#10;提示：点击浏览器右上角 Tampermonkey 扩展图标 - [ #️⃣ 自定义加速源 ]&#10;即可轮流设置 Raw、Git Clone、Release/Code(ZIP) 的自定义加速源地址（留空代表不设置）。']].concat(picked) : picked;
    }

    // Release
    function addRelease() {
        let html = document.querySelectorAll('.Box-footer'); if (html.length == 0 || location.pathname.indexOf('/releases') == -1) return
        let download_urls = getDownloadUrls(6),
            style_Add = document.getElementById('XIU2-RS-Style') || document.createElement('style');
        // 加速源排成原生 btn 分组，换行到文件名下方
        style_Add.id = 'XIU2-RS-Style';
        style_Add.textContent = `
            .XIU2-RSN {flex-wrap: wrap;}
            .XIU2-RS {display: inline-flex; width: 100%; margin-top: 4px;}
            .XIU2-RS .btn {display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; height: 24px; padding: 0 clamp(4px, 0.8vw, 8px); font-size: 12px; font-weight: 400; color: var(--fgColor-muted); background-color: transparent; border-color: var(--borderColor-default); border-radius: 0; margin-left: -1px;}
            .XIU2-RS .btn:first-child {border-radius: 6px 0 0 6px; margin-left: 0;}
            .XIU2-RS .btn:last-child {border-radius: 0 6px 6px 0;}
            .XIU2-RS .btn:hover {position: relative; z-index: 1; color: var(--fgColor-default); background-color: var(--bgColor-muted);}
        `;
        html[0].appendChild(style_Add);
        for (const current of html) {
            current.querySelectorAll('li.Box-row a').forEach(function (_this) {
                let li = _this.closest('li.Box-row'); if (!li || li.querySelector('.XIU2-RS')) return
                let cell = li.firstElementChild, // 文件名所在列
                    href = _this.href.split(location.host),
                    url = '', _html = `<div class="XIU2-RS">`;

                for (const source of download_urls) {
                    url = source[0] + href[1]
                    _html += `<a class="btn" href="${url}" target="_blank" title="${source[2]}\n\n提示：如果不想要点击链接在前台打开空白新标签页（一闪而过影响体验），\n可以 [鼠标中键] 或 [Ctrl+鼠标左键] 点击加速链接即可在后台打开新标签页！" rel="noreferrer noopener nofollow">${source[1]}</a>`
                }
                cell.classList.add('XIU2-RSN');
                cell.insertAdjacentHTML('beforeend', _html + '</div>');
            });
        }
    }


    // 注入行会让弹窗高于锚点下方空间，GitHub 会把弹窗顶到视口顶部；限高 + 内部滚动即可复位
    function capPopover(el) {
        let style = document.getElementById('XIU2-Style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'XIU2-Style';
            style.textContent = '#__primerPortalRoot__ .XIU2-POP {max-height: max(240px, calc(100vh - 360px)); overflow-y: auto;}';
            document.head.appendChild(style);
        }
        let overlay = el.closest('[class*="AnchoredOverlay"]');
        if (overlay) overlay.classList.add('XIU2-POP');
    }

    // Download ZIP
    function addDownloadZIP(target) {
        if (!GM_getValue('menu_zipFast')) return
        const html = target.querySelector('ul[class^=prc-ActionList-ActionList-]>li:last-child'); if (!html) return
        let href = html.querySelector('a[href^="/"][href$=".zip"]'); if (!href || !href.getAttribute('href')) return
        capPopover(html);
        href = href.getAttribute('href');
        let url = '', _html = '', download_urls = getDownloadUrls(3);

        // 克隆原 ZIP 行，定位 <a> 与 <span>
        let html_clone = html.cloneNode(true),
            html_clone_a = html_clone.querySelector('a[href$=".zip"]'),
            html_clone_span = html_clone.querySelector('span[id]');

        for (const source of download_urls) {
            url = source[0] + href
            html_clone_a.href = url
            html_clone_a.setAttribute('title', source[2].replaceAll('&#10;', '\n') + '\n\n提示：如果不想要点击链接在前台打开空白新标签页（一闪而过影响体验），\n可以 [鼠标中键] 或 [Ctrl+鼠标左键] 点击加速链接即可在后台打开新标签页！');
            html_clone_a.setAttribute('target', '_blank');
            html_clone_a.setAttribute('rel', 'noreferrer noopener nofollow');
            html_clone_span.textContent = 'Download ZIP [' + source[1] + ']'
            _html += html_clone.outerHTML
        }
        html.insertAdjacentHTML('afterend', _html);
    }

    // 复制并短暂显示 √（克隆行无 React 事件，需自行绑定）
    function copyCloneText(btn, text) {
        GM_setClipboard(text);
        if (!btn || btn.dataset.copying) return
        let svg = btn.querySelector('svg'); if (!svg) return
        btn.dataset.copying = '1';
        let check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        check.setAttribute('class', 'octicon octicon-check color-fg-success');
        check.setAttribute('viewBox', '0 0 16 16');
        check.setAttribute('width', '16');
        check.setAttribute('height', '16');
        check.setAttribute('aria-hidden', 'true');
        check.setAttribute('fill', 'currentColor');
        check.innerHTML = '<path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>';
        svg.replaceWith(check);
        setTimeout(() => { check.replaceWith(svg); delete btn.dataset.copying; }, 1500);
    }

    // 克隆整行（输入框 + 复制按钮）并绑定复制
    function cloneCloneRow(container, css, url, tip, value) {
        let row = container.cloneNode(true);
        row.classList.add(css);
        row.style.marginTop = '4px';
        let input = row.querySelector('input'),
            label = row.querySelector('label'),
            btn = row.querySelector('button');
        if (input) {
            input.removeAttribute('id'); // 避免与原生输入框 id 重复
            input.value = value;
            input.setAttribute('value', value);
            input.title = tip;
        }
        if (label) label.removeAttribute('for');
        if (btn && input) btn.addEventListener('click', function () { copyCloneText(btn, input.value) });
        return row;
    }

    // Git Clone
    function addGitClone(target) {
        if (!GM_getValue('menu_cloneFast')) return
        let html = target.querySelector('input[value^="https:"]:not([title])'); if (!html) return
        let container = html.parentElement, // 整行：输入框 + 右侧复制按钮
            href_split = html.value.split(location.host)[1],
            url = '', ref = container;
        if (container.parentElement.querySelector('.XIU2-GC')) return // 已注入
        capPopover(container);
        if (container.nextElementSibling && container.nextElementSibling.tagName === 'P' && container.nextElementSibling.textContent.indexOf('↑点击') === -1) {
            container.nextElementSibling.textContent += ' (↑点击文字自动复制)'
        }
        for (const source of clone_url.slice(0, 3)) {
            if (source[0] === 'https://gitclone.com') {
                url = source[0] + '/github.com' + href_split
            } else {
                url = source[0] + href_split
            }
            let row = cloneCloneRow(container, 'XIU2-GC', url, `${url}\n\n${source[2].replaceAll('&#10;', '\n')}\n\n提示：点击文字可直接复制`, url);
            ref.insertAdjacentElement('afterend', row);
            ref = row;
        }
        if (container.parentElement.className.indexOf('XIU2-GCP') === -1) {
            container.parentElement.classList.add('XIU2-GCP')
            container.parentElement.addEventListener('click', (e) => { if (e.target.tagName === 'INPUT') { GM_setClipboard(e.target.value); } })
        }
    }


    // /gh 结尾的源（jsDelivr）用 @branch 路径
    function rawProxyUrl(base, href) {
        return base.endsWith('/gh') ? base + href.replace('/blob/', '@') : base + href.replace('/blob/', '/');
    }

    // 悬停显示 ☁，移出还原图标
    function toggleCloudIcon(show) {
        return function (evt) {
            evt.currentTarget.querySelectorAll('.fileDownLink').forEach(el => { el.style.display = show ? 'inline' : 'none' });
            evt.currentTarget.querySelectorAll('svg.octicon.octicon-file, svg.color-fg-muted').forEach(el => { el.style.display = show ? 'none' : 'inline' });
        };
    }
    const mouseOverHandler = toggleCloudIcon(true), mouseOutHandler = toggleCloudIcon(false);


    // Raw
    function addRawFile() {
        let html = document.querySelector('a[data-testid="raw-button"]'); if (!html) return
        let href = location.href.replace(`https://${location.host}`, ''),
            _html = '';

        for (let i = 1; i <= Math.min(3, raw_url.length - 1); i++) {
            _html += `<a href="${rawProxyUrl(raw_url[i][0], href)}" title="${raw_url[i][2]}\n\n提示：如果想要直接下载，可使用 [Alt + 左键] 点击加速按钮或 [右键 - 另存为...]" target="_blank" role="button" rel="noreferrer noopener nofollow" data-size="small" data-variant="default" class="${html.className} XIU2-RF" style="border-radius: 0;margin-left: -1px;">${raw_url[i][1]}</a>`
        }
        if (document.querySelector('.XIU2-RF')) document.querySelectorAll('.XIU2-RF').forEach((e) => { e.remove() })
        html.insertAdjacentHTML('afterend', _html);
    }


    // Raw 单文件快捷下载（☁）
    function addRawDownLink() {
        if (!GM_getValue('menu_rawDownLink')) return
        // 非文件页或已注入则跳过
        let files = document.querySelectorAll('div.Box-row svg.octicon.octicon-file, .react-directory-filename-column>svg.color-fg-muted'); if (files.length === 0) return; if (location.pathname.indexOf('/tags') > -1) return
        let files1 = document.querySelectorAll('a.fileDownLink'); if (files1.length > 0) return;

        files.forEach(function (fileElm) {
            let trElm = fileElm.parentNode.parentNode,
                cntElm_a = trElm.querySelector('[role="rowheader"] > .css-truncate.css-truncate-target.d-block.width-fit > a, .react-directory-truncate>a'),
                Name = cntElm_a.innerText,
                href = cntElm_a.getAttribute('href'),
                url = rawProxyUrl(raw_url[menu_rawFast][0], href);

            fileElm.insertAdjacentHTML('afterend', `<a href="${url}" download="${Name}" target="_blank" rel="noreferrer noopener nofollow" class="fileDownLink" style="display: none;" title="「${raw_url[menu_rawFast][1]}」&#10;[Alt+左键] 或 [右键-另存为] 下载">${cloudIcon}</a>`);
            trElm.onmouseover = mouseOverHandler;
            trElm.onmouseout = mouseOutHandler;
        });
    }


    // 移除 Raw 单文件快捷下载（☁）
    function delRawDownLink() {
        if (!GM_getValue('menu_rawDownLink')) return
        let aElm = document.querySelectorAll('.fileDownLink'); if (aElm.length === 0) return;
        aElm.forEach(function (fileElm) { fileElm.remove(); })
    }


    // 前进/后退后重绑 ☁ 悬停事件
    function addRawDownLink_() {
        if (!GM_getValue('menu_rawDownLink')) return
        // 非文件页或没有 ☁ 链接则跳过
        let files = document.querySelectorAll('div.Box-row svg.octicon.octicon-file, .react-directory-filename-column>svg.color-fg-muted'); if (files.length === 0) return;
        let files1 = document.querySelectorAll('a.fileDownLink'); if (files1.length === 0) return;

        files.forEach(function (fileElm) {
            let trElm = fileElm.parentNode.parentNode;
            trElm.onmouseover = mouseOverHandler;
            trElm.onmouseout = mouseOutHandler;
        });
    }


    // 非 Tampermonkey 环境：拦截 pushState/replaceState 派发 urlchange
    function addUrlChangeEvent() {
        history.pushState = (f => function pushState() {
            var ret = f.apply(this, arguments);
            window.dispatchEvent(new Event('pushstate'));
            window.dispatchEvent(new Event('urlchange'));
            return ret;
        })(history.pushState);

        history.replaceState = (f => function replaceState() {
            var ret = f.apply(this, arguments);
            window.dispatchEvent(new Event('replacestate'));
            window.dispatchEvent(new Event('urlchange'));
            return ret;
        })(history.replaceState);

        window.addEventListener('popstate', () => { // 前进/后退也派发 urlchange
            window.dispatchEvent(new Event('urlchange'))
        });
    }
})();
