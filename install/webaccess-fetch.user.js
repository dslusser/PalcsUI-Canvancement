// ==UserScript==
// @name            Webaccess Fetch
// @namespace       https://github.com/dslusser/PalcsUI-Canvancement
// @description     Fetch mail on the Webaccess page to help persist login session
// @include         http://webaccess.*.*/gw/webacc
// @include         https://webaccess.*.*/gw/webacc
// @version         1.1.02
// @grant           none
// @author          Dan Slusser
// @updateURL       https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/webaccess-fetch.user.js
// @downloadURL     https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/webaccess-fetch.user.js
// ==/UserScript==

(function() {
    'use strict';

    const refreshInterval = 180000; // 60000 = 60 seconds
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    const regex = /([0-9]{1,6})/g; // OR /(\d+)/g

    // Webaccess page title 'Groupwise ([firstName] [lastName])'
    // Consider page title like gmail, ex. "Inbox (726) - example@gmail.com - Gmail"
    const pageTitleText = document.title;

    function addCustomCSS() {

        //console.log('addCustomCSS() is running');
        var head = top.workspace.document.getElementsByTagName('head')[0];

        var style = top.workspace.document.createElement('style');
        style.type = 'text/css';
        style.id = 'webaccessCss';

        head.appendChild(style);

        var header = top.workspace.document.getElementsByTagName('header')[0];

        function addWebaccessCssStyle(css) {

            var D = top.workspace.document.getElementById('webaccessCss');
            D.append(css);

        }

        var webaccessWidthCSSCode = `
        div.fixedHead table, div.head table, div.body table {
        width: 100%; /* or 923px; */
        }`;

        addWebaccessCssStyle(webaccessWidthCSSCode);

    }


    function setPageTitleWithUnreadNumber() {
        var unreadCount = top.workspace.document.getElementsByClassName("unreadCountGreen")[0].innerText;
        var unreadCountNum = unreadCount.match(regex);
        var pageTitleTextNum = pageTitleText;

        if (unreadCountNum == null || unreadCountNum == undefined){
            unreadCountNum = "0";
            pageTitleTextNum = pageTitleText + ' ' + unreadCountNum;
            document.title = pageTitleTextNum
        } else {
            unreadCountNum = unreadCountNum.join('');
            pageTitleTextNum = pageTitleText + ' ' + unreadCountNum;
            document.title = pageTitleTextNum
        }
    }


    top.workspace.addEventListener("DOMContentLoaded", function(){
        //console.log("Workspace frame is ready");
        addCustomCSS();
        setTimeout(function(){
            var refreshBtn = top.workspace.gwwa.msglist.updateBtn;
            if (typeof(refreshBtn) != 'undefined' && refreshBtn != null) {
                //console.log('It\'s '+ dateTime +' and refreshBtn exists! Changing page title and setting up refresh interval.');
                var i = 1;
                setPageTitleWithUnreadNumber();
                setInterval(function(){
                    refreshBtn.click();
                    setPageTitleWithUnreadNumber();
                    var current = new Date();
                    //console.log('refreshBtn.click() fired for the ' + i++ + ' time at ' + date + ' ' + current.toLocaleTimeString());
                }, refreshInterval);
            } else {
                //console.log('It\'s '+ dateTime +' and refreshBtn does not exist! Exiting function.');
            }
        }, 5000);
    });


})();