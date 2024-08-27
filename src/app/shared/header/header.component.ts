import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/users.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private _userService: UserService = inject(UserService);
  public user: User | undefined;
  logout(): void {
    this._userService.logout();
  }
  ngOnInit(): void {
    this.user = this._userService.user;
  }
}
