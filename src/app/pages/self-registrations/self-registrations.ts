import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface SelfRegistration {
  id: string;
  name: string;
  sport: string;
  discipline?: string;
  location: string;
  registration: string;
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
    MatFormFieldModule
  ],
  templateUrl: './self-registrations.html',
  styleUrls: ['./self-registrations.scss']
})
export class SelfRegistrations implements OnInit {

  displayedColumns = ['name', 'sport', 'location', 'status', 'actions'];
  registrations$!: Observable<SelfRegistration[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const ref = collection(this.firestore, 'selfregistrations');
    this.registrations$ = collectionData(ref, { idField: 'id' }) as Observable<SelfRegistration[]>;
  }
}
