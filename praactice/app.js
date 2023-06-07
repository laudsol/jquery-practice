$(document).ready(() => {
    const favoriteFoods = $("#favorite-foods")
        .css('background-color', 'purple');

    const favs = [
        {food: 'pizza', color: 'green'},
        {food: 'falafel', color: 'yellow'},
        {food: 'bolani', color: 'red'},
        {food: 'burger', color: 'orange'}
    ];

    let totalCount = 0;
    const orderCounter =  $("<div></div>")
        .text(`total food: ${totalCount}`)

    $('#starting-point').after(orderCounter);

    favs.forEach(fav => {
        let itemCounter = 0;
    
        const foodBox = $("<div></div>")
            .css(
                    {
                        'border-style': 'solid',
                        'background-color': fav.color
                    }
            );
        
        const foodName = $("<div></div>")
            .text(fav.food);
    
        const count = $("<div></div>")
            .text(`quantity: ${itemCounter}`);
    
        const button = $("<button></button>")
            .text('Add Item')
            .on('click' , () => {
                itemCounter += 1;
                count.text(`quantity: ${itemCounter}`);
                
                totalCount += 1;
                orderCounter.text(`total food: ${totalCount}`);
            });
            
        foodBox.append(foodName);
        foodBox.append(count);
        foodBox.append(button);
        
        favoriteFoods.after(foodBox);

    })

});