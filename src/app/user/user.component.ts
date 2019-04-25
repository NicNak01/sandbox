import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRepositoryService } from './user-repository.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  errorMessage = '';
  credentials: any = {};

  constructor(private router: Router, private userRepository: UserRepositoryService) { }

  signIn(credentials: any) {
    this.userRepository.Createuser(credentials)
      .subscribe(
        null,
        error => this.errorMessage = <any>error,
        () => this.router.navigate(['/welcome'])
        );
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
