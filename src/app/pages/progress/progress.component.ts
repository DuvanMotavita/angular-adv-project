import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IncrementComponent } from '../../components/increment/increment.component';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [FormsModule, IncrementComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
})
export default class ProgressComponent {
  public progress1: number = 25;
  public progress2: number = 35;

  get getProgress1() {
    return `${this.progress1}%`;
  }
  get getProgress2() {
    return `${this.progress2}%`;
  }

  // public changeChildValue(value: number): void {
  //   console.log('Hey', value);
  // }
}
