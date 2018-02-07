function filterDots (value) {
  value = value.replace('1/32.', '1/32 + 1/64')
               .replace('1/16.', '1/16 + 1/32')
               .replace('1/8.', '1/8 + 1/16')
               .replace('1/4.', '1/4 + 1/8')
               .replace('1/2.', '1/2 + 1/4')

  return value
};

function filterValue (value) {
  if (value == 0) return value

  value = value.replace('1/64', '64n')
               .replace('1/32', '32n')
               .replace('1/16', '16n')
               .replace('1/8', '8n')
               .replace('1/4', '4n')
               .replace('1/2', '2n')

  return value
}

function filterTime (time) {
  time = time.replace('m', '')
  time = time.split(' + ')

  var sum = time.reduce(function (total, element) {
    return math.add(math.fraction(total), math.fraction(element))
  }, 1)

  var str = []

  while (sum.d != 1) {
    if (sum.n % 2 != 0) {
      str.push('1/' + sum.d)
      sum.n = (sum.n - 1) / 2
    } else {
      sum.n = sum.n / 2
    }
    sum.d = sum.d / 2
  }

  if (sum.n > 1) str.unshift(sum.n - 1 + 'm')

  return str.join(' + ')
}

function filterNotes (notes) {
  var timeline = 0
  var part = {notes: [], length: ''}
  var last = notes.length - 1
  notes.forEach(function (note, index) {
    note[1] = filterDots(note[1])
    note[2] = (index > 0) ? filterTime(timeline) : 0
    timeline = (timeline) ? timeline + ' + ' + note[1] : note[1]
    part.notes.push({'name': filterValue(note[0]), 'duration': note[1], 'time': filterValue(note[2]), 'velocity': 1})
  })

  part.length = filterValue(filterTime(notes[last][2] + ' + ' + notes[last][1]))

  return part
}
