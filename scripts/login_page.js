// Verify user credentials
async function verifyCredentials(email, password) {
    try {
        const response = await fetch('/user_data.json');
        const data = await response.json();
        
        // Find user by email
        const user = data.users.find(user => user.email === email);
        
        if (!user) {
            throw new Error('User not found');
        }

        // Verify password (Note: In production, use proper password hashing)
        if (user.password !== password) {
            throw new Error('Incorrect password');
        }

        return true;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic validation
    const errorMessage = document.getElementById('error-message');
    if (!email || !password) {
        showError('Please fill in all fields.');
        return;
    }

    try {
        const isValid = await verifyCredentials(email, password);
        if (isValid) {
            // Save user data to localStorage
            const user = {
                email: email,
                username: email.split('@')[0], // Use email prefix as username
                loggedIn: true
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirect to home page after successful login
            window.location.href = 'index.html';
        }
    } catch (error) {
        showError(error.message);
    }
});

function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 2000);
}
