import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { User } from '../../models/users.model';
import { Medic } from '../../models/medic.model';
import { Hospital } from '../../models/hospital.model';
import { ImagePipe } from '../../pipes/image.pipe';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ImagePipe, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export default class SearchComponent implements OnInit {
  public users: User[] = [];
  public medics: Medic[] = [];
  public hospitals: Hospital[] = [];

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private searchService: SearchService = inject(SearchService);
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => {
      this.globalSearch(term);
    });
  }

  private async globalSearch(term: string) {
    await firstValueFrom(this.searchService.globalSearch(term)).then(
      (resp: any) => {
        this.users = resp.users;
        this.medics = resp.medics;
        this.hospitals = resp.hospitals;
      }
    );
  }

  public openMedic(medic: Medic): void {}
}
