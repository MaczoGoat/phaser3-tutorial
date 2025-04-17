export class VolumeManager {
    constructor(scene) {
      this.scene = scene;
      this.volumeOverlay = null;
      this.volumeBar = null;
      this.volumeHandle = null;
    }
    
    getVolumeTexture() {
      if (this.scene.volume > 0.5) return 'rbuttonFull';
      else if (this.scene.volume > 0.25) return 'rbuttonHalf';
      else return 'rbuttonNone';
    }
    
    updateVolumeIcon(soundButton) {
      const newTexture = this.getVolumeTexture();
      soundButton.setTexture(newTexture);
    }
    
    toggleVolumeSlider(soundButton) {
      // Jeśli już jest slider, ukryj go
      if (this.volumeOverlay) {
        this.volumeOverlay.destroy();
        this.volumeBar.destroy();
        this.volumeHandle.destroy();
        this.volumeOverlay = null;
      } else {
        this.showVolumeSlider(soundButton);
      }
    }
    
    showVolumeSlider(soundButton) {
      const barX = this.scene.cameras.main.centerX - 670;
      const barY = this.scene.cameras.main.height - 170;
      const barWidth = 150;
      const barHeight = 10;
      
      // Tło
      this.volumeOverlay = this.scene.add.rectangle(barX, barY, barWidth, barHeight, 0x222222)
        .setOrigin(0, 0.5)
        .setDepth(10);
      
      // Pasek aktywny
      this.volumeBar = this.scene.add.rectangle(barX, barY, barWidth * this.scene.volume, barHeight, 0xffaa00)
        .setOrigin(0, 0.5)
        .setDepth(11);
      
      // Suwak
      this.volumeHandle = this.scene.add.circle(barX + barWidth * this.scene.volume, barY, 10, 0xffffff)
        .setInteractive({ draggable: true, useHandCursor: true })
        .setDepth(12);
      
      this.scene.input.setDraggable(this.volumeHandle);
      
      this.volumeHandle.on('drag', (pointer, dragX) => {
        const clampedX = Phaser.Math.Clamp(dragX, barX, barX + barWidth);
        this.volumeHandle.x = clampedX;
        this.scene.volume = (clampedX - barX) / barWidth;
        this.volumeBar.width = barWidth * this.scene.volume;
        
        this.updateVolumeIcon(soundButton);
        console.log('Nowa głośność:', this.scene.volume.toFixed(2));
      });
      
      this.volumeOverlay.setInteractive().on('pointerdown', (pointer) => {
        const localX = Phaser.Math.Clamp(pointer.x, barX, barX + barWidth);
        this.volumeHandle.x = localX;
        this.scene.volume = (localX - barX) / barWidth;
        this.volumeBar.width = barWidth * this.scene.volume;
        
        this.updateVolumeIcon(soundButton);
        console.log('Klik głośność:', this.scene.volume.toFixed(2));
      });
    }
  }
  