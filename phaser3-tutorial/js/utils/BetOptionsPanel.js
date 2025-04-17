import { STAKE_DATA } from '../config.js';

export class BetOptionsPanel {
  constructor(scene) {
    this.scene = scene;
  }
  
  show() {
    if (this.scene.betOptionsOpen) return;
    this.scene.betOptionsOpen = true;
    
    const overlay = this.scene.add.image(
      this.scene.cameras.main.centerX, 
      this.scene.cameras.main.centerY, 
      'ramaInfo'
    )
      .setOrigin(0.5)
      .setDepth(10);
    
    const closeButton = this.scene.add.image(
      this.scene.cameras.main.centerX + overlay.displayWidth / 2 - 180,
      this.scene.cameras.main.centerY - overlay.displayHeight / 2 + 160,
      'ramaInfoX'
    )
      .setOrigin(0.5)
      .setDepth(12)
      .setInteractive()
      .setScale(0.35);
    
    const stakeButtons = [];
    
    const destroyBetOverlay = () => {
      overlay.destroy();
      stakeButtons.forEach(btn => btn.destroy());
      closeButton.destroy();
      this.scene.betOptionsOpen = false;
    };
    
    closeButton.on('pointerdown', destroyBetOverlay);
    closeButton.on('pointerover', () => closeButton.setTint(0xffaaaa));
    closeButton.on('pointerout', () => closeButton.clearTint());
    
    const startX = this.scene.cameras.main.centerX - 400;
    const startY = this.scene.cameras.main.centerY - 220;
    const spacingX = 200;
    const spacingY = 150;
    
    STAKE_DATA.forEach((stake, index) => {
      const col = index % 5;
      const row = Math.floor(index / 5);
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;
      
      const button = this.scene.add.image(x, y, stake.key)
        .setInteractive()
        .setOrigin(0.5)
        .setDepth(11)
        .setScale(0.9)
        .setTint(0xbbeeff)
        .setAlpha(1);
      
      button.on('pointerdown', () => button.setScale(0.95));
      button.on('pointerup', () => {
        button.setScale(0.9);
        this.scene.betAmount = stake.value;
        this.scene.uiManager.betText.setText(`${this.scene.betAmount}`);
        destroyBetOverlay();
      });
      button.on('pointerout', () => button.setScale(0.9));
      
      stakeButtons.push(button);
    });
  }
}
