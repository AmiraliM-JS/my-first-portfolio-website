// Save user data to user_data.json
async function saveUserData(userData) {
    try {
        const response = await fetch('/user_data.json');
        const data = await response.json();
        
        // Check if user already exists
        const userExists = data.users.some(user => user.email === userData.email);
        if (userExists) {
            throw new Error('User with this email already exists');
        }

        // Add new user
        data.users.push(userData);
        
        // Save updated data
        await fetch('/user_data.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return true;
    } catch (error) {
        console.error('Error saving user data:', error);
        throw error;
    }
}

// Clear form fields
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
}

// Initialize form
document.addEventListener('DOMContentLoaded', clearForm);

document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showError('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        showError('Passwords do not match.');
        return;
    }

    // Prepare user data
    const userData = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password, // Note: In production, password should be hashed
        createdAt: new Date().toISOString()
    };

    try {
        await saveUserData(userData);
        // Redirect to home page after successful signup
        window.location.href = 'index.html';

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
