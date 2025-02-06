import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../student/stu-info/stu-info.component';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:3000/student";

  addUser(data: User) {
    return this.http.post<User>(this.url, data);
  }

  getUsers() {
    return this.http.get<User>(this.url);
  }

  updateUser(data: User) {
    return this.http.put<User>(this.url+`/${data.id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(this.url+`/${id}`);
  }

  //Profile photo
  uploadProfilePhoto(file: File) {
    const formData = new FormData();
    formData.append('upload file', file);
    console.log(formData);
    return this.http.post(this.url, { profilePhoto: file.name });
  }

}
