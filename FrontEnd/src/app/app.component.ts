import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  imageNotDownloaded = true;
  SelectedFile: File = null;
  previewUrl: any = null;
  GuessedObject: any = null;

  constructor(private http: HttpClient) { }

  onFileChanged(event: any) {
    this.SelectedFile = event.target.files[0] as File;
    this.preview();
    this.imageNotDownloaded = false;
    this.onUpload()
  }


  preview() {
    // Show preview
    const mimeType = this.SelectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.SelectedFile);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  onUpload() {
    // upload code goes here
    if (this.SelectedFile) {

      const formData = new FormData();
      formData.append('file', this.SelectedFile, 'img.png');
      return this.http.post('http://localhost:5002/predict', formData).subscribe(prediction => {
        this.GuessedObject = prediction;
        console.log(prediction);
      }
      );
    }

    else alert("Enter an image")
  }

  onDelete() {
    this.SelectedFile = null;
    this.imageNotDownloaded = true;
  }
}
