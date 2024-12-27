import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-ui',
  templateUrl: './game-ui.component.html',
  styleUrls: ['./game-ui.component.css']
})
export class GameUIComponent {
  @Input() colors: string[] = [];
  @Output() userInput = new EventEmitter<string>();

  onColorClick(color: string): void {
    this.userInput.emit(color);
  }
}
