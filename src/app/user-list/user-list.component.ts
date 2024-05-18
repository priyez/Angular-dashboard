import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  currentPage = 1;
  totalPage = 0;
  error: any = null;
  loading = true; // Declare the 'loading' property here

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers(this.currentPage);
  }

  fetchUsers(page: number): void {
    this.loading = true; // Set loading to true before fetching users
    this.userService.getUsers(page)
      .subscribe(
        data => {
          this.loading = false; // Set loading to false after fetching users
          this.users = data.data; // Assuming data contains user information
          this.totalPage = data.total_pages; // Assuming data contains total pages
        },
        error => {
          this.loading = false; // Set loading to false if an error occurs
          this.error = error; // Set the error object
        }
      );
  }
  
  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPage) {
      return;  // Prevent fetching users with invalid page numbers
    }
    this.currentPage = page;
    this.fetchUsers(this.currentPage);
  }
}
