# TODO: Implement Login and Signup Pages with MongoDB

## Backend Setup
- [x] Create server/src/config/database.js for MongoDB connection
- [x] Implement server/src/models/User.js with email, password, etc.
- [x] Create server/src/controllers/authController.js for login/signup with JWT
- [x] Set up server/src/routes/authRoutes.js
- [x] Update server/src/app.js to include auth routes and middleware
- [x] Update server/src/server.js to connect to DB and start server
- [x] Add dependencies to server/package.json (mongoose, bcryptjs, jsonwebtoken, express, cors, dotenv)

## Frontend Setup
- [x] Build client/src/pages/Login.jsx with form
- [x] Build client/src/pages/Register.jsx with form
- [x] Create client/src/api/auth.js for API calls
- [x] Set up client/src/router/index.js for routing
- [x] Update client/src/App.jsx to use router
- [x] Add dependencies to client/package.json (react, react-dom, axios, react-router-dom)
- [x] Create vite.config.js and index.html

## Installation and Testing
- [x] Install server dependencies
- [x] Install client dependencies
- [ ] Test MongoDB connection
- [ ] Test API endpoints (login/signup)
- [ ] Test frontend forms and routing
