import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumpsComponent } from '../shared/breadcrumps/breadcrumps.component';
import { RouterModule } from '@angular/router';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions(): void;
@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumpsComponent,
    RouterModule,
  ],
  templateUrl: './pages.component.html',
  styles: ``,
})
export default class PagesComponent implements OnInit {
  private _settingsServie: SettingsService = inject(SettingsService);

  ngOnInit(): void {
    customInitFunctions();
  }
}
