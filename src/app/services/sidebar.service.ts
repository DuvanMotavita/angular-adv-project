import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu: any = [];

  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: 'main' },
  //       { title: 'Progress Bar', url: 'progress' },
  //       { title: 'Charts', url: 'grafica1' },
  //     ],
  //   },
  //   {
  //     title: 'Support',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Users', url: 'users' },
  //       { title: 'Hospitals', url: 'hospitals' },
  //       { title: 'Medics', url: 'medics' },
  //     ],
  //   },
  // ];
  chargeMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
  }
}
