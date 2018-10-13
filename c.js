var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5

autoSetCanvasSize(yyy)

listenToUser(yyy)


var eraserEnabled = false

pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

black.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.remove('active')
}

red.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  black.classList.remove('active')
  red.classList.add('active')
  blue.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.remove('active')
}

yellow.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  context.fillStyle = 'yellow'
  context.strokeStyle = 'yellow'
  black.classList.remove('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  yellow.classList.add('active')
  green.classList.remove('active')
}

blue.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  context.fillStyle = 'bluek'
  context.strokeStyle = 'blue'
  black.classList.remove('active')
  red.classList.remove('active')
  blue.classList.add('active')
  yellow.classList.remove('active')
  green.classList.remove('active')
}

green.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  black.classList.remove('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  yellow.classList.remove('active')
  green.classList.add('active')
}

thin.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  lineWidth = 5
  thin.classList.add('active')
  thick.classList.remove('active')
}
thick.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  lineWidth = 10
  thick.classList.add('active')
  thin.classList.remove('active')
}
clear.onclick = function(){
  
  clear.classList.add('click');
  context.clearRect(0, 0, yyy.width, yyy.height);
}
save.onclick = function(){
var url = yyy.toDataURL("image/png")
var a = document.createElement('a')
document.body.appendChild(a)
a.href = url
a.download = 'my picture'
a.target = '_blank'
a.click()
}

/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function () {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()

  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();

  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {
 var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  //特性检测
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function (aaa) {
      var x = aaa.touches[0].clientX
      var y = aaa.touches[0].clientY
      if (!using) { return }
      if (eraserEnabled) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function (aaa) {
      using = false
    }
  } else {
    //非触屏设备
    canvas.onmousedown = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY

      using = true
      if (eraserEnabled) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function (aaa) {
      var x = aaa.clientX
      var y = aaa.clientY
      if (!using) { return }
      if (eraserEnabled) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }
    canvas.onmouseup = function (aaa) {
      using = false

    }
  }
}
