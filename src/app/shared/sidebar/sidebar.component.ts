import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  menuItems: any[] | undefined;
  private _sidebarService: SidebarService = inject(SidebarService);
  public isProfileExpanded: boolean = false;
  public isDashboardExpanded: boolean = false;

  ngOnInit(): void {
    this.menuItems = this._sidebarService.menu;
  }

  profileExpanded(): void {
    this.isProfileExpanded = !this.isProfileExpanded;
  }
  dashboardExpanded(): void {
    this.isDashboardExpanded = !this.isDashboardExpanded;
  }
}
