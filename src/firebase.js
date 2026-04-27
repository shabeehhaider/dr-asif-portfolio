import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Set these in .env — see .env.example for instructions.
// If any key is missing, hasFirebase is false and the review form is hidden.
export const hasFirebase = !!(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID
)

let db = null

if (hasFirebase) {
  const app = initializeApp({
    apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  })
  db = getFirestore(app)
}

export { db }

/*
  ── Firestore security rules ─────────────────────────────────────────────────
  Paste these into Firebase Console → Firestore → Rules:

  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /reviews/{id} {
        allow read:   if true;
        allow create: if request.resource.data.name   is string
                      && request.resource.data.name.size()    > 0
                      && request.resource.data.rating  is int
                      && request.resource.data.rating  >= 1
                      && request.resource.data.rating  <= 5
                      && request.resource.data.message is string
                      && request.resource.data.message.size() >= 20;
        allow delete: if true;   // developer deletes via admin UI (Ctrl+Shift+A)
        allow update: if false;
      }
    }
  }
  ─────────────────────────────────────────────────────────────────────────────
*/
