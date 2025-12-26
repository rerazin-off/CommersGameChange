import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import '../Xylophone.scss';
import { XylophoneArea } from './Xylophone-area';
import XylophoneKey from './XylophoneKey';
import CustomDragPreview from './CustomDragPreview';
import { RoutesEnum } from '../../../../app/routes';
import { Button } from '../../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import XylophoneBuildResult from './XylophoneResults/XylophoneBuildResult';
import { GameResult } from './XylophoneResults/Xylophone-results'
import do1Sound from './XylophoneSounds/do1.mp3';
import reSound from './XylophoneSounds/re.mp3';
import miSound from './XylophoneSounds/mi.mp3';
import faSound from './XylophoneSounds/fa.mp3';
import solSound from './XylophoneSounds/sol.mp3';
import lyaSound from './XylophoneSounds/lya.mp3';
import siSound from './XylophoneSounds/si.mp3';
import do2Sound from './XylophoneSounds/do2.mp3';

const XylophoneGame = () => {


  const [instruction, setinstruction] = useState(true)
  const [highlightedKeys, setHighlightedKeys] = useState<number[]>([])
  const [isMelodyPlaying, setIsMelodyPlaying] = useState(false)
  
  
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout)
    }
  }, [])

  const playMelody = async (melody: Array<{ note: number, delay: number }>) => {
    if (isMelodyPlaying) return
    setIsMelodyPlaying(true)
    setHighlightedKeys([])

    for (let { note, delay } of melody) {
      setHighlightedKeys(prev => [...prev, note])
      const audio = keySounds[note]
      if (audio) {
        audio.currentTime = 0
        await audio.play().catch(console.error)
      }
      
      await new Promise(res => {
        const timeout = setTimeout(res, delay)
        timeoutRefs.current.push(timeout)
      })
      
      setHighlightedKeys(prev => prev.filter(key => key !== note))
    }

    setHighlightedKeys([])
    setIsMelodyPlaying(false)
  }

  const lightSound = [
  { note: 1, delay: 500 },
  { note: 2, delay: 500 },
  { note: 3, delay: 700 },

  { note: 1, delay: 500 },
  { note: 2, delay: 500 },
  { note: 3, delay: 700 },
]

  const mediumSound = [
    { note: 5, delay: 450 },
    { note: 3, delay: 450 },
    { note: 3, delay: 450 },
    { note: 5, delay: 750 },
    { note: 3, delay: 450 },
    { note: 3, delay: 450 },
    { note: 5, delay: 750 },
    { note: 4, delay: 450 },
    { note: 3, delay: 450 },
    { note: 2, delay: 450 },
    { note: 1, delay: 450 },
  ]

  const hardSound = [
  { note: 1, delay: 350 },
  { note: 2, delay: 350 },
  { note: 3, delay: 350 },
  { note: 4, delay: 350 },
  { note: 5, delay: 500 },
  { note: 4, delay: 350 },
  { note: 3, delay: 350 },
  { note: 2, delay: 350 },
  { note: 1, delay: 600 },
]
  const playSound = async () => {
    setExpectedMelody(lightSound.map(n => n.note))
    setPlayedMelody([])
    setCanPlayMelody(false)

    await playMelody(lightSound)
    setCanPlayMelody(true)
  }

  const playMediumSound = async () => {
    setExpectedMelody(mediumSound.map(n => n.note))
    setPlayedMelody([])
    setCanPlayMelody(false)

    await playMelody(mediumSound)
    setCanPlayMelody(true)
  }

  const playHardSound = async () => {
    setExpectedMelody(hardSound.map(n => n.note))
    setPlayedMelody([])
    setCanPlayMelody(false)

    await playMelody(hardSound)
    setCanPlayMelody(true)
  }
  const navigate = useNavigate()

  const XylophoneKeys = [
    { id: 8, name: 'Key8' },
    { id: 6, name: 'Key6' },
    { id: 2, name: 'Key2' },
    { id: 5, name: 'Key5' },
    { id: 7, name: 'Key7' },
    { id: 4, name: 'Key4' },
    { id: 1, name: 'Key1' },
    { id: 3, name: 'Key3' }
  ]

  const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8]

  const [placedKeys, setPlacedKeys] = useState(Array(8).fill(null))
  const [showResult, setShowResult] = useState(false)
  const [isBuildCorrect, setIsBuildCorrect] = useState<boolean | null>(null)
  const [hasBeenChecked, setHasBeenChecked] = useState(false)
  const [rightResCard, setRightResCard] = useState(false)
  const [wrongResCard, setWrongResCard] = useState(false)

  const is4K = window.innerWidth >= 3840 && window.innerHeight >= 2160
  const isFullHD = window.innerWidth >= 1920 && window.innerHeight >= 1080

  let dropAreasPositions

  if (is4K) {
    dropAreasPositions = [
      { left: '28.5%', top: '57vh', rotate: 4 },
      { left: '27%', top: '57vh', rotate: 4 },
      { left: '25.4%', top: '57vh', rotate: 4 },
      { left: '24%', top: '58vh', rotate: 4 },
      { left: '22.7%', top: '58vh', rotate: 4 },
      { left: '21.3%', top: '58vh', rotate: 4 },
      { left: '19.7%', top: '59vh', rotate: 4 },
      { left: '18%', top: '59vh', rotate: 4 },
    ]
  } else if (isFullHD) {
    dropAreasPositions = [
      { left: '28.5%', top: '71%', rotate: 4 },
      { left: '27%', top: '71%', rotate: 4 },
      { left: '25.4%', top: '71%', rotate: 4 },
      { left: '24%', top: '72%', rotate: 4 },
      { left: '22.7%', top: '72%', rotate: 4 },
      { left: '21.3%', top: '72%', rotate: 4 },
      { left: '19.7%', top: '73%', rotate: 4 },
      { left: '18%', top: '73%', rotate: 4 },
    ]
  } else {
    dropAreasPositions = [
      { left: '28.5%', top: '64vh', rotate: 4 },
      { left: '27%', top: '64vh', rotate: 4 },
      { left: '25.4%', top: '64vh', rotate: 4 },
      { left: '24%', top: '65vh', rotate: 4 },
      { left: '22.7%', top: '65vh', rotate: 4 },
      { left: '21.3%', top: '65vh', rotate: 4 },
      { left: '19.7%', top: '66vh', rotate: 4 },
      { left: '18%', top: '66vh', rotate: 4 },
    ]
  }

  const keySounds = useMemo((): Record<number, HTMLAudioElement> => ({
    1: new Audio(do1Sound),
    2: new Audio(reSound),
    3: new Audio(miSound),
    4: new Audio(faSound),
    5: new Audio(solSound),
    6: new Audio(lyaSound),
    7: new Audio(siSound),
    8: new Audio(do2Sound),
  }), [])


  const noteNames = {
    1: 'До (1 октава)',
    2: 'Ре',
    3: 'Ми',
    4: 'Фа',
    5: 'Соль',
    6 : 'Ля',
    7: 'Си',
    8: 'До (2 октава)',
  }

  const [expectedMelody, setExpectedMelody] = useState<number[]>([1, 2, 3, 4])
  const [playedMelody, setPlayedMelody] = useState<number[]>([])
  const [canPlayMelody, setCanPlayMelody] = useState(false)

  const addToMelody = useCallback((keyId: number) => {
    if (!canPlayMelody) return

    setPlayedMelody(prev => {
      const updated = [...prev, keyId]

      if (updated.length === expectedMelody.length) {
        const isCorrect = updated.every((id, i) => id === expectedMelody[i])
        if (isCorrect) setRightResCard(true)
        else setWrongResCard(true)

        setTimeout(() => {
          setPlayedMelody([])
          setCanPlayMelody(false)
        }, 300)
      }
      return updated
    })
  }, [canPlayMelody, expectedMelody])


  const playKeySound = useCallback(async (keyId: number) => {
    const audio = keySounds[keyId]
    if (audio) {
      audio.currentTime = 0;
      try {
        await audio.play()
      } catch (e) {
        console.error('Sound error:', e)
      }
    }
    addToMelody(keyId)
  }, [keySounds, addToMelody])


  const isKeyUsed = (keyId: number) => {
    return placedKeys.some(placedKey => placedKey && placedKey.id === keyId);
  }

  const handleDrop = useCallback((item: any, areaId: number) => {
    setPlacedKeys(prev => {
      const newKeys = [...prev]
      newKeys[areaId] = item
      return newKeys
    })
  }, [])

  const handleRemove = useCallback((item: any, areaId: number) => {
    setPlacedKeys(prev => {
      const newKeys = [...prev]
      newKeys[areaId] = null
      return newKeys
    })
  }, [])

  const closeResult = () => setShowResult(false)
  const tryAgain = () => {
    setPlacedKeys(Array(8).fill(null))
    setShowResult(false)
    setIsBuildCorrect(null)
    setHasBeenChecked(false)
  }
  const resetGame = () => {
    setPlacedKeys(Array(8).fill(null))
    setShowResult(false)
    setIsBuildCorrect(null)
    setHasBeenChecked(false)
  }

  useEffect(() => {
    const allPlaced = placedKeys.every(key => key !== null)
    if (allPlaced && !hasBeenChecked) {
      const ids = placedKeys.map(k => k.id)
      const isCorrect = ids.every((id, i) => id === correctOrder[i])
      setIsBuildCorrect(isCorrect)
      setShowResult(true)
      setHasBeenChecked(true)

      const audio = new Audio(isCorrect ? './XylophoneSounds/success.mp3' : './XylophoneSounds/fail.mp3')
      audio.play().catch(console.error)
    }
  }, [placedKeys, hasBeenChecked])

  const hideButtons = showResult || rightResCard || wrongResCard

  return (
    <DndProvider backend={TouchBackend}>
      <GameResult
        rightResCard={rightResCard}
        wrongResCard={wrongResCard}
        closeR={() => setRightResCard(false)}
        closeW={() => setWrongResCard(false)}
      />

      <Button
        className="reset-button"
        style={{ display: hideButtons ? 'none' : 'inline-block' }}
        onClick={resetGame}
      >
        <svg style={{width: '5.2vw', height: '9.3vh'}} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#FF0000" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)">
            <path d="m12.5 1.5c2.41 1.38 4 4.02 4 7 0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8"/>
            <path d="m12.5 5.5v-4h4"/>
          </g>
        </svg>
      </Button>

      <Button
        className="audio-button hard"
        style={{ display: hideButtons ? 'none' : 'inline-block' }}
        onClick={playHardSound}
        disabled={isMelodyPlaying}>
        <svg style={{width: '5.2vw', height: '9.3vh'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 137 134" fill="none">
          <g clip-path="url(#clip0_65_5551)" filter="url(#filter0_i_65_5551)">
          <path d="M12.0359 91.839L12.0078 91.8531V91.832L12.0359 91.839Z" fill="#FF0000"/>
          <path d="M12.0359 91.839L12.0078 91.8531V91.832L12.0359 91.839Z" fill="#FF0000"/>
          <path d="M12.0078 91.832L12.0359 91.839L12.0078 91.8531V91.832Z" fill="#FF0000"/>
          <path d="M55.299 103.893V49.5685C55.299 48.4496 54.8454 47.4474 54.1168 46.7197C53.3881 45.9921 52.3777 45.5391 51.2642 45.5391C49.0302 45.5391 47.2293 47.3375 47.2293 49.5685V86.7049C42.2252 81.7351 35.3171 78.6667 27.7011 78.6667C12.4002 78.6667 0 91.05 0 106.33C0 121.61 12.4002 134.001 27.7011 134.001C43.002 134.001 55.409 121.61 55.409 106.33C55.409 105.506 55.3746 104.696 55.299 103.893ZM27.7011 129.834C14.7029 129.834 4.16547 119.311 4.16547 106.33C4.16547 93.3496 14.7029 82.8265 27.7011 82.8265C35.8327 82.8265 43.002 86.9451 47.2293 93.2055C49.7588 96.9534 51.2367 101.47 51.2367 106.33C51.2367 108.403 50.9686 110.421 50.4599 112.337C47.8067 122.407 38.6234 129.834 27.7011 129.834Z" fill="#FF0000"/>
          <path d="M12.0359 91.839L12.0078 91.8531V91.832L12.0359 91.839Z" fill="#FF0000"/>
          <path d="M49.0032 35.0362C48.7902 34.892 48.5908 34.7342 48.4121 34.5488C48.5908 34.7273 48.7902 34.892 49.0032 35.0362Z" fill="#FF0000"/>
          <path d="M49.6824 35.4078C49.4419 35.3117 49.215 35.1813 49.002 35.0371C49.215 35.1813 49.4419 35.3048 49.6824 35.4078Z" fill="#FF0000"/>
          <path d="M122.042 30.2588C121.458 28.7692 119.994 27.6983 118.289 27.6983H117.877C118.014 27.6846 118.152 27.6777 118.289 27.6777C120.001 27.6777 121.472 28.7486 122.042 30.2588Z" fill="#FF0000"/>
          <path d="M136.89 103.735V49.41C136.89 49.1903 136.87 48.9775 136.835 48.7716V4.01568C136.835 1.79847 135.034 0 132.814 0H51.2506C49.0304 0 47.2363 1.79847 47.2363 4.01568V31.7135C47.2363 32.8187 47.6831 33.8209 48.4117 34.5485C48.5904 34.727 48.7898 34.8918 49.0029 35.0359C49.216 35.1801 49.4428 35.3036 49.6834 35.4066C50.1645 35.6125 50.6938 35.7224 51.2506 35.7224H114.269V59.3839C114.269 61.6011 116.07 63.3996 118.29 63.3996C119.397 63.3996 120.407 62.9466 121.136 62.2258C121.857 61.4982 122.311 60.4891 122.311 59.3839V31.7135C122.311 31.439 122.284 31.1644 122.229 30.9035C122.208 30.7868 122.18 30.677 122.146 30.5672C122.119 30.4642 122.077 30.3613 122.043 30.2583C121.459 28.7687 119.995 27.6979 118.29 27.6979H55.2717V8.02449H128.793V86.5189C123.789 81.5628 116.895 78.5082 109.292 78.5082C93.9913 78.5082 81.5911 90.8915 81.5911 106.172C81.5911 121.452 93.9913 133.842 109.292 133.842C124.593 133.842 137 121.452 137 106.172C137 105.348 136.966 104.538 136.89 103.735ZM132.051 112.178C129.398 122.248 120.215 129.675 109.292 129.675C96.294 129.675 85.7566 119.152 85.7566 106.172C85.7566 93.1911 96.294 82.668 109.292 82.668C117.424 82.668 124.593 86.7866 128.82 93.047C131.35 96.7949 132.828 101.312 132.828 106.172C132.828 108.245 132.56 110.263 132.051 112.178Z" fill="#FF0000"/>
          </g>
          <defs>
          <filter id="filter0_i_65_5551" x="0" y="0" width="137" height="138" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="50"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.392157 0 0 0 0 1 0 0 0 0 0.984314 0 0 0 0.5 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_65_5551"/>
          </filter>
          <clipPath id="clip0_65_5551">
          <rect width="137" height="134" fill="white"/>
          </clipPath>
          </defs>
        </svg>
      </Button>
      
      <Button
        className="audio-button meduim"
        style={{ display: hideButtons ? 'none' : 'inline-block' }}
        onClick={playMediumSound}
        disabled={isMelodyPlaying}>
        <svg style={{width: '5.2vw', height: '9.3vh'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 137 134" fill="none">
          <g clip-path="url(#clip0_65_5551)" filter="url(#filter0_i_65_5551)">
          <path d="M12.0359 91.839L12.0078 91.8531V91.832L12.0359 91.839Z" fill="#5A09DB"/>
          <path d="M12.0359 91.839L12.0078 91.8531V91.832L12.0359 91.839Z" fill="#5A09DB"/>
          <path d="M12.0078 91.832L12.0359 91.839L12.0078 91.8531V91.832Z" fill="#5A09DB"/>
          <path d="M55.299 103.893V49.5685C55.299 48.4496 54.8454 47.4474 54.1168 46.7197C53.3881 45.9921 52.3777 45.5391 51.2642 45.5391C49.0302 45.5391 47.2293 47.3375 47.2293 49.5685V86.7049C42.2252 81.7351 35.3171 78.6667 27.7011 78.6667C12.4002 78.6667 0 91.05 0 106.33C0 121.61 12.4002 134.001 27.7011 134.001C43.002 134.001 55.409 121.61 55.409 106.33C55.409 105.506 55.3746 104.696 55.299 103.893ZM27.7011 129.834C14.7029 129.834 4.16547 119.311 4.16547 106.33C4.16547 93.3496 14.7029 82.8265 27.7011 82.8265C35.8327 82.8265 43.002 86.9451 47.2293 93.2055C49.7588 96.9534 51.2367 101.47 51.2367 106.33C51.2367 108.403 50.9686 110.421 50.4599 112.337C47.8067 122.407 38.6234 129.834 27.7011 129.834Z" fill="#5A09DB"/>
          <path d="M12.0359 91.839L12.0078 91.8531V91.832L12.0359 91.839Z" fill="#5A09DB"/>
          <path d="M49.0032 35.0362C48.7902 34.892 48.5908 34.7342 48.4121 34.5488C48.5908 34.7273 48.7902 34.892 49.0032 35.0362Z" fill="#5A09DB"/>
          <path d="M49.6824 35.4078C49.4419 35.3117 49.215 35.1813 49.002 35.0371C49.215 35.1813 49.4419 35.3048 49.6824 35.4078Z" fill="#5A09DB"/>
          <path d="M122.042 30.2588C121.458 28.7692 119.994 27.6983 118.289 27.6983H117.877C118.014 27.6846 118.152 27.6777 118.289 27.6777C120.001 27.6777 121.472 28.7486 122.042 30.2588Z" fill="#5A09DB"/>
          <path d="M136.89 103.735V49.41C136.89 49.1903 136.87 48.9775 136.835 48.7716V4.01568C136.835 1.79847 135.034 0 132.814 0H51.2506C49.0304 0 47.2363 1.79847 47.2363 4.01568V31.7135C47.2363 32.8187 47.6831 33.8209 48.4117 34.5485C48.5904 34.727 48.7898 34.8918 49.0029 35.0359C49.216 35.1801 49.4428 35.3036 49.6834 35.4066C50.1645 35.6125 50.6938 35.7224 51.2506 35.7224H114.269V59.3839C114.269 61.6011 116.07 63.3996 118.29 63.3996C119.397 63.3996 120.407 62.9466 121.136 62.2258C121.857 61.4982 122.311 60.4891 122.311 59.3839V31.7135C122.311 31.439 122.284 31.1644 122.229 30.9035C122.208 30.7868 122.18 30.677 122.146 30.5672C122.119 30.4642 122.077 30.3613 122.043 30.2583C121.459 28.7687 119.995 27.6979 118.29 27.6979H55.2717V8.02449H128.793V86.5189C123.789 81.5628 116.895 78.5082 109.292 78.5082C93.9913 78.5082 81.5911 90.8915 81.5911 106.172C81.5911 121.452 93.9913 133.842 109.292 133.842C124.593 133.842 137 121.452 137 106.172C137 105.348 136.966 104.538 136.89 103.735ZM132.051 112.178C129.398 122.248 120.215 129.675 109.292 129.675C96.294 129.675 85.7566 119.152 85.7566 106.172C85.7566 93.1911 96.294 82.668 109.292 82.668C117.424 82.668 124.593 86.7866 128.82 93.047C131.35 96.7949 132.828 101.312 132.828 106.172C132.828 108.245 132.56 110.263 132.051 112.178Z" fill="#5A09DB"/>
          </g>
          <defs>
          <filter id="filter0_i_65_5551" x="0" y="0" width="137" height="138" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="50"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.392157 0 0 0 0 1 0 0 0 0 0.984314 0 0 0 0.5 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_65_5551"/>
          </filter>
          <clipPath id="clip0_65_5551">
          <rect width="137" height="134" fill="white"/>
          </clipPath>
          </defs>
        </svg>
      </Button>

      <Button
        className="audio-button"
        onClick={playSound}
        style={{ display: hideButtons ? 'none' : 'inline-block' }}
        disabled={isMelodyPlaying}>
        <svg style={{width: '5.2vw', height: '9.3vh'}} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_253_377)" filter="url(#filter0_i_253_377)">
          <path d="M8.78613 68.5365L8.76562 68.547V68.5312L8.78613 68.5365Z" fill="#0A9200"/>
          <path d="M8.78613 68.5365L8.76562 68.547V68.5312L8.78613 68.5365Z" fill="#0A9200"/>
          <path d="M8.76562 68.5312L8.78613 68.5365L8.76562 68.547V68.5312Z" fill="#0A9200"/>
          <path d="M40.3643 77.5304V36.9894C40.3643 36.1544 40.0331 35.4065 39.5013 34.8635C38.9694 34.3205 38.2319 33.9824 37.4191 33.9824C35.7885 33.9824 34.4739 35.3246 34.4739 36.9894V64.7032C30.8213 60.9944 25.7789 58.7045 20.2198 58.7045C9.05123 58.7045 0 67.9458 0 79.3489C0 90.752 9.05123 99.9985 20.2198 99.9985C31.3883 99.9985 40.4445 90.752 40.4445 79.3489C40.4445 78.7342 40.4194 78.1297 40.3643 77.5304ZM20.2198 96.889C10.732 96.889 3.04049 89.0359 3.04049 79.3489C3.04049 69.6619 10.732 61.8089 20.2198 61.8089C26.1552 61.8089 31.3883 64.8825 34.4739 69.5544C36.3203 72.3514 37.399 75.7221 37.399 79.3489C37.399 80.896 37.2034 82.4021 36.8321 83.8313C34.8954 91.3463 28.1923 96.889 20.2198 96.889Z" fill="#0A9200"/>
          <path d="M8.78613 68.5365L8.76562 68.547V68.5312L8.78613 68.5365Z" fill="#0A9200"/>
          <path d="M35.7674 26.145C35.6119 26.0374 35.4664 25.9196 35.3359 25.7812C35.4664 25.9144 35.6119 26.0374 35.7674 26.145Z" fill="#0A9200"/>
          <path d="M36.2643 26.4212C36.0887 26.3494 35.9231 26.2521 35.7676 26.1445C35.9231 26.2521 36.0887 26.3443 36.2643 26.4212Z" fill="#0A9200"/>
          <path d="M89.0815 22.5804C88.655 21.4688 87.5863 20.6697 86.342 20.6697H86.041C86.1414 20.6594 86.2417 20.6543 86.342 20.6543C87.5914 20.6543 88.6651 21.4534 89.0815 22.5804Z" fill="#0A9200"/>
          <path d="M99.9193 77.4141V36.8731C99.9193 36.7092 99.9042 36.5504 99.8791 36.3967V2.99677C99.8791 1.34214 98.5646 0 96.944 0H37.4086C35.788 0 34.4785 1.34214 34.4785 2.99677V23.6668C34.4785 24.4916 34.8046 25.2395 35.3365 25.7825C35.4669 25.9157 35.6124 26.0386 35.768 26.1462C35.9235 26.2538 36.0891 26.346 36.2647 26.4228C36.6159 26.5765 37.0022 26.6585 37.4086 26.6585H83.4073V44.3164C83.4073 45.971 84.7218 47.3132 86.3424 47.3132C87.1502 47.3132 87.8878 46.9751 88.4196 46.4372C88.9464 45.8942 89.2776 45.1411 89.2776 44.3164V23.6668C89.2776 23.4619 89.2575 23.257 89.2174 23.0623C89.2023 22.9753 89.1822 22.8933 89.1572 22.8113C89.1371 22.7345 89.107 22.6577 89.0819 22.5808C88.6554 21.4692 87.5867 20.67 86.3424 20.67H40.3438V5.98842H94.0089V64.5664C90.3563 60.8678 85.3239 58.5882 79.7748 58.5882C68.6063 58.5882 59.555 67.8295 59.555 79.2326C59.555 90.6357 68.6063 99.8822 79.7748 99.8822C90.9433 99.8822 99.9996 90.6357 99.9996 79.2326C99.9996 78.6179 99.9745 78.0134 99.9193 77.4141ZM96.3871 83.715C94.4504 91.23 87.7473 96.7727 79.7748 96.7727C70.2871 96.7727 62.5955 88.9196 62.5955 79.2326C62.5955 69.5456 70.2871 61.6925 79.7748 61.6925C85.7103 61.6925 90.9433 64.7662 94.029 69.438C95.8753 72.235 96.9541 75.6058 96.9541 79.2326C96.9541 80.7797 96.7584 82.2857 96.3871 83.715Z" fill="#0A9200"/>
          </g>
          <defs>
          <filter id="filter0_i_253_377" x="0" y="0" width="100" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="50"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.392157 0 0 0 0 1 0 0 0 0 0.984314 0 0 0 0.5 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_253_377"/>
          </filter>
          <clipPath id="clip0_253_377">
          <rect width="100" height="100" fill="white"/>
          </clipPath>
          </defs>
        </svg>
      </Button>

      <Button
        className="backButton"
        bgColor="pink"
        type="type1v2"
        onClick={() => {
          localStorage.setItem('fromGame', 'true');
          navigate(RoutesEnum.MUSIC);
        }}>
        НАЗАД
      </Button>

      <div className="xylophone-game">
        <CustomDragPreview />
        <div className="areas">
          {placedKeys.map((placedKey, index) => (
            <XylophoneArea
              key={index}
              areaId={index}
              placedKey={placedKey}
              onDrop={handleDrop}
              onRemove={handleRemove}
              onPlaySound={playKeySound}
              highlighted={placedKey && highlightedKeys.includes(placedKey.id)}
              style={{
                position: 'absolute',
                left: dropAreasPositions[index].left,
                top: dropAreasPositions[index].top,
                transform: `rotate(${dropAreasPositions[index].rotate}deg)`
              }}
            />
          ))}
        </div>

        <div className="keys">
          {XylophoneKeys.map((key) => (
            <XylophoneKey
              key={key.id}
              keyData={key}
              isUsed={isKeyUsed(key.id)}
              highlighted={highlightedKeys.includes(key.id)}
              onPlaySound={playKeySound}
            />
          ))}
        </div>

        {showResult && isBuildCorrect !== null && (
          <XylophoneBuildResult
            isCorrect={isBuildCorrect}
            onRetry={tryAgain}
            onContinue={closeResult}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default XylophoneGame