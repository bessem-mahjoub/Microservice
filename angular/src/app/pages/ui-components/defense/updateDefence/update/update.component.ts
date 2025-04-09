import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { defense } from 'src/app/core/Defense';
import { DefenceService } from 'src/app/services/defence.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  // Form fields
  dateDefence!: Date;
  timeDefense!: string;
  numeroDeClasse!: number;
  numeroDeBloc!: string;
  nomDeJuret!: string;
  nomDeEncadrent!: string;
  remarque: string = '';
  userStudent!: string;

  // Loading and error states
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { defense: defense, usedDates: Date[] },
    private defenseService: DefenceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Set the fields with values from the defense passed in data
    const { defense } = this.data;
    this.dateDefence = new Date(defense.dateDefense);
    this.timeDefense = defense.timeDefense;
    this.numeroDeClasse = defense.numeroDeClasse;
    this.numeroDeBloc = defense.numeroDeBloc;
    this.nomDeJuret = defense.nomDeJuret;
    this.nomDeEncadrent = defense.nomDeEncadrent;
    this.remarque = defense.remarque;
    this.userStudent = '';
  }

  updateDefense(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const updatedDefense: defense = {
      ...this.data.defense,
      dateDefense: this.dateDefence,
      timeDefense: this.timeDefense,
      numeroDeBloc: this.numeroDeBloc,
      numeroDeClasse: this.numeroDeClasse,
      nomDeJuret: this.nomDeJuret,
      nomDeEncadrent: this.nomDeEncadrent,
      remarque: this.remarque
    };

    this.defenseService.updateDefense(updatedDefense).subscribe({
      next: () => {
        this.snackBar.open('Defense updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error updating defense:', error);
        this.errorMessage = error.error?.message || 'Failed to update defense. Please try again.';
        this.snackBar.open(this.errorMessage, 'Close', {
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
}
