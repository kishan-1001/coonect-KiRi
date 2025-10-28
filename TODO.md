# Forgot Password Feature Implementation

## Backend Tasks
- [x] Install nodemailer dependency in server
- [x] Create server/.env file with Gmail SMTP credentials
- [x] Create server/src/services/emailService.js for sending OTP emails
- [x] Update server/src/models/User.js to include otp and otpExpires fields
- [x] Add forgotPassword function to server/src/controllers/authController.js
- [x] Add resetPassword function to server/src/controllers/authController.js
- [x] Add /forgot-password and /reset-password routes to server/src/routes/authRoutes.js

## Frontend Tasks
- [x] Create client/src/pages/ForgotPassword.jsx for email input form
- [x] Create client/src/pages/ResetPassword.jsx for OTP and new password input
- [x] Update client/src/pages/Login.jsx to add "Forgot Password?" link
- [x] Update client/src/router/index.jsx to include new routes
- [x] Update client/src/api/auth.js to add API functions for forgot password and reset password

## Testing and Validation
- [ ] Test forgot password flow end-to-end
- [ ] Verify OTP expiration (10 minutes)
- [ ] Ensure security best practices are followed
