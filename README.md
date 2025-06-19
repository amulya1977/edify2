# Edify 🎓

An e-learning platform providing free courses, scholarships, certifications, and mentorship.

### Active Link:
https://edify-frontend.web.app/


## 🚀 About Edify

Edify is a user-friendly e-learning platform that offers:
✅ Free Courses – Learn without any cost.
✅ Scholarships – Access financial aid to support education.
✅ Certificates – Earn a certificate after completing a course.
✅ Mentorship – Get guidance from experienced mentors.

## ✨ Features

📚 Wide range of courses across different domains.

🎓 Scholarship opportunities for deserving students.

📜 Verified certificates upon course completion.

👨‍🏫 One-on-one mentorship and career guidance.

📱 Responsive UI for a seamless learning experience.


## 🛠️ Tech Stack

Frontend: React.js, CSS, HTML  

Database: MongoDB
## 🔐 Authentication

Authentication is implemented using **JWT (JSON Web Tokens)** and secure password hashing with **bcryptjs**.

### 🔧 Tech Used

- **MongoDB** (via Mongoose) for storing user data.
- **bcryptjs** for password hashing.
- **jsonwebtoken** for secure token-based auth.
- **cookie-parser** to store and manage JWT in HTTP-only cookies.
- **dotenv** for environment configuration.

### 🔄 Authentication Flow

- **Register**: Users sign up with first name, last name, email, phone, and password.
  - Passwords are hashed before being stored.
- **Login**: Valid users receive a signed JWT stored in an HTTP-only cookie.
- **Protected Routes**: Certain routes like `/api/me`, `/api/enroll`, `/api/mark-completed` require a valid JWT to access.
- **Logout**: Clears the JWT cookie and logs the user out securely.

### 📄 Auth API Endpoints

| Method | Route                | Description                     | Access      |
|--------|----------------------|---------------------------------|-------------|
| POST   | `/api/auth/register` | Register a new user             | Public      |
| POST   | `/api/auth/login`    | Authenticate user & set token   | Public      |
| POST   | `/api/auth/logout`   | Clear token and logout          | Public      |
| GET    | `/api/me`            | Get current user profile        | Protected   |
| PUT    | `/api/me/update`     | Update user profile             | Protected   |
| PUT    | `/api/progress`      | Update course progress per day  | Protected   |

---


## 🔧 Installation & Setup

1. Clone the repository:

git clone https://github.com/amulya1977/edify2.git
cd edify2


2. Install dependencies:

### npm install


3. Run the development server:

### npm start


4. Open http://localhost:3000 in your browser.



