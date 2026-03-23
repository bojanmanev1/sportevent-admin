import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';import { getAuth, provideAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../environments/environment';

export const firebaseProviders = [
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
 provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage())
];

