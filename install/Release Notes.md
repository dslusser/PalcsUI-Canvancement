# Release Notes for Palcs-UI Canvancement Installation Scripts
A separate space for release notes, both structured and unstructured.

## Release Notes
### [palcs-ui-standalone.user.js](https:github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcs-ui-standalone.user.js) 
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

- v5.3.1
  - Adjusting version numbers to align with common practice
  - Removed some focusing on the SpeedGrader comment box when hovering over some elements. This was a hacky way to overcome the broken keyboard shortcuts that Canvas introduced into the SpeedGrader (ironic name, SpeedGrader). Canvas has now fixed the keyboard shortcuts after an absurd amount of time, so I'm removing the hacky code.

- v5.4.16
  - Refactored code in the SpeedGrader portion of the script to account for the breaking changes that Canvas introduced with their "new" and updated SpeedGrader.

- v5.4.18
  - Minor update to fix a specific instance when the grade percentage wouldn't adjust when updating quiz scores on a manually graded question.

- v5.5.0
  - Added an "Award Full Points" button to the SpeedGrader rubric panel, next to the Instructor Score badge
    - Clicking it selects the highest-point rating for every criterion in the rubric currently displayed
    - Works with any rubric structure -- criteria and ratings are discovered from Canvas's own data-testid attributes rather than hardcoded to one rubric
    - Handles criteria with discrete rating buttons and criteria with only a free-form score input (max points read from the "/N pts" label)
    - Does not submit the assessment -- selections are made so you can still review before clicking Submit Assessment
    - New config option: addRubricAwardFullPoints (default true)

- v5.5.1
  - Fixed a bug in the "Save grades, submit comments, and advance to next user" button: if the comment box was empty when clicked, the rubric assessment was never saved before advancing to the next student
    - The empty-comment path now saves the rubric first (when one is present) and waits for confirmation before advancing, matching the behavior of the with-comment path
    - If there's no rubric on the assignment, behavior is unchanged

- v5.5.2
  - Fixed the "Award Full Points" rubric button running off the edge of the SpeedGrader grading panel when the panel is narrow
    - The button previously lived in a Canvas flex row marked no-wrap next to a fixed-width label box, so it had nowhere to go in a narrow panel
    - Moved the button into Canvas's own wrapping flex container one level up, so it sits beside the Instructor Score badge when there's room and drops to its own line when there isn't
    - As a last resort on very narrow panels, the button's text now wraps and the button grows taller, instead of being cut off

- v5.5.3
  - Made the SpeedGrader shortcode replacement a little more robust: saving and restoring the cursor position around the text swap is now best-effort, so if TinyMCE fails to place or find the cursor bookmark, the shortcode replacement still happens instead of silently aborting
    - This was originally intended to fix the plain-text paste shortcode bug, but it turned out not to be the cause. Kept because it's harmless and prevents a different potential silent failure. The actual fix is in v5.5.4

- v5.5.4
  - Fixed [[StudentName]] and [[LessonName]] shortcodes not being replaced when the comment text was pasted in as plain text
    - Root cause: plain-text paste goes through the browser's native paste handling instead of TinyMCE's paste plugin, and it can wrap pieces of a line in separate spans, e.g. <span>Hi [[</span><span>StudentName</span><span>]],</span>
    - The text looks normal in the comment box, but the HTML the replacement runs against has tags in the middle of the shortcode, so the old regex never matched. Typing or pasting rich text puts the whole line in one <p>, which is why those always worked
  - Shortcode matching now allows HTML tags between any characters of the shortcode, since the split can land anywhere, even between the two brackets
    - Any tags inside the match are kept in order after the replacement text rather than deleted, so the markup never ends up unbalanced (e.g. an orphaned </span>)
    - Uses a function replacer, so a $ in a student or lesson name is inserted literally instead of being treated as a special replacement pattern
  - Added two helpers, sgShortCodeRegex() and sgReplaceShortCode(), used by all three shortcode paths (the 🤓 icon, the 📄 icon, and the automatic replacement before submitting or switching students)

### [palcschool-rc-entry.user.js](https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcschool-rc-entry.user.js)
- v3.1.0
  - Creating this script as an update to [palcschool-rce.user.js](https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcschool-rce.user.js) which will be deprecated in the future.
  - This is a hacked together upgrade that is held together with duck tape and string. This script will eventually fail in the future with any minor or major platform upgrades. At that point, this script will most likely be deprecated as well.
- v3.1.1
  - Removed the automatic floor grade. Student's true grades will be copied.
- v3.1.2
  - Updated script name and removed the version number on the script name
  - Added the update url and download url to the metadata of the script

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

- v2.11.50:
  - Updated marking period and progress check date ranges for the 25-26 school year.
  - Minor updates to the message Student Insights page.

- v2.12.0:
  - Updated all time frames for the 2026-2027 school year (school year, MP1-MP4) per Attachment D of the 2026-27 PALCS Academic Calendar:
    - School Year: 2026-08-25 to 2027-06-10
    - MP1: 2026-08-25 to 2026-11-01
    - MP2: 2026-11-02 to 2027-01-24
    - MP3: 2027-01-25 to 2027-04-11
    - MP4: 2027-04-12 to 2027-06-10
  - Removed Progress Checks (PC1/PC2/PC3) entirely, since PALCS no longer uses them:
    - Removed MP#PC# time frame constants
    - Removed getCurrentProgressCheck(); replaced getMarkingPeriodProgressCheck() with getMarkingPeriodForDueDate() (marking-period-only lookup)
    - Removed "Current Progress Check" from the time frame display info
    - Removed PC options from the predefined time frame dropdown
    - Removed PC rows from the Course Totals table definition
    - Submissions table badge now shows the Marking Period instead of the Progress Check

- v2.13.0:
  - Fixed due dates not matching what Canvas shows the student when an assignment has an individual/section/group override (most commonly an extension that moves the due date LATER than the assignment's base/default due date)
    - Root cause: due dates were previously resolved by taking the EARLIEST of assignment.due_at (base date) and submission.cached_due_date. That's only correct when an override moves the date earlier; it silently picks the wrong (earlier) date whenever an override moves it later.
    - Added getEffectiveDueDate(assignment, submission), which reads Canvas's own already-override-resolved due date from ENV.effective_due_dates[assignmentId][studentId].due_at -- the literal value Canvas shows the student, so there's no more guessing between due_at and cached_due_date
    - Falls back to the old earliest-of logic only if Canvas didn't provide an effective_due_dates entry for that assignment/student (should be rare)
  - Replaced all three ad hoc due-date computations (group/weight totals filter, submissions table sort comparator, and the submissions table row due date / marking-period badge / late-status logic) with this single shared function, so every part of the tool now agrees on the same due date for a given assignment

- v2.14.0:
  - Added a "Use Canvas Grading Period Dates" checkbox to The Waybetter Gradebook Advanced Settings, so marking period boundaries no longer have to come solely from hardcoded dates verified against a calendar PDF every year
    - Checked (default): MP1-MP4 boundaries are pulled live from ENV.grading_period_set.grading_periods
    - Unchecked: falls back to the hardcoded MP#TotalStartTime/EndTime constants
    - Intended mainly for troubleshooting -- e.g. if an assignment isn't showing up where expected, toggle this to compare against the hardcoded dates
  - If Canvas's grading_period_set is missing or doesn't contain exactly four cleanly-titled MP1-MP4 periods, silently and safely falls back to the hardcoded dates even with the box checked (never breaks the gradebook)
  - predefinedTimeFramesObject / predefinedMarkingPeriodTimeFramesObject are now populated by refreshMarkingPeriodSource(), which re-runs whenever the checkbox changes -- everything downstream (dropdown, sort, badges, row filtering) reads from the same object, so it automatically stays in sync with the toggle
  - #timeFrameDisplay now shows "Marking Period Source" (Canvas vs. hard-coded, including when a checked box silently fell back) and the resolved MP1-MP4 date ranges, so what's displayed always matches whichever source is active
  - Session-only, matching the other Advanced Settings checkboxes: always resets to checked (Canvas dates) on page load, nothing is persisted

- v2.15.0:
  - Renamed the student-switcher "Apply" button to "Load Student Data" -- it was never just applying a UI filter, it was always doing a full page navigation/reload, and the new name says so
  - Added a refresh icon button next to it, as a shortcut for "reload this student's data" without needing to touch the dropdown first. Both buttons now call a single shared loadStudentData(url) function (full page reload via window.location.href) -- the button uses whichever student is selected in the dropdown, the icon uses the current page as-is
  - This has to be a real page reload (not an in-place API re-fetch) because ENV (effective_due_dates, grading_period_set, etc.) is baked into the page by Canvas at initial render and doesn't update via any of this script's API calls -- an in-place refresh would leave those stale while everything else looked current

- v2.15.1:
  - Swapped the refresh button's icon from a plain Unicode arrow to Canvas's own icon-refresh icon font class, and gave it the exact same classes/margin as the Load Student Data button (Button, Button--primary) so the two sit together as a matched pair rather than looking like two different button styles

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
- Add additional functionality to the Student Insights tab (currently still mostly a placeholder/sneak peek)

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

  - GOALS for v2.16.0:
    - Add additional functionality to the Student Insights tab

### [palcs-ui-standalone-beta.user.js](https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcs-ui-standalone-beta.user.js)
- v5.3.1
  - Adjusting version numbers to align with common practice
  - Removed some focusing on the SpeedGrader comment box when hovering over some elements. This was a hacky way to overcome the broken keyboard shortcuts that Canvas introduced into the SpeedGrader (ironic name, SpeedGrader). Canvas has now fixed the keyboard shortcuts after an absurd amount of time, so I'm removing the hacky code.