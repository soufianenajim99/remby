import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public sequence: string[] = [];
  public userInput: string[] = [];
  public currentLevel = 1;
  public score = 0;
  public gameOverSubject = new Subject<boolean>();

  public colors = ['red', 'blue', 'green', 'yellow']; // You can add more colors.

  constructor() { }

  // Generate a random color sequence
  generateSequence(): void {
    const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.sequence.push(randomColor);
  }

  // Validate the user's input
  verifyResponse(userInput: string[]): boolean {
    const isCorrect = JSON.stringify(userInput) === JSON.stringify(this.sequence);
    if (isCorrect) {
      this.currentLevel++;
      this.score += 10;  // Increase score (you can modify the scoring logic)
      this.userInput = [];
      return true;
    } else {
      this.gameOverSubject.next(true);
      return false;
    }
  }

  // Reset the game
  resetGame(): void {
    this.sequence = [];
    this.userInput = [];
    this.currentLevel = 1;
    this.score = 0;
  }

  // Get game over status
  gameOver(): Observable<boolean> {
    return this.gameOverSubject.asObservable();
  }

  // Get the current score and level
  getScore(): number {
    return this.score;
  }

  getCurrentLevel(): number {
    return this.currentLevel;
  }

  getSequence(): string[] {
    return this.sequence;
  }
}
