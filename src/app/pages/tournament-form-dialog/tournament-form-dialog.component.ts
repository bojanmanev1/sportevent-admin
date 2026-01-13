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




@Component({
  selector: 'app-tournament-form-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, MatDatepickerModule,MatNativeDateModule, FormsModule,MatSlideToggleModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './tournament-form-dialog.component.html',
  styleUrls: ['./tournament-form-dialog.component.scss']
})




export class TournamentFormDialogComponent {

  model: Partial<Tournament> = {};
  sports: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<TournamentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sports = (data?.sports || []);
    this.model = { ...(data?.tournament || {}) };

    const sd: any = this.model.startDate;
if (sd?.toDate) {
  // Firestore Timestamp -> Date
  this.model.startDate = sd.toDate();
} else if (typeof sd === 'string' && sd) {
  // string -> Date (if you had stored it as string before)
  const d = new Date(sd);
  this.model.startDate = isNaN(d.getTime()) ? null : d;
} else if (!(sd instanceof Date)) {
  this.model.startDate = null;
}
  }

 save() {
  if (!this.model.name || !this.model.sport || !this.model.location) return;

  const payload = {
    ...this.model,
    startDate: this.model.startDate ? Timestamp.fromDate(this.model.startDate as Date) : null,
  };

  this.dialogRef.close(payload);
}

  cancel() {
    this.dialogRef.close(null);
  }
}
