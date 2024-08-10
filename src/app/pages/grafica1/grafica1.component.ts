import { Component } from '@angular/core';
import { DonutComponent } from '../../components/donut/donut.component';

@Component({
  selector: 'app-grafica1',
  standalone: true,
  imports: [DonutComponent],
  templateUrl: './grafica1.component.html',
  styleUrl: './grafica1.component.css',
})
export default class Grafica1Component {
  public labels1: string[] = ['Bread', 'Tacos', 'Burriros'];
  public data1 = [350, 550, 100];
}
