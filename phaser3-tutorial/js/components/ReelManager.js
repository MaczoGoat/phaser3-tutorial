import { SYMBOLS, PAYLINES } from '../config.js';

export class ReelManager {
  constructor(scene) {
    this.scene = scene;
    this.reels = [];
  }
  
  createReels() {
    const rows = 3;
    const cols = 5;
    const spacingX = 240;
    const spacingY = 200;
    const startX = this.scene.cameras.main.centerX - (cols * spacingX / 2) + spacingX / 2;
    const startY = this.scene.cameras.main.centerY - (rows * spacingY / 2) + spacingY / 2;
    
    for (let row = 0; row < rows; row++) {
      this.reels[row] = [];
      for (let col = 0; col < cols; col++) {
        const randomSymbol = Phaser.Math.RND.pick(SYMBOLS.baseSymbols);
        const x = startX + col * spacingX;
        const y = startY + row * spacingY;
        const symbol = this.scene.add.image(x, y, randomSymbol)
          .setScale(0.2)
          .setDepth(2);
        this.reels[row][col] = symbol;
      }
    }
  }
  
  spinReels() {
    // Sprawdzanie salda
    if (this.scene.balance < this.scene.betAmount) {
      alert('Brak środków!');
      return;
    }
    
    // Usuń stare linie wygrane
    this.scene.winLines.forEach(g => g.destroy());
    this.scene.winLines = [];
    
    // Odjęcie stawki od salda
    this.scene.balance -= this.scene.betAmount;
    this.scene.uiManager.updateBalanceText();
    
    // Losowanie nowych symboli
    this._randomizeSymbols();
    
    // Sprawdzanie wygranych
    this._checkWins();
  }
  
  _randomizeSymbols() {
    for (let row = 0; row < this.reels.length; row++) {
      for (let col = 0; col < this.reels[row].length; col++) {
        const allSymbols = [...SYMBOLS.baseSymbols];
        
        // Dodawanie symboli specjalnych z pewnym prawdopodobieństwem
        if (Phaser.Math.Between(0, 9) === 0) allSymbols.push('wild');
        if (Phaser.Math.Between(0, 12) === 0) allSymbols.push('scatter');
        if (Phaser.Math.Between(0, 20) === 0) allSymbols.push('curse');
    
        const randomSymbol = Phaser.Math.RND.pick(allSymbols);
        this.reels[row][col].setTexture(randomSymbol);
      }
    }
  }
  
  _checkWins() {
    let totalWin = 0;
    
    for (let line of PAYLINES) {
      const firstSymbol = this.reels[line[0]][0].texture.key;
      let matchCount = 1;
      
      for (let i = 1; i < line.length; i++) {
        const row = line[i];
        const symbol = this.reels[row][i].texture.key;
        if (symbol === firstSymbol) matchCount++;
        else break;
      }
      
      if (matchCount >= 3) {
        const winAmount = matchCount * 100;
        totalWin += winAmount;
        this._highlightPayline(line);
      }
    }
    
    if (totalWin > 0) {
      this.scene.balance += totalWin;
      this.scene.uiManager.updateBalanceText();
      this.scene.uiManager.updateWinText(totalWin);
      this.scene.uiManager.showWinText();
    } else {
      this.scene.uiManager.updateWinText(0);
    }
  }
  
  _highlightPayline(line) {
    const graphics = this.scene.add.graphics();
    graphics.lineStyle(5, 0xffff00, 1);
    graphics.setDepth(5);
    
    const positions = [];
    
    for (let col = 0; col < line.length; col++) {
      const row = line[col];
      const symbol = this.reels[row][col];
      positions.push({ x: symbol.x, y: symbol.y });
    }
    
    graphics.beginPath();
    graphics.moveTo(positions[0].x, positions[0].y);
    for (let i = 1; i < positions.length; i++) {
      graphics.lineTo(positions[i].x, positions[i].y);
    }
    graphics.strokePath();
    
    this.scene.winLines.push(graphics);
  }
}
