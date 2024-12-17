// ==UserScript==
// @name          The Waybetter Gradebook : Standalone : BETA
// @author        Dan Slusser
// @namespace     https://github.com/dslusser/PalcsUI-Canvancement
// @description   User enhancements for the individual Canvas gradebook page
// @match         https://*.instructure.com/courses/*/grades/*
// @noframes
// @version       2.11.45
// @grant         none
// @updateURL     https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/the-waybetter-gradebook-standalone-beta.user.js
// @downloadURL   https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/the-waybetter-gradebook-standalone-beta.user.js
// ==/UserScript==

(function() {
  'use strict';


  var theWayBetterGradebookUI = function() {
    'use strict';
    






    // The Waybetter Gradebook
    // Branch v2.3.02
    // Version v2.11.45
    // Workspace the_waybetter_gradebook_5.code-workspace
    //
    // v2.11.45 OFFICIAL BETA RELEASE AT THIS POINT
    // 
    // 
    // GOALS:
    // 
    // 
    // CURRENT ISSUES:
    // 
    // 
    // TODO:
    // 
    // 
    // RELEASE NOTES:
    // 

    function initializeWaybetterGradebook() {
      //const courseId = '77777'; // Replace with your course ID
      //const studentId = '33333'; // Replace with your student ID
      // accessToken is not actually needed. We're not making any API calls outside of canvas - this can be removed
      //const accessToken = '1111~ucT7Za****************************'; // Replace with your Canvas API access token
      //const apiUrl = 'https://[YourCanvasInstance].instructure.com/api/v1';
      
      const courseId = ENV.course_id || prompt("Enter a course id");
      const studentId = ENV.student_id || prompt("Enter a student id");
      const courseOutcomesEnabled = ENV.student_outcome_gradebook_enabled || false;
      const baseUrl = ENV.DEEP_LINKING_POST_MESSAGE_ORIGIN;
      const apiUrl = `${baseUrl}/api/v1`;
      const enrollmentsApiUrl = `${apiUrl}/courses/${courseId}/enrollments?per_page=100&type[]=StudentEnrollment`;
      
      // Time Frames
      // Custom Time Frames
      //const customStartTime = new Date('2024-04-04T00:00:00'); // Start of custom time frame
      //const customEndTime = new Date('2024-05-01T23:59:59'); // End of custom time frame

      // Custom Time Frames
      const customStartTime = new Date('2024-08-26T00:00:00'); // Start of custom time frame
      const customEndTime = new Date('2025-06-13T23:59:59'); // End of custom time frame
      
      // School Year Time Frames
      const schoolYearStartTime = new Date('2024-08-26T00:00:00'); // Start of School Year time frame
      const schoolYearEndTime = new Date('2025-06-13T23:59:59'); // End of School Year time frame

      // MP1 Total Time Frames
      const MP1TotalStartTime = new Date('2024-08-26T00:00:00'); // Start of MP1 Total time frame
      const MP1TotalEndTime = new Date('2024-11-04T23:59:59'); // End of MP1 Total time frame
      
      // MP1 PC1 Time Frames
      const MP1PC1StartTime = new Date('2024-08-26T00:00:00'); // Start of MP1PC1 time frame
      const MP1PC1EndTime = new Date('2024-09-16T23:59:59'); // End of MP1PC1 time frame
      
      // MP1 PC2 Time Frames
      const MP1PC2StartTime = new Date('2024-09-17T00:00:00'); // Start of MP1PC2 time frame
      const MP1PC2EndTime = new Date('2024-10-09T23:59:59'); // End of MP1PC2 time frame
      
      // MP1 PC3 Time Frames
      const MP1PC3StartTime = new Date('2024-10-10T00:00:00'); // Start of MP1PC3 time frame
      const MP1PC3EndTime = new Date('2024-11-04T23:59:59'); // End of MP1PC3 time frame

      // MP2 Total Time Frames
      const MP2TotalStartTime = new Date('2024-11-05T00:00:00'); // Start of MP2 Total time frame
      const MP2TotalEndTime = new Date('2025-01-24T23:59:59'); // End of MP2 Total time frame
      
      // MP2 PC1 Time Frames
      const MP2PC1StartTime = new Date('2024-11-05T00:00:00'); // Start of MP2PC1 time frame
      const MP2PC1EndTime = new Date('2024-11-26T23:59:59'); // End of MP2PC1 time frame
      
      // MP2 PC2 Time Frames
      const MP2PC2StartTime = new Date('2024-11-27T00:00:00'); // Start of MP2PC2 time frame
      const MP2PC2EndTime = new Date('2024-12-19T23:59:59'); // End of MP2PC2 time frame
      
      // MP2 PC3 Time Frames
      const MP2PC3StartTime = new Date('2024-12-20T00:00:00'); // Start of MP2PC3 time frame
      const MP2PC3EndTime = new Date('2025-01-24T23:59:59'); // End of MP2PC3 time frame

      // MP3 Total Time Frames
      const MP3TotalStartTime = new Date('2025-01-25T00:00:00'); // Start of MP3 Total time frame
      const MP3TotalEndTime = new Date('2025-04-01T23:59:59'); // End of MP3 Total time frame
      
      // MP3 PC1 Time Frames
      const MP3PC1StartTime = new Date('2025-01-25T00:00:00'); // Start of MP3PC1 time frame
      const MP3PC1EndTime = new Date('2025-02-14T23:59:59'); // End of MP3PC1 time frame
      
      // MP3 PC2 Time Frames
      const MP3PC2StartTime = new Date('2025-02-15T00:00:00'); // Start of MP3PC2 time frame
      const MP3PC2EndTime = new Date('2025-03-10T23:59:59'); // End of MP3PC2 time frame
      
      // MP3 PC3 Time Frames
      const MP3PC3StartTime = new Date('2025-03-11T00:00:00'); // Start of MP3PC3 time frame
      const MP3PC3EndTime = new Date('2025-04-01T23:59:59'); // End of MP3PC3 time frame

      // MP4 Total Time Frames
      const MP4TotalStartTime = new Date('2025-04-02T00:00:00'); // Start of MP4 Total time frame
      const MP4TotalEndTime = new Date('2025-06-13T23:59:59'); // End of MP4 Total time frame
      
      // MP4 PC1 Time Frames
      const MP4PC1StartTime = new Date('2025-04-02T00:00:00'); // Start of MP4PC1 time frame
      const MP4PC1EndTime = new Date('2025-04-30T23:59:59'); // End of MP4PC1 time frame
      
      // MP4 PC2 Time Frames
      const MP4PC2StartTime = new Date('2025-05-01T00:00:00'); // Start of MP4PC2 time frame
      const MP4PC2EndTime = new Date('2025-05-21T23:59:59'); // End of MP4PC2 time frame
      
      // MP4 PC3 Time Frames
      const MP4PC3StartTime = new Date('2025-05-22T00:00:00'); // Start of MP4PC3 time frame
      const MP4PC3EndTime = new Date('2025-06-13T23:59:59'); // End of MP4PC3 time frame

      // Define an object with all predefined time frames
      const predefinedTimeFramesObject = {
          SchoolYearTotal: { start: schoolYearStartTime, end: schoolYearEndTime },
          MP1Total: { start: MP1TotalStartTime, end: MP1TotalEndTime },
          MP1PC1: { start: MP1PC1StartTime, end: MP1PC1EndTime },
          MP1PC2: { start: MP1PC2StartTime, end: MP1PC2EndTime },
          MP1PC3: { start: MP1PC3StartTime, end: MP1PC3EndTime },
          MP2Total: { start: MP2TotalStartTime, end: MP2TotalEndTime },
          MP2PC1: { start: MP2PC1StartTime, end: MP2PC1EndTime },
          MP2PC2: { start: MP2PC2StartTime, end: MP2PC2EndTime },
          MP2PC3: { start: MP2PC3StartTime, end: MP2PC3EndTime },
          MP3Total: { start: MP3TotalStartTime, end: MP3TotalEndTime },
          MP3PC1: { start: MP3PC1StartTime, end: MP3PC1EndTime },
          MP3PC2: { start: MP3PC2StartTime, end: MP3PC2EndTime },
          MP3PC3: { start: MP3PC3StartTime, end: MP3PC3EndTime },
          MP4Total: { start: MP4TotalStartTime, end: MP4TotalEndTime },
          MP4PC1: { start: MP4PC1StartTime, end: MP4PC1EndTime },
          MP4PC2: { start: MP4PC2StartTime, end: MP4PC2EndTime },
          MP4PC3: { start: MP4PC3StartTime, end: MP4PC3EndTime }
      };

      // Define an object with all predefined Marking Period time frames
      const predefinedMarkingPeriodTimeFramesObject = {
          MP1Total: { start: MP1TotalStartTime, end: MP1TotalEndTime },
          MP2Total: { start: MP2TotalStartTime, end: MP2TotalEndTime },
          MP3Total: { start: MP3TotalStartTime, end: MP3TotalEndTime },
          MP4Total: { start: MP4TotalStartTime, end: MP4TotalEndTime }
      };

      // Initialize datesLoaded
      let datesLoaded = 'None';

      // Append point for our container
      const contentContainer = document.getElementById('grade-summary-content');
      const waybetterGradebookContainer = document.createElement('div');
      waybetterGradebookContainer.id = 'waybetterGradebookContainer';

      // Check if the first child exists and insert the new div as the second child
      // #print-grades-container should remain as the first child
      // Get the element 'print-grades-container' which should be the first child
      const printGradesContainer = document.getElementById('print-grades-container');

      // Insert the new div after the 'print-grades-container'
      if (printGradesContainer) {
          contentContainer.insertBefore(waybetterGradebookContainer, printGradesContainer.nextSibling);
      } else {
          // If 'print-grades-container' is not found, append at the end (fallback)
          contentContainer.appendChild(waybetterGradebookContainer);
      }

      // Create a new div with the id 'studentInsightsContainer'
      const studentInsightsContainer = document.createElement('div');
      studentInsightsContainer.id = 'studentInsightsContainer';

      // Insert the new div after the 'waybetterGradebookContainer'
      if (waybetterGradebookContainer) {
          contentContainer.insertBefore(studentInsightsContainer, waybetterGradebookContainer.nextSibling);
      } else {
          // If 'waybetterGradebookContainer' is not found, append at the end (fallback)
          contentContainer.appendChild(studentInsightsContainer);
      }

      let studentFirstNamefromEnrollments = '';

      // Create a new div with the id 'learningMasteryGradebookContainer'
      /*const learningMasteryGradebookContainer = document.createElement('div');
      learningMasteryGradebookContainer.id = 'learningMasteryGradebookContainer';
      // Do not insert this div yet. It's based on the course outcomes enabled flag. Check setupUI().

      if (!courseOutcomesEnabled && waybetterGradebookContainer) {
        // Insert the new div after the 'studentInsightsContainer'
        if (studentInsightsContainer) {
            contentContainer.insertBefore(learningMasteryGradebookContainer, studentInsightsContainer.nextSibling);
        } else {
            // If 'studentInsightsContainer' is not found, append at the end (fallback)
            contentContainer.appendChild(learningMasteryGradebookContainer);
        }
      }*/

      // Select the grades display element using querySelector
      const gradesDisplayElement = document.querySelector("#student-grades-right-content > div.student_assignment.final_grade > span.grade");

      // Check if the element exists to avoid errors
      if (gradesDisplayElement) {
          // Set the innerText to the desired value
          //gradesDisplayElement.innerText = "N/A";
          const newContent = `N/A`;
          fadeOutAndInElement(gradesDisplayElement, newContent);
      } else {
          console.log("gradesDisplayElement not found");
      }

      // Select the Assignments are weighted by group table element using querySelector
      const assignmentsGroupTableElement = document.querySelector("#assignments-not-weighted > div:nth-child(1) > table.summary");

      // Check if the element exists to avoid errors
      if (assignmentsGroupTableElement) {
          const only_consider_graded_assignments_wrapperElement = document.getElementById('only_consider_graded_assignments_wrapper');
          fadeOutElementLinear(only_consider_graded_assignments_wrapperElement);
          // Set the innerText to the desired value
          //assignmentsGroupTableElement.innerHTML = `<thead><tr><th scope="col">Group</th><th scope="col">Weight</th></tr></thead><tbody></tbody>`;
          const newContent = `<thead><tr><th scope="col">Group</th><th scope="col">Weight</th></tr></thead><tbody></tbody>`;
          fadeOutAndInElement(assignmentsGroupTableElement, newContent);
          let assignmentsGroupTableBodyElement = document.querySelector("#assignments-not-weighted > div:nth-child(1) > table.summary > tbody");
          console.log("early assignmentsGroupTableBodyElement: " + assignmentsGroupTableBodyElement);
      } else {
          console.log("assignmentsGroupTableElement not found");
      }

      
      // Function to fetch all pages of a resource
      async function fetchAllPages(url) {
        let results = [];
        let response = await fetch(url);
        let data = await response.json();
        results = results.concat(data);
      
        while (response.headers.get('Link').includes('rel="next"')) {
          const nextUrl = response.headers.get('Link').match(/<(.*?)>; rel="next"/)[1];
          response = await fetch(nextUrl);
          data = await response.json();
          results = results.concat(data);
        }

        //console.log("results: " + JSON.stringify(results));
      
        return results;
      }

      async function fetchAllPages2(url) {
        let results = [];
        let response = await fetch(url);
        let data = await response.json();
        results = results.concat(data);
      
        /*while (response.headers.get('Link').includes('rel="next"')) {
          const nextUrl = response.headers.get('Link').match(/<(.*?)>; rel="next"/)[1];
          response = await fetch(nextUrl);
          data = await response.json();
          results = results.concat(data);
        }*/

        //console.log("results: " + JSON.stringify(results));
      
        return results;
      }
      
      // Function to fetch assignment groups
      async function fetchAssignmentGroups() {
        const url = `${apiUrl}/courses/${courseId}/assignment_groups?per_page=100`;
        return fetchAllPages(url);
      }

      // Function to fetch enrollments
      async function fetchEnrollments() {
          const url = `${apiUrl}/courses/${courseId}/enrollments?per_page=100&type[]=StudentEnrollment`;
          return fetchAllPages(url);
      }
      
      // Function to fetch submissions for a single student, including assignment details
      /*async function fetchSubmissionsForStudent() {
        const url = `${apiUrl}/courses/${courseId}/students/submissions?student_ids[]=${studentId}&include[]=assignment&include[]=assignment_overrides&per_page=100`;
        return fetchAllPages(url);
      }*/

      async function fetchSubmissionsForStudent() {
        const url = `${apiUrl}/courses/${courseId}/students/submissions?student_ids[]=${studentId}&include[]=assignment&include[]=assignment_overrides&include[]=submission_history&per_page=100`;
        try {
            const submissions = await fetchAllPages(url);
            console.log('Current Way of Fetching Submissions:', submissions);
            return submissions;
        } catch (error) {
            console.error('Error fetching submissions:', error);
            return []; // Return an empty array or handle the error as appropriate
        }
      }

      // Function to fetch assignments via analytics
      // Not currently using, just an option for a different way
      // https://canvas.instructure.com/doc/api/all_resources.html#method.analytics_api.student_in_course_assignments
      async function fetchAssignmentsViaAnalytics() {
        const url = `${apiUrl}/courses/${courseId}/analytics/users/${studentId}/assignments`;
        try {
          const submissions = await fetchAllPages2(url);
          //console.log('Fetched Analytics Submissions:', submissions);
          return submissions;
        } catch (error) {
            console.error('Error fetching analytics submissions:', error);
            return []; // Return an empty array or handle the error as appropriate
        }
      }

      function getCurrentMarkingPeriod(currentDate, timeFrames) {
          const markingPeriods = ['MP1Total', 'MP2Total', 'MP3Total', 'MP4Total'];
          for (let period of markingPeriods) {
              const { start, end } = timeFrames[period];
              if (currentDate >= new Date(start) && currentDate <= new Date(end)) {
                  return period.replace('MP', 'Marking Period ').replace('Total', '');
              }
          }
          return 'Not in any marking period for the school year';
      }
      
      function getCurrentProgressCheck(currentDate, timeFrames) {
          const progressChecks = [
              'MP1PC1', 'MP1PC2', 'MP1PC3',
              'MP2PC1', 'MP2PC2', 'MP2PC3',
              'MP3PC1', 'MP3PC2', 'MP3PC3',
              'MP4PC1', 'MP4PC2', 'MP4PC3'
          ];
          for (let check of progressChecks) {
              const { start, end } = timeFrames[check];
              if (currentDate >= new Date(start) && currentDate <= new Date(end)) {
                  return check.replace('PC', ' Progress Check ');
              }
          }
          return 'Not in any progress check for the school year';
      }

      // Function to determine the marking period progress check for the submissions table
      function getMarkingPeriodProgressCheck(dueDate) {
        // Filter the predefinedTimeFramesObject to only include the relevant progress checks
        const relevantTimeFrames = ['MP1PC1', 'MP1PC2', 'MP1PC3', 'MP2PC1', 'MP2PC2', 'MP2PC3', 'MP3PC1', 'MP3PC2', 'MP3PC3', 'MP4PC1', 'MP4PC2', 'MP4PC3'];

        for (const period of relevantTimeFrames) {
            const { start, end } = predefinedTimeFramesObject[period];
            if (dueDate >= start && dueDate <= end) {
                return period;
            }
        }
        return null; // Return null if no matching period is found
      }

      // Original function to create and update the display of the current date, MP, and PC time frames. No current animations.
      // This function is being replaced with the createTimeFramesDisplayInfo function and the updateTimeFramesDisplayInfo function.
      function updateDisplay() {
          const currentDate = new Date();
          const currentMP = getCurrentMarkingPeriod(currentDate, predefinedTimeFramesObject);
          const currentMPPC = getCurrentProgressCheck(currentDate, predefinedTimeFramesObject);
          //let datesLoaded = '';
      
          // Assuming datesLoaded is updated elsewhere in your code, e.g., when dates are loaded:
          // datesLoaded = `${formatDate(loadedStartDate)} to ${formatDate(loadedEndDate)}`;
      
          const displayDiv = document.getElementById('timeFrameDisplay');
          displayDiv.innerHTML = ``;
          displayDiv.innerHTML = `
              <div>
                  <p>
                      <span style="margin-right: 5px;"><b>Current Date:</b> </span><span style="margin-right: 10px;"> ${currentDate.toLocaleString()} </span>
                      <span style="margin-right: 5px;"><b>Current Marking Period:</b> </span><span style="margin-right: 10px;"> ${currentMP} </span>
                      <span style="margin-right: 5px;"><b>Current Progress Check:</b> </span><span style="margin-right: 10px;"> ${currentMPPC} </span>
                  </p>
                  <p>
                      <span style="margin-right: 5px;"><b>Dates Loaded:</b> </span><span id="datesLoaded" style="margin-right: 10px;"> ${datesLoaded} </span>
                  </p>
              </div>
          `;
      }

      // Function to create the display of the current date, MP, and PC time frames
      // This is to be used in conjunction with the updateTimeFramesDisplayInfo function
      // The animation fade effects are handled in the animateCurrentDateDisplay and animateDatesLoadedDisplay functions, 
      // the CSS in the SetupUI function, and their click event listeners.
      function createTimeFramesDisplayInfo() {
          const currentDate = new Date();
          const currentMP = getCurrentMarkingPeriod(currentDate, predefinedTimeFramesObject);
          const currentMPPC = getCurrentProgressCheck(currentDate, predefinedTimeFramesObject);
      
          const displayDiv = document.getElementById('timeFrameDisplay');
          displayDiv.innerHTML = `
              <div>
                  <p>
                      <span style="margin-right: 5px;"><b>Current Date:</b> </span>
                      <span id="currentDateDisplay" style="margin-right: 10px;"> ${currentDate.toLocaleString()} </span>
                      <span style="margin-right: 5px;"><b>Current Marking Period:</b> </span><span id="currentMPDisplay" style="margin-right: 10px;"> ${currentMP} </span>
                      <span style="margin-right: 5px;"><b>Current Progress Check:</b> </span><span id="currentMPPCDisplay" style="margin-right: 10px;"> ${currentMPPC} </span>
                  </p>
                  <p>
                      <span style="margin-right: 5px;"><b>Dates Loaded:</b> </span>
                      <span id="datesLoadedDisplay" style="margin-right: 10px;"> ${datesLoaded} </span>
                  </p>
              </div>
          `;
      }

      // Function to update the display of the current date, MP, and PC time frames
      // This is to be used in conjunction with the createTimeFramesDisplayInfo function.
      // The animation fade effects are handled in the animateCurrentDateDisplay and animateDatesLoadedDisplay functions, 
      // the CSS in the SetupUI function, and their click event listeners.
      function updateTimeFramesDisplayInfo() {
          const currentDate = new Date();
          const currentMP = getCurrentMarkingPeriod(currentDate, predefinedTimeFramesObject);
          const currentMPPC = getCurrentProgressCheck(currentDate, predefinedTimeFramesObject);
      
          // Update Current Date with fade effect (fade effect moved to it's own function)
          const currentDateDisplay = document.getElementById('currentDateDisplay');
          currentDateDisplay.textContent = currentDate.toLocaleString();
          /*currentDateDisplay.style.opacity = '0';
          setTimeout(() => {
              currentDateDisplay.textContent = currentDate.toLocaleString();
              currentDateDisplay.style.opacity = '1';
          }, 500);*/
      
          // Update Dates Loaded with fade effect (fade effect moved to it's own function)
          const datesLoadedDisplay = document.getElementById('datesLoadedDisplay');
          datesLoadedDisplay.textContent = datesLoaded;
          /*datesLoadedDisplay.style.opacity = '0';
          setTimeout(() => {
              datesLoadedDisplay.textContent = datesLoaded;
              datesLoadedDisplay.style.opacity = '1';
          }, 500);*/
      
          // Directly update Current Marking Period and Current Progress Check 
          // (technically, we don't really need this, but it's here for now with no fade effect)
          document.getElementById('currentMPDisplay').textContent = currentMP;
          document.getElementById('currentMPPCDisplay').textContent = currentMPPC;
      }

      function getCurrentMarkingPeriodForTimeFrameSelector() {
          const currentDate = new Date(); // Get the current date and time
      
          for (const [key, { start, end }] of Object.entries(predefinedMarkingPeriodTimeFramesObject)) {
              if (currentDate >= start && currentDate <= end) {
                  return key; // Return the key of the matching time frame
              }
          }
          return null; // Return null if no time frame matches
      }

      function setDefaultTimeFrameForTimeFrameSelector() {
          //const currentDate = new Date(); // Get the current date and time
          const currentMarkingPeriod = getCurrentMarkingPeriodForTimeFrameSelector();
          const timeFrameSelector = document.getElementById('predefinedTimeFrames'); // Assuming the dropdown has this ID
      
          if (currentMarkingPeriod) {
              timeFrameSelector.value = currentMarkingPeriod; // Set the dropdown to the current marking period
          } else {
              timeFrameSelector.value = ''; // Set to default option, e.g., "Select a time frame"
          }
      }

      function setCustomDatesForCurrentMarkingPeriod() {
          const currentMarkingPeriod = getCurrentMarkingPeriodForTimeFrameSelector();
          if (currentMarkingPeriod) {
              const { start, end } = predefinedMarkingPeriodTimeFramesObject[currentMarkingPeriod];
              const startDateInput = document.getElementById('customStartDate');
              const endDateInput = document.getElementById('customEndDate');
      
              if (startDateInput && endDateInput) {
                  startDateInput.value = formatDateToInput(start);
                  endDateInput.value = formatDateToInput(end);
              }
          } else {
              console.log("No current marking period found.");
          }
      }
      
      function formatDateToInput(date) {
          const d = new Date(date);
          let month = '' + (d.getMonth() + 1);
          let day = '' + d.getDate();
          let year = d.getFullYear();
      
          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;
      
          return [year, month, day].join('-');
      }

      // Function to set up a tab with specified content
      function setupTabWithContent(tabName, contentId, containerId) {
        const navpills = document.getElementById('navpills');
        if (navpills) {
            // Check if the tab already exists
            let existingTab = document.querySelector(`#navpills li[aria-controls="${contentId}"]`);
            if (!existingTab) {
                // Create a new tab if it doesn't exist
                const newTab = createTab(tabName, contentId);
                navpills.appendChild(newTab);
                existingTab = newTab; // Assign the newly created tab to existingTab
            } else {
              // Update the href of the existing tab
              const tabLink = existingTab.querySelector('a');
              if (tabLink) {
                  tabLink.href = `#tab-${contentId}`;
              }
            }
    
            // Check if the tab content already exists
            let existingTabContent = document.getElementById(contentId);
            if (!existingTabContent) {
                // Create new tab content if it doesn't exist
                existingTabContent = createTabContent(contentId);
                const tabContentContainer = document.getElementById('grade-summary-content');
                tabContentContainer.appendChild(existingTabContent);
            } else {
                // Ensure existing tab content has the necessary classes
                const requiredClasses = ['ui-tabs-panel', 'ui-widget-content', 'ui-corner-bottom'];
                requiredClasses.forEach(cls => {
                    if (!existingTabContent.classList.contains(cls)) {
                        existingTabContent.classList.add(cls);
                    }
                });
            }
    
            // Move the existing content into the tab content
            moveContentToTab(existingTabContent, containerId);
    
            // Ensure event listeners are added to the correct tab and content
            if (existingTab && existingTabContent) {
                addTabEventListeners(existingTab, existingTabContent, `tab-${contentId}`);
            } else {
                console.error('Failed to add event listeners: Tab or content is null', { existingTab, existingTabContent });
            }
        }
      }

      // Function to create a new tab
      function createTab(tabName, contentId) {
          const tab = document.createElement('li');
          tab.className = 'ui-state-default ui-corner-top custom-tab';
          tab.setAttribute('role', 'tab');
          tab.setAttribute('tabindex', '-1');
          tab.setAttribute('aria-controls', contentId);
          tab.setAttribute('aria-labelledby', `ui-id-${contentId}`);
          tab.setAttribute('aria-selected', 'false');

          const tabLink = document.createElement('a');
          tabLink.className = 'ui-tabs-anchor';
          tabLink.href = `#tab-${contentId}`; // Ensure unique hash
          tabLink.setAttribute('role', 'presentation');
          tabLink.setAttribute('tabindex', '-1');
          tabLink.id = `ui-id-${contentId}`; // Set the id for the tabLink
          tabLink.textContent = tabName;

          tab.appendChild(tabLink);
          return tab;
      }

      // Function to determine if a tab is a custom tab
      function isCustomTab(tab) {
        // Check if the tab has the 'custom-tab' class
        return tab.classList.contains('custom-tab');
      }

      // Function to create tab content
      function createTabContent(contentId) {
          const content = document.createElement('div');
          content.id = contentId;
          content.className = 'ui-tabs-panel ui-widget-content ui-corner-bottom';
          content.setAttribute('role', 'tabpanel');
          content.setAttribute('aria-expanded', 'false');
          content.setAttribute('aria-hidden', 'true');
          content.style.display = 'none';
          return content;
      }

      // Function to move a content container into the new tab content
      function moveContentToTab(newTabContent, containerId) {
        const contentContainer = document.getElementById(containerId);
        if (contentContainer && !newTabContent.contains(contentContainer)) {
            newTabContent.appendChild(contentContainer);
        }
      }

      // Function to add event listeners for tab switching
      function addTabEventListeners(tab, content, hash) {
        if (!tab || !content) {
            console.error('Cannot add event listeners: Tab or content is null', { tab, content });
            return;
        }
    
        tab.querySelector('a').addEventListener('click', (event) => {
          //event.preventDefault();
          
          // Check if the tab is one of your custom tabs
          if (isCustomTab(tab)) {
              // Prevent the POST request from being sent
              event.preventDefault();
              event.stopPropagation();
          }
  
          switchTab(tab, content, hash);
        });
      }

      // Function to add event listeners to existing tabs
      function addEventListenersToExistingTabs() {
        const existingTabs = document.querySelectorAll('#navpills li a');
        existingTabs.forEach(tabLink => {
            let contentId = tabLink.getAttribute('href').substring(1);
    
            // Check if the href already starts with 'tab-'
            if (!contentId.startsWith('tab-')) {
                const newHash = `#tab-${contentId}`;
                tabLink.setAttribute('href', newHash);
                contentId = `tab-${contentId}`; // Update contentId to match the new hash
            }
    
            tabLink.addEventListener('click', (event) => {
                event.preventDefault();
                const parentTab = tabLink.parentElement;
                const contentToShow = document.getElementById(contentId.replace('tab-', ''));
                switchTab(parentTab, contentToShow, `#${contentId}`);
            });
        });
      }

      // Function to switch tabs
      function switchTab(tab, content, hash) {
        if (!tab || !content) {
            console.error('Tab or content is null:', { tab, content });
            return;
        }
    
        const allTabs = document.querySelectorAll('#navpills li');
        allTabs.forEach(tab => {
            tab.classList.remove('ui-tabs-active', 'ui-state-active');
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
        });
    
        const allContent = document.querySelectorAll('.ui-tabs-panel');
        allContent.forEach(content => {
            content.setAttribute('aria-expanded', 'false');
            content.setAttribute('aria-hidden', 'true');
            content.style.display = 'none';
        });
    
        tab.classList.add('ui-tabs-active', 'ui-state-active');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
    
        content.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');
        content.style.display = 'block';
    
        // Update the URL hash
        window.location.hash = hash;
      }

      function setupUI(submissions, assignmentGroups, enrollments) {
          console.log("setupUI Launched");

          // Add CSS for various elements
          const style = document.createElement('style');
          style.textContent = `
          .points-earned-clickable {
              cursor: pointer;
          }
          #submissionsTableTBody {
              opacity: 0; /* Start with the table invisible */
              transition: opacity 0.3s ease-in-out;
          }
          #submissionsTable tbody {
              transition: opacity 0.3s ease-in-out;
          }
          /*.ic-Table td {
              border-bottom-color: rgba(0, 0, 0, 1);
              border-bottom-width: 5px;
              border-bottom-style: solid;
          }*/
          #submissionsTableTBody td {
              border-bottom-color: rgba(199, 205, 209, 1); /* canvas border with full opacity */
              border-bottom-width: 1px;
              border-bottom-style: solid;
              transition: border-bottom-color 0.3s ease-in-out;
          }
          #submissionsTableTBody td.animate {
              border-bottom-color: rgba(199, 205, 209, 0); /* canvas border with transparent opacity */
          }
          .fade-transition {
              opacity: 0;
              transition: opacity 0.3s ease-in-out;
          }
          #currentDateDisplay {
              transition: opacity 0.3s ease-in-out;
          }
          #currentDateDisplay.animate {
              opacity: 0;
          }
          #datesLoadedDisplay {
              transition: opacity 0.3s ease-in-out;
          }
          #datesLoadedDisplay.animate {
              opacity: 0;
          }
          `;
          document.head.appendChild(style);
          
          // Create container for Custom Dates Elements
          const customDatesContainer = document.createElement('div');
          customDatesContainer.id = 'customDatesContainer';
          customDatesContainer.style.margin = '10px 0px';
          //customDatesContainer.style.position = 'relative';
          //customDatesContainer.style.left = '100px';

          // Create input fields for custom date range
          const startDateInput = document.createElement('input');
          startDateInput.type = 'date';
          startDateInput.id = 'customStartDate';
          startDateInput.style.margin = '10px 15px 5px 0px';
          startDateInput.style.width = '201px'; // Trying to match the width of the predefined time frame selector
          //startDateInput.style.position = 'relative';
          //startDateInput.style.left = '100px';
          startDateInput.placeholder = 'Start Date';

          const endDateInput = document.createElement('input');
          endDateInput.type = 'date';
          endDateInput.id = 'customEndDate';
          endDateInput.style.margin = '10px 15px 5px 0px';
          endDateInput.style.width = '201px'; // Trying to match the width of the predefined time frame selector
          //endDateInput.style.position = 'relative';
          //endDateInput.style.left = '100px';
          endDateInput.placeholder = 'End Date';

          const CustomDatesLoadButton = document.createElement('button');
          CustomDatesLoadButton.id = 'CustomDatesLoadButton';
          CustomDatesLoadButton.className = 'Button';
          CustomDatesLoadButton.textContent = 'Load Custom Dates';
          CustomDatesLoadButton.style.margin = '10px 15px 5px 0px';
          //CustomDatesLoadButton.style.position = 'relative';
          //CustomDatesLoadButton.style.left = '100px';
          CustomDatesLoadButton.addEventListener('click', () => {
              setTimeout(() => {
                  displaySubmissionsWithCategories(submissions, assignmentGroups, 'customDates');
              }, 500);
          });

          // Append new elements to the document or a specific container
          customDatesContainer.appendChild(startDateInput);
          customDatesContainer.appendChild(endDateInput);
          customDatesContainer.appendChild(CustomDatesLoadButton);

          waybetterGradebookContainer.appendChild(customDatesContainer);

          // Call createStudentDropdown with enrollments data
          createStudentDropdown(enrollments);

          const submissionsTable = document.createElement('table');
          const submissionsTableTBody = document.createElement('tbody');
          submissionsTableTBody.id = 'submissionsTableTBody';
          console.log("Original submissionsTableTBody: ", submissionsTableTBody);
          // Add styling to the table
          //submissionsTable.style.width = '80%';
          //submissionsTable.style.position = 'relative';
          //submissionsTable.style.left = '100px';
          submissionsTable.id = "submissionsTable"
          submissionsTable.className = "ic-Table ic-Table--hover-row ic-Table--grades-summary-table";
          submissionsTable.innerHTML = `
          <thead>
              <tr>
                  <th>Assignment Name</th>
                  <th>Due Date</th>
                  <th>Submission Time</th>
                  <th>Submission Status</th>
                  <th>Points Earned</th>
                  <th>Points Available</th>
                  <th>SpeedGrader Link</th>
                  <th>Include</th>
              </tr>
          </thead>
          `;
          submissionsTable.appendChild(submissionsTableTBody);
          console.log("Original submissionsTable: ", submissionsTable);
          //waybetterGradebookContainer.appendChild(submissionsTable);

          // Create drop down selector to choose from a set of predefined dates
          const timeFrameSelectorContainer = document.createElement('div');
          timeFrameSelectorContainer.id = 'timeFrameSelector';
          timeFrameSelectorContainer.style.margin = '10px 0px';
          //timeFrameSelectorContainer.style.position = 'relative';
          //timeFrameSelectorContainer.style.left = '100px';
        
          const predefinedTimeFramesSelect = document.createElement('select');
          predefinedTimeFramesSelect.id = 'predefinedTimeFrames';
          predefinedTimeFramesSelect.style.margin = '10px 15px 5px 0px';
          predefinedTimeFramesSelect.innerHTML = `
            <option value="">Select a Time Frame</option>
            <option value="MP1Total">Marking Period 1</option>
            <option value="MP1PC1">MP1 Progress Check 1</option>
            <option value="MP1PC2">MP1 Progress Check 2</option>
            <option value="MP1PC3">MP1 Progress Check 3</option>
            <option value="MP2Total">Marking Period 2</option>
            <option value="MP2PC1">MP2 Progress Check 1</option>
            <option value="MP2PC2">MP2 Progress Check 2</option>
            <option value="MP2PC3">MP2 Progress Check 3</option>
            <option value="MP3Total">Marking Period 3</option>
            <option value="MP3PC1">MP3 Progress Check 1</option>
            <option value="MP3PC2">MP3 Progress Check 2</option>
            <option value="MP3PC3">MP3 Progress Check 3</option>
            <option value="MP4Total">Marking Period 4</option>
            <option value="MP4PC1">MP4 Progress Check 1</option>
            <option value="MP4PC2">MP4 Progress Check 2</option>
            <option value="MP4PC3">MP4 Progress Check 3</option>
            <option value="SchoolYearTotal">School Year</option>
            <!-- Add other predefined time frames here -->
          `;

          predefinedTimeFramesSelect.addEventListener('change', function() {
              console.log("predefinedTimeFramesSelect changed");
              const timeFrameKey = this.value;
              console.log("timeFrameKey: " + timeFrameKey);
              if (timeFrameKey) {
                  const timeFrame = predefinedTimeFramesObject[timeFrameKey];
                  console.log("timeFrame.start: " + timeFrame.start);
                  console.log("timeFrame.end: " + timeFrame.end);
                  if (timeFrame) {
                      const startDate = new Date(timeFrame.start);
                      const endDate = new Date(timeFrame.end);
                      //console.log("startDate: " + startDate);
                      //console.log("endDate: " + endDate);
                      //console.log("formatDateYYYYMMDD(startDate): " + formatDateYYYYMMDD(startDate));
                      //console.log("formatDateYYYYMMDD(endDate): " + formatDateYYYYMMDD(endDate));
                      document.getElementById('customStartDate').value = formatDateYYYYMMDD(startDate);
                      document.getElementById('customEndDate').value = formatDateYYYYMMDD(endDate);
                  }
              } else {
                  // If the selected value is "", do nothing
                  console.log('No time frame selected');
              }
          });

          const preDefinedTimeFramesLoadButton = document.createElement('button');
          preDefinedTimeFramesLoadButton.id = 'preDefinedTimeFramesLoadButton';
          preDefinedTimeFramesLoadButton.className = 'Button';
          preDefinedTimeFramesLoadButton.style.margin = '10px 15px 5px 0px';
          preDefinedTimeFramesLoadButton.innerText = 'Load Time Frame';
          //preDefinedTimeFramesLoadButton.onclick = loadData;
          preDefinedTimeFramesLoadButton.addEventListener('click', () => {
              setTimeout(() => {
                  displaySubmissionsWithCategories(submissions, assignmentGroups, 'predefinedDates');
              }, 500);
          });

          timeFrameSelectorContainer.appendChild(predefinedTimeFramesSelect);
          timeFrameSelectorContainer.appendChild(preDefinedTimeFramesLoadButton);

          waybetterGradebookContainer.appendChild(timeFrameSelectorContainer);
          setDefaultTimeFrameForTimeFrameSelector();
          setCustomDatesForCurrentMarkingPeriod();

          //const currentDate = '';
          //const currentMP = '';
          //const currentMPPC = '';
          //let datesLoaded = '';

          const displayDiv = document.createElement('div');
          displayDiv.id = 'timeFrameDisplay';
          displayDiv.style.margin = '20px 0px';
          //displayDiv.style.position = 'relative';
          //displayDiv.style.left = '100px';
          displayDiv.innerHTML = ``;

          waybetterGradebookContainer.appendChild(displayDiv);
          //updateDisplay();
          createTimeFramesDisplayInfo();

          waybetterGradebookContainer.appendChild(submissionsTable);

          // Add advanced settings UI
          addAdvancedSettingsUI();

          // Create css for the #submissionsTable
          const submissionsTableStyle = document.createElement('style');
          submissionsTableStyle.id = 'TheSubmissionsTableStyle';
          submissionsTableStyle.type = 'text/css';
          submissionsTableStyle.textContent = `
          #submissionsTable thead th {
              position: sticky;
              top: 0; /* Adjust if there's a fixed navbar */
              background-color: white;
              z-index: 1000;
          }
          `;
          document.head.appendChild(submissionsTableStyle);

          // Create a new div with the id 'studentInsightsComingSoon'
          const studentInsightsComingSoon = document.createElement('div');
          studentInsightsComingSoon.id = 'studentInsightsComingSoon';
          studentInsightsComingSoon.innerHTML = '<h3>Student Insights coming in 2025!</h3></br><h4>Here is a very early sneak peek at some of the Student Insights data coming soon:</h4></br>';

          // Create a new div with the id 'studentInsightsData'
          const studentInsightsData = document.createElement('div');
          studentInsightsData.id = 'studentInsightsData';
          studentInsightsData.innerHTML = '<p>Sneak peek at Student Insights data coming soon...</p>';

          // Append the new div to the studentInsightsContainer
          studentInsightsContainer.appendChild(studentInsightsComingSoon);
          studentInsightsContainer.appendChild(studentInsightsData);

          // Create a new div with the id 'learningMasteryGradebook'
          const learningMasteryGradebook = document.createElement('div');
          learningMasteryGradebook.id = 'learningMasteryGradebook';
          learningMasteryGradebook.innerHTML = '<h3>Learning Mastery Gradebook is not enabled for this course.</h3>';

          // Append the new div to the studentInsightsContainer
          //learningMasteryGradebookContainer.appendChild(learningMasteryGradebook);


          // Setup transitions for elements
          const waybetterGradebookContainerId = document.getElementById('waybetterGradebookContainer');
          const studentInsightsContainerId = document.getElementById('studentInsightsContainer');
          const assignmentsId = document.getElementById('assignments');
          const outcomesId = document.getElementById('outcomes');
          const navpillsId = document.getElementById('navpills');
          const customDatesContainerId = document.getElementById('customDatesContainer');
          const timeFrameSelectorId = document.getElementById('timeFrameSelector');
          const timeFrameDisplayId = document.getElementById('timeFrameDisplay');
          const submissionsTableId = document.getElementById('submissionsTable');
          //const submissionsTableTBodyId = document.getElementById('submissionsTableTBody'); // This one doesn't really do anything, yet

          // Apply transition class
          [waybetterGradebookContainerId, customDatesContainerId, timeFrameSelectorId, timeFrameDisplayId, submissionsTableId, studentInsightsContainerId, assignmentsId, outcomesId, navpillsId].forEach(element => {
              if (element) {
                  element.classList.add('transition-element');
                  setTimeout(() => element.style.opacity = 1, 10); // Delay slightly to ensure the class applies
              }
          });

          // Additional check for navpillsId
          if (navpillsId) {
              navpillsId.style.display = 'block';
          }

          preDefinedTimeFramesLoadButton.addEventListener('click', () => {
              const submissionsTableTBody = document.getElementById('submissionsTable').querySelector('tbody');
              //submissionsTableTBody.innerHTML = ''; // Clear existing content
              // Fade out the table body before updating
              submissionsTableTBody.style.opacity = '0';
              //submissionsTableTBody.classList.add('animate');
              animateSubmissionsTableTBodyTrTd();
              setTimeout(() => {
                  submissionsTableTBody.style.opacity = '1';
              }, 500); // Delay to allow the fade-out effect to complete
          });

          CustomDatesLoadButton.addEventListener('click', () => {
              const submissionsTableTBody = document.getElementById('submissionsTable').querySelector('tbody');
              //submissionsTableTBody.innerHTML = ''; // Clear existing content
              // Fade out the table body before updating
              submissionsTableTBody.style.opacity = '0';
              //submissionsTableTBody.classList.add('animate');
              animateSubmissionsTableTBodyTrTd();
              setTimeout(() => {
                  submissionsTableTBody.style.opacity = '1';
              }, 500); // Delay to allow the fade-out effect to complete
          });

          preDefinedTimeFramesLoadButton.addEventListener('click', () => {
              const currentDateDisplay = document.getElementById('currentDateDisplay');
              const datesLoadedDisplay = document.getElementById('datesLoadedDisplay');
              currentDateDisplay.style.opacity = '0';
              datesLoadedDisplay.style.opacity = '0';
              animateCurrentDateDisplay();
              animateDatesLoadedDisplay();
              setTimeout(() => {
                  currentDateDisplay.style.opacity = '1';
                  datesLoadedDisplay.style.opacity = '1';
              }, 500); // Delay to allow the fade-out effect to complete
          });

          CustomDatesLoadButton.addEventListener('click', () => {
              const currentDateDisplay = document.getElementById('currentDateDisplay');
              const datesLoadedDisplay = document.getElementById('datesLoadedDisplay');
              currentDateDisplay.style.opacity = '0';
              datesLoadedDisplay.style.opacity = '0';
              animateCurrentDateDisplay();
              animateDatesLoadedDisplay();
              setTimeout(() => {
                  currentDateDisplay.style.opacity = '1';
                  datesLoadedDisplay.style.opacity = '1';
              }, 500); // Delay to allow the fade-out effect to complete
          });

          function preDefinedTimeFramesLoadButtonClick() {
              if (preDefinedTimeFramesLoadButton) {
                  // Somewhat hacky way to set the default time frame to MP4Total if no time frame is selected
                  // We're only doing this temporarily while we're testing and it's outside of the school year
                  // Comment this out when school is back in session and we want to use the current selected time frame. Instead 
                  // just use preDefinedTimeFramesLoadButton.click();
                  const selectElement = document.getElementById('predefinedTimeFrames');
                  console.log("selectElement.value: " + selectElement.value);
                  if (selectElement.value === '') {
                      selectElement.value = 'MP4Total';
                      console.log("selectElement.value is now: " + selectElement.value);
                      const event = new Event('change');
                      selectElement.dispatchEvent(event);
                  }
                  //preDefinedTimeFramesLoadButton.click();
                  //document.getElementById('predefinedTimeFrames').dispatchEvent(event);
                  // Simulate a click on the button to automatically load the time frame
                  preDefinedTimeFramesLoadButton.click();
              } else {
                  console.error('The button with ID "preDefinedTimeFramesLoadButton" does not exist.');
              }
          }
          preDefinedTimeFramesLoadButtonClick();

          function createStudentDropdown(enrollments) {
              console.log("Setting up student dropdown");
              const currentUserId = window.location.pathname.split('/').pop(); // Get the current student ID from the URL
              const container = document.getElementById('print-grades-container');
          
              // Create new div for student dropdown
              const studentNamesContainer = document.createElement('div');
              studentNamesContainer.id = 'student-names-container';
              studentNamesContainer.style.marginBottom = '15px';
              studentNamesContainer.classList.add('transition-element'); // Add transition class
          
              // Create dropdown menu
              const dropdown = document.createElement('select');
              dropdown.id = 'student-dropdown';
              dropdown.style.margin = '10px 15px 5px 0px'; // Apply the dropdown margin styles
          
              // Helper function to strip the domain from a URL
              function stripDomain(url) {
                  const urlObj = new URL(url);
                  return urlObj.pathname;
              }
          
              // Use a Set to track unique user IDs
              const uniqueUserIds = new Set();

              // Populate dropdown with student short names
              enrollments.forEach(enrollment => {
                  const userId = enrollment.user.id;
                  if (!uniqueUserIds.has(userId)) {
                      uniqueUserIds.add(userId); // Add the user ID to the set

                      const option = document.createElement('option');
                      option.value = stripDomain(enrollment.grades.html_url); // Use the stripped URL without domain
                      option.setAttribute('data-user-id', userId); // Store the user ID
                      option.textContent = enrollment.user.short_name; // Use short_name instead of name

                      // Set the default selected value to the current user
                      if (userId == currentUserId) {
                          option.selected = true;
                      }

                      dropdown.appendChild(option);
                  }
              });
          
              // Create Apply button
              const applyButton = document.createElement('button');
              applyButton.textContent = 'Apply';
              applyButton.classList.add('Button'); // Add class "Button"
              applyButton.classList.add('Button--primary'); // Add class "Button--primary"
              applyButton.style.margin = '10px 15px 5px 0px'; // Add the desired margin styles
              applyButton.onclick = () => {
                  const selectedOption = dropdown.options[dropdown.selectedIndex];
                  const selectedUrl = selectedOption.value; // Get the stripped grade URL
                  const selectedUrlWithQueryParam = `${selectedUrl}?thewaybettergradebook=true`; // Append the query parameter
                  window.location.href = selectedUrlWithQueryParam; // Redirect to the new URL
              };
          
              // Append dropdown and button to the new container
              studentNamesContainer.appendChild(dropdown);
              studentNamesContainer.appendChild(applyButton);
          
              // Insert the new div right after #print-grades-container
              container.parentNode.insertBefore(studentNamesContainer, container.nextSibling);
          
              // Ensure the studentNamesContainer is visible
              studentNamesContainer.style.opacity = 0; // Start with opacity 0
              setTimeout(() => studentNamesContainer.style.opacity = 1, 10); // Fade in
          }

          function createMessageStudentButton(enrollments) {
            // This function creates a button to message a student
            console.log("createMessageStudentButton - Setting up message student button");
            const studentGradesShowAll = document.getElementById('student-grades-show-all');
            if (!studentGradesShowAll) return; // Exit if the element doesn't exist
    
            //const currentUserId = window.location.pathname.split('/').pop(); // Get the current student ID from the URL
            const currentUserId = studentId;
            console.log("createMessageStudentButton - currentUserId: " + currentUserId);
            const currentEnrollment = enrollments.find(enrollment => enrollment.user.id == currentUserId);
            //console.log("createMessageStudentButton - currentEnrollment: " + currentEnrollment);
    
            if (currentEnrollment) {
                const studentShortName = currentEnrollment.user.short_name;
                console.log("createMessageStudentButton - studentShortName: " + studentShortName);
                const studentFirstName = studentShortName.split(' ')[0]; // Extract the first name
                console.log("createMessageStudentButton - studentFirstName: " + studentFirstName);
                //const studentId = currentEnrollment.user.id;
                //const baseUrl = window.location.origin; // Assuming base URL is the current origin
                //const courseId = window.location.pathname.split('/')[2]; // Assuming courseId is in the URL path
    
                const messageStudentDiv = document.createElement('div');
                messageStudentDiv.id = 'messageStudent';
                messageStudentDiv.style.display = 'block';
                messageStudentDiv.style.margin = '5px 0px 0px 0px';
                messageStudentDiv.style.maxWidth = '240px';
                messageStudentDiv.classList.add('transition-element'); // Add transition class
    
                const messageButton = document.createElement('button');
                messageButton.className = 'Button';
                messageButton.style.maxWidth = '240px';
                messageButton.style.width = '240px';
                messageButton.style.wordWrap = 'break-word';
                //messageButton.innerHTML = `<i class="icon-email" aria-hidden="true"></i> Message ${studentFirstName}`;
                messageButton.innerHTML = `<i class="icon-email" aria-hidden="true"></i> Message ${studentShortName}`;
    
                messageButton.addEventListener('click', () => {
                    const userNameEncoded = encodeURIComponent(studentShortName);
                    const messageUrl = `${baseUrl}/conversations?context_id=course_${courseId}&user_id=${studentId}&user_name=${userNameEncoded}`;
                    window.open(messageUrl, '_blank');
                });
    
                messageStudentDiv.appendChild(messageButton);
                studentGradesShowAll.parentNode.insertBefore(messageStudentDiv, studentGradesShowAll.nextSibling);

                // Ensure the messageStudentDiv is visible with a fade-in effect
                messageStudentDiv.style.opacity = 0; // Start with opacity 0
                setTimeout(() => messageStudentDiv.style.opacity = 1, 10); // Fade in
            }
          }
          createMessageStudentButton(enrollments);

          // Function to get the first name of the current student from enrollments
          function getStudentFirstName(enrollments) {
            //const currentUserId = window.location.pathname.split('/').pop(); // Get the current student ID from the URL
            const currentUserId = studentId;
            const currentEnrollment = enrollments.find(enrollment => enrollment.user.id == currentUserId);

            if (currentEnrollment) {
                console.log("inside getStudentFirstName function");
                const studentShortName = currentEnrollment.user.short_name;
                const studentFirstName = studentShortName.split(' ')[0]; // Extract the first name
                return studentFirstName;
            }
            return ''; // Return an empty string if the student is not found
          }
          const studentFirstName = getStudentFirstName(enrollments);
          studentFirstNamefromEnrollments = studentFirstName;
          console.log("studentFirstName: " + studentFirstName);
          console.log("studentFirstNamefromEnrollments: " + studentFirstNamefromEnrollments);

          // Ensure jQuery and jQuery UI are loaded and setup the navpills and tabs
          $(function() {
            $.widget("custom.tabManager", {
                options: {
                    courseOutcomesEnabled: courseOutcomesEnabled,
                    dataFetched: {}, // Track fetched data for each tab
                    defaultTab: 'waybetterGradebookContent' // Set the default tab content ID
                },
        
                _create: function() {
                    this._setupTabs();
                    this._addEventListenersToExistingTabs();
                    this._activateDefaultTab(); // Activate the default tab on initialization
                },
        
                _setupTabs: function() {
                  const navpills = this._getOrCreateNavpills();

                  // Always create the Assignments tab first
                  this._setupTabWithContent('Assignments', 'assignments', 'assignmentsContainer', navpills);

                  if (this.options.courseOutcomesEnabled) {
                      // Create Learning Mastery tab second if courseOutcomesEnabled is true
                      this._setupTabWithContent('Learning Mastery', 'outcomes', 'outcomesContainer', navpills);
                  }

                  // Create the Waybetter Gradebook tab
                  this._setupTabWithContent('Waybetter Gradebook', 'waybetterGradebookContent', 'waybetterGradebookContainer', navpills);

                  // Finally, create the Student Insights tab
                  this._setupTabWithContent('Student Insights', 'studentInsightsContent', 'studentInsightsContainer', navpills);
                },
        
                _getOrCreateNavpills: function() {
                    let navpills = $('#navpills');
                    if (!navpills.length) {
                        const contentDiv = $('#content');
                        if (contentDiv.length) {
                            contentDiv.addClass('ui-tabs ui-widget ui-widget-content ui-corner-all');
                            navpills = $('<ul>', {
                                id: 'navpills',
                                class: 'ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all',
                                role: 'tablist'
                            }).appendTo(contentDiv);
        
                            const gradeSummaryDiv = $('#GradeSummarySelectMenuGroup');
                            if (gradeSummaryDiv.length) {
                                gradeSummaryDiv.after(navpills);
                            }
                        }
                    }
                    return navpills;
                },
        
                _setupTabWithContent: function(tabName, contentId, containerId, navpills) {
                    let existingTab = navpills.find(`li[aria-controls="${contentId}"]`);
                    if (!existingTab.length) {
                        const newTab = this._createTab(tabName, contentId);
                        navpills.append(newTab);
                        existingTab = newTab;
                    } else {
                        existingTab.find('a').attr('href', `#tab-${contentId}`);
                    }
        
                    let existingTabContent = $(`#${contentId}`);
                    if (!existingTabContent.length) {
                        existingTabContent = this._createTabContent(contentId);
                        $('#grade-summary-content').append(existingTabContent);
                    } else {
                        this._ensureClasses(existingTabContent, ['ui-tabs-panel', 'ui-widget-content', 'ui-corner-bottom']);
                    }
        
                    this._moveContentToTab(existingTabContent, containerId);
                    this._addTabEventListeners(existingTab, existingTabContent, `tab-${contentId}`);
                },
        
                _createTab: function(tabName, contentId) {
                    return $('<li>', {
                        class: 'ui-state-default ui-corner-top custom-tab',
                        role: 'tab',
                        tabindex: '-1',
                        'aria-controls': contentId,
                        'aria-labelledby': `ui-id-${contentId}`,
                        'aria-selected': 'false'
                    }).append($('<a>', {
                        class: 'ui-tabs-anchor',
                        href: `#tab-${contentId}`,
                        role: 'presentation',
                        tabindex: '-1',
                        id: `ui-id-${contentId}`,
                        text: tabName
                    }));
                },
        
                _createTabContent: function(contentId) {
                    return $('<div>', {
                        id: contentId,
                        class: 'ui-tabs-panel ui-widget-content ui-corner-bottom',
                        role: 'tabpanel',
                        'aria-expanded': 'false',
                        'aria-hidden': 'true',
                        css: { display: 'none' }
                    });
                },
        
                _ensureClasses: function(element, classes) {
                    classes.forEach(cls => {
                        if (!element.hasClass(cls)) {
                            element.addClass(cls);
                        }
                    });
                },
        
                _moveContentToTab: function(newTabContent, containerId) {
                    const contentContainer = $(`#${containerId}`);
                    if (contentContainer.length && !$.contains(newTabContent[0], contentContainer[0])) {
                        newTabContent.append(contentContainer);
                    }
                },
        
                _addTabEventListeners: function(tab, content, hash) {
                    tab.find('a').on('click', (event) => {
                        if (this._isCustomTab(tab)) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        this._handleTabClick(content.attr('id'));
                    });
                },
        
                _addEventListenersToExistingTabs: function() {
                    $('#navpills li a').each((_, tabLink) => {
                        const contentId = $(tabLink).attr('href').substring(1);
                        $(tabLink).on('click', (event) => {
                            event.preventDefault();
                            this._handleTabClick(contentId);
                        });
                    });
                },
        
                _handleTabClick: function(contentId) {
                    if (!this.options.dataFetched[contentId]) {
                        this._fetchDataForTab(contentId);
                        this.options.dataFetched[contentId] = true;
                    }
                    this._switchTab(contentId);
                },
        
                _fetchDataForTab: function(contentId) {
                    if (contentId === 'outcomes') {
                        // Fetch data logic here
                        console.log(`Fetching data for ${contentId}`);
                        // Example: $.get('/data', { id: contentId }, (data) => { /* handle data */ });
                    }
                },
        
                _switchTab: function(contentId) {
                    const tab = $(`#navpills li[aria-controls="${contentId}"]`);
                    const content = $(`#${contentId}`);
        
                    if (!tab.length || !content.length) {
                        //console.error('Tab or content is null:', { tab, content });
                        return;
                    }
        
                    $('#navpills li').removeClass('ui-tabs-active ui-state-active')
                        .attr('aria-selected', 'false')
                        .attr('tabindex', '-1');
        
                    $('.ui-tabs-panel').attr('aria-expanded', 'false')
                        .attr('aria-hidden', 'true')
                        .css('display', 'none');
        
                    tab.addClass('ui-tabs-active ui-state-active')
                        .attr('aria-selected', 'true')
                        .attr('tabindex', '0');
        
                    content.attr('aria-expanded', 'true')
                        .attr('aria-hidden', 'false')
                        .css('display', 'block');

                    // Check if the tab's href contains "outcomes"
                    const tabLink = tab.find('a');
                    if (tabLink.attr('href').includes('outcomes')) {
                        $('.outcome-toggles').css('display', 'block');
                    } else {
                        $('.outcome-toggles').css('display', 'none');
                    }
        
                    // Use history.pushState to update the URL without jumping
                    const newUrl = `${window.location.pathname}#tab-${contentId}`;
                    history.pushState(null, '', newUrl);
                },

                _activateDefaultTab: function() {
                    const defaultTabId = this.options.defaultTab;
                    this._switchTab(defaultTabId);
                },
        
                _isCustomTab: function(tab) {
                    return tab.hasClass('custom-tab');
                }
            });
        
            // Initialize the tab manager
            $('#content').tabManager({
                courseOutcomesEnabled: courseOutcomesEnabled
            });

            // Function to move the GradeSummarySelectMenuGroup div into the assignments tab
            function moveGradeSummarySelectMenuGroup() {
              const gradeSummaryDiv = $('#GradeSummarySelectMenuGroup');
              const assignmentsContent = $('#assignments');
              const ariaAnnouncer = $('#aria-announcer');

              if (gradeSummaryDiv.length && assignmentsContent.length) {
                  // Add the class 'transition-element' to gradeSummaryDiv
                  gradeSummaryDiv.addClass('transition-element').css({
                    display: 'block',
                    opacity: 1
                  });

                  if (ariaAnnouncer.length) {
                      // Move the gradeSummaryDiv inside the assignmentsContent
                      // and place it directly after the ariaAnnouncer
                      ariaAnnouncer.after(gradeSummaryDiv);
                  } else {
                      // If aria-announcer is not found, append to the top of assignmentsContent
                      assignmentsContent.prepend(gradeSummaryDiv);
                  }
              }
            }

            // Call the function after the tab manager is initialized - Not needed, 
            // also causes weird jumpy behavior on initial load
            /*$('#content').on('tabsactivate', function(event, ui) {
                moveGradeSummarySelectMenuGroup();
            });*/

            // Also call it once on document ready to ensure it's moved initially
            moveGradeSummarySelectMenuGroup();
          });


      }

      function addAdvancedSettingsUI() {
          const studentGradesRightContent = document.getElementById('student-grades-right-content');
          if (!studentGradesRightContent) return; // Exit if the parent element doesn't exist
      
          const advancedSettingsDiv = document.createElement('div');
          advancedSettingsDiv.id = 'TheWaybetterGradebookAdvancedSettings';
          studentGradesRightContent.appendChild(advancedSettingsDiv);
      
          const advancedSettingsAccordionButton = document.createElement('button');
          advancedSettingsAccordionButton.textContent = 'The Waybetter Gradebook Advanced Settings';
          advancedSettingsAccordionButton.className = 'advancedSettingsAccordion Button';
          advancedSettingsDiv.appendChild(advancedSettingsAccordionButton);
      
          const advancedSettingsAccordionPanelDiv = document.createElement('div');
          advancedSettingsAccordionPanelDiv.className = 'advancedSettingsAccordionPanel';
          advancedSettingsDiv.appendChild(advancedSettingsAccordionPanelDiv);

          // Create table element
          const advancedSettingsTable = document.createElement('table');
          advancedSettingsTable.className = 'summary';

          // Create a row for the checkbox and label
          const advancedSettingsRow = document.createElement('tr');

          // Create a cell for the checkbox
          const advancedSettingsCheckboxCell = document.createElement('td');
          const gradesNormalizedTo100PercentCheckbox = document.createElement('input');
          gradesNormalizedTo100PercentCheckbox.type = 'checkbox';
          gradesNormalizedTo100PercentCheckbox.id = 'gradesNormalizedTo100PercentCheckbox';
          gradesNormalizedTo100PercentCheckbox.checked = true; // Default to checked now
          advancedSettingsCheckboxCell.appendChild(gradesNormalizedTo100PercentCheckbox);

          // Create a cell for the label
          const labelCell = document.createElement('td');
          const label = document.createElement('label');
          label.htmlFor = 'gradesNormalizedTo100PercentCheckbox';
          label.textContent = 'Normalize Assignment Groups to 100%';
          labelCell.appendChild(label);

          // Append cells to the row
          //advancedSettingsRow.appendChild(advancedSettingsCheckboxCell);
          advancedSettingsRow.appendChild(labelCell);
          advancedSettingsRow.appendChild(advancedSettingsCheckboxCell);

          // Append the row to the table
          advancedSettingsTable.appendChild(advancedSettingsRow);

          // Create a row for the autoSelectPastDueCheckbox setting
          const autoSelectPastDueCheckboxRow = document.createElement('tr');

          // Create a cell for the checkbox
          const autoSelectPastDueCheckboxCell = document.createElement('td');
          const autoSelectPastDueCheckbox = document.createElement('input');
          autoSelectPastDueCheckbox.type = 'checkbox';
          autoSelectPastDueCheckbox.id = 'autoSelectPastDueCheckbox';
          autoSelectPastDueCheckbox.checked = true; // Default to checked
          autoSelectPastDueCheckboxCell.appendChild(autoSelectPastDueCheckbox);

          // Create a cell for the label
          const autoSelectPastDueLabelCell = document.createElement('td');
          const autoSelectPastDueLabel = document.createElement('label');
          autoSelectPastDueLabel.htmlFor = 'autoSelectPastDueCheckbox';
          autoSelectPastDueLabel.textContent = 'Automatically Select Past Due Assignments Only';
          autoSelectPastDueLabelCell.appendChild(autoSelectPastDueLabel);

          // Append cells to the row
          autoSelectPastDueCheckboxRow.appendChild(autoSelectPastDueLabelCell);
          autoSelectPastDueCheckboxRow.appendChild(autoSelectPastDueCheckboxCell);

          // Append the row to the table
          advancedSettingsTable.appendChild(autoSelectPastDueCheckboxRow);
      
          /*const gradesNormalizedTo100PercentCheckbox = document.createElement('input');
          gradesNormalizedTo100PercentCheckbox.type = 'checkbox';
          gradesNormalizedTo100PercentCheckbox.id = 'gradesNormalizedTo100PercentCheckbox';
          gradesNormalizedTo100PercentCheckbox.checked = false;
      
          const label = document.createElement('label');
          label.htmlFor = 'gradesNormalizedTo100PercentCheckbox';
          label.textContent = 'Normalize Assignment Groups to 100%';
      
          advancedSettingsAccordionPanelDiv.appendChild(label);
          advancedSettingsAccordionPanelDiv.appendChild(gradesNormalizedTo100PercentCheckbox);*/

          advancedSettingsAccordionPanelDiv.appendChild(advancedSettingsTable);
      
          // Add CSS for accordion
          const style = document.createElement('style');
          style.textContent = `
          .advancedSettingsAccordion {
              background-color: #eee;
              color: #444;
              cursor: pointer;
              padding: 18px;
              padding-left: 35px; /* Increase left padding to make space for the arrow */
              width: 100%;
              /*border: none;*/
              text-align: left;
              outline: none;
              font-size: 15px;
              transition: 0.2s;
              position: relative; /* Needed for absolute positioning of the pseudo-element */
          }
          
          .advancedSettingsAccordion::before {
              content: '▶'; /* Unicode character for a right-pointing arrow */
              font-size: 15px;
              position: absolute;
              left: 10px; /* Position the arrow 10px from the left edge of the button */
              top: 50%; /* Center the arrow vertically */
              transform: translateY(-50%); /* Adjust vertical position to truly center */
              transition: transform 0.2s ease-in-out; /* Apply easing to the transformation */
          }
          
          .advancedSettingsAccordion.active::before {
              transform: translateY(-50%) rotate(90deg); /* Rotates the arrow to point downwards */
          }
          
          .advancedSettingsAccordionPanel {
              padding: 0 18px;
              max-height: 0;
              overflow: hidden;
              background-color: white;
              opacity: 0;
              visibility: hidden;
              transition: max-height 0.2s ease-in-out, opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
          }
          
          .advancedSettingsAccordion.active + .advancedSettingsAccordionPanel {
              max-height: 500px; /* Adjust as needed for your content */
              opacity: 1;
              visibility: visible;
          }
          `;
          document.head.appendChild(style);
      
          // Advanced Settings Accordion functionality
          advancedSettingsAccordionButton.addEventListener('click', function() {
              this.classList.toggle('active');
              const advancedSettingsAccordionPanel = this.nextElementSibling;

              // Toggle the visibility using CSS transitions instead of directly setting display
              if (this.classList.contains('active')) {
                  advancedSettingsAccordionPanel.style.maxHeight = advancedSettingsAccordionPanel.scrollHeight + "px";
                  advancedSettingsAccordionPanel.style.opacity = "1";
                  advancedSettingsAccordionPanel.style.visibility = "visible";
              } else {
                  advancedSettingsAccordionPanel.style.maxHeight = "0";
                  advancedSettingsAccordionPanel.style.opacity = "0";
                  advancedSettingsAccordionPanel.style.visibility = "hidden";
              }
          });
      
          // Checkbox functionality
          /*gradesNormalizedTo100PercentCheckbox.addEventListener('change', function() {
              recalculateTotals(); // Directly call recalculateTotals which handles the logic internally
          });*/

          // Set default recalculate function
          //window.recalculateTotals = recalculateTotals; // Ensure recalculateTotals is called for any other needed context

          // Setup transitions for elements
          const TheWaybetterGradebookAdvancedSettingsId = document.getElementById('TheWaybetterGradebookAdvancedSettings');
          // Apply transition class
          [TheWaybetterGradebookAdvancedSettingsId].forEach(element => {
              if (element) {
                  element.classList.add('transition-element');
                  setTimeout(() => element.style.opacity = 1, 10); // Delay slightly to ensure the class applies
              }
          });
      }

      function formatDateYYYYMMDD(date) {
          const d = new Date(date);
          let month = '' + (d.getMonth() + 1);
          let day = '' + d.getDate();
          let year = d.getFullYear();

          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;

          return [year, month, day].join('-');
      }

      function formatDateMMDDYYYY(date) {
          const d = new Date(date);
          let month = '' + (d.getMonth() + 1);
          let day = '' + d.getDate();
          let year = d.getFullYear();

          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;

          return [month, day, year].join('/');
      }

      function formatNumber(value) {
          if (value % 1 === 0) { // Check if it's a whole number
              return value.toString(); // Return as a string without decimals
          } else {
              return value.toFixed(2); // Return with two decimal places
          }
      }

      function formatNumberToWhole(value) {
          return Math.round(value).toString(); // Round to nearest whole number and convert to string
      }

      // Helper function to capitalize the first letter of a string
      function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      function clearSubmissionsTable() {
          const submissionsTable = document.getElementById('submissionsTable');
          console.log("submissionsTable: ", submissionsTable);
          //const submissionsTableTBody = document.getElementById('submissionsTableTBody');
          if (!submissionsTable) {
              const submissionsTable = document.createElement('table');
              const submissionsTableTBody = document.createElement('tbody');
              submissionsTableTBody.id = 'submissionsTableTBody';
              //submissionsTable.style.width = '80%';
              //submissionsTable.style.position = 'relative';
              //submissionsTable.style.left = '100px';
              submissionsTable.id = "submissionsTable"
              submissionsTable.className = "ic-Table ic-Table--hover-row ic-Table--grades-summary-table";
              submissionsTable.innerHTML = `
              <thead>
                  <tr>
                      <th>Assignment Name</th>
                      <th>Due Date</th>
                      <th>Submission Time</th>
                      <th>Submission Status</th>
                      <th>Points Earned</th>
                      <th>Points Available</th>
                      <th>SpeedGrader Link</th>
                      <th>Include</th>
                  </tr>
              </thead>
              `;
              submissionsTableTBody.appendChild(submissionsTable);
              waybetterGradebookContainer.appendChild(submissionsTable);
              addCheckAllNoneLink();
              return;
          }
          submissionsTable.innerHTML = `
          <thead>
              <tr>
                  <th>Assignment Name</th>
                  <th>Due Date</th>
                  <th>Submission Time</th>
                  <th>Submission Status</th>
                  <th>Points Earned</th>
                  <th>Points Available</th>
                  <th>SpeedGrader Link</th>
                  <th>Include</th>
              </tr>
          </thead>
          `;
          let submissionsTableTBody = document.createElement('tbody');
          console.log("Second submissionsTableTBody: ", submissionsTableTBody);
          submissionsTableTBody.id = 'submissionsTableTBody';
          console.log("Second submissionsTableTBody: ", submissionsTableTBody);
          submissionsTable.appendChild(submissionsTableTBody);
          console.log("submissionsTable after append: ", submissionsTable);
          //submissionsTableTBody.appendChild(submissionsTable);
          //addCheckAllNoneLink();
      }

      function clearSubmissionsTableTBody() {
          const submissionsTableTBody = document.getElementById('submissionsTableTBody');
          submissionsTableTBody.innerHTML = '';
      }

      function animateSubmissionsTableTBodyTrTd() {
          const rowsTD = document.querySelectorAll('#submissionsTableTBody tr td');
          rowsTD.forEach(rowTD => {
              rowTD.classList.add('animate');
              //console.log("animation started for: " + rowTD);
              setTimeout(() => {
                  rowTD.classList.remove('animate');
                  //console.log("animation ended for: " + rowTD);
              }, 500);
          });
      }

      function animateCurrentDateDisplay() {
          const currentDateDisplay = document.getElementById('currentDateDisplay');
          currentDateDisplay.classList.add('animate');
          setTimeout(() => {
              currentDateDisplay.classList.remove('animate');
          }, 500);
      }

      function animateDatesLoadedDisplay() {
          const datesLoadedDisplay = document.getElementById('datesLoadedDisplay');
          datesLoadedDisplay.classList.add('animate');
          setTimeout(() => {
              datesLoadedDisplay.classList.remove('animate');
          }, 500);
      }

      //setupUI();

      // Function to create and append the "Course Totals" table
      // Should I leave this createCourseTotalsTable() here, or move it back into the displaySubmissionsWithCategories function?
      // Whatever happens, it needs to have a way to clear it, or not reproduce it each time 
      // the displaySubmissionsWithCategories() function is executed
      function createCourseTotalsTable() {
          // Create table and its elements
          const CourseTotalsTable = document.createElement('table');
          CourseTotalsTable.id = "courseTotalsTable";
          //CourseTotalsTable.style.width = '80%';
          //CourseTotalsTable.style.position = 'relative';
          //CourseTotalsTable.style.left = '100px';
          CourseTotalsTable.className = "ic-Table ic-Table--hover-row ic-Table--grades-summary-table";
      
          const caption = document.createElement('caption');
          caption.textContent = 'Course Totals';
          CourseTotalsTable.appendChild(caption);
      
          const thead = document.createElement('thead');
          const headerRow = document.createElement('tr');
          const headers = ["Marking Periods", "Points Earned", "Points Available", "Percentage", "Include"];
              headers.forEach(headerText => {
              const th = document.createElement('th');
              th.textContent = headerText;
              headerRow.appendChild(th);
          });
          thead.appendChild(headerRow);
          CourseTotalsTable.appendChild(thead);
      
          const tbody = document.createElement('tbody');
          CourseTotalsTable.appendChild(tbody);
      
          // Define the rows to be added
          const rows = [
          { title: "Marking Period 1", class: "", periodId: "MP1Total", pointsEarnedId: "MP1 Total Points Earned", pointsAvailableId: "MP1 Total Points Available", percentageEarnedId: "MP1 Total Percentage Earned", ESWeight: "25", MSWeight: "25", HSWeight: "20" },
          { title: "MP1 Progress Check 1", class: "indent", periodId: "MP1PC1", pointsEarnedId: "MP1PC1 Points Earned", pointsAvailableId: "MP1PC1 Total Points Available", percentageEarnedId: "MP1PC1 Total Percentage Earned" },
          { title: "MP1 Progress Check 2", class: "indent", periodId: "MP1PC2", pointsEarnedId: "MP1PC2 Points Earned", pointsAvailableId: "MP1PC2 Total Points Available", percentageEarnedId: "MP1PC2 Total Percentage Earned" },
          { title: "MP1 Progress Check 3", class: "indent", periodId: "MP1PC3", pointsEarnedId: "MP1PC3 Points Earned", pointsAvailableId: "MP1PC3 Total Points Available", percentageEarnedId: "MP1PC3 Total Percentage Earned" },
          { title: "Marking Period 2", class: "", periodId: "MP2Total", pointsEarnedId: "MP2 Total Points Earned", pointsAvailableId: "MP2 Total Points Available", percentageEarnedId: "MP2 Total Percentage Earned", ESWeight: "25", MSWeight: "25", HSWeight: "20" },
          { title: "MP2 Progress Check 1", class: "indent", periodId: "MP2PC1", pointsEarnedId: "MP2PC1 Points Earned", pointsAvailableId: "MP2PC1 Total Points Available", percentageEarnedId: "MP2PC1 Total Percentage Earned" },
          { title: "MP2 Progress Check 2", class: "indent", periodId: "MP2PC2", pointsEarnedId: "MP2PC2 Points Earned", pointsAvailableId: "MP2PC2 Total Points Available", percentageEarnedId: "MP2PC2 Total Percentage Earned" },
          { title: "MP2 Progress Check 3", class: "indent", periodId: "MP2PC3", pointsEarnedId: "MP2PC3 Points Earned", pointsAvailableId: "MP2PC3 Total Points Available", percentageEarnedId: "MP2PC3 Total Percentage Earned" },
          { title: "Mid-term Exam", class: "", periodId: "MidTermExam", pointsEarnedId: "Mid-Term Exam Points Earned", pointsAvailableId: "Mid-Term Exam Total Points Available", percentageEarnedId: "Mid-Term Exam Total Percentage Earned", ESWeight: "0", MSWeight: "0", HSWeight: "10" },
          { title: "Marking Period 3", class: "", periodId: "MP3Total", pointsEarnedId: "MP3 Total Points Earned", pointsAvailableId: "MP3 Total Points Available", percentageEarnedId: "MP3 Total Percentage Earned", ESWeight: "25", MSWeight: "25", HSWeight: "20" },
          { title: "MP3 Progress Check 1", class: "indent", periodId: "MP3PC1", pointsEarnedId: "MP3PC1 Points Earned", pointsAvailableId: "MP3PC1 Total Points Available", percentageEarnedId: "MP3PC1 Total Percentage Earned" },
          { title: "MP3 Progress Check 2", class: "indent", periodId: "MP3PC2", pointsEarnedId: "MP3PC2 Points Earned", pointsAvailableId: "MP3PC2 Total Points Available", percentageEarnedId: "MP3PC2 Total Percentage Earned" },
          { title: "MP3 Progress Check 3", class: "indent", periodId: "MP3PC3", pointsEarnedId: "MP3PC3 Points Earned", pointsAvailableId: "MP3PC3 Total Points Available", percentageEarnedId: "MP3PC3 Total Percentage Earned" },
          { title: "Marking Period 4", class: "", periodId: "MP4Total", pointsEarnedId: "MP4 Total Points Earned", pointsAvailableId: "MP4 Total Points Available", percentageEarnedId: "MP4 Total Percentage Earned", ESWeight: "25", MSWeight: "25", HSWeight: "20" },
          { title: "MP4 Progress Check 1", class: "indent", periodId: "MP4PC1", pointsEarnedId: "MP4PC1 Points Earned", pointsAvailableId: "MP4PC1 Total Points Available", percentageEarnedId: "MP4PC1 Total Percentage Earned" },
          { title: "MP4 Progress Check 2", class: "indent", periodId: "MP4PC2", pointsEarnedId: "MP4PC2 Points Earned", pointsAvailableId: "MP4PC2 Total Points Available", percentageEarnedId: "MP4PC2 Total Percentage Earned" },
          { title: "MP4 Progress Check 3", class: "indent", periodId: "MP4PC3", pointsEarnedId: "MP4PC3 Points Earned", pointsAvailableId: "MP4PC3 Total Points Available", percentageEarnedId: "MP4PC3 Total Percentage Earned" },
          { title: "Final Exam", class: "", periodId: "FinalExam", pointsEarnedId: "Final Exam Points Earned", pointsAvailableId: "Final Exam Points Available", percentageEarnedId: "Final Exam Percentage Earned", ESWeight: "0", MSWeight: "0", HSWeight: "10" },
          { title: "Course Final", class: "", periodId: "CourseFinal", pointsEarnedId: "Course Total Points Earned", pointsAvailableId: "Course Total Points Available", percentageEarnedId: "Course Total Percentage Earned", ESWeight: "100", MSWeight: "100", HSWeight: "100" }
          ];

          // Titles that should have an include checkbox
          const includeTitles = ["Marking Period 1", "Marking Period 2", "Marking Period 3", "Marking Period 4", "Mid-term Exam", "Final Exam"];
      
          // Add rows to the table body
          rows.forEach(row => {
              const tr = document.createElement('tr');
              tr.setAttribute('data-period-id', row.periodId); // Set data-period-id attribute
              const tdTitle = document.createElement('td');
              tdTitle.setAttribute('data-title-id', row.title); // Set data-title-id attribute
          
              // Check if the row should be indented
              if (row.class === "indent") {
              tdTitle.style.paddingLeft = '30px'; // Apply indentation to the first cell
              }
          
              tdTitle.textContent = row.title;
              tr.appendChild(tdTitle);
          
              // Create empty cells for Points Earned, Points Available, and Percentage
              const tdPointsEarned = document.createElement('td');
              tdPointsEarned.setAttribute('data-points-earned-id', row.pointsEarnedId); // Set data-points-earned-id attribute
              tr.appendChild(tdPointsEarned);

              const tdPointsAvailable = document.createElement('td');
              tdPointsAvailable.setAttribute('data-points-available-id', row.pointsAvailableId); // Set data-points-available-id attribute
              tr.appendChild(tdPointsAvailable);

              const tdPercentageEarned = document.createElement('td');
              tdPercentageEarned.setAttribute('data-percentage-earned-id', row.percentageEarnedId); // Set data-percentage-earned-id attribute
              tr.appendChild(tdPercentageEarned);

              //ORG
              /*for (let i = 0; i < 3; i++) {
              const td = document.createElement('td');
              tr.appendChild(td);
              }*/
          
              // Create the Include checkbox only for specified titles
              const tdInclude = document.createElement('td');
              if (includeTitles.includes(row.title)) {
                  const includeCheckbox = document.createElement('input');
                  includeCheckbox.type = 'checkbox';
                  tdInclude.appendChild(includeCheckbox);
              }
              tr.appendChild(tdInclude);
          
              tbody.appendChild(tr);
          });
      
          // Append the table to the document body or a specific element
          waybetterGradebookContainer.appendChild(CourseTotalsTable);
      }

      // Function to count and display submission statuses
      function studentInsightsDataTeaser(studentFirstNamefromEnrollments) {
        // Filter assignments based on the checked status of the include checkbox
        const includedAssignments = Array.from(document.querySelectorAll('[data-submission-time-status]'))
          .filter(assignment => {
              const checkbox = assignment.closest('tr').querySelector('.include-checkbox');
              return checkbox && checkbox.checked;
        });

        const totalAssignments = document.querySelectorAll('[data-submission-time-status]').length;
        const totalSelectedAssignments = includedAssignments.length;
        const selectedExcusedAssignments = includedAssignments.filter(assignment => assignment.getAttribute('data-submission-time-status') === "Excused").length;
        const totalExcusedAssignments = document.querySelectorAll('[data-submission-time-status="Excused"]').length;
        const selectedMissingAssignments = includedAssignments.filter(assignment => assignment.getAttribute('data-submission-time-status') === "Missing").length;
        const totalMissingAssignments = document.querySelectorAll('[data-submission-time-status="Missing"]').length;
        const selectedLateAssignments = includedAssignments.filter(assignment => assignment.getAttribute('data-submission-time-status') === "Late").length;
        const totalLateAssignments = document.querySelectorAll('[data-submission-time-status="Late"]').length;
        const selectedOnTimeAssignments = includedAssignments.filter(assignment => assignment.getAttribute('data-submission-time-status') === "On Time").length;
        const totalOnTimeAssignments = document.querySelectorAll('[data-submission-time-status="On Time"]').length;
        const selectedManualEntryAssignments = includedAssignments.filter(assignment => assignment.getAttribute('data-submission-time-status') === "Manual Entry").length;
        const totalManualEntryAssignments = document.querySelectorAll('[data-submission-time-status="Manual Entry"]').length;
        const selectedNoStatusAssignments = includedAssignments.filter(assignment => assignment.getAttribute('data-submission-time-status') === "").length;
        const totalNoStatusAssignments = document.querySelectorAll('[data-submission-time-status=""]').length;

        // New constant to calculate assignments that are not past due and have not been submitted
        // This is not perfect yet, but it's a start. Refactor later.
        const notPastDueAndNotSubmitted = totalAssignments - totalNoStatusAssignments;

        // Create or update the container for the summary
        let studentInsightsData = document.getElementById('studentInsightsData');
        if (!studentInsightsData) {
            studentInsightsData = document.createElement('div');
            studentInsightsData.id = 'studentInsightsData';
            document.body.appendChild(studentInsightsData); // Append to body or a specific parent element
        }
        studentInsightsData.innerHTML = `
            <p>There are <span style="font-style: italic; font-weight: bold;">${totalAssignments}</span> total assignments for the selected time period.</p>
            <p>There are <span style="font-style: italic; font-weight: bold;">${totalSelectedAssignments}</span> assignments that have been selected for the selected time period.</p>
            <p>${studentFirstNamefromEnrollments} has submitted <span style="font-style: italic; font-weight: bold;">${selectedOnTimeAssignments}</span> out of <span style="font-style: italic; font-weight: bold;">${totalSelectedAssignments}</span> assignments <span style="font-style: italic; font-weight: bold;">On Time</span> for the selected time period.</p>
            <p>${studentFirstNamefromEnrollments} has submitted <span style="font-style: italic; font-weight: bold;">${selectedLateAssignments}</span> out of <span style="font-style: italic; font-weight: bold;">${totalSelectedAssignments}</span> assignments <span style="font-style: italic; font-weight: bold; color: rgb(3, 116, 181); border: 1px solid rgb(3, 116, 181); border-radius: 12px; padding: 2px 5px;">Late</span> for the selected time period.</p>
            <p>${studentFirstNamefromEnrollments} has <span style="font-style: italic; font-weight: bold;">${selectedMissingAssignments}</span> <span style="font-style: italic; font-weight: bold; color: rgb(224, 6, 31); border: 1px solid rgb(224, 6, 31); border-radius: 12px; padding: 2px 5px;">Missing</span> assignments for the selected time period.</p>
            <p>${studentFirstNamefromEnrollments} has <span style="font-style: italic; font-weight: bold;">${totalExcusedAssignments}</span> total <span style="font-style: italic; font-weight: bold;">Excused</span> assignments (selected and unselected) for the selected time period.</p>
            <p>${studentFirstNamefromEnrollments} has <span style="font-style: italic; font-weight: bold;">${selectedManualEntryAssignments}</span> assignments marked as <span style="font-style: italic; font-weight: bold;">Manual Entry</span> for the selected time period.</p>
            <p>${studentFirstNamefromEnrollments} has <span style="font-style: italic; font-weight: bold;">${totalNoStatusAssignments}</span> total assignments with <span style="font-style: italic; font-weight: bold;">No Status</span> for the selected time period (most likely due to the assignment(s) not being past due and not submitted).</p>
        `;
      }

      // Function to display submissions and calculate category totals
      async function displaySubmissionsWithCategories(submissions, assignmentGroups, source) {

          let formattedStartDateInput, formattedEndDateInput;

          switch (source) {
              case 'customDates':
                  const startDateInput = document.getElementById('customStartDate').value;
                  const endDateInput = document.getElementById('customEndDate').value;
                  if (!startDateInput || !endDateInput) {
                      alert('Please enter valid dates.');
                      return;
                  }
                  formattedStartDateInput = new Date(startDateInput + "T00:00:00");
                  formattedEndDateInput = new Date(endDateInput + "T23:59:59");
                  break;

              case 'predefinedDates':
                  const selectedTimeFrame = document.getElementById('predefinedTimeFrames').value;
                  const timeFrame = predefinedTimeFramesObject[selectedTimeFrame];
                  if (!timeFrame) {
                      alert('Please select a valid time frame.');
                      return;
                  }
                  formattedStartDateInput = timeFrame.start;
                  formattedEndDateInput = timeFrame.end;
                  break;

              default:
                  console.error('Invalid source provided');
                  return;
          }

          if (!formattedStartDateInput || !formattedEndDateInput || formattedStartDateInput > formattedEndDateInput) {
              alert('Please enter valid dates.');
              return;
          }

          console.log("formattedStartDateInput: " + formattedStartDateInput);
          console.log("formattedEndDateInput: " + formattedEndDateInput);
          //datesLoaded = `${formatDateMMDDYYYY(formattedStartDateInput)} to ${formatDateMMDDYYYY(formattedEndDateInput)}`;
          datesLoaded = `${formattedStartDateInput.toLocaleString()} to ${formattedEndDateInput.toLocaleString()}`;
          console.log("datesLoaded: " + datesLoaded);
          //updateDisplay();
          //animateDatesLoadedDisplay();
          //animateCurrentDateDisplay();
          updateTimeFramesDisplayInfo();

        //clearSubmissionsTable();
        clearSubmissionsTableTBody();

        // Initialize groupTotals with all groups having 0 pointsEarned and pointsAvailable
        const groupTotals = assignmentGroups.reduce((acc, group) => {
          acc[group.id] = { name: group.name, weight: group.group_weight, pointsEarned: 0, pointsAvailable: 0 };
          return acc;
        }, {});
      
        // Process submissions to calculate points earned and available for each group
        submissions.forEach(submission => {
          const assignment = submission.assignment;
          //console.log("assignment object: " + assignment);
          // Use assignment.due_at if available, otherwise use submission.cached_due_date
          const dueDate = assignment.due_at ? new Date(assignment.due_at) : new Date(submission.cached_due_date);
          dueDate.setHours(23, 59, 59, 999);
          //console.log("assignment.name: " + assignment.name + " " + "submission.cached_due_date: " + submission.cached_due_date);
          // Trying to debug missing assignments, some assignments assignment.due_at = null
          //console.log("submission.cached_due_date: " + submission.cached_due_date);
          //console.log("assignment.due_at:          " + assignment.due_at);
          //console.log("assignment.workflow_state:  " + assignment.workflow_state);
          if (assignment) {
            //console.log(assignment); //DELETE LATER DWS
            //const dueAt = new Date(assignment.due_at);
            //if (dueDate >= customStartTime && dueDate <= customEndTime) {
            if (dueDate >= formattedStartDateInput && dueDate <= formattedEndDateInput) {
              const group = groupTotals[assignment.assignment_group_id];
              if (group) {
                //console.log(assignment); //DELETE LATER DWS
                //console.log(submission); //DELETE LATER DWS
                //console.log(submission.excused) //DELETE LATER DWS
                //console.log(group); //DELETE LATER DWS
                // Skip adding points for "EX" submissions
                if (!(submission.excused === true && submission.workflow_state === 'graded')) {
                  // Check if the submission is unsubmitted or has a score, treat "N/A" as 0
                  const pointsEarned = submission.workflow_state === 'unsubmitted' ? 0 : (submission.score || 0);
                  // Round pointsEarned to two decimal places
                  const roundedPointsEarned = Math.round(pointsEarned * 100) / 100;
                  //group.pointsEarned += pointsEarned;
                  group.pointsEarned += roundedPointsEarned;
                  group.pointsAvailable += assignment.points_possible;
                }
              }
            }
          }
        });
      
        // Create and populate the first table with submissions...
        //const table = document.createElement('table');
        //table.className = "ic-Table ic-Table--hover-row ic-Table--grades-summary-table";
        //table.style.width = '80%';
        //table.style.position = 'relative';
        //table.style.left = '100px';
        //table.innerHTML = `<tr><th>Assignment Name</th><th>Due Date</th><th>Submission Time</th><th>Submission Status</th><th>Points Earned</th><th>Points Available</th><th>SpeedGrader Link</th></tr>`;
      
        // Existing code to populate the table with individual submissions...
        // Function to display submissions in a table
        //function displaySubmissions(submissions) {
          // Sort submissions by assignment due date
          // ORG
          /*const sortedSubmissions = submissions.sort((a, b) => {
              //console.log(submissions);
              const dueA = new Date(a.assignment.due_at).getTime();
              const dueB = new Date(b.assignment.due_at).getTime();
              return dueA - dueB;
          });*/
          // working, but should key off cached_due_date first, then due_at; but also might need to 
          // change the display function to display the lower date value of cached_due_date or due_at
          /*const sortedSubmissions = submissions.sort((a, b) => {
              const dueA = a.assignment.due_at ? new Date(a.assignment.due_at) : new Date(a.cached_due_date);
              const dueB = b.assignment.due_at ? new Date(b.assignment.due_at) : new Date(b.cached_due_date);
              return dueA - dueB;
          });*/
          const sortedSubmissions = submissions.sort((a, b) => {
              let dueA = a.assignment.due_at ? new Date(a.assignment.due_at) : new Date(a.cached_due_date);
              let dueB = b.assignment.due_at ? new Date(b.assignment.due_at) : new Date(b.cached_due_date);
          
              // Use cached_due_date if it predates due_at
              if (new Date(a.cached_due_date) < dueA) {
                  dueA = new Date(a.cached_due_date);
              }
              if (new Date(b.cached_due_date) < dueB) {
                  dueB = new Date(b.cached_due_date);
              }
          
              // First, sort by due date
              if (dueA - dueB !== 0) {
                  return dueA - dueB;
              }
          
              // If due dates are the same, sort by assignment_group_id
              if (a.assignment.assignment_group_id !== b.assignment.assignment_group_id) {
                  return a.assignment.assignment_group_id - b.assignment.assignment_group_id;
              }
          
              // If assignment_group_id are the same, sort by assignment.position
              // IMPORTANT: assignment.position is the position on the Assignments page, NOT the Modules page
              if (a.assignment.position !== b.assignment.position) {
                  return a.assignment.position - b.assignment.position;
              }
          
              // If positions are the same, sort by assignment.id
              return a.assignment.id - b.assignment.id;
          });
          //console.log(submissions);
          /*const sortedSubmissions = submissions.sort((a, b) => {
              console.log("a.assignment.due_at: " + a.assignment.due_at);
              console.log("a.submission.cached_due_date: " + a.submission.cached_due_date);
              console.log("b.assignment.due_at: " + b.assignment.due_at);
              console.log("b.submission.cached_due_date: " + b.submission.cached_due_date);
              const dueA = a.assignment.due_at ? new Date(a.assignment.due_at).getTime() : new Date(a.submission.cached_due_date).getTime();
              const dueB = b.assignment.due_at ? new Date(b.assignment.due_at).getTime() : new Date(b.submission.cached_due_date).getTime();
              return dueA - dueB;
          });*/

          //Moving the table outside of this function into the setupUI function
          /*const table = document.createElement('table');
          // Add styling to the table
          table.style.width = '80%';
          table.style.position = 'relative';
          table.style.left = '100px';
          table.className = "ic-Table ic-Table--hover-row ic-Table--grades-summary-table";
          table.innerHTML = `
            <tr>
              <th>Assignment Name</th>
              <th>Due Date</th>
              <th>Submission Time</th>
              <th>Submission Status</th>
              <th>Points Earned</th>
              <th>Points Available</th>
              <th>SpeedGrader Link</th>
              <th>Include</th>
            </tr>
          `;*/
          sortedSubmissions.forEach(submission => {
            const assignment = submission.assignment;
            //console.log(submission)
            if (assignment) {
              //console.log("submission.id: " + submission.id + " assignment.id: " + assignment.id + " assignment.name: " + assignment.name + " submission.cached_due_date: " + submission.cached_due_date + " assignment.due_at: " + assignment.due_at);
              //const dueAt = assignment.due_at ? new Date(assignment.due_at) : new Date(submission.cached_due_date);
              
              // Determine the earliest due date between due_at and cached_due_date
              let dueAt = new Date(assignment.due_at || submission.cached_due_date); // Default to due_at, fallback to cached_due_date
              const cachedDueDate = new Date(submission.cached_due_date);
              if (cachedDueDate < dueAt) {
                dueAt = cachedDueDate; // Use cached_due_date if it's earlier
              }

              const submittedAt = submission.submitted_at ? new Date(submission.submitted_at).toLocaleString() : 'N/A';
              const groupName = assignmentGroups.find(group => group.id === assignment.assignment_group_id)?.name || 'Unknown Group';
              // Determine if the submission was unsubmitted
              const wasUnsubmitted = submission.workflow_state === 'unsubmitted';
              //let pointsEarnedDisplay = wasUnsubmitted ? 'N/A' : (submission.score || 'N/A');
              let pointsEarnedDisplay = (submission.workflow_state === 'graded' || submission.workflow_state === 'pending_review') && submission.score === 0 ? '0' : (wasUnsubmitted ? '-' : (submission.score || '-'));
              let pointsEarnedCalculation = wasUnsubmitted ? 0 : (submission.score || 0);
              // Round pointsEarnedDisplay to two decimal places
              //pointsEarnedDisplay = Math.round(pointsEarnedDisplay * 100) / 100;
              // Round pointsEarnedCalculation to two decimal places
              //pointsEarnedCalculation = Math.round(pointsEarnedCalculation * 100) / 100;
              const pointsPossible = assignment.points_possible;
              let includeCheckboxChecked = "checked"; // Default to checked
      
              // New check for excused and graded submissions
              if (submission.excused === true && submission.workflow_state === 'graded') {
                  pointsEarnedDisplay = 'EX'; // Display "EX" for excused submissions
                  pointsEarnedCalculation = 'EX'; // Use 'EX' for internal tracking
                  includeCheckboxChecked = ""; // Uncheck the include checkbox by default
                } else {
                  // Determine if the submission was unsubmitted
                  //const wasUnsubmitted = submission.workflow_state === 'unsubmitted';
                  if (!wasUnsubmitted) {
                    // Only round if the submission is not excused and not unsubmitted
                    // Check if pointsEarnedDisplay is a number before rounding
                    if (!isNaN(parseFloat(pointsEarnedDisplay))) {
                      pointsEarnedDisplay = Math.round(pointsEarnedDisplay * 100) / 100;
                    }
                    // Check if pointsEarnedCalculation is a number before rounding
                    if (!isNaN(parseFloat(pointsEarnedCalculation))) {
                      pointsEarnedCalculation = Math.round(pointsEarnedCalculation * 100) / 100;
                    }
                  } else {
                    pointsEarnedDisplay = '-'; // Set display to '-' for unsubmitted
                  }
              }

              // Determine if the submission is submitted but not graded
              const submittedNotGraded = submission.submitted_at && submission.workflow_state === 'submitted' && submission.score === null;
              const submittedNotGradedData = submittedNotGraded ? 'true' : 'false';
          
              //if (dueAt >= customStartTime && dueAt <= customEndTime) {
              if (dueAt >= formattedStartDateInput && dueAt <= formattedEndDateInput) {
                const row = document.createElement('tr');
                // Set the SpeedGrader link
                const speedGraderLink = `${baseUrl}/courses/${courseId}/gradebook/speed_grader?assignment_id=${submission.assignment_id}&student_id=${submission.user_id}`;

                // Determine the marking period progress check
                const markingPeriodProgressCheck = getMarkingPeriodProgressCheck(dueAt);

                const currentDate = new Date();

                // Determine the adjusted submission status
                let adjustedSubmissionStatus = "";
                if (submission.workflow_state === 'pending_review') {
                    adjustedSubmissionStatus = "Awaiting Grading";
                } else if (submission.score === null && submission.workflow_state === 'graded') {
                    if (!submission.submitted_at) {
                        adjustedSubmissionStatus = "Unsubmitted";
                    } else {
                        adjustedSubmissionStatus = "Review Suggested";
                    }
                }

                // Check if the submission is submitted but not graded
                if (submittedNotGradedData === 'true') {
                    adjustedSubmissionStatus = "Awaiting Grading";
                }

                // Determine if there is an adjusted status to show
                const showAdjustedStatus = adjustedSubmissionStatus !== "";

                // Determine the lesson and submission status
                let lessonStatus = "";
                let submissionStatus = "";
                let statusColor = "inherit"; // Default color
                let fontWeight = "normal"; // Default font weight
                let statusBorder = "none";
                let statusBorderRadius = "0";
                let statusPadding = "0";

                if (submission.excused) {
                    lessonStatus = "Excused";
                    submissionStatus = "Excused";
                } else if ((submission.missing || submission.workflow_state === 'unsubmitted' || (submission.score === null && submission.workflow_state === 'graded' && !submission.submitted_at)) && currentDate > dueAt) {
                    lessonStatus = "Missing";
                    submissionStatus = "Missing";
                    statusColor = "rgb(224, 6, 31)"; // Red for missing
                    statusBorder = "1px solid rgb(224, 6, 31)";
                    statusBorderRadius = "12px";
                    statusPadding = "2px 5px";
                    fontWeight = "bold"; // Bold for missing
                } else if (submission.late) {
                    lessonStatus = "Late";
                    submissionStatus = "Late";
                    statusColor = "rgb(3, 116, 181)"; // Blue for late
                    statusBorder = "1px solid rgb(3, 116, 181)";
                    statusBorderRadius = "12px";
                    statusPadding = "2px 5px";
                    fontWeight = "bold"; // Bold for late
                } else if (!submission.late && !submission.missing && !submission.excused && !submission.submitted_at && submission.workflow_state === 'graded' && submission.score !== null) {
                  lessonStatus = "Manual Entry";
                  submissionStatus = "Manual Entry";
                } else if (!submission.late && !submission.missing && !submission.excused && submission.workflow_state !== 'unsubmitted') {
                    lessonStatus = "On Time";
                    submissionStatus = "On Time";
                }

                // Determine if the assignment is past due
                const isPastDue = dueAt < currentDate;

                // Determine the display text for workflow state
                const workflowStateDisplay = submission.workflow_state === 'pending_review' 
                ? 'Pending Review'
                : capitalizeFirstLetter(submission.workflow_state);

                row.innerHTML = `
                  <td>
                    <a href="${assignment.html_url}">${assignment.name}</a>
                    <br>
                    <span style="font-size: smaller; font-style: italic;">${groupName}</span>
                  </td>
                  <td><span data-is-past-due="${isPastDue ? 'true' : 'false'}">${dueAt.toLocaleString()}</span>
                    <br>
                    <span data-mp-progress-check="${markingPeriodProgressCheck}" style="font-size: smaller; font-style: italic;">
                      ${markingPeriodProgressCheck ? markingPeriodProgressCheck.replace(/(\d)(PC)/, '$1 PC') : 'No MPPC Found'}
                    </span>
                  </td>
                  <td>${submittedAt}
                    <br>
                    <span data-submission-time-status="${submissionStatus}" style="font-size: smaller; font-style: italic; font-weight: ${fontWeight}; color: ${statusColor}; border: ${statusBorder}; border-radius: ${statusBorderRadius}; padding: ${statusPadding};">
                      ${lessonStatus}
                    </span>
                  </td>
                  <td>
                    <span data-graded-workflow-state="${submission.workflow_state}">${workflowStateDisplay}</span>
                    ${showAdjustedStatus ? `
                    <br>
                    <span data-adjusted-submission-status="${adjustedSubmissionStatus}" style="font-size: smaller; font-style: italic;">
                        ${adjustedSubmissionStatus}
                    </span>` : ''}
                  </td>
                  <td>
                    <span class="points-earned-clickable" title="Click to edit points earned" data-original-value="${pointsEarnedCalculation}"
                          data-assignment-id="${submission.assignment_id}"
                          data-points-possible="${pointsPossible}"
                          data-group-id="${assignment.assignment_group_id}"
                          data-was-unsubmitted="${wasUnsubmitted ? 'true' : 'false'}"
                          data-excused="${submission.excused === true ? 'true' : 'false'}"
                          data-pending-review="${submission.workflow_state === 'pending_review' ? 'true' : 'false'}"
                          data-submitted-not-graded="${submittedNotGradedData}">
                      ${pointsEarnedDisplay}
                    </span>
                  </td>
                  <td>${pointsPossible}</td>
                  <td>
                    <a href="${speedGraderLink}" target="_blank" alt="Open Submission in SpeedGrader (New Window)" title="Open Submission in SpeedGrader (New Window)">
                      <i class="icon-gradebook" aria-hidden="true"></i>
                    </a>
                  </td>
                  <td>
                    <input type="checkbox" class="include-checkbox" ${includeCheckboxChecked} 
                          data-assignment-id="${submission.assignment_id}" 
                          data-points-earned="${pointsEarnedCalculation}" 
                          data-points-possible="${pointsPossible}" 
                          data-group-id="${assignment.assignment_group_id}" 
                          data-was-unsubmitted="${wasUnsubmitted ? 'true' : 'false'}"
                          data-excused="${submission.excused === true ? 'true' : 'false'}"
                          data-pending-review="${submission.workflow_state === 'pending_review' ? 'true' : 'false'}"
                          data-submitted-not-graded="${submittedNotGradedData}">
                  </td>
                `;
                // Add some animation
                //const rowsTD = document.querySelectorAll('#submissionsTableTBody tr td');
                /*rows.forEach(row => {
                  row.style.borderBottomColor = 'rgba(199, 205, 209, 1)';
                  row.style.borderBottomWidth = '1px';
                  row.style.borderBottomStyle = 'solid';
                });*/
                /*rowsTD.forEach(rowTD => {
                  rowTD.classList.add('animate');
                  console.log("animation started for: " + rowTD);
                  setTimeout(() => {
                    rowTD.classList.remove('animate');
                    console.log("animation ended for: " + rowTD);
                  }, 500);
                });*/
                //submissionsTable.appendChild(row);
                submissionsTableTBody.appendChild(row);
              }
            }
          });
          //moved the table into the setupUI function
          //waybetterGradebookContainer.appendChild(table);
        //} // OLD ending of OLD displaySubmissions function

        // Reprint the "Assignments are weighted by group table" Canvas element
        // Depending on what assignment category is selected, Canvas might not show all categories (including 0% categories)
        const assignmentsGroupTableBodyElement = document.querySelector("#assignments-not-weighted > div:nth-child(1) > table.summary > tbody");
        assignmentsGroupTableBodyElement.innerHTML = '';
        Object.entries(groupTotals).forEach(([groupId, group]) => {
          if (group.weight >= 0) { 
            const row = document.createElement('tr');
            row.innerHTML = `<th scope="row">${group.name}</th><td>${group.weight}%</td>`;
            assignmentsGroupTableBodyElement.appendChild(row);
          }
        });

        // Add rows for each category, excluding those with 0% weight
        // Iterate over groupTotals using Object.entries() to get both the key (groupId) and the value (group data)
        // This has been tricky, rounding throws this value off, whereas recalculateTotals() produces correct results
        // ORG
        /*Object.entries(groupTotals).forEach(([groupId, group]) => {
          if (group.weight >= 0) { // Assuming you want to display weights for groups with a weight of zero or greater (aka. all groups)
            const percentage = group.pointsAvailable > 0 ? (group.pointsEarned / group.pointsAvailable) * 100 : 0;
            const row = document.createElement('tr');
            // Use groupId as the data-group-id attribute
            row.setAttribute('data-group-id', groupId);
            row.innerHTML = `<td>${group.name} <span style="font-size: smaller;">(${group.weight}%)</span></td><td>${group.pointsEarned.toFixed(2)}</td><td>${group.pointsAvailable.toFixed(2)}</td><td>${percentage.toFixed(2)}%</td><td colspan="3"></td>`;
            table.appendChild(row);
          }
        });*/

        // New (not working any differently than ORG, trying recalculateTotals() hack)
        // v2.11.06 Added some new code for data-group-name, data-group-weight, data-group-earned-points, data-group-available-points, data-group-earned-percent, 
        // but did not make it dynamic yet. It should probably be removed if not being used, and/or 
        // make sure that it's dynamic through the recalculateTotals() function.
        // v2.11.43 - Now dynamic.
        Object.entries(groupTotals).forEach(([groupId, group]) => {
          if (group.weight >= 0) { // Assuming you want to display weights for groups with a weight of zero or greater (aka. all groups)
            const percentage = group.pointsAvailable > 0 ? (group.pointsEarned / group.pointsAvailable) * 100 : 0;
            const roundedPercentage = Math.round(percentage * 100) / 100; // Ensure rounding is consistent
            const row = document.createElement('tr');
            // Use groupId as the data-group-id attribute
            row.setAttribute('data-group-id', groupId);
            row.setAttribute('data-group-name', group.name);
            row.setAttribute('data-group-weight', group.weight);
            row.innerHTML = `<td data-group-name="${group.name}">${group.name} <span style="font-size: smaller;">(${group.weight}%)</span></td><td data-group-earned-points="${group.pointsEarned.toFixed(2)}">${group.pointsEarned.toFixed(2)}</td><td data-group-available-points="${group.pointsAvailable.toFixed(2)}">${group.pointsAvailable.toFixed(2)}</td><td data-group-earned-percent="${roundedPercentage.toFixed(2)}">${roundedPercentage.toFixed(2)}%</td><td colspan="3"></td>`;
            //submissionsTable.appendChild(row);
            submissionsTableTBody.appendChild(row);
          }
        });
        // Just hacking in this recalculateTotals() function because that seems to be the only properly working 
        // calculating function and my eyes are going crossed trying to get this right. I'll try to code it properly later.
        // Funny enough, the code below this recalculateTotals() to calculate the Total Earned Percentage does seem to work 
        // properly when we don't include the above code. I really need to re-write that and get rid of this recalculateTotals() hack.
        recalculateTotals();
        //recalculateTotalsNormalizedTo100Percent();
      
        // Calculate and add a final row for the total earned percentage, including 0% weight categories
        let totalWeightedPointsEarned = 0;
        let totalWeight = 0;
        Object.values(groupTotals).forEach(group => {
          if (group.weight >= 0) { // Assuming you want to display weights for groups with a weight of zero or greater (aka. all groups)
            const groupPercentage = group.pointsAvailable > 0 ? (group.pointsEarned / group.pointsAvailable) * group.weight : 0;
            totalWeightedPointsEarned += groupPercentage;
            totalWeight += group.weight;
          }
        });
        const finalPercentage = totalWeight > 0 ? (totalWeightedPointsEarned / totalWeight) * 100 : 0;
        const finalRow = document.createElement('tr');
        // Use "total" as the data-group-id attribute
        finalRow.setAttribute('data-group-id', "total");
        finalRow.innerHTML = `<td>Total Earned Percentage <span id="totalWeightPercentageFinalRow" style="font-size: smaller;">(${totalWeight}%)</span></td><td colspan="5">${finalPercentage.toFixed(2)}%</td><td><button class="Button" id="resetButton">Reset Changes</button></td><td><label><input type="checkbox" id="calculateSubmittedOnly">&nbsp;Calculate based only on submitted assignments</label></td>`;
        //submissionsTable.appendChild(finalRow);
        submissionsTableTBody.appendChild(finalRow);
      
        waybetterGradebookContainer.appendChild(submissionsTable);
        // Update the gradesDisplayElement on the Canvas page
        // Check if the element exists to avoid errors
        if (gradesDisplayElement) {
          // Update the gradesDisplayElement on the Canvas page
          gradesDisplayElement.innerText = `${finalPercentage.toFixed(2)}%`;
        } else {
          console.log("gradesDisplayElement not found");
        }
        // Moved gradesDisplayElement.innerText to if statement above to account for any issues
        //gradesDisplayElement.innerText = `${finalPercentage.toFixed(2)}%`;
        // Add Total row for the "Assignments are weighted by group table" Canvas element
        const totalRow = document.createElement('tr');
        totalRow.style.fontWeight = "bold";
        totalRow.innerHTML = `<th scope="row">Total</th><td id="totalWeightPercentageTotalRow">${totalWeight}%</td>`;
        assignmentsGroupTableBodyElement.appendChild(totalRow);
        
        //const submissions = await fetchSubmissionsForStudent();

        //createCourseTotalsTable(); // Ensure this is called before loading period data
        //loadPeriodDataIntoTable(submissions); // Load the data into the table
      
        document.querySelectorAll('.include-checkbox').forEach(checkbox => {
          checkbox.addEventListener('change', () => {
            // If the checkbox for an "EX" submission is checked, uncheck calculateSubmittedOnly
            const isExcused = checkbox.getAttribute('data-excused') === 'true';
            if (checkbox.checked && isExcused) {
              document.getElementById('calculateSubmittedOnly').checked = false;
            } else {
              // Existing logic for handling unsubmitted submissions
              if (checkbox.checked && checkbox.getAttribute('data-was-unsubmitted') === 'true') {
                document.getElementById('calculateSubmittedOnly').checked = false;
              }
              
              // Check if all unsubmitted are unchecked and no "EX" submissions are checked to decide the state of calculateSubmittedOnly
              const allUnsubmittedUnchecked = Array.from(document.querySelectorAll('.include-checkbox[data-was-unsubmitted="true"]'))
                .every(checkbox => !checkbox.checked);
              const anyExcusedChecked = Array.from(document.querySelectorAll('.include-checkbox[data-excused="true"]'))
                .some(checkbox => checkbox.checked);
              const anySubmittedChecked = Array.from(document.querySelectorAll('.include-checkbox[data-was-unsubmitted="false"]'))
                .some(checkbox => checkbox.checked && !checkbox.getAttribute('data-excused') === 'true');
              
              // Update the condition to also consider if any "EX" submissions are checked
              document.getElementById('calculateSubmittedOnly').checked = allUnsubmittedUnchecked && anySubmittedChecked && !anyExcusedChecked;
            }
          
            // Trigger recalculation of totals
            recalculateTotals();
            //recalculateTotalsNormalizedTo100Percent();
          });
        });

        function updateIncludeCheckboxes() {
          const autoSelectPastDueOnly = document.getElementById('autoSelectPastDueCheckbox').checked;

          document.querySelectorAll('.include-checkbox').forEach(checkbox => {
              const isExcused = checkbox.getAttribute('data-excused') === 'true';
              const isPastDue = checkbox.closest('tr').querySelector('[data-is-past-due]').getAttribute('data-is-past-due') === 'true';

              // Check the checkbox based on the setting and conditions
              checkbox.checked = !isExcused && (!autoSelectPastDueOnly || isPastDue);
          });

          // Trigger recalculation of totals
          recalculateTotals();
        }
        
        // Call updateIncludeCheckboxes when the setting changes
        document.getElementById('autoSelectPastDueCheckbox').addEventListener('change', () => {
          updateIncludeCheckboxes();
        });
        
        // Call updateIncludeCheckboxes initially to set the checkboxes based on the default setting
        updateIncludeCheckboxes();
      
        // Function to attach the click event listener to a span
        function attachClickListener(span) {
          span.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'points-earned-input';
            // Use the updated value if it exists, otherwise fall back to the original value
            input.value = this.getAttribute('data-updated-value') || this.getAttribute('data-original-value');
            input.dataset.originalValue = this.getAttribute('data-original-value');
            input.dataset.updatedValue = this.getAttribute('data-updated-value'); // Keep track of the updated value
            input.dataset.assignmentId = this.getAttribute('data-assignment-id');
            input.dataset.pointsPossible = this.getAttribute('data-points-possible');
            input.dataset.groupId = this.getAttribute('data-group-id');
            input.dataset.wasUnsubmitted = this.getAttribute('data-was-unsubmitted');
            input.dataset.excused = this.getAttribute('data-excused');
            input.dataset.pendingReview = this.getAttribute('data-pending-review');
            input.dataset.submittedNotGraded = this.getAttribute('data-submitted-not-graded');

            this.parentNode.replaceChild(input, this);
            input.focus();
            input.select();
      
            input.addEventListener('change', () => {
              // Update the data-points-earned and data-updated-value to the new value
              input.setAttribute('data-points-earned', input.value);
              input.setAttribute('data-updated-value', input.value);
              recalculateTotals();
              //recalculateTotalsNormalizedTo100Percent();
            });
      
            input.addEventListener('blur', function() {
              const newSpan = document.createElement('span');
              newSpan.className = 'points-earned-clickable';
              newSpan.title = 'Click to edit points earned';
              // Check if the input is empty and set it to the original value or a placeholder
              const inputValue = this.value.trim() === '' ? (this.dataset.originalValue || '0') : this.value;
              newSpan.textContent = inputValue; // Display the updated or default value
              // Preserve the original value and store the new updated value
              newSpan.setAttribute('data-original-value', this.dataset.originalValue);
              //newSpan.setAttribute('data-updated-value', this.value); // Store the updated value
              newSpan.setAttribute('data-updated-value', inputValue); // Store the updated or default value
              newSpan.dataset.assignmentId = this.dataset.assignmentId;
              newSpan.dataset.pointsPossible = this.dataset.pointsPossible;
              newSpan.dataset.groupId = this.dataset.groupId;
              newSpan.dataset.wasUnsubmitted = this.dataset.wasUnsubmitted;
              newSpan.dataset.excused = this.dataset.excused;
              newSpan.dataset.pendingReview = this.dataset.pendingReview;
              newSpan.dataset.submittedNotGraded = this.dataset.submittedNotGraded;

              this.parentNode.replaceChild(newSpan, this);
              attachClickListener(newSpan); // Re-attach the click listener to the new span
            });
          });
        }
      
        // Attach the click event listener to all initial .points-earned-clickable spans
        document.querySelectorAll('.points-earned-clickable').forEach(attachClickListener);
      
        // Attach the event lister to the reset button and reset values
        document.getElementById('resetButton').addEventListener('click', () => {
          // Reset points earned to their original values or "-" for unsubmitted assignments
          document.querySelectorAll('.points-earned-clickable, .points-earned-input').forEach(element => {
            const wasUnsubmitted = element.getAttribute('data-was-unsubmitted') === 'true';
            const isExcused = element.getAttribute('data-excused') === 'true'; // Check if the submission was excused
            const isPendingReview = element.getAttribute('data-pending-review') === 'true'; // Check if the submission is pending review
            const isSubmittedNotGraded = element.getAttribute('data-submitted-not-graded') === 'true'; // Check if the submission is submitted but not graded

            // Determine the original value based on conditions
            let originalValue;
            if (isExcused) {
                originalValue = 'EX';
            } else if (wasUnsubmitted || isSubmittedNotGraded) {
                originalValue = '-';
            } else {
                originalValue = element.getAttribute('data-original-value');
            }

            if (element.classList.contains('points-earned-input') || isExcused || isPendingReview || isSubmittedNotGraded) {
                // If it's an input or an excused submission, change its value to original, "-" for unsubmitted, "EX" for excused, 
                // or "-" for pending_review (if the original value was 0 for the pending_review)
                let valueToSet = originalValue;
                if (element.tagName.toLowerCase() === 'input') {
                    element.value = valueToSet;
                    element.dispatchEvent(new Event('change')); // Trigger any attached logic
                } else {
                    element.textContent = valueToSet; // Update text content for spans
                }
                // Reset the data-updated-value to ensure it matches the original, "-", or "EX"
                element.setAttribute('data-updated-value', valueToSet);
            } else {
                // If it's a span and not excused, update its text content to original or "-" for unsubmitted
                element.textContent = originalValue;
                element.setAttribute('data-updated-value', originalValue);
            }
          });
        
          // Re-check all checkboxes, then uncheck if excused
          /*document.querySelectorAll('.include-checkbox').forEach(checkbox => {
            const isExcused = checkbox.getAttribute('data-excused') === 'true'; // Check if the submission was excused
            checkbox.checked = !isExcused; // Uncheck if excused, otherwise check
          });*/

          // Re-check all checkboxes based on the autoSelectPastDueCheckbox setting
          const autoSelectPastDueOnly = document.getElementById('autoSelectPastDueCheckbox').checked;
          const currentDate = new Date();

          document.querySelectorAll('.include-checkbox').forEach(checkbox => {
              const isExcused = checkbox.getAttribute('data-excused') === 'true';
              const isPastDue = checkbox.closest('tr').querySelector('[data-is-past-due]').getAttribute('data-is-past-due') === 'true';

              // Check the checkbox based on the setting and conditions
              checkbox.checked = !isExcused && (autoSelectPastDueOnly ? isPastDue : true);
          });

          // Reset Calculate based only on submitted assignments checkbox
          // If this function blows up, delete this line.
          document.getElementById('calculateSubmittedOnly').checked = false;
        
          // Trigger recalculation of totals
          recalculateTotals();
          //recalculateTotalsNormalizedTo100Percent();
        });
      
        // Attach the event listener to the "Calculate based only on submitted assignments" checkbox
        document.getElementById('calculateSubmittedOnly').addEventListener('change', function() {
          const calculateSubmittedOnly = this.checked;
          
          document.querySelectorAll('.include-checkbox').forEach(checkbox => {
            const wasUnsubmitted = checkbox.getAttribute('data-was-unsubmitted') === 'true';
            const isExcused = checkbox.getAttribute('data-excused') === 'true';
        
            if (calculateSubmittedOnly) {
              checkbox.checked = !(wasUnsubmitted || isExcused); // Uncheck if was unsubmitted or excused
            } else {
              checkbox.checked = true; // Re-check all checkboxes when not calculating based only on submitted
            }
          });
        
          // Trigger recalculation of totals
          recalculateTotals();
          //recalculateTotalsNormalizedTo100Percent();
        });

        // addAdvancedSettingsUI() gradesNormalizedTo100PercentCheckbox Checkbox functionality
        document.getElementById('gradesNormalizedTo100PercentCheckbox').addEventListener('change', function() {
          recalculateTotals(); // Directly call recalculateTotals which handles the logic internally
        });

        // This function handles updating the group totals based on checkbox state
        function updateGroupTotalsFromCheckboxes() {
          document.querySelectorAll('.include-checkbox').forEach(checkbox => {
              checkbox.addEventListener('change', () => {
                  const groupId = checkbox.getAttribute('data-group-id');
                  const assignmentId = checkbox.getAttribute('data-assignment-id');
                  const isChecked = checkbox.checked;

                  const group = groupTotals[groupId];
                  const element = document.querySelector(`.points-earned-input[data-assignment-id="${assignmentId}"]`) || 
                                  document.querySelector(`.points-earned-clickable[data-assignment-id="${assignmentId}"]`);

                  if (isChecked) {
                      const pointsPossible = parseFloat(checkbox.getAttribute('data-points-possible'));
                      const updatedValue = element.getAttribute('data-updated-value');
                      const pointsEarned = updatedValue === 'EX' ? 0 : parseFloat(updatedValue) || 0;

                      group.pointsEarned += pointsEarned;
                      group.pointsAvailable += pointsPossible;
                  } else {
                      group.pointsEarned = 0;
                      group.pointsAvailable = 0;

                      document.querySelectorAll(`.include-checkbox[data-group-id="${groupId}"]:checked`).forEach(otherCheckbox => {
                          const otherAssignmentId = otherCheckbox.getAttribute('data-assignment-id');
                          const otherElement = document.querySelector(`.points-earned-input[data-assignment-id="${otherAssignmentId}"]`) || 
                                              document.querySelector(`.points-earned-clickable[data-assignment-id="${otherAssignmentId}"]`);
                          const otherPointsPossible = parseFloat(otherCheckbox.getAttribute('data-points-possible'));
                          const otherUpdatedValue = otherElement.getAttribute('data-updated-value');
                          const otherPointsEarned = otherUpdatedValue === 'EX' ? 0 : parseFloat(otherUpdatedValue) || 0;

                          group.pointsEarned += otherPointsEarned;
                          group.pointsAvailable += otherPointsPossible;
                      });
                  }

                  // Call the recalculation function after state update
                  recalculateTotals();
              });
          });
        }

        // One last recalculateTotals() function call to make sure that the data is correct
        recalculateTotals();
        updateGroupTotalsFromCheckboxes(); // Should this be here? DWS

        //animateSubmissionsTableTBodyTrTd();

        function recalculateTotals() {
          console.log("recalculateTotals() launched");

          // Update the Student Insights tab with the Data Teaser
          studentInsightsDataTeaser(studentFirstNamefromEnrollments);
          console.log("studentInsightsDataTeaser() launched");

          const gradesNormalizedTo100PercentCheckbox = document.getElementById('gradesNormalizedTo100PercentCheckbox');
          switch (gradesNormalizedTo100PercentCheckbox.checked) {
              case true:
                  recalculateTotalsNormalizedTo100Percent();
                  break;
              case false:
                  recalculateTotalsDefault();
                  break;
          }

          function recalculateTotalsDefault() {
              console.log("recalculateTotalsDefault() launched");
              // Reset totals for each group
              Object.entries(groupTotals).forEach(([groupId, group]) => {
              group.pointsEarned = 0;
              group.pointsAvailable = 0;
              });
          
              document.querySelectorAll('.include-checkbox:checked').forEach(checkbox => {
              const groupId = checkbox.getAttribute('data-group-id');
              const assignmentId = checkbox.getAttribute('data-assignment-id');
              const element = document.querySelector(`.points-earned-input[data-assignment-id="${assignmentId}"]`) || 
                              document.querySelector(`.points-earned-clickable[data-assignment-id="${assignmentId}"]`);
              const pointsPossible = parseFloat(checkbox.getAttribute('data-points-possible'));
              let pointsEarned = 0;
              if (element) {
                  const updatedValue = element.getAttribute('data-updated-value');
                  // Check if the updatedValue is "EX", treat it as 0 for calculation
                  if (updatedValue === 'EX') {
                  pointsEarned = 0;
                  } else {
                  // Ensure that "-" or invalid values are treated as 0
                  pointsEarned = updatedValue && !isNaN(updatedValue) ? parseFloat(updatedValue) : parseFloat(element.getAttribute('data-original-value')) || 0;
                  }
              }
              const group = groupTotals[groupId];
              if (group) {
                  group.pointsEarned += pointsEarned;
                  group.pointsAvailable += pointsPossible;
              }
              });

              console.log("Group Totals After Calculation: ", groupTotals);
          
              // Calculate and update the UI for each group
              let totalWeightedPercentage = 0;
              let totalWeight = 0;
              Object.entries(groupTotals).forEach(([groupId, group]) => {
                if (group.weight >= 0) { // Assuming you want to display weights for groups with a weight of zero or greater (aka. all groups)
                    const percentage = group.pointsAvailable > 0 ? (group.pointsEarned / group.pointsAvailable) * 100 : 0;
                    const weightedPercentage = percentage * group.weight;
                    totalWeightedPercentage += weightedPercentage;
                    totalWeight += group.weight;
            
                    const groupRow = document.querySelector(`tr[data-group-id="${groupId}"]`);
                    if (groupRow) {
                      groupRow.cells[1].textContent = group.pointsEarned.toFixed(2);
                      groupRow.cells[2].textContent = group.pointsAvailable.toFixed(2);
                      groupRow.cells[3].textContent = `${percentage.toFixed(2)}%`;

                      // Update data attributes
                      groupRow.cells[1].setAttribute('data-group-earned-points', group.pointsEarned.toFixed(2));
                      groupRow.cells[2].setAttribute('data-group-available-points', group.pointsAvailable.toFixed(2));
                      groupRow.cells[3].setAttribute('data-group-earned-percent', percentage.toFixed(2));
                    }
                }
              });
              console.log("Total weighted percentage: ", totalWeightedPercentage);
              console.log("Total weight: ", totalWeight);
              
              // Update the total earned percentage row
              const totalPercentage = totalWeight > 0 ? totalWeightedPercentage / totalWeight : 0;
              const totalPercentageRow = document.querySelector('tr[data-group-id="total"]');
              //const totalWeightPercentageFinalRow = document.getElementById('totalWeightPercentageFinalRow');
              //const totalWeightPercentageTotalRow = document.getElementById('totalWeightPercentageTotalRow');
              if (totalPercentageRow) {
                totalPercentageRow.cells[1].textContent = `${totalPercentage.toFixed(2)}%`;
                //totalWeightPercentageFinalRow.textContent = `(${totalWeight.toFixed(2)}%)`;
                // Ensure the weight percentage does not exceed 100%
                //const totalWeightPercentageFinalRow = document.getElementById('totalWeightPercentageFinalRow');
                //console.log("totalWeightPercentageFinalRow: ", totalWeightPercentageFinalRow);
                //totalWeightPercentageFinalRow.textContent = `(${totalActiveWeight.toFixed(2)}%)`;
                console.log("Actual Total Percentage of totalPercentageRow: ", totalPercentage.toFixed(2));
              } else {
                console.log("No totalPercentageRow found.");
              }

              // Update the gradesDisplayElement on the Canvas page
              //gradesDisplayElement.innerText = `${totalPercentage.toFixed(2)}%`;
              if (gradesDisplayElement) {
                gradesDisplayElement.innerText = `${totalPercentage.toFixed(2)}%`;
                //totalWeightPercentageTotalRow.textContent = `${totalWeight.toFixed(2)}%`;
              } else {
                console.log("No gradesDisplayElement found.");
              }

              // Ensure the weight percentage does not exceed 100%
              /*const totalWeightPercentageTotalRow = document.getElementById('totalWeightPercentageTotalRow');
              console.log("totalWeightPercentageTotalRow: ", totalWeightPercentageTotalRow);
              if (totalWeightPercentageTotalRow) {
                console.log("totalActiveWeight: ", totalActiveWeight);
                totalWeightPercentageTotalRow.textContent = `${totalActiveWeight.toFixed(2)}%`;
              } else {
                console.log("No totalWeightPercentageTotalRow found.");
              }*/
          }

          function recalculateTotalsNormalizedTo100Percent() {
              console.log("recalculateTotalsNormalizedTo100Percent() launched");
              // This function is similar to recalculateTotals, but it normalizes the weights of the groups to 100% 
              // in the case where the total weight of the groups is not 100%.
              // This case could happen if a teacher incorrectly set weights for the groups, or if a time period
              // has no assignments for a particular group.
              // Canvas calculates like this, but our school's SIS doesn't on a daily basis...
              // HOWEVER, our school's SIS for Report Card Entry Pages DOES calculate like this.
              // This mis-match of grades between Canvas and Report Card Entry Pages for these edge cases is an
              // unknown bug that needs to be reported and addressed.
              // Reset totals for each group
              Object.entries(groupTotals).forEach(([groupId, group]) => {
                  group.pointsEarned = 0;
                  group.pointsAvailable = 0;
              });
              console.log("Group totals reset.");
          
              // Collect data from checkboxes and update group totals
              document.querySelectorAll('.include-checkbox:checked').forEach(checkbox => {
                  const groupId = checkbox.getAttribute('data-group-id');
                  const assignmentId = checkbox.getAttribute('data-assignment-id');
                  const element = document.querySelector(`.points-earned-input[data-assignment-id="${assignmentId}"]`) || 
                                  document.querySelector(`.points-earned-clickable[data-assignment-id="${assignmentId}"]`);
                  const pointsPossible = parseFloat(checkbox.getAttribute('data-points-possible'));
                  let pointsEarned = 0;
                  if (element) {
                    const updatedValue = element.getAttribute('data-updated-value');
                    // Check if the updatedValue is "EX", treat it as 0 for calculation
                    if (updatedValue === 'EX') {
                    pointsEarned = 0;
                    } else {
                      // Ensure that "-" or invalid values are treated as 0
                      pointsEarned = updatedValue && !isNaN(updatedValue) ? parseFloat(updatedValue) : parseFloat(element.getAttribute('data-original-value')) || 0;
                    }
                  }
                  const group = groupTotals[groupId];
                  if (group) {
                      group.pointsEarned += pointsEarned;
                      group.pointsAvailable += pointsPossible;
                  }
                  console.log(`Updated group ${groupId}: Points Earned = ${group.pointsEarned}, Points Available = ${group.pointsAvailable}`);
              });
          
              // Calculate total active weight from groups that have assignments included
              let totalActiveWeight = Object.values(groupTotals).reduce((acc, group) => {
                  return group.pointsAvailable > 0 ? acc + group.weight : acc;
              }, 0);

              // Normalize weights based on active groups
              Object.values(groupTotals).forEach(group => {
                  if (group.pointsAvailable > 0) {
                      group.normalizedWeight = (group.weight / totalActiveWeight) * 100;
                  } else {
                      group.normalizedWeight = 0; // Set weight to 0 for groups with no active assignments
                  }
              });
          
              // Calculate and update the UI for each group with normalized weights
              let totalWeightedPercentage = 0;
              Object.entries(groupTotals).forEach(([groupId, group]) => {
                  if (group.pointsAvailable >= 0) {
                      const percentage = group.pointsAvailable > 0 ? (group.pointsEarned / group.pointsAvailable) * 100 : 0;
                      const weightedPercentage = percentage * (group.normalizedWeight / 100);
                      totalWeightedPercentage += weightedPercentage;
                      console.log(`Inside group.pointsAvailable > 0 if statement, Group ${groupId}, Percentage: ${percentage}, Weighted Percentage: ${weightedPercentage}, Total Weighted Percentage: ${totalWeightedPercentage}`);

                      const groupRow = document.querySelector(`tr[data-group-id="${groupId}"]`);
                      console.log(`Group ${groupId}, Row: ${groupRow}`);
                      if (groupRow) {
                          groupRow.cells[1].textContent = group.pointsEarned.toFixed(2);
                          groupRow.cells[2].textContent = group.pointsAvailable.toFixed(2);
                          groupRow.cells[3].textContent = `${percentage.toFixed(2)}%`;
                          console.log(`Inside groupRow if statement, Group ${groupId}, Row: ${groupRow}, Cell 1: ${groupRow.cells[1].textContent}, Cell 2: ${groupRow.cells[2].textContent}, Cell 3: ${groupRow.cells[3].textContent}`);

                          // Update data attributes
                          groupRow.cells[1].setAttribute('data-group-earned-points', group.pointsEarned.toFixed(2));
                          groupRow.cells[2].setAttribute('data-group-available-points', group.pointsAvailable.toFixed(2));
                          groupRow.cells[3].setAttribute('data-group-earned-percent', percentage.toFixed(2));
                      }
                  }
                  console.log(`Group ${groupId} normalized weight: ${group.normalizedWeight}, Total Weighted Percentage: ${totalWeightedPercentage}`);
              });
              //console.log("recalculateTotalsNormalizedTo100Percent() totalWeight 1: ", totalWeight);
          
              // Update the total earned percentage row
              //const totalPercentage = totalWeight > 0 ? totalWeightedPercentage / totalWeight : 0;
              const totalPercentageRow = document.querySelector('tr[data-group-id="total"]');
              //const totalWeightPercentageFinalRow = document.getElementById('totalWeightPercentageFinalRow');
              //const totalWeightPercentageTotalRow = document.getElementById('totalWeightPercentageTotalRow');
              //console.log("totalWeightPercentageFinalRow: ", totalWeightPercentageFinalRow);
              //console.log("totalWeightPercentageTotalRow: ", totalWeightPercentageTotalRow);
              if (totalPercentageRow) {
                  totalPercentageRow.cells[1].textContent = `${totalWeightedPercentage.toFixed(2)}%`;
                  // Ensure the percentage does not exceed 100%
                  //const displayedPercentage = Math.min(totalPercentage, 100);
                  //totalPercentageRow.cells[1].textContent = `${displayedPercentage.toFixed(2)}%`;
                  //console.log("Displayed Total Percentage: ", displayedPercentage.toFixed(2));
                  // Ensure the weight percentage does not exceed 100%
                  const totalWeightPercentageFinalRow = document.getElementById('totalWeightPercentageFinalRow');
                  console.log("totalWeightPercentageFinalRow: ", totalWeightPercentageFinalRow);
                  //totalWeightPercentageFinalRow.textContent = `(${totalActiveWeight.toFixed(2)}%)`;
                  totalWeightPercentageFinalRow.textContent = `(${formatNumberToWhole(totalWeight)}%)`;
                  console.log("Actual Total Weighted Percentage of totalPercentageRow: ", totalWeightedPercentage.toFixed(2));
                  //console.log("recalculateTotalsNormalizedTo100Percent() totalWeight 2 (formatNumberToWhole()): ", formatNumberToWhole(totalWeight));
              } else {
                  console.log("No totalPercentageRow found.");
                  //console.log("recalculateTotalsNormalizedTo100Percent() totalWeight 3: ", totalWeight);
              }
          
              // Update the gradesDisplayElement on the Canvas page
              /*if (gradesDisplayElement) {
                gradesDisplayElement.innerText = `${totalPercentage.toFixed(2)}%`;
              } else {
                console.log("No gradesDisplayElement found.");
              }*/
              if (gradesDisplayElement) {
                gradesDisplayElement.innerText = `${totalWeightedPercentage.toFixed(2)}%`;
                //const displayedPercentage = Math.min(totalPercentage, 100);
                //gradesDisplayElement.innerText = `${displayedPercentage.toFixed(2)}%`;
                //console.log("Displayed Total Percentage: ", displayedPercentage.toFixed(2));
                // Ensure the weight percentage does not exceed 100%
                //const totalWeightPercentageTotalRow = document.getElementById('totalWeightPercentageTotalRow');
                //console.log("totalWeightPercentageTotalRow: ", totalWeightPercentageTotalRow);
                //totalWeightPercentageTotalRow.textContent = `${totalActiveWeight.toFixed(2)}%`;
                console.log("Actual Total Weighted Percentage of gradesDisplayElement: ", totalWeightedPercentage.toFixed(2));
                //console.log("recalculateTotalsNormalizedTo100Percent() totalWeight 4: ", totalWeight);
              } else {
                console.log("No gradesDisplayElement found.");
                //console.log("recalculateTotalsNormalizedTo100Percent() totalWeight 5: ", totalWeight);
              }

              // Update the total weight percentage row
              const totalWeightPercentageTotalRow = document.getElementById('totalWeightPercentageTotalRow');
              console.log("totalWeightPercentageTotalRow: ", totalWeightPercentageTotalRow);
              if (totalWeightPercentageTotalRow) {
                console.log("totalActiveWeight: ", totalActiveWeight);
                //totalWeightPercentageTotalRow.textContent = `${totalActiveWeight.toFixed(2)}%`;
                totalWeightPercentageTotalRow.textContent = `${formatNumberToWhole(totalWeight)}%`;
                //console.log("recalculateTotalsNormalizedTo100Percent() totalWeight 6 (formatNumberToWhole()): ", formatNumberToWhole(totalWeight));
              } else {
                console.log("No totalWeightPercentageTotalRow found.");
                //console.log("recalculateTotalsNormalizedTo100Percent() totalWeight 7: ", totalWeight);
              }
              console.log("Normalized Total Percentage (totalWeightedPercentage.toFixed(2)): ", totalWeightedPercentage.toFixed(2));
              sisWeightedScore();
          }
        }

        function sisWeightedScore() {
          const groups = document.querySelectorAll('tr[data-group-id]');
          const normalizeCheckbox = document.getElementById('gradesNormalizedTo100PercentCheckbox');
          let totalWeightedScore = 0;
          let totalWeight = 0;
          let totalPointsEarned = 0;
          let totalPointsAvailable = 0;
      
          // Collect group data
          const groupData = Array.from(groups).map(group => {
              const earnedPointsElement = group.querySelector('td[data-group-earned-points]');
              const availablePointsElement = group.querySelector('td[data-group-available-points]');
              
              if (!earnedPointsElement || !availablePointsElement) {
                  console.log(`Missing data for group: ${group.getAttribute('data-group-name')}`);
                  return null;
              }
      
              const earnedPoints = parseFloat(earnedPointsElement.getAttribute('data-group-earned-points'));
              const availablePoints = parseFloat(availablePointsElement.getAttribute('data-group-available-points'));
              const weight = parseFloat(group.getAttribute('data-group-weight'));
              const groupName = group.getAttribute('data-group-name');
              
              console.log(`Group: ${groupName}, Earned Points: ${earnedPoints}, Available Points: ${availablePoints}, Weight: ${weight}`);
              return { earnedPoints, availablePoints, weight, groupName };
          }).filter(group => group !== null); // Filter out any null entries
      
          // Normalize weights if necessary
          if (normalizeCheckbox && normalizeCheckbox.checked) {
              const validGroups = groupData.filter(group => group.availablePoints > 0);
              const totalValidWeight = validGroups.reduce((sum, group) => sum + group.weight, 0);
              console.log(`Total Valid Weight Before Normalization: ${totalValidWeight}`);
      
              validGroups.forEach(group => {
                  group.normalizedWeight = (group.weight / totalValidWeight) * 100;
                  console.log(`Normalized Weight for Group: ${group.groupName}: ${group.normalizedWeight.toFixed(2)}`);
              });
          }
      
          // Calculate weighted scores
          groupData.forEach(group => {
              if (group.availablePoints > 0) {
                  const percentage = (group.earnedPoints / group.availablePoints) * 100;
                  const weight = normalizeCheckbox && normalizeCheckbox.checked ? group.normalizedWeight : group.weight;
                  const weightedScore = ((percentage * weight) / 100).toFixed(2);
                  totalWeightedScore += parseFloat(weightedScore);
                  totalWeight += weight;
                  totalPointsEarned += group.earnedPoints;
                  totalPointsAvailable += group.availablePoints;
                  console.log(`Group: ${group.groupName}, Percentage: ${percentage.toFixed(2)}, Weight: ${weight.toFixed(2)}, Weighted Score: ${weightedScore}`);
              }
          });
      
          // Check if total points earned equals total points available
          if (totalPointsEarned === totalPointsAvailable) {
              totalWeightedScore = 100;
          }
      
          console.log(`Total Points Earned: ${totalPointsEarned}`);
          console.log(`Total Points Available: ${totalPointsAvailable}`);
          console.log(`Total SIS Weighted Score: ${totalWeightedScore.toFixed(2)}`);
        }

        function addCheckAllNoneLink() {
          // Find the "Include" header by iterating over all th elements
          const headers = document.querySelectorAll('th');
          const includeHeader = Array.from(headers).find(th => th.textContent.trim() === "Include");
      
          if (includeHeader) {
              const breakLine = document.createElement('br'); // Create a line break element
              const checkAllNoneSpan = document.createElement('span');
              const checkAllNoneLink = document.createElement('a');
              checkAllNoneLink.href = '#';
              checkAllNoneLink.textContent = 'Check All/None';
              checkAllNoneLink.addEventListener('click', toggleCheckboxes);
      
              // Set the text content of the span and embed the link within it
              checkAllNoneSpan.style.fontSize = 'small';
              checkAllNoneSpan.textContent = '(';
              checkAllNoneSpan.appendChild(checkAllNoneLink);
              checkAllNoneSpan.appendChild(document.createTextNode(')')); // Close the parenthesis
      
              // Append the line break and then the span (which now includes the link) to the header
              includeHeader.appendChild(breakLine);
              includeHeader.appendChild(checkAllNoneSpan);
          }
        }
        addCheckAllNoneLink();

        function toggleCheckboxes(event) {
          event.preventDefault(); // Prevent default link behavior
          const checkboxes = document.querySelectorAll('.include-checkbox');
          if (checkboxes.length === 0) return; // Fail gracefully if no checkboxes found
      
          // Determine if we should check or uncheck based on the state of the first checkbox
          const shouldCheck = !checkboxes[0].checked;
      
          checkboxes.forEach(checkbox => {
              checkbox.checked = shouldCheck;
          });

          // If the line below screws up the calculateSubmittedOnly function, delete it
          document.getElementById('calculateSubmittedOnly').checked = false;
      
          recalculateTotals(); // Call the recalculateTotals function after updating checkboxes
        }

      
        // Function to create and append the "Course Totals" table
        // Moving this to the setupUI function
        /*function createCourseTotalsTable() {
          // Create table and its elements
          const table = document.createElement('table');
          table.id = "courseTotals";
          table.style.width = '80%';
          table.style.position = 'relative';
          table.style.left = '100px';
          table.className = "ic-Table ic-Table--hover-row ic-Table--grades-summary-table";
        
          const caption = document.createElement('caption');
          caption.textContent = 'Course Totals';
          table.appendChild(caption);
        
          const thead = document.createElement('thead');
          const headerRow = document.createElement('tr');
          const headers = ["Marking Periods", "Points Earned", "Points Available", "Percentage", "Include"];
          headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
          });
          thead.appendChild(headerRow);
          table.appendChild(thead);
        
          const tbody = document.createElement('tbody');
          table.appendChild(tbody);
        
          // Define the rows to be added
          const rows = [
            { title: "Marking Period 1", class: "", periodId: "MP1Total" },
            { title: "MP1 Progress Check 1", class: "indent", periodId: "MP1PC1" },
            { title: "MP1 Progress Check 2", class: "indent", periodId: "MP1PC2" },
            { title: "MP1 Progress Check 3", class: "indent", periodId: "MP1PC3" },
            { title: "Marking Period 2", class: "", periodId: "MP2Total" },
            { title: "MP2 Progress Check 1", class: "indent", periodId: "MP2PC1" },
            { title: "MP2 Progress Check 2", class: "indent", periodId: "MP2PC2" },
            { title: "MP2 Progress Check 3", class: "indent", periodId: "MP2PC3" },
            { title: "Mid-term Exam", class: "", periodId: "MidTermExam" },
            { title: "Marking Period 3", class: "", periodId: "MP3Total" },
            { title: "MP3 Progress Check 1", class: "indent", periodId: "MP3PC1" },
            { title: "MP3 Progress Check 2", class: "indent", periodId: "MP3PC2" },
            { title: "MP3 Progress Check 3", class: "indent", periodId: "MP3PC3" },
            { title: "Marking Period 4", class: "", periodId: "MP4Total" },
            { title: "MP4 Progress Check 1", class: "indent", periodId: "MP4PC1" },
            { title: "MP4 Progress Check 2", class: "indent", periodId: "MP4PC2" },
            { title: "MP4 Progress Check 3", class: "indent", periodId: "MP4PC3" },
            { title: "Final Exam", class: "", periodId: "FinalExam" },
            { title: "Course Final", class: "", periodId: "CourseFinal" },
            { title: "Custom Date Range", class: "", periodId: "CustomRange" } // Maybe don't need this here
          ];
        
          // Add rows to the table body
          rows.forEach(row => {
              const tr = document.createElement('tr');
              tr.setAttribute('data-period-id', row.periodId); // Set data-period-id attribute
              const tdTitle = document.createElement('td');
          
              // Check if the row should be indented
              if (row.class === "indent") {
              tdTitle.style.paddingLeft = '30px'; // Apply indentation to the first cell
              }
          
              tdTitle.textContent = row.title;
              tr.appendChild(tdTitle);
          
              // Create empty cells for Points Earned, Points Available, and Percentage
              for (let i = 0; i < 3; i++) {
              const td = document.createElement('td');
              tr.appendChild(td);
              }
          
              // Create the Include checkbox
              const tdInclude = document.createElement('td');
              const includeCheckbox = document.createElement('input');
              includeCheckbox.type = 'checkbox';
              tdInclude.appendChild(includeCheckbox);
              tr.appendChild(tdInclude);
          
              tbody.appendChild(tr);
          });
        
          // Append the table to the document body or a specific element
          waybetterGradebookContainer.appendChild(table);
        }*/

        async function loadPeriodDataIntoTable(submissions) {
          // Define your time frames as in your existing code
          const timeFrames = {
            MP1Total: { start: MP1TotalStartTime, end: MP1TotalEndTime },
            MP1PC1: { start: MP1PC1StartTime, end: MP1PC1EndTime },
            MP1PC2: { start: MP1PC2StartTime, end: MP1PC2EndTime },
            MP1PC3: { start: MP1PC3StartTime, end: MP1PC3EndTime },
            MP2Total: { start: MP2TotalStartTime, end: MP2TotalEndTime },
            MP2PC1: { start: MP2PC1StartTime, end: MP2PC1EndTime },
            MP2PC2: { start: MP2PC2StartTime, end: MP2PC2EndTime },
            MP2PC3: { start: MP2PC3StartTime, end: MP2PC3EndTime },
            MP3Total: { start: MP3TotalStartTime, end: MP3TotalEndTime },
            MP3PC1: { start: MP3PC1StartTime, end: MP3PC1EndTime },
            MP3PC2: { start: MP3PC2StartTime, end: MP3PC2EndTime },
            MP3PC3: { start: MP3PC3StartTime, end: MP3PC3EndTime },
            MP4Total: { start: MP4TotalStartTime, end: MP4TotalEndTime },
            MP4PC1: { start: MP4PC1StartTime, end: MP4PC1EndTime },
            MP4PC2: { start: MP4PC2StartTime, end: MP4PC2EndTime },
            MP4PC3: { start: MP4PC3StartTime, end: MP4PC3EndTime },
            SchoolYearTotal: { start: schoolYearStartTime, end: schoolYearEndTime },
            CustomTimeTotal: { start: customStartTime, end: customEndTime }
          };
        
          Object.entries(timeFrames).forEach(([periodId, {start, end}]) => {
            const totals = calculateTotalsForTimeFrame(submissions, start, end);
            updateCourseTotalsTableRow(periodId, totals);
          });
        }
        
        function calculateTotalsForTimeFrame(submissions, startTime, endTime) {
          let pointsEarned = 0;
          let pointsAvailable = 0;

          // Filter submissions based on the time frame and calculate totals
          submissions.forEach(submission => {
              const submissionDate = new Date(submission.submitted_at);
              if (submissionDate >= startTime && submissionDate <= endTime) {
              pointsEarned += submission.score;
              pointsAvailable += submission.assignment.points_possible;
              }
          });

          // Calculate the percentage of points earned
          const percentage = pointsAvailable > 0 ? (pointsEarned / pointsAvailable) * 100 : 0;

          return {
              pointsEarned: pointsEarned,
              pointsAvailable: pointsAvailable,
              percentage: percentage
          };
        }
        
        function updateCourseTotalsTableRow(periodId, data) {
          const row = document.querySelector(`#courseTotalsTable tr[data-period-id="${periodId}"]`);
          if (row) {
            row.cells[1].textContent = data.pointsEarned.toFixed(2);
            row.cells[2].textContent = data.pointsAvailable.toFixed(2);
            row.cells[3].textContent = `${data.percentage.toFixed(2)}%`;
          }
        }

        function calculateMP1Total(submissions, assignmentGroups) {
          let weightedPointsEarned = 0;
          let weightedPointsAvailable = 0;
      
          submissions.forEach(submission => {
              const assignment = submission.assignment;
              const dueDate = new Date(assignment.due_at); // Use due date of the assignment
              if (dueDate >= MP1TotalStartTime && dueDate <= MP1TotalEndTime) {
                  const group = assignmentGroups.find(g => g.id === assignment.assignment_group_id);
                  //console.log(submission);
                  //console.log(assignment.name);
                  //console.log(group);
                  if (group && group.group_weight) {
                      const weight = group.group_weight / 100; // Convert percentage to decimal
                      const score = submission.score !== null ? submission.score : 0; // Handle null explicitly
                      //console.log("submission.score: " + submission.score);
                      const pointsPossible = assignment.points_possible !== null ? assignment.points_possible : 0; // Handle null explicitly
                      //console.log("pointsPossible: " + pointsPossible);
      
                      // Apply weight only if the submission is graded (not excused)
                      if (submission.workflow_state === 'graded' && !submission.excused) {
                          weightedPointsEarned += score * weight;
                          weightedPointsAvailable += pointsPossible * weight;
                      } else if (submission.workflow_state === 'unsubmitted') {
                          // Count unsubmitted as 0 points earned, but still consider the points possible in the total
                          weightedPointsAvailable += pointsPossible * weight;
                      }
                      //console.log("Weighted Points Earned: " + weightedPointsEarned);
                      //console.log("Weighted Points Available: " + weightedPointsAvailable);
                  }
              }
          });
      
          const percentage = weightedPointsAvailable > 0 ? (weightedPointsEarned / weightedPointsAvailable) * 100 : 0;
          //console.log("Final Percentage: " + percentage);
      
          return {
              pointsEarned: weightedPointsEarned,
              pointsAvailable: weightedPointsAvailable,
              percentage: percentage
          };
        }

        function updateMP1TotalRow(data) {
          const row = document.querySelector('#courseTotalsTable tr[data-period-id="MP1Total"]');
          if (row) {
              row.cells[1].textContent = data.pointsEarned.toFixed(2);
              row.cells[2].textContent = data.pointsAvailable.toFixed(2);
              row.cells[3].textContent = `${data.percentage.toFixed(2)}%`;
          }
        }

        async function loadMP1TotalData() {
          try {
              //const submissions = await fetchSubmissionsForStudent();
              //const assignmentGroups = await fetchAssignmentGroups();
              const mp1TotalData = calculateMP1Total(submissions, assignmentGroups);
              updateMP1TotalRow(mp1TotalData);
          } catch (error) {
              console.error('Failed to load MP1Total data:', error);
          }
        }
      
        //loadMP1TotalData();
      } // End of displaySubmissionsWithCategories()
      
      // Main function to fetch data and display it
      // ORG
      /*async function main() {
        try {
          const [submissions, assignmentGroups] = await Promise.all([
            fetchSubmissionsForStudent(),
            fetchAssignmentGroups()
            //fetchAssignmentsViaAnalytics()
          ]);
          setupUI(submissions, assignmentGroups);
          //displaySubmissionsWithCategories(submissions, assignmentGroups);
        } catch (error) {
          console.error('Failed to fetch or display submissions:', error);
        }
      }*/

      function fadeOutElement(element) {
          let op = 1;  // initial opacity
          const timer = setInterval(() => {
              if (op <= 0.1) {
                  clearInterval(timer);
                  element.style.display = 'none';
              }
              element.style.opacity = op;
              element.style.filter = 'alpha(opacity=' + op * 100 + ")";
              op -= op * 0.1;
          }, 50);
      }

      function fadeOutElementLinear(element) {
          let op = 1;  // initial opacity
          const decrement = 0.05; // Faster decrement rate
          const intervalTime = 20; // Shorter interval time
      
          const timer = setInterval(() => {
              if (op <= 0.1) {
                  clearInterval(timer);
                  element.style.display = 'none';
              }
              element.style.opacity = op;
              element.style.filter = 'alpha(opacity=' + op * 100 + ")";
              op -= decrement; // Subtract a fixed amount for a more linear fade
          }, intervalTime);
      }

      function addTransitionStyles() {
          const style = document.createElement('style');
          document.head.appendChild(style);
          style.textContent = `
              .transition-element {
                  opacity: 0;
                  transition: opacity 0.5s ease-in;
              }
          `;
      }

      function fadeOutAndInElement(element, newContent) {
          element.style.opacity = '0'; // Start by fading out
          element.style.transition = 'opacity 0.5s ease-in-out';
      
          // Wait for the fade out to finish
          setTimeout(() => {
              element.innerHTML = newContent; // Change the content when it's invisible
              fadeInElement(element); // Start fading in
          }, 500); // This timeout should match the transition time
      }
      
      function fadeInElement(element) {
          element.style.opacity = '1'; // Fade in by setting opacity back to 1
      }

      function createAndManageLoader() {
          const loader = document.createElement('div');
          loader.id = 'loader';
          loader.style.display = 'none'; // Initially hidden
          loader.style.position = 'fixed';
          loader.style.top = '50%';
          loader.style.left = '50%';
          loader.style.transform = 'translate(-50%, -50%)';
          loader.style.zIndex = '1000';
          loader.innerHTML = `
              <svg width="64px" height="64px" viewBox="0 0 50 50">
                  <path fill="#3498db" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.055,6.56-14.615,14.615-14.615c8.055,0,14.615,6.56,14.615,14.615H43.935z">
                      <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="0.6s"
                        repeatCount="indefinite"/>
                  </path>
              </svg>
          `;
      
          document.body.appendChild(loader);
      
          return {
              show: function() {
                  loader.style.display = 'block';
              },
              hide: function() {
                  loader.style.display = 'none';
              }
          };
      }

      async function main() {

          const loader = createAndManageLoader();
          loader.show(); // Show the loader before starting the fetch operations
          addTransitionStyles();

          // Create a div for status messages under the loader
          const statusMessage = document.createElement('div');
          statusMessage.style.position = 'fixed';
          statusMessage.style.top = '60%'; // Adjust based on your layout
          statusMessage.style.left = '50%';
          statusMessage.style.transform = 'translate(-50%, -50%)';
          statusMessage.style.zIndex = '1001';
          statusMessage.style.opacity = '0';
          statusMessage.style.transition = 'opacity 0.5s ease-in-out'; // Transition for fading
          document.body.appendChild(statusMessage);

          // Function to update status message with transition effects
          function updateStatusMessage(message) {
              // Fade out current message
              statusMessage.style.opacity = '0';
              setTimeout(() => {
                  statusMessage.textContent = message;
                  // Fade in new message
                  statusMessage.style.opacity = '1';
              }, 500); // Wait for the fade out to finish
          }

          // Schedule status messages
          const messageTimeouts = [
              setTimeout(() => updateStatusMessage("Working to gather all of the assignments...Please wait a few more moments."), 6000),
              setTimeout(() => updateStatusMessage("Almost there! Thank you for your patience!"), 12000),
              setTimeout(() => updateStatusMessage("A timeout may have occurred. Either continue waiting, or refresh the page and try again."), 30000)
          ];

          try {
            const assignmentsElement = document.getElementById('assignments');
            const GradeSummarySelectMenuGroupElement = document.getElementById('GradeSummarySelectMenuGroup');
            const studentGradesShowAllElement = document.getElementById('student-grades-show-all');
            //const only_consider_graded_assignments_wrapperElement = document.getElementById('only_consider_graded_assignments_wrapper');
            if (assignmentsElement && GradeSummarySelectMenuGroupElement && studentGradesShowAllElement) {
                assignmentsElement.style.opacity = '1'; // Ensure it's fully visible at start
                GradeSummarySelectMenuGroupElement.style.opacity = '1';
                studentGradesShowAllElement.style.opacity = '1';
                //only_consider_graded_assignments_wrapperElement.style.opacity = '1';
                fadeOutElementLinear(assignmentsElement);
                fadeOutElementLinear(GradeSummarySelectMenuGroupElement);
                fadeOutElementLinear(studentGradesShowAllElement);
                //fadeOutElementLinear(only_consider_graded_assignments_wrapperElement);
            }

            const teacherWhatIfElement = document.getElementById('teacher-what-if');
            if (teacherWhatIfElement) {
              teacherWhatIfElement.style.opacity = '1';
              fadeOutElementLinear(teacherWhatIfElement);
            }

            const outcomesElement = document.getElementById('outcomes');
            if (outcomesElement) {
              outcomesElement.style.opacity = '1';
              fadeOutElementLinear(outcomesElement);
            }

            const navpillsElement = document.getElementById('navpills');
            if (navpillsElement) {
              navpillsElement.style.opacity = '1';
              fadeOutElementLinear(navpillsElement);
            }

            const [submissions, assignmentGroups, enrollments] = await Promise.all([
                fetchSubmissionsForStudent(),
                fetchAssignmentGroups(),
                fetchEnrollments()
                //fetchAssignmentsViaAnalytics()
            ]);

            // Clear all timeouts if data is fetched before all messages are shown
            messageTimeouts.forEach(clearTimeout);

            loader.hide(); // Hide the loader after fetching data
            statusMessage.style.display = 'none'; // Hide status message

            // When the promises are resolved, start fading out the element
            /*if (assignmentsElement && GradeSummarySelectMenuGroupElement) {
                fadeOutElementLinear(assignmentsElement);
                fadeOutElementLinear(GradeSummarySelectMenuGroupElement);
                //fadeOutElementLinear(only_consider_graded_assignments_wrapperElement);
            }*/

            setupUI(submissions, assignmentGroups, enrollments);
            //displaySubmissionsWithCategories(submissions, assignmentGroups);

            // Use requestAnimationFrame to ensure the browser has applied the initial styles
            // This is to ensure that the waybetterGradebookContainer is invisible before the transition starts
            // I don't think this is needed, right now, but it's here if we need it at a later time.
            /*requestAnimationFrame(() => {
                const waybetterGradebookContainer = document.getElementById('waybetterGradebookContainer');
                if (waybetterGradebookContainer) {
                    waybetterGradebookContainer.style.opacity = 0; // Ensure it starts invisible
                    setTimeout(() => waybetterGradebookContainer.style.opacity = 1, 50); // Slight delay to ensure transition
                }
            });*/

          } catch (error) {
              console.error('Failed to fetch or display submissions:', error);
              updateStatusMessage("An error occurred. Please check the console for more details.");
              if (assignmentsElement && GradeSummarySelectMenuGroupElement) {
                  assignmentsElement.style.opacity = '1'; // Reset opacity if there's an error
                  GradeSummarySelectMenuGroupElement.style.opacity = '1';
                  //only_consider_graded_assignments_wrapperElement.style.opacity = '1';
              }
          }
      }
      
      main();
    }
      
    // Create the button element
    //const waybetterGradebookButton = document.createElement('button');
    //waybetterGradebookButton.textContent = 'Enable The Waybetter Gradebook';
    //waybetterGradebookButton.className = 'Button';
    //waybetterGradebookButton.style = 'position: fixed; top: 20px; right: 20px; z-index: 1000;'; // Change if we don't want fixed styling

    // Append the button to the body or another element in the document
    //document.body.appendChild(waybetterGradebookButton);

    // Attach the event listener to the button
    //waybetterGradebookButton.addEventListener('click', function handleClick() {
    //    initializeWaybetterGradebook();
    //    // Disable the button after it is clicked
    //    waybetterGradebookButton.disabled = true;
    //    // Remove the event listener
    //    waybetterGradebookButton.removeEventListener('click', handleClick);
    //});

    function EmbedTheWayBetterGradebookButton() {
      // Create the button element
      const waybetterGradebookButton = document.createElement('button');
      waybetterGradebookButton.textContent = 'Enable The Waybetter Gradebook';
      waybetterGradebookButton.className = 'Button';
      waybetterGradebookButton.id = 'enableWaybetterGradebookButton';
      waybetterGradebookButton.style = 'position: fixed; top: 20px; right: 20px; z-index: 1000;'; // Change if we don't want fixed styling
      waybetterGradebookButton.style = 'opacity: 0; transition: opacity 0.2s ease-in-out, background-color 0.2s ease-in-out;';

      // Try to find the #print-grades-button-container element
      const printGradesButtonContainer = document.getElementById('print-grades-button-container');

      if (printGradesButtonContainer) {
          // If found, prepend the button to this container
          printGradesButtonContainer.insertBefore(waybetterGradebookButton, printGradesButtonContainer.firstChild);
          // Adjust style to fit within the container
          waybetterGradebookButton.style.position = 'static'; // Adjust as necessary based on container's styling
          waybetterGradebookButton.style.margin = '6px 0px 6px 0px';
      } else {
          // If not found, append the button to the body as originally coded
          document.body.appendChild(waybetterGradebookButton);
      }

      // Attach the event listener to the button
      function handleWaybetterGradebookButtonClick() {
        initializeWaybetterGradebook();
        // Disable the button after it is clicked
        waybetterGradebookButton.disabled = true;
        waybetterGradebookButton.style.opacity = 0.5;
        waybetterGradebookButton.style.cursor = 'not-allowed'; // Browser isn't recognizing this for some reason
        // Remove the event listener
        waybetterGradebookButton.removeEventListener('click', handleWaybetterGradebookButtonClick);
      }

      waybetterGradebookButton.addEventListener('click', handleWaybetterGradebookButtonClick);

      // Fade in the button
      setTimeout(() => {
          waybetterGradebookButton.style.opacity = 1;
      }, 100); // Delay to ensure CSS is applied

      // Check if the URL contains the query parameter "thewaybettergradebook=true"
      const urlParams = new URLSearchParams(window.location.search);
      const isWaybetterEnabled = urlParams.get('thewaybettergradebook') === 'true';

      if (isWaybetterEnabled) {
        const checkOpacityInterval = setInterval(() => {
            if (parseFloat(window.getComputedStyle(waybetterGradebookButton).opacity) === 1) {
                clearInterval(checkOpacityInterval);
                // Give the browser a chance to load the default grade table to make it more pleasing on the eyes
                setTimeout(() => {
                  handleWaybetterGradebookButtonClick(); // Simulate a click
                }, 500);
            }
        }, 50); // Check every 50ms
      }

    }
    // Execute EmbedTheWayBetterGradebookButton right away
    //EmbedTheWayBetterGradebookButton();

    // Execute EmbedTheWayBetterGradebookButton when the document is ready
    /*document.addEventListener('DOMContentLoaded', function() {
      EmbedTheWayBetterGradebookButton();
    });*/

    // Check if the document is already loaded
    if (document.readyState === 'loading') {
      // Document is still loading, wait for it to be ready
      document.addEventListener('DOMContentLoaded', EmbedTheWayBetterGradebookButton);
    } else {
      // Document is already ready, execute the function immediately
      EmbedTheWayBetterGradebookButton();
    }




    



  }; //END var theWayBetterGradebookUI = function()





  if (typeof theWayBetterGradebookUI !== 'function') {
    const script = document.createElement('script');
    script.src = 'https://github.com/dslusser/PalcsUI-Canvancement/raw/master/install/the-waybetter-gradebook-standalone-beta.user.js';
    script.onload = function() {
      theWayBetterGradebookUI();
    };
    document.head.appendChild(script);
  }
  else {
    theWayBetterGradebookUI();
  }

  //theWayBetterGradebookUI();

})();