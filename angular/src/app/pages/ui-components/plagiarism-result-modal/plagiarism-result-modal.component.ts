
import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-plagiarism-result-modal',
  templateUrl: './plagiarism-result-modal.component.html',
  styleUrls: ['./plagiarism-result-modal.component.scss']
})
export class PlagiarismResultModalComponent {
  file1Content: string | undefined;
  file2Content: string | undefined;
  plagiarismDetected: boolean = false;
  plagiarismPercentage: number = 0;
  loading: boolean = false;

  constructor() { }

  onFileSelected(event: any, fileNumber: string): void {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string | undefined;
      if (text) {
        if (fileNumber === 'file1') {
          this.file1Content = text;
        } else {
          this.file2Content = text;
        }
      }
    };
  
    reader.readAsText(file);
  }
  estimatePlagiarism(): void {
    if (this.file1Content && this.file2Content) {
     
      this.loading = true;
      setTimeout(() => {
        const lines1 = this.file1Content!.split('\n'); 
        const lines2 = this.file2Content!.split('\n'); 
        let commonLines = 0;
  
        lines1.forEach(line1 => {
          if (lines2.includes(line1)) {
            commonLines++;
          }
        });
  
        this.plagiarismPercentage = (commonLines / lines1.length) * 100;
        this.plagiarismDetected = true;
        this.loading = false;
      }, 3000); 
    } else {
      
      console.error('Les fichiers doivent être sélectionnés avant de pouvoir estimer le plagiat.');
    }
  }
}  