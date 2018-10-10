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
  private email: string = ""; 
  private userID: string = "";
  private canUpload: boolean = true;
  private response: string = "";
  private isUploading: boolean = false;
  public show: boolean = false;
  private checkedTerms: boolean = false;
  public resumeLink: string;

  constructor(private route: ActivatedRoute, private resumeSvc: ResumeService) {}

  ngOnInit() {
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
            this.resumeSvc
            .getResumeInsight(this.userID)
            .then((resumeInsight: object) => {
              this.canUpload = false;
              this.resumeLink = resumeInsight['url'];
            },
            (reason) => console.log("reason: " + reason));
          }
        },(error) => {
          this.response = error;
        }
      );
      }
    );
  }

  public onFileInput(event) {
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
    if (this.canUpload) {
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
          console.log(error);
        }
      );
    } else {
      this.resumeSvc
      .updateResume(this.selectedFile, this.userID, this.email)
      .then((data) => {
        if (data) {
          this.response = "Resume updated successfully!";
        } else {
          this.response = "Error occured while updating resume";
        }
        this.isUploading = false;
      }, (error) => {
        this.response = error;
      });
    }
  }
}
