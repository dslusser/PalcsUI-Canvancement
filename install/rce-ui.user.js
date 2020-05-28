// ==UserScript==
// @name        RCE UI Canvancements
// @namespace   https://github.com/dslusser/PalcsUI-Canvancement
// @description User enhancements for the Canvas Rich Content Editor
// @include     https://*.instructure.com/*
// @noframes
// @version     1.00
// @grant       none
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @updateURL     https://gitcdn.xyz/repo/dslusser/PalcsUI-Canvancement/master/install/rce-ui.user.js
// ==/UserScript==
(function () {
  'use strict';

  // addStickyToolbar makes the Canvas RCE Toolbar stick to the top of the page
  // when the user scrolls past the toolbar location.
  // Turn it on by setting the value to true.
  // Turn it off by setting the value to false.

  var config = {
    // RCEMods enhancements may be true or false
    'addStickyToolbar': true
  };






  // ************** Don't modify anything below this line ************** //



  //$(document).ready(function(){addCustomCSS();console.log('doc ready')});
  //console.log('we\'re live');
  var RCEMods = function(config) {
      'use strict';
      if (typeof config === 'undefined') {

          config = {
              // RCEMods default enhancements may be true or false
              'addCustomCSS' : true,
              'RCEStickyToolbarCSS' : true,
              'addStickyToolbar' : true
          };
      };


      var isInstructure = false;
      var D = document;

      if (/^.*\.instructure\.com$/.test(window.location.host)) {
        isInstructure = true;
        //console.log(isInstructure + ', yes this is Instructure domain');
        addCustomCSS();
      }


    function addCustomCSS() {
      if (typeof config.addCustomCSS !== 'undefined' && !config.addCustomCSS) {
        return;
      }
      //console.log('addCustomCSS() is running');
      var head = document.getElementsByTagName('head')[0];

      var style = document.createElement('style');
      style.type = 'text/css';
      style.id = 'RCEModsCSS';

      head.appendChild(style);

      function stickyToolbar() {
          //console.log('stickyToolbar() is running BEFORE setTimeout()');

        setTimeout(function() {
            if (!!$('.tox-toolbar-overlord').offset()) { // make sure ".tox-toolbar-overlord" element exists
              var containerTopOffset = $('.tox-editor-container').offset().top; // get offset the container
              var stickyTopOffset = $('.tox-toolbar-overlord').offset().top; // get offset of the sticky element
              //var stickyTopCss = parseInt($('.tox-toolbar-overlord').css('top'), 10); // get original top pixels set on the sticky element from css

                //console.log('stickyToolbar() is running DURING setTimeout()');
              $(window).scroll(function(){ // scroll event
                var windowTop = $(window).scrollTop(); // returns number
                if (stickyTopOffset < windowTop){
                  //$('.tox-toolbar-overlord').css({ top: (windowTop-containerTopOffset) }); // set new top value for the sticky element that would be the window offset minus the container's offset
                  $('.tox-toolbar-overlord').addClass('fixed-header');
                } else {
                  //$('.tox-toolbar-overlord').css({ top: 300 }); // restore the original top value of the sticky element
                   $('.tox-toolbar-overlord').removeClass('fixed-header');
                }
              });
            }
          }, 2000);
      }





      function RCEModsStyle(css){

          var D = document.getElementById('RCEModsCSS');
          D.append(css);

      }


      var RCEStickyToolbarCSSCode = `
      .fixed-header {
        position: fixed !important;
        top: 0 !important;
        width: auto !important;
        z-index: 9999999 !important;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2) !important;
        transform: translate(0, 0) !important;
        /*transition: all 2.3s ease; !important*/
    }

    .fixed-header > div {
        border-bottom-left-radius: 3px !important;
        border-bottom-right-radius: 3px !important;
    }`;



        if (typeof config.RCEStickyToolbarCSS !== 'undefined' && !config.RCEStickyToolbarCSS) {
            return;
          } else {
            RCEModsStyle(RCEStickyToolbarCSSCode);
          }

        if (typeof config.addStickyToolbar !== 'undefined' && !config.addStickyToolbar) {
          return;
        } else {
          stickyToolbar();
        }


    }
  }

  if (typeof RCEMods !== 'function') {
    const script = document.createElement('script');
    script.src = 'https://gitcdn.xyz/repo/dslusser/PalcsUI-Canvancement/master/install/rce-ui.user.js';
    script.onload = function() {
      RCEMods(config);
      //console.log('Missing function, loading fallback script.');
    };
    document.head.appendChild(script);
  }
  else {
    RCEMods(config);
    //console.log('Function has been loaded properly.');
  }


  //RCEMods(config);

})();