import { Component, inject, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css',
})
export default class AccountSettingsComponent implements OnInit {
  private _settingsService: SettingsService = inject(SettingsService);

  ngOnInit(): void {
    this._settingsService.checkCurrentTheme();
  }

  changeTheme(theme: string): void {
    this._settingsService.changeTheme(theme);
  }
}
