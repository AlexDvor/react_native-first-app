# Pet Adoption App

Mobile pet adoption marketplace enabling users to list animals, browse nearby pets, favorite listings, and chat with owners instantly.

![Expo](https://img.shields.io/badge/Expo-48-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.71-61DAFB?style=for-the-badge&logo=react&logoColor=111111)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-9.21-FFCA28?style=for-the-badge&logo=firebase&logoColor=111111)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.9-764ABC?style=for-the-badge&logo=redux&logoColor=white)

## 📚 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [What Has Been Done](#-what-has-been-done)
- [Future Improvements](#-future-improvements)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Goals](#-project-goals)
- [Deployment](#-deployment)

## 🛠 Tech Stack

**Core**

- **React Native 0.71** — cross-platform mobile UI development
- **Expo 48** — managed development workflow and native device APIs
- **React 18** — component-based UI development
- **TypeScript** — static typing and safer application architecture

**Navigation & State**

- **React Navigation** — bottom tab navigation and nested stack navigation
- **Redux Toolkit** — authentication/session state management
- **React Redux** — binding Redux state to React components
- **AsyncStorage** — local persistence support

**Backend & Cloud Services**

- **Firebase Authentication** — email/password registration and login
- **Cloud Firestore** — users, animals, chats, messages, favorites, and notifications
- **Firebase Storage** — uploaded animal photos and user avatars

**Device & UX Libraries**

- **Expo Image Picker** — selecting images from the device gallery
- **Expo Image Manipulator** — image compression before upload
- **Expo Location** — foreground location permissions and coordinates
- **React Native Gifted Chat** — real-time chat interface
- **React Native SVG** and **react-native-svg-transformer** — SVG support
- **React Native Modal** — reusable modal dialogs
- **Date-fns** — date and time formatting
- **React Content Loader** — skeleton loading states

**Tooling**

- **Prettier** with sorted imports
- **Babel module resolver** with `~` import alias
- **Metro config** for SVG transformation and CJS support
- **react-native-dotenv** for environment variables
- **Git** for version control

## 🚀 Features

- User registration, login, authentication state handling, and sign out
- Browse pet listings by category: **All**, **Dogs**, and **Cats**
- Paginated animal gallery with reusable gallery cards
- Detailed animal profile screen with photos, pet metadata, owner information, and adoption status
- Add pet listings with breed, age, gender, weight, vaccine status, description, and multiple images
- Image compression and upload flow using Firebase Storage
- Favorites system for saving and removing animals from a personal list
- “My Animals” gallery for pets published by the current user
- Real-time chat between adopters and owners with GiftedChat
- Adoption request, confirmation, rejection, and notification workflows
- Profile screen with avatar update, user information, location status, and quick actions
- Foreground geolocation permissions and coordinate-based location data
- Skeleton loaders, spinners, reusable buttons, modals, sliders, and form components

## ✅ What Has Been Done

- Created an Expo React Native application with TypeScript and a modular folder structure
- Configured Firebase Auth, Firestore, and Firebase Storage through environment variables
- Added authentication screens and Redux Toolkit state management for user sessions
- Built bottom tab navigation with nested stack navigators for Home, Chat, Favorites, and Profile flows
- Implemented animal listing browsing, filtering, pagination, profile viewing, and favorites
- Built a complete add-post flow with form validation, image selection, image compression, Storage upload, and Firestore document creation
- Added real-time chat functionality, chat lists, message saving, and message subscriptions
- Implemented user notifications for adoption requests and adoption status changes
- Added profile features including avatar upload, location update, user details, and “My Animals” access
- Created reusable UI components such as gallery cards, sliders, buttons, modals, skeletons, indicators, and form controls

## 🔧 Future Improvements

- Replace the default Expo app name, icon, splash screen, and branding assets with final production branding
- Finish the edit-profile flow, because the current `handleEditProfile` handler is still empty
- Add Firestore security rules, indexes, validation rules, and production-ready access control
- Normalize Firestore data models for notifications, favorites, chats, and user-owned animals to avoid large arrays inside user documents
- Improve error handling by replacing development `console.log` calls with user-friendly messages and centralized logging
- Reduce loose `any` types and strengthen TypeScript coverage for chat, slider, notification, and form-related components
- Add automated tests for services, hooks, validation logic, and critical user flows
- Add offline-friendly behavior, retry states, and better handling for poor network conditions
- Improve real-time unread message indicators and notification badges in the tab bar
- Add EAS Build configuration and production deployment documentation for Android and iOS

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd react_native-first-app-main
```

### 2. Install dependencies

The project contains a `yarn.lock` file, so Yarn is recommended.

```bash
yarn install
```

Or with npm:

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your Firebase configuration values:

```env
DB_API_KEY="your_firebase_api_key"
DB_PROJECT_ID="your_firebase_project_id"
DB_AUTH_DOMAIN="your_firebase_auth_domain"
DB_APP_ID="your_firebase_app_id"
DB_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
DB_STORAGE_BUCKET="your_firebase_storage_bucket"
DB_MEASUREMENT_ID="your_firebase_measurement_id"
```

### 4. Prepare Firebase

In your Firebase project, enable:

- Email/password authentication
- Cloud Firestore
- Firebase Storage

The application uses Firestore collections such as:

- `users`
- `animals`
- `chats`
- `messages`
- `favorites`
- `notifications`
- `ownAnimals`

## 🧪 Usage

Start the Expo development server:

```bash
yarn start
```

Run on Android:

```bash
yarn android
```

Run on iOS:

```bash
yarn ios
```

Run on web:

```bash
yarn web
```

After launching the app, you can:

1. Create a new account or log in.
2. Browse available cats and dogs.
3. Open animal profiles and save favorites.
4. Create your own pet adoption listing.
5. Upload animal images from the device gallery.
6. Chat with owners or adopters in real time.
7. Send or respond to adoption requests.
8. Update your avatar and location from the profile screen.

> No automated test script is currently configured in `package.json`. Testing is currently performed manually through the Expo development workflow.

## 🎯 Project Goals

- Master the Expo-managed React Native stack with TypeScript, import aliases, and consistent formatting.
- Build multi-level navigation using bottom tabs and nested stack navigators with typed route parameters.
- Practice a serverless backend using Firebase Auth, Firestore, Firebase Storage, and `.env` configuration.
- Design a service layer to isolate Firebase access and reduce business logic inside screens.
- Implement full media CRUD for pet listings, including image selection, compression, upload, and Firestore metadata.
- Build real-time chat using GiftedChat, Firestore message collections, and `onSnapshot` subscriptions.
- Use Redux Toolkit for authentication/session state with typed hooks and clean state access.
- Improve mobile UX with skeleton loaders, pull-to-refresh patterns, empty states, form validation, and friendly feedback.
- Integrate device capabilities through Expo permissions, geolocation, image picker, and image manipulation APIs.
- Prepare the project for future scaling with feature-based folders, reusable UI components, and consistent scripts.

## 🌐 Deployment

The repository does not currently include production deployment configuration such as `eas.json`, CI/CD pipelines, Docker files, or hosting configuration.

Recommended deployment path:

1. Configure production Firebase project settings.
2. Add Firestore security rules and Storage rules.
3. Create an Expo Application Services configuration:

```bash
npx eas-cli@latest init
```

4. Build Android and iOS apps:

```bash
eas build --platform android
```

```bash
eas build --platform ios
```

5. Optionally publish the web version through Expo Web, Vercel, or Netlify after validating React Native Web compatibility.
