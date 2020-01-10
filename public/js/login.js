$(document).ready(function() {
    const loginForm = $("form.login");
    const emailInput = $("input#email");
    const nameInput = $("input#username");
    const passwordInput = $("input#password");

    loginForm.on("submit", function(event) {
        event.preventDefault();
        const userData = {
            userName: nameInput.val().trim(),
            emailAddress: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.userName || !userData.emailAddress || !userData.password) {
            return;
        };

        loginUser(userData.userName, userData.emailAddress, userData.password);
        nameInput.val("");
        emailAddress.val("");
        passwordInput.val("");
    });

    function loginUser(email, password) {
        $.post("/api/login", {
            userName: userName,
            emailAddress: emailAddress,
            password: password
        })
        .then(function() {
            window.location.replace("/index");
        })
        .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        window.alert("Invalid input(s)")
    }
});