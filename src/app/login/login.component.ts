import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from ''
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginHttpSubscription: Subscription | undefined;

  constructor(
    private userSvc: UserService,
    private formBuilder:FormBuilder,
    private toastr: ToastrService
    ) {
    this.loginForm = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern('^[\x00-\xFF]+$')]]
    })
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.loginHttpSubscription) {
      this.loginHttpSubscription.unsubscribe();
    }
  }

  submit(): void {
    const payload = {
      username: this.loginForm.get('username')!.value,
      password: this.loginForm.get('password')!.value,
      token: this.userSvc.generateToken()
    }
    /*
      An HttpClient subscription is a `finite subscription` and will automatically unsubscribe when the call
      completes. There is an argument that you should still unsubscribe because if you navigate away
      while awaiting a response, it will cancel the subscribe block (in our case, preventing the redirect).
    */
    this.loginHttpSubscription = this.userSvc.postUserLogin(payload).subscribe(resp => {
        window.location.href = 'http://onecause.com';
      }, error => {
        console.error(error);
        this.toastr.error('Your username and/or password was incorrect. Please try again.');
        this.loginForm.patchValue({
          password: ''
        });
      });
  }
}