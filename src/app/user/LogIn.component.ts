import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRepositoryService } from './user-repository.service';
import { trigger, animate, transition, style, keyframes } from '@angular/animations';

@Component({
  styleUrls: ['./LogIn.component.css'],
  templateUrl: './LogIn.component.html',
  animations: [
    trigger('err', [
      transition('* <=> *',
  animate('500ms', keyframes([
    style({transform: 'translate3d(-2px, 0, 0)',   offset: 0}),
    style({transform: 'translate3d(3px, 0, 0)',    offset: 0.33}),
    style({transform: 'translate3d(-5px, 0, 0)',   offset: 0.66}),
    style({transform: 'translate3d(5px, 0, 0)',    offset: 1.0})
  ])
)),
    ])
  ]
})
export class LogInComponent implements OnInit {
  registerForm: FormGroup;
  email: FormControl;
  password: FormControl;
  saving = false;
  failAth = false;
  processing: boolean;
  error: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userRepository: UserRepositoryService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(4)]],
    });
    // this.email = new FormControl('', Validators.required);
    // this.password = new FormControl('', Validators.required);

    // this.registerForm = new FormGroup({
    //   'email': this.email,
    //   'password': this.password
    // });
  }

  registerUser(user) {
    this.saving = true;
    this.saveAndRedirect(user);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  private saveAndRedirect(user) {
    this.processing = true;
    this.userRepository
      .Loguser(user)
      .subscribe(
        null,
        () => {this.saving = false;
          this.processing = false;
          this.authFail();
          this.registerForm.reset(); },
        () => {this.router.navigate(['/welcome']);
        this.processing = false;
        this.error = false; }

      );
  }
  get stateName() {
    return this.failAth;
  }

  authFail() {
    this.failAth = !this.failAth;
    this.error = true;
  }
}


