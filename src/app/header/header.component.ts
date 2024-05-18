import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../user.service';
import { trigger, transition, style, animate } from '@angular/animations';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;

}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    // Define the fadeInOut animation trigger
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }), 
        animate('300ms', style({ opacity: 1 })) 
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })) 
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  userList: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';
  userId = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers(this.userId);
  }

  fetchUsers(id: any): void {
    this.userService.searchUsers(id)
      .subscribe(data => {
        this.userList = data.data; // Assuming data contains user information
        this.filteredUsers = this.userList;
      });
  }

  search(): void {
    if (this.searchText.trim() === '') {
      this.filteredUsers = this.userList;
    } else {
      this.filteredUsers = this.userList.filter(user =>
        user.first_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.last_name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  onSearchResultsClick(event: MouseEvent): void {
    event.stopPropagation(); // Prevent the click event from bubbling up
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!event.target) return;
    
    const targetElement = event.target as HTMLElement;
    const isInsideSearchResults = targetElement.closest('.header__filteredUsers');
    if (!isInsideSearchResults) {
      this.searchText = ''; // Clear search text
      this.filteredUsers = []; // Clear filtered users
    }
  }
}
