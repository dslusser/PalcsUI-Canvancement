// ==UserScript==
// @name        PalcsUI Canvancement
// @namespace   https://github.com/dslusser/PalcsUI-Canvancement
// @description User enhancements for the Palcs Canvas instance
// @include     https://*.instructure.com/courses/*/gradebook/speed_grader?*
// @include     https://*.instructure.com/courses/*/quizzes/*/history?*
// @noframes
// @version     1.00
// @grant       none
// ==/UserScript==
(function() {
  'use strict';

  var config = {
    // Regrading methods may be 'disabled', 'enabled', or 'autorun'
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
    'addGradePercentage' : true
  };

  $.ajax({
    'url' : 'https://gitcdn.link/repo/dslusser/PalcsUI-Canvancement/master/src/palcs-ui-engine.js',
    'dataType' : 'script',
    'cache' : true,
    'success' : function() {
      PalcsUI(config);
    }
  });

})();
