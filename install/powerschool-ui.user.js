// ==UserScript==
// @name        PowerSchoolUI Enhancement
// @namespace   https://github.com/dslusser/PalcsUI-Canvancement
// @description User enhancements for the Palcs PowerSchool instance
// @include     https://palcs.powerschool.com/*
// @noframes
// @version     1.00
// @grant       none
// ==/UserScript==
(function () {
    'use strict';
  
  
    // removeNewTabs aggressively removes the "open in new tab" UI/UX
    // that is currently in PowerSchool. Turn it on by setting the
    // value to true. Turn it off by setting it to false.
  
    var config = {
      // PowerSchoolUI enhancements may be true or false
      'removeNewTabs': true
    };
  
  
  
  
  
  
    // ************** Don't modify anything below this line ************** //
  
  
  
    //$(document).ready(function(){addCustomCSS();removeNewTabs();console.log('doc ready')});
    //console.log('we\'re live');
    var PowerSchoolUI = function(config) {
        'use strict';
        if (typeof config === 'undefined') {
  
            config = {
                // PowerSchoolUI enhancements may be true or false
                'removeNewTabs' : true
            };
        };
  
  
        var isPowerSchool = false;
        var D = document;
  
        if (/^.*\.powerschool\.com$/.test(window.location.host)) {
          isPowerSchool = true;
          //console.log(isPowerSchool + ', yes this is PowerSchool domain');
          removeNewTabs();
        }
  
  
        /*if (/^\/courses\/[0-9]+\/gradebook\/speed_grader$/.test(window.location.pathname)) {
            console.log('we are at speed_grader');
            removeNewTabs();
        } */
  
  
        var j = D.querySelectorAll('a[target="_blank"]');
          if (j.length > 0) {
            removeNewTabs();
          };
  
        function removeNewTabs() {
            if (typeof config.removeNewTabs !== 'undefined' && !config.removeNewTabs) {
                return;
              } else {
                Array.from(document.querySelectorAll('a[target="_blank"]'))
                    .forEach(link => link.removeAttribute('target'));
                //console.log('Removed blank targets');
              }
        }
  
    }
  
    if (typeof PowerSchoolUI !== 'function') {
      const script = document.createElement('script');
      script.src = 'https://gitcdn.xyz/repo/dslusser/PalcsUI-Canvancement/master/install/powerschool-ui.user.js';
      script.onload = function() {
        PowerSchoolUI(config);
        //console.log('Missing function, loading fallback script.');
      };
      document.head.appendChild(script);
    }
    else {
      PowerSchoolUI(config);
      //console.log('Function has been loaded properly.');
    }
  
  
    //PowerSchoolUI(config);
  
  })();