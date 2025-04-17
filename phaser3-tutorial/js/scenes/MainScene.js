import { SYMBOLS, PAYLINES } from '../config.js';
import { ReelManager } from '../components/ReelManager.js';
import { UIManager } from '../components/UIManager.js';
import { BackgroundManager } from '../components/BackgroundManager.js';
import { AssetLoader } from '../utils/AssetLoader.js';

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
    
    // Stan gry
    this.balance = 1000;
    this.betAmount = 100;
    this.soundOn = true;
    this.autoMode = false;
    this.infoOpen = false;
    this.betOptionsOpen = false;
    this.winLines = [];
    this.volume = 1;
  }
  
  preload() {
    // Delegowanie wczytywania zasobów do specjalizowanej klasy
    this.assetLoader = new AssetLoader(this);
    this.assetLoader.loadAllAssets();
  }
  
  create() {
    // Inicjalizacja tła
    this.backgroundManager = new BackgroundManager(this);
    this.backgroundManager.createBackground();
    
    // Inicjalizacja mechaniki bębnów
    this.reelManager = new ReelManager(this);
    this.reelManager.createReels();
    
    // Inicjalizacja UI
    this.uiManager = new UIManager(this);
    this.uiManager.createUI();
  }
}
