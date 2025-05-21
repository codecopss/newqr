export const signupUser = (username, details) => {
  localStorage.setItem(username, JSON.stringify(details));
};

export const loginUser = (username) => {
  if (localStorage.getItem(username)) {
    localStorage.setItem("currentUser", username);
    return true;
  }
  return false;
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};

export const getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};

export const getUserData = (username) => {
  const userDetails = localStorage.getItem(username);
  return userDetails ? JSON.parse(userDetails) : null;
};

export const updateUserData = (username, details) => {
  localStorage.setItem(username, JSON.stringify(details));
};

export const deleteUserData = (username) => {
  localStorage.removeItem(username);
};
