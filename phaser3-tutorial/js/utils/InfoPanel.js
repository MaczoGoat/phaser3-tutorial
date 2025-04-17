export class InfoPanel {
    constructor(scene) {
      this.scene = scene;
    }
    
    show() {
      if (this.scene.infoOpen) return;
      this.scene.infoOpen = true;
      
      const overlay = this.scene.add.image(
        this.scene.cameras.main.centerX, 
        this.scene.cameras.main.centerY, 
        'ramaInfo'
      )
        .setOrigin(0.5)
        .setDepth(10)
        .setScale(1);
      
      const infoText = this.scene.add.text(
        this.scene.cameras.main.centerX, 
        this.scene.cameras.main.centerY,
        'Zasady gry:\n- Traf 3 symbole w rzędzie\n- Zakład pobierany przed spinem\n- Wygrane dodawane do salda',
        {
          fontSize: '24px',
          color: '#ffffff',
          align: 'center',
          wordWrap: { width: 800 }
        }
      )
        .setOrigin(0.5)
        .setDepth(11);
      
      const closeButton = this.scene.add.image(
        this.scene.cameras.main.centerX + overlay.displayWidth / 2 - 180,
        this.scene.cameras.main.centerY - overlay.displayHeight / 2 + 160,
        'ramaInfoX'
      )
        .setOrigin(0.5)
        .setDepth(12)
        .setInteractive()
        .setScale(0.35);
      
      closeButton.on('pointerdown', () => {
        overlay.destroy();
        infoText.destroy();
        closeButton.destroy();
        this.scene.infoOpen = false;
      });
      
      closeButton.on('pointerover', () => closeButton.setTint(0xffaaaa));
      closeButton.on('pointerout', () => closeButton.clearTint());
    }
  }
  