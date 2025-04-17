import { SYMBOLS, STAKE_DATA } from '../config.js';

export class AssetLoader {
  constructor(scene) {
    this.scene = scene;
  }
  
  loadAllAssets() {
    this.loadBackgroundAssets();
    this.loadSymbolAssets();
    this.loadUIAssets();
    this.loadStakeAssets();
  }
  
  loadBackgroundAssets() {
    this.scene.load.image('bg', '/assets/bg.png');
    this.scene.load.image('fog', '/assets/fog.png');
    this.scene.load.image('rama', '/assets/rama.png');
  }
  
  loadSymbolAssets() {
    // Wczytanie wszystkich symboli podstawowych
    SYMBOLS.baseSymbols.forEach(symbol => {
      this.scene.load.image(symbol, `/assets/${symbol}.png`);
    });
    
    // Wczytanie symboli specjalnych
    SYMBOLS.special.forEach(symbol => {
      this.scene.load.image(symbol, `/assets/${symbol}.png`);
    });
  }
  
  loadUIAssets() {
    this.scene.load.image('menuBar', '/assets/menu.png');
    this.scene.load.image('logo', '/assets/logo.png');
    this.scene.load.image('lbutton', '/assets/lbutton.png');
    this.scene.load.image('rbuttonNone', '/assets/rbuttonNone.png');
    this.scene.load.image('rbuttonHalf', '/assets/rbuttonHalf.png');
    this.scene.load.image('rbuttonFull', '/assets/rbuttonFull.png');
    this.scene.load.image('ramaInfo', '/assets/ramaInfo.png');
    this.scene.load.image('ramaInfoX', '/assets/ramaInfoX.png');
    this.scene.load.image('buttonsMenu', '/assets/buttonsMenu.png');
    this.scene.load.image('turbo', '/assets/turbo.png');
    this.scene.load.image('spin', '/assets/spin.png');
    this.scene.load.image('ramaBet', '/assets/ramaBet.png');
  }
  
  loadStakeAssets() {
    STAKE_DATA.forEach(stake => {
      this.scene.load.image(stake.key, `/assets/Stawki/${stake.value.toFixed(2).replace('.', ',')}.png`);
    });
  }
}
