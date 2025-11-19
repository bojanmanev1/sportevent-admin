import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Registration {
  id?: string;
  tournamentId: string;
  tournamentName: string;
  sport: string;
  discipline: string;
  userName: string;
  userSurname: string;
  phone: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private colName = 'registrations';

  constructor(private firestore: Firestore) {}

  list(): Observable<Registration[]> {
    const col = collection(this.firestore, this.colName);
    const q = query(col, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Registration[]>;
  }
}
