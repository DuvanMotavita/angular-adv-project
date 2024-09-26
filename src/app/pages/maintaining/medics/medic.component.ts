import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { delay, firstValueFrom, take } from 'rxjs';
import { Hospital } from '../../../models/hospital.model';
import { Medic, MedicInterface } from '../../../models/medic.model';
import { ImagePipe } from '../../../pipes/image.pipe';
import { MedicService } from '../../../services/medic.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medic',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ImagePipe],
  templateUrl: './medic.component.html',
  styleUrl: './medic.component.css',
})
export default class MedicComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private hospitalService: HospitalService = inject(HospitalService);
  private medicService: MedicService = inject(MedicService);
  private router: Router = inject(Router);
  private actviateRoute: ActivatedRoute = inject(ActivatedRoute);

  public medicForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital?: Hospital;
  public selectedMedic?: Medic;

  ngOnInit(): void {
    this.actviateRoute.params.subscribe(({ id }) => this.loadMedic(id));
    this.medicForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.loadHospitals();
    this.medicForm.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      this.selectedHospital = this.hospitals.find((h) => h._id === hospitalId);
    });
  }

  public async loadMedic(id: string) {
    if (id === 'new') {
      return;
    }
    await firstValueFrom(
      this.medicService.getMedicById(id).pipe(delay(100))
    ).then((medic) => {
      if (!medic) {
        this.router.navigateByUrl(`/dashboard/medics`);
      }
      const {
        name,
        hospital: { _id },
      } = medic;
      this.selectedMedic = medic;
      this.medicForm.setValue({ name, hospital: _id });
    });
  }

  public async loadHospitals() {
    await firstValueFrom(this.hospitalService.loadHospitals()).then(
      (hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      }
    );
  }

  public async saveMedic() {
    const { name } = this.medicForm.value;

    if (this.selectedMedic) {
      const data = { ...this.medicForm.value, _id: this.selectedMedic._id };
      await firstValueFrom(this.medicService.updateMedic(data)).then((resp) => {
        Swal.fire('Updated', `${name} update has been success`, 'success');
      });
    } else {
      await firstValueFrom(
        this.medicService.createMedic(this.medicForm.value)
      ).then((resp: any) => {
        Swal.fire('Created', `${name} creation has been success`, 'success');
        this.router.navigateByUrl(`/dashboard/medic/${resp.medic._id}`);
      });
    }
  }
}
