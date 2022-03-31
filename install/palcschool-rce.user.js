// ==UserScript==
// @name            PalcschoolRCE Canvancement
// @author          Dan Slusser
// @namespace       https://github.com/dslusser/PalcsUI-Canvancement
// @description     Copy grades and automatically add comments to Report Card Entry page.
// @include         https://*.palcschool.org/moodle/palcs20/dashboard/teacher/rc_entry.php*
// @include         https://*palcschool.org/moodle/palcs20/dashboard/teacher/rc_entry.php*
// @noframes
// @version         2.01.02
// @grant           none
// @updateURL       https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcschool-rce.user.js
// @downloadURL      https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcschool-rce.user.js
// ==/UserScript==
(function () {
    'use strict';

    var PalcschoolRCE = function() {
        'use strict';

        
        // Comments list valid as of 2/23/2021. No comments listed for 13, 14, and 29.
        // Only modify this list if something changes on palcschool.
        var comment1 = 1; // 1. Submits quality work
        var comment2 = 3; // 2. Shows initiative and motivation
        var comment3 = 5; // 3. Improvement shown
        var comment4 = 37; // 4. Course work demonstrates outstanding effort
        var comment5 = 41; // 5. Enthusiastic learner
        var comment6 = 11; // 6. Demonstrates a positive attitude towards learning
        var comment7 = 13; // 7. Completes work by assigned due date
        var comment8 = 34; // 8. Actively engaged in the learning process
        var comment9 = 46; // 9. Self-advocates
        var comment10 = 40; // 10. Effectively communicates with the teacher
        var comment11 = 44; // 11. Regularly attends and participates in live virtual lessons
        var comment12 = 45; // 12. Regularly watches the recorded virtual lesson
        var comment15 = 32; // 15. Does not attend mandatory live lessons
        var comment16 = 39; // 16. Does not watch mandatory recorded virtual lessons
        var comment17 = 43; // 17. Possibility of failing the marking period
        var comment18 = 42; // 18. Possibility of failing the course
        var comment19 = 8; // 19. Does not respond to teacher communication and/or feedback in a timely manner.
        var comment20 = 38; // 20. Does not resubmit eligible work
        var comment21 = 50; // 21. Waits until the end of the progress check to submit work
        var comment22 = 25; // 22. Does not complete culminating tests
        var comment23 = 49; // 23. Turns in assignments past the assigned due date
        var comment24 = 14; // 24. Missing key concepts which are affecting learning
        var comment25 = 35; // 25. Missing assignments are impacting learning/achievement
        var comment26 = 48; // 26. Submits partially completed assignments
        var comment27 = 47; // 27. Submits blank work for written submissions
        var comment28 = 36; // 28. Has the potential to improve learning and achievement with more engagement
        var comment30 = 6; // 30. Please contact teacher to schedule a conference
        var comment31 = 51; // 31. Recommend a parent teacher conference
        var comment32 = 18; // 32. Student lesson help attendance is recommended
        var comment33 = 52; // 33. Recommend attending live virtual lessons
        var comment34 = 20; // 34. No grade given because of student's enrollment date
        var comment35 = 53; // 35. MP4 Grade Not Applicable due to COVID-19


        // The values below hold the list of comments to be added for grades A, B, C, D, and F. 
        // Refer to the list above to add or remove specific comments to the following list.
        // These comments lists should be the only thing that needs to be modified.
        var commentsForGradeA = [comment1, comment2, comment4]; // CSV of comments for students earning > than 90%
        var commentsForGradeB = [comment1, comment2]; // CSV of comments for students earning >= 80% and < 90%
        var commentsForGradeC = [comment6]; // CSV of comments for students earning >= 70% and < 80%
        var commentsForGradeD = [comment28]; // CSV of comments for students earning >= 60% and < 70%
        var commentsForGradeF = [comment32, comment33];// CSV of comments for students earning < than 60%















        // ************** Don't modify anything below this line ************** //




        function copyGradesAndComments() {
            rcCopyCanvas2Gradebook("cag"); // RCE function to copy all grades

            var studentIDs = document.getElementById('studentids').value
            var studentIDsArray = studentIDs.split(',');

            for (var i = 0; i < studentIDsArray.length; i++) {
                var stuid = studentIDsArray[i];

                var stu1 = document.getElementById('psg_' + stuid);
                var stu1val = parseInt(stu1.value);

                if (isNaN(stu1val)) {
                    console.log(stu1val + ' is not a number.');
                } else if (stu1val >= 90) {
                    for (var a = 0; a < commentsForGradeA.length; a++) {
                        document.getElementById('comment_' + stuid + '_' + commentsForGradeA[a]).checked = true; 
                    }
                } else if (stu1val >= 80 && stu1val < 90) {
                    for (var b = 0; b < commentsForGradeB.length; b++) {
                        document.getElementById('comment_' + stuid + '_' + commentsForGradeB[b]).checked = true; 
                    }
                } else if (stu1val >= 70 && stu1val < 80) {
                    for (var c = 0; c < commentsForGradeC.length; c++) {
                        document.getElementById('comment_' + stuid + '_' + commentsForGradeC[c]).checked = true; 
                    }
                } else if (stu1val >= 60 && stu1val < 70) {
                    for (var d = 0; d < commentsForGradeD.length; d++) {
                        document.getElementById('comment_' + stuid + '_' + commentsForGradeD[d]).checked = true; 
                    }
                } else if (stu1val < 60) {
                    for (var f = 0; f < commentsForGradeF.length; f++) {
                        document.getElementById('comment_' + stuid + '_' + commentsForGradeF[f]).checked = true; 
                    }
                }
            }
        }


        function addGradesAndCommentsLink() {

            if (document.getElementsByClassName('infomsg')[0]) {

                var gradingInfoMsg = document.getElementsByClassName('infomsg')[0].innerText;
                var infomsg = 'Grading not open for course.';

                if (gradingInfoMsg == infomsg && infomsg != 'undefined'){

                console.log(gradingInfoMsg)

                }
            } else if (document.getElementsByClassName('infomsg')[0] == null) {

                var copyGradesAndCommentsLink = `<a id="GradesAndComments" style="padding-left: 10px;" href="JavaScript:void(0);">🔥Copy Grades and Enter Comments</a>`;

                //console.log('Active and true');

                var pCaption = document.getElementsByTagName('caption')[0];

                pCaption.lastElementChild.lastElementChild.lastElementChild.innerHTML += copyGradesAndCommentsLink;

                document.getElementById("GradesAndComments").addEventListener("click", copyGradesAndComments);

            }

        }

        if (/^\/moodle\/palcs20\/dashboard\/teacher\/rc_entry\.php$/.test(window.location.pathname)) {
            //console.log('We\'re at RC Entry By Period');
            addGradesAndCommentsLink();
        }

    }

        if (typeof PalcschoolRCE !== 'function') {
            const script = document.createElement('script');
            script.src = 'https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcschool-rce.user.js';
            script.onload = function() {
                PalcschoolRCE();
                //console.log('Missing function, loading fallback script.');
        };
            document.head.appendChild(script);
        }
        else {
            PalcschoolRCE();
            //console.log('Function has been loaded properly.');
        }


        //PalcschoolRCE();


})();
