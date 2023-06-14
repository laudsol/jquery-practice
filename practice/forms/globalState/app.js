$(document).ready(() => {
    const state = {
        username: '',
        password: '',
        loginInfo: getLoginInfo,
        topicsArr: ['HTML', 'CSS', 'javascript', 'jQuery', 'APIs', 'Video Games'],
        activeTopic: '',
        topicText: getTopicText
    };

    hideInitialElements();
    displayTopic();
    handleLoginSubmit();
    handleClearLogin();
    createTopicsDropwdown();
    handleTopicChange();
    
    function hideInitialElements() {
        $('#login-display-info').hide();
        $('#clear-login-display').hide();
        $('#video-games-comment').hide();
    }

    function getLoginInfo() {
        return `Your username is ${this.username} and your password is ${this.password}`;
    }

    function getTopicText() {
            return `We are currently learning ${this.activeTopic}`;
    }

    function displayTopic() {
        $('#current-topic').text(state.topicText())
    }

    function createTopicsDropwdown() {
        state.topicsArr.forEach(topic => {
            let topicOption = $("<option></option>")
                .text(topic);

            $('#topics').append(topicOption);
        });
    }

    function handleTopicChange() {
        $('#topics').on('change', () => {
            let selectedTopic = $('#topics option:selected').text();
            updateState('activeTopic', selectedTopic);

            displayTopic();

            if (state.activeTopic === 'Video Games') {
                $('#video-games-comment').show();
            } else {
                $('#video-games-comment').hide();
            }
        });
    };

    function handleClearLogin() {
        $('#clear-login-display').on('click', () => {
            updateState('username', '');
            updateState('password', '');

            $('#login-display-info').hide();
            $('#clear-login-display').hide();
        });
    };
    
    function handleLoginSubmit() {
        $('#loginForm').on("submit", (e) => {
            e.preventDefault();

            let username = $("#username")[0].value;
            let password = $("#password")[0].value;
            let validatedInputs = validateLoginInputs(username, password);

            if (validatedInputs.hasError) {
                let loginErrorMsgs = $('<div></div>')
                    .attr('id', 'login-error-msgs');
                validatedInputs.errorMessages.forEach(msg => {
                    loginErrorMsgs.append('<p></p>').text(msg);
                });
                $('#login-error-msg-box').append(loginErrorMsgs);
                //???????
            } else {
                updateState('username', username);
                updateState('password', password);
                
                $('#login-display-info')
                    .text(state.loginInfo())
                    .show();
                
                $('#clear-login-display').show();
            }
        });
    }
    
    function validateLoginInputs(username, password) {
        let isUsernameValid = username.length >= 4;
        let isPasswordValid = password.length >= 6;
        let validationObject = {
            hasError: false,
            errorMessages: []
        }

        if (!isUsernameValid) {
            validationObject.hasError = true;
            validationObject.errorMessages.push(getLoginErrorMsg('username', 4));
        }
        
        if (!isPasswordValid) {
            validationObject.hasError = true;
            validationObject.errorMessages.push(getLoginErrorMsg('password', 6));
        }

        return validationObject;
    }

    function getLoginErrorMsg(type, limit) {
        return `Invalid ${type}, must be at least ${limit} characters`;
    }

    function updateState(key, value) {
        state[key] = value;
    }
});