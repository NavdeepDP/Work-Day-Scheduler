$(document).ready(function () {

    // console.log("Document ready");

    /***
     * DOM ELEMENTS
     */


    var currentDayElement = $("#currentDay");
    // container div
    var divContainer = $("#time-container");


    /**
     *  GLOBAL VARIABLES
     */

    //set the current date
    var currentDayVar = moment();
    // console.log(currentDayVar.format());
    // console.log(currentDayVar.format("YYYY-MM-DD"));
    var currentDayString = currentDayVar.format("dddd, MMM DD")    
    currentDayElement.text(currentDayString);

    

    

    /**
     * FUNCTION DEFINITIONS
     * 
     */

    // Function to retrieve already scheduled events from the local storage
    function getEventScheduled(timeTag) {
        var saveScheduledEvents = [];
        var timeTagFound = false;
        var local = JSON.parse(localStorage.getItem("calenderEvents"));
        if (local !== null) {
            saveScheduledEvents = local;

            for (var i = 0; i < saveScheduledEvents.length; i++) {
                if (saveScheduledEvents[i].time === parseInt(timeTag)) {
                    return (saveScheduledEvents[i].event);
                    timeTagFound = true;

                }
            }
        }
        if (!timeTagFound)
            return "";
    }

    // Function to display display time blocks with already scheduled events(if any) and save button(to update and save the events)
    function displayTimeBlocks() {
        
        var startTime = 9;

        // get the current hour
        const timeNow = moment();
        var hourNow = timeNow.hour();
        console.log("now: " + hourNow);
        // Hard coding time for testing purpose
        // hourNow = 10;

        for (var i = 0; i < 9; i++) {

            var currentRowTimeTag;
            currentRowTimeTag = startTime + i;

            var newRow = $("<div>");
            newRow.addClass("row");

            //Working hours time div
            var newHourDiv = $("<div>");
            newHourDiv.addClass("col-sm-1 hour");
            if (currentRowTimeTag > 12) {
                newHourDiv.text((currentRowTimeTag - 12) + "PM");
            }
            else if (currentRowTimeTag === 12) {
                newHourDiv.text("12PM");
            }
            else {
                newHourDiv.text(currentRowTimeTag + "AM");
            }
            newRow.append(newHourDiv);

            // check to decide past , present , future class
            var timeClassName = "";
            if (hourNow > currentRowTimeTag)
                timeClassName = "past";
            else if (hourNow < currentRowTimeTag)
                timeClassName = "future";
            else
                timeClassName = "present";


            var eventText = getEventScheduled(currentRowTimeTag);

            var newTextDiv = $("<div>")
            newTextDiv.addClass("col-sm-10 divPadding");
            var textAreaVar = $("<textarea>");
            textAreaVar.addClass(timeClassName);            
            textAreaVar.attr("id", "event-" + currentRowTimeTag);
            textAreaVar.text(eventText);
            newTextDiv.append(textAreaVar);
            newRow.append(newTextDiv);

            var newBtnDiv = $("<div>")
            newBtnDiv.addClass("col-sm-1 divPadding");
            var btnVar = $("<button>");
            btnVar.addClass("btn saveBtn");
            btnVar.addClass("fa fa-save");
            btnVar.attr("data-index", currentRowTimeTag);
            newBtnDiv.append(btnVar);
            newRow.append(newBtnDiv);

            divContainer.append(newRow);
        }

    }
    /**
     * FUNCTION CALLS
     */

     // display time blocks with scheduled events on page
     displayTimeBlocks();
    
     /**
     * EVENT HANDLERS
     */

     // Event handler for the save buttons to save the scheduled events.
    $(document).on("click", ".saveBtn", function (event) {

        // console.log("save button clicked:");
        // console.log($(this).attr("data-index"));

        // get the save button clicked and the textarea to target to save the event
        var timeTag = $(this).attr("data-index");
        var id = "#" + "event-" + timeTag;
        var eventScheduled = $(id).val();

        // Retrieve the scheduled events from local storage
        var saveScheduledEvents = [];
        var timeTagFound = false;
        var local = JSON.parse(localStorage.getItem("calenderEvents"));
        if (local !== null) {
            saveScheduledEvents = local;

            for (var i = 0; i < saveScheduledEvents.length; i++) {
                if (saveScheduledEvents[i].time === parseInt(timeTag)) {
                    saveScheduledEvents[i].event = eventScheduled;
                    timeTagFound = true;
                    break;
                }
            }
        }
        // If the event is not scheduled for any time block, add the new event to the array
        if (!timeTagFound)
            saveScheduledEvents.push({ time: parseInt(timeTag), event: eventScheduled });

        // store the all the events in  the local storage.
        localStorage.setItem("calenderEvents", JSON.stringify(saveScheduledEvents));

    });


});