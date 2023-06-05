const ACTION_TYPES = {
  Attack: 'attack',
  Defend: 'defend',
  Break: 'break',
}

const RONIN_GAMBIT = {
  VIDEO_TYPES: {
    Idle: 'idle',
    Win: 'win',
    Lose: 'lose',
    Tie: 'tie',
  },

  ACTION_TYPES,

  PLAYER_MOVE_TYPES: {
    [ACTION_TYPES.Attack]: 0,
    [ACTION_TYPES.Defend]: 1,
    [ACTION_TYPES.Break]: 2,
  },
}

export { RONIN_GAMBIT }
