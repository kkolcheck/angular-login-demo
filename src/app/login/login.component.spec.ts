import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userSvc: UserService;
  let toastrSvc: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        {
          provide: UserService,
          useClass: UserService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    userSvc = TestBed.inject(UserService);
    toastrSvc = TestBed.inject(ToastrService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test form validation for empty form', () => {
    expect(component.loginForm.valid).toBe(false);
  })

  it('should test form validation for when username is filled with valid email address', () => {
    component.loginForm.get('username')?.setValue('some@one.com');
    expect(component.loginForm.get('username')?.valid).toBe(true);
    expect(component.loginForm.valid).toBe(false);
  })

  it('should test form validation for when username is filled with invalid email address', () => {
    component.loginForm.get('username')?.setValue('notAnEmail');
    expect(component.loginForm.get('username')?.valid).toBe(false);
    expect(component.loginForm.valid).toBe(false);
  })

  it('should test form validation for when password is filled with ANSI chars', () => {
    component.loginForm.get('password')?.setValue('totallÿvalid');
    expect(component.loginForm.get('password')?.valid).toBe(true);
    expect(component.loginForm.valid).toBe(false);
  })

  it('should test form validation for when password is filled with non ANSI chars', () => {
    component.loginForm.get('password')?.setValue('āƃĉ123');
    expect(component.loginForm.get('password')?.valid).toBe(false);
    expect(component.loginForm.valid).toBe(false);
  })

  it('should test form validation and should be valid when username and password are valid', () => {
    component.loginForm.get('username')?.setValue('some@one.com');
    component.loginForm.get('password')?.setValue('totallyvalid');
    expect(component.loginForm.get('username')?.valid).toBe(true);
    expect(component.loginForm.get('password')?.valid).toBe(true);
    expect(component.loginForm.valid).toBe(true);
  })

  it('should test submit happy path', () => {
    component.loginForm.get('username')?.setValue('some@one.com');
    component.loginForm.get('password')?.setValue('abc123');
    const mockResponse = { message: 'Success' };
    spyOn(userSvc, `postUserLogin`).and.returnValue(of(mockResponse));
    const navSpy = spyOn(component, 'navigateToUrl');
    component.submit();
    expect(navSpy).toHaveBeenCalledOnceWith('http://onecause.com');
  });

  it('should test submit error', () => {
    component.loginForm.get('username')?.setValue('some@one.com');
    component.loginForm.get('password')?.setValue('abc123');
    let error: any = new Error('Testing error');
    spyOn(userSvc, `postUserLogin`).and.callFake(() => {
      return new Observable(observer => {
        observer.error(error);
      })
    });
    const toastrSpy = spyOn(toastrSvc, 'error');
    component.submit();
    expect(toastrSpy).toHaveBeenCalledTimes(1);
  });

});
