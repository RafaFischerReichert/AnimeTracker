# Anime Tracker Web App

## Overview

Anime Tracker is a web application built with Angular and Ionic that allows users to manage and track their favorite anime series. Users can add, edit, and delete anime entries, including details such as title, year, genre, studio, episodes watched, total episodes, rating, and cover image. The app uses Firebase (Firestore and Storage) for data persistence and image uploads, providing a modern, responsive experience on both desktop and mobile devices.

## Features

- **Anime Management:** Create, list, update, and delete anime entries.
- **Anime Details:** View and edit detailed information for each anime.
- **Image Uploads:** Upload and display cover images for each anime entry.
- **Progress Tracking:** Track watched and total episodes, and rate each anime.
- **Modern UI:** Responsive design using Ionic components for a native-like experience.
- **Firebase Integration:** Uses Firestore for data storage and Firebase Storage for images.

## Tech Stack

- Angular 14
- Ionic Framework 6
- TypeScript
- Firebase (Firestore, Storage)
- SCSS

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm (v6+ recommended)
- Ionic CLI (install with `npm install -g @ionic/cli`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd AnimeTracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Edit `src/environments/environment.ts` and `src/environments/environment.prod.ts` with your Firebase project credentials. Example:
     ```ts
     export const environment = {
       production: false,
       firebaseConfig: {
         apiKey: "<your-api-key>",
         authDomain: "<your-auth-domain>",
         projectId: "<your-project-id>",
         storageBucket: "<your-storage-bucket>",
         messagingSenderId: "<your-messaging-sender-id>",
         appId: "<your-app-id>",
         measurementId: "<your-measurement-id>",
       },
     };
     ```

4. **Run the app in development:**
   ```bash
   ionic serve
   ```
   The app will be available at `http://localhost:8100`.

### Building for Production

```bash
ionic build --prod
```
The output will be in the `www/` directory.

## Main Pages & User Flows

- **Home:** Lists all anime entries with cover, title, progress, and rating. Allows navigation to details or to add a new entry.
- **Cadastrar (Add):** Form to add a new anime, including title, year, genre, origin, studio, episodes watched, total episodes, rating, and image upload.
- **Detalhar (Detail/Edit):** View and edit all details of an anime entry, including toggling edit mode and deleting the entry.

## Project Structure

- `src/app/pages/` – Main app pages (Home, Cadastrar, Detalhar)
- `src/app/services/` – Services for data handling and Firebase integration
- `src/app/models/` – TypeScript models (e.g., AnimeEntry)
- `src/assets/` – Static assets (icons, images)
- `src/environments/` – Environment configuration files

## Development Notes

- The app uses Firebase for data storage and image uploads. Make sure to set up your Firebase project and update the environment files.
- To add new pages or features, use the Ionic CLI (`ionic generate page <name>`).
- All anime data is stored in Firestore under the `entries` collection. Images are stored in Firebase Storage under the `images/` folder.

## License

ISC

## Author

RafaFischerReichert
