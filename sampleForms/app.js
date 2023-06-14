$(document).ready(() => {
    $('#loginForm').on("submit", (event) => {
        event.preventDefault();

        const username = $("#username")[0].value;
        const password = $("#password")[0].value;
        
        const $loginInfoDisplay = $('#loginInfoDisplay');
        const $usernameDisplay = $("<div></div>").text(username);
        const $passwordDisplay = $("<div></div>").text(password);

        $loginInfoDisplay.append($usernameDisplay);
        $loginInfoDisplay.append($passwordDisplay);
    });
});