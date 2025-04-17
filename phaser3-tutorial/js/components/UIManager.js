import { STAKE_DATA } from '../config.js';
import { VolumeManager } from '../utils/VolumeManager.js';
import { InfoPanel } from '../utils/InfoPanel.js';
import { BetOptionsPanel } from '../utils/BetOptionsPanel.js';

export class UIManager {
  constructor(scene) {
    this.scene = scene;
    
    // Referencje do elementów UI
    this.balanceText = null;
    this.betText = null;
    this.winText = null;
    
    // Inicjalizacja zarządców
    this.volumeManager = new VolumeManager(scene);
    this.infoPanel = new InfoPanel(scene);
    this.betOptionsPanel = new BetOptionsPanel(scene);
  }
  
  createUI() {
    // Tło menu
    this.scene.add.image(this.scene.cameras.main.centerX, this.scene.cameras.main.height - 115, 'menuBar')
      .setOrigin(0.5)
      .setScale(1)
      .setDepth(3);
    
    this.createSpinButton();
    this.createBalanceDisplay();
    this.createBetDisplay();
    this.createWinDisplay();
    this.createAutoButton();
    this.createTurboButton();
    this.createInfoButton();
    this.createSoundButton();
  }
  
  createSpinButton() {
    const spinButton = this.scene.add.image(
      this.scene.cameras.main.centerX, 
      this.scene.cameras.main.height - 115, 
      'spin'
    )
      .setOrigin(0.5)
      .setInteractive()
      .setScale(0.19)
      .setDepth(4);
    
    spinButton.on('pointerdown', () => spinButton.setScale(0.18));
    spinButton.on('pointerup', () => {
      spinButton.setScale(0.19);
      this.scene.reelManager.spinReels();
    });
  }
  
  createBalanceDisplay() {
    this.scene.add.image(
      this.scene.cameras.main.centerX - 460, 
      this.scene.cameras.main.height - 108, 
      'buttonsMenu'
    )
      .setOrigin(0.5)
      .setScale(0.11)
      .setDepth(3);
    
    this.scene.add.text(
      this.scene.cameras.main.centerX - 460, 
      this.scene.cameras.main.height - 120, 
      'Saldo:', 
      {
        fontFamily: 'Merriweather',
        fontSize: '20px',
        color: '#eca321'
      }
    )
      .setOrigin(0.5)
      .setDepth(4);
    
    this.balanceText = this.scene.add.text(
      this.scene.cameras.main.centerX - 460, 
      this.scene.cameras.main.height - 100, 
      `${this.scene.balance}`, 
      {
        fontFamily: 'Merriweather',
        fontSize: '20px',
        color: '#eca321'
      }
    )
      .setOrigin(0.5)
      .setDepth(4);
  }
  
  createBetDisplay() {
    const betBg = this.scene.add.image(
      this.scene.cameras.main.centerX - 253, 
      this.scene.cameras.main.height - 108, 
      'buttonsMenu'
    )
      .setOrigin(0.5)
      .setScale(0.11)
      .setDepth(3)
      .setInteractive();
    
    const betLabel = this.scene.add.text(
      this.scene.cameras.main.centerX - 253, 
      this.scene.cameras.main.height - 120, 
      'Stawka:', 
      {
        fontFamily: 'Merriweather',
        fontSize: '20px',
        color: '#eca321'
      }
    )
      .setOrigin(0.5)
      .setDepth(4);
    
    this.betText = this.scene.add.text(
      this.scene.cameras.main.centerX - 253, 
      this.scene.cameras.main.height - 100, 
      `${this.scene.betAmount}`, 
      {
        fontFamily: 'Merriweather',
        fontSize: '20px',
        color: '#eca321'
      }
    )
      .setOrigin(0.5)
      .setDepth(4);
    
    betBg.on('pointerdown', () => {
      betBg.setScale(0.105);
      betLabel.setScale(0.95);
      this.betText.setScale(0.95);
    });
    
    betBg.on('pointerup', () => {
      betBg.setScale(0.11);
      betLabel.setScale(1);
      this.betText.setScale(1);
      this.betOptionsPanel.show();
    });
    
    betBg.on('pointerout', () => {
      betBg.setScale(0.11);
      betLabel.setScale(1);
      this.betText.setScale(1);
    });
  }
  
  createWinDisplay() {
    this.scene.add.image(
      this.scene.cameras.main.centerX + 248, 
      this.scene.cameras.main.height - 108, 
      'buttonsMenu'
    )
      .setOrigin(0.5)
      .setScale(0.11)
      .setDepth(3);
    
    const winLabel = this.scene.add.text(
      this.scene.cameras.main.centerX + 248, 
      this.scene.cameras.main.height - 120, 
      'WIN:', 
      {
        fontFamily: 'Merriweather',
        fontSize: '20px',
        color: '#eca321'
      }
    )
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(4);
    
    this.winText = this.scene.add.text(
      this.scene.cameras.main.centerX + 248, 
      this.scene.cameras.main.height - 100, 
      '0', 
      {
        fontFamily: 'Merriweather',
        fontSize: '20px',
        color: '#eca321'
      }
    )
      .setOrigin(0.5)
      .setInteractive()
      .setDepth(4);
  }
  
