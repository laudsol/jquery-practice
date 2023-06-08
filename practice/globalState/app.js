$(document).ready(() => {
    let foods = ['pizza', 'tacos', 'falafel', 'biryani', 'kabob', 'bolani'];

    let foodState = foods.reduce((prev, curr) => {
         prev[curr] = 0;
        return prev;
    }, {});


    const foodCounterContainer = $("<div></div>");
    $("#start").after(foodCounterContainer);    

    foods.forEach(food => {
        const foodCounter = $("<div></div>")
            .text(`${food}: ${foodState[food]}`)
            .attr('id', `${food}-food-counter`);
        foodCounterContainer.append(foodCounter);
    });

    const buttonContainer = $("<div></div>");
    foodCounterContainer.after(buttonContainer);   
    
    foods.forEach(food => {
        const foodButton = $("<button></button>")
            .text(food)
            .on('click', () => {
                foodState[food] += 1;
                $(`#${food}-food-counter`).text(`${food}: ${foodState[food]}`);
            });
        buttonContainer.append(foodButton);
    });
});