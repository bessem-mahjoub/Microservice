import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defense } from 'src/app/core/Defense';
import { Role, User } from 'src/app/core/User';
import { DefenceService } from 'src/app/services/defence.service';
import { UserService } from 'src/app/services/user.service';
import * as emailjs from 'emailjs-com';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  // Form fields
  dateDefence: Date;
  timeDefense: string;
  numeroDeClasse: number;
  numeroDeBloc: string;
  nomDeJuret: string;
 // userStudent: string;
  nomDeEncadrent: string;
  remarque: string = '';

  // Lists for dropdowns
  students: User[] = [];
  supervisors: User[] = [];

  // Loading and error states
  isSubmitting: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private defenseService: DefenceService,
    private snackBar: MatSnackBar
  ) {
    this.numeroDeClasse = this.generateRandomClasse();
    this.numeroDeBloc = this.generateRandomBloc();
    this.timeDefense = this.generateRandomTime();
  }

  ngOnInit() {
    this.isLoading = true;
    Promise.all([
      this.loadStudents(),
      this.loadSupervisors()
    ]).finally(() => {
      this.isLoading = false;
    });
  }

  loadStudents(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.getUsersByRole(Role.STUDENT).subscribe({
        next: (users) => {
          this.students = users;
          resolve();
        },
        error: (error) => {
          console.error('Error loading students:', error);
          this.errorMessage = 'Failed to load students';
          reject(error);
        }
      });
    });
  }

  loadSupervisors(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.getUsersByRole(Role.SUPERVISOR).subscribe({
        next: (users) => {
          this.supervisors = users;
          resolve();
        },
        error: (error) => {
          console.error('Error loading supervisors:', error);
          this.errorMessage = 'Failed to load supervisors';
          reject(error);
        }
      });
    });
  }

  addDefense(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const newDefense: Omit<defense, 'idDef'> = {
      dateDefense: this.dateDefence,
      timeDefense: this.timeDefense,
      numeroDeBloc: this.numeroDeBloc,
      numeroDeClasse: this.numeroDeClasse,
      nomDeJuret: this.nomDeJuret,
      //userStudent: this.userStudent,
      nomDeEncadrent: this.nomDeEncadrent,
      remarque: this.remarque
    };

    this.defenseService.createDefense(newDefense).subscribe({
      next: (response) => {
        console.log('Defense created successfully:', response);

        // Show success message
        this.snackBar.open('Defense created successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });

        // Send email notifications
        this.sendEmailToUsers(newDefense);

        // Navigate after a short delay to ensure the user sees the success message
        setTimeout(() => {
          this.router.navigateByUrl('/ui-components/defense');
        }, 1500);
      },
      error: (error) => {
        console.error('Error creating defense:', error);
        this.errorMessage = 'Failed to create defense. Please try again.';

        // Show error message
        this.snackBar.open('Error creating defense. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }


  sendEmailToUsers(defenseData: Omit<defense, 'idDef'>): void {
    // Email template data
    const emailData = {
      to_email: 'mohamedhadji603@gmail.com',
      from_name: 'Esprit',
      message: `Defense Details:
        Date: ${defenseData.dateDefense},
        Time: ${defenseData.timeDefense},
        Block: ${defenseData.numeroDeBloc},
        Room: ${defenseData.numeroDeClasse}`
    };

    // Send emails
    emailjs.send('service_vxn2zgg', 'template_30ljq0h', emailData);
    emailjs.send('service_vxn2zgg', 'template_30ljq0h', {
      ...emailData,
      message: `Hi Sir, welcome. ${emailData.message}`
    });
  }

  // Utility functions for generating random values
  private generateRandomTime(): string {
    const hours = Math.floor(Math.random() * (15 - 13 + 1)) + 13;
    const minutes = Math.floor(Math.random() * 2) * 30;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  private generateRandomBloc(): string {
    const blocs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M'];
    return blocs[Math.floor(Math.random() * blocs.length)];
  }

  private generateRandomClasse(): number {
    return Math.floor(Math.random() * 15) + 1;
  }
}