  createAutoButton() {
    const autoBg = this.scene.add.image(
      this.scene.cameras.main.centerX + 455, 
      this.scene.cameras.main.height - 108, 
      'buttonsMenu'
    )
      .setOrigin(0.5)
      .setScale(0.11)
      .setDepth(3)
      .setInteractive();
    
    const autoButton = this.scene.add.text(
      this.scene.cameras.main.centerX + 455, 
      this.scene.cameras.main.height - 108, 
      'AUTO', 
      {
        fontFamily: 'Merriweather',
        fontSize: '20px',
        color: '#eca321'
      }
    )
      .setOrigin(0.5)
      .setDepth(4);
    
    autoBg.on('pointerdown', () => {
      autoBg.setScale(0.105);
      autoButton.setScale(0.95);
    });
    
    autoBg.on('pointerup', () => {
      autoBg.setScale(0.11);
      autoButton.setScale(1);
      this.scene.autoMode = !this.scene.autoMode;
      autoButton.setColor(this.scene.autoMode ? '#22aa22' : '#eca321');
      
      if (this.scene.autoMode) this.startAutoSpin();
      else this.stopAutoSpin();
    });
    
    autoBg.on('pointerout', () => {
      autoBg.setScale(0.11);
      autoButton.setScale(1);
    });
  }
  
  createTurboButton() {
    const turboBg = this.scene.add.image(
      this.scene.cameras.main.centerX + 618, 
      this.scene.cameras.main.height - 108, 
      'turbo'
    )
      .setOrigin(0.5)
      .setScale(0.1)
      .setDepth(3)
      .setInteractive();
    
    const turboButton = this.scene.add.text(
      this.scene.cameras.main.centerX + 618, 
      this.scene.cameras.main.height - 108, 
      'TURBO', 
      {
        fontFamily: 'Merriweather',
        fontSize: '20px',
        color: '#eca321'
      }
    )
      .setOrigin(0.5)
      .setDepth(4);
    
    turboBg.on('pointerdown', () => {
      turboBg.setScale(0.095);
      turboButton.setScale(0.95);
    });
    
    turboBg.on('pointerup', () => {
      turboBg.setScale(0.1);
      turboButton.setScale(1);
      // Logika turbo w przyszłości
    });
    
    turboBg.on('pointerout', () => {
      turboBg.setScale(0.1);
      turboButton.setScale(1);
    });
  }
  
  createInfoButton() {
    const infoButton = this.scene.add.image(
      this.scene.cameras.main.centerX - 645, 
      this.scene.cameras.main.height - 107, 
      'lbutton'
    )
      .setInteractive()
      .setOrigin(0.5)
      .setScale(0.08)
      .setDepth(4);
    
    infoButton.on('pointerdown', () => {
      infoButton.setScale(0.07);
    });
    
    infoButton.on('pointerup', () => {
      infoButton.setScale(0.08);
      this.infoPanel.show();
    });
    
    infoButton.on('pointerover', () => infoButton.setTint(0xffffaa));
    infoButton.on('pointerout', () => infoButton.clearTint());
  }
  
  createSoundButton() {
    const soundButton = this.scene.add.image(
      this.scene.cameras.main.centerX - 599, 
      this.scene.cameras.main.height - 107, 
      this.volumeManager.getVolumeTexture()
    )
      .setInteractive()
      .setOrigin(0.5)
      .setScale(0.08)
      .setDepth(4);
    
    soundButton.on('pointerdown', () => {
      soundButton.setScale(0.07);
    });
    
    soundButton.on('pointerup', () => {
      soundButton.setScale(0.08);
      this.volumeManager.toggleVolumeSlider(soundButton);
    });
    
    soundButton.on('pointerover', () => soundButton.setTint(0xffffaa));
    soundButton.on('pointerout', () => soundButton.clearTint());
  }
  
  updateBalanceText() {
    this.balanceText.setText(`${this.scene.balance}`);
  }
  
  updateWinText(amount) {
    this.winText.setText(`${amount}`);
  }
  
  showWinText() {
    const text = this.scene.add.text(
      this.scene.cameras.main.centerX, 
      this.scene.cameras.main.centerY + 150, 
      'WYGRANA!', 
      {
        fontSize: '48px', 
        color: '#00ff00', 
        fontStyle: 'bold'
      }
    )
      .setOrigin(0.5)
      .setDepth(5);
    
    this.scene.time.delayedCall(2000, () => text.destroy());
  }
  
  startAutoSpin() {
    if (this.scene.autoTimer) return;
    
    this.scene.autoTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.reelManager.spinReels();
      },
      callbackScope: this.scene,
      loop: true
    });
  }
  
  stopAutoSpin() {
    if (this.scene.autoTimer) {
      this.scene.autoTimer.remove(false);
      this.scene.autoTimer = null;
    }
  }
}
