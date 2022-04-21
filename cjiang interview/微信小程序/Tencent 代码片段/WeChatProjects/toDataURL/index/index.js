const vs = `
  attribute vec3 aPos;
  attribute vec2 aVertexTextureCoord;
  varying highp vec2 vTextureCoord;

  void main(void){
    gl_Position = vec4(aPos, 1);
    vTextureCoord = aVertexTextureCoord;
  }
`

const fs = `
  varying highp vec2 vTextureCoord;
  uniform sampler2D uSampler;

  void main(void) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
  }
`

const vertex = [
  -1, -1, 0.0,
  1, -1, 0.0,
  1, 1, 0.0,
  -1, 1, 0.0
]

const vertexIndice = [
  0, 1, 2,
  0, 2, 3
]

const texCoords = [
  0.0, 0.0,
  1.0, 0.0,
  1.0, 1.0,
  0.0, 1.0
]
let listener = ''
let selector = ''
function createShader(gl, src, type) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Error compiling shader: ' + gl.getShaderInfoLog(shader))
  }
  return shader
}

const buffers = {}

Page({
  data: {
    width: 288,
    height: 358,
    activeGif: '',
  },
  onReady: function () {
    selector = wx.createSelectorQuery()
    // selector.select('#webgl')
    //   .node(this.init.bind(this))
    //   .exec()
    //   console.log(selector)
  },
  onHide: function() {
    this.stop()
  },
  stop() {
    console.log('11111')
    listener.stop()
  },
  createRenderer(canvas, width, height) {
    const gl = canvas.getContext("webgl")
    if (!gl) {
      console.error('Unable to get webgl context.')
      return
    }
    
    const info = wx.getSystemInfoSync()
    gl.canvas.width = info.pixelRatio * width
    gl.canvas.height = info.pixelRatio * height
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  
    const vertexShader = createShader(gl, vs, gl.VERTEX_SHADER)
    const fragmentShader = createShader(gl, fs, gl.FRAGMENT_SHADER)
  
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
  
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program.')
      return
    }
  
    gl.useProgram(program)
  
    const texture = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.bindTexture(gl.TEXTURE_2D, null)
  
    buffers.vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex), gl.STATIC_DRAW)
  
    buffers.vertexIndiceBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.vertexIndiceBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndice), gl.STATIC_DRAW)
  
    const aVertexPosition = gl.getAttribLocation(program, 'aPos')
    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(aVertexPosition)
  
    buffers.trianglesTexCoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.trianglesTexCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW)
  
    const vertexTexCoordAttribute = gl.getAttribLocation(program, "aVertexTextureCoord")
    gl.enableVertexAttribArray(vertexTexCoordAttribute)
    gl.vertexAttribPointer(vertexTexCoordAttribute, 2, gl.FLOAT, false, 0, 0)
  
    const samplerUniform = gl.getUniformLocation(program, 'uSampler')
    gl.uniform1i(samplerUniform, 0)
    // console.log()
    return (arrayBuffer, width, height) => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, arrayBuffer)
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
      let quality = 1
      let data = gl.canvas.toDataURL('image/jpeg', quality)
      console.log('toDataURLtoDataURLtoDataURLtoDataURL',data)
      this.setData({
        activeGif: data
      })
    }
  },
  start() {
    selector.select('#webgl')
    .node(this.init.bind(this))
    .exec()
    console.log(selector)
  },
  init(res) {
    const canvas = res.node
    console.log(canvas)
    const context = wx.createCameraContext()
    const render = this.createRenderer(canvas, this.data.width, this.data.height)
    console.log(render)
    if (!render || typeof render !== 'function') return
    let count = 0
    listener = context.onCameraFrame((frame) => {
      if(count < 6) {
        count ++
        return;
      }
      count = 0
      render(new Uint8Array(frame.data), frame.width, frame.height)
    })
    listener.start()
  },
    /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.stop()
  },
})