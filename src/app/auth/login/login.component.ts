import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { LoginForm } from '../../interfaces/login.interface';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn: ElementRef | undefined;
  //Injections
  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);
  private _userService: UserService = inject(UserService);

  //Variables
  public formSubmitted: boolean = false;

  public loginForm = new FormGroup({
    email: new FormControl<string>(localStorage.getItem('email') || '', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>('', Validators.required),
    rememberme: new FormControl<boolean>(false),
  });

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(): void {
    google.accounts.id.initialize({
      client_id:
        '175691431099-tt6ttr8jeh63besu4sfki3aebk0nvvrn.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleBtn?.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any): void {
    console.log('Encoded JWT ID token: ' + response.credential);
    this._userService.loginGoogle(response.credential).subscribe({
      next: (response) => {
        // console.log({ login: response });
        this.router.navigateByUrl('/');
      },
    });
  }

  // public loginForm = this.fb.group({
  //   email: ,
  //   password: ,
  //   rememberme: [false],
  // });

  login() {
    this._userService.login(this.currentLogin).subscribe({
      next: (resp) => {
        if (this.loginForm.get('rememberme')?.value) {
          localStorage.setItem(
            'email',
            this.loginForm.get('email')!.value || ''
          );
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },
      error: (e) => {
        Swal.fire('Error', e.error.msg, 'error');
      },
      complete: () => {
        console.log('Login complete');
      },
    });
    // this.router.navigateByUrl('/');
  }

  get currentLogin(): LoginForm {
    const login = this.loginForm.value as LoginForm;
    return login;
  }
}
