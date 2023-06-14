$(document).ready(function() {
    const dataObj = getRestaurantData();

    const $orderBox = $("<div></div>")   
        .text('Your order');
    
    const orderObj = Object.keys(dataObj).reduce((prev, curr) => {
        prev[curr] = 0;
        return prev;
    }, {});

    Object.keys(dataObj).forEach(item => {
        const orderItem =  $("<div></div>")   
            .text(`${item}: ${orderObj[item]}`)
            .attr('id', `order-item-${item}`);

        $orderBox.append(orderItem);
    });
    
    const getTotalPrice = (orders, menuObj) => {
        return Object.keys(orders).reduce((prev, curr) => {
            const price = menuObj[curr].price;
            const quantity = orders[curr];
            prev += price * quantity;
            return prev;
        }, 0);
    }
    
    let totalPrice = getTotalPrice(orderObj, dataObj);

    const priceDisplay = $("<div></div>")
        .text(`Total price: ${totalPrice}`);

    $('#menu').append($orderBox);
    $('#menu').append(priceDisplay);

    
    Object.keys(dataObj).forEach(item => {
        const menuItem = dataObj[item];
        const detailsString = menuItem.details.reduce((prev, curr) => {
            return `${prev} ${curr}`;
        }, "");

        let $itemBox = $("<div></div>")
            .css("border-style", "solid");
        let $foodName = $("<div></div>")
            .text(item);
        let $price = $("<div></div>")
            .text(`Price ${menuItem.price}`);
        let $details = $("<div></div>")
            .text(`Includes: ${detailsString}`);
        let $addButton = $("<button></button>")
            .text('Add')
            .on('click', () => {
                if (orderObj[item] < menuItem.inStock) {
                    orderObj[item] += 1;
                    $(`#order-item-${item}`).text(`${item}: ${orderObj[item]}`);
                    priceDisplay.text(`Total price: ${getTotalPrice(orderObj, dataObj)}`);
                } else {
                    alert(`Sorry! We're all sold out of ${item}`)
                }
            });
        let $removeButton = $("<button></button>")
            .text('Remove')
            .on('click', () => {
                if (orderObj[item] > 0) {
                    orderObj[item] -= 1;
                    $(`#order-item-${item}`).text(`${item}: ${orderObj[item]}`);
                    priceDisplay.text(`Total price: ${getTotalPrice(orderObj, dataObj)}`);
                } else {
                    alert(`You have no ${item} in your cart!`)
                }
        });

        $itemBox.append($foodName);
        $itemBox.append($price);
        $itemBox.append($details);
        $itemBox.append($addButton);
        $itemBox.append($removeButton);
        $('#menu').append($itemBox);
    });
    
});

const getRestaurantData = () => {
    return {
        kabob: {
            inStock: 6,
            price: 11.50,
            details: ['rice', 'salad', 'bread', 'yogurt']
        },
        manto: {
            inStock: 3,
            price: 7.25,
            details: []
        },
        kabuli: {
            inStock: 1,
            price: 16.80,
            details: ['salad', 'chilis', 'bread']
        },
        bolani: {
            inStock: 4,
            price: 4.50,
            details: ['chutney']
        },
        bamya: {
            inStock: 0,
            price: 12.00,
            details: ['chutney']
        },
        karahi: {
            inStock: 11,
            price: 15.50,
            details: ['rice', 'bread', 'yogurt']
        },
    }

    
}