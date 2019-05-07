// ==UserScript==
// @name        PalcsUI Canvancement
// @namespace   https://github.com/dslusser/PalcsUI-Canvancement
// @description User enhancements for the Palcs Canvas instance
// @include     https://*.instructure.com/courses/*/gradebook/speed_grader?*
// @include     https://*.instructure.com/courses/*/quizzes/*/history?*
// @include     https://*.instructure.com/*
// @noframes
// @version     1.03
// @grant       none
// ==/UserScript==
(function() {
  'use strict';

  var config = {
    // PalcsUI enhancements may be true or false
    'addGradePercentage' : true,
    'addCustomCSS' : true,
    'boxResizerCSS' : true,
    'gradebookTooltipCSS' : true,
    'keyframesHolderCSS' : true,
    'addMsisNavigation' : true
  };

  //Gitcdn master palcs-ui-engine.js file
  //Gitcdn.link url deprecated? Now using gitcdn.xyz
  //https://gitcdn.link/repo/dslusser/PalcsUI-Canvancement/master/src/palcs-ui-engine.js
  //https://gitcdn.xyz/repo/dslusser/PalcsUI-Canvancement/master/src/palcs-ui-engine.js
  //Localhost file
  //http://localhost:8080/palcs-ui-engine.js
  $.ajax({
    'url' : 'https://gitcdn.xyz/repo/dslusser/PalcsUI-Canvancement/master/src/palcs-ui-engine.js',
    'dataType' : 'script',
    'cache' : true,
    'success' : function() {
      PalcsUI(config);
    }
  });

})();
