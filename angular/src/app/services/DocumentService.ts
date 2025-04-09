import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError,forkJoin } from 'rxjs';
import { catchError ,map} from 'rxjs/operators';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Document } from './Documentdoc';
import { saveAs } from 'file-saver'; 
import { User } from './UserModel';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = 'http://localhost:8224/api/documents';
  private baseUrl1 = 'http://localhost:8224/api/users';
  constructor(private http: HttpClient) { }

 
  /*getAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }
*/
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl1).pipe(
      catchError(this.handleError)
    );
  }
  getAllDocuments(): Observable<Document[]> {
    return forkJoin({
      documents: this.http.get<Document[]>(this.baseUrl),
      users: this.http.get<User[]>(this.baseUrl1)
    }).pipe(
      map(({ documents, users }) => {
       
        documents.forEach(document => {
          document.user = users.find(user => user.id === document.userId);
        });
        return documents;
      }),
      catchError(this.handleError)
    );
  }
  
  
  private getUserById(users: User[], userId: number): User {
    return users.find(user => user.id === userId) || new User(); // Retourne un nouvel utilisateur vide si aucun n'est trouvé
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }



  getDocumentById(documentId: number): Observable<Document> {
    const url = `${this.baseUrl}/${documentId}`;
    return this.http.get<Document>(url).pipe(
      catchError(this.handleError)
    );
  }

  createDocument(file: File, documentType: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', documentType);
    return this.http.post(`${this.baseUrl}/upload`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateDocument(documentId: number, document: Document): Observable<Document> {
    const url = `${this.baseUrl}/${documentId}`;
    return this.http.put<Document>(url, document).pipe(
      catchError(this.handleError)
    );
  }

  deleteDocument(documentId: number): Observable<void> {
    const url = `${this.baseUrl}/${documentId}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }
checkPlagiarism(file1: File, file2: File): Observable<any> {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);
    return this.http.post<any>(`${this.baseUrl}/check-plagiarism`, formData).pipe(
      catchError(this.handleError)
    );
  }
 
  convertToPDF(arrayBuffer: ArrayBuffer): void {
  
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
    });

    const documentDefinition = {
        content: [
            { text: binary }
        ]
    };


    const pdfDoc = pdfMake.createPdf(documentDefinition);

   
    pdfDoc.download('document.pdf'); 

}
downloadDocumentContent(documentId: number): void {

  this.http.get<any>(`${this.baseUrl}/content/${documentId}`, { responseType: 'arraybuffer' as 'json' }).subscribe(
    (response: ArrayBuffer) => {
 
      const binaryData = response;

      // Créer un blob à partir de l'ArrayBuffer
      const blob = new Blob([binaryData], { type: 'application/octet-stream' });


      saveAs(blob, `document_${documentId}.docx`);
    },
    (error) => {
      console.error('Error downloading document content:', error);
    }
  );
}
downloadDocumentContent1(documentId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/content/${documentId}`, { responseType: 'arraybuffer' as 'json' }).pipe(
    catchError(this.handleError)
  );
}
}
