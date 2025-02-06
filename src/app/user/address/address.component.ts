import { Component, OnInit } from '@angular/core';
import { AddressService } from '@services/address.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-address',
  imports: [CommonModule, FormsModule, MatInputModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})

export class AddressComponent implements OnInit {

  constructor(private addressData: AddressService) { }

  displayedColumns: string[] = ['Id', 'Name', 'Username', 'Email', 'Action']; 
  studentdata: any[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.addressData.getUser().subscribe((response: any) => {
      this.studentdata = response;
      console.log(response);
    })
  }

  id: number = 0
  name: string = ''
  username: string = ''
  email: string = ''
  address: { street: string } = { street: ''}

  view(student: any) {
    this.id = student.id
    this.name = student.name;
    this.username = student.username;
    this.email = student.email;
    this.address.street = student.address.street
    console.log(this.address.street);
    console.log('view', this.name);
  }

}
