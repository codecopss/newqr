# Emergency QR Code Generator Application

## Overview

The **Emergency QR Code Generator Application** is a React-based web application that enables users to generate QR codes containing their emergency contact details and medical information. The generated QR codes provide quick access to vital information, ensuring that essential data is accessible in emergency situations.

## Features

* **Signup and Login:** User authentication through username.
* **Data Management:** Users can store, view, and update their emergency contact details and medical history.
* **QR Code Generation:** Generates QR codes that link to a view page displaying user information.
* **Profile Edit:** Allows users to update their emergency details and regenerate QR codes.
* **Admin Panel:** Provides access to administrative features (if implemented).

## Directory Structure

```
/src
│── components
│   ├── Navbar.jsx
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Home.jsx
│   ├── EditProfile.jsx
│   ├── ViewDetails.jsx
│   └── AdminPanel.jsx
│── utils
│   └── storage.js
│── App.js
│── index.js
│── App.css
│── README.md
```

## Implementation Details

* **Local Storage:** The application uses the browser's `localStorage` to persist user data. Each user is stored using their username as the key, with the emergency details stored as a JSON string.
* **QR Code Library:** `qrcode.react` is utilized to generate QR codes dynamically based on the user data.
* **React Router:** The application implements routing to handle navigation across multiple components.
* **Conditional Rendering:** The Navbar is conditionally rendered based on the current route to maintain focus on the landing page during the initial view.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd emergency-qr-code-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

4. Open the application in a web browser:

   ```
   ```

[http://localhost:3000](http://localhost:3000)

```

## Usage

- **Landing Page:** Provides an introduction to the application with login and signup options.
- **Signup:** New users can register by entering a username. Duplicate usernames are not allowed.
- **Login:** Existing users can log in by entering their username.
- **Home:** Logged-in users can view, edit, and generate QR codes based on their emergency details.
- **Edit Profile:** Allows users to update their emergency contact and medical information.
- **QR Code Generation:** Generates a QR code that links to the user's information page.
- **View Details:** Displays user information based on the QR code.

## Dependencies
- React
- React Router
- qrcode.react

## Future Enhancements
- Implement admin functionalities.
- Add data encryption for sensitive information.
- Implement PDF download functionality for medical history.
- Enhance UI with additional styling and responsive design.

```
