import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import {CommonModule, NgClass} from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  imports: [
    NgClass,
    CommonModule
  ],
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public sequence: string[] = [];
  public userInput: string[] = [];
  public currentLevel: number = 1;
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
    setTimeout(() => {
      this.isSequenceVisible = false;
    }, 10000);
  }

  resetGame(): void {
    this.startGame();
  }

  addUserInput(color: string): void {
    this.userInput.push(color);
  }
}
