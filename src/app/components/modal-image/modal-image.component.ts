import { Component, inject } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  standalone: true,
  imports: [],
  templateUrl: './modal-image.component.html',
  styleUrl: './modal-image.component.css',
})
export class ModalImageComponent {
  public modalImageService: ModalImageService = inject(ModalImageService);
  public _fileUploadService: FileUploadService = inject(FileUploadService);
  public fileUploaded!: File;
  public imgTemp!: string | ArrayBuffer | null;

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
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
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this._fileUploadService
      .updatePhoto(this.fileUploaded, type, id)
      .then((img) => {
        Swal.fire(
          'Image Change Correctly',
          'The image has been change correctly',
          'success'
        );
        this.modalImageService.newImage.emit(img);
        this.closeModal();
      })
      .catch((err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
