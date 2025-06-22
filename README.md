# ✨ ResumeGenius - Professional Resume Builder

Create and download beautiful, ATS-friendly resumes in minutes. ResumeGenius is a web application designed to be fast, intuitive, and completely free.

---

### 🚀 **Live Demos**

*   **Landing Page:** [**https://arifmohammad30.github.io/RESUME-BUILDER/**](https://arifmohammad30.github.io/RESUME-BUILDER/)
*   **Builder Application:** [**https://resumegenious.netlify.app/**](https://resumegenious.netlify.app/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Deployment Architecture](#-deployment-architecture)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [License](#-license)

## 📖 Overview

ResumeGenius is a web application designed to simplify the resume creation process. It consists of two main components:

1.  **A Static Landing Page:** A visually appealing, fast-loading page built to showcase the features of the resume builder.
2.  **A Dynamic Builder Application:** A feature-rich Single-Page Application (SPA) where users can input their personal and professional details, select from a variety of templates, and instantly generate a PDF resume.

The project is architected to be decoupled, allowing the marketing site and the application to be developed and deployed independently.

## 🌟 Key Features

*   **Intuitive Multi-Step Form:** Guides the user through sections for personal info, experience, education, skills, and projects.
*   **Multiple Professional Templates:** Choose from a selection of ATS-friendly resume templates.
*   **Live Preview:** See your resume update in real-time as you type.
*   **Instant PDF Downloads:** Generate and download a high-quality PDF of your resume.
*   **Auto-Save Functionality:** Your progress is automatically saved to your browser's `localStorage`, so you can pick up where you left off.
*   **Fully Responsive:** Works seamlessly on both desktop and mobile devices.
*   **No Sign-Up Required:** Completely free to use with no registration needed.

## 🛠️ Tech Stack

The project utilizes a modern and robust stack for a high-quality user experience:

| Category          | Technology                                                                                                                                                                                                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core**          | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) |
| **Styling**       | ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)                                                                                                                                                                             |
| **UI Components** | **Shadcn/ui**, **Lucide React** (Icons)                                                                                                                                                                                                                                                                 |
| **Forms**         | ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white) **Zod** (Validation)                                                                                                                                            |
| **PDF Generation**| **Puppeteer**, **@react-pdf/renderer**                                                                                                                                                                                                                                                                  |
| **Deployment**    | ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![GitHub Pages](https://img.shields.io/badge/github%20pages-%23121013.svg?style=for-the-badge&logo=github&logoColor=white)                                                               |

## 🏗️ Project Structure

The project uses a monorepo-style structure within a single repository, keeping the landing page and the builder app codebases separate but co-located.

```
ResumeGenius/
├── client/                 # Source code for the Builder Application (SPA)
│   ├── src/
│   └── ...
├── landing-page/           # Self-contained project for the Landing Page
│   ├── src/
│   ├── package.json        # Dependencies for landing page
│   └── vite.config.ts      # Vite config for landing page
├── dist/                   # Build output for the Builder Application
├── netlify.toml            # Deployment configuration for Netlify
└── package.json            # Root dependencies for the Builder Application
```

## ☁️ Deployment Architecture

The two applications are deployed independently to leverage the strengths of different hosting platforms.

*   **Landing Page (Static Site)**
    *   **Platform:** **GitHub Pages**
    *   **Workflow:** The `gh-pages` package is used to build the static files and push them to the `gh-pages` branch, which is then served by GitHub.
*   **Builder Application (SPA)**
    *   **Platform:** **Netlify**
    *   **Workflow:** Connected to the `main` branch of the GitHub repository. Pushing a commit automatically triggers a build on Netlify. It installs dependencies from the root `package.json`, runs the build command, and deploys the output from the `dist/` directory.

The two are connected via hard-coded links and a Netlify environment variable (`VITE_LANDING_URL`) for the "Home" button in the builder.

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/arifmohammad30/RESUME-BUILDER.git
cd RESUME-BUILDER
```

### 2. Run the Builder Application

The builder app runs from the root of the project.

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### 3. Run the Landing Page

The landing page is a separate project in its own directory.

```bash
# Navigate to the landing-page directory
cd landing-page

# Install dependencies for the landing page
npm install

# Run the development server for the landing page
npm run dev
```

The landing page will be available at `http://localhost:3000`.

## 📜 Available Scripts

### Root (Builder App)

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run type-check`: Runs the TypeScript compiler to check for errors.

### Landing Page

*   `npm run dev`: Starts the landing page development server.
*   `npm run build`: Builds the landing page for production.
*   `npm run deploy`: Deploys the landing page to GitHub Pages.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

