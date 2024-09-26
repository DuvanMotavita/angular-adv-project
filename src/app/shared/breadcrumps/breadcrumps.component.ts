import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  Data,
  Router,
  RouterModule,
} from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumps',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumps.component.html',
  styleUrl: './breadcrumps.component.css',
})
export class BreadcrumpsComponent {
  private router: Router = inject(Router);
  // private route: ActivatedRoute = inject(ActivatedRoute);

  public title!: string;
  public titleSubs$!: Subscription;
  constructor() {
    this.titleSubs$ = this.getArgumentosRuta().subscribe(({ title }) => {
      console.log('Data from subscribe', title);
      this.title = title;
      document.title = `AdminPro - ${title}`;
    });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getArgumentosRuta(): Observable<Data> {
    return this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
