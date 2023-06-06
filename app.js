$(document).ready(() => {
    // grabs the element with ID starting-point
    const startingElement = $("#starting-point");
    // creates a new div 
    const siblingElement = $("<div></div>");
    // adds test tp the new div
    siblingElement.text("This is the next part");
    // appends the new div to startingElement
    startingElement.after(siblingElement);

});