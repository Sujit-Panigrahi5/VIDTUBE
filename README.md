# VIDTUBE

## 📌 Overview
VIDTUBE is a modern video streaming web application that allows users to browse, search, and watch videos seamlessly. Currently, the backend is under development, 
focusing on API functionality and database management.

## Features (Backend)
-  Video Streaming API: Endpoints for managing video data.
-  Search API: Search videos using keywords.
-  User Authentication: Secure sign-up and login system.
-  Upload Videos API: Users can upload and manage their own videos.
-  Like & Comment API: Engage with content through likes and comments.

##  Tech Stack (Backend)
- **Node.js & Express.js** – For handling server-side logic.
- **MongoDB** – For database management.
- **Mongoose** – For MongoDB object modeling.
- **JWT** – For user authentication.
- **Postman** – API testing.
- **Git & GitHub** – Version control and collaboration.
- **MongoDB Compass & Atlas** – Database visualization and management.

## 🔧 Installation & Setup
To get started with VIDTUBE backend, follow these steps:

### 1️⃣ Clone the Repository:
```sh
 git clone https://github.com/Sujit-Panigrahi5/VIDTUBE.git
 cd VIDTUBE
```

### 2️⃣ Install Dependencies:
```sh
npm install
```

### 3️⃣ Setup Environment Variables:
Create a `.env` file in the root directory and add the required environment variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Backend Server:
```sh
npm run server
```

##  Project Structure
```
VIDTUBE/
│-- backend/   # Node.js & Express backend
│-- models/    # MongoDB schemas
│-- routes/    # API routes
│-- controllers/  # Backend logic
│-- README.md  # Documentation
```

## 📌 API Endpoints
### 🔹 Authentication
- `POST /api/v1/users/register` – Register a new user
- `POST /api/v1/users/login` – Login user




## 📜 License
This project is licensed under the MIT License.

## 📧 Contact
For any queries, feel free to reach out:
- **GitHub**: [Sujit-Panigrahi5](https://github.com/Sujit-Panigrahi5)
- **Email**: sujitpanigrahi855@gmail.com 

