import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { resolve } from '../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private canUpload : boolean = false;
  constructor(private http: HttpClient) {}

  public uploadResume(file: File, userID: string, email: string): Promise<Object>  {
    const formData: FormData = new FormData();
    formData.append("resume", file, file.name);
    formData.append("user_id", userID);
    formData.append("email", email);

    var promise = new Promise<Object>((resolve, reject) => {
      this.http.post(environment.apiEndpoint+"/upload", formData).toPromise()
      .then((data) => {
        resolve(data);
      }, (error) => {
        reject(error)});
    });

    return promise;
  }

  public checkCanUpload(userID: string, email: string): Promise<boolean> {
    var promise = new Promise<boolean>((resolve, reject) => {
      this.http.get(environment.apiEndpoint+"/can_upload", {
        params: {
          "user_id": userID,
          "email": email,
        }
      })
      .toPromise()
      .then(
        (data) => {
          if (data["ok"]) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
    return promise;
  }

  public updateResume(selectedFile: File, userId: string, email: string): Promise<boolean> {
    const formData: FormData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("user_id", userId);
    formData.append("email", email);
    var promise = new Promise<boolean>((resolve, reject) => {
        this.http.post(environment.apiEndpoint + "/resumes/update", formData).toPromise()
        .then((data) => {
          if (data["ok"]) {
            resolve(true);
          } else {
            resolve(false);
          }
        }, (error) => {
          reject(error);
        });
    });

    return promise;
  }

  public getResumeInsight(userID: string): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.http.
      get<Object>(environment.apiEndpoint + "/resumes/insight/" + userID)
      .toPromise()
      .then((resumeInsight: object) => {
        resolve(resumeInsight);
      },
      (reason) => reject(reason))
    });
  }
}