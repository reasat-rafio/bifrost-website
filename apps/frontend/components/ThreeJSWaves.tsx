import { useWindowSize, useWindowSizeEffect, windowSizeEffect } from 'lib/hooks'
import { ReactElement, useRef, useEffect, useState } from 'react'
import { OrbitControls } from './OrbitControls'
import * as THREE from 'three'

var vertShader = `
    uniform float size;
    uniform float time;
    uniform float amplitude;
    uniform float waveLength;
    varying float ampNormalized;
  	void main() {
      vec3 p = position;
      float wLength = 1. / waveLength;
      p.y = sin(position.x * wLength + time) * cos(position.z * wLength  + time) * amplitude;
      ampNormalized = abs(- amplitude  + p.y) / (amplitude * 2.);
    	vec4 mvPosition = modelViewMatrix * vec4( p, 1.0 );
      gl_PointSize = size * ( 300.0 / length( mvPosition.xyz ) );
      gl_Position = projectionMatrix * mvPosition;
		}
  `
var fragShader = `
  	uniform vec3 color;
    uniform float opacity;
    varying float ampNormalized;
    void main() {
      vec3 c = color;
      gl_FragColor = vec4(c, opacity);
    }
  `

export default function ThreeJSWaves({}: // width,
// height,
{
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
    camera.position.set(0, 20, 100)
    // camera.translateY(50)
    // camera.setViewOffset(width, height, 0, height, width, height / 3)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    })

    setRenderer(renderer)

    renderer.setSize(width, height)
    ref.current.appendChild(renderer.domElement)

    let pWidth = 100
    let pHeight = 100
    let planeGeom = new THREE.PlaneBufferGeometry(500, 500, pWidth, pHeight).toGrid()
    planeGeom.rotateX(-Math.PI * 0.5)

    let seaDown = new THREE.LineSegments(
      planeGeom,
      new THREE.ShaderMaterial({
        uniforms: {
          color: {
            value: new THREE.Color('#999'),
          },
          opacity: {
            value: 0,
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
      }),
    )
    scene.add(seaDown)

    let clock = new THREE.Clock()
    let t = 0
    let delta = 0

    function animate() {
      requestAnimationFrame(animate)
      delta = clock.getDelta()
      t += delta

      seaDown.material.uniforms.time.value = t

      scene.rotation.y += delta * 0.05
      // camera.position.z -= t * 0.5;

      renderer.render(scene, camera)
    }

    animate()

    return () => (ref.current ? ref.current.removeChild(renderer.domElement) : null)
  }, [ref])

  return <div ref={ref}></div>
}
