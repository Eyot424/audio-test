var pulseAnalyser = new Tone.Analyser('waveform', 1024)
var squareAnalyser = new Tone.Analyser('waveform', 1024)
var triangleAnalyser = new Tone.Analyser('waveform', 1024)
var noiseAnalyser = new Tone.Analyser('waveform', 1024)

var pulseContext = document.querySelector('#pulse').getContext('2d')
var squareContext = document.querySelector('#square').getContext('2d')
var triangleContext = document.querySelector('#triangle').getContext('2d')
var noiseContext = document.querySelector('#noise').getContext('2d')

var canvasWidth = 182, canvasHeight = 60

var pulseGradient = pulseContext.createLinearGradient(0, 0, canvasWidth, canvasHeight)
pulseGradient.addColorStop(0, '#322982')
pulseGradient.addColorStop(1, '#B742CB')

var squareGradient = squareContext.createLinearGradient(0, 0, canvasWidth, canvasHeight)
squareGradient.addColorStop(0, '#785FCA')
squareGradient.addColorStop(1, '#018AE4')

var triangleGradient = triangleContext.createLinearGradient(0, 0, canvasWidth, canvasHeight)
triangleGradient.addColorStop(0, '#00AE3A')
triangleGradient.addColorStop(1, '#00D5AC')

var noiseGradient = noiseContext.createLinearGradient(0, 0, canvasWidth, canvasHeight)
noiseGradient.addColorStop(0, '#FF3D00')
noiseGradient.addColorStop(1, '#E47701')

function drawWave (context, values, gradient) {
  context.clearRect(0, 0, canvasWidth, canvasHeight)
  context.beginPath()

  context.lineJoin = 'round'
  context.lineWidth = 1
  context.strokeStyle = gradient

  context.moveTo(0, (values[0] + 0.5) * canvasHeight)
  for (var i = 1, len = values.length; i < len; i++) {
    var val = values[i] + 0.5
    var x = canvasWidth * (i / len)
    var y = val * canvasHeight
    context.lineTo(x, y)
  }
  context.stroke()
}

function visualize () {
  requestAnimationFrame(visualize)
  drawWave(pulseContext, pulseAnalyser.getValue(), pulseGradient)
  drawWave(squareContext, squareAnalyser.getValue(), squareGradient)
  drawWave(triangleContext, triangleAnalyser.getValue(), triangleGradient)
  drawWave(noiseContext, noiseAnalyser.getValue(), noiseGradient)
}
