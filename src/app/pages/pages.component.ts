import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumpsComponent } from '../shared/breadcrumps/breadcrumps.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumpsComponent,
    RouterOutlet,
  ],
  providers: [HeaderComponent, SidebarComponent, BreadcrumpsComponent],
  templateUrl: './pages.component.html',
  styles: ``,
})
export default class PagesComponent {}
