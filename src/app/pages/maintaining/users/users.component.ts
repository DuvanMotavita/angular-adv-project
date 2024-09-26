import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

import { User } from '../../../models/users.model';

import { ModalImageService } from '../../../services/modal-image.service';
import { SearchService } from '../../../services/search.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export default class UsersComponent implements OnInit, OnDestroy {
  private userService: UserService = inject(UserService);
  private searchService: SearchService = inject(SearchService);
  private modalImageService: ModalImageService = inject(ModalImageService);

  public imgSubs!: Subscription;
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  public loading: boolean = true;

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.loadUsers());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from).subscribe(({ total, user }) => {
      this.totalUsers = total;
      this.users = user;
      this.usersTemp = user;
      this.loading = false;
    });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }
    this.loadUsers();
  }

  search(term: string): User[] | Subscription {
    if (term.length == 0) {
      return (this.users = this.usersTemp);
    }
    return this.searchService
      .search('users', term)
      .subscribe((resp: User[]) => {
        this.users = resp;
      });
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'You cannot delete yourself.', 'error');
    }
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the user : ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe((resp) => {
          this.loadUsers();
          Swal.fire(
            'The user has been deleted.',
            `${user.name} has been deleted.`,
            'success'
          );
        });
      }
    });
    return;
  }

  changeRole(user: User) {
    this.userService.saveUser(user).subscribe((resp) => {
      console.log(resp);
    });
  }

  openModal(user: User) {
    this.modalImageService.openModal('users', user.uid!, user.img);
  }
}
