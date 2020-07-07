// ==UserScript==
// @name        RCE UI Canvancements
// @author      Dan Slusser
// @namespace   https://github.com/dslusser/PalcsUI-Canvancement
// @description User enhancements for the Canvas Rich Content Editor
// @include     https://*.instructure.com/*
// @noframes
// @version     2.02
// @grant       none
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @updateURL     https://gitcdn.xyz/repo/dslusser/PalcsUI-Canvancement/master/install/rce-ui.user.js
// ==/UserScript==
(function () {
  'use strict';

  // Read the following descriptions that explain the config values.
  // The default config values are shown below and set to true.

  // addStickyToolbar makes the Canvas RCE Toolbar
  // stick to the top of the page when scrolled past.
  // Turn it on by setting the value to true.
  // Turn it off by setting the value to false.
  /**********/
  // RCEStickyToolbarCSS should be used in tandem with addStickyToolbar.
  // If one is set to true, the other should also be set to true.
  // Turn it on by setting the value to true.
  // Turn it off by setting the value to false.
  /**********/
  // addStickyRceHtml moves the Canvas RCE/HTML toggle button from the bottom toolbar
  // to the top toolbar, and makes it stick to the top of the page when scrolled past.
  // Turn it on by setting the value to true.
  // Turn it off by setting the value to false.
  /**********/
  // StickyRceHtmlCSS should be used in tandem with addStickyRceHtml.
  // If one is set to true, the other should also be set to true.
  // Turn it on by setting the value to true.
  // Turn it off by setting the value to false.
  /**********/
  // boxResizerCSS adjusts various display and text box sizes around Canvas.
  // If you don't like the adjustments, or they are conflicting with your institution's
  // display and text box sizes, turn this feature off.
  // Turn it on by setting the value to true.
  // Turn it off by setting the value to false.
  /**********/

  var config = {
      // RCEMods enhancements may be true or false
      'addStickyToolbar': true,
      'RCEStickyToolbarCSS': true,
      'addStickyRceHtml': true,
      'StickyRceHtmlCSS': true,
      'boxResizerCSS': true
  };






  // ************** Don't modify anything below this line ************** //



  //$(document).ready(function(){addCustomCSS();console.log('doc ready')});
  //console.log('we\'re live');
  var RCEMods = function (config) {
      'use strict';
      if (typeof config === 'undefined') {

          config = {
              // RCEMods default enhancements may be true or false
              'addCustomCSS': true,
              'RCEStickyToolbarCSS': true,
              'addStickyToolbar': true,
              'StickyRceHtmlCSS': true,
              'addStickyRceHtml': true,
              'boxResizerCSS': true
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

              setTimeout(function () {
                  if (!!$('.tox-toolbar-overlord').offset() && !$('#quiz_description').length) { // make sure ".tox-toolbar-overlord" element exists
                      var containerTopOffset = $('.tox-editor-container').offset().top; // get offset the container
                      var stickyTopOffset = $('.tox-toolbar-overlord').offset().top; // get offset of the sticky element
                      //var stickyTopCss = parseInt($('.tox-toolbar-overlord').css('top'), 10); // get original top pixels set on the sticky element from css

                      //console.log('stickyToolbar() is running DURING setTimeout()');
                      $(window).scroll(function () { // scroll event
                          var windowTop = $(window).scrollTop(); // returns number
                          if (stickyTopOffset < windowTop) {
                              //$('.tox-toolbar-overlord').css({ top: (windowTop-containerTopOffset) }); // set new top value for the sticky element that would be the window offset minus the container's offset
                              $('.tox-toolbar-overlord').addClass('fixed-header');
                          } else {
                              //$('.tox-toolbar-overlord').css({ top: 300 }); // restore the original top value of the sticky element
                              $('.tox-toolbar-overlord').removeClass('fixed-header');
                          }
                      });
                  } else if (!!$('.tox-toolbar-overlord').offset() && $('#quiz_description').length) { // make sure ".tox-toolbar-overlord" element exists
                      var containerTopOffsetQ = $('.tox-editor-container').offset().top; // get offset the container
                      var stickyTopOffsetQ = $('.tox-toolbar-overlord').offset().top; // get offset of the sticky element
                      //var stickyTopCss = parseInt($('.tox-toolbar-overlord').css('top'), 10); // get original top pixels set on the sticky element from css
                      var toolbarWidth = $('.tox-toolbar-overlord').width();
                      $('.tox-toolbar-overlord').css('max-width', toolbarWidth - 40); // fix overlapping of toolbar with sticky rce-html button

                      //console.log('stickyToolbar() is running DURING setTimeout()');
                      $(window).scroll(function () { // scroll event
                          var windowTop = $(window).scrollTop(); // returns number
                          if (stickyTopOffsetQ < windowTop) {
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

          function stickyRceHtml() {
              //console.log('stickyRceHtml() is running BEFORE setTimeout()');

              setTimeout(function () {
                  if (!!$('.tox-toolbar-overlord').offset() && !$('#quiz_description').length) { // make sure ".tox-toolbar-overlord" element exists


                      var rceHtmlButton = document.querySelectorAll(':scope [data-testid="RCEStatusBar"] [title="Switch to raw html editor"]')[0];
                      //rceHtmlButton.classList.add('.rce-html');
                      $(rceHtmlButton).addClass('rce-html');
                      var controlGroup = document.querySelectorAll('.rce-wrapper')[0];
                      controlGroup.prepend(rceHtmlButton);


                      var containerTopOffset2 = $('.rce-wrapper').offset().top; // get offset the container
                      var stickyTopOffset2 = $('.rce-html').offset().top; // get offset of the sticky element
                      //var stickyTopCss = parseInt($('.tox-toolbar-overlord').css('top'), 10); // get original top pixels set on the sticky element from css

                      //console.log('stickyRceHtml() is running DURING setTimeout()');
                      $(window).scroll(function () { // scroll event
                          var windowTop = $(window).scrollTop(); // returns number
                          if (stickyTopOffset2 < windowTop) {
                              //$('.rce-html').css({ top: (windowTop-containerTopOffset) }); // set new top value for the sticky element that would be the window offset minus the container's offset
                              $('.rce-html').addClass('sticky-rce-html');
                          } else {
                              //$('.rce-html').css({ top: 300 }); // restore the original top value of the sticky element
                              $('.rce-html').removeClass('sticky-rce-html');
                          }
                      });
                  } else if (!!$('.tox-toolbar-overlord').offset() && $('#quiz_description').length) { // make sure ".tox-toolbar-overlord" element exists


                  var rceHtmlButton2Q = document.querySelectorAll(':scope [data-testid="RCEStatusBar"] [title="Switch to raw html editor"]')[0];
                  //rceHtmlButton.classList.add('.rce-html');
                  $(rceHtmlButton2Q).addClass('rce-html');
                  var controlGroup2Q = document.querySelectorAll('.rce-wrapper')[0];
                  controlGroup2Q.prepend(rceHtmlButton2Q);
                  var toolbarWidth2Q = $('.tox-toolbar-overlord').width();
                      $('.tox-toolbar-overlord').css('max-width', toolbarWidth2Q - 40); // fix overlapping of toolbar with sticky rce-html button



                  var containerTopOffset2Q = $('.rce-wrapper').offset().top; // get offset the container
                  var stickyTopOffset2Q = $('.rce-html').offset().top; // get offset of the sticky element
                  //var stickyTopCss = parseInt($('.tox-toolbar-overlord').css('top'), 10); // get original top pixels set on the sticky element from css

                  //console.log('stickyRceHtml() is running DURING setTimeout()');
                  $(window).scroll(function () { // scroll event
                      var windowTop = $(window).scrollTop(); // returns number
                      if (stickyTopOffset2Q < windowTop) {
                          //$('.rce-html').css({ top: (windowTop-containerTopOffset) }); // set new top value for the sticky element that would be the window offset minus the container's offset
                          $('.rce-html').addClass('sticky-rce-html');
                          $('.rce-html').addClass('fixed-sticky-rce-html');
                      } else {
                          //$('.rce-html').css({ top: 300 }); // restore the original top value of the sticky element
                          $('.rce-html').removeClass('sticky-rce-html');
                          $('.rce-html').removeClass('fixed-sticky-rce-html');
                      }
                  });
              }
              }, 2000);
          }





          function RCEModsStyle(css) {

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
      border-bottom-left-radius: 3px !important;
      border-bottom-right-radius: 3px !important;
    }

    .fixed-header > div {
      border-bottom-left-radius: 3px !important;
      border-bottom-right-radius: 3px !important;
    }
    `;

          var StickyRceHtmlCSSCode = `
    .rce-html {
      float: right !important;
      position: sticky !important;
      position: -webkit-sticky !important; /* Safari */
      top: 0 !important;
      z-index: 999999999 !important;
      background: #fff !important;
      color: #222f3e !important;
    }

    .rce-html:hover {
      background: #f2f2f2 !important;
    }

    .rce-html:active {
      background: #fff !important;
      box-shadow: inset 0px 0px 6px 0px rgba(0, 0, 0, 0.2) !important;
    }

    .sticky-rce-html {
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2) !important; /* set to only display after sticky scroll */
      border-bottom-left-radius: 3px !important; /* set to only display after sticky scroll */
      border-bottom-right-radius: 3px !important; /* set to only display after sticky scroll */
      border-top-left-radius: unset !important; /* set to only display after sticky scroll */
      border-top-right-radius: unset !important; /* set to only display after sticky scroll */
    }

    .fixed-sticky-rce-html {
      position: fixed !important;
      top: 0 !important;
      right: 60px !important;
    }
   `;

          var boxResizerCSSCode = `
    #assignment_description {
        min-height: 600px !important;
    }

    #assignment_description_ifr {
        min-height: 600px !important;
    }

    #quiz_description {
        min-height: 600px !important;
        width: 100% !important;
    }

    #quiz_description_ifr {
        min-height: 600px !important;
    }

    #quiz_options_form {
        padding-right: 20px !important;
    }

    #speed_grader_comment_textarea {
        min-height: 150px !important;
        overflow-y: scroll !important;
    }

    #wiki_page_body {
        min-height: 600px !important;
    }

    #wiki_page_body_ifr {
        min-height: 600px !important;
    }

    .quiz_comment {
        height: 150px !important;
        width: 75% !important;
    }

    .quiz_comment textarea {
        height: 100px !important;
        width: 97% !important;
    }

    div.description.user_content.teacher-version.enhanced {
        height: auto !important;
    }

    iframe[id^="discussion-topic-message"][id*="_ifr"] {
        min-height: 600px !important;
    }

    iframe[id^="editor-toggle-"][id*="_ifr"] {
        min-height: 600px !important;
    }

    textarea[id^="discussion-topic-message"] {
        min-height: 600px !important;
    }

    textarea[id^="editor-toggle-"] {
        min-height: 600px !important;
    }

    #courses_list .unstyled_list.context_list {
      max-height: inherit !important;
    }
    `;




          /*if (typeof config.RCEStickyToolbarCSS !== 'undefined' && !config.RCEStickyToolbarCSS) {
              return;
            } else {
              RCEModsStyle(RCEStickyToolbarCSSCode);
            }

          if (typeof config.StickyRceHtmlCSS !== 'undefined' && !config.StickyRceHtmlCSS) {
              return;
            } else {
              RCEModsStyle(StickyRceHtmlCSSCode);
            }

          if (typeof config.addStickyToolbar !== 'undefined' && !config.addStickyToolbar) {
            return;
          } else {
            stickyToolbar();
          }

          if (typeof config.addStickyRceHtml !== 'undefined' && !config.addStickyRceHtml) {
            return;
          } else {
            stickyRceHtml();
          }*/


          if (typeof config.RCEStickyToolbarCSS !== 'undefined' && !!config.RCEStickyToolbarCSS) {
              //console.log('RCEStickyToolbarCSS is true, load RCEStickyToolbarCSSCode');
              RCEModsStyle(RCEStickyToolbarCSSCode);
          }

          if (typeof config.StickyRceHtmlCSS !== 'undefined' && !!config.StickyRceHtmlCSS) {
              //console.log('StickyRceHtmlCSS is true, load StickyRceHtmlCSSCode');
              RCEModsStyle(StickyRceHtmlCSSCode);
          }

          if (typeof config.boxResizerCSS !== 'undefined' && !!config.boxResizerCSS) {
              //console.log('boxResizerCSS is true, load boxResizerCSSCode');
              RCEModsStyle(boxResizerCSSCode);
          }

          if (typeof config.addStickyToolbar !== 'undefined' && !!config.addStickyToolbar) {
              //console.log('addStickyToolbar is true, load stickyToolbar()');
              stickyToolbar();
          }

          if (typeof config.addStickyRceHtml !== 'undefined' && !!config.addStickyRceHtml) {
              //console.log('addStickyRceHtml is true, load stickyRceHtml()');
              stickyRceHtml();
          }


      }
  }

  if (typeof RCEMods !== 'function') {
      const script = document.createElement('script');
      script.src = 'https://gitcdn.xyz/repo/dslusser/PalcsUI-Canvancement/master/install/rce-ui.user.js';
      script.onload = function () {
          RCEMods(config);
          //console.log('Missing function, loading fallback script.');
      };
      document.head.appendChild(script);
  } else {
      RCEMods(config);
      //console.log('Function has been loaded properly.');
  }


  //RCEMods(config);

})();