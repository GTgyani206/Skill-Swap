# Skill Swap - Odoo Hackathon 2025

A full-stack web application that enables users to list skills they want to share and find skills they want to learn, facilitating a community-based barter system for knowledge and services.

### Team
* **Gyanendra Thakur** (Solo Participant)

---
## Features

* **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
* **Profile Management:** Users can add skills they offer and skills they want to learn to their public profiles.
* **User Dashboard:** A central dashboard to browse all public user profiles and see their skills at a glance.
* **Skill Matching:** Easily view what skills users have and what they need.
* **Swap Request System:** Logged-in users can initiate a skill swap request with any other user.

---
## Tech Stack

* **Frontend:** React, Ant Design (antd), Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JWT, bcryptjs

---
## Local Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/GTgyani206/Skill-Swap.git](https://github.com/GTgyani206/Skill-Swap.git)
    cd Skill-Swap
    ```

2.  **Setup Backend:**
    ```bash
    cd server
    npm install
    ```
    * Create a `.env` file in the `server` directory with the following variables:
        ```
        MONGO_URI=<Your_MongoDB_Connection_String>
        JWT_SECRET=<Your_JWT_Secret>
        PORT=5000
        ```
    * Start the backend server:
        ```bash
        npm run dev
        ```

3.  **Setup Frontend:**
    ```bash
    cd client
    npm install
    ```
    * Start the frontend development server:
        ```bash
        npm start
        ```
