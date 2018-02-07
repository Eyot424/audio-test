var songs = [
  {
    'pulse': filterNotes(OdetojoySynth1).notes,
    'square': null,
    'triangle': filterNotes(OdetojoyBass1).notes,
    'noise': null,
    'length': '16m',
    'video': ''
  },
  {
    'pulse': MarioSynth1,
    'square': MarioSynth2,
    'triangle': MarioBass1,
    'noise': MarioBass2,
    'length': '85',
    'video': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/8-bit-mario.mp4'
  },
  {
    'pulse': ZeldaSynth1,
    'square': ZeldaSynth2,
    'triangle': ZeldaBass1,
    'noise': ZeldaBass2,
    'length': '39',
    'video': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/8-bit-zelda.mp4'
  },
  {
    'pulse': filterNotes(PacmanSynth1).notes,
    'square': null,
    'triangle': filterNotes(PacmanBass1).notes,
    'noise': null,
    'length': '2m',
    'video': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/8-bit-pacman.mp4'
  }
]
