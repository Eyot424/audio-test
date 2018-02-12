var pulseSynth = new Tone.Synth(pulseOptions).connect(pulseAnalyser).toMaster()
var squareSynth = new Tone.Synth(squareOptions).connect(squareAnalyser).toMaster()
var triangleSynth = new Tone.Synth(triangleOptions).connect(triangleAnalyser).toMaster()
var noiseSynth = new Tone.NoiseSynth().connect(noiseAnalyser).toMaster()

var song = {}
var pulsePart = new Tone.Part()
var squarePart = new Tone.Part()
var trianglePart = new Tone.Part()
var noisePart = new Tone.Part()

var button = document.querySelector('.play')
var songSelectors = document.querySelectorAll('.song')
var video = document.querySelector('video')

function setVideo (index) {
  video.src = songs[index].video
}

function setSong (index) {
  song = songs[index]
  if (songs[index].video) {
    setVideo(index)
  }

  pulsePart.removeAll()
  squarePart.removeAll()
  trianglePart.removeAll()
  noisePart.removeAll()

  if (song.pulse != null) {
    pulsePart = new Tone.Part(function (time, note) {
      pulseSynth.triggerAttackRelease(note.name, note.duration, time, note.velocity)
    }, song.pulse)
  }

  if (song.square != null) {
    squarePart = new Tone.Part(function (time, note) {
      squareSynth.triggerAttackRelease(note.name, note.duration, time, note
        .velocity)
    }, song.square)
  }

  if (song.triangle != null) {
    trianglePart = new Tone.Part(function (time, note) {
      triangleSynth.triggerAttackRelease(note.name, note.duration, time,
        note.velocity)
    }, song.triangle)
  }

  if (song.noise != null) {
    noisePart = new Tone.Part(function (time, note) {
      noiseSynth.triggerAttackRelease(note.duration, time, note.velocity)
    }, song.noise)
  }
}

function start () {
  if (song.pulse != null) pulsePart.start(0)
  if (song.square != null) squarePart.start(0)
  if (song.triangle != null) trianglePart.start(0)
  if (song.noise != null) noisePart.start(0)

  video.currentTime = 0
  video.play()
}

function stop () {
  if (song.pulse != null) pulsePart.stop(0)
  if (song.square != null) squarePart.stop(0)
  if (song.triangle != null) trianglePart.stop(0)
  if (song.noise != null) noisePart.stop(0)

  video.pause()
}

function songRemoveClass (songs) {
  songs.forEach(function (song) {
    song.classList.remove('active')
  })
}

setSong(0)
visualize()

button.addEventListener('click', function () {
  if (Tone.Transport.state == 'started') {
    Tone.Transport.stop()
    button.textContent = 'Restart'

    stop()
  } else {
    Tone.Transport.start('+0.1', 0)

    start()

    Tone.Transport.stop('+' + song.length)

    button.textContent = 'Stop'
  }
})

songSelectors.forEach(function (selector) {
  selector.addEventListener('click', function () {
    Tone.Transport.stop()
    setSong(selector.dataset.index)
    songRemoveClass(songSelectors)
    selector.classList.add('active')
    setTimeout(function () {
      button.textContent = 'Start'
    }, 0)
  })
})

Tone.Transport.on('stop', function () {
  button.textContent = 'Restart'
  video.pause()
})
