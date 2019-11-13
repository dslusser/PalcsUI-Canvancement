/*
 * PalcsUI is a package that adds user enhancements for the Palcs Canvas instance
 *
 * It's inspiration comes from QuizWiz, a James Jones Canvancement 
 *
 * QuizWiz was co-developed by Avi Naiman and James Jones
 *
 * This is the engine that does all of the work, but should not be directly installed.
 * It is loaded by a separate user script that installed into Tampermonkey.
 *
 * See https://github.com/jamesjonesmath/canvancement/tree/master/quizzes/quizwiz
 * for more information about QuizWiz
 *
 * See https://github.com/dslusser/PalcsUI-Canvancement
 * for more information about PalcsUI
 */
var PalcsUI = function(config) {
  'use strict';
  if (typeof config === 'undefined') {
    /* Original default config from QuizWiz */
    /*config = {
      'methods' : {
        'unanswered' : 'autorun',
        'full_points' : 'disabled',
        'ma_allnone' : 'enabled',
        'ma_correct' : 'disabled',
        'ma_difference' : 'disabled',
        'fill_in_blanks' : 'disabled',
        'dropdowns' : 'disabled'
      },
      // Speed enhancements may be true or false
      'autoExpandComments' : true,
      'duplicateQuestionHeader' : true,
      'showButtonCounts' : true,
      'nextAfterUpdate' : true,
      'nextAfterComment' : true,
      'nextAfterRubric' : true,
      'nextRubricExpanded' : true
    };*/

    // Each regrading method has three possible options:
    // disabled -- do not use this method
    // enabled -- use this method
    // autorun -- use this method and automatically run it
    config = {
      'methods' : {
        'unanswered' : 'disabled',
        'full_points' : 'disabled',
        'ma_allnone' : 'disabled',
        'ma_correct' : 'disabled',
        'ma_difference' : 'disabled',
        'fill_in_blanks' : 'disabled',
        'dropdowns' : 'disabled'
      },
      // Speed enhancements may be true or false
      'autoExpandComments' : false,
      'duplicateQuestionHeader' : false,
      'showButtonCounts' : false,
      'nextAfterUpdate' : false,
      'nextAfterComment' : false,
      'nextAfterRubric' : false,
      'nextRubricExpanded' : false,
      'addGradePercentage' : true,
      'addCustomCSS' : true,
      'boxResizerCSS' : true,
      'hideGradebookTooltipCSS' : true,
      'keyframesHolderCSS' : true,
      'addMsisNavigation' : false,
      'addPalcschoolNavigation' : true
    };
  }

  var namespace = 'palcsui';
  var isSG = false;
  var isQuiz = document.body.classList.contains('quizzes');
  var isCanvas = false;
  var QT;
  var D = document;
  var advanceUser = false;
  var advanceSrc = false;
  var advanceRubric = false;

  if (/^.*\.instructure\.com$/.test(window.location.host)) {
    isCanvas = true;
    //console.log(isCanvas + ', yes this is canvas');
    addCustomCSS();
  } 

  if (/^\/courses\/[0-9]+\/gradebook\/speed_grader$/.test(window.location.pathname)) {
      //console.log('we are at speed_grader');
      addGradePercentage();
  } 
  

  /*try {
    if (/^\/courses\/[0-9]+\/gradebook\/speed_grader$/.test(window.location.pathname)) {
      isSG = true;
      addObservers();
      addNextComment();
      addNextRubric();
      addGradePercentage();
    } else if (/^\/courses\/[0-9]+\/quizzes\/[0-9]+\/history$/.test(window.location.pathname)) {
      isQuiz = true;
      quizFeatures();
    }
  } catch (e) {
    console.log(e);
  }*/
  

  function quizFeatures() {
    setupInterface();
    autoExpandComments();
    duplicateQuestionHeader();
    checkAutoRun();
  }

  function addObservers() {
    if (isSG) {
      updateObserver();
      commentObserver();
      rubricObserver();
      navigationObserver();
    }
    return;
  }

  function updateObserver() {
    // Watch for Update Scores or Save Rubric to finish
    if (!isSG) {
      return;
    }
    var install = false;
    var triggers = [ 'nextAfterUpdate', 'nextAfterRubric' ];
    for (var i = 0; i < triggers.length; i++) {
      if (typeof config[triggers[i]] !== 'undefined' && config[triggers[i]]) {
        install = true;
      }
    }
    if (install) {
      var src = document.getElementById('x_of_x_graded');
      if (!src) {
        return;
      }
      var observer = new MutationObserver(function() {
        if (advanceUser && advanceSrc) {
          nextUser();
        }
      });
      observer.observe(src, {
        'childList' : true
      });
    }
    return;
  }

  function updateAdvance(e) {
    e.preventDefault();
    if (isSG && typeof config.nextAfterUpdate !== 'undefined' && config.nextAfterUpdate) {
      if (typeof e.target.classList !== 'undefined') {
        if (e.target.classList.contains(namespace + '_next')) {
          advanceUser = true;
          advanceSrc = 'update';
        }
      }
    }
    D.getElementById('update_history_form').submit();
  }

  function commentObserver() {
    if (!isSG) {
      return;
    }
    // Check for autoAdvance on Comment Submission
    if (typeof config.nextAfterComment !== 'undefined' && config.nextAfterComment) {
      var src = document.getElementById('comments');
      if (!src) {
        return;
      }
      var observer = new MutationObserver(function(mutations) {
        var status = false;
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
              if (!mutation.addedNodes[i].classList.contains('draft')) {
                status = true;
              }
            }
          }
        });
        if (status && advanceUser) {
          nextUser();
        }
      });
      observer.observe(src, {
        'childList' : true
      });
    }
    return;
  }

  function addNextComment() {
    if (isSG && typeof config.nextAfterComment !== 'undefined' && config.nextAfterComment) {
      var btn = document.getElementById('comment_submit_button');
      if (btn) {
        var parent = btn.parentNode;
        if (parent) {
          var advance = advanceButton(commentAdvance, {
            'title' : 'Submit comment and advance to next user'
          });
          btn.title = 'Submit comment and stay on this user';
          parent.insertBefore(advance, btn.nextSibling);
        }
      }
    }
  }

  function commentAdvance() {
    var comment = document.getElementById('speed_grader_comment_textarea') || document.getElementById('speedgrader_comment_textarea');
    if (!comment || comment.value.trim().length === 0) {
      advanceUser = true;
      advanceSrc = false;
      nextUser();
      return;
    }
    var btn = document.getElementById('comment_submit_button');
    if (btn) {
      advanceUser = true;
      advanceSrc = 'comment';
      btn.dispatchEvent(new Event('click', {
        'bubbles' : true
      }));
    }
  }

  // Rubrics
  function rubricObserver() {
    if (!isSG) {
      return;
    }
    // Needed if expanding after autoAdvance
    var install = true;
    var triggers = [ 'nextAfterRubric', 'nextRubricExpanded' ];
    for (var i = 0; i < triggers.length; i++) {
      if (typeof config[triggers[i]] === 'undefined' || !config[triggers[i]]) {
        install = false;
      }
    }
    // Watch for for visibility on rubric to change to be none
    if (install) {
      var src = document.getElementById('rubric_full');
      if (!src) {
        return;
      }
      var observer = new MutationObserver(function() {
        if (advanceRubric) {
          var src = document.getElementById('rubric_full');
          if (typeof src.style.display !== 'undefined' && src.style.display === 'none') {
            showRubric();
          }
        }
      });
      observer.observe(src, {
        'attributes' : true,
      });
    }
  }

  function addNextRubric() {
    if (isSG && typeof config.nextAfterRubric !== 'undefined' && config.nextAfterRubric) {
      var btn = document.querySelector('div#rubric_holder button.save_rubric_button');
      if (btn) {
        var parent = btn.parentNode;
        if (parent) {
          var advance = advanceButton(rubricAdvance, {
            'title' : 'Save rubric and advance to next user'
          });
          btn.title = 'Save rubric and stay on this user';
          advance.style.marginLeft = '3px';
          parent.insertBefore(advance, btn.nextSibling);
        }
      }
    }
  }

  function rubricAdvance() {
    var btn = document.querySelector('div#rubric_holder button.save_rubric_button');
    if (btn) {
      advanceUser = true;
      advanceSrc = 'rubric';
      btn.dispatchEvent(new Event('click', {
        'bubbles' : true
      }));
    }
  }

  function advanceButton(f, options) {
    var advance = D.createElement('button');
    advance.type = 'button';
    advance.classList.add('btn', 'btn-primary', namespace + '_next');
    if (typeof options.size !== 'undefined' && options.size) {
      advance.classList.add('btn-' + options.size);
    }
    if (typeof options.title !== 'undefined' && options.title) {
      advance.title = options.title;
    }
    // var text = D.createTextNode('&');
    // advance.appendChild(text);
    var icon = D.createElement('i');
    icon.classList.add('icon-mini-arrow-right', namespace + '_next');
    advance.style.paddingLeft = '1px';
    advance.style.paddingRight = '1px';
    advance.appendChild(icon);
    advance.addEventListener('click', f);
    return advance;
  }

  function nextUser() {
    var next = false;
    if (isSG && advanceUser) {
      next = document.getElementById('next-student-button');
      advanceUser = false;
      if (next) {
        next.dispatchEvent(new Event('click', {
          'bubbles' : true
        }));
      }
    }
  }

  function navigationObserver() {
    if (!isSG) {
      return;
    }
    var src = document.getElementById('x_of_x_students_frd');
    var observer = new MutationObserver(function() {
      switch (advanceSrc) {
      case 'rubric':
        if (typeof config.nextRubricExpanded !== 'undefined' && config.nextRubricExpanded) {
          openRubric();
        }
        break;
      }
      advanceSrc = false;
    });
    observer.observe(src, {
      'childList' : true
    });
    var iframeHolder = document.getElementById('iframe_holder');
    if (iframeHolder) {
      var iframeObserver = new MutationObserver(function() {
        var iframe = document.getElementById('speedgrader_iframe');
        iframe.addEventListener('load', iframeLoaded, false);
      });
      iframeObserver.observe(iframeHolder, {
        'childList' : true
      });
    }
  }

  function openRubric() {
    if (!isSG) {
      return;
    }
    advanceRubric = true;
    var rubric = document.getElementById('rubric_full');
    if (rubric.style.display === 'none') {
      showRubric();
    }
    return;
  }

  function showRubric() {
    if (!isSG || !advanceRubric) {
      return;
    }
    advanceRubric = false;
    var btn = document.querySelector('#rubric_assessments_list_and_edit_button_holder button.toggle_full_rubric');
    if (btn) {
      btn.dispatchEvent(new Event('click', {
        'bubbles' : true
      }));
    }
  }

  function iframeLoaded(e) {
    try {
      var frame = e.target.contentDocument;
      if (isQuiz || frame.body.classList.contains('quizzes')) {
        D = frame;
        isQuiz = true;
        quizFeatures();
      }
    } catch (err) {
      // non-quiz content is loaded from a different domain and throws an error
    }
  }

  function checkAutoRun() {
    var hasAutorun = false;
    for ( var key in config.methods) {
      if (config.methods.hasOwnProperty(key)) {
        if (config.methods[key].toLowerCase() === 'autorun') {
          var e = D.getElementById(namespace + '_' + key);
          if (e) {
            hasAutorun = true;
            break;
          }
        }
      }
    }
    if (!hasAutorun) {
      return;
    }
    var j = D.querySelectorAll('#questions .enhanced');
    if (j.length > 0) {
      autoRun();
    } else {
      var observer = new MutationObserver(function() {
        j = D.querySelectorAll('#questions .enhanced');
        if (j.length > 0) {
          this.disconnect();
          autoRun();
        }
      });
      observer.observe(D.getElementById('questions'), {
        'attributes' : true,
        'subtree' : true
      });
    }
  }

  function autoRun() {
    for ( var key in config.methods) {
      if (config.methods.hasOwnProperty(key)) {
        if (config.methods[key].toLowerCase() === 'autorun') {
          var e = D.getElementById(namespace + '_' + key);
          if (e) {
            e.dispatchEvent(new Event('click', {
              'bubbles' : true
            }));
          }
        }
      }
    }
  }





/************************************* */
/* DWS Enhancements */

function addGradePercentage() {
    if (typeof config.addGradePercentage !== 'undefined' && !config.addGradePercentage) {
      return;
    }
    //console.log('addGradePercentage() is running');
    
    $(document).ajaxStop(function () { 
      //var students_selectmenu = document.getElementById("students_selectmenu");
    //students_selectmenu.addEventListener("change", showGradePercentage);
      showGradePercentage();
      
  });
  
  //Globals for Speed Grader and msisNav functions
  var getURLArray = document.URL.split(/\?(.+)?/)[0];
  var parseURL = getURLArray.split('/');
  var speed_grader = parseURL[6];
  var header = document.getElementById('header');
  
  $(document).ready(function(){setupPercentContainers();});
  window.onload = showGradePercentage();
  //window.onload = setupPercentContainers();
  //$(window).on('load', setupPercentContainers);
  //$(document).ready(function(){setupPercentContainers()});
  //$(window).on( "load", function() { showGradePercentage(); });
  //$('#update_history_form').on( 'submit', function() { setTimeout(function(){showGradePercentage();},2000) });
  //$('#students_selectmenu').on( 'keyup blur keypress change', showGradePercentage);
  //$("body").on('DOMSubtreeModified', "#x_of_x_students_frd", function() {console.log('changed') });
  
  function setupPercentContainers() {
  
      if (speed_grader == 'speed_grader') {
  
          var pointValue = document.createElement('div');
          pointValue.id = 'pointValue';
          
          //Commented out next 2 lines because of how Chrome now auto-suggests
          //form field values...it was covering up the grade percentage - moved it
          //to var grading_box_points_possible which is above grading box now.
          //var grade_container = document.getElementById('grade_container');
          //grade_container.appendChild(pointValue);

          var grading_box_points_possible = document.getElementById('grading-box-points-possible');
          grading_box_points_possible.appendChild(pointValue);
  
          var pointPercentNumber = document.createElement('span');
          pointPercentNumber.id = 'pointPercentNumber';        
          pointPercentNumber.innerHTML = '';
  
          pointValue.appendChild(pointPercentNumber);
  
          //var gradingBoxExtended = document.getElementById("grading-box-extended");
          //gradingBoxExtended.addEventListener("change", showGradePercentage);
          
          //var students_selectmenu = document.getElementById("students_selectmenu");
      //students_selectmenu.addEventListener("change", showGradePercentage);
      
      //$('#students_selectmenu').on( 'keyup blur keypress change click mousedown', showGradePercentage);
      
      $('#grading-box-extended').on('keyup blur keypress change', showGradePercentage);
      $('#next-student-button').on('click mousedown', showGradePercentage);
      $('#prev-student-button').on('click mousedown', showGradePercentage);
      }
  }
  
  function showGradePercentage() {
  
      if (speed_grader == 'speed_grader') {
  
          var studentGrade = parseFloat(document.getElementById('grading-box-extended').value, 10);
          var assignmentValue = parseFloat(document.getElementById('grade_container').innerText.split(/(\d+)/g)[1], 10);
          var rawGradePercent = studentGrade / assignmentValue;
          var gradePercent = (rawGradePercent * 100).toFixed(2) + ' %';
          
          if (isNaN(rawGradePercent)) {
  
              pointPercentNumber.innerHTML = '0 %';
  
          } else {
              
          pointPercentNumber.innerHTML = gradePercent;
  
          }
      }
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
  style.id = 'palcsUIcss';

  head.appendChild(style);

  //Globals for Speed Grader and msisNav functions
  //var getURLArray = document.URL.split(/\?(.+)?/)[0];
  //var parseURL = getURLArray.split('/');
  //var speed_grader = parseURL[6];
  var header = document.getElementById('header');

  function msisNav() {
    
    if (header !== null){
        var menu = document.getElementById('menu');

        var menuMsisItem = document.createElement("li");
        menuMsisItem.className = "menu-item ic-app-header__menu-list-item";
        //declared animation fadeIn keyframes in keyframesHolderCSSCode variable
        menuMsisItem.style.animation = "fadeIn 150ms ease-in";

        var msisNavLink = '\n  <a id=\"global_nav_msis_link\" href=\"https:\/\/www.palcschool.org\/moodle\/sis\/\" target=\"_blank\" class=\"ic-app-header__menu-list-link\">\n    <div class=\"menu-item-icon-container\" aria-hidden=\"true\">\n<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><title>MSIS</title><path fill=\"#ffffff\" d=\"M28.8,0H3.2A3.11,3.11,0,0,0,0,3V29a3.11,3.11,0,0,0,3.2,3H28.8A3.11,3.11,0,0,0,32,29V3A3.11,3.11,0,0,0,28.8,0ZM27.73,28H4.27V4H27.73ZM8.53,18H23.47v2H8.53Zm0,4H23.47v2H8.53ZM10.67,9a3.11,3.11,0,0,1,3.2-3,3.11,3.11,0,0,1,3.2,3,3.11,3.11,0,0,1-3.2,3A3.11,3.11,0,0,1,10.67,9ZM16,12H11.73c-1.76,0-3.2.9-3.2,2v2H19.2V14C19.2,12.9,17.76,12,16,12Z\"></path></svg>\n<span class=\"menu-item__badge\" style=\"display: none\">0</span>\n    </div>\n    <div class=\"menu-item__text\">\n      MSIS\n</div>\n  </a>\n';



        menuMsisItem.innerHTML = msisNavLink;
        menu.appendChild(menuMsisItem);
    }
  
  }

  function palcschoolNav() {
    
    if (header !== null){
        var menu = document.getElementById('menu');

        var menuPalcschoolItem = document.createElement("li");
        menuPalcschoolItem.className = "menu-item ic-app-header__menu-list-item";
        //declared animation fadeIn keyframes in keyframesHolderCSSCode variable
        menuPalcschoolItem.style.animation = "fadeIn 150ms ease-in";

        var palcschoolNavLink = '\n  <a id=\"global_nav_palcschool_link\" href=\"https:\/\/www.palcschool.org\" target=\"_blank\" class=\"ic-app-header__menu-list-link\">\n    <div class=\"menu-item-icon-container\" aria-hidden=\"true\">\n<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><title>Palcschool Lobby</title><path fill=\"#ffffff\" d=\"M28.8,0H3.2A3.11,3.11,0,0,0,0,3V29a3.11,3.11,0,0,0,3.2,3H28.8A3.11,3.11,0,0,0,32,29V3A3.11,3.11,0,0,0,28.8,0ZM27.73,28H4.27V4H27.73ZM8.53,18H23.47v2H8.53Zm0,4H23.47v2H8.53ZM10.67,9a3.11,3.11,0,0,1,3.2-3,3.11,3.11,0,0,1,3.2,3,3.11,3.11,0,0,1-3.2,3A3.11,3.11,0,0,1,10.67,9ZM16,12H11.73c-1.76,0-3.2.9-3.2,2v2H19.2V14C19.2,12.9,17.76,12,16,12Z\"></path></svg>\n<span class=\"menu-item__badge\" style=\"display: none\">0</span>\n    </div>\n    <div class=\"menu-item__text\">Palcschool Lobby</div>\n  </a>\n';



        menuPalcschoolItem.innerHTML = palcschoolNavLink;
        menu.appendChild(menuPalcschoolItem);
    }
  
  }

//TODO: ADD POWERSCHOOL NAV @ https://palcs.powerschool.com/admin/home.html

  

    function addPalcsuiStyle(css){

      var D = document.getElementById('palcsUIcss');
      D.append(css);

    }

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
  }`;

  var hideGradebookTooltipCSSCode = `
  .gradebook-tooltip {
    display: none !important;
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

    /*if (typeof config.boxResizerCSS !== 'undefined' && !config.boxResizerCSS) {
      return;
    } else {
      addPalcsuiStyle(boxResizerCSSCode);
    }

    if (typeof config.hideGradebookTooltipCSS !== 'undefined' && !config.hideGradebookTooltipCSS) {
      return;
    } else {
      addPalcsuiStyle(hideGradebookTooltipCSSCode);
    }

    if (typeof config.keyframesHolderCSS !== 'undefined' && !config.keyframesHolderCSS) {
      return;
    } else {
      addPalcsuiStyle(keyframesHolderCSSCode);
    }

    if (typeof config.addMsisNavigation !== 'undefined' && !config.addMsisNavigation) {
      return;
    } else {
      msisNav();
    }

    if (typeof config.addPalcschoolNavigation !== 'undefined' && !config.addPalcschoolNavigation) {
      return;
    } else {
      palcschoolNav();
    }*/




    if (typeof config.boxResizerCSS !== 'undefined' && !config.boxResizerCSS) {
      addPalcsuiStyle(boxResizerCSSCode);
    }

    if (typeof config.hideGradebookTooltipCSS !== 'undefined' && !config.hideGradebookTooltipCSS) {
      addPalcsuiStyle(hideGradebookTooltipCSSCode);
    }

    if (typeof config.keyframesHolderCSS !== 'undefined' && !config.keyframesHolderCSS) {
      addPalcsuiStyle(keyframesHolderCSSCode);
    }

    if (typeof config.addMsisNavigation !== 'undefined' && !config.addMsisNavigation) {
      msisNav();
    }

    if (typeof config.addPalcschoolNavigation !== 'undefined' && !config.addPalcschoolNavigation) {
      palcschoolNav();
    }

  

  



}




  /* END DWS Enhancements */
  /********************************* */

  function autoExpandComments() {
    if (typeof config.autoExpandComments !== 'undefined' && !config.autoExpandComments) {
      return;
    }
    var nodes = D.querySelectorAll('div#questions > div.question_holder > div.display_question > div.quiz_comment');
    for (var i = 0; i < nodes.length; i++) {
      var t = nodes[i].querySelector('textarea');
      if (t) {
        if (t.value.length > 0) {
          resizeComment(t);
        }
        t.addEventListener('input', watchComment, false);
        t.addEventListener('paste', pasteComment, false);
      }
    }
  }

  function pasteComment(e) {
    if (e.target.value.length === 0) {
      var divElement = e.target.parentNode;
      divElement.style.display = 'block';
      e.target.style.width = '98%';
    }
  }

  function watchComment(e) {
    if (e.target.value.length <= 1) {
      resizeComment(e.target);
    }
  }

  function resizeComment(e) {
    var divElement = e.parentNode;
    if (e.value.length > 0) {
      divElement.style.display = 'block';
      e.style.width = '98%';
    } else {
      divElement.style.display = 'inline-block';
      e.style.width = 'auto';
    }
  }

  function duplicateQuestionHeader() {
    if (typeof config.duplicateQuestionHeader !== 'undefined' && !config.duplicateQuestionHeader) {
      return;
    }
    var nodes = D.querySelectorAll('div#questions > div.question_holder > div.display_question > div.header');
    for (var i = 0; i < nodes.length; i++) {
      var original = nodes[i];
      var parent = original.parentNode;
      var commentNode = false;
      for (var j = parent.children.length - 1; j >= 0; j--) {
        if (parent.children[j].classList.contains('quiz_comment')) {
          commentNode = parent.children[j + 1];
          break;
        }
      }
      if (commentNode === false) {
        // Unable to find the quiz_comment class
        continue;
      }
      var duplicate = original.cloneNode(true);
      var existingStyles = window.getComputedStyle(original);
      var styles = [ 'Color', 'Style', 'Width' ];
      for (var k = 0; k < styles.length; k++) {
        var topStyle = 'borderTop' + styles[k];
        var bottomStyle = 'borderBottom' + styles[k];
        duplicate.style[topStyle] = existingStyles[bottomStyle];
        duplicate.style[bottomStyle] = existingStyles[topStyle];
      }
      var userPoints = duplicate.querySelector('div.user_points');
      userPoints.removeAttribute('class');
      var input = userPoints.querySelector('input.question_input');
      var originalInput = original.querySelector('div.user_points > input.question_input');
      input.addEventListener('change', userPointsUpdate, true);
      originalInput.addEventListener('change', userPointsUpdate, false);
      parent.insertBefore(duplicate, commentNode);
    }
  }

  function userPointsUpdate(e) {
    var name = e.target.name;
    var value = e.target.value;
    var parent = e.target.parentNode;
    var isPrimary = parent.classList.contains('user_points');
    if (isPrimary) {
      // This is a change to the primary value.
      // Change secondaries but don't propagate events
      var dsts = D.querySelectorAll('div.header div:not(.user_points) > input.question_input[name="' + name + '"]');
      for (var i = 0; i < dsts.length; i++) {
        if (dsts[i].value !== value) {
          dsts[i].value = value;
        }
      }
    } else {
      // This is a change to the secondary point.
      // Update the main one and trigger its events
      var dst = D.querySelector('div.header div.user_points > input.question_input[name="' + name + '"]');
      if (dst.value !== value) {
        dst.value = value;
        dst.dispatchEvent(new Event('change', {
          'bubbles' : true
        }));
      }
    }
  }

  function setupInterface() {
    var submission = D.getElementsByClassName('quiz-submission')[0];
    var ic = D.createElement('div');
    var icp = D.createElement('div');
    var ics = D.createElement('div');
    ic.classList.add('header-bar');
    icp.classList.add('header-bar-left');
    ics.classList.add('header-bar-right');
    var summaryNodes = submission.children;
    var nodelist = [];
    for ( var node in summaryNodes) {
      if (summaryNodes.hasOwnProperty(node)) {
        if (summaryNodes[node].classList.length > 0 && summaryNodes[node].classList.contains('alert')) {
          continue;
        }
        if (summaryNodes[node].id && summaryNodes[node].id == 'questions') {
          break;
        }
        nodelist.push(node);
      }
    }
    if (nodelist.length > 0) {
      var inserted = 0;
      for (var j = 0; j < nodelist.length; j++) {
        icp.appendChild(summaryNodes[nodelist[j] - inserted]);
        inserted++;
      }
    }
    ic.appendChild(icp);
    ic.appendChild(ics);
    var qdiv = D.getElementById('questions');
    submission.insertBefore(ic, qdiv);
    QT = new Question();
    var methods = QT.methods;
    var qtypes = scanQuiz();
    var wrapper, row, div, el;
    wrapper = D.createElement('div');
    wrapper.classList.add('header-group-right');
    var originalUpdate = D.querySelector('button.update-scores');
    var gbqCheck = D.getElementById('speed_update_scores_container');
    if (!gbqCheck) {
      row = D.createElement('div');
      row.classList.add('pull-right');
      row.style.display = 'block';
      row.style.verticalAlign = 'middle';
      // Duplicate Final Score Block
      var finalScores = D.getElementById('update_scores');
      var scoreText = finalScores.querySelector('b').textContent;
      var finalScoreOriginal = D.getElementById('after_fudge_points_total');
      div = D.createElement('div');
      div.style.display = 'inline-block';
      div.style.margin = '0px 2px 5px 5px';
      el = D.createElement('strong');
      el.textContent = scoreText;
      div.appendChild(el);
      var finalScore = finalScoreOriginal.cloneNode(true);
      finalScore.id = namespace + '_' + finalScore.id;
      finalScore.style.fontSize = '1em';
      finalScore.style.marginRight = '8px';
      div.appendChild(finalScore);
      row.appendChild(div);
      duplicateText(finalScoreOriginal);
      // Duplicate Fudge Points
      var fudgeOriginal = D.getElementById('fudge_points_entry');
      var fudge = fudgeOriginal.cloneNode(true);
      fudge.id = namespace + '_' + fudge.id;
      fudge.name = namespace + '_' + fudge.name;
      fudge.setAttribute('placeholder', '--');
      fudge.size = 3;
      fudge.style.width = '4em';
      fudge.style.padding = '2px';
      fudge.style.margin = '0px 2px';
      fudge.addEventListener('change', function(e) {
        var target = D.getElementById('fudge_points_entry');
        target.value = e.target.value;
        target.dispatchEvent(new Event('change', {
          'bubbles' : false
        }));
      });
      fudgeOriginal.addEventListener('change', function(e) {
        var target = D.getElementById(namespace + '_fudge_points_entry');
        target.value = e.target.value;
      });
      var fudgeLabel = D.createElement('label');
      fudgeLabel.htmlFor = fudge.id;
      fudgeLabel.textContent = 'Fudge Points';
      fudgeLabel.style.marginRight = '2px';
      row.appendChild(fudgeLabel);
      row.appendChild(fudge);
      // Duplicate Update Scores button
      var updateScore = originalUpdate.cloneNode(true);
      updateScore.classList.add('btn-small');
      updateScore.type = 'button';
      updateScore.addEventListener('click', updateAdvance);
      updateScore.style.marginLeft = '4px';
      row.appendChild(updateScore);
      if (isSG && typeof config.nextAfterUpdate !== 'undefined' && config.nextAfterUpdate) {
        updateScore.title = 'Update scores and stay on this user';
        var advance = advanceButton(updateAdvance, {
          'size' : 'small',
          'title' : 'Update scores and advance to the next user'
        });
        advance.style.marginLeft = '3px';
        row.appendChild(advance);
      }
      wrapper.appendChild(row);
    }
    row = D.createElement('div');
    row.classList.add('content-box-micro', 'pull-right');
    for ( var key in qtypes) {
      if (qtypes.hasOwnProperty(key) && qtypes[key] > 0) {
        row.appendChild(addFeatureButton(methods[key], qtypes[key]));
      }
    }
    if (row.children.length > 0) {
      wrapper.appendChild(row);
    }
    ics.appendChild(wrapper);
    if (isSG && typeof config.nextAfterUpdate !== 'undefined' && config.nextAfterUpdate) {
      var updateParent = originalUpdate.parentNode;
      if (updateParent) {
        var advance2 = advanceButton(updateAdvance, {
          'title' : 'Update scores and advance to the next user'
        });
        originalUpdate.title = 'Update scores and stay on this user';
        updateParent.appendChild(advance2);
      }
    }
  }

  function scanQuiz() {
    if (typeof QT === 'undefined') {
      QT = new Question();
    }
    var qtypes = {};
    var methods = QT.methods;
    var enabledTypes = [ 'enabled', 'autorun' ];
    for ( var key in methods) {
      if (methods.hasOwnProperty(key)) {
        if (typeof config.methods[key] !== 'undefined' && enabledTypes.indexOf(config.methods[key].toLowerCase()) > -1) {
          var isConflict = false;
          if (methods[key].conflicts !== false) {
            for (var k = 0; k < methods[key].conflicts.length; k++) {
              var conflict = methods[key].conflicts[k];
              if (typeof qtypes[conflict] !== 'undefined') {
                if (!isConflict) {
                  console.log('You have conflicting entries in your configuration.');
                }
                console.log('Method ' + key + ' conflicts with ' + conflict);
                isConflict = true;
              }
            }
          }
          if (!isConflict) {
            qtypes[key] = 0;
          }
        }
      }
    }
    var questions = D.querySelectorAll('#questions div.question_holder > div.question');
    for (key in qtypes) {
      if (qtypes.hasOwnProperty(key)) {
        var Q = new Question(key);
        if (typeof Q.check === 'function') {
          for (var i = 0; i < questions.length; i++) {
            if (Q.check(questions[i])) {
              qtypes[key]++;
            }
          }
        }
      }
    }
    return qtypes;
  }

  function addFeatureButton(method, n) {
    var el = D.createElement('button');
    el.type = 'button';
    el.id = namespace + '_' + method.method;
    el.classList.add('btn', 'btn-small');
    if (typeof config.showButtonCounts !== 'undefined' && config.showButtonCounts && typeof n !== 'undefined') {
      var badge = D.createElement('span');
      badge.classList.add('ic-badge');
      badge.textContent = n;
      badge.style.marginRight = '3px';
      el.appendChild(badge);
    }
    var txt = D.createTextNode(method.button ? method.button : method.text);
    el.appendChild(txt);
    if (typeof method.desc !== 'undefined' && method.desc) {
      el.title = method.desc;
    }
    el.style.marginLeft = '5px';
    el.addEventListener('click', process, false);
    return el;
  }

  function duplicateText(src) {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          for (var i = 0; i < mutation.addedNodes.length; i++) {
            var node = mutation.addedNodes[i];
            var dest = namespace + '_' + mutation.target.id;
            D.getElementById(dest).textContent = node.textContent;
          }
        }
      });
    });
    observer.observe(src, {
      'childList' : true
    });
  }

  function process(e) {
    var regex = new RegExp('^' + namespace + '_(.*)$');
    var match = regex.exec(e.target.id);
    if (!match) {
      return;
    }
    var key = match[1];
    var Q = new Question(key);
    var questions = D.querySelectorAll('div#questions > div.question_holder > div.question');
    for (var i = 0; i < questions.length; i++) {
      if (Q.check(questions[i])) {
        Q.apply(questions[i]);
      }
    }
    e.target.disabled = true;
  }

  function Question(method) {
    var methods = {
      'unanswered' : {
        'desc' : 'Assign 0 points to unanswered Essay questions and File Upload questions.',
        'text' : 'Unanswered',
        'enabled' : true,
        'check' : function(e) {
          var valid = false;
          if (e.classList.contains('file_upload_question') && e.classList.contains('unanswered') && this.score(e).value === '') {
            valid = true;
          }
          if (!valid && e.classList.contains('essay_question') && this.score(e).value === '') {
            var response = e.querySelector('div.quiz_response_text');
            if (response && response.innerHTML === '') {
              valid = true;
            }
          }
          if (valid) {
            this.contains = true;
          }
          return valid;
        },
        'apply' : function(e) {
          if (this.check(e)) {
            var possible = this.possible(e);
            if (typeof possible !== 'undefined') {
              this.update(e, 0);
            }
          }
        }
      },
      'full_points' : {
        'desc' : 'Assign full points to Essay questions and File Upload questions that were answered but have not yet been graded.',
        'text' : 'Full Points',
        'type' : 'essay_question',
        'allowUpdate' : false,
        'enabled' : true,
        'check' : function(e) {
          var valid = false;
          if (e.classList.contains('file_upload_question') && !e.classList.contains('unanswered') && this.score(e).value === '') {
            valid = true;
          }
          if (e.classList.contains(this.type) && this.score(e).value === '') {
            var response = e.querySelector('div.quiz_response_text');
            if (response && response.innerHTML !== '') {
              valid = true;
            }
          }
          if (valid) {
            this.contains = true;
          }
          return valid;
        },
        'apply' : function(e) {
          if (this.check(e)) {
            var possible = this.possible(e);
            if (typeof possible !== 'undefined') {
              this.update(e, possible);
            }
          }
        }
      },
      'ma_allnone' : {
        'desc' : 'All or nothing: Regrade Multiple Answers questions without partial credit; all items must be correctly answered to get any points.',
        'text' : 'MA All/None',
        'type' : 'multiple_answers_question',
        'allowUpdate' : true,
        'enabled' : true,
        'conflicts' : [ 'ma_correct', 'ma_difference', 'ma_bestdiff', 'ma_canvas' ],
        'check' : function(e) {
          var valid = false;
          if (e.classList.contains(this.type)) {
            var calc = this.rightwrong(e);
            if (Math.abs(calc.full - calc.current) > 0.005) {
              valid = true;
            }
          }
          if (valid) {
            this.contains = true;
          }
          return valid;
        },
        'apply' : function(e) {
          if (this.check(e)) {
            var calc = this.rightwrong(e);
            this.update(e, calc.full);
          }
        }
      },
      'ma_correct' : {
        'desc' : 'Partial credit: Regrade Multiple Answers questions by making each item worth the same amount of points. The points are assigned based on the percentage of items that are correctly answered.',
        'text' : 'MA Correct',
        'type' : 'multiple_answers_question',
        'allowUpdate' : true,
        'enabled' : true,
        'conflicts' : [ 'ma_allnone', 'ma_difference', 'ma_bestdiff', 'ma_canvas' ],
        'check' : function(e) {
          var valid = false;
          if (e.classList.contains(this.type)) {
            var calc = this.rightwrong(e);
            if (Math.abs(calc.partial - calc.current) > 0.005) {
              valid = true;
            }
          }
          if (valid) {
            this.contains = true;
          }
          return valid;
        },
        'apply' : function(e) {
          if (this.check(e)) {
            var calc = this.rightwrong(e);
            this.update(e, calc.partial);
          }
        }
      },
      'ma_difference' : {
        'desc' : 'Right minus wrong: Regrade Multiple Answers questions by taking the percentage of items that are correctly answered and subtracting the percentage of items that are incorrectly answered.',
        'text' : 'MA Difference',
        'type' : 'multiple_answers_question',
        'allowUpdate' : true,
        'enabled' : true,
        'conflicts' : [ 'ma_allnone', 'ma_correct', 'ma_bestdiff', 'ma_canvas' ],
        'check' : function(e) {
          var valid = false;
          if (e.classList.contains(this.type)) {
            var calc = this.rightwrong(e);
            if (Math.abs(calc.diff - calc.current) > 0.005) {
              valid = true;
            }
          }
          if (valid) {
            this.contains = true;
          }
          return valid;
        },
        'apply' : function(e) {
          if (this.check(e)) {
            var calc = this.rightwrong(e);
            this.update(e, calc.diff);
          }
        }
      },
      'ma_canvas' : {
        'desc' : 'Canvas: Restore the original score assigned by Canvas for Multiple Answers questions.',
        'text' : 'MS Canvas',
        'type' : 'multiple_answers_question',
        'allowUpdate' : true,
        'enabled' : false,
        'conflicts' : [ 'ma_allnone', 'ma_correct', 'ma_difference', 'ma_bestdiff' ],
        'check' : function(e) {
          var valid = false;
          if (e.classList.contains(this.type)) {
            var calc = this.rightwrong(e);
            if (Math.abs(calc.canvas - calc.current) > 0.005) {
              valid = true;
            }
          }
          if (valid) {
            this.contains = true;
          }
          return valid;
        },
        'apply' : function(e) {
          if (this.check(e)) {
            var calc = this.rightwrong(e);
            this.update(e, calc.canvas);
          }
        }
      },
      'ma_bestdiff' : {
        'desc' : 'Best difference: Regrade Multiple Answers questions by comparing the Canvas method to the Difference method and choosing the one that is greater on a question-by-question basis.',
        'text' : 'MA Best Diff',
        'type' : 'multiple_answers_question',
        'allowUpdate' : true,
        'enabled' : true,
        'conflicts' : [ 'ma_allnone', 'ma_correct', 'ma_difference', 'ma_canvas' ],
        'check' : function(e) {
          var valid = false;
          if (e.classList.contains(this.type)) {
            var calc = this.rightwrong(e);
            if (Math.abs(calc.bestdiff - calc.current) > 0.005) {
              valid = true;
            }
          }
          if (valid) {
            this.contains = true;
          }
          return valid;
        },
        'apply' : function(e) {
          if (this.check(e)) {
            var calc = this.rightwrong(e);
            this.update(e, calc.best);
          }
        }
      },
      'fill_in_blanks' : {
        'desc' : 'All or nothing: Regrade Fill in Multiple Blanks questions without awarding partial credit; all items must be correctly answered to get any points.',
        'text' : 'Fill in Blanks',
        'type' : 'fill_in_multiple_blanks_question',
        'allowUpdate' : true,
        'enabled' : true,
        'check' : function(e) {
          var valid = false;
          if (e.classList.contains(this.type)) {
            var calc = this.rightwrong(e);
            if (Math.abs(calc.full - calc.current) > 0.005) {
              valid = true;
            }
          }
          if (valid) {
            this.contains = true;
          }
          return valid;
        },
        'apply' : function(e) {
          if (this.check(e)) {
            var calc = this.rightwrong(e);
            this.update(e, calc.full);
          }
        }
      },
      'dropdowns' : {
        'desc' : 'All or nothing: Regrade Multiple Dropdowns questions without awarding partial credit; all items must be correctly answered to get any points.',
        'text' : 'Dropdowns',
        'type' : 'multiple_dropdowns_question',
        'allowUpdate' : true,
        'enabled' : true,
        'check' : function(e) {
          var valid = false;
          if (e.classList.contains(this.type)) {
            var calc = this.rightwrong(e);
            if (Math.abs(calc.full - calc.current) > 0.005) {
              valid = true;
            }
          }
          if (valid) {
            this.contains = true;
          }
          return valid;
        },
        'apply' : function(e) {
          if (this.check(e)) {
            var calc = this.rightwrong(e);
            this.update(e, calc.full);
          }
        }
      }
    };
    if (typeof method !== 'undefined') {
      if (typeof methods[method] !== 'undefined') {
        for ( var p in methods[method]) {
          if (methods[method].hasOwnProperty(p)) {
            this[p] = methods[method][p];
          }
        }
        if (typeof (methods[method].type) !== 'undefined') {
          switch (methods[method].type) {
          case 'multiple_answers_question':
            this.rightwrong = function(e) {
              var total = e.querySelectorAll('div.answers div.answer').length;
              var totalCorrect = e.querySelectorAll('div.answers div.answer.correct_answer').length;
              var totalIncorrect = total - totalCorrect;
              var selectedCorrect = e.querySelectorAll('div.answers div.answer.selected_answer.correct_answer').length;
              var selectedIncorrect = e.querySelectorAll('div.answers div.answer.selected_answer.wrong_answer').length;
              var unselectedCorrect = totalCorrect - selectedCorrect;
              var unselectedIncorrect = totalIncorrect - selectedIncorrect;
              // var totalSelected = selectedCorrect + selectedIncorrect;
              var right = selectedCorrect + unselectedIncorrect;
              var wrong = unselectedCorrect + selectedIncorrect;
              var possible = +this.possible(e);
              var curscore = +this.score(e).value || 0;
              var diff = (right > wrong ? right - wrong : 0) * possible / total;
              var calc = {
                'n' : total,
                'right' : right,
                'wrong' : wrong,
                'full' : unselectedCorrect + selectedIncorrect > 0 ? 0 : possible,
                'partial' : possible * right / total,
                'canvas' : (selectedCorrect > selectedIncorrect ? selectedCorrect - selectedIncorrect : 0) * possible / totalCorrect,
                'diff' : diff,
                'current' : curscore
              };
              calc.bestdiff = Math.max(calc.canvas, calc.diff);
              calc.best = Math.max(calc.full, calc.partial, calc.canvas, calc.diff);
              return calc;
            };
            break;
          case 'fill_in_multiple_blanks_question':
          case 'multiple_dropdowns_question':
            this.rightwrong = function(e) {
              var total = e.querySelectorAll('div.answers > div.answer_group').length;
              var selectedCorrect = e.querySelectorAll('div.answers > div.answer_group > div.answer.selected_answer.correct_answer:not(.skipped)').length;
              var selectedIncorrect = e.querySelectorAll('div.answers > div.answer_group > div.answer.selected_answer.wrong_answer:not(.skipped)').length;
              var right = selectedCorrect;
              var wrong = total - selectedCorrect;
              var possible = +this.possible(e);
              var curscore = +this.score(e).value || 0;
              var calc = {
                'n' : total,
                'right' : right,
                'wrong' : wrong,
                'full' : wrong > 0 ? 0 : possible,
                'partial' : possible * right / total,
                'canvas' : possible * right / total,
                'diff' : (right > wrong ? right - wrong : 0) * possible / total,
                'current' : curscore,
                'unanswered' : total - selectedCorrect - selectedIncorrect
              };
              calc.best = Math.max(calc.full, calc.partial, calc.canvas, calc.diff);
              return calc;
            };
            break;
          }
        }
      }
    } else {
      var methodlist = {};
      for ( var m in methods) {
        if (methods.hasOwnProperty(m)) {
          methodlist[m] = {
            'method' : m,
            'type' : methods[m].type,
            'enabled' : methods[m].enabled,
            'text' : methods[m].text,
            'desc' : methods[m].desc,
            'conflicts' : typeof methods[m].conflicts !== 'undefined' ? methods[m].conflicts : false
          };
        }
      }
      this.methods = methodlist;
    }
    this.score = function(e) {
      return e.querySelector('div.user_points input.question_input');
    };
    this.answers = function(e) {
      return e.querySelector('div#answers div.answer');
    };
    this.possible = function(e) {
      var points;
      var pts = e.querySelector('div.user_points span.points.question_points').textContent;
      if (pts) {
        var match = /\/ ([0-9.]+)$/.exec(pts);
        if (match) {
          points = match[1];
        }
      }
      return points;
    };
    this.update = function(e, pts) {
      var score = this.score(e);
      if (pts !== score.value) {
        score.value = pts;
        this.updated = true;
        score.dispatchEvent(new Event('change', {
          'bubbles' : true
        }));
      }
    };
    this.contains = false;
    this.updated = false;
  }
};

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.returnExports = factory();
  }
}(this, function() {
  return PalcsUI;
}));