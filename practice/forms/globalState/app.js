$(document).ready(() => {
    $('#loginForm').on("submit", (e) => {
        e.preventDefault();
      
        let username = $("#username")[0].value;
        let password = $("#password")[0].value;
        console.log(username, password);
    });
});