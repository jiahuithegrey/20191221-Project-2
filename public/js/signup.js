$(document).ready(function() {
    const signUpForm = $("form.signup");
    const emailInput = $("input#email");
    const nameInput = $("input#username");
    const passwordInput = $("input#password");

    signUpForm.on("submit", function(event) {
        event.preventDefault();
        const userData = {
            userName: nameInput.val().trim(),
            emailAddress: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };
        if (!userData.userName || !userData.emailAddress || !userData.password) {
            return;
        }
        signUpUser(userData.name, userData.password);
        userNameInput.val("");
        emailAddress.val("");
        passwordInput.val("");
    });

    function signUpUser(email, password) {
        $.post("/api/createprofile", {
            userName: userName,
            emailAddress: emailAddress,
            password: password
        })
        .then(function(data) {
            window.location.replace("/");
        })
        .catch(handleSignInErr);
    }

    function handleSignInErr(err) {
        window.alert("Invalid input(s)")
    }
});