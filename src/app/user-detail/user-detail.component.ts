import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map, switchMap, tap } from 'rxjs'; // Import Subscription
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  private sub!: Subscription; // Non-null assertion operator (!)
  id: string | null = null; // Use union type
	data: any = null;
	error: any = null;
	loading = true;

  constructor(
		private route: ActivatedRoute,
		private userService: UserService,
    private router: Router 
	) { }

	handleSuccess(response: any): void {
		this.loading = false;
		this.data = response.data;
	}

	handleError(error: any): void {
		this.loading = false;
		this.error = error;
	}

  ngOnInit(): void {
    this.sub = this.route.params
		.pipe(
			tap(console.log), // Use tap operator to debug the stream
			map(params => params.id), // Use map operator to extract the id
			tap(id => this.id = id), // Use tap operator to set the id
			switchMap(id => this.userService.getUserById(id)), // Use switchMap operator to switch to a new observable
		)
		.subscribe({
			next: response => this.handleSuccess(response),
			error: error => this.handleError(error),
		});
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goBack(): void {
    this.router.navigate(['/users']); // Navigate to the User List page
  }
}