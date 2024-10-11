import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/users.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private _userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  public user: User | undefined;
  logout(): void {
    this._userService.logout();
  }
  ngOnInit(): void {
    this.user = this._userService.user;
  }

  search(term: string): void {
    if (term.length === 0) return;
    this.router.navigateByUrl(`/dashboard/search/${term}`);
  }
}
