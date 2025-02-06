import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '@services/user-data.service';
import { map } from 'rxjs/operators';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';

export interface User {
  id: number;
  name: string;
  email: string;
  cities: { item_id: number; item_text: string }[];
  profilePhoto: string;
}

@Component({
  selector: 'app-stu-info',
  imports: [MatTableModule,MatSortModule, MatPaginator, MatPaginatorModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, RouterOutlet, FormsModule, CommonModule, NgMultiSelectDropDownModule, ReactiveFormsModule, RouterModule],
  templateUrl: './stu-info.component.html',
  styleUrl: './stu-info.component.css'
})
export class StuInfoComponent implements OnInit, AfterViewInit  {

  constructor(private userData: UserDataService) { }

  id: number = 0;
  name: string = '';
  email: string = '';
  profilePhoto: string = '';
  selectedFile: File | null = null;
  isEditMode: boolean = false;

  //Select Multiple Dropdown
  dropdownList: { item_id: number; item_text: string }[] = [];
  dropdownSettings: IDropdownSettings = {};
  cities: { item_id: number; item_text: string } [] = [];
  cityNames:any;

  displayedColumns: string[] = ['Id','Name', 'Email', 'Action']; 
  users: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator; //for pagination
  @ViewChild(MatSort) sort!: MatSort; //for sorting

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getUsers();

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Pune' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    } as IDropdownSettings;

  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  openAddModel() {
    this.resetForm();
    this.isEditMode = true;
  }

  //Reset the form fileds
  resetForm() {
    this.name = '';
    this.email = '';
    this.cities = [];
    this.profilePhoto = '';
  }

  //Fetch all emails
  getEmail(data: User) {
    console.log('check email', data);
    this.userData.getUsers().subscribe((response) => {
      if (Array.isArray(response)) {
        const emails = response.map(user => user.email); 
        console.log('Extracted emails:', emails); 
        let isEmailExist = emails.includes(data.email); 
        if(isEmailExist) { 
          alert('The email is already exists! Please put another email'); 
          this.email = '';
        } 
      }    
    })
  }

  //always use subscribe() method for add, update, delete the user
  addUser(data: User): void {
    console.log('User data', data);
    this.userData.addUser(data).subscribe((response) => {
      console.log('User added successfully', response); //check the response
      this.getUsers(); //reload the users
      this.resetForm();
    });
  }

  //Get all users
  getUsers(): void {
    this.userData.getUsers().subscribe((response: any) => {
      this.users = response
      console.log(response);
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  //View User
  viewUser(user: User) {
    this.cityNames='';
    this.id = user.id;
    // alert(this.id);
    this.name = user.name;
    this.email = user.email;
    this.cityNames = user.cities.map((x) => x.item_text).join(", ");
    this.cities = [this.cityNames];
    console.log('view user', user);
  }

  //Edit user
  editUser(user: User): void {
    console.log(user);
    this.isEditMode = false;
    // alert(user.id);
    this.name = user.name;
    this.email = user.email;
    this.id = user.id;
    this.cities = user.cities;
    console.log(user);
  }

  //Update user
  updateUser(data: User): void {
    // this.id = data.id;
    console.log(this.id);
    data.id = this.id;
    this.userData.updateUser(data).subscribe((response) => {
      console.log(response);
      this.getUsers();
      this.resetForm();
    })
  }

  //Delete user
  deleteUser(id: number) {
    console.log(id);
    this.userData.deleteUser(id).subscribe((response) => {
      console.log("User Deleted");
      this.getUsers();
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]; //get the first selected file
    console.log('File :', file);
    if(file) {
      this.selectedFile = file; //store the file object in selected file variable

      const reader = new FileReader(); //create a new filereader object
      reader.readAsDataURL(file); //Read the file as a Data URL (Base64 format)
      reader.onload = () => {
        this.profilePhoto = reader.result as string; //store the file preview in profilephoto variable
      };
    }
  }

    //Upload file
  uploadProfile() {
      console.log('click upload file button');
     
      if(!this.selectedFile) {
        alert('Please select file first');
        return;
      }

      this.userData.uploadProfilePhoto(this.selectedFile).subscribe((response: any) => {
        console.log('file upload success', response)
        alert('file uploaded');
      })
  }

}
