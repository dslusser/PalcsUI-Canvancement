// ==UserScript==
// @name        PalcsUI Canvancement
// @namespace   https://github.com/dslusser/PalcsUI-Canvancement
// @description User enhancements for the Palcs Canvas instance
// @include     https://*.instructure.com/courses/*/gradebook/speed_grader?*
// @include     https://*.instructure.com/courses/*/quizzes/*/history?*
// @noframes
// @version     1.01
// @grant       none
// ==/UserScript==
(function() {
  'use strict';

  var config = {
    // PalcsUI enhancements may be true or false
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
