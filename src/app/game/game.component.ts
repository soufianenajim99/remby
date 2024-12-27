import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import {CommonModule, NgClass} from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  imports: [
    NgClass,
    CommonModule
  ]
})
export class GameComponent implements OnInit {
  public sequence: string[] = [];
  public userInput: string[] = [];
  public currentLevel: number = 1;
  sequenceDisplayTime: number = 10;
  timeLeft: number = this.sequenceDisplayTime;
  timerInterval: any; // To hold the interval reference
  areButtonsDisabled: boolean = true; // Initially disabled until the sequence display ends
  isSequenceVisible: boolean = true;
  public score: number = 0;
  public isGameOver: boolean = false;

  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.startGame();

    // Subscribe to game over event
    this.gameService.gameOver().subscribe((gameOver) => {
      this.isGameOver = gameOver;
    });
  }

  startGame(): void {
    this.gameService.resetGame();
    this.generateNextSequence();
  }

  generateNextSequence(): void {
    this.gameService.generateSequence();
    this.sequence = this.gameService.getSequence();
    this.currentLevel = this.gameService.getCurrentLevel();
    this.score = this.gameService.getScore();
    this.showSequence();

  }

  validateUserInput(): void {
    const isCorrect = this.gameService.verifyResponse(this.userInput);
    if (isCorrect) {
      this.generateNextSequence();
      this.userInput = [];
    } else {
      console.log('Game Over! Final Score:', this.score);
    }
  }
  showSequence() {
    this.isSequenceVisible = true;
    this.timeLeft = this.sequenceDisplayTime;
    this.areButtonsDisabled = true; // Disable buttons during sequence display

    this.timerInterval = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.isSequenceVisible = false;
        this.areButtonsDisabled = false;
      }
    }, 1000); // Decrease time left every second
  }

  resetGame(): void {
    clearInterval(this.timerInterval);
    this.startGame();
  }

  addUserInput(color: string): void {
    this.userInput.push(color);
  }
}
