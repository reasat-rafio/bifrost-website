import { useWindowSize, useWindowSizeEffect } from 'src/lib/hooks'
import { ReactElement, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

var vertShader = `
    uniform float size;
    uniform float time;
    uniform float amplitude;
    uniform float waveLength;
    varying float ampNormalized;
    varying vec3 vuv;
  	void main() {
      vec3 p = position;
      vuv = position;
      float wLength = 1. / waveLength;
      p.y = sin(position.x * wLength + time) * cos(position.z * wLength  + time) * amplitude;
      ampNormalized = abs(- amplitude  + p.y) / (amplitude * 2.);
    	vec4 mvPosition = modelViewMatrix * vec4( p, 1.0 );
      gl_PointSize = size * ( 300.0 / length( mvPosition.xyz ) );
      gl_Position = projectionMatrix * mvPosition;
		}
  `
var fragShader = `
    precision mediump float;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float opacity;
    varying float ampNormalized;

    varying vec3 vuv;

    void main() {
      vec2 st = gl_PointCoord;
      float mixValue = smoothstep(0.1, 1.9, vuv.y);;
      vec3 c = mix(color1, color2, mixValue);
      gl_FragColor = vec4(c, opacity);
    }
  `

export default function ThreeJSWaves({
  play,
}: // width,
// height,
{
  play: boolean
  // width: number
  // height: number
}): ReactElement {
  const ref = useRef(null)
  const width = useWindowSize()?.width ?? 0
  const height = useWindowSize()?.height ?? 0
  const [camera, _] = useState(new THREE.PerspectiveCamera(100, width / height, 1, 1000))
  const [_renderer, setRenderer] = useState<any>(null)
  useWindowSizeEffect(() => {
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    if (_renderer !== null) {
      _renderer.setSize(width, height)
    }
  }, [width, height])

  useEffect(() => {
    Object.assign(THREE.PlaneBufferGeometry.prototype, {
      toGrid: function () {
        let segmentsX = this.parameters.widthSegments || 1
        let segmentsY = this.parameters.heightSegments || 1
        let indices = []
        for (let i = 0; i < segmentsY + 1; i++) {
          let index11 = 0
          let index12 = 0
          for (let j = 0; j < segmentsX; j++) {
            index11 = (segmentsX + 1) * i + j
            index12 = index11 + 1
            let index21 = index11
            let index22 = index11 + (segmentsX + 1)
            indices.push(index11, index12)
            if (index22 < (segmentsX + 1) * (segmentsY + 1) - 1) {
              indices.push(index21, index22)
            }
          }
          if (index12 + segmentsX + 1 <= (segmentsX + 1) * (segmentsY + 1) - 1) {
            indices.push(index12, index12 + segmentsX + 1)
          }
        }
        this.setIndex(indices)
        return this
      },
    })
    let scene = new THREE.Scene()
    camera.position.set(0, 20, 200)
    // camera.translateY(50)
    // camera.setViewOffset(width, height, 0, height, width, height / 3)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })

    setRenderer(renderer)

    renderer.setSize(width, height)
    ref.current.appendChild(renderer.domElement)

    let pWidth = 100
    let pHeight = 100
    // @ts-ignore
    let planeGeom = new THREE.PlaneBufferGeometry(500, 500, pWidth, pHeight).toGrid()
    planeGeom.rotateX(-Math.PI * 0.5)

    let material = new THREE.ShaderMaterial({
      uniforms: {
        color1: {
          value: new THREE.Color('#fff'),
        },
        color2: {
          value: new THREE.Color('#010711'),
        },
        opacity: {
          value: 0.5,
        },
        time: {
          value: 0,
        },
        amplitude: {
          value: 15,
        },
        waveLength: {
          value: Math.PI * 10,
        },
      },
      vertexShader: vertShader,
      fragmentShader: fragShader,
    })
    material.transparent = true

    let seaDown = new THREE.LineSegments(planeGeom, material)
    scene.add(seaDown)

    let clock = new THREE.Clock()
    let t = 0
    let delta = 0

    function animate() {
      play && requestAnimationFrame(animate)
      delta = clock.getDelta()
      t += delta

      seaDown.material.uniforms.time.value = t
      scene.rotation.y += delta * 0.05

      renderer.render(scene, camera)
    }

    animate()

    return () => (ref.current ? ref.current.removeChild(renderer.domElement) : null)
  }, [ref, play])

  return <div ref={ref}></div>
}
