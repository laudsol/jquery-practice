$(document).ready(() => {
    // grabs the element with ID starting-point
    const startingElement = $("#starting-point");
    // creates a new div 
    const siblingElement = $("<div></div>");
    // adds test tp the new div
    siblingElement.text("This is the next part");
    // appends the new div to startingElement
    startingElement.after(siblingElement);


    const favoriteFoods = $("#favorite-foods");
    favoriteFoods.css('background-color', 'purple');

    const favs = [
        {food: 'pizza', color: 'green'},
        {food: 'falafel', color: 'yellow'},
        {food: 'bolani', color: 'red'},
        {food: 'hot dog', color: 'orange'}
    ];

    favs.forEach(fav => {
        let favFood = $("<div></div>")
            .text(fav.food)
            .css('background-color', fav.color);
        favoriteFoods.after(favFood);
    });
});