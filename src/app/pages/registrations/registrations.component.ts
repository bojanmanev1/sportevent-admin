import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { RegistrationService, Registration } from '../../services/registration.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registrations',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule,RouterModule, MatTableModule, MatCardModule],
  templateUrl: './registrations.component.html',
})
export class RegistrationsComponent {
  registrations$: Observable<Registration[]>;
  cols = ['tournamentName', 'userName', 'phone', 'sport'];

  constructor(private regService: RegistrationService) {
    this.registrations$ = this.regService.list();
  }
}
