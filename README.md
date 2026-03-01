# Noroff Auction House Website

A front-end auction platform built for Semester Project 2, where users can register, create listings, and place bids.

## Links

- Live Site: https://dd2-semester-project.netlify.app/
- GitHub Repo: https://github.com/ddyrnes/Semester-Project-2

## Project Description

This project is an auction website built with HTML, Tailwind CSS, and JavaScript.  
It integrates with the Noroff API for authentication, listings, and bidding functionality.

## Features

- Browse and search auction listings
- User registration and login
- Create and manage auction listings
- Place bids and track auction activity
- Responsive design for multiple screen sizes

## Tech Stack

- HTML
- Tailwind CSS
- JavaScript
- Vite
- ESLint
- Husky

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ddyrnes/Semester-Project-2.git
cd Semester-Project-2
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root:

```env
VITE_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run start
```

5. Open in browser:

```text
http://localhost:5173
```

## Available Scripts

- `npm run start` - Start local development
- `npm run build` - Build for production
- `npm run lint` - Run linter (if configured)

## Environment Variables

- `VITE_API_KEY` is required for authenticated requests.
- Never commit `.env` files to source control.

## Screenshots

![Auction House homepage](https://raw.githubusercontent.com/ddyrnes/portfolio/main/images/auctionhouse1.png)
![Auction House listings](https://raw.githubusercontent.com/ddyrnes/portfolio/main/images/auctionhouse2.png)

## Author

Daniel Dyrnes
