import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/users.model';

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
  private _userService: UserService = inject(UserService);
  public isProfileExpanded: boolean = false;
  public isDashboardExpanded: boolean = false;
  public user: User | undefined;

  ngOnInit(): void {
    this.menuItems = this._sidebarService.menu;
    this.user = this._userService.user;
  }

  profileExpanded(): void {
    this.isProfileExpanded = !this.isProfileExpanded;
  }
  dashboardExpanded(): void {
    this.isDashboardExpanded = !this.isDashboardExpanded;
  }
}
