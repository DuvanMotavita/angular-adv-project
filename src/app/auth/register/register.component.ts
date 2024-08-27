import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent {
  //Injections
  private fb: FormBuilder = inject(FormBuilder);
  private _userService: UserService = inject(UserService);
  private router: Router = inject(Router);

  //Variables
  public formSubmitted: boolean = false;

  public registerForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terms: [false, Validators.required],
    },
    {
      validators: this.equalPassword('password', 'password2'),
    }
  );

  createUser(): void {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
    // else {
    //   console.log('Form is not correct');
    // }

    this._userService.createUser(this.registerForm.value).subscribe({
      next: (resp) => {
        console.log('Create user');
        console.log(resp);
        this.router.navigateByUrl('/');
      },
      error: (e) => console.error(Swal.fire('Error', e.error.msg, 'error')),
      complete: () => console.info('complete'),
    });
  }
  notValidField(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  notValidPassword(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  acceptTerms() {
    return !this.registerForm.get('terms')!.value && this.formSubmitted;
  }

  equalPassword(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ notEqual: true });
      }
    };
  }
}
