import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { doc, updateDoc, addDoc, serverTimestamp } from '@angular/fire/firestore';

export interface SelfRegistration {
  id: string;
  name: string;
  sport: string;
  discipline?: string;
  startDate?: any; // Firestore Timestamp or Date
  location: string;
  registration: 'Open' | 'Closed' | 'Not open yet';
  fee?: any;
  website?: string;
  description?: string;

  status: 'pending' | 'approved' | 'rejected';
  createdAt?: any;
}


@Component({
  selector: 'app-self-registrations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule,
    RouterLink
  ],
  templateUrl: './self-registrations.html',
  styleUrls: ['./self-registrations.scss']
})
export class SelfRegistrations implements OnInit {

  displayedColumns = [
  'name',
  'sport',
  'discipline',
  'startDate',
  'location',
  'registration',
  'fee',
  'website',
  'status',
  'actions'
];
  registrations$!: Observable<SelfRegistration[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const ref = collection(this.firestore, 'selfregistrations');
    this.registrations$ = collectionData(ref, { idField: 'id' }) as Observable<SelfRegistration[]>;
  }

  toDate(v: any): Date | null {
  if (!v) return null;
  if (v instanceof Date) return v;
  if (typeof v?.toDate === 'function') return v.toDate(); // Firestore Timestamp
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

async approve(el: SelfRegistration) {
  // 1) add to tournaments
  const tournamentsRef = collection(this.firestore, 'tournaments');

  const newTournament = {
    name: el.name,
    sport: el.sport,
    discipline: el.discipline ?? '',
    startDate: el.startDate ?? null,
    location: el.location,
    registration: el.registration,
    fee: el.fee ?? null,
    website: el.website ?? '',
    description: el.description ?? '',
    showInTopMenu: false,
    createdAt: serverTimestamp()
  };

  await addDoc(tournamentsRef, newTournament);

  // 2) update request status
  const reqRef = doc(this.firestore, 'selfregistrations', el.id);
  await updateDoc(reqRef, { status: 'approved', approvedAt: serverTimestamp() });
}

async reject(el: SelfRegistration) {
  const reqRef = doc(this.firestore, 'selfregistrations', el.id);
  await updateDoc(reqRef, { status: 'rejected', rejectedAt: serverTimestamp() });
}

view(el: SelfRegistration) {
  alert(el.description || 'No description');
}

}
