## LinkCraft

This repository is a small React + TypeScript app built with Vite. It uses Firebase for
authentication and Firestore for storing simple data like user profiles and diagrams.

Files I annotated and why (simple explanations):

- `src/components/ProtectedRoute.tsx` — protected routes: checks if the user is signed in and has the right role before showing a page. I added comments explaining the loading, auth and role checks.
- `src/context/authContext.tsx` — main auth provider: watches Firebase sign-in state, reads the user's role from Firestore, and gives the app a small `appUser` object. I explained the flow, fallback behavior, and logout.
- `src/context/modeContext.tsx` — editor mode (Editing / Commenting / Viewing): saves the chosen mode to localStorage and explains why we handle storage errors gently.
- `src/context/themeContext.tsx` — theme provider: explains how the app chooses light/dark, how it persists the choice, and how it follows OS preference when no choice is saved.
- `src/components/Header.tsx` — header UI: added simple comments about the brand, navigation, mode dropdown, theme toggle, and how Viewer role limits mode choices.
- `src/components/ToastProvider.tsx` — small notifications system: explained how to show and auto-hide toasts and that they render in a DOM portal.
- `src/hooks/useAuth.tsx` — an alternate/simple auth provider wrapper: added plain notes about subscribing to auth state and loading profile data.
- `src/pages/Dashboard.tsx` — explains that the dashboard lists the user's diagrams and who can create new ones.
- `src/pages/DiagramEditorPage.tsx` — editor page: explained permissions (Editor vs Viewer), loading and saving diagrams, and basic editor actions.
- `src/pages/LoginPage.tsx` — simple note: handles sign in / sign up, uses `authService` helpers.
- `src/pages/ProfilePage.tsx` — shows user email, role and UID; explains copy and logout actions.
- `src/services/authService.tsx` — explained `signupUser` and `loginUser`, and how errors are normalized for friendly messages.
- `src/types/auth.tsx` — added plain comments for `UserRole` and `AppUser` so types are easy to understand.

Build and checks I ran

- I ran `npm run build` which runs TypeScript and a production Vite build to make sure the code still works after adding comments. The build passed.

Notes for contributors (quick start)

- Install dependencies: run `npm install` in the project root.
- Run the dev server: `npm run dev` (opens the app with hot reload).
- Build for production: `npm run build`.
