# Noroff Auction House Website

## Overview

**Work in progress: Estimated Completion Date:** February 5, 2025

A front-end project for an **auction website**, built with **HTML, Tailwind CSS, and JavaScript**, integrating with a provided backend API for **user authentication, auction listings, and bidding**.

## Features

- Browse and search auctions
- User authentication (login & registration)
- Create and manage auction listings
- Real-time bidding

## Tech Stack

- **HTML**
- **Tailwind CSS** @3.4.17
- **JavaScript**
- **Node.js & npm** (for development tools)
- **Vite** (for environment variables)
- **Husky & ESLint** (code quality and Git hooks)

## Setup

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/auction-website.git
```

```sh
cd auction-website
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up API Key

This project requires an API key to interact with the backend. You need to create a .env file in the root of the project and add your API key.

1. Create a new file named .env in the project root.
2. Add the following line inside it:

```makefile
VITE_API_KEY=your_api_key_here
```

3. Save the file
   Note: Never commit your .env file to Git. It is already included in .gitignore.

### 4. Start Development Server (Vite + Tailwind)

```sh
npm run start
```

This will:

- **Start Tailwind CSS in watch mode.**
- **Start Vite for local development.**
- **Your project will be accessible at: http://localhost:5173**

## Author

**Daniel Dyrnes**

<!-- # Noroff Auction House Website

## Overview

**Work in progress: Estimated Completion Date:** February 5, 2025

A front-end project for an **auction website**, built with **HTML, Tailwind CSS, and JavaScript**, integrating with a provided backend API for **user authentication, auction listings, and bidding**.

## Features

- Browse and search auctions
- User authentication (login & registration)
- Create and manage auction listings
- Real-time bidding

## Tech Stack

- **HTML**
- **Tailwind** CSS@3.4.17
- **JavaScript**
- **Node.js & npm** (for development tools)
- **Husky & ESLint** (code quality and Git hooks)

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/auction-website.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start Tailwind CSS:
   ```sh
   npm start
   ```
   This will watch for file changes and automatically rebuild Tailwind when you save a file

## Author

**Daniel Dyrnes** -->
