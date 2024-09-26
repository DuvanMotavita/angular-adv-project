import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital, Hospitals } from '../../../models/hospital.model';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay, Subscription } from 'rxjs';
import { SearchService } from '../../../services/search.service';
import { ImagePipe } from '../../../pipes/image.pipe';

@Component({
  selector: 'app-hospitals',
  standalone: true,
  imports: [FormsModule, ImagePipe],
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.css',
})
export default class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  private imgSubs!: Subscription;
  private hospitalService: HospitalService = inject(HospitalService);
  private modalImageService: ModalImageService = inject(ModalImageService);
  private searchService: SearchService = inject(SearchService);

  ngOnInit(): void {
    this.loadingHospitals();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.loadingHospitals());
  }

  loadingHospitals(): void {
    this.loading = true;
    this.hospitalService.loadHospitals().subscribe((hospitals) => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }
  saveChanges(hospital: Hospital): void {
    this.hospitalService
      .updateHospital(hospital._id!, hospital.name)
      .subscribe((resp) => {
        Swal.fire('Hospital Update', hospital.name, 'success');
      });
  }
  deleteHospital(hospital: Hospital): void {
    this.hospitalService.deleteHospital(hospital._id!).subscribe((resp) => {
      this.loadingHospitals();
      Swal.fire('Hospital has been delete', hospital.name, 'success');
    });
  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create Hospital',
      input: 'text',
      text: 'Hospital Name:',
      inputPlaceholder: 'Hospital Name',
      showCancelButton: true,
    });

    if (value && value.trim().length > 0) {
      this.hospitalService.createHospitals(value).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.hospitals.push(resp.hospital);
        },
      });
    }
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital._id!, hospital.img);
  }

  search(term: string): void | Subscription {
    if (term.length == 0) {
      return this.loadingHospitals();
    }
    return this.searchService
      .search('hospitals', term)
      .subscribe((resp: any) => {
        this.hospitals = resp;
      });
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
