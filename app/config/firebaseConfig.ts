import {
	DB_API_KEY,
	DB_APP_ID,
	DB_AUTH_DOMAIN,
	DB_MEASUREMENT_ID,
	DB_MESSAGING_SENDER_ID,
	DB_PROJECT_ID,
	DB_STORAGE_BUCKET,
} from '@env'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import 'firebase/storage'

const firebaseConfig = {
	apiKey: DB_API_KEY,
	authDomain: DB_AUTH_DOMAIN,
	projectId: DB_PROJECT_ID,
	storageBucket: DB_STORAGE_BUCKET,
	messagingSenderId: DB_MESSAGING_SENDER_ID,
	appId: DB_APP_ID,
	measurementId: DB_MEASUREMENT_ID,
}

const FIREBASE_APP = initializeApp(firebaseConfig)
const FIREBASE_DB = getFirestore(FIREBASE_APP)
const FIREBASE_AUTH = getAuth(FIREBASE_APP)
const FIREBASE_STORAGE = getStorage(FIREBASE_APP)

export { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE }
