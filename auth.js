// Authentication functions
function registerUser(email, password, name) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Update user profile with name
            return userCredential.user.updateProfile({
                displayName: name
            });
        })
        .then(() => {
            // Store additional user data in database
            return database.ref('users/' + auth.currentUser.uid).set({
                name: name,
                email: email,
                role: 'student',
                createdAt: new Date().toISOString()
            });
        })
        .then(() => {
            window.location.href = 'home.html';
        })
        .catch((error) => {
            throw error;
        });
}

function loginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Get user data from database
            return database.ref('users/' + userCredential.user.uid).once('value')
                .then((snapshot) => {
                    const userData = snapshot.val();
                    if (userData) {
                        // Update user profile with data from database
                        return userCredential.user.updateProfile({
                            displayName: userData.name
                        });
                    }
                });
        })
        .then(() => {
            window.location.href = 'home.html';
        })
        .catch((error) => {
            throw error;
        });
}

function logoutUser() {
    return auth.signOut()
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Logout error:', error);
            alert('Error logging out. Please try again.');
        });
}

// Check authentication state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        const userProfiles = document.querySelectorAll('.profile');
        userProfiles.forEach(profile => {
            if (profile) {
                const nameElement = profile.querySelector('.name');
                const roleElement = profile.querySelector('.role');
                const btnElement = profile.querySelector('.btn');
                const flexBtnElement = profile.querySelector('.flex-btn');

                if (nameElement) nameElement.textContent = user.displayName || 'User';
                if (roleElement) roleElement.textContent = 'student';
                if (btnElement) btnElement.href = 'profile.html';
                if (flexBtnElement) {
                    flexBtnElement.innerHTML = `
                        <a href="#" class="option-btn" onclick="logoutUser()">logout</a>
                    `;
                }
            }
        });
    } else {
        // User is signed out
        const userProfiles = document.querySelectorAll('.profile');
        userProfiles.forEach(profile => {
            if (profile) {
                const nameElement = profile.querySelector('.name');
                const roleElement = profile.querySelector('.role');
                const btnElement = profile.querySelector('.btn');
                const flexBtnElement = profile.querySelector('.flex-btn');

                if (nameElement) nameElement.textContent = 'Guest';
                if (roleElement) roleElement.textContent = 'guest';
                if (btnElement) btnElement.href = 'login.html';
                if (flexBtnElement) {
                    flexBtnElement.innerHTML = `
                        <a href="login.html" class="option-btn">login</a>
                        <a href="register.html" class="option-btn">register</a>
                    `;
                }
            }
        });
    }
}); 