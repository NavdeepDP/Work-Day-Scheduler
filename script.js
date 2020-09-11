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

    /**
     * FUNCTION DEFINITIONS
     * 
     */
    for (var i = 1; i <= 9; i++) {

        
        var newRow = $("<div>");        
        newRow.addClass("row");

        var newHourDiv = $("<div>");
        newHourDiv.addClass("col-sm-1 hour");
        newHourDiv.text("9AM");      
        newRow.append(newHourDiv);

        var newTextDiv = $("<div>")
        newTextDiv.addClass("col-sm-10 divPadding");
        var textAreaVar = $("<textarea>");
        textAreaVar.addClass("past");
        newTextDiv.append(textAreaVar);
        newRow.append(newTextDiv);

        var newBtnDiv = $("<div>")
        newBtnDiv.addClass("col-sm-1 divPadding");
        var btnVar = $("<button>");
        btnVar.addClass("btn saveBtn");        
        btnVar.addClass("fa fa-save");
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


});