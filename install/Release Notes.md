# Release Notes for Palcs-UI Canvancement Installation Scripts
A separate space for release notes, both structured and unstructured.

## Release Notes
### [palcs-ui.user.js](https:github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcs-ui.user.js) 
- v5.3.00.01
  - Bug fixes and updates to address issues that popped up when Canvas updated the comment box on the SpeedGrader
    - The StudentName and LessonName replacement short code logic has been rewritten
    - Fixes for the broken advance buttons
    - SpeedGrader styling enhancements for the new RCE comment box
  - Some adjustments to how the "Save and move to next student" buttons function 
    - Added the ability to save grades and comments when clicked
  - Added a new function to stop canvas from renaming LTI lesson titles when an external tool is used as an assignment submission
    - Just...why? 😩
  - Added some new readability styling for the updated HTML editor
  - Added some functionality styling for the updated HTML editor 

- v5.3.01.00
  - Fixed a small issue with the add SpeedGrader Links function in rare cases when certain objects were null

### [the-waybetter-gradebook-standalone-beta.user.js](https:github.com/dslusser/PalcsUI-Canvancement/raw/master/install/the-waybetter-gradebook-standalone-beta.user.js)
- v2.11.27:
  - updated the code to use clearSubmissionsTableTBody() instead of clearSubmissionsTable()
    - looking at using fadeOutAndInElement() to fade in and out the submissionsTableTBody for the next release

- v2.11.28:
  - Added the animateSubmissionsTableTBodyTrTd() function to animate the submissions table rows
    - Almost there, but the animation fade out is not working. This is due to the way that the click event listener executes 
      - the displaySubmissionsWithCategories() function. The fade out animation is not working because the submissionsTableTBody 
      - is not cleared until the click event listener executes the displaySubmissionsWithCategories() function.
      - The solution is to clear the submissionsTableTBody before the fade out animation is started, 
      - or delay the displaySubmissionsWithCategories() function until the fade out animation is complete.

- v2.11.29:
  - Everything in the submissions table is easing in and out now. I'm not confident that it's perfect, but it's good enough for now.
    - If this needs to be changed or updated. Here are the key changes:
      - In SetupUI, the transition times for the elements in style.textContent
      - The setTimeout() function for displaySubmissionsWithCategories() in CustomDatesLoadButton.addEventListener() is set to 500 milliseconds
      - The setTimeout() function for submissionsTableTBody.style.opacity in CustomDatesLoadButton.addEventListener() is set to 500 milliseconds
      - The setTimeout() function for displaySubmissionsWithCategories() in preDefinedTimeFramesLoadButton.addEventListener() is set to 500 milliseconds
      - The setTimeout() function for submissionsTableTBody.style.opacity in preDefinedTimeFramesLoadButton.addEventListener() is set to 500 milliseconds
      - The setTimeout() function in animateSubmissionsTableTBodyTrTd() is set to 500 milliseconds

- v2.11.30:
  - Added the createTimeFramesDisplayInfo and updateTimeFramesDisplayInfo functions to create and update the display of the current date, MP, and PC time frames
    - These functions are being used in replace of the updateDisplay function to create and update the time frames display.
    - The animation fade effects are handled in the animateCurrentDateDisplay and animateDatesLoadedDisplay functions, 
      - the CSS in the SetupUI function, and their click event listeners.
  - Added a function called preDefinedTimeFramesLoadButtonClick() to load the default time frame upon initial page load
    - Technically this is currently set to load MP4Total when outside of the school year time frame.
    - This is working, but it could be coded better. Consider coming back to this later and making it more efficient and clean.

- v2.11.31:
  - Added the ease in and out for the "Enable The Waybetter Gradebook" button

- v2.11.32:
  - I'm not sure any changes were made in this version, lol. I had a long layoff between coding sessions.

- v2.11.33:
  - Updated the date ranges for the time frames for 2024-2025 school year
    - Didn't change any drop down defaults to new time frames, but the code should automatically do this for us

- v2.11.34:
  - Added the finished student selector code into this script
  - The "Normalize Assignment Groups to 100%" checkbox is now defaulted to checked
    - Was running into grades looking weird at the beginning of the time frame when this is not checked.

- v2.11.35:
  - Added the missing, late, etc. lesson status tags
  - Put the progress check that the assignment belongs to under the due date display
  - Added the submission time status tags
  - Added the teacher adjusted workflow state tags
  - Added some additional data-* attributes to the submissions table rows in preparation for adding
    - IEP, 504, and other data table

- v2.11.36:
  - Fixed the submitted and not graded Points Earned when loaded as "-" does not reset to "-" 
    - after clicking the Reset Changes button
  - Added the submitted and not graded data-* attributes to the submissions table rows
  - Adjusted the teacher adjusted data-* attributes to be more accurate and understandble
  - Added a Manual Entry submission workflow state status
  - Fixed some other minor issues

- v2.11.37:
  - Added the message student button
  - Other minor fixes

- v2.11.38:
  - Upon navigating via student selector, when new page loads, automatically click 
    - the "Enable The Waybetter Gradebook" button. url parameters are used to do this

- v2.11.39:
  - Fixed the student selector dropdown display showing multiple iterations of the same student 
    - when sections are enabled in the course.

- v2.11.40:
  - Significant changes when outcomes are enabled in a course, there is an additional UI element with tabs.
    - This has been addressed with an approach that matches Canvas and their JQuery UI/UX Tabs.
    - Added tabs for Assignments, Learning Mastery, Waybetter Gradebook, and Student Insights elements
      - Currently, the Student Insights tab is empty and is a placeholder for future use.
  - Reworked the recalculateTotalsNormalizedTo100Percent() function to handle the case where 
    - the assignment points earned is changed to 0 points. This was a missed case.
  - Updated some styling and fading animations. Still not perfect, but better.

- v2.11.41:
  - Added the "Automatically check Include checkboxes for past due assignments only" checkbox
    - This checkbox is in the Advanced Settings section and is checked by default
    - When checked, it will automatically check the Include checkboxes for past due assignments only

- v2.11.42:
  - Added the Student Insights data sneak peak
  - Updated the Late and Missing statuses to be more visually appealing

- v2.11.43:
  - Moved the GradeSummarySelectMenuGroup div into the assignments tab
    - There is a minor issue when ?waybettergradebook=true, when using the GradeSummarySelectMenuGroup 
      - selectors, the page automatically launches the waybettergradebook. This causes the
      - chosen GradeSummarySelectMenuGroup selector to reset to the default selector.
      - This is a minor issue and can be fixed in a future release.
  - Fixed the gradesDisplayElement.innerText = `${finalPercentage.toFixed(2)}%`; when 
    - "Calculation of totals has been disabled" on the page.
  - Fixed a few minor issues with the submissions table. data-* attributes are now 
    - being updated dynamically and correctly.

- v2.11.44:
  - Add a new function to calculate like the SIS Weighted Score calculation (DONE-ISH)
    - There is now a new function called sisWeightedScore() that is being called in the 
    - recalculateTotalsNormalizedTo100Percent() function. This can provide a framework
    - but it's still in the very early stages and needs more work.
  
- v2.11.45:  
  - Small update for a submission workflow status of pending_review
    - Updated display to Pending Review and the status to Awaiting Grading

- v2.11.46:
  - Updates to various functions to account for when a course does not have weighted assignments

- v2.11.47:
  - Actual updates to various functions to account for when a course does not have weighted assignments
    - (I forgot to actually include the updated code, doh!)

- v2.11.48:
  - Typo fixes

- v2.11.49:
  - Added more data-* attributes as a framework for additional student insights
    - Now each assignment has a data-assignment-types (that comes from an array) attribute and a data-submission-type attribute
  - Used the new data-* attributes to add discussions to the student insights sneak peek

- #### TODO:
- Consider using the Canvas Inbox API/xhr request to send a message to the student directly from the page
- Ease in and out:
  - The "Assignments are weighted by group table" and/or contents in the table???
  - anything else that makes the UI/UX feel better
  - IMPORTANT: This code wasn't built with modular functions in mind. It has unfortunately been written in a way 
    - that could make it difficult to maintain and add new features like easing in and out and others. To be honest, 
    - much of it should be rewritten, especially the displaySubmissionsWithCategories() function; it's a bit of a mess and the 
    - code needs more functions.
- Make the sticky submissions table header prettier
- Question: If the Normalize Assignment Groups to 100% is checked, should we also update the "Assignments are weighted by group table" 
  - contents (the group names and weights) in the table???
  - I believe that I have this information, but is it worth the hassle to update the table and/or is it a good idea???
- Add a Refresh Grades button that will pull the all of the submissions from Canvas and update the submissions array
  - Make sure to add a loading effect
  - Canvas doesn't dynamically update the grades page when a grade is changed, user needs to refresh the page. So...
  - NOTE: This is currently a low priority feature, but it could be a nice to have. Only code it if there is time.
- Implement course totals table
  - Big version bump for these issues. This course totals table is a bear.
    - Course totals table not calculating assignment group weights
    - Course totals table not adding mid-term, final, course final, and custom date range

- #### CURRENT ISSUES: 
    - Consider updating the recalculateTotalsNormalizedTo100Percent() and recalculateTotalsDefault() 
      - functions to handle the floating point precision issue. 
      - Our SIS and Waybetter Gradebook are not always consistent with each other when 
      - there is a hundredth of a percent difference due to differences in display value choices.
    - Our SIS display seems to round to the nearest hundredth of a percent in some places, but not in other places
      - and not at certain times. This can be tricky to mirror because I don't know which display to use and when to mirror it.
    - Waybetter Gradebook calculations handle things slightly differently. I've added additional logging to monitor and compare
      - our SIS calculations vs Waybetter Gradebook. Perhaps this could be included as a SIS Weighted Score column in the future.
      - I'd love to get full parity here, but I haven't yet figured out an elegant way of doing so.

- #### GOALS:
  - GOALS for v2.11.44:
    - Add a new function to calculate like the SIS Weighted Score calculation (DONE-ISH)
      - There is now a new function called sisWeightedScore() that is being called in the 
      - recalculateTotalsNormalizedTo100Percent() function. This can provide a framework
      - but it's still in the very early stages and needs more work.
    
  - GOALS for v2.11.45  
    - Update submission workflow status of pending_review (DONE)
      - Change display to Pending Review and status to Awaiting Grading

  - GOALS for v2.11.46
    - Update various functions to account for when a course does not have weighted assignments

  - GOALS for v2.11.47
    - Actual updates for various functions to account for when a course does not have weighted assignments
    - (I forgot to actually include the updated code, doh!)

  - GOALS for v2.11.48
    - Typo fixes

  - GOALS for v2.11.49:
    - Add more Student Insights data
      - Add basic discussions data

  - GOALS for v2.11.50:
    - Add more Student Insights data
      - Also add more completed sentences for Student Insights data
      - Unsubmitted status with Points Earned EX should not be counted 
        - What is this statement??? (Did this in v2.11.40???) Is it referring to something else?
      - Will we need to add more data-* attributes to the assignments to handle this???
      - Some have been added. Do we need to add more?

  - GOALS for v2.11.51:
    - Ease in and out:
      - The "Assignments are weighted by group table" and/or contents in the table???
      - anything else that makes the UI/UX feel better
    - Move or duplicate the "Calculate based only on submitted assignments" checkbox to top???
    -- Move or duplicate the Reset Changes button to top???

  - GOALS for v2.11.52:
    - Make the sticky submissions table header prettier