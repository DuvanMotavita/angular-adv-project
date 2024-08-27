import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/users.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export default class ProfileComponent implements OnInit {
  //Injections
  private fb: FormBuilder = inject(FormBuilder);
  private _userService: UserService = inject(UserService);
  private _fileUploadService: FileUploadService = inject(FileUploadService);
  //Variables
  public profileForm: FormGroup | undefined;
  public user: User | undefined;
  public fileUploaded!: File;
  public imgTemp!: string | ArrayBuffer | null;

  ngOnInit(): void {
    this.user = this._userService.user;

    this.profileForm = new FormGroup({
      name: new FormControl(this.user?.name, Validators.required),
      email: new FormControl(this.user?.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  profileUpdate(): void {
    console.log(this.profileForm?.value);
    this._userService.updateUser(this.profileForm?.value).subscribe({
      next: (resp) => {
        const { name, email } = this.profileForm?.value;
        this.user!.name = name;
        this.user!.email = email;
        Swal.fire('Save Correctly', 'The changes was save', 'success');
      },
      error: (e) => {
        Swal.fire('Error', e.error.msg, 'error');
      },
    });
  }

  changeImage(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.fileUploaded = fileList[0];

      if (!this.fileUploaded) {
        this.imgTemp = null;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.fileUploaded);
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      };
    }
  }

  uploadImage(): void {
    this._fileUploadService
      .updatePhoto(this.fileUploaded, 'users', this.user?.uid!)
      .then((img) => {
        this.user!.img = img;
        Swal.fire(
          'Image Change Correctly',
          'The image has been change correctly',
          'success'
        );
      })
      .catch((err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
