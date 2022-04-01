// ==UserScript==
// @name          PalcsUI : Standalone : BETA
// @author        Dan Slusser
// @namespace     https://github.com/dslusser/PalcsUI-Canvancement
// @description   User enhancements for the Palcs Canvas instance
// @include       https://*.instructure.com/courses/*/gradebook/speed_grader?*
// @include       https://*.instructure.com/courses/*/quizzes/*/history?*
// @include       https://*.instructure.com/*
// @noframes
// @version       5.2.17.01
// @grant         none
// @updateURL     https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcs-ui-standalone-beta.user.js
// @downloadURL   https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcs-ui-standalone-beta.user.js
// ==/UserScript==

(function() {
  'use strict';





  var config = {
    // PalcsUI enhancements may be true or false
    'autoExpandComments' : true,
    'duplicateQuestionHeader' : true,
    'showButtonCounts' : true,
    'nextAfterUpdate' : true,
    'nextAfterComment' : true,
    'nextAfterRubric' : true,
    'nextRubricExpanded' : true,
    'addGradePercentage' : true,
    'addSgStudentNameGreeting' : true,
    'awardFullPointsAndNext' : true,
    'adjustBrowserThemeColor' : true,
    'addSpecialGlobalNavLinks' : true,
    'addWhatIfScoresButton' : true,
    'addSpeedGraderSubmissionLinks' : true,
    'addPalcschoolProfileLinks' : true,
    'addGlobalPalcschoolProfileLinks' : true,
    'addCustomCSS' : true,
    'boxResizerCSS' : true,
    'adjustExternalToolBox' : true,
    'hideGradebookTooltipCSS' : true,
    'hideReadSpeakerButtonCSS' : true,
    'keyframesHolderCSS' : true,
    'addMsisNavigation' : false,
    'addPalcschoolNavigation' : true
  };



  // addGradePercentage adds a grade percent to the SpeedGrader
  // addSgStudentNameGreeting adds student and lesson name copy icons to the SpeedGrader
  // addSgStudentNameGreeting also adds [[StudentName]] and [[LessonName]] short codes to the SpeedGrader
  // awardFullPointsAndNext adds a button to SpeedGrader to award full points, submit comments, and move to the next student
  // adjustBrowserThemeColor updates Safari 15+ (and Chrome Android App) theming
  // addSpecialGlobalNavLinks adds announcements, modules, users, and grades links to each Courses global nav item
  // addWhatIfScoresButton adds a What If Scores button to the Student Grades Page
  // addSpeedGraderSubmissionLinks adds direct links to the SpeedGrader submission page for each assignment
  // addPalcschoolProfileLinks adds Palcschool Profile links to the People (aka. Users) Page
  // addGlobalPalcschoolProfileLinks adds Palcschool Profile links to the Global People (aka. Users) Page
  // boxResizerCSS adjusts the height of some of the small text boxes in Canvas
  // adjustExternalToolBox adjusts the height and width of the Assignment External Tool box
  // hideGradebookTooltipCSS hides the obtrusive tooltip in the Gradebook
  // hideReadSpeakerButtonCSS hides the ReadSpeaker button in Canvas
  // addMsisNavigation adds a direct link to MSIS in the Canvas global navigation menu
  // addPalcschoolNavigation adds a direct link to Palcschool in the Canvas global navigation menu
  // I suggest using only one nav menu link until/if I find a second icon :-)




/**************** Don't modify anything below this line *********************************/



/*
 * PalcsUI is a package that adds user enhancements for the Palcs Canvas instance
 *
 * It's inspiration comes from QuizWiz, a James Jones Canvancement
 *
 * QuizWiz was co-developed by Avi Naiman and James Jones
 *
 * This is the standalone script that does all of the work.
 * There is a different script that can pull from github automatically, which
 * allows for automatic updating...but leaves a wide open backdoor that I
 * don't particularly like.
 *
 * This script should be installed into Tampermonkey in order to function properly.
 *
 * See https://github.com/jamesjonesmath/canvancement/tree/master/quizzes/quizwiz
 * for more information about QuizWiz
 *
 * See https://github.com/dslusser/PalcsUI-Canvancement
 * for more information about PalcsUI
 */








  /* Original default config from QuizWiz */
  /*var config = {
    // Regrading methods may be 'disabled', 'enabled', or 'autorun'
    'methods' : {
      'unanswered' : 'autorun',
      'full_points' : 'enabled',
      'ma_allnone' : 'disabled',
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
      // disabled -- this method will not be used
      // enabled -- this method will be used
      // autorun -- this method will be automatically run


  // These configs are the fallback defaults if/when one or more are missing from var config.

  var PalcsUI = function(config) {
    'use strict';
    if (typeof config === 'undefined') {
      // Regrading methods may be 'disabled', 'enabled', or 'autorun'
      // Each regrading method has three possible options:
      // disabled -- this method will not be used
      // enabled -- this method will be used
      // autorun -- this method will be automatically run
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
        'autoExpandComments' : true,
        'duplicateQuestionHeader' : true,
        'showButtonCounts' : true,
        'nextAfterUpdate' : true,
        'nextAfterComment' : true,
        'nextAfterRubric' : true,
        'nextRubricExpanded' : true,
        'addGradePercentage' : true,
        'addSgStudentNameGreeting' : true,
        'awardFullPointsAndNext' : true,
        'adjustBrowserThemeColor' : true,
        'addSpecialGlobalNavLinks' : true,
        'addWhatIfScoresButton' : true,
        'addSpeedGraderSubmissionLinks' : true,
        'addPalcschoolProfileLinks' : true,
        'addGlobalPalcschoolProfileLinks' : true,
        'addCustomCSS' : true,
        'boxResizerCSS' : true,
        'adjustExternalToolBox' : true,
        'hideGradebookTooltipCSS' : true,
        'hideReadSpeakerButtonCSS' : true,
        'keyframesHolderCSS' : true,
        'addMsisNavigation' : false,
        'addPalcschoolNavigation' : true
      };
    }

    var namespace = 'palcsui';
    var LMSMSIS = 'moodle';
    var SISPlatform = 'palcschool';
    var SISPlatformVersion = 'palcs20';
    var EmailPlatform = 'palcsmail';
    var LMSPlatform = 'canvas';
    var isSG = false;
    var isQuiz = document.body.classList.contains('quizzes');
    var isCanvas = false;
    var isUsersPage = false;
    var isGlobalUsersPage = false;
    var QT;
    var D = document;
    var advanceUser = false;
    var advanceSrc = false;
    var advanceRubric = false;

    if (/^.*\.instructure\.com$/.test(window.location.host)) {
        isCanvas = true;
        //console.log(isCanvas + ', yes this is canvas');
        addCustomCSS();
        adjustExternalToolBox();
    }

    if (/palcs\.instructure\.com$/.test(window.location.host)) {
        isCanvas = true;
        //console.log(isCanvas + ', yes this is palcs canvas');
        adjustBrowserThemeColor();
        addSpecialGlobalNavLinks();
    }

    if (/^\/courses\/[0-9]+\/grades\/[0-9]+$/.test(window.location.pathname)) {
        //console.log('we are at student grades page');
        addWhatIfScoresButton();
        addSpeedGraderSubmissionLinks();
    }

    if (/^\/courses\/[0-9]+\/users$/.test(window.location.pathname)) {
        //console.log('we are at users page');
        isUsersPage = true;
        addPalcschoolProfileLinks();
    }

    if (/^\/accounts\/[0-9]+\/users$/.test(window.location.pathname)) {
        //console.log('we are at users page');
        isGlobalUsersPage = true;
        addGlobalPalcschoolProfileLinks();
    }

    if (/^\/courses\/[0-9]+\/gradebook\/speed_grader$/.test(window.location.pathname)) {
        //console.log('we are at speed_grader');
        isSG = true;
        addGradePercentage();
        addSgStudentNameGreeting();
        addAwardFullPointsAndNext();
    }

    // This try/catch gave issues on previous versions, if issues persist, comment out
    // and unfortunately remove the functionality it contains with it.
    // TODO: addGradePercentage() is commented out because we're loading it separately and
    // not enough testing was done with it here. Try it again when there is time and remove
    // the above declaration if it works as desired.
    try {
      if (/^\/courses\/[0-9]+\/gradebook\/speed_grader$/.test(window.location.pathname)) {
        isSG = true;
        addObservers();
        addNextComment();
        addNextRubric();
        //addGradePercentage();
        //addSgStudentNameGreeting();
      } else if (/^\/courses\/[0-9]+\/quizzes\/[0-9]+\/history$/.test(window.location.pathname)) {
        isQuiz = true;
        quizFeatures();
      }
    } catch (e) {
      console.log(e);
    }

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
        if (advanceSrc === 'rubric' && typeof config.nextRubricExpanded !== 'undefined' && config.nextRubricExpanded) {
          openRubric();
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
          if (iframe) {
            iframe.addEventListener('load', iframeLoaded, false);
          }
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
      var questionIdRegex = new RegExp('^question_([0-9]+)$');
      var questionId;
      var nodes = D.querySelectorAll('div#questions > div.question_holder > div.display_question > div.header');
      for (var i = 0; i < nodes.length; i++) {
        var original = nodes[i];
        var parent = original.parentNode;
        var questionIdMatch = questionIdRegex.exec(parent.id);
        if (!questionIdMatch) {
          continue;
        }
        questionId = questionIdMatch[1];
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
        var hidden = duplicate.querySelector('input.question_input_hidden');
        if (hidden) {
          hidden.remove();
        }
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
        input.name = 'x_question_score_' + questionId;
        var originalInput = original.querySelector('div.user_points > input.question_input');
        input.addEventListener('change', userPointsUpdate, true);
        originalInput.addEventListener('change', userPointsUpdate, false);
        parent.insertBefore(duplicate, commentNode);
      }
    }

    function userPointsUpdate(e) {
      var name = e.target.name;
      var value = e.target.value;
      var questionIdRegex = new RegExp('^(?:x_)?question_(?:score_)?([0-9]+)$');
      var questionId;
      var questionIdMatch;
      var dst;
      var hiddenInput;
      var parent;
      var dstName;
      parent = e.target.parentNode;
      var isPrimary = parent.classList.contains('user_points');
      if (isPrimary) {
        // This is a change to the primary value.
        // Change secondaries but don't propagate events
        hiddenInput = parent.querySelector('input.question_input_hidden');
        name = hiddenInput.name;
        value = hiddenInput.value;
        questionIdMatch = questionIdRegex.exec(name);
        if (questionIdMatch) {
          questionId = questionIdMatch[1];
          dstName = 'x_question_score_' + questionId;
          dst = D.querySelector('div.header div:not(.user_points) > input.question_input[name="' + dstName + '"]');
          if (dst) {
            if (dst.value !== value) {
              dst.value = value;
            }
          }
        }
      } else {
        // This is a change to the secondary point.
        // Update the main one and trigger its events
        questionIdMatch = questionIdRegex.exec(name);
        if (questionIdMatch) {
          questionId = questionIdMatch[1];
          dstName = 'question_score_' + questionId;
          hiddenInput = D.querySelector('div.header div.user_points > input.question_input_hidden[name="' + dstName + '"]');
          parent = hiddenInput.parentNode;
          dst = parent.querySelector('input.question_input');
          if (dst.value !== value) {
            dst.value = value;
            dst.dispatchEvent(new Event('change', {
              'bubbles' : true
            }));
          }
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







  /************************************* */
  /* DWS Enhancements */

  function adjustBrowserThemeColor() {
    if (typeof config.adjustBrowserThemeColor !== 'undefined' && !config.adjustBrowserThemeColor) {
      return;
    }
    //This function updates the browser theme to match palcs colors
    if (document.getElementsByName('theme-color')[0].getAttribute('content') == '#e66135'){
        document.getElementsByName('theme-color')[0].setAttribute('content', '#4a90e2')
    }
  }

  function addPalcschoolProfileLinks() {
    if (typeof config.addPalcschoolProfileLinks !== 'undefined' && !config.addPalcschoolProfileLinks) {
      return;
    }

    var getURLArray = document.URL.split(/\?(.+)?/)[0];
    var parseURL = getURLArray.split('/');
    var usersLink = parseURL[5];

    //console.log('addPalcschoolProfileLinks() is running')

    /*$(document).ready(function () {
        addThePSPLinksEvents();
    });*/ //ORG Working Design, but trying to remove JQuery, so commenting out for now ***

    // NEW way of loading without jQuery
    // https://dmitripavlutin.com/catch-the-xmlhttp-request-in-plain-javascript/
    // https://coderedirect.com/questions/140422/javascript-detect-ajax-requests
    // onreadystatechange

    // This is a unique alternative, and seems to be working, but perhaps not the best way to do it
    /*function r(f){/in/.test(document.readyState)?setTimeout(r,9,f):f()}
    r(function(){addThePSPLinksEvents();});*/

    // Collision with other loading scripts, so commenting out for now
    /*document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            setTimeout(function(){addThePSPLinks(); addThePSPLinksEvents();}, 5000);
            //addThePSPLinksEvents();
        }
    }*/

    // Load the functions without jQuery

    function mycallback() {
        setTimeout(function(){addThePSPLinks(); addThePSPLinksEvents();}, 5000);
    }
      //...
      (function() {
        if (window.addEventListener) {
          addEventListener("load", mycallback); //standard
        } else if (window.attachEvent) {
          attachEvent("onload", mycallback); //IE
        } else { //fallback method
          var oldCb = onload;
          onload = function() {
            if (oldCb) oldCb();
            mycallback();
          };
        }
    })();

    function addThePSPLinks(){

        // This function adds the Palcschool Profile Links to the page
        //console.log('addThePSPLinks() fired');

        document.querySelectorAll('.rosterUser.al-hover-container.StudentEnrollment td:nth-child(4)').forEach(function(element) {

            var a = element.getElementsByTagName('a')[0];

            if (element.contains(a)) {
                //console.log('contains a link already');
                return;
            } else if (!element.contains(a) && element.previousElementSibling.innerText.includes(`stu.${EmailPlatform}.org`)) {

                var sisID = element.innerText;
                //console.log(sisID)
                //console.log(element.innerHTML)

                var sisLink = `https://www.${SISPlatform}.org/${LMSMSIS}/${SISPlatformVersion}/students/profile/profile.php?sid=`
                sisLink += sisID;
                //console.log(sisLink);


                var sisIDLink = `<a href="${sisLink}" target="_blank" alt="Palcs Student Profile" title="Palcs Student Profile">${sisID}</a>`;
                //console.log(sisIDLink);

                element.innerHTML = sisIDLink;
            }


        });

    }


    function addThePSPLinksEvents(){
        //console.log('addThePSPLinksEvents() fired')

        var usersTable = document.querySelectorAll(`div[data-view="users"]`)[0];
        if (usersTable) {
            //console.log('usersTable is true')
            // If the mutationObserver is working properly, we don't need to add the EventListeners
            // If we find that the mutationObserver is not working properly, we will need to add the EventListeners as a backup
            // Leaving the EventListeners commented out for now
            /*['mouseover','ontouchstart','blur','focus'].forEach( evt =>
                usersTable.addEventListener(evt, addThePSPLinks, false)
              );*/
            //console.log('usersTable addEventListeners added');
            visibilityObserverLauncher();
            //console.log('visibilityObserverLauncher() has been launched');
            //console.log('addThePSPLinksEvents() called bc usersTable is true');
        }

        function visibilityObserverLauncher(){
            //console.log('visibilityObserverLauncher() fired')
            visibilityObserver();
        }

        function visibilityObserver(){

            const usersTableHeading = document.querySelectorAll(`div[data-view="users"] table thead`)[0];
            const usersTableDiv = document.querySelectorAll(`div[data-view="users"] table tbody`)[0];

            // The searchBox adds/removes a "loading" class each time a search is performed, or
            // a scroll activates more students to be dynamically loaded into the table.
            // We can use this behavior to determine each time new students are loaded into the table,
            // and then we can fire the addThePSPLinks() function which adds the Palcschool profile
            // links to the table.
            const searchBox = document.querySelectorAll(`input[name="search_term"]`)[0];
            //console.log('visibilityObserver() is executing');
            function testTableHeadings(){
                var result = false;
                //console.log('result = ' + result);
                if (usersTableHeading.innerText.includes('SIS ID')){
                    result = true;
                    //console.log('result = ' + result);
                    //return false; //We found what we needed, no need to keep looping
                }
                //console.log('result is now = ' + result);
                return result;
            }
            testTableHeadings();

            // Callback function when changes occurs
            function callback(mutationsList, observer) {
                //console.log('callback() fired');

                if (testTableHeadings()) {
                    //console.log('testTableHeaderings() is true, Users table is present');

                    mutationsList.forEach(mutation => {
                        if (mutation.attributeName === 'class') {
                            addThePSPLinks();
                        }
                    })

                    // Normally we disconnect the observer, but we don't need to do that for this script
                    //observer.disconnect();
                }
            }
            // Create a new instance of MutationObserver with callback in params
            const observer = new MutationObserver(callback);

            // Setup configs -> Choose only one of these to avoid duplicate firing???
            // Tried subtree, nothing much changes
            const configs = {
                attributes: true
            };

            // When everything is ready, we just observe our target (usersTableDiv)
            observer.observe(searchBox, configs);
        }
    }
  }

  function addGlobalPalcschoolProfileLinks() {
    if (typeof config.addGlobalPalcschoolProfileLinks !== 'undefined' && !config.addGlobalPalcschoolProfileLinks) {
      return;
    }

    var getURLArray = document.URL.split(/\?(.+)?/)[0];
    var parseURL = getURLArray.split('/');
    var usersLink = parseURL[5];

    //console.log('addPalcschoolProfileLinks() is running')

    /*$(document).ready(function () {
        addTheGlobalPSPLinksEvents();
    });*/ //ORG Working Design, but trying to remove JQuery, so commenting out for now ***

    // NEW way of loading without jQuery
    // https://dmitripavlutin.com/catch-the-xmlhttp-request-in-plain-javascript/
    // https://coderedirect.com/questions/140422/javascript-detect-ajax-requests
    // onreadystatechange

    // This is a unique alternative, and seems to be working, but perhaps not the best way to do it
    /*function r(f){/in/.test(document.readyState)?setTimeout(r,9,f):f()}
    r(function(){addTheGlobalPSPLinksEvents();});*/

    // Collision with other loading scripts, so commenting out for now
    /*document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            setTimeout(function(){addTheGlobalPSPLinks(); addTheGlobalPSPLinksEvents();}, 5000);
            //addTheGlobalPSPLinksEvents();
        }
    }*/

    // Load the functions without jQuery

    function mycallback() {
        setTimeout(function(){addTheGlobalPSPLinks(); addTheGlobalPSPLinksEvents();}, 2000);
        // If 2000ms is too short, we can increase it to 3000ms
    }
      //...
      (function() {
        if (window.addEventListener) {
          addEventListener("load", mycallback); //standard
        } else if (window.attachEvent) {
          attachEvent("onload", mycallback); //IE
        } else { //fallback method
          var oldCb = onload;
          onload = function() {
            if (oldCb) oldCb();
            mycallback();
          };
        }
    })();

    function addTheGlobalPSPLinks(){

        // This function adds the Palcschool Profile Links to the page
        //console.log('addTheGlobalPSPLinks() fired');

        document.querySelectorAll('#content div table tbody tr td:nth-child(3)').forEach(function(element) {

            var a = element.getElementsByTagName('a')[0];

            if (element.contains(a)) {
                //console.log('contains a link already');
                return;
            } else if (!element.contains(a) && element.previousElementSibling.innerText.includes(`stu.${EmailPlatform}.org`)) {

                var sisID = element.innerText;
                //console.log(sisID)
                //console.log(element.innerHTML)

                var sisLink = `https://www.${SISPlatform}.org/${LMSMSIS}/${SISPlatformVersion}/students/profile/profile.php?sid=`
                sisLink += sisID;
                //console.log(sisLink);


                var sisIDLink = `<a href="${sisLink}" target="_blank" alt="Palcs Student Profile" title="Palcs Student Profile">${sisID}</a>`;
                //console.log(sisIDLink);

                element.innerHTML = sisIDLink;
            }


        });

    }


    function addTheGlobalPSPLinksEvents(){
        //console.log('addTheGlobalPSPLinksEvents() fired')

        var usersTable = document.querySelector('#content div table');
        if (usersTable) {
            //console.log('usersTable is true')
            // If the mutationObserver is working properly, we don't need to add the EventListeners
            // If we find that the mutationObserver is not working properly, we will need to add the EventListeners as a backup
            // Leaving the EventListeners commented out for now
            /*['mouseover','ontouchstart','blur','focus'].forEach( evt =>
                usersTable.addEventListener(evt, addTheGlobalPSPLinks, false)
              );*/
            //console.log('usersTable addEventListeners added');
            visibilityObserverLauncher();
            //console.log('visibilityObserverLauncher() has been launched');
            //console.log('addTheGlobalPSPLinksEvents() called bc usersTable is true');
        }

        function visibilityObserverLauncher(){
            //console.log('visibilityObserverLauncher() fired')
            visibilityObserver();
        }

        function visibilityObserver(){

            const usersTableHeading = document.querySelector('#content div table thead');
            const usersTableContainer = document.querySelector('#content');

            // The usersTableContainer adds/removes children each time a search is performed or the page is loaded.
            // We can use this behavior to determine each time new students are loaded into the table,
            // and then we can fire the addTheGlobalPSPLinks() function which adds the Palcschool profile
            // links to the table.
            //console.log('visibilityObserver() is executing');
            function testTableHeadings(){
                var result = false;
                //console.log('result = ' + result);
                if (usersTableHeading.innerText.includes('SIS ID')){
                    result = true;
                    //console.log('result = ' + result);
                    //return false; //We found what we needed, no need to keep looping
                }
                //console.log('result is now = ' + result);
                return result;
            }
            testTableHeadings();

            // Callback function when changes occurs
            function callback(mutationRecord, observer) {
                //console.log('callback() fired');

                if (testTableHeadings()) {
                    //console.log('testTableHeaderings() is true, Users table is present');

                    mutationRecord.forEach(mutation => {
                        if (mutation.type === 'childList') {
                            //console.log('table changed');
                            addTheGlobalPSPLinks();
                        }
                    })

                    // Normally we disconnect the observer, but we don't need to do that for this script
                    //observer.disconnect();
                }
            }
            // Create a new instance of MutationObserver with callback in params
            const observer = new MutationObserver(callback);

            // Setup configs -> Choose only one of these to avoid duplicate firing???
            // Tried subtree, nothing much changes
            const configs = {
                childList: true,
                subtree: true,
            };

            // When everything is ready, we just observe our target (usersTableDiv)
            observer.observe(usersTableContainer, configs);
        }
    }
  }

  function addSpecialGlobalNavLinks() {
    if (typeof config.addSpecialGlobalNavLinks !== 'undefined' && !config.addSpecialGlobalNavLinks) {
      return;
    }

    //console.log('addSpecialGlobalNavLinks() is running')

    /*$(document).ready(function () {
        addTheLinks();
    });*/ //ORG Working Design, but trying to remove JQuery, so commenting out for now ***

    // NEW way of loading without jQuery
    // UPDATE: No need for the document.onreadystatechange function here, we just need to check 
    // the document.readyState property to see if the page is loaded. See updated version below
    /*document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            addTheLinks();
        }
    }*/

    // UPDATE: No need for the document.onreadystatechange function here, we just need to check for 
    // the document.readyState status of interactive, or complete.
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        addTheLinks();
    }


    function addTheLinks(){
        //console.log('addTheLinks() fired')

        var coursesButton = document.querySelector('#global_nav_courses_link');
        if (coursesButton) {
            //console.log('coursesButton is true')
            coursesButton.addEventListener('click', visibilityObserverLauncher, false);
            //console.log('coursesButton addEventListener, click added')
            coursesButton.addEventListener('keydown', visibilityObserverLauncher, false);
            //console.log('coursesButton addEventListener, keydown added')
            coursesButton.addEventListener('ontouchstart', visibilityObserverLauncher, false);
            //console.log('coursesButton addEventListener, ontouchstart added')
            //$(document).ready(function(){addTheLinks();});
            //console.log('addTheLinks() called bc coursesButton is true');
        }

        function visibilityObserverLauncher(){
            visibilityObserver();
        }

        function visibilityObserver(){

            const navTray = document.querySelector('#nav-tray-portal');
            function testLinks(){
                var result = false;
                document.querySelectorAll('#nav-tray-portal .navigation-tray-container.courses-tray a').forEach(function(element) {
                    if (element.innerText.includes('All Courses')){
                        //console.log('All Courses link found, returning true');
                        result = true;
                        return false; //We found what we needed, no need to keep looping
                    }
                });
                return result;
            }

            // Callback function when changes occurs
            function callback(mutationRecord, observer) {

                if (testLinks()) {
                    //console.log('Courses global nav menu tray is open');
                    document.querySelectorAll('#nav-tray-portal .navigation-tray-container.courses-tray a').forEach(function(element) {
                        //console.log(element.href);
                        var getLinkArray = element.href.split('/');
                        var relativeLink = "/" + getLinkArray[3] + "/" + getLinkArray[4] + "/";

                        if (!relativeLink.includes('undefined')) {
                            //console.log(relativeLink);
                            //console.log(element);
                            var subLinkContainer = document.createElement('div');
                            var announcementsLink = document.createElement('a');
                            var modulesLink = document.createElement('a');
                            var usersLink = document.createElement('a');
                            var gradebookLink = document.createElement('a');

                            subLinkContainer.className = 'subLink_container';

                            announcementsLink.className = 'announcements_link';
                            announcementsLink.style.padding = '0px 0.5rem 0px 0px';
                            announcementsLink.innerHTML = `<i class="icon-announcement" aria-hidden="true"></i>`;
                            announcementsLink.href = relativeLink + 'announcements';

                            modulesLink.className = 'modules_link';
                            modulesLink.style.padding = '0px 0.5rem 0px 0px';
                            modulesLink.innerHTML = `<i class="icon-module" aria-hidden="true"></i>`;
                            modulesLink.href = relativeLink + 'modules';

                            usersLink.className = 'users_link';
                            usersLink.style.padding = '0px 0.5rem 0px 0px';
                            usersLink.innerHTML = `<i class="icon-user" aria-hidden="true"></i>`;
                            usersLink.href = relativeLink + 'users';

                            gradebookLink.className = 'gradebook_link';
                            gradebookLink.style.padding = '0px 0.5rem 0px 0px';
                            gradebookLink.innerHTML = `<i class="icon-gradebook" aria-hidden="true"></i>`;
                            gradebookLink.href = relativeLink + 'gradebook';

                            element.after(subLinkContainer);

                            subLinkContainer.appendChild(announcementsLink);

                            subLinkContainer.appendChild(modulesLink);

                            subLinkContainer.appendChild(usersLink);

                            subLinkContainer.appendChild(gradebookLink);

                            observer.disconnect();
                        } /*else {
                            console.log(element + ' link is partially undefined. This is probably the All Courses link')
                        }*/


                    });
                }
            }
            // Create a new instance of MutationObserver with callback in params
            const observer = new MutationObserver(callback);

            // Setup configs -> Choose only one of these to avoid duplicate firing???
            const configs = {
                subtree: true,
                childList: true
            };

            // When everything is ready, we just observe our target (navTray)
            observer.observe(navTray, configs);
        }
    }
  }

  function addWhatIfScoresButton() {
    if (typeof config.addWhatIfScoresButton !== 'undefined' && !config.addWhatIfScoresButton) {
      return;
    }
    // Create the teacherWhatIfContainer div and teacherWhatIfButton button elements
    var teacherWhatIfContainer = document.createElement('div');
    var teacherWhatIfButton = document.createElement('button');

    teacherWhatIfContainer.id = 'teacher-what-if';
    teacherWhatIfContainer.className = 'teacher_what_if';
    teacherWhatIfContainer.style.display = 'block';
    teacherWhatIfContainer.style.margin = '6px 0';

    teacherWhatIfButton.id = 'teacher_what_if_button';
    teacherWhatIfButton.className = 'Button';
    teacherWhatIfButton.innerHTML = 'Enable What-If Scores';


    // Get the studentGradesShowAll container
    var studentGradesShowAllContainer = document.querySelector('#student-grades-show-all');

    // Insert the teacherWhatIfContainer div and teacherWhatIfButton button elements
    studentGradesShowAllContainer.after(teacherWhatIfContainer);
    teacherWhatIfContainer.appendChild(teacherWhatIfButton);


    // Add event listener to the teacherWhatIfButton button
    teacherWhatIfButton.addEventListener('click', function() {
        if (teacherWhatIfButton.innerHTML === 'Enable What-If Scores') {
            teacherWhatIfButton.innerHTML = 'Disable What-If Scores';
            document.querySelector('#grades_summary').classList.toggle("editable");
            document.querySelectorAll(".assignment_score").forEach(function(element) {
                element.style.cursor = "pointer";
            });
        } else if (teacherWhatIfButton.innerHTML === 'Disable What-If Scores') {
            teacherWhatIfButton.innerHTML = 'Enable What-If Scores';
            document.querySelector('#grades_summary').classList.toggle("editable");
            document.querySelectorAll(".assignment_score").forEach(function(element) {
                element.style.cursor = "default";
            });
        }
    });
  }

  function addSpeedGraderSubmissionLinks() {
    if (typeof config.addSpeedGraderSubmissionLinks !== 'undefined' && !config.addSpeedGraderSubmissionLinks) {
      return;
    }

    // Define the studentAssignment variable
    var studentAssignment = document.getElementsByClassName('student_assignment');

    // Loop through the studentAssignment elements, adding the SpeedGrader submission links to each assignment instance
    for (var i=0; i<studentAssignment.length; i++) {
        if (studentAssignment[i].firstElementChild.firstElementChild !== null){
            //console.log('element exists ' + studentAssignment[i].firstElementChild.firstElementChild.href);
            //console.log('details ' + studentAssignment[i].lastElementChild);

            // Define the assignmentLink and assignmentLinkArray variables
            var assignmentLink = studentAssignment[i].firstElementChild.firstElementChild.href;
            var assignmentLinkArray = assignmentLink.split('/');

            // Build the speedGraderLink
            var speedGraderLink = window.location.origin + '/courses/' + assignmentLinkArray[4] + '/gradebook/speed_grader?assignment_id=' + assignmentLinkArray[6] + '&student_id=' + assignmentLinkArray[8];

            // Create the speedGraderContainer div and define its various attributes
            var speedGraderContainer = document.createElement('div');
            speedGraderContainer.className = 'speed_grader_container';
            speedGraderContainer.style.display = 'inline-block';
            speedGraderContainer.style.marginRight = '4px';
            speedGraderContainer.style.zIndex = '10';
            speedGraderContainer.innerHTML = '<a href="' + speedGraderLink + '" alt="Open Submission in SpeedGrader (New Window)" title="Open Submission in SpeedGrader (New Window)" target="_blank">' + '<i class="icon-gradebook" aria-hidden="true"></i>' + '</a>';
            //var speedGraderLink = document.createElement('a');

            // Insert the speedGraderContainer div into the studentAssignment container
            studentAssignment[i].lastElementChild.insertAdjacentElement('afterbegin', speedGraderContainer);
        }
    }
  }

  function addGradePercentage() {
    if (typeof config.addGradePercentage !== 'undefined' && !config.addGradePercentage) {
      return;
    }
    //console.log('addGradePercentage() is running');

    // This never gets called, so commenting it out for now ***
    /*$(document).ajaxStop(function () {
      //var students_selectmenu = document.getElementById("students_selectmenu");
    //students_selectmenu.addEventListener("change", showGradePercentage);
      showGradePercentage();
      console.log("ajax has stopped");

    });*/

  //Globals for Speed Grader and msisNav functions
  var getURLArray = document.URL.split(/\?(.+)?/)[0];
  var parseURL = getURLArray.split('/');
  var speed_grader = parseURL[6];
  var header = document.getElementById('header');
  var pointPercentNumberFired = false; //NEW for Debugging

  //$(document).ready(function(){setupPercentContainers();}); //ORG (and CURRENT) Working Design, *** trying to remove Jquery, so commenting this out for now ***
  //window.onload = setupPercentContainers(); //NEW kinda working design paired with above function (not currently using)
  //window.onload = showGradePercentage(); //ORG Working Design (not currently using)
  //$(document).ready(function(){showGradePercentage();}); //NEW (and CURRENT) Working Design paired with ORG setupPercentContainers(), *** trying to remove Jquery, so commenting this out for now ***

  // NEW Trying to remove JQuery, so using this loading method instead
  /*document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        setupPercentContainers();
        showGradePercentage();
    }
  };*/

  // This is a unique alternative, and seems to be working, but perhaps not the best way to do it
  /*function r(f){/in/.test(document.readyState)?setTimeout(r,9,f):f()}
  r(function(){setupPercentContainers();showGradePercentage();});*/


  // NEW Let's stick with this $document.ready, JQuery-less alternative for now.
  function mycallback() {
    setupPercentContainers();
    showGradePercentage();
  }
  //...
  (function() {
    if (window.addEventListener) {
      addEventListener("load", mycallback); //standard
    } else if (window.attachEvent) {
      attachEvent("onload", mycallback); //IE
    } else { //fallback method
      var oldCb = onload;
      onload = function() {
        if (oldCb) oldCb();
        mycallback();
      };
    }
  })();

  //These don't really get used, they're more for options, but I'm leaving them here for now
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

          //pointPercentNumberFired = true; //NEW for Debugging

          //var gradingBoxExtended = document.getElementById("grading-box-extended");
          //gradingBoxExtended.addEventListener("change", showGradePercentage);

          //var students_selectmenu = document.getElementById("students_selectmenu");
      //students_selectmenu.addEventListener("change", showGradePercentage);

      //$('#students_selectmenu').on( 'keyup blur keypress change click mousedown', showGradePercentage);

      // Trying to remove JQuery, so commenting the following three eventListeners out for now
      //$('#grading-box-extended').on('keyup blur keypress change', showGradePercentage); //***
      //$('#next-student-button').on('click mousedown', showGradePercentage); //***
      //$('#prev-student-button').on('click mousedown', showGradePercentage); //***

      // New way of adding the eventListeners without JQuery
      ['keyup','blur','keypress','change'].forEach( evt =>
        document.getElementById("grading-box-extended").addEventListener(evt, showGradePercentage, false)
      );

      ['click','mousedown','ontouchstart'].forEach( evt =>
        document.getElementById("next-student-button").addEventListener(evt, showGradePercentage, false)
      );

      ['click','mousedown','ontouchstart'].forEach( evt =>
        document.getElementById("prev-student-button").addEventListener(evt, showGradePercentage, false)
      );


      //Setup mutation observer on the student list to fire showGradePercentage() on student change via student list
      const studentListContainer = document.getElementById("combo_box_container");
      // Callback function when student list changes
      function callback(mutationRecord, observer) {

        showGradePercentage();
        //console.log('student list changed');
        //observer.disconnect();
      }

      // Create a new instance of MutationObserver with callback in params
      const observer = new MutationObserver(callback);

      const config = {
        subtree: true,
        childList: true
      };

      // When everything is ready, we just observe our target (studentListContainer)
      observer.observe(studentListContainer, config);

      }
  }

  function showGradePercentage() {

      if (speed_grader == 'speed_grader') {

          /*if (pointPercentNumberFired == false){ //NEW Used for Debugging
              console.log('setupPercentContainers() launched secondary and pointPercentNumberFired = ' + pointPercentNumberFired);
              setupPercentContainers();
              console.log('setupPercentContainers() launched secondary and pointPercentNumberFired = ' + pointPercentNumberFired);
              pointPercentNumberFired == true;
          } console.log('continuing function ' + pointPercentNumberFired);*/

          var studentGrade = parseFloat(document.getElementById('grading-box-extended').value, 10);
          var assignmentValue = parseFloat(document.getElementById('grade_container').innerText.split(/(\d+)/g)[1], 10);
          var rawGradePercent = studentGrade / assignmentValue;
          var gradePercent = (rawGradePercent * 100).toFixed(2) + ' %';

          if (isNaN(rawGradePercent)) {

              pointPercentNumber.innerHTML = '0 %';

          } else {

          pointPercentNumber.innerHTML = gradePercent;
          //console.log('Recalculating');

          }
      }
  }

}


function addSgStudentNameGreeting() {
  if (typeof config.addSgStudentNameGreeting !== 'undefined' && !config.addSgStudentNameGreeting) {
    return;
  }
  //console.log('addSgStudentNameGreeting() is running');

  //Globals for Speed Grader and msisNav functions
  var getURLArray = document.URL.split(/\?(.+)?/)[0];
  var parseURL = getURLArray.split('/');
  var speed_grader = parseURL[6];
  var header = document.getElementById('header');
  var pointPercentNumberFired = false; //NEW for Debugging
  var hasRubric = document.getElementById('rubric_full');

  //$(document).ready(function(){setupAddSgStudentNameGreetingContainers();}); //ORG Working Design with JQuery, trying to remove JQuery, so commenting out for now ***

  // NEW way of loading without JQuery
  // UPDATE: No need for the document.onreadystatechange function here, we just need to check 
  // the document.readyState property to see if the page is loaded. See updated version below
  /*document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        setupAddSgStudentNameGreetingContainers();
    }
  };*/

  // UPDATE: No need for the document.onreadystatechange function here, we just need to check for 
  // the document.readyState status of interactive, or complete.
  /*if (document.readyState === 'interactive' || document.readyState === 'complete') {
      setupAddSgStudentNameGreetingContainers();
  }*/
  
  //console.log('document.readyState = ' + document.readyState);

  // Check if the page is loaded, if not, add a listener to the document.readystatechange event
  // to watch for the page to fully load.
  if (document.readyState === 'complete') {
    setupAddSgStudentNameGreetingContainers();
  } else if (document.readyState !== 'complete') {
      document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
          setupAddSgStudentNameGreetingContainers();
        }
    });
  }

  function setupAddSgStudentNameGreetingContainers() {

      if (speed_grader == 'speed_grader') {

        // ORG var when it was located in the form (moved it out of the form)
        //var AddSgStudentNameGreetingLink = `<span class="fOyUs_bGBk dJCgj_bGBk" id="SgGreetingContainer"><div class="fOyUs_bGBk fOyUs_desw" style="padding: 0px 0px 0px 0.5rem;"><a href="JavaScript:void(0);" id="SgGreeting" style="" title="Add Student Name Greeting" alt="Add Student Name Greeting"><span>😬</span></a></div></span>`;

        // Had to adjust the location of the variable
        // The form it was originally enclosed in stopped working.
        //var SgTextArea = document.getElementById('speed_grader_comment_textarea_mount_point');
        //SgTextArea.firstElementChild.innerHTML += AddSgStudentNameGreetingLink;

        var AddSgStudentNameGreetingLink = `<span id="SgGreetingContainer" style="padding: 0px 0px 0px 0.1rem;"><a href="JavaScript:void(0);" id="SgGreeting" style="text-decoration: none;" title="In the Assignments Comments text box, add a greeting and the first name of the current student" alt="In the Assignments Comments text box, add a greeting and the first name of the current student"><span>😬</span></a></span>`;

        var AddSgStudentNameSalutationLink = `<span id="SgSalutationContainer" style="padding: 0px 0px 0px 0.1rem;"><a href="JavaScript:void(0);" id="SgSalutation" style="text-decoration: none;" title="In the Assignments Comments text box, add the first name of the current student and a salutation" alt="In the Assignments Comments text box, add the first name of the current student and a salutation"><span>😃</span></a></span>`;

        var AddSgStudentNameShortCodeLink = `<span id="SgStudentNameShortCodeContainer" style="padding: 0px 0px 0px 0.1rem;"><a href="JavaScript:void(0);" id="SgStudentNameShortCode" style="text-decoration: none;" title="In the Assignments Comments text box, replace the [[StudentName]] Short Code with the first name of the current student" alt="In the Assignments Comments text box, replace the [[StudentName]] Short Code with the first name of the current student"><span>🤓</span></a></span>`;

        var AddSgLessonNameShortCodeLink = `<span id="SgLessonNameShortCodeContainer" style="padding: 0px 0px 0px 0.1rem;"><a href="JavaScript:void(0);" id="SgLessonNameShortCode" style="text-decoration: none;" title="In the Assignments Comments text box, replace the [[LessonName]] Short Code with the title of the current lesson" alt="In the Assignments Comments text box, replace the [[LessonName]] Short Code with the title of the current lesson"><span>📄</span></a></span>`;

        const nameSpAdvance = document.querySelectorAll(("." + namespace + "_next"));
        //console.log(nameSpAdvance)

        //console.log('Active and true');

        if (!hasRubric) {

          document.querySelectorAll('#rightside_inner .content_box h2')[1].innerHTML += AddSgLessonNameShortCodeLink;

          document.querySelectorAll('#rightside_inner .content_box h2')[1].innerHTML += AddSgStudentNameShortCodeLink;

          document.querySelectorAll('#rightside_inner .content_box h2')[1].innerHTML += AddSgStudentNameGreetingLink;

          document.querySelectorAll('#rightside_inner .content_box h2')[1].innerHTML += AddSgStudentNameSalutationLink;

          document.getElementById("SgLessonNameShortCode").addEventListener("click", replaceSgLessonNameShortCode);

          document.getElementById("SgStudentNameShortCode").addEventListener("click", replaceSgStudentNameShortCode);

          document.getElementById("SgGreeting").addEventListener("click", addSgGreeting);

          document.getElementById("SgSalutation").addEventListener("click", addSgSalutation);

          //document.getElementById("next-student-button").addEventListener("mouseover", launchShortCodeReplacementFunctions);

          //document.getElementById("prev-student-button").addEventListener("mouseover", launchShortCodeReplacementFunctions);

          //document.getElementById("combo_box_container").addEventListener("mouseover", launchShortCodeReplacementFunctions);

          ['mouseover','ontouchstart','blur','click','focus'].forEach( evt =>
            document.getElementById("next-student-button").addEventListener(evt, launchShortCodeReplacementFunctions, false)
          );

          ['mouseover','ontouchstart','blur','click','focus'].forEach( evt =>
            document.getElementById("prev-student-button").addEventListener(evt, launchShortCodeReplacementFunctions, false)
          );

          ['mouseover','ontouchstart','blur','click','focus'].forEach( evt =>
            document.getElementById("combo_box_container").addEventListener(evt, launchShortCodeReplacementFunctions, false)
          );

          ['mouseover','ontouchstart','blur','click','focus'].forEach( evt =>
            document.getElementById("comment_submit_button").addEventListener(evt, launchShortCodeReplacementFunctions, false)
          );

          //const nameSpAdvance = document.querySelectorAll(("." + namespace + "_next"));
          for (let i = 0; i < nameSpAdvance.length; i++) {
            nameSpAdvance[i].addEventListener('mouseover', launchShortCodeReplacementFunctions, false);
            nameSpAdvance[i].addEventListener('ontouchstart', launchShortCodeReplacementFunctions, false);
            nameSpAdvance[i].addEventListener('blur', launchShortCodeReplacementFunctions, false);
            nameSpAdvance[i].addEventListener('click', launchShortCodeReplacementFunctions, false);
            nameSpAdvance[i].addEventListener('focus', launchShortCodeReplacementFunctions, false);
          };


        } else if (hasRubric) {

          document.querySelectorAll('#rightside_inner .content_box h2')[4].innerHTML += AddSgLessonNameShortCodeLink;

          document.querySelectorAll('#rightside_inner .content_box h2')[4].innerHTML += AddSgStudentNameShortCodeLink;

          document.querySelectorAll('#rightside_inner .content_box h2')[4].innerHTML += AddSgStudentNameGreetingLink;

          document.querySelectorAll('#rightside_inner .content_box h2')[4].innerHTML += AddSgStudentNameSalutationLink;

          document.getElementById("SgLessonNameShortCode").addEventListener("click", replaceSgLessonNameShortCode);

          document.getElementById("SgStudentNameShortCode").addEventListener("click", replaceSgStudentNameShortCode);

          document.getElementById("SgGreeting").addEventListener("click", addSgGreeting);

          document.getElementById("SgSalutation").addEventListener("click", addSgSalutation);

          //document.getElementById("next-student-button").addEventListener("mouseover", launchShortCodeReplacementFunctions);

          //document.getElementById("prev-student-button").addEventListener("mouseover", launchShortCodeReplacementFunctions);

          //document.getElementById("combo_box_container").addEventListener("mouseover", launchShortCodeReplacementFunctions);

          //var rubricSaveButton = document.querySelector('div#rubric_holder button.save_rubric_button');

          ['mouseover','ontouchstart','blur','click','focus'].forEach( evt =>
            document.querySelector('div#rubric_holder button.save_rubric_button').addEventListener(evt, launchShortCodeReplacementFunctions, false)
          );

          ['mouseover','ontouchstart','blur','click','focus'].forEach( evt =>
            document.getElementById("next-student-button").addEventListener(evt, launchShortCodeReplacementFunctions, false)
          );

          ['mouseover','ontouchstart','blur','click','focus'].forEach( evt =>
            document.getElementById("prev-student-button").addEventListener(evt, launchShortCodeReplacementFunctions, false)
          );

          ['mouseover','ontouchstart','blur','click','focus'].forEach( evt =>
            document.getElementById("combo_box_container").addEventListener(evt, launchShortCodeReplacementFunctions, false)
          );

          ['mouseover','ontouchstart','blur','click','focus'].forEach( evt =>
            document.getElementById("comment_submit_button").addEventListener(evt, launchShortCodeReplacementFunctions, false)
          );

          //const nameSpAdvance = document.querySelectorAll(("." + namespace + "_next"));
          for (let i = 0; i < nameSpAdvance.length; i++) {
            nameSpAdvance[i].addEventListener('mouseover', launchShortCodeReplacementFunctions, false);
            nameSpAdvance[i].addEventListener('ontouchstart', launchShortCodeReplacementFunctions, false);
            nameSpAdvance[i].addEventListener('blur', launchShortCodeReplacementFunctions, false);
            nameSpAdvance[i].addEventListener('click', launchShortCodeReplacementFunctions, false);
            nameSpAdvance[i].addEventListener('focus', launchShortCodeReplacementFunctions, false);
          };


        }

      }
  }

  function addSgGreeting() {

    if (speed_grader == 'speed_grader') {

      //var studentFullName = document.getElementById('students_selectmenu-button').innerText
      var studentFullName = document.querySelector('#students_selectmenu-button .ui-selectmenu-status .ui-selectmenu-item-header').innerText


      //console.log(studentFullName)

      var studentFullNameArray = studentFullName.split(/[ ]+/);
      //var studentFullNameArray = studentFullName.split(" "); //Both ways work

      //console.log(studentFullNameArray)

      var studentFirstName = studentFullNameArray[0];

      //console.log(studentFirstName)


      // #speed_grader_comment_textarea_mount_point
      // #speed_grader_comment_textarea


      var commentBoxTextArea = document.getElementById('speed_grader_comment_textarea')

      // Basic add
      // commentBoxTextArea.value += studentFirstName

      var commentBoxTextAreaValue = commentBoxTextArea.value

      var greeting = "Hi " + studentFirstName + ",\n\n"

      var greetingAndComments = greeting + commentBoxTextAreaValue

      commentBoxTextArea.value = greetingAndComments


    }
  }

  function addSgSalutation() {

    if (speed_grader == 'speed_grader') {

      //var studentFullName = document.getElementById('students_selectmenu-button').innerText
      var studentFullName = document.querySelector('#students_selectmenu-button .ui-selectmenu-status .ui-selectmenu-item-header').innerText


      //console.log(studentFullName)

      var studentFullNameArray = studentFullName.split(/[ ]+/);
      //var studentFullNameArray = studentFullName.split(" "); //Both ways work

      //console.log(studentFullNameArray)

      var studentFirstName = studentFullNameArray[0];

      //console.log(studentFirstName)


      // #speed_grader_comment_textarea_mount_point
      // #speed_grader_comment_textarea


      var commentBoxTextArea = document.getElementById('speed_grader_comment_textarea')

      // Basic add
      // commentBoxTextArea.value += studentFirstName

      var commentBoxTextAreaValue = commentBoxTextArea.value

      //var salutation = " " + studentFirstName + "!" // Space or no space???
      var salutation = studentFirstName + "!"

      var salutationAndComments = commentBoxTextAreaValue + salutation

      commentBoxTextArea.value = salutationAndComments


    }
  }

  function replaceSgStudentNameShortCode() {

    if (speed_grader == 'speed_grader') {

      //var studentFullName = document.getElementById('students_selectmenu-button').innerText
      var studentFullName = document.querySelector('#students_selectmenu-button .ui-selectmenu-status .ui-selectmenu-item-header').innerText


      //console.log(studentFullName)

      var studentFullNameArray = studentFullName.split(/[ ]+/);
      //var studentFullNameArray = studentFullName.split(" "); //Both ways work

      //console.log(studentFullNameArray)

      var studentFirstName = studentFullNameArray[0];

      //console.log(studentFirstName)


      // #speed_grader_comment_textarea_mount_point
      // #speed_grader_comment_textarea


      var commentBoxTextArea = document.getElementById('speed_grader_comment_textarea')

      // Basic add
      // commentBoxTextArea.value += studentFirstName

      var commentBoxTextAreaValue = commentBoxTextArea.value

      const regex = /(\[{2}StudentName\]{2})/gm;

      var commentBoxTextAreaNewValue = commentBoxTextAreaValue.replaceAll(regex, studentFirstName);

      commentBoxTextArea.value = commentBoxTextAreaNewValue


    }
  }

  function replaceSgLessonNameShortCode() {

    if (speed_grader == 'speed_grader') {

      var lessonName = document.querySelector('#assignment_url h2.assignmentDetails__Title').innerText

      //console.log(lessonName)

      var commentBoxTextArea = document.getElementById('speed_grader_comment_textarea')

      var commentBoxTextAreaValue = commentBoxTextArea.value

      const regex = /(\[{2}LessonName\]{2})/gm;

      var commentBoxTextAreaNewValue = commentBoxTextAreaValue.replaceAll(regex, lessonName);

      commentBoxTextArea.value = commentBoxTextAreaNewValue


    }
  }

  function launchShortCodeReplacementFunctions() {

    if (speed_grader == 'speed_grader') {


      replaceSgStudentNameShortCode();
      replaceSgLessonNameShortCode();

      //console.log('launchShortCodeReplacementFunctions() launched')

    }
  }

}


function adjustExternalToolBox() {
    if (typeof config.adjustExternalToolBox !== 'undefined' && !config.adjustExternalToolBox) {
        return;
    }
    //console.log('adjustExternalToolBox() is running');

    //Globals for adjustExternalToolBox functions
    var getURLArray = document.URL.split(/\?(.+)?/)[0];
    var parseURL = getURLArray.split('/');
    var assignments = parseURL[5];
    var edit = parseURL[7];

    /*$(document).ready(function () {
        setupAdjustExternalToolBoxContainers();
    });*/ //ORG Working Design, trying to remove JQuery, so commenting it ouf for now ***

    // NEW design without JQuery...Actually, NVM, we're going with setTimeout instead. The DOM is goofy.
    //document.onreadystatechange = function () {
    //    if (document.readyState === 'complete') {
            //setTimeout(function () {
            //    setupAdjustExternalToolBoxContainers();
            //}, 5000);
    //    }
    //}

    // NEW NEW design without JQuery...The super DOM is goofy. No setTimeout needed. This is the way.
    function mycallback() {
        setupAdjustExternalToolBoxContainers();
    }
    //...
    (function() {
    if (window.addEventListener) {
        addEventListener("load", mycallback); //standard
    } else if (window.attachEvent) {
        attachEvent("onload", mycallback); //IE
    } else { //fallback method
        var oldCb = onload;
        onload = function() {
        if (oldCb) oldCb();
        mycallback();
        };
    }
    })();

    function setupAdjustExternalToolBoxContainers() {

        if (assignments == 'assignments' && edit == 'edit') {

            if (document.getElementById("assignment_external_tool_tag_attributes_url_find")){

                //External tool button id=assignment_external_tool_tag_attributes_url_find
                var ExternalToolButton = document.getElementById("assignment_external_tool_tag_attributes_url_find")
                ExternalToolButton.addEventListener('click', visibilityObserverLauncher);

                function visibilityObserverLauncher() {
                    //console.log("visibilityObserverLauncher initialized")
                    //const preInnerLTI = document.getElementById("select_context_content_dialog")
                    //console.log(window.getComputedStyle(preInnerLTI))
                    //console.log("0 The calculated current style.display is " + window.getComputedStyle(preInnerLTI).display)
                    visibilityObserver();
                    //ExternalToolButton.removeEventListener('click', visibilityObserverLauncher);
                }


                function visibilityObserver() {

                    const innerLTI = document.getElementById("select_context_content_dialog");
                    //let display = innerLTI.style.display
                    //let currentStyle = innerLTI.style.display;
                    //var currentStyle = innerLTI.style.display;
                    //console.log("Initial current style.display is " + currentStyle)
                    //innerLTI.style.display is unreliable bc it only checks inline styles.
                    //we need to use window.getComputedStyle(innerLTI).display for best accuracy

                    //var calculatedCurrentStyle = window.getComputedStyle(innerLTI).display;
                    //console.log("1 The calculated current style.display is " + window.getComputedStyle(innerLTI).display)

                    // Callback function when changes occurs
                    function callback(mutationRecord, observer) {
                        //console.log("changed")
                        //console.log("Current style.display is now: " + currentStyle)
                        //console.log("2 The calculated current style.display is " + window.getComputedStyle(innerLTI).display)

                        var newTop = innerLTI.parentElement.offsetTop - 100; //50
                        parseInt(newTop)
                        //console.log(newTop)

                        var LTIContainer = document.querySelectorAll(".ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable.ui-resizable.ui-dialog-buttons")[0];
                        LTIContainer.style.width = '80%';
                        LTIContainer.style.left = '10%';
                        LTIContainer.style.top = newTop + 'px';
                        innerLTI.style.height = '370px';
                        //console.log(observer)
                        observer.disconnect();
                        //console.log("after disconnect, observer is now " + observer)
                        //console.log("3 The calculated current style.display is " + window.getComputedStyle(innerLTI).display)
                    }

                    // Create a new instance of MutationObserver with callback in params
                    const observer = new MutationObserver(callback);

                    // Setup config
                    const config = {
                        attributeFilter: ["style"]
                    };

                    // When everything is ready, we just observe our target (innerLTI)
                    observer.observe(innerLTI, config);

                    //console.log("After the observer, style.display is " + currentStyle)
                    //console.log("4 The calculated current style.display is " + window.getComputedStyle(innerLTI).display)

                }
            }


        }
    }
}

  function addAwardFullPointsAndNext() {
    if (isSG && typeof config.awardFullPointsAndNext !== 'undefined' && config.awardFullPointsAndNext) {
      var gradingBox = document.querySelector('input#grading-box-extended');
      if (gradingBox) {
        var parent = gradingBox.parentNode;
        if (parent) {
          var advance = advanceButton(awardFullPointsAndNext, {
            'title' : 'Award full points, submit any comments, and advance to next user'
          });
          //gradingBox.title = 'Save rubric and stay on this user';
          advance.style.marginLeft = '3px';
          parent.insertBefore(advance, gradingBox.nextSibling);
        }
      }
    }
  }

  function awardFullPointsAndNext() {
    var gradingBox = document.querySelector('input#grading-box-extended');
    if (gradingBox) {

      //var studentGrade = parseFloat(document.getElementById('grading-box-extended').value, 10);
      var assignmentValue = parseFloat(document.getElementById('grade_container').innerText.split(/(\d+)/g)[1], 10);

      var studentGradeBox = document.getElementById('grading-box-extended');
      //console.log('Original value = ' + studentGradeBox.value);
      studentGradeBox.value = assignmentValue;
      studentGradeBox.setAttribute('value', studentGradeBox.value);
      //console.log('New value = ' + studentGradeBox.value);

      if (isNaN(assignmentValue)) {
        console.log('Assignment Value is not a number');
      }

      advanceUser = true;
      advanceSrc = 'grade';
      gradingBox.dispatchEvent(new Event('change', {
        'bubbles' : true
      }));

      // This is for the saving of the comments. Should advanceUser be true or false??? Does it matter???
      // If we get any collisions with the grade or comments, remove this code.
      var btn = document.getElementById('comment_submit_button');
      if (btn) {
        advanceUser = true;
        advanceSrc = 'comment';
        btn.dispatchEvent(new Event('click', {
          'bubbles' : true
        }));
      }
      nextUser();
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
        min-height: 440px !important;
    }

    #quiz_description {
        min-height: 600px !important;
        width: 100% !important;
    }

    #quiz_description_ifr {
        min-height: 440px !important;
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
        min-height: 440px !important;
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
        min-height: 440px !important;
    }

    iframe[id^="editor-toggle-"][id*="_ifr"] {
        min-height: 440px !important;
    }

    textarea[id^="discussion-topic-message"] {
        min-height: 440px !important;
    }

    textarea[id^="editor-toggle-"] {
        min-height: 440px !important;
    }

    #courses_list .unstyled_list.context_list {
      max-height: inherit !important;
    }

    .tox.tox-tinymce.tox-tinymce--toolbar-sticky-off {
      height: 640px !important;
      min-height: 440px !important;
    }

    .tox.tox-tinymce.tox-tinymce--toolbar-sticky-on {
      height: 640px !important;
      min-height: 440px !important;
    }

    .tox.tox-tinymce.tox-tinymce--toolbar-sticky-off.tox-fullscreen {
      height: 100% !important;
      min-height: 440px !important;
    }

    .RceHtmlEditor {
      min-height: 600px !important;
    }

    .CodeMirror.cm-s-default.CodeMirror-wrap {
      min-height: 600px !important;
    }

    .announcements_link:hover, .modules_link:hover, .users_link:hover, .gradebook_link:hover {
      color: #E66135 !important;
    }

    .menu-item__badge {
      background-color: #E66135;
      color: #fff;
    }`;

  var hideGradebookTooltipCSSCode = `
  .gradebook-tooltip {
    display: none !important;
  }`;

  var hideReadSpeakerButtonCSSCode = `
  .rspopup {
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




    if (typeof config.boxResizerCSS !== 'undefined' && config.boxResizerCSS != false) {
      addPalcsuiStyle(boxResizerCSSCode);
    }

    if (typeof config.hideGradebookTooltipCSS !== 'undefined' && config.hideGradebookTooltipCSS != false) {
      addPalcsuiStyle(hideGradebookTooltipCSSCode);
    }

    if (typeof config.hideReadSpeakerButtonCSS !== 'undefined' && config.hideReadSpeakerButtonCSS != false) {
        addPalcsuiStyle(hideReadSpeakerButtonCSSCode);
    }

    if (typeof config.keyframesHolderCSS !== 'undefined' && config.keyframesHolderCSS != false) {
      addPalcsuiStyle(keyframesHolderCSSCode);
    }

    if (typeof config.addMsisNavigation !== 'undefined' && config.addMsisNavigation != false) {
      msisNav();
    }

    if (typeof config.addPalcschoolNavigation !== 'undefined' && config.addPalcschoolNavigation != false) {
      palcschoolNav();
    }







}




  /* END DWS Enhancements */
  /********************************* */








  }; //END var PalcsUI = function(config)





  if (typeof PalcsUI !== 'function') {
    const script = document.createElement('script');
    script.src = 'https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcs-ui-standalone-beta.user.js';
    script.onload = function() {
      PalcsUI(config);
    };
    document.head.appendChild(script);
  }
  else {
    PalcsUI(config);
  }

  //PalcsUI(config);

})();