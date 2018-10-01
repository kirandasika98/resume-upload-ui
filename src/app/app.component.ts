import { Component, OnInit } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemDirectoryEntry, 
        FileSystemFileEntry } from 'ngx-file-drop';
import { ResumeService } from './services/resume.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Resume Uploads';
  private selectedFile: File;
  private email: string = "testuser@auburhacks.com" 
  private userID: string = "1234";
  private canUpload: boolean = true;
  private response: string = "";
  private isUploading: boolean = false;
  private show: boolean = false;

  constructor(private route: ActivatedRoute, private resumeSvc: ResumeService) {}

  ngOnInit() {
    console.log(this.userID, this.email);
    this.route.queryParams.subscribe(
      (params) => {
        this.show = true;
        if (!params["email"] || !params["id"]) {
        } else {
        this.email = params["email"];
        this.userID = params["id"];
      }
      // run this service call everytime so we can save space on GCS
      this.resumeSvc.checkCanUpload(this.userID, this.email)
      .then((canUpload) => {
          if (!canUpload) {
            this.canUpload = false;
          }
        },(error) => {alert(error.message);}
      );
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
      if (file != undefined) {
        this.selectedFile = file;
      }
      // TODO: change this to grab the user_id and email from the url
      this.resumeSvc
      .uploadResume(file, this.userID, this.email)
      .then(
        (data) => {
          if (data["ok"]) {
            alert('uploaded successfully.');
          } else {
            alert(data["error"]);
          }
        },
        (error) => { alert(error.message);}
      );
    }
  }

  public onFileInput(event) {
    console.log(event.target.files);
    let reader = new FileReader();
    if (event.target.files.length != 0)  {
      const [file] = event.target.files;
      if (file != undefined) {
        this.selectedFile = file;
      }
    }
  }

  public uploadResume(event) {
    if (this.selectedFile == undefined) {
      return
    }
    this.isUploading = true;
    this.resumeSvc
    .uploadResume(this.selectedFile, this.userID, this.email)
    .then(
      (data) => {
        if (data["ok"]) {
          this.response = "Uploaded resume succesfully";
        } else {
          this.response = data["error"];
        }
        this.isUploading = false;
      },
      (error) => {
        this.response = error;
      }
    );
  }
}
