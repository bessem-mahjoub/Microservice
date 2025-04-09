import { Component, ElementRef, ViewChild, AfterViewInit,OnInit } from "@angular/core";
import { Document } from 'src/app/services/Documentdoc';
import { DocumentService } from 'src/app/services/DocumentService';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver'; 
import { HttpClient } from '@angular/common/http';
import { PlagiarismResultModalComponent } from '../../plagiarism-result-modal/plagiarism-result-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Docxtemplater from 'docxtemplater';
import { jsPDF } from 'jspdf';
import { fabric } from 'fabric';

import JSZip from 'jszip';
import { Observable } from 'rxjs';
import { User } from 'src/app/services/UserModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss'],
})
export class AddDocumentComponent implements OnInit {




  signatureImage: string = '';
  documentType: string = '';
  documentForm: FormGroup;
  documents: Document[] = [];
  users: User[] = [];
  filterType: string = '';
  selectedFiles: File[] = [];
  plagiarismResults: any[] = [];
  firstName: string = '';
  lastName:string='';
  identified:string='';
  selectedDocument: Document | null = null;
  errorMessage: string = '';
  
  constructor(
    private documentService: DocumentService,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,
    private formBuilder: FormBuilder 
  ) {}

  ngOnInit(): void {
    this.fetchDocuments();
    this.loadDocuments();
    this.loadUsers();
    this.documentForm = this.formBuilder.group({
      name: ['', Validators.required], // Example, adjust according to your form fields
      lastName: ['', Validators.required] // Example, adjust according to your form fields
      // Add other form controls as needed
    });
   
  }
  loadDocuments(): void {
    this.documentService.getAllDocuments().subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        // Vous pouvez effectuer d'autres opérations ici si nécessaire
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }
  loadUsers(): void {
    this.documentService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
 
  

  addDocument(): void {
    if (this.selectedFiles.length === 0) {
      this.errorMessage = 'No files selected.';
      return;
    }

    console.log('Adding document...');
    this.selectedFiles.forEach(file => {
      this.documentService.createDocument(file, this.documentType)
        .subscribe(
          (response) => {
            console.log('Document added successfully:', response);
            this.fetchDocuments();
            this.router.navigate(['/ui-components/add-document']);
            this.selectedFiles = [];  },
          (error) => {
            console.error('Error adding document:', error);
            this.errorMessage = 'Error adding document.';
          }
        );
    });
  }

  openUpdateForm(document: Document): void {
    this.router.navigate(['/ui-components/update-document', document.idDoc]);
  }
  
  deleteDocument(document: Document): void {
    if (!document.idDoc) {
      console.error('Document ID is undefined.');
      return;
    }
    
  
    if (confirm('Are you sure you want to delete this document?')) {
      this.documentService.deleteDocument(document.idDoc).subscribe(
        () => {
          console.log('Document deleted successfully');
          this.fetchDocuments();
        },
        (error) => {
          console.error('Error deleting document:', error);
        }
      );
    }
  }
  

  downloadDocument(documentId: number | undefined, documentType: string): void {
    if (!documentId) {
      console.error('Document ID is undefined.');
      return;
    }
  
    this.documentService.getDocumentById(documentId).subscribe(
      (response: any) => {
        console.log('Downloading document:', response);
  
      
        const decodedData = atob(response.content.data);
  

        const byteNumbers = new Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
          byteNumbers[i] = decodedData.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
  
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
  
        saveAs(blob, `${documentType}.docx`);
      },
      (error: any) => {
        console.error('Error downloading document:', error);
      }
    );
  }
  
  
  filteredDocuments(): Document[] {
    if (!this.filterType) {
      return this.documents;
    }
    return this.documents.filter(document => document.type === this.filterType);
  }
  openDocument(document: Document): void {
    if (!document.content) {
        console.error('Document content is undefined.');
        return;
    }
  
    const reader = new FileReader();
    reader.onload = (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        if (arrayBuffer) {
         
            const blob = new Blob([new Uint8Array(arrayBuffer)]);
  
            JSZip.loadAsync(blob)
            .then((zip: any) => { 
              const doc = new Docxtemplater();
              doc.loadZip(zip);
              const text = doc.getFullText();

              const dialogConfig = new MatDialogConfig();
              dialogConfig.width = '80%';
              dialogConfig.data = { content: document.content };
              this.dialog.open(PlagiarismResultModalComponent, dialogConfig);
            })
            .catch((error: any) => {
              console.error('Error extracting text from document:', error);
            });
          
        }
    };

    reader.readAsArrayBuffer(document.content.slice(0, document.content.size));
  }
  
  onFilesSelected(event: Event): void {
    const fileInput = (event.target as HTMLInputElement);
    if (!fileInput || !fileInput.files || fileInput.files.length < 1) {
      this.errorMessage = 'Please select at least two files to check plagiarism.';
      return;
    }
    this.selectedFiles = Array.from(fileInput.files);
    console.log('Files selected:', this.selectedFiles);
    this.errorMessage = ''; 
    
   
    if (this.selectedFiles.length >= 1) {
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please select at least two files to check plagiarism.';
    }
  }
  
areAtLeastTwoSelected: boolean = false;

toggleDocumentSelection(document: Document): void {
  document.selected = !document.selected;

  const selectedCount = this.documents.filter(doc => doc.selected).length;
  this.areAtLeastTwoSelected = selectedCount >= 1;
}

checkPlagiarism(): void {
  console.log('Checking plagiarism...');

  const selectedDocuments = this.documents.filter(doc => doc.selected);

  const filePromises = selectedDocuments.map(document => {
    return new Promise((resolve, reject) => {
      this.documentService.downloadDocumentContent1(document.idDoc).subscribe(
        (response: ArrayBuffer) => {
          resolve({ document: document, content: response });
        },
        (error) => {
          reject(error);
        }
      );
    });
  });

 
  Promise.all(filePromises).then(results => {

    const plagiarismDetected = this.detectPlagiarism(results);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = { plagiarismDetected: plagiarismDetected };
    const dialogRef = this.dialog.open(PlagiarismResultModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }).catch(error => {
    console.error('Error retrieving documents:', error);
    this.errorMessage = 'Error retrieving documents.';
  });
}

  
  detectPlagiarism(results: any[]): any[] {
    const plagiarismDetected: any[] = [];
 
    for (let i = 0; i < results.length; i++) {
      const doc1 = results[i];
      for (let j = i + 1; j < results.length; j++) {
        const doc2 = results[j];
        

        const similarity = this.calculateCosineSimilarity(doc1.content, doc2.content);
  
        if (similarity > 0.8) {
          plagiarismDetected.push({ document1: doc1.document, document2: doc2.document, similarity: similarity });
        }
      }
    }
  
    return plagiarismDetected;
  }
  fetchDocuments(): void {
    this.documentService.getAllDocuments().subscribe(
      (response) => {
        console.log('Documents retrieved successfully:', response);
        this.documents = response.map(document => ({
          ...document,
          selected: false,
          content: null 
        }));
        this.fetchDocumentContent();
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }
  
  fetchDocumentContent(): void {
    for (let document of this.documents) {
      this.documentService.downloadDocumentContent1(document.idDoc).subscribe(
        (response: ArrayBuffer) => {
          console.log('Content retrieved successfully for document ID:', document.idDoc);
          document.content = response; 
        },
        (error) => {
          console.error('Error fetching content for document ID:', document.idDoc, error);
        }
      );
    }
  }
  
  
  calculateCosineSimilarity(content1: ArrayBuffer, content2: ArrayBuffer): number {

    const text1 = this.arrayBufferToString(content1);
    const text2 = this.arrayBufferToString(content2);

    const vector1 = this.tokenize(text1);
    const vector2 = this.tokenize(text2);
  
    let dotProduct = 0;
    for (const term in vector1) {
      if (vector2.hasOwnProperty(term)) {
        dotProduct += vector1[term] * vector2[term];
      }
    }
  
    let magnitude1 = 0;
    for (const term in vector1) {
      magnitude1 += vector1[term] ** 2;
    }
    magnitude1 = Math.sqrt(magnitude1);
  
    let magnitude2 = 0;
    for (const term in vector2) {
      magnitude2 += vector2[term] ** 2;
    }
    magnitude2 = Math.sqrt(magnitude2);
  
    return dotProduct / (magnitude1 * magnitude2);
  }
  
  arrayBufferToString(buffer: ArrayBuffer): string {
 
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
    });
    return binary;
  }
  
  tokenize(text: string): { [term: string]: number } {

    const tokens = text.split(/\s+/);
    const vector: { [term: string]: number } = {};
  
    for (const token of tokens) {
      if (vector.hasOwnProperty(token)) {
        vector[token]++;
      } else {
        vector[token] = 1;
      }
    }
  
    return vector;
  }
  downloadPlagiarismResults(): void {
    if (!this.plagiarismResults) return;

    const resultsText = JSON.stringify(this.plagiarismResults, null, 2);
    const blob = new Blob([resultsText], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'plagiarism_results.txt');
  }
  openPlagiarismResults(): void {
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.data = { plagiarismDetected: this.plagiarismResults };
    this.dialog.open(PlagiarismResultModalComponent, dialogConfig);
  }
  showSignaturePad: boolean = false;
  showAddSignatureButton: boolean = false;
  // Signature Pad
  @ViewChild('signaturePad', { static: true }) signaturePadElement: ElementRef;
  signaturePad: fabric.Canvas;

  ngAfterViewInit() {
    this.signaturePad = new fabric.Canvas(this.signaturePadElement.nativeElement, {
      backgroundColor: 'rgb(255, 255, 255)',
      width: 500,
      height: 300,
      isDrawingMode: true // Activate drawing mode
    });
  }
  // Save signature
  saveSignature(): void {
    const signatureData = this.signaturePad.toDataURL();
    this.signatureImage = signatureData;
    this.showAddSignatureButton = true;
  }

  downloadTemplateDocument(): void {
    console.log('Users:', this.users);
    const today = new Date().toLocaleDateString('fr-FR'); // Format de la date: "jj/mm/aaaa"
  
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Tunis, le : ${today}`, 10, 10);
    doc.text('A l’aimable attention de la Direction Générale', 10, 20);
    doc.text('Objet: Demande de Stage', 10, 30);
    doc.text('Madame, Monsieur,', 10, 40);
    doc.text(`L’Ecole Supérieure Privée d’Ingénierie et de Technologies, ESPRIT SA, est un établissement d’enseignement supérieur privé ayant pour objet principal, la formation d’ingénieurs dans les domaines des technologies de l’information et de la communication.`, 10, 50);
    doc.text(`Notre objectif consiste à former des ingénieurs opérationnels au terme de leur formation. Dès lors, nous encourageons nos élèves à mettre en pratique le savoir et les compétences qu’ils ont acquis au cours de leur cursus universitaire.`, 10, 60);
    doc.text(`C’est également dans le but de les amener à s’intégrer dans l’environnement de l’entreprise que nous vous demandons de bien vouloir accepter :`, 10, 70);
    doc.text(`L’étudiant(e) : omar abidi`, 10, 80);
    doc.text(`Inscrit(e) en : 1 ère année du cycle d'ingénieur en Informatique`, 10, 90);
    doc.text(`Pour effectuer un stage obligatoire, au sein de votre honorable société.`, 10, 100);
    doc.text(`Nous restons à votre entière disposition pour tout renseignement complémentaire.`, 10, 110);
    doc.text(`En vous remerciant pour votre précieux soutien, nous vous prions d’agréer, Madame, Monsieur, l’expression de nos salutations distinguées.`, 10, 120);
    doc.text(`Signature électronique de l'étudiant(e):`, 10, 130);
   
  // Image 1 (En haut du fichier PDF)
  const img1Width = doc.internal.pageSize.getWidth();
  const img1Height = 20; // Ajustez la hauteur selon vos besoins
  const img1XPos = 0;
  const img1YPos = 10;
  doc.addImage('assets/images/profile/en1.PNG', 'PNG', img1XPos, img1YPos, img1Width, img1Height);

  // Image 2 (Près de la signature)
  const img2Width = 100; // Ajustez la largeur selon la taille de votre signature électronique
  const img2Height = 40; // Ajustez la hauteur selon la taille de votre signature électronique
  const img2XPos = doc.internal.pageSize.getWidth() - img2Width - 10; // Ajustez la position X
  const img2YPos = 150; // Ajustez la position Y pour aligner avec la signature
  doc.addImage('assets/images/profile/siganture2.png', 'PNG', img2XPos, img2YPos, img2Width, img2Height);

  // Image 3 (Au bas du fichier PDF)
  const img3Width = doc.internal.pageSize.getWidth();
  const img3Height = 20; // Ajustez la hauteur selon vos besoins
  const img3XPos = 0;
  const img3YPos = doc.internal.pageSize.getHeight() - img3Height - 10; // Ajustez la position Y
  doc.addImage('assets/images/profile/im2.PNG', 'PNG', img3XPos, img3YPos, img3Width, img3Height);

    if (this.signatureImage) {
      const imgWidth = 100;
      const imgHeight = 40;
      const xPos = 10;
      const yPos = 135;
      doc.addImage(this.signatureImage, 'PNG', xPos, yPos, imgWidth, imgHeight);
    }

    const fileName = 'demande_de_stage.pdf';
    doc.save(fileName);
  }

  onClearSignature(): void {
    this.signaturePad.clear();
    this.signatureImage = '';
    this.showAddSignatureButton = false;
  }
}
  
  

/*@ViewChild('signaturePad') signaturePadElement: ElementRef;
  signaturePad: any;*/

