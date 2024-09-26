import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MedicService } from '../../../services/medic.service';
import { Medic } from '../../../models/medic.model';
import { delay, firstValueFrom, Subscription, take } from 'rxjs';
import { ImagePipe } from '../../../pipes/image.pipe';
import { ModalImageService } from '../../../services/modal-image.service';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medics',
  standalone: true,
  imports: [ImagePipe, RouterModule],
  templateUrl: './medics.component.html',
  styleUrl: './medics.component.css',
})
export default class MedicsComponent implements OnInit, OnDestroy {
  private medicService: MedicService = inject(MedicService);
  private modalImageService: ModalImageService = inject(ModalImageService);
  private searchService: SearchService = inject(SearchService);
  private imgSubs!: Subscription;

  public medics: Medic[] = [];
  public loading: boolean = true;

  ngOnInit(): void {
    this.loadMedics();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.loadMedics());
  }

  public async loadMedics() {
    this.loading = true;
    await firstValueFrom(this.medicService.loadMedics()).then((medics) => {
      this.loading = false;
      this.medics = medics;
    });
  }
  public openModal(medic: Medic) {
    this.modalImageService.openModal('medics', medic._id!, medic.img);
  }

  public async search(term: string): Promise<void> {
    if (term.length == 0) {
      return this.loadMedics();
    }
    return await firstValueFrom(this.searchService.search('medics', term)).then(
      (resp: any) => {
        this.medics = resp;
      }
    );
  }

  public deleteMedic(medic: Medic) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the medic : ${medic.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicService.deleteMedic(medic._id!).subscribe((resp) => {
          this.loadMedics();
          Swal.fire(
            'The medic has been deleted.',
            `${medic.name} has been deleted.`,
            'success'
          );
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
