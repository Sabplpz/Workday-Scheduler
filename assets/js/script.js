// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  //The following is the event listener to save the text added on the colored lines
  $(document).on("click", ".saveBtn", function(){
    //This will get the note from the class description
    var note = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    //This will save said note
    localStorage.setItem(time, note);
  });

  //This functions is to change the color of the block as the hours passes
  function hourColor() {
    //this variable is to recognize the current hour
    var currentHour = dayjs().hour();

    $('.time-block').each(function(){
      //This wil identify each divison by it's number (hour)
      var blockHour = parseInt($(this).attr("id"));

      //The followign if statement is to change the color depending on the time
      //If less than currentHour means it is past, so it'll assign the past class
      if(blockHour < currentHour){
        $(this).addClass("past");
      } else if(blockHour === currentHour) { 
        //If equal to the current hour it'll remove the past class and apply the present class
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        //If it's not one of the above. it means that it is future, so it'll remove the
        // previous classes and it'll apply the future class
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    })
  }

  //this si to call the fucntion that change sthe hours colors
  hourColor();

  //This will continuosly call the same fucntion every 15 minutes to updat ethe color
  setInterval(hourColor, 15000);

  //The below will update the current day and date at the top of the webpage
  for(var i=9; i<=18;i++)
  {
    $("#"+i+" .description").val(localStorage.getItem(i));
  }

  $("#currentDay").text(dayjs().format('dddd, MMM D, YYYY'));

});