# Technical Content Summarizer

<p align="center">
  <img src="https://img.shields.io/badge/React-Vite-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Frontend-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/API-AI%20Powered-purple?style=for-the-badge" />
</p>

<p align="center">
  An AI-powered web application that summarizes long technical articles, blogs, and content into short, readable summaries instantly.
</p>


#  Live Demo

<p align="center">
  <a href="https://technical-content-summarizer-j146.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live-Demo-6C63FF?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>


# About The Project

Technical Content Summarizer is an AI-based web application designed to help users quickly understand lengthy technical articles without reading the full content.

Users simply paste the URL of an article, and the application generates a concise AI summary using modern NLP-based summarization APIs.

This project was built to improve productivity for students, developers, and researchers who regularly consume technical content but want faster understanding and better time management.

---

# Features

* Summarize articles using URL input
* AI-generated concise summaries
* Summary history saving using Local Storage
* Copy-to-clipboard functionality
* Fast and responsive UI
* Modern glassmorphism-inspired interface
* Fully responsive design
* Clean developer-friendly layout


## Project Architecture

## Frontend

The frontend of the application was built using:

* React.js
* Vite
* Tailwind CSS
* Redux Toolkit
* RTK Query

The frontend handles the user interface, URL input, displaying summaries, loading states, and responsive design.

---

## Backend

The backend is responsible for handling API requests and connecting the frontend with the AI summarization service.

Technologies used:

* Node.js
* Express.js

The backend processes incoming article URLs, communicates securely with the summarization API, and returns generated summaries to the frontend.

---

## AI API Integration

The application uses an AI-powered summarization API to generate concise summaries from long technical articles.

Features handled by the API:

* Article extraction
* Natural language summarization
* Fast response generation
* Content processing

---

# Deployment

## Frontend Deployment

The frontend was deployed using:

* Vercel

Benefits:

* Fast global CDN
* Automatic deployments from GitHub
* Easy custom domain support

---

## Backend Deployment

The backend server was deployed using:

* Render

Benefits:

* Easy Node.js deployment
* Environment variable support
* Continuous deployment integration

---

# Environment Variables

To run this project locally, create a `.env` file and add the following:

```env
VITE_API_URL=your_backend_url
API_KEY=your_api_key
```

# Full Workflow

1. User enters article URL in frontend.
2. Frontend sends request to backend API.
3. Backend validates the request.
4. Backend communicates with AI summarization API.
5. AI generates summary.
6. Backend returns processed summary.
7. Frontend displays the final summarized content.


# How It Works

1. User enters the URL of a technical article.
2. The application sends the URL to the AI summarization API.
3. The API processes the article content.
4. AI generates a short meaningful summary.
5. The summarized content is displayed instantly on the screen.
6. Previous summaries are saved locally for future access.

---

# ⚙️ Installation & Setup

## Clone the Repository

```bash
git clone https://github.com/mishita27twr/Technical-Content-summarizer.git
```

## Navigate into the Project

```bash
cd Technical-Content-summarizer
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

# Challenges Faced During Development

Building this project was a great learning experience and involved solving several real-world frontend development challenges.

## 🔹 API Integration Issues

Connecting the summarization API and handling asynchronous requests properly required careful state management.

## 🔹 CORS Errors

During development, API requests sometimes failed because of CORS policy restrictions, which required debugging and configuration fixes.

## 🔹 State Management Complexity

Managing loading states, error states, and API responses efficiently became easier after implementing Redux Toolkit and RTK Query.

## 🔹 Responsive Design

Making the UI responsive across mobile, tablet, and desktop devices required multiple layout adjustments and testing.

## 🔹 Handling Invalid URLs

Special validation logic had to be implemented to prevent invalid or broken article links from crashing the application.


# What I Learned

Through this project, I improved my understanding of:

* API integration in React
* Redux Toolkit & RTK Query
* Tailwind CSS styling
* React component architecture
* Error handling
* State management
* Building responsive UIs
* Deploying frontend applications


# Future Improvements

* PDF summarization support
* Upload document feature
* Multi-language summaries
* Text-to-speech summaries
* Download summary as PDF
* Keyword extraction feature


# Author

Made with by Mishita Tiwari

* GitHub: https://github.com/mishita27twr


# Support

If you liked this project:

* Give it a ⭐ on GitHub
* Fork the repository
* Share it with others
