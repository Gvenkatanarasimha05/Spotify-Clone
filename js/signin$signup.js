// Global array to store user credentials
const users = [
  { username: "venkat", password: "123" },
  { username: "narasimha@gmail.com", password: "123" },
];

// Registration function
function register(event) {
  event.preventDefault(); // Prevent default form submission

  // Get input values from the registration form
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
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

  // Add the new user to the `users` array
  users.push({ username: email, password: password });
  alert("Registration successful! You can now log in.");

  // Redirect to the login page
  window.location.href = "login.html";
}

// Login function
function login(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Get input values from the login form
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Validate inputs
  if (!username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Check credentials
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    alert("Login successful!");
    // Redirect to another page (e.g., dashboard)
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password.");
  }
}

// Attach event listeners to forms
const registrationForm = document.querySelector(".registration-form");
if (registrationForm) {
  registrationForm.addEventListener("submit", register);
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", login);
}
