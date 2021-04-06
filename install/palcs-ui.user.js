// ==UserScript==
// @name        PalcsUI Canvancement
// @namespace   https://github.com/dslusser/PalcsUI-Canvancement
// @description User enhancements for the Palcs Canvas instance
// @include     https://*.instructure.com/courses/*/gradebook/speed_grader?*
// @include     https://*.instructure.com/courses/*/quizzes/*/history?*
// @include     https://*.instructure.com/*
// @noframes
// @version     1.07.01
// @grant       none
// ==/UserScript==
(function () {
  'use strict';

  var config = {
    // PalcsUI enhancements may be true or false
    'addGradePercentage': true,
    'boxResizerCSS': true,
    'hideGradebookTooltipCSS': true,
    'addMsisNavigation': false,
    'addPalcschoolNavigation': true
  };

  //addGradePercentage adds a grade percent to the SpeedGrader
  //boxResizerCSS adjusts the height of some of the small text boxes in Canvas
  //hideGradebookTooltipCSS hides the obtrusive tooltip in the Gradebook
  //addMsisNavigation adds a direct link to MSIS in the Canvas global navigation menu
  //addPalcschoolNavigation adds a direct link to Palcschool in the Canvas global navigation menu
  //I suggest using only one nav menu link until/if I find a second icon :-)

  //Gitcdn master palcs-ui-engine.js file
  //Gitcdn.link url deprecated. Now using gitcdn.xyz
  //https://gitcdn.link/repo/dslusser/PalcsUI-Canvancement/master/src/palcs-ui-engine.js
  //https://gitcdn.xyz/repo/dslusser/PalcsUI-Canvancement/master/src/palcs-ui-engine.js
  //Localhost file
  //http://localhost:8080/palcs-ui-engine.js

  if (typeof PalcsUI !== 'function') {
    const script = document.createElement('script');
    script.src = 'https://gitcdn.link/repo/dslusser/PalcsUI-Canvancement/master/src/palcs-ui-engine.js';
    script.onload = function () {
      PalcsUI(config);
    };
    document.head.appendChild(script);
  } else {
    PalcsUI(config);
  }

})();