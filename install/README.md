# Palcs-UI Canvancement Installation Scripts
Choose an installation script from the list that most closely matches how you wish to use the Palcs-UI Canvancements. This is the script that will be installed into the Tampermonkey browser extension.

The fastest (and easiest) way to install a Palcs-UI Canvancement flavor is to click on the filename from the description. If you click on the filename from the list at the top, you can view the code, but then you will need to click the Raw button to install it.

## Default Installation
[palcs-ui.user.js](https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcs-ui.user.js) is currently the main type of configuration for the majority of Canvas enhancements and considered the "default" configuration. In this default configuration, all types of enhancements are enabled. If the user desires, they have the ability to disable any specific options in the configuration. The user simply changes the option type from "true" to "false" in order to turn off a configuration option.

This installation script may at any time stop working due to changes and updates that Canvas might make to their codebase. I'll do my best to keep up with the changes, but as this is a side project, I'm not guaranteeing anything. If a new feature is added, or a bug is fixed, the user scripts should automatically update your installed scripts. If you customize the default installation configuration options (ex. change a value from "true" to "false"), your custom configuration options might be reset when a new version is released. For most people, it is best to just to start with this default script, leave the configuration options as they are, and then watch for announcements of new features.

## Other Information
Additionally, there are some beta scripts that are used to introduce new features before being fully released. You'll also notice some deprecated and/or abandoned scripts that will eventually be removed. 

## Notes About Code Quality
Over the years, this code has slowly become unruly and it has turned into a hot mess. This essentially occurred because I had no time to write proper code, so I just threw together stuff that worked "good enough" and got it out the door. I would love to completely rewrite this entire code to reduce bloat and make it follow proper coding conventions, but I never seem to have the time. After all, this is just a hacked together script to make Canvas do some things more efficiently. 

Cheers and happy Canvas-ing!

## Upcoming Scripts
### The Waybetter Gradebook
A new way to view individual student grades with a number of new features.

### Download Canvas Rubric Data
Finally, for an assignment with a rubric, a way to download the rubric data of all students into one spreadsheet.

## Release Notes
### [palcs-ui.user.js](https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/palcs-ui.user.js) - Version 5.3.00.01
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