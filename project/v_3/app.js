$(document).ready(function() {
    const state = {
        menu: {},
        loginCred: {
            username: 'student',
            password: '5050'
        },
        order: {},
        tipOptions: [0, 0.05, 0.1, 0.15, 0.2, 0.25],
        selectedTip: 0
    }
    
    setStateData();
    createLoginModal()
    createOrderSummary();
    createMenu();
    createCheckoutModal()
    
    $('#restaurant').hide();

    function setStateData() {
        state.menu = getRestaurantData();
        state.order = createNewOrder();
    }

    function createNewOrder() {
        return Object.keys(state.menu).reduce((prev, curr) => {
            prev[curr] = 0;
            return prev;
        }, {});
    }

    function createCheckoutModal() {
        const checkoutModal = $('#checkout');
        const checkoutForm = createCheckoutForm();
        const nameLabel = $('<label></label>').text('Name');
        const nameInput = $('<input></input>').attr('id', 'name-input');
        const phoneLabel = $('<label></label>').text('Phone Number');
        const phoneInput = $('<input></input>').attr('id', 'phone-input').attr('placeholder', '(###) ###-####');;
        const tipLabel = $('<label></label>').attr('for', 'tips'). text('Add a tip');
        const tipDropdown = createTipDropdown();
        const payButton = $('<button></button>').text('Pay Now');
        const backButton = $('<button></button>').text('Back To Order').on('click', () => {
            checkoutModal.hide();
            $('#price-display').text(`Total price: ${getTotalPrice(state.order, state.menu)}`);
            $('#menu').show();
        });
        
        checkoutModal.append('<br>');
        checkoutForm.append(nameLabel);
        checkoutForm.append(nameInput);
        checkoutForm.append('<br>');
        checkoutForm.append(phoneLabel);
        checkoutForm.append(phoneInput);
        checkoutForm.append('<br>');
        checkoutForm.append(tipLabel);
        checkoutForm.append(tipDropdown);
        checkoutForm.append('<br>');
        checkoutForm.append(payButton);
        
        checkoutModal.append(checkoutForm);
        checkoutModal.append(backButton);
        checkoutModal.hide();

        $('#checkout-button').on('click', () => {
            $('#price-display').text(`Total price: ${getTotalPrice(state.order, state.menu) * (1 + state.selectedTip)}`);
            checkoutModal.show()
            $('#menu').hide();
        });
    }

    function createTipDropdown() {
        const tipSelector = $('<select></select>').attr('name', 'tips').attr('id', 'tips');
        state.tipOptions.forEach(tip => {
            let tipOption = $("<option></option>")
            .attr('value', tip)
            .text(`${tip*100}%`)

            if (tip == 0) {
                tipOption.attr('selected', 'selected');
                state.selectedTip = tip;
            }
            
            tipSelector.append(tipOption);
        });
        
        tipSelector.on('change', () => {
            state.selectedTip = +$('#tips option:selected')[0].value;
            $('#price-display').text(`Total price: ${getTotalPrice(state.order, state.menu) * (1 + state.selectedTip)}`);
        });

        return tipSelector;
    };

    function createLoginModal() {
        const loginModal = $('<div></div>').attr('id', 'login');
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
            .on('submit', e => handleLogin(e));
    }

    function handleLogin(e) {
        e.preventDefault();  
        const loginObj = validateLogin()

        let tryAgain = $('<p></p>')
            .text(loginObj.errorMsg.reduce((p, c) => p += c, ''))
            .attr('id', 'try-again');
        
        // remove #try-again from prior attempt
        $('#try-again').remove();

        if (loginObj.hasError) {
            $('#login').append(tryAgain);
        } else {
            $('#restaurant').show();
            $('#login').hide();
        }
    }

    function validateLogin() {
        let hasError = false;
        let errorMsg = ['Sorry!'];

        const username = $('#username-input')[0].value;
        const password = $('#password-input')[0].value;
        const validUsername = username == state.loginCred.username;
        const validPassword = password == state.loginCred.password;
        
        if (!validUsername) {
            hasError = true;
            errorMsg.push(` Username "${username}" cannot be found.`)
        }

        if (!validPassword) {
            hasError = true;
            errorMsg.push(` Password "${password}" is invalid.`)
        }

        return {hasError, errorMsg };
    }

    function createCheckoutForm() {
        return $('<form></form>')
            .attr('id', 'login-form')
            .on('submit', e => handleCheckout(e));
    }

    function handleCheckout(e) {
        e.preventDefault();  
        const name = $('#name-input')[0].value;
        const phone = $('#phone-input')[0].value;
        const validName = name != '';
        const validPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
        
        if (validName && validPhone) {
            alert(`Thank you for your order ${name}!`);
            state.order = createNewOrder();
            resetOrderDisplay();
            $('#price-display').text(`Total price: 0`);
        } else {
            let alertText = 'Oops!';
            if (!validName) {
                alertText += ' Name cannot be blank.'
            }

            if (!validPhone) {
                alertText += ' Phone number must be in valid format.'
            }

            alert(alertText)
        }
    }

    function resetOrderDisplay() {
        Object.keys(state.order).forEach(item => {
            $(`#order-item-${item}`).text(`${item}: 0`);
        });
    }
    
    function createOrderSummary() {
        const $orderBox = $("<div></div>");
        const $mainText = $("<div></div>").text('Order Summary');
        $orderBox.append($mainText)
        Object.keys(state.order).forEach(item => {
            const orderItem =  $("<div></div>")   
            .text(`${item}: ${state.order[item]}`)
            .attr('id', `order-item-${item}`);
            
            $orderBox.append(orderItem);
        });
        
        let totalPrice = getTotalPrice(state.order, state.menu);
        const priceDisplay = $("<div></div>")
            .attr('id', 'price-display')
            .text(`Total price: ${totalPrice}`);
        
        $('#order').append($orderBox);
        $('#order').append(priceDisplay);
        $('#order').append($('<br>'));
    }
    
    function createMenu() {
        Object.keys(state.menu).forEach(item => {
            const menuItem = state.menu[item];
    
            let $itemBox = $("<div></div>")
                .css("border-style", "solid");
            let $foodName = $("<div></div>")
                .text(item);
            let $price = $("<div></div>")
                .text(`Price ${menuItem.price}`);

            let $addButton = $("<button></button>")
                .text('Add')
                .on('click', () => {
                    if (state.order[item] < menuItem.inStock) {
                        state.order[item] += 1;
                        $(`#order-item-${item}`).text(`${item}: ${state.order[item]}`);
                        $('#price-display').text(`Total price: ${getTotalPrice(state.order, state.menu)}`);
                    } else {
                        alert(`Sorry! We're all sold out of ${item}`)
                    }
                });
            
            let $removeButton = $("<button></button>")
                .text('Remove')
                .on('click', () => {
                    if (state.order[item] > 0) {
                        state.order[item] -= 1;
                        $(`#order-item-${item}`).text(`${item}: ${state.order[item]}`);
                        $('#price-display').text(`Total price: ${getTotalPrice(state.order, state.menu)}`);
                    } else {
                        alert(`You have no ${item} in your cart!`)
                    }
                });
            
            $itemBox.append($foodName);
            $itemBox.append($price);
            $itemBox.append($addButton);
            $itemBox.append($removeButton);
            $('#menu').append($('<br>'));
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

function getAddRemoveBtn(isAdd, item, menuItem) {
    let btnText = isAdd ? 'Add' : 'Remove';
    let addLogic = state.order[item] < menuItem.inStock;
    let removeLogic = state.order[item] > 0;
    let activeLogic = isAdd ? addLogic : removeLogic;
    let $btn = $("<button></button>")
            .text(btnText)
            .on('click', () => {
                if (activeLogic) {

                    if (isAdd) {
                        state.order[item] += 1;
                    } else {
                        state.order[item] -= 1;
                    }

                    $(`#order-item-${item}`).text(`${item}: ${state.order[item]}`);
                    $('#price-display').text(`Total price: ${getTotalPrice(state.order, state.menu)}`);
                } else {
                    alert(`Sorry! We're all sold out of ${item}`)
                }
            });
    
    return $btn;
}




const loginState = {
    username: 'sol',
    password: 'bestteachereverrrrrrrrrr'
}

let usernameInput = '';
let passwordInput = '';
if (loginIsValid(usernameInput, passwordInput)) {
    
}

function loginIsValid(u, p) {
    let usernameIsvalid = loginState.username === u;
    let passwordIsvalid = loginState.password === p;
    return usernameIsvalid && passwordIsvalid;
}