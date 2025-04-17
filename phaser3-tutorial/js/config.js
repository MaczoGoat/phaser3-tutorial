export const config = {
    type: Phaser.AUTO,
    backgroundColor: '#1d1d1d',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1920,
      height: 1080
    }
  };
  
  // Eksport stałych konfiguracyjnych
  export const SYMBOLS = {
    baseSymbols: [
      'symbolZ', 'symbolP', 'symbolF', // niskie
      'symbolT', 'symbolC', 'symbolA', // średnie
      'symbolW', 'symbolZK', 'symbolRK' // wysokie
    ],
    special: ['wild', 'scatter', 'curse']
  };
  
  // Linie wygrywające
  export const PAYLINES = [
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
  
  // Opcje stawek
  export const STAKE_DATA = [
    { key: 'stake_0.25', value: 0.25 },
    { key: 'stake_0.50', value: 0.50 },
    { key: 'stake_0.75', value: 0.75 },
    { key: 'stake_1.00', value: 1.00 },
    { key: 'stake_1.25', value: 1.25 },
    { key: 'stake_2.00', value: 2.00 },
    { key: 'stake_2.50', value: 2.50 },
    { key: 'stake_3.75', value: 3.75 },
    { key: 'stake_5.00', value: 5.00 },
    { key: 'stake_7.50', value: 7.50 },
    { key: 'stake_10.00', value: 10.00 },
    { key: 'stake_12.50', value: 12.50 },
    { key: 'stake_20.00', value: 20.00 },
    { key: 'stake_25.00', value: 25.00 },
    { key: 'stake_37.50', value: 37.50 },
    { key: 'stake_50.00', value: 50.00 },
    { key: 'stake_75.00', value: 75.00 },
    { key: 'stake_100.00', value: 100.00 },
    { key: 'stake_125.00', value: 125.00 },
    { key: 'stake_200.00', value: 200.00 }
  ];
  