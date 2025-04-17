// Główna konfiguracja gry Phaser
const config = {
  type: Phaser.AUTO,
  backgroundColor: '#1d1d1d',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080
  },
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

let reels = [];
let balance = 1000;
let betAmount = 100;
let balanceText;
let betText;
let betOverlay;
let soundOn = true;
let soundIcon;
let winText;
let autoMode = false;
let infoOpen = false;
let betOptionsOpen = false;
let autoTimer;
let winLines = [];
let volume = 1;
let volumeOverlay;
let volumeBar;
let volumeHandle;


const baseSymbols = [
  'symbolZ', 'symbolP', 'symbolF', // niskie
  'symbolT', 'symbolC', 'symbolA', // średnie
  'symbolW', 'symbolZK', 'symbolRK' // wysokie
];


// Definicja 25 linii wygrywających
const paylines = [
  [0, 0, 0, 0, 0], // 1
  [1, 1, 1, 1, 1], // 2
  [2, 2, 2, 2, 2], // 3
  [0, 1, 2, 1, 0], // 4
  [2, 1, 0, 1, 2], // 5
  [0, 0, 1, 0, 0], // 6
  [2, 2, 1, 2, 2], // 7
  [1, 0, 0, 1, 2], // 8
  [1, 2, 2, 1, 0], // 9
  [0, 1, 1, 1, 0], // 10
  [2, 1, 1, 1, 2], // 11
  [0, 1, 0, 1, 0], // 12
  [2, 1, 2, 1, 2], // 13
  [0, 1, 2, 1, 0], // 14
  [2, 1, 0, 1, 2], // 15
  [1, 0, 1, 2, 1], // 16
  [1, 2, 1, 0, 1], // 17
  [0, 0, 2, 2, 0], // 18
  [2, 2, 0, 0, 2], // 19
  [1, 1, 0, 1, 1], // 20
  [1, 1, 2, 1, 1], // 21
  [0, 2, 0, 2, 0], // 22
  [2, 0, 2, 0, 2], // 23
  [1, 0, 2, 0, 1], // 24
  [1, 2, 0, 2, 1]  // 25
];


function preload() {
  
  this.load.image('bg', '/assets/bg.png');
  this.load.image('fog', '/assets/fog.png');
  this.load.image('symbolZ', '/assets/symbolZ.png');
  this.load.image('symbolP', '/assets/symbolP.png');
  this.load.image('symbolF', '/assets/symbolF.png');
  this.load.image('symbolT', '/assets/symbolT.png');
  this.load.image('symbolC', '/assets/symbolC.png');
  this.load.image('symbolA', '/assets/symbolA.png');
  this.load.image('symbolW', '/assets/symbolW.png');
  this.load.image('symbolZK', '/assets/symbolZK.png');
  this.load.image('symbolRK', '/assets/symbolRK.png');
  this.load.image('wild', '/assets/wild.png');
  this.load.image('scatter', '/assets/scatter.png');
  this.load.image('curse', '/assets/curse.png');
  this.load.image('menuBar', '/assets/menu.png');  
  this.load.image('logo', '/assets/logo.png');
  this.load.image('rama', 'assets/rama.png');
  this.load.image('lbutton', 'assets/lbutton.png');
  this.load.image('rbuttonNone', 'assets/rbuttonNone.png');
  this.load.image('rbuttonHalf', 'assets/rbuttonHalf.png');
  this.load.image('rbuttonFull', 'assets/rbuttonFull.png');
  this.load.image('ramaInfo', 'assets/ramaInfo.png');
  this.load.image('ramaInfoX', 'assets/ramaInfoX.png');
  this.load.image('buttonsMenu', 'assets/buttonsMenu.png');
  this.load.image('turbo', 'assets/turbo.png');
  this.load.image('spin', 'assets/spin.png');
  this.load.image('ramaBet', 'assets/ramaBet.png');
 
this.load.image('stake_0.25', 'assets/Stawki/0,25.png');
this.load.image('stake_0.50', 'assets/Stawki/0,50.png');
this.load.image('stake_0.75', 'assets/Stawki/0,75.png');
this.load.image('stake_1.00', 'assets/Stawki/1,00.png');
this.load.image('stake_1.25', 'assets/Stawki/1,25.png');
this.load.image('stake_2.00', 'assets/Stawki/2,00.png');
this.load.image('stake_2.50', 'assets/Stawki/2,50.png');
this.load.image('stake_3.75', 'assets/Stawki/3,75.png');
this.load.image('stake_5.00', 'assets/Stawki/5,00.png');
this.load.image('stake_7.50', 'assets/Stawki/7,50.png');
this.load.image('stake_10.00', 'assets/Stawki/10,00.png');
this.load.image('stake_12.50', 'assets/Stawki/12,50.png');
this.load.image('stake_20.00', 'assets/Stawki/20,00.png');
this.load.image('stake_25.00', 'assets/Stawki/25,00.png');
this.load.image('stake_37.50', 'assets/Stawki/37,50.png');
this.load.image('stake_50.00', 'assets/Stawki/50,00.png');
this.load.image('stake_75.00', 'assets/Stawki/75,00.png');
this.load.image('stake_100.00', 'assets/Stawki/100,00.png');
this.load.image('stake_125.00', 'assets/Stawki/125,00.png');
this.load.image('stake_200.00', 'assets/Stawki/200,00.png');

}

function getVolumeTexture() {
  if (volume > 0.5) return 'rbuttonFull';
  else if (volume > 0.25) return 'rbuttonHalf';
  else return 'rbuttonNone';
}

function updateVolumeIcon(soundButton) {
  const newTexture = getVolumeTexture();
  soundButton.setTexture(newTexture);
}

function create() {

  this.add.image(this.scale.width / 2, 100, 'logo')
  .setOrigin(0.5)
  .setScale(0.3)
  .setDepth(2); // nad tłem, ale pod symbolami

  this.add.image(0, 0, 'bg').setOrigin(0).setDisplaySize(this.scale.width, this.scale.height).setDepth(0);

  // Lewy dym
  const fogLeft = this.add.image(-150, this.scale.height / 2, 'fog')
  .setOrigin(0, 0.5)
.setAlpha(0.2)
.setDisplaySize(this.scale.width / 2, this.scale.height)
.setDepth(1);

// Prawy dym
const fogRight = this.add.image(this.scale.width + 150, this.scale.height / 2, 'fog')
.setOrigin(1, 0.5)
.setAlpha(0.2)
.setDisplaySize(this.scale.width / 2, this.scale.height)
.setDepth(1);


this.tweens.add({
  targets: fogLeft,
  x: '-=50',
  duration: 6000,
  ease: 'Sine.easeInOut',
  yoyo: true,
  repeat: -1
});

this.tweens.add({
  targets: fogRight,
  x: '+=50',
  duration: 6000,
  ease: 'Sine.easeInOut',
  yoyo: true,
  repeat: -1
});



  const symbols = [
    'symbolZ', 'symbolP', 'symbolF', // niskie
    'symbolT', 'symbolC', 'symbolA', // średnie
    'symbolW', 'symbolZK', 'symbolRK' // wysokie
  ];
    const rows = 3;
  const cols = 5;
  const spacingX = 240; // lub np. 260
  const spacingY = 200; // zostaw jak było
  const startX = this.cameras.main.centerX - (cols * spacingX / 2) + spacingX / 2;
  const startY = this.cameras.main.centerY - (rows * spacingY / 2) + spacingY / 2;

  for (let row = 0; row < rows; row++) {
    reels[row] = [];
    for (let col = 0; col < cols; col++) {
      const randomSymbol = Phaser.Math.RND.pick(symbols);
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;
      const symbol = this.add.image(x, y, randomSymbol).setScale(0.2).setDepth(2);
      reels[row][col] = symbol;
    }
  }

  this.add.image(this.cameras.main.centerX, this.cameras.main.height - 115, 'menuBar').setOrigin(0.5).setScale(1).setDepth(3);

  const spinButton = this.add.image(this.cameras.main.centerX, this.cameras.main.height - 115, 'spin')
  .setOrigin(0.5)
  .setInteractive()
  .setScale(0.19) // dopasuj wedle uznania
  .setDepth(4);

spinButton.on('pointerdown', () => spinButton.setScale(0.18));
spinButton.on('pointerup', () => {
  spinButton.setScale(0.19);
  spinReels(this);
});


// SALDO
this.add.image(this.cameras.main.centerX - 460, this.cameras.main.height - 108, 'buttonsMenu')
  .setOrigin(0.5)
  .setScale(0.11)
  .setDepth(3);
// SALDO (napis)
this.add.text(this.cameras.main.centerX - 460, this.cameras.main.height - 120, 'Saldo:', {
  fontFamily: 'Merriweather',
  fontSize: '20px',
  color: '#eca321'
}).setOrigin(0.5).setDepth(4);

// SALDO (wartość)
balanceText = this.add.text(this.cameras.main.centerX - 460, this.cameras.main.height - 100, `${balance}`, {
  fontFamily: 'Merriweather',
  fontSize: '20px',
  color: '#eca321'
}).setOrigin(0.5).setDepth(4);


// STAWKA (tło)
const betBg = this.add.image(this.cameras.main.centerX - 253, this.cameras.main.height - 108, 'buttonsMenu')
  .setOrigin(0.5)
  .setScale(0.11)
  .setDepth(3)
  .setInteractive();

// STAWKA (napis górny)
const betLabel = this.add.text(this.cameras.main.centerX - 253, this.cameras.main.height - 120, 'Stawka:', {
  fontFamily: 'Merriweather',
  fontSize: '20px',
  color: '#eca321'
}).setOrigin(0.5).setDepth(4);

// STAWKA (wartość)
betText = this.add.text(this.cameras.main.centerX - 253, this.cameras.main.height - 100, `${betAmount}`, {
  fontFamily: 'Merriweather',
  fontSize: '20px',
  color: '#eca321'
}).setOrigin(0.5).setDepth(4);

// 👉 Dodaj interaktywność tła — działa jako „przycisk” dla całego guzika STAWKA
betBg.on('pointerdown', () => {
  betBg.setScale(0.105);
  betLabel.setScale(0.95);
  betText.setScale(0.95);
});

betBg.on('pointerup', () => {
  betBg.setScale(0.11);
  betLabel.setScale(1);
  betText.setScale(1);
  showBetOptions(this); // otwarcie okna stawek
});

betBg.on('pointerout', () => {
  betBg.setScale(0.11);
  betLabel.setScale(1);
  betText.setScale(1);
});

  

// WIN
this.add.image(this.cameras.main.centerX + 248, this.cameras.main.height - 108, 'buttonsMenu')
  .setOrigin(0.5)
  .setScale(0.11)
  .setDepth(3);
// WIN (napis)
const winLabel = this.add.text(this.cameras.main.centerX + 248, this.cameras.main.height - 120, 'WIN:', {
  fontFamily: 'Merriweather',
  fontSize: '20px',
  color: '#eca321'
}).setOrigin(0.5).setInteractive().setDepth(4);

// WIN (wartość)
winText = this.add.text(this.cameras.main.centerX + 248, this.cameras.main.height - 100, '0', {
  fontFamily: 'Merriweather',
  fontSize: '20px',
  color: '#eca321'
}).setOrigin(0.5).setInteractive().setDepth(4);


// AUTO (tło)
const autoBg = this.add.image(this.cameras.main.centerX + 455, this.cameras.main.height - 108, 'buttonsMenu')
  .setOrigin(0.5)
  .setScale(0.11)
  .setDepth(3)
  .setInteractive();

// AUTO (tekst)
const autoButton = this.add.text(this.cameras.main.centerX + 455, this.cameras.main.height - 108, 'AUTO', {
  fontFamily: 'Merriweather',
  fontSize: '20px',
  color: '#eca321'
}).setOrigin(0.5).setDepth(4);

// 👉 Kliknięcie przycisku AUTO
autoBg.on('pointerdown', () => {
  autoBg.setScale(0.105);
  autoButton.setScale(0.95);
});

autoBg.on('pointerup', () => {
  autoBg.setScale(0.11);
  autoButton.setScale(1);
  autoMode = !autoMode;
  autoButton.setColor(autoMode ? '#22aa22' : '#eca321');
  if (autoMode) startAutoSpin(this);
  else stopAutoSpin();
});

autoBg.on('pointerout', () => {
  autoBg.setScale(0.11);
  autoButton.setScale(1);
});


// TURBO (tło)
const turboBg = this.add.image(this.cameras.main.centerX + 618, this.cameras.main.height - 108, 'turbo')
  .setOrigin(0.5)
  .setScale(0.1)
  .setDepth(3)
  .setInteractive();

// TURBO (tekst)
const turboButton = this.add.text(this.cameras.main.centerX + 618, this.cameras.main.height - 108, 'TURBO', {
  fontFamily: 'Merriweather',
  fontSize: '20px',
  color: '#eca321'
}).setOrigin(0.5).setDepth(4);

// 👉 Efekt kliknięcia (bez logiki)
turboBg.on('pointerdown', () => {
  turboBg.setScale(0.095);
  turboButton.setScale(0.95);
});
turboBg.on('pointerup', () => {
  turboBg.setScale(0.1);
  turboButton.setScale(1);
  // 🔜 tutaj można dodać logikę TURBO w przyszłości
});
turboBg.on('pointerout', () => {
  turboBg.setScale(0.1);
  turboButton.setScale(1);
});



// Lewy przycisk (info)
const infoButton = this.add.image(this.cameras.main.centerX - 645, this.cameras.main.height - 107, 'lbutton')
  .setInteractive()
  .setOrigin(0.5)
  .setScale(0.08)
  .setDepth(4);

infoButton.on('pointerdown', () => {
  infoButton.setScale(0.07); // kliknięcie
});
infoButton.on('pointerup', () => {
  infoButton.setScale(0.08);
  showInfo(this);
});
infoButton.on('pointerover', () => infoButton.setTint(0xffffaa)); // opcjonalne rozjaśnienie
infoButton.on('pointerout', () => infoButton.clearTint());

const soundButton = this.add.image(this.cameras.main.centerX - 599, this.cameras.main.height - 107, getVolumeTexture())
  .setInteractive()
  .setOrigin(0.5)
  .setScale(0.08)
  .setDepth(4);

  soundButton.on('pointerdown', () => {
    soundButton.setScale(0.07);
  });
  soundButton.on('pointerup', () => {
    soundButton.setScale(0.08);
  
    // Jeśli już jest slider, ukryj go
    if (volumeOverlay) {
      volumeOverlay.destroy();
      volumeBar.destroy();
      volumeHandle.destroy();
      volumeOverlay = null;
    } else {
      showVolumeSlider(this, soundButton);
    }
  });
  soundButton.on('pointerover', () => soundButton.setTint(0xffffaa));
  soundButton.on('pointerout', () => soundButton.clearTint());
  


  const frame = this.add.image(this.scale.width / 2, this.scale.height / 2, 'rama')
  .setOrigin(0.5)
  .setDepth(1.5) // pomiędzy tłem (0), a symbolami (2)
  .setScale(1.2);  // możesz dopasować rozmiar
}

function highlightPayline(scene, line) {
  const graphics = scene.add.graphics();
  graphics.lineStyle(5, 0xffff00, 1); // żółta linia
  graphics.setDepth(5); // ⬅️ NAJWAŻNIEJSZE — wyżej niż symbole i tło

  const positions = [];

  for (let col = 0; col < line.length; col++) {
    const row = line[col];
    const symbol = reels[row][col];
    positions.push({ x: symbol.x, y: symbol.y });
  }

  graphics.beginPath();
  graphics.moveTo(positions[0].x, positions[0].y);
  for (let i = 1; i < positions.length; i++) {
    graphics.lineTo(positions[i].x, positions[i].y);
  }
  graphics.strokePath();

  winLines.push(graphics);
}


function spinReels(scene) {
  // 🔁 Usuń stare linie wygrane
  winLines.forEach(g => g.destroy());
  winLines = [];

  if (balance < betAmount) {
    alert('Brak środków!');
    return;
  }

  balance -= betAmount;
  balanceText.setText(`${balance}`);

  for (let row = 0; row < reels.length; row++) {
    for (let col = 0; col < reels[row].length; col++) {
      const allSymbols = [...baseSymbols];
      if (Phaser.Math.Between(0, 9) === 0) allSymbols.push('wild');
      if (Phaser.Math.Between(0, 12) === 0) allSymbols.push('scatter');
      if (Phaser.Math.Between(0, 20) === 0) allSymbols.push('curse');
  
      const randomSymbol = Phaser.Math.RND.pick(allSymbols);
      reels[row][col].setTexture(randomSymbol);
    }
  }
  

  let totalWin = 0;

  for (let line of paylines) {
    const firstSymbol = reels[line[0]][0].texture.key; // Kolumna 0 = OK
    let matchCount = 1;
    for (let i = 1; i < line.length; i++) {
      const row = line[i];
      const symbol = reels[row][i].texture.key;
      if (symbol === firstSymbol) matchCount++;
      else break;
    }
    if (matchCount >= 3) {
      const winAmount = matchCount * 100;
      totalWin += winAmount;
      highlightPayline(scene, line);
    }
    
  }

  if (totalWin > 0) {
    balance += totalWin;
    balanceText.setText(`${balance}`);
    winText.setText(`${totalWin}`);
    showWinText(scene);
  } else {
    winText.setText('0');
  }
}

function showBetOptions(scene) {
  if (betOptionsOpen) return;
  betOptionsOpen = true;

  const stakeData = [
    { key: 'stake_0.25', value: 0.25 },
    { key: 'stake_0.50', value: 0.5 },
    { key: 'stake_0.75', value: 0.75 },
    { key: 'stake_1.00', value: 1.0 },
    { key: 'stake_1.25', value: 1.25 },
    { key: 'stake_2.00', value: 2.0 },
    { key: 'stake_2.50', value: 2.5 },
    { key: 'stake_3.75', value: 3.75 },
    { key: 'stake_5.00', value: 5.0 },
    { key: 'stake_7.50', value: 7.5 },
    { key: 'stake_10.00', value: 10.0 },
    { key: 'stake_12.50', value: 12.5 },
    { key: 'stake_20.00', value: 20.0 },
    { key: 'stake_25.00', value: 25.0 },
    { key: 'stake_37.50', value: 37.5 },
    { key: 'stake_50.00', value: 50.0 },
    { key: 'stake_75.00', value: 75.0 },
    { key: 'stake_100.00', value: 100.0 },
    { key: 'stake_125.00', value: 125.0 },
    { key: 'stake_200.00', value: 200.0 },
  ];

  const overlay = scene.add.image(scene.cameras.main.centerX, scene.cameras.main.centerY, 'ramaInfo')
    .setOrigin(0.5)
    .setDepth(10);

  const closeButton = scene.add.image(
    scene.cameras.main.centerX + overlay.displayWidth / 2 - 180,
    scene.cameras.main.centerY - overlay.displayHeight / 2 + 160,
    'ramaInfoX'
  ).setOrigin(0.5).setDepth(12).setInteractive().setScale(0.35);

  const stakeButtons = [];

  const destroyBetOverlay = () => {
    overlay.destroy();
    stakeButtons.forEach(btn => btn.destroy());
    closeButton.destroy();
    betOptionsOpen = false;
  };

  closeButton.on('pointerdown', destroyBetOverlay);
  closeButton.on('pointerover', () => closeButton.setTint(0xffaaaa));
  closeButton.on('pointerout', () => closeButton.clearTint());

  const startX = scene.cameras.main.centerX - 400;
  const startY = scene.cameras.main.centerY - 220;
  const spacingX = 200;
  const spacingY = 150;

  stakeData.forEach((stake, index) => {
    const col = index % 5;
    const row = Math.floor(index / 5);
    const x = startX + col * spacingX;
    const y = startY + row * spacingY;

    const button = scene.add.image(x, y, stake.key)
      .setInteractive()
      .setOrigin(0.5)
      .setDepth(11)
      .setScale(0.9)
      .setTint(0xbbeeff)
      .setAlpha(1); // 80% widoczności
      

    button.on('pointerdown', () => button.setScale(0.95));
    button.on('pointerup', () => {
      button.setScale(0.9);
      betAmount = stake.value;
      betText.setText($`{betAmount}`);
      destroyBetOverlay(); // zamyka
    });
    button.on('pointerout', () => button.setScale(0.9));

    stakeButtons.push(button);
  });
}


function showWinText(scene) {
  const text = scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY + 150, 'WYGRANA!', {
    fontSize: '48px', color: '#00ff00', fontStyle: 'bold'
  }).setOrigin(0.5).setDepth(5);
  scene.time.delayedCall(2000, () => text.destroy());
}

function startAutoSpin(scene) {
  if (autoTimer) return;
  autoTimer = scene.time.addEvent({
    delay: 1000,
    callback: () => {
      spinReels(scene);
    },
    callbackScope: scene,
    loop: true
  });
}

function stopAutoSpin() {
  if (autoTimer) {
    autoTimer.remove(false);
    autoTimer = null;
  }
}

function showVolumeSlider(scene, soundButton) {
  const barX = scene.cameras.main.centerX - 670;
  const barY = scene.cameras.main.height - 170;
  const barWidth = 150;
  const barHeight = 10;

  // Tło
  volumeOverlay = scene.add.rectangle(barX, barY, barWidth, barHeight, 0x222222)
    .setOrigin(0, 0.5)
    .setDepth(10);

  // Pasek aktywny
  volumeBar = scene.add.rectangle(barX, barY, barWidth * volume, barHeight, 0xffaa00)
    .setOrigin(0, 0.5)
    .setDepth(11);

  // Suwak
  volumeHandle = scene.add.circle(barX + barWidth * volume, barY, 10, 0xffffff)
    .setInteractive({ draggable: true, useHandCursor: true })
    .setDepth(12);

  scene.input.setDraggable(volumeHandle);

  volumeHandle.on('drag', (pointer, dragX) => {
    const clampedX = Phaser.Math.Clamp(dragX, barX, barX + barWidth);
    volumeHandle.x = clampedX;
    volume = (clampedX - barX) / barWidth;
    volumeBar.width = barWidth * volume;

    updateVolumeIcon(soundButton);
    console.log('Nowa głośność:', volume.toFixed(2));
  });

  volumeOverlay.setInteractive().on('pointerdown', (pointer) => {
    const localX = Phaser.Math.Clamp(pointer.x, barX, barX + barWidth);
    volumeHandle.x = localX;
    volume = (localX - barX) / barWidth;
    volumeBar.width = barWidth * volume;

    updateVolumeIcon(soundButton);
    console.log('Klik głośność:', volume.toFixed(2));
  });
}


function showInfo(scene) {
  if (infoOpen) return;
  infoOpen = true;

  const overlay = scene.add.image(scene.cameras.main.centerX, scene.cameras.main.centerY, 'ramaInfo')
    .setOrigin(0.5)
    .setDepth(10)
    .setScale(1);

  const infoText = scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY,
    'Zasady gry:\n- Traf 3 symbole w rzędzie\n- Zakład pobierany przed spinem\n- Wygrane dodawane do salda',
    {
      fontSize: '24px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 800 }
    }
  ).setOrigin(0.5).setDepth(11);

  const closeButton = scene.add.image(
    scene.cameras.main.centerX + overlay.displayWidth / 2 - 180,
    scene.cameras.main.centerY - overlay.displayHeight / 2 + 160,
    'ramaInfoX'
  ).setOrigin(0.5).setDepth(12).setInteractive().setScale(0.35);

  closeButton.on('pointerdown', () => {
    overlay.destroy();
    infoText.destroy();
    closeButton.destroy();
    infoOpen = false;
  });

  closeButton.on('pointerover', () => closeButton.setTint(0xffaaaa));
  closeButton.on('pointerout', () => closeButton.clearTint());
}