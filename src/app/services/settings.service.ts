import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  public theme: string | null = '';

  constructor() {
    this.theme = localStorage.getItem('theme');
    const url = this.theme || 'css/colors/purple-dark.css';
    this.linkTheme?.setAttribute('href', url);
  }
  changeTheme(theme: string): void {
    const url = `css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    const links = document.querySelectorAll('.selector');

    links!.forEach((elem) => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `css/colors/${btnTheme}.css`;
      const currentThemne = this.linkTheme?.getAttribute('href');
      if (btnThemeUrl === currentThemne) {
        elem.classList.add('working');
      }
    });
  }
}
