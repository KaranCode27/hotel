# LuxeStays - Online Hotel Booking Platform

A comprehensive, full-stack MERN (MongoDB, Express, React, Node.js) application for booking luxury hotels, managing rooms, and exploring transportation options. It features robust user authentication, Stripe payments, and distinct dashboards for both standard users and administrators.

## Features

* **User Authentication:** Secure JWT-based login, registration, and password reset functionalities.
* **Hotel & Room Search:** Filter, search, and view detailed information regarding hotels and rooms.
* **Payment Integration:** Secure checkout and payment processing via Stripe.
* **User Dashboard:** Users can manage profiles, view booking history, and maintain a wishlist.
* **Admin Dashboard:** Comprehensive administration portal to manage hotels, rooms, bookings, users, and transport options.
* **Transport Module:** Integrated transport search and booking.
* **Responsive Design:** A beautiful UI built with TailwindCSS and Framer Motion animated details.

## Tech Stack

* **Frontend:** React, Redux Toolkit, React Router, TailwindCSS, Framer Motion
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JSON Web Tokens (JWT), bcryptjs
* **Payments:** Stripe API
* **Other Tools:** Cloudinary (for image uploads), Nodemailer (for emails)

## Installation & Setup

1. **Download the project:**
   Extract the project files and navigate to the project directory in your terminal.

2. **Backend Setup:**
   * Install dependencies: `npm install`
   * Create a `.env` file based on `.env.example`: `cp .env.example .env`
   * Update the variables in `.env` with your actual MongoDB URI, Stripe keys, etc.
   * *Optional:* Seed the database with sample data: `npm run data:import`
   * Start the backend server: `npm run dev` (Runs on http://localhost:5000)

3. **Frontend Setup:**
   * Navigate to the frontend directory: `cd HotelBookingWebsite`
   * Install frontend dependencies: `npm install`
   * Start the Vite development server: `npm run dev` (Runs on http://localhost:5173)

## Database Seeding

To quickly populate the database with dummy hotels, rooms, and an admin user, ensure your MongoDB server is running and your `MONGO_URI` is correctly set, then run:

```bash
npm run data:import
```

To destroy all data in your database, run:

```bash
npm run data:destroy
```

> **Demo Admin Credentials:**
> **Email:** admin@luxestays.com | **Password:** password123

## License

This project is licensed under the ISC License.
