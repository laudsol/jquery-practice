$(document).ready(() => {
    let foods = ['pizza', 'tacos', 'falafel', 'biryani', 'kabob', 'bolani'];

    let foodState = foods.reduce((prev, curr) => {
         prev[curr] = 0;
        return prev;
    }, {});

    const foodCounterContainer = $("<div></div>");
    $("#start").after(foodCounterContainer);    
    
    const buttonContainer = $("<div></div>");
    foodCounterContainer.after(buttonContainer);   

    foods.forEach(food => {
        const foodCounter = getFoodCounterElement(food);
        foodCounterContainer.append(foodCounter);
        
        const foodButton = getFoodButtonElement(food);
        buttonContainer.append(foodButton);
    });
    
    function getFoodCounterElement(food) {
        return $("<div></div>")
            .text(`${food}: ${foodState[food]}`)
            .attr('id', `${food}-food-counter`);
    }

    function getFoodButtonElement(food) {
        return $("<button></button>")
        .text(food)
        .on('click', () => {
            foodState[food] += 1;
            $(`#${food}-food-counter`).text(`${food}: ${foodState[food]}`);
        });
    }
});