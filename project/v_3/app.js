$(document).ready(function() {
    const dataObj = getRestaurantData();
    const loginCred = {
        username: 'student',
        password: '5050'
    }
    const orderObj = Object.keys(dataObj).reduce((prev, curr) => {
        prev[curr] = {
            sideDish: '',
            quantity: 0
        };
        return prev;
    }, {});

    createOrderSummary();
    createMenu();
    createLoginModal()

    function createLoginModal() {
        const loginModal = $('<div></div>');
        const loginForm = createLoginForm();
        const usernameLabel = $('<label></label>').text('Username');
        const usernameInput = $('<input></input>').attr('id', 'username-input');
        const passwordLabel = $('<label></label>').text('Password');
        const passwordInput = $('<input></input>').attr('id', 'password-input');
        const submitButton = $('<button></button>').text('Login');

        loginForm.append(usernameLabel);
        loginForm.append(usernameInput);
        loginForm.append('<br>');
        loginForm.append(passwordLabel);
        loginForm.append(passwordInput);
        loginForm.append('<br>');
        loginForm.append(submitButton);

        loginModal.append(loginForm);
        $('#title').after(loginModal);
    }

    function createLoginForm() {
        return $('<form></form>')
            .attr('id', 'login-form')
            .on('submit', (e) => {
                e.preventDefault();  
                const username = $('#username-input')[0].value;
                const password = $('#password-input')[0].value;
                const validUsername = username == loginCred.username;
                const validPassword = password == loginCred.password;
                if (validUsername && validPassword) {
                    console.log('cool');
                } else {
                    console.log('not cool');
                }
            });
    }
    
    function createOrderSummary() {
        const $orderBox = $("<div></div>")   
        .text('Your order');
        
        Object.keys(dataObj).forEach(item => {
            const orderItem =  $("<div></div>")   
            .text(`${item}: ${orderObj[item].quantity}`)
            .attr('id', `order-item-${item}`);
            
            $orderBox.append(orderItem);
        });
        
        let totalPrice = getTotalPrice(orderObj, dataObj);
        
        const priceDisplay = $("<div></div>")
            .attr('id', 'price-display')
            .text(`Total price: ${totalPrice}`);
        
        $('#menu').append($orderBox);
        $('#menu').append(priceDisplay);
    }
    
    function createMenu() {
        Object.keys(dataObj).forEach(item => {
            const menuItem = dataObj[item];
    
            let $itemBox = $("<div></div>")
                .css("border-style", "solid");
            let $foodName = $("<div></div>")
                .text(item);
            let $price = $("<div></div>")
                .text(`Price ${menuItem.price}`);
            let $sideDishLabel = $('<label></label>')
                .attr('for', `${item}-sideDish`)
                .text('Select a side dish')
            let $sideDishOptions = $('<select></select>')
                .attr('id', `${item}-sideDish`)
                .attr('name', `${item}-sideDish`);
            let $addButton = $("<button></button>")
                .text('Add')
                .on('click', () => {
                    if (orderObj[item].quantity < menuItem.inStock) {
                        orderObj[item].quantity += 1;
                        $(`#order-item-${item}`).text(`${item}: ${orderObj[item].quantity}`);
                        $('#price-display').text(`Total price: ${getTotalPrice(orderObj, dataObj)}`);
                    } else {
                        alert(`Sorry! We're all sold out of ${item}`)
                    }
                });
            let $removeButton = $("<button></button>")
                .text('Remove')
                .on('click', () => {
                    if (orderObj[item].quantity > 0) {
                        orderObj[item].quantity -= 1;
                        $(`#order-item-${item}`).text(`${item}: ${orderObj[item].quantity}`);
                        $('#price-display').text(`Total price: ${getTotalPrice(orderObj, dataObj)}`);
                    } else {
                        alert(`You have no ${item} in your cart!`)
                    }
                });

            menuItem.sideDish.forEach(side => {
                let sideOption = $("<option></option>")
                    .text(side);

                $($sideDishOptions).append(sideOption);
            });
            
            $itemBox.append($foodName);
            $itemBox.append($price);
            $itemBox.append($sideDishLabel);
            $itemBox.append($sideDishOptions);
            $itemBox.append('<br>');
            $itemBox.append($addButton);
            $itemBox.append($removeButton);
            $('#menu').append($itemBox);
            
            $(`#${item}-sideDish`).on('change', () => {
                let selectedSide = $(`#${item}-sideDish option:selected`).text();
                orderObj[item].sideDish = selectedSide;


            });
        });
    }

    function getTotalPrice(orders, menuObj) {
        return Object.keys(orders).reduce((prev, curr) => {
            const price = menuObj[curr].price;
            const quantity = orders[curr].quantity;
            prev += price * quantity;
            return prev;
        }, 0);
    }
});

const getRestaurantData = () => {
    return {
        kabob: {
            inStock: 6,
            price: 11.50,
            sideDish: ['rice', 'salad', 'bread', 'fries']
        },
        manto: {
            inStock: 3,
            price: 7.25,
            sideDish: ['salad']
        },
        kabuli: {
            inStock: 1,
            price: 16.80,
            sideDish: ['salad', 'bread', 'fries']
        },
        bolani: {
            inStock: 4,
            price: 4.50,
            sideDish: ['salad', 'bread', 'fries']
        },
        bamya: {
            inStock: 0,
            price: 12.00,
            sideDish: ['rice', 'salad', 'bread', 'fries']
        },
        karahi: {
            inStock: 11,
            price: 15.50,
            sideDish: ['rice', 'salad', 'bread', 'fries']
        },
    }

    
}