import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Tournament {
  id?: string;
  name: string;
  sport: string;
  discipline?: string;
  location?: string;
  registration?: 'Open' | 'Closed';
  startDate?: string; // ISO string
  fee?: string;
  description?: string;
  imageUrl?: string;
  createdAt?: any;
  longitude?: any;
  latitude?: any;
  showInTopMenu?: boolean;
  website?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private colName = 'tournaments';
  constructor(private firestore: Firestore) {}

  // list all tournaments (ordered newest first)
  list(): Observable<Tournament[]> {
    const col = collection(this.firestore, this.colName);
    return collectionData(col, { idField: 'id' }) as Observable<Tournament[]>;
  }

  get(id: string): Observable<Tournament | undefined> {
    const d = doc(this.firestore, `${this.colName}/${id}`);
    return docData(d, { idField: 'id' }) as Observable<Tournament | undefined>;
  }

  async create(t: Partial<Tournament>) {
    const col = collection(this.firestore, this.colName);
    // add serverTimestamp on client side not used here - you can add createdAt server-side later
    const ref = await addDoc(col, { ...t, createdAt: new Date().toISOString() });
    return ref.id;
  }

  async update(id: string, data: Partial<Tournament>) {
    const d = doc(this.firestore, `${this.colName}/${id}`);
    await updateDoc(d, data);
  }

  async delete(id: string) {
    const d = doc(this.firestore, `${this.colName}/${id}`);
    await deleteDoc(d);
  }
}
