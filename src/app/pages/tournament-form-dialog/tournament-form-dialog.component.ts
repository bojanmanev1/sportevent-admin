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


@Component({
  selector: 'app-tournament-form-dialog',
  standalone: true,
  imports: [CommonModule , FormsModule,MatSlideToggleModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './tournament-form-dialog.component.html',
  styleUrls: ['./tournament-form-dialog.component.scss']
})
export class TournamentFormDialogComponent {
  // data: { mode: 'create'|'edit', tournament?: Tournament, sports?: string[] }
  model: Partial<Tournament> = {};
  sports: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<TournamentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sports = (data?.sports || []);
    this.model = { ...(data?.tournament || {}) };
  }

  save() {
    // Basic form validation
    if (!this.model.name || !this.model.sport || !this.model.location) {
      alert('Please fill Name, Sport and Location.');
      return;
    }
    this.dialogRef.close(this.model);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
