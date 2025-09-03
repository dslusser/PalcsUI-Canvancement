# Palcs-UI Canvancement Installation Scripts
Choose an installation script from the list that most closely matches how you wish to use the Palcs-UI Canvancements. This is the script that will be installed into the Tampermonkey browser extension.

The fastest (and easiest) way to install a Palcs-UI Canvancement flavor is to click on the filename from the description. If you click on the filename from the list at the top, you can view the code, but then you will need to click the Raw button to install it.

## Default Installation
[palcs-ui-standalone.user.js](https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcs-ui-standalone.user.js) is currently the main type of configuration for the majority of Canvas enhancements and considered the "default" configuration. In this default configuration, all types of enhancements are enabled. If the user desires, they have the ability to disable any specific options in the configuration. The user simply changes the option type from "true" to "false" in order to turn off a configuration option.

This installation script may at any time stop working due to changes and updates that Canvas might make to their codebase. I'll do my best to keep up with the changes, but as this is a side project, I'm not guaranteeing anything. If a new feature is added, or a bug is fixed, the user scripts should automatically update your installed scripts. If you customize the default installation configuration options (ex. change a value from "true" to "false"), your custom configuration options might be reset when a new version is released. For most people, it is best to just to start with this default script, leave the configuration options as they are, and then watch for announcements of new features.

## Other Information
Additionally, there are some beta scripts that are used to introduce new features before being fully released. You'll also notice some deprecated and/or abandoned scripts that will eventually be removed. 

## Notes About Code Quality
Over the years, this code has slowly become unruly and it has turned into a hot mess. This essentially occurred because I had no time to write proper code, so I just threw together stuff that worked "good enough" and got it out the door. I would love to completely rewrite this entire code to reduce bloat and make it follow proper coding conventions, but I never seem to have the time. After all, this is just a hacked together script to make Canvas do some things more efficiently. 

Cheers and happy Canvas-ing!

## Upcoming Scripts
### The Waybetter Gradebook
Beta version released! This script adds new functionality to the individual student view of the gradebook. One way that this view is accessed by going to a course, clicking on People from the course navigation, then clicking on a student. In the popover drawer, click on the Grades button. The URL looks similar to this structure: https://[MyInstitution].instructure.com/courses/[CourseID]/grades/[StudentID].

On this page, a button with a title of "Enable The Waybetter Gradebook" is automatically created. Click on the button to enable The Waybetter Gradebook. Once enabled, a default time frame of assignments from the current marking period will load. These time frames are defined in the code (and will need to be manually updated each school year).

On the Waybetter Gradebook tab, the assignments and submissions are loaded with various information such as due date time (and progress check), submission time (and indicator of On Time, Late, Missing, Excused, or Manual Entry), a submission status, points earned, points available, SpeedGrader Link, and an Include checkbox that can be used to include/exclude an assignment from the totals calculations.

The Waybetter Gradebook also acts as a What-If calculator. So if you wanted to test out a grade of an assignment for a student, you can modify the grade by clicking on the points earned value. It is important to note that this DOES NOT actually modify the grade of the submission; this is essentially a giant calculator. You can reset changes by the button at the bottom, or refresh the page to return all values to their original numbers.

The Student Insights tab displays some preliminary data analysis of the currently selected time frame. This tab is still being built out and more data will eventually be added in the future.

There is also a Message Student button created on the right side of the page that upon click, should open a new tab that sets up a Canvas Message page to quickly send a message to the student.

On the right hand side are some advanced settings for the Waybetter Gradebook. "Normalize Assignment Groups to 100%" will take account of the groups and weights of the currently selected time frame. If there are weighted assignment groups present in the course, but no assignments are loaded from that group for the selected time frame, then the normalize Assignment Groups to 100% setting will normalize the currently weighted assignment groups to 100%. Turn this setting off if you want to see the calculations without the normalization. 

The setting for "Automatically Select Past Due Assignments Only" does as it is so named. Upon loading of the time frame, it will only select assignments that are past due (and not excused). Turn this setting off to perform the calculations on all assignments.

### Download Canvas Rubric Data
Finally, for an assignment with a rubric, a way to download the rubric data of all students into one spreadsheet.

## Release Notes
### [palcs-ui-standalone.user.js](https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcs-ui-standalone.user.js) 
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

### [palcs-ui-standalone-beta.user.js](https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcs-ui-standalone-beta.user.js)
- v5.3.1
  - Adjusting version numbers to align with common practice
  - Removed some focusing on the SpeedGrader comment box when hovering over some elements. This was a hacky way to overcome the broken keyboard shortcuts that Canvas introduced into the SpeedGrader (ironic name, SpeedGrader). Canvas has now fixed the keyboard shortcuts after an absurd amount of time, so I'm removing the hacky code.

### See [Release Notes](Release%20Notes.md) for additional information on the releases