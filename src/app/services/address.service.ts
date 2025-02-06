import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AddressService {
  private addressUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private http:HttpClient) { }

  getUser() { 
    return this.http.get(this.addressUrl);
  }

}
