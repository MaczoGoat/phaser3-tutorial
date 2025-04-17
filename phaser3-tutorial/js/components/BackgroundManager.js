export class BackgroundManager {
    constructor(scene) {
      this.scene = scene;
    }
    
    createBackground() {
      // Główne tło
      this.scene.add.image(0, 0, 'bg')
        .setOrigin(0)
        .setDisplaySize(this.scene.scale.width, this.scene.scale.height)
        .setDepth(0);
      
      this.createFogEffects();
      this.createFrame();
      this.createLogo();
    }
    
    createFogEffects() {
      // Lewy dym
      const fogLeft = this.scene.add.image(-150, this.scene.scale.height / 2, 'fog')
        .setOrigin(0, 0.5)
        .setAlpha(0.2)
        .setDisplaySize(this.scene.scale.width / 2, this.scene.scale.height)
        .setDepth(1);
      
      // Prawy dym
      const fogRight = this.scene.add.image(this.scene.scale.width + 150, this.scene.scale.height / 2, 'fog')
        .setOrigin(1, 0.5)
        .setAlpha(0.2)
        .setDisplaySize(this.scene.scale.width / 2, this.scene.scale.height)
        .setDepth(1);
      
      // Animacja dymu
      this.scene.tweens.add({
        targets: fogLeft,
        x: '-=50',
        duration: 6000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
      });
      
      this.scene.tweens.add({
        targets: fogRight,
        x: '+=50',
        duration: 6000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
      });
    }
    
    createFrame() {
      this.scene.add.image(this.scene.scale.width / 2, this.scene.scale.height / 2, 'rama')
        .setOrigin(0.5)
        .setDepth(1.5)
        .setScale(1.2);
    }
    
    createLogo() {
      this.scene.add.image(this.scene.scale.width / 2, 100, 'logo')
        .setOrigin(0.5)
        .setScale(0.3)
        .setDepth(2);
    }
  }
  