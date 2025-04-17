import { config } from './config.js';
import { MainScene } from './scenes/MainScene.js';

// Dodajemy scenę do konfiguracji
config.scene = [MainScene];

// Inicjalizacja gry
const game = new Phaser.Game(config);
