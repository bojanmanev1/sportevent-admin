import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Tournament } from '../../services/tournament.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-tournament-form-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './tournament-form-dialog.component.html',
  styleUrls: ['./tournament-form-dialog.component.scss']
})
export class TournamentFormDialogComponent {
  model: Partial<Tournament> = {};
  sports: string[] = [];
  coordinates = '';

  constructor(
    private dialogRef: MatDialogRef<TournamentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sports = data?.sports || [];
    this.model = { ...(data?.tournament || {}) };

    const sd: any = this.model.startDate;
    if (sd?.toDate) {
      this.model.startDate = sd.toDate();
    } else if (typeof sd === 'string' && sd) {
      const d = new Date(sd);
      this.model.startDate = isNaN(d.getTime()) ? null : d;
    } else if (!(sd instanceof Date)) {
      this.model.startDate = null;
    }

    if (!this.model.status) {
      this.model.status = 'upcoming';
    }

    if (this.model.latitude != null && this.model.longitude != null) {
      this.coordinates = `${this.model.latitude}, ${this.model.longitude}`;
    }
  }

  setStatus(status: 'upcoming' | 'ongoing' | 'closed') {
    this.model.status = status;
  }

  save() {
    if (!this.model.name || !this.model.sport || !this.model.location) return;

    let latitude: number | null = null;
    let longitude: number | null = null;

    if (this.coordinates?.trim()) {
      const parts = this.coordinates.split(',').map(x => x.trim());

      if (parts.length !== 2) {
        alert('Coordinates must be in format: latitude, longitude');
        return;
      }

      latitude = Number(parts[0]);
      longitude = Number(parts[1]);

      if (isNaN(latitude) || isNaN(longitude)) {
        alert('Coordinates must be valid numbers');
        return;
      }
    }

    const payload = {
      ...this.model,
      latitude,
      longitude,
      startDate: this.model.startDate
        ? Timestamp.fromDate(this.model.startDate as Date)
        : null,
      status: this.model.status || 'upcoming'
    };

    this.dialogRef.close(payload);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}