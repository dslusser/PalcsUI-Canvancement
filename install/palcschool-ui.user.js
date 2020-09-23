// ==UserScript==
// @name        PalcschoolUI Canvancement
// @namespace   https://github.com/dslusser/PalcsUI-Canvancement
// @description User enhancements for the Palcschool instance
// @include     https://*.palcschool.org/*
// @include     https://*palcschool.org/*
// @noframes
// @version     1.04
// @grant       none
// ==/UserScript==
(function () {
  'use strict';


  // removeNewTabs aggressively removes the "open in new tab" UI/UX
  // that is currently in Palcschool. Turn it on by setting the
  // value to true. Turn it off by setting it to false.

  // dashboardWidthCSS somewhat fixes the scrolling issues on
  // the Palcschool teacher dashboard. Turn it on by setting the
  // value to true. Turn it off by setting it to false.

  // canvasBulkMessageCSS somewhat fixes the scrolling issues on
  // the Palcschool Canvas Bulk Message page. Turn it on by setting the
  // value to true. Turn it off by setting it to false.

  // addPwrSchoolNavigation adds a PowerSchool navigation item to
  // the side navigation menu. Turn it on by setting the
  // value to true. Turn it off by setting it to false.

  // addByStudentRcLink adds the By Student tab to the RC Summary page


  var config = {
    // PalcschoolUI enhancements may be true or false
    'removeNewTabs': true,
    'dashboardWidthCSS': true,
    'canvasBulkMessageCSS': true,
    'addPwrSchoolNavigation': true,
    'addByStudentRcLink': true
  };






  // ************** Don't modify anything below this line ************** //



  //$(document).ready(function(){addCustomCSS();removeNewTabs();console.log('doc ready')});
  //console.log('we\'re live');
  var PalcschoolUI = function(config) {
      'use strict';
      if (typeof config === 'undefined') {

          config = {
              // PalcschoolUI enhancements may be true or false
              'removeNewTabs' : true,
              'addCustomCSS' : true,
              'dashboardWidthCSS' : true,
              'canvasBulkMessageCSS': true,
              'keyframesHolderCSS' : true,
              'addPwrSchoolNavigation' : true,
              'addByStudentRcLink' : true
          };
      };


      var isPalcschool = false;
      var D = document;

      if (/^.*\.palcschool\.org$/.test(window.location.host)) {
        isPalcschool = true;
        //console.log(isPalcschool + ', yes this is Palcschool domain');
        addCustomCSS();
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



    function addCustomCSS() {
      if (typeof config.addCustomCSS !== 'undefined' && !config.addCustomCSS) {
        return;
      }
      //console.log('addCustomCSS() is running');
      var head = document.getElementsByTagName('head')[0];

      var style = document.createElement('style');
      style.type = 'text/css';
      style.id = 'palcschoolUIcss';

      head.appendChild(style);

      //Globals for Speed Grader and pwrSchoolNav functions
      //var getURLArray = document.URL.split(/\?(.+)?/)[0];
      //var parseURL = getURLArray.split('/');
      //var speed_grader = parseURL[6];
      var header = document.getElementsByTagName('header')[0];

      function pwrSchoolNav() {

          if (header !== null && header !== undefined){
              var menu = document.getElementsByClassName('main-nav')[0].firstElementChild;

              //var menu = menu.firstElementChild;
              //console.log('PowerSchool navigation added');

              var menuPwrSchoolItem = document.createElement("li");
              menuPwrSchoolItem.className = "menu-item ic-app-header__menu-list-item";
              //declared animation fadeIn keyframes in keyframesHolderCSSCode variable
              menuPwrSchoolItem.style.animation = "fadeIn 150ms ease-in";

              var PwrSchoolLink = '\n  <a id=\"global_nav_pwrSchool_link\" href=\"https:\/\/palcs.powerschool.com\/admin\/home.html\" target=\"_blank\" class=\"ic-app-header__menu-list-link\">\n    <div class=\"menu-item-icon-container\" aria-hidden=\"true\">\n<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><title>icon-powerSchool</title><path fill=\"#ffffff\" d=\"M28.8,0H3.2A3.11,3.11,0,0,0,0,3V29a3.11,3.11,0,0,0,3.2,3H28.8A3.11,3.11,0,0,0,32,29V3A3.11,3.11,0,0,0,28.8,0ZM27.73,28H4.27V4H27.73ZM8.53,18H23.47v2H8.53Zm0,4H23.47v2H8.53ZM10.67,9a3.11,3.11,0,0,1,3.2-3,3.11,3.11,0,0,1,3.2,3,3.11,3.11,0,0,1-3.2,3A3.11,3.11,0,0,1,10.67,9ZM16,12H11.73c-1.76,0-3.2.9-3.2,2v2H19.2V14C19.2,12.9,17.76,12,16,12Z\"></path></svg>\n<span class=\"menu-item__badge\" style=\"display: none\">0</span>\n    </div>\n    <div class=\"menu-item__text\">\n      PowerSchool\n</div>\n  </a>\n';



              menuPwrSchoolItem.innerHTML = PwrSchoolLink;
              menu.appendChild(menuPwrSchoolItem);
          }
      }

    // POWERSCHOOL NAV @ https://palcs.powerschool.com/admin/home.html



      function addPalcschoolUiStyle(css){

          var D = document.getElementById('palcschoolUIcss');
          D.append(css);

      }


      var dashboardWidthCSSCode = `
      .chart-container {
        width: 100% !important;
      }`;

      var canvasBulkMessageCSSCode = `
      .check .columns.blk_message {
        columns: 2 !important;
      }`;

      var keyframesHolderCSSCode = `
      @-moz-keyframes fadeIn {
          0% {
          -webkit-opacity: 0;
          opacity: 0;
          }
          100% {
          -webkit-opacity: 1;
          opacity: 1;
          }
      }

      @-webkit-keyframes fadeIn {
          0% {
          -webkit-opacity: 0;
          opacity: 0;
          }
          100% {
          -webkit-opacity: 1;
          opacity: 1;
          }
      }

      @-ms-keyframes fadeIn {
          0% {
          -webkit-opacity: 0;
          opacity: 0;
          }
          100% {
          -webkit-opacity: 1;
          opacity: 1;
          }
      }

      @-o-keyframes fadeIn {
          0% {
          -webkit-opacity: 0;
          opacity: 0;
          }
          100% {
          -webkit-opacity: 1;
          opacity: 1;
          }
      }

      @keyframes fadeIn {
          0% {
          -webkit-opacity: 0;
          opacity: 0;
          }
          100% {
          -webkit-opacity: 1;
          opacity: 1;
          }
      }`;

      function addByStudentRcLink() {
        if (typeof config.addByStudentRcLink !== 'undefined' && !config.addByStudentRcLink) {
            return;
          } else {
            var getURLArray = document.URL.split(/\?(.+)?/)[0];
            var parseURL = getURLArray.split('/');
            var rc_summary = parseURL[7];
            var rc_entry = parseURL[7];

            var pCourseID = document.URL.split(/\=(.+)?/)[1];

            if (rc_summary == 'rc_summary.php') {

              var byStudentLink = `<a class="icon rce" href="https://www.palcschool.org/moodle/palcs20/dashboard/teacher/rc_entry_by_student.php?courseid=`+pCourseID+`">By Student</a>`;
      
              var pCaption = document.getElementsByTagName('caption')[0];
      
              pCaption.lastElementChild.lastElementChild.lastElementChild.innerHTML += byStudentLink;
      
          } else if (rc_entry == 'rc_entry.php') {

              if (document.getElementsByClassName('infomsg')[0]) {
      
                var gradingInfoMsg = document.getElementsByClassName('infomsg')[0].innerText;
                var infomsg = 'Grading not open for course.';
                //console.log('We\'re at RC Entry, By Period tab');
        
                if (gradingInfoMsg == infomsg && infomsg != 'undefined'){
        
                var byStudentLink2 = `<a class="icon rce" style="text-align:right;float:right;" href="https://www.palcschool.org/moodle/palcs20/dashboard/teacher/rc_entry_by_student.php?courseid=`+pCourseID+`">By Student</a>`;
        
                var gradingInfoMsg2 = document.getElementsByClassName('infomsg')[0];
        
                gradingInfoMsg2.innerHTML += byStudentLink2;
        
                }
              } else if (document.getElementsByClassName('infomsg')[0] == null && pCourseID) {

                var byStudentLink3 = `<a class="icon rce" href="https://www.palcschool.org/moodle/palcs20/dashboard/teacher/rc_entry_by_student.php?courseid=`+pCourseID+`">By Student</a>`;

                //console.log('Active and true');
      
                var pCaption3 = document.getElementsByTagName('caption')[0];

                pCaption3.lastElementChild.lastElementChild.lastElementChild.innerHTML += byStudentLink3;

              }
      
          }
        }
      }

      if (/^\/moodle\/palcs20\/dashboard\/teacher\/rc_summary\.php$/.test(window.location.pathname)) {
        //console.log('We\'re at RC Summary');
        addByStudentRcLink();
      }

      if (/^\/moodle\/palcs20\/dashboard\/teacher\/rc_entry\.php$/.test(window.location.pathname)) {
        //console.log('We\'re at RC Entry By Period');
        addByStudentRcLink();
      }


        if (typeof config.dashboardWidthCSS !== 'undefined' && !config.dashboardWidthCSS) {
          return;
        } else {
          addPalcschoolUiStyle(dashboardWidthCSSCode);
        }

        if (typeof config.canvasBulkMessageCSS !== 'undefined' && !config.canvasBulkMessageCSS) {
          return;
        } else {
          addPalcschoolUiStyle(canvasBulkMessageCSSCode);
        }

        if (typeof config.keyframesHolderCSS !== 'undefined' && !config.keyframesHolderCSS) {
          return;
        } else {
          addPalcschoolUiStyle(keyframesHolderCSSCode);
        }

        if (typeof config.addPwrSchoolNavigation !== 'undefined' && !config.addPwrSchoolNavigation) {
          return;
        } else {
          pwrSchoolNav();
        }


    }
  }

  if (typeof PalcschoolUI !== 'function') {
    const script = document.createElement('script');
    script.src = 'https://gitcdn.xyz/repo/dslusser/PalcsUI-Canvancement/master/install/palcschool-ui.user.js';
    script.onload = function() {
      PalcschoolUI(config);
      //console.log('Missing function, loading fallback script.');
    };
    document.head.appendChild(script);
  }
  else {
    PalcschoolUI(config);
    //console.log('Function has been loaded properly.');
  }


  //PalcschoolUI(config);

})();