import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from 'src/app/services/Documentdoc';
import { DocumentService } from 'src/app/services/DocumentService';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.scss']
})
export class UpdateDocumentComponent implements OnInit {
  documentId: number;
  updatedDocumentType: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du document à partir de l'URL
    this.route.params.subscribe(params => {
      this.documentId = params['id'];
      // Vous pouvez ajouter une logique pour récupérer les détails du document à partir de l'ID et pré-remplir le formulaire
    });
  }

  saveChanges(): void {
    const updatedDocument: Partial<Document> = {
      idDoc: this.documentId,
      type: this.updatedDocumentType,
      // Ajoutez d'autres champs à mettre à jour si nécessaire
    };

    this.documentService.updateDocument(this.documentId, updatedDocument as Document).subscribe(
      (response) => {
        console.log('Document updated successfully:', response);
        this.router.navigate(['/ui-components/add-document']);
      },
      (error) => {
        console.error('Error updating document:', error);
      }
    );
  }
}
