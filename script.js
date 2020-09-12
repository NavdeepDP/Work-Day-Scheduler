$(document).ready(function () {

    console.log("Document ready");

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
    var currentDayVar = moment(new Date());
    var currentDayString = currentDayVar.format("dddd, MMM do")
    console.log(currentDayVar.format("dddd, MMM do"));
    currentDayElement.text(currentDayString);

    var startTime = 9;

    /**
     * FUNCTION DEFINITIONS
     * 
     */
    // get the current hour
    const timeNow = moment();
    var hourNow = timeNow.hour();
    console.log("now: " + hourNow);
    hourNow = 14;

    function getEventScheduled(timeTag) {
        var saveScheduledEvents = [];
        var timeTagFound = false;
        var local = JSON.parse(localStorage.getItem("calenderEvents"));
        if (local !== null) {
            saveScheduledEvents = local;

            for (var i = 0; i < saveScheduledEvents.length; i++) {
                if (saveScheduledEvents[i].time === parseInt(timeTag)) {
                    return(saveScheduledEvents[i].event);
                    timeTagFound = true;
                    
                }
            }
        }
        if (!timeTagFound)
            return "";
    }

    for (var i = 0; i < 9; i++) {

        var currentRowTimeTag;
        currentRowTimeTag = startTime + i;



        var newRow = $("<div>");
        newRow.addClass("row");

        //Working hours time div
        var newHourDiv = $("<div>");
        newHourDiv.addClass("col-sm-1 hour");
        if (startTime + i > 12) {
            newHourDiv.text(((startTime + i) - 12) + "PM");
        }
        else if ((startTime + i) === 12) {
            newHourDiv.text("12PM");
        }
        else {
            newHourDiv.text((startTime + i) + "AM");
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


    /**
     * FUNCTION CALLS
     */

    /**
     * EVENT HANDLERS
     */

    $(document).on("click", ".saveBtn", function (event) {

        console.log("save button clicked:");
        console.log($(this).attr("data-index"));

        var timeTag = $(this).attr("data-index");
        var id = "#" + "event-" + timeTag;
        var eventScheduled = $(id).val();

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
        if (!timeTagFound)
            saveScheduledEvents.push({ time: parseInt(timeTag), event: eventScheduled });

        localStorage.setItem("calenderEvents", JSON.stringify(saveScheduledEvents));

    });


});