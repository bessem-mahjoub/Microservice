import { Component, OnInit } from '@angular/core';
import { InternshipService } from 'src/app/services/InternshipService';
import { InternshipInter } from 'src/app/services/InternshipInter';

@Component({
  selector: 'app-add-internship',
  templateUrl: './add-internship.component.html',
  styleUrls: ['./add-internship.component.scss']
})
export class AddInternshipComponent implements OnInit {
internship: InternshipInter = {
    idCompany: 0,
    duration: '',
    subject: '',
    description: '',
    degreeStageO: '',
    type: ''
  };  

  internships: InternshipInter[] = [];
  isFormVisible: boolean = false;
  selectedInternship: InternshipInter | null = null; // Ajoutez une propriété pour stocker l'internship sélectionné pour la modification

  constructor(private internshipService: InternshipService) { }

  ngOnInit(): void {
    this.fetchInternships();
    this.getAllInternships();
  }

  getAllInternships(): void {
    this.internshipService.getAllInternships().subscribe(
      internships => {
        this.internships = internships;
      },
      error => {
        console.error('Error fetching internships:', error);
      }
    );
  }

  fetchInternships(): void {
    this.internshipService.getAllInternships().subscribe(
      internships => {
        this.internships = internships;
      },
      error => {
        console.error('Error fetching internships:', error);
      }
    );
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  addInternship(): void {
    this.internshipService.createInternship(this.internship).subscribe(
        (response: any) => {
            console.log('Internship added successfully:', response);
            this.fetchInternships(); 
            this.toggleFormVisibility(); 
        },
        (error: any) => {
            console.error('Error adding internship:', error);
        }
    );
}

deleteInternship(id: number): void {
  console.log('Deleting internship with ID:', id); // Ajoutez cette ligne
  this.internshipService.deleteInternship(id).subscribe(
      () => {
          console.log('Internship deleted successfully');
          this.fetchInternships(); 
      },
      error => {
          console.error('Error deleting internship:', error);
      }
  );
}

  selectInternshipForModification(internship: InternshipInter): void {
    this.selectedInternship = { ...internship }; 
  }
  submitModification(): void {
    if (this.selectedInternship && this.selectedInternship.id) {
        this.internship = { ...this.selectedInternship }; 
        this.internshipService.updateInternship(this.selectedInternship.id, this.internship)
            .subscribe(
                (response: any) => {
                    console.log('Internship updated successfully:', response);
                    this.fetchInternships();
                    this.selectedInternship = null;
                    this.toggleFormVisibility(); // Fermez tous les formulaires
                },
                (error: any) => {
                    console.error('Failed to update internship:', error);
                }
            );
    } else {
        console.error('Selected internship or its ID is undefined.');
    }
}

  

  cancelModification(): void {
    this.selectedInternship = null;
    this.toggleFormVisibility(); 
}
}