import React, { useMemo, useRef, useEffect, useState, forwardRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { parseText, TEXT_CONTENT } from '../utils/textUtils'

const getRandomColor = () => {
  return new THREE.Color(Math.random(), Math.random(), Math.random())
}

const getRandomSize = () => {
  return Math.random() * 0.05 + 0.05; // Random size between 0.05 and 0.1
}

const Word = forwardRef(({ position, text, color, size }, ref) => {
  return (
    <Text
      ref={ref}
      position={position}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  )
})

function Funnel() {
  const funnelRef = useRef()
  const wordPool = useRef([])
  const { camera } = useThree()
  const [visibleWords, setVisibleWords] = useState(100) // Initial number of visible words

  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.lineTo(2.8, 0)  // Increase the width by 40%
    shape.quadraticCurveTo(2.24, -3.92, 1.4, -7.84)  // Increase the height and width by 40%
    shape.quadraticCurveTo(0.56, -3.92, 0, 0)

    const extrudeSettings = {
      steps: 1,
      depth: 0.28,  // Increase the depth by 40%
      bevelEnabled: false,
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  const words = useMemo(() => parseText(TEXT_CONTENT), [])

  const animationConfig = useMemo(() => ({
    duration: 10, // Duration of one full cycle in seconds
    speed: 0.1, // Animation speed factor
  }), [])

  const calculateWordPosition = (t) => {
    const x = Math.cos(t * Math.PI * 2) * (1 - t * 0.6)
    const y = -t * 5.6
    const z = Math.sin(t * Math.PI * 2) * (1 - t * 0.6)
    return [x, y, z]
  }

  const calculateVisibleWords = (distance) => {
    const maxWords = wordPool.current.length
    const minWords = 20
    const maxDistance = 15
    const minDistance = 5

    let calculatedWords = Math.floor(
      ((maxDistance - distance) / (maxDistance - minDistance)) * (maxWords - minWords) + minWords
    )

    return Math.max(minWords, Math.min(maxWords, calculatedWords))
  }

  useEffect(() => {
    const poolSize = words.length * 2 // Create a pool twice the size of words for smooth looping
    wordPool.current = [] // Clear existing pool to reset it
    for (let i = 0; i < poolSize; i++) {
      const wordIndex = i % words.length
      const wordObject = {
        text: words[wordIndex],
        color: getRandomColor(),
        size: getRandomSize(),
        ref: React.createRef(),
      }
      wordPool.current.push(wordObject)
    }

    // Set up performance monitoring
    let lastTime = performance.now()
    let frameCount = 0
    const measurePerformance = () => {
      const now = performance.now()
      const delta = now - lastTime
      frameCount++

      if (delta >= 1000) { // Measure every second
        const fps = frameCount * 1000 / delta
        // Adjust visible words based on FPS
        setVisibleWords(prevWords => {
          if (fps < 30) return Math.max(20, prevWords - 10)
          if (fps > 55) return Math.min(wordPool.current.length, prevWords + 10)
          return prevWords
        })
        frameCount = 0
        lastTime = now
      }

      requestAnimationFrame(measurePerformance)
    }
    measurePerformance()
  }, [words])

  useFrame(() => {
    if (funnelRef.current) {
      funnelRef.current.rotation.y += 0.01 // Constant rotation speed

      const currentTime = performance.now() / 1000 * animationConfig.speed
      const cycleTime = currentTime % animationConfig.duration

      // Calculate visible words based on camera distance
      const cameraDistance = camera.position.distanceTo(funnelRef.current.position)
      const calculatedVisibleWords = calculateVisibleWords(cameraDistance)
      setVisibleWords(calculatedVisibleWords)

      // Update positions of visible words in the pool
      wordPool.current.forEach((word, index) => {
        if (word.ref.current) {
          if (index < visibleWords) {
            const t = ((cycleTime / animationConfig.duration) + (index * (1 / visibleWords))) % 1
            const [x, y, z] = calculateWordPosition(t)
            word.ref.current.position.set(x, y, z)
            word.ref.current.visible = y > -5.6 && y < 0
          } else {
            word.ref.current.visible = false
          }
        }
      })
    }
  })

  return (
    <group ref={funnelRef} position={[0, 3.92, 0]}>  // Adjust Y position to center the larger funnel
      {/* <mesh geometry={geometry} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="royalblue" side={THREE.DoubleSide} />
      </mesh> */}
      {wordPool.current.map((word, index) => (
        <Word
          key={index}
          ref={word.ref}
          text={word.text}
          position={[0, 0, 0]}
          color={word.color}
          size={word.size}
        />
      ))}
    </group>
  )
}

function TwisterScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9.8], fov: 75 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Funnel />
    </Canvas>
  )
}

export default TwisterScene