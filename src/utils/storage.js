// Sign up a new user and store their details in localStorage
export const signupUser = (username, details) => {
  // Store the details as a string (you can use JSON.stringify if details is an object)
  localStorage.setItem(username, JSON.stringify(details));
};

// Log in a user by storing their username in "currentUser" in localStorage
export const loginUser = (username) => {
  if (localStorage.getItem(username)) {
    localStorage.setItem("currentUser", username);
    return true;
  }
  return false;
};

// Log out the current user by removing "currentUser" from localStorage
export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};

// Get the current logged-in user from localStorage
export const getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};

// Get a user's details from localStorage based on their username
export const getUserData = (username) => {
  const userDetails = localStorage.getItem(username);
  return userDetails ? JSON.parse(userDetails) : null; // Parse the string back into an object
};

// Update a user's data in localStorage (replace existing data)
export const updateUserData = (username, details) => {
  localStorage.setItem(username, JSON.stringify(details)); // Convert details to JSON string
};

// Delete a user's data from localStorage (handle deletion properly)
export const deleteUserData = (username) => {
  localStorage.removeItem(username);
};
