// defense.component.ts
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { defense } from 'src/app/core/Defense';
import { DefenceService } from 'src/app/services/defence.service';
import { CreateComponent } from './createdefense/create/create.component';
import { CalendarrComponent } from './calendarr/calendarr.component';
import { UpdateComponent } from './updateDefence/update/update.component';

@Component({
  selector: 'app-defense',
  templateUrl: './defense.component.html',
  styleUrls: ['./defense.component.scss']
})
export class DefenseComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // RxJS cleanup
  private destroy$ = new Subject<void>();

  // Data properties
  defenses: defense[] = [];
  filteredDefenses: defense[] = [];
  usedDates: Date[] = [];
  uniqueStudents: string[] = [];

  // Filter form
  filterForm: FormGroup;

  // Pagination
  pageSize = 10;
  currentPage = 0;
  totalItems = 0;

  // Loading state
  loading = false;

  // Table configuration
  displayedColumns = [
    'dateDefense',
    'timeDefense',
    'numeroDeBloc',
    'numeroDeClasse',
    'nomDeJuret',
    'userStudent',
    'nomDeEncadrent',
    'remarque',
    'actions'
  ];

  constructor(
    private defenseService: DefenceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      searchText: [''],
      filterDate: [''],
      filterStudent: ['']
    });

    // Setup filter form subscribers
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.applyFilter());
  }

  ngOnInit(): void {
    this.loadDefenses();
    this.loadUsedDates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDefenses(): void {
    this.loading = true;
    this.defenseService.getAllDefenses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.defenses = data;
        //  this.updateUniqueStudents();
          this.applyFilter();
          this.loading = false;
        },
        error: (error) => {
          this.showError('Failed to load defenses');
          this.loading = false;
        }
      });
  }

  loadUsedDates(): void {
    this.defenseService.getUsedDates()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (dates) => this.usedDates = dates,
        error: () => this.showError('Failed to load used dates')
      });
  }

  /*updateUniqueStudents(): void {
    this.uniqueStudents = Array.from(
      new Set(this.defenses.map(d => d.userStudent).filter(Boolean))
    );
  } */

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '600px',
      data: { usedDates: this.usedDates }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.loadDefenses();
          this.showSuccess('Defense created successfully');
        }
      });
  }

  openCalendarDialog(): void {
    this.dialog.open(CalendarrComponent, {
      width: '800px',
      data: { defenses: this.defenses }
    });
  }

  openUpdateDialog(defenseId: number): void {
    const defense = this.defenses.find(d => d.idDef === defenseId);
    if (defense) {
      const dialogRef = this.dialog.open(UpdateComponent, {
        width: '600px',
        data: { defense, usedDates: this.usedDates }
      });

      dialogRef.afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          if (result) {
            this.loadDefenses();
            this.showSuccess('Defense updated successfully');
          }
        });
    }
  }

  deleteDefense(defenseId: number): void {
    if (confirm('Are you sure you want to delete this defense?')) {
      this.defenseService.deleteDefense(defenseId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadDefenses();
            this.showSuccess('Defense deleted successfully');
          },
          error: () => this.showError('Failed to delete defense')
        });
    }
  }

  applyFilter(): void {
    const filters = this.filterForm.value;
    let filtered = [...this.defenses];

    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(defense =>
        defense.userStudent?.toLowerCase().includes(searchLower) ||
        defense.nomDeJuret.toLowerCase().includes(searchLower) ||
        defense.nomDeEncadrent.toLowerCase().includes(searchLower)
      );
    }

    if (filters.filterDate) {
      filtered = filtered.filter(defense =>
        new Date(defense.dateDefense).toDateString() === new Date(filters.filterDate).toDateString()
      );
    }

    if (filters.filterStudent) {
      filtered = filtered.filter(defense =>
        defense.userStudent === filters.filterStudent
      );
    }

    this.filteredDefenses = filtered;
    this.totalItems = filtered.length;
  }

  getPaginatedData(): defense[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredDefenses.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
