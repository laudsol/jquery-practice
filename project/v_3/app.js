$(document).ready(function() {
    const dataObj = getRestaurantData();
    const loginCred = {
        username: 'student',
        password: '5050'
    }
    const mainOrderObj = Object.keys(dataObj).reduce((prev, curr) => {
        prev[curr] = 0
        return prev;
    }, {});

    const tipOptions = [0.05, 0.1, 0.15, 0.2, 0.25];
    let selectedTip = 0;

    createOrderSummary();
    createMenu();
    createLoginModal()
    createCheckoutModal()

    function createCheckoutModal() {
        const checkoutButton = $('<button></button>')
            .text('Checkout')
            .on('click', () => {
                // checkoutModal.append('<p></p>').text(`Total ${getTotalPrice(mainOrderObj, dataObj) * (1 + selectedTip)}`);
            });
        const checkoutModal = $('#checkout');
        const checkoutForm = createCheckoutForm();
        const nameLabel = $('<label></label>').text('Name');
        const nameInput = $('<input></input>').attr('id', 'name-input');
        const phoneLabel = $('<label></label>').text('Phone Number');
        const phoneInput = $('<input></input>').attr('id', 'phone-input');
        const tipLabel = $('<label></label>').attr('for', 'tips'). text('Add a tip');
        const tipSelection = $('<select></select>').attr('name', 'tips').attr('id', 'tips');
        const payButton = $('<button></button>').text('Pay Now');
        const backButton = $('<button></button>').text('Back To Order');

        tipOptions.forEach(tip => {
            let tipOption = $("<option></option>")
                .attr('value', tip)
                .text(`${tip*100}%`);

            tipSelection.append(tipOption);
        });

        tipSelection.on('change', () => {
            selectedTip = $('#tips option:selected')[0].value;
        });

        checkoutModal.append(checkoutButton);
        checkoutModal.append('<br>');

        checkoutForm.append(nameLabel);
        checkoutForm.append(nameInput);
        checkoutForm.append(phoneLabel);
        checkoutForm.append(phoneInput);
        checkoutForm.append('<br>');
        checkoutForm.append(tipLabel);
        checkoutForm.append(tipSelection);
        checkoutForm.append('<br>');
        checkoutForm.append(payButton);

        checkoutModal.append(checkoutForm);
        checkoutModal.append(backButton);
    }

    function createLoginModal() {
        const loginModal = $('<div></div>')
            .attr('id', 'login');
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

    function createCheckoutForm() {
        return $('<form></form>')
            .attr('id', 'login-form')
            .on('submit', (e) => {
                e.preventDefault();  
                const name = $('#name-input')[0].value;
                const phone = $('#phone-input')[0].value;
                const validName = true;
                const validPhone = true;
                if (validName && validPhone) {
                    console.log('cool');
                } else {
                    console.log('not cool');
                }
            });
    }
    
    function createOrderSummary() {
        const $orderBox = $("<div></div>");
        const $mainText = $("<div></div>").text('Main dishes');
        $orderBox.append($mainText)

        Object.keys(dataObj).forEach(item => {
            const orderItem =  $("<div></div>")   
            .text(`${item}: ${mainOrderObj[item]}`)
            .attr('id', `order-item-${item}`);
            
            $orderBox.append(orderItem);
        });
        
        let totalPrice = getTotalPrice(mainOrderObj, dataObj);
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
            let $addButton = $("<button></button>")
                .text('Add')
                .on('click', () => {
                    if (mainOrderObj[item] < menuItem.inStock) {
                        mainOrderObj[item] += 1;
                        $(`#order-item-${item}`).text(`${item}: ${mainOrderObj[item]}`);
                        $('#price-display').text(`Total price: ${getTotalPrice(mainOrderObj, dataObj)}`);
                    } else {
                        alert(`Sorry! We're all sold out of ${item}`)
                    }
                });
            let $removeButton = $("<button></button>")
                .text('Remove')
                .on('click', () => {
                    if (mainOrderObj[item] > 0) {
                        mainOrderObj[item] -= 1;
                        $(`#order-item-${item}`).text(`${item}: ${mainOrderObj[item]}`);
                        $('#price-display').text(`Total price: ${getTotalPrice(mainOrderObj, dataObj)}`);
                    } else {
                        alert(`You have no ${item} in your cart!`)
                    }
                });
            
            $itemBox.append($foodName);
            $itemBox.append($price);
            $itemBox.append($addButton);
            $itemBox.append($removeButton);
            $('#menu').append($itemBox);
        });
    }

    function getTotalPrice(orders, menuObj) {
        return Object.keys(orders).reduce((prev, curr) => {
            const price = menuObj[curr].price;
            const quantity = orders[curr];
            prev += price * quantity;
            return prev;
        }, 0);
    }
});

const getRestaurantData = () => {
    return {
        kabob: {
            inStock: 6,
            price: 11.50
        },
        manto: {
            inStock: 3,
            price: 7.25
        },
        kabuli: {
            inStock: 1,
            price: 16.80
        },
        bolani: {
            inStock: 4,
            price: 4.50
        },
        bamya: {
            inStock: 0,
            price: 12.00
        },
        karahi: {
            inStock: 11,
            price: 15.50
        },
    }

    
}