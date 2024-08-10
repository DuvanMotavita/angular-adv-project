import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-increment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './increment.component.html',
  styleUrl: './increment.component.css',
})
export class IncrementComponent implements OnInit {
  ngOnInit(): void {
    this.btnClassName = `btn ${this.btnClassName}`;
  }
  @Input('value') progress: number = 50;
  @Input() btnClassName: string = 'btn-primary';

  @Output() outputValue: EventEmitter<number> = new EventEmitter();
  // @Input()
  // progress: number = 50;

  // get getPercent() {
  //   return `${this.progress}%`;
  // }

  public changeValue(value: number): void {
    if (this.progress >= 100 && this.progress >= 0) {
      this.outputValue.emit(100);
      this.progress = 100;
    }
    if (this.progress <= 0 && this.progress < 0) {
      this.outputValue.emit(0);
      this.progress = 0;
    }
    this.progress = this.progress + value;
    this.outputValue.emit(this.progress);
  }

  public onChange(newValue: number): void {
    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }
    this.outputValue.emit(newValue);
  }
}
