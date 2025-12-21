import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentService, Tournament } from '../../services/tournament.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TournamentFormDialogComponent } from '../tournament-form-dialog/tournament-form-dialog.component';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
imports: [
  RouterModule,
  CommonModule,
  FormsModule,            
  MatTableModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatFormFieldModule,     
  MatInputModule,          
  MatSelectModule         
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  tournaments$: Observable<Tournament[]>;
  displayedColumns = ['name', 'sport', 'discipline', 'location', 'registration', 'actions'];

  filterSport: string = "";
  filterName: string = "";
  filteredList: Tournament[] = [];

  // provide the sports list (reuse same array you have)
  sports = [
    'Animal Sports','Athletics','Badminton','Basketball','Billiard','Board Sports','Bowling','Mountain Sports',
    'Combat Sports','Cycling','ESports','Football','Golf','Gymnastics','Handball','Ice Sports','Padel',
    'Parasports','Racing','Rugby','Tennis','Teqball','Volleyball','Water Sports','Weapons', 'Ping Pong'
  ];

  constructor(
    private svc: TournamentService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
      private auth: Auth,
  private router: Router
  ) {
this.tournaments$ = this.svc.list();

this.tournaments$.subscribe(list => {
  this.filteredList = list;
});
  }

  applyFilter() {
  this.tournaments$.subscribe(list => {
    this.filteredList = list.filter(item => {

      const matchSport =
        !this.filterSport || item.sport === this.filterSport;

      const matchName =
        !this.filterName ||
        item.name.toLowerCase().includes(this.filterName.toLowerCase());

      return matchSport && matchName;
    });
  });
}

async logout() {
  await signOut(this.auth);
  this.router.navigate(['/login']);
}

  async openCreate() {
    const ref = this.dialog.open(TournamentFormDialogComponent, {
      data: { mode: 'create', sports: this.sports },
      width: '520px'
    });

    const result = await ref.afterClosed().toPromise();
    if (result) {
      try {
        await this.svc.create(result);
        this.snack.open('Tournament created', 'OK', { duration: 2000 });
      } catch (err) {
        console.error(err);
        this.snack.open('Create failed', 'OK', { duration: 3000 });
      }
    }
  }

  async openEdit(item: Tournament) {
    const ref = this.dialog.open(TournamentFormDialogComponent, {
      data: { mode: 'edit', tournament: item, sports: this.sports },
      width: '520px'
    });

    const result = await ref.afterClosed().toPromise();
    if (result) {
      try {
        await this.svc.update(item.id as string, result);
        this.snack.open('Tournament updated', 'OK', { duration: 2000 });
      } catch (err) {
        console.error(err);
        this.snack.open('Update failed', 'OK', { duration: 3000 });
      }
    }
  }

  async delete(item: Tournament) {
    if (!confirm(`Delete tournament "${item.name}"?`)) return;
    try {
      await this.svc.delete(item.id as string);
      this.snack.open('Tournament deleted', 'OK', { duration: 2000 });
    } catch (err) {
      console.error(err);
      this.snack.open('Delete failed', 'OK', { duration: 3000 });
    }
  }
}
