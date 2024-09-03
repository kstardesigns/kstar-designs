import { Component, Input } from '@angular/core';

@Component({
  selector: 'bh-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.scss'
})
export class UserInputComponent {
  @Input() response: string;

  constructor() { 
    this.response = '';
  }

}
