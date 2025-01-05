// JavaScript functionality for the registration form

// Registration function
function register(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form input values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validate inputs
    if (!username || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate password length
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Validate password match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Mock registration success
    alert("Registration successful! You can now log in.");

    // Redirect to login page
    window.location.href = "login.html";
}

// Attach event listener to the registration form
const registrationForm = document.querySelector(".registration-form");
registrationForm.addEventListener("submit", register);
