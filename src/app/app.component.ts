import { Component, OnInit } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemDirectoryEntry, 
        FileSystemFileEntry } from 'ngx-file-drop';
import { ResumeService } from './services/resume.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  private resumeData: any;

  constructor(private resumeSvc: ResumeService) {}

  ngOnInit() {
    this.resumeSvc.checkCanUpload("2f24f4", "kirandasika30@gmail.com")
    .then(
      (canUpload) => {
        if (!canUpload) {
          alert("you've already uploaded a resume");
        }
      },
      (error) => {
        alert(error.message);
      }
    );
  }
  public files: UploadFile[] = [];

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // check if it is a valid file
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
  public onFileChange(event) {
    // console.log(event);
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0 && event.target.files.length < 2) {
      const [file] = event.target.files;
      // TODO: change this to grab the user_id and email from the url
      this.resumeSvc.uploadResume(file, "2f24f4", "kirandasika30@gmail.com");
    }
  }
}
