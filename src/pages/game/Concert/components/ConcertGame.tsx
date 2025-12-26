import { useState, useRef, useEffect } from 'react'
import UniDarkSvg from './svg/darkSVG/universalDarkSvg'
import UniColorSvg from './svg/colorSVG/universalColorSvg'
import './ConcertStyles.scss'
import { TitleText } from './TitleText'
import ConcertGameResult from './results/ConcertGameResult'
import { RoutesEnum } from '../../../../app/routes'
import { Button } from '../../../../components/Button/Button'
import { useNavigate } from 'react-router-dom'

// 🔊 mp3 declaration
declare module '*.mp3' {
  const src: string
  export default src
}

type InstrumentName = 'pipe' | 'drum' | 'flute' | 'contrabass' | 'guitar'

type InstrumentConfig = {
  id: number
  name: InstrumentName
  width: string
  height: string
}

const instruments: InstrumentConfig[] = [
  { id: 5, name: 'guitar', width: '5.7vw', height: '29.3vh' },
  { id: 2, name: 'drum', width: '20.8vw', height: '29.3vh' },
  { id: 3, name: 'flute', width: '6.5vw', height: '29.3vh' },
  { id: 4, name: 'contrabass', width: '6.5vw', height: '29.3vh' },
  { id: 1, name: 'pipe', width: '6.5vw', height: '29.3vh' },
]

// 🔊 sounds
import guitarSound from '../sounds/guitar.mp3'
import drumSound from '../sounds/drum.mp3'
import fluteSound from '../sounds/flute.mp3'
import contrabassSound from '../sounds/contrabass.mp3'
import pipeSound from '../sounds/pipe.mp3'

const melodies: { instrument: InstrumentName; file: string }[] = [
  { instrument: 'guitar', file: guitarSound },
  { instrument: 'drum', file: drumSound },
  { instrument: 'flute', file: fluteSound },
  { instrument: 'contrabass', file: contrabassSound },
  { instrument: 'pipe', file: pipeSound },
]

type FeedbackStatus = 'idle' | 'wrong' | 'correct'

const ConcertGame = () => {
  const [currentMelodyIndex, setCurrentMelodyIndex] = useState<number | null>(null)
  const [guessedCorrectly, setGuessedCorrectly] =
    useState<Partial<Record<InstrumentName, boolean>>>({})
  const [feedback, setFeedback] = useState<FeedbackStatus>('idle')
  const [playedIndexes, setPlayedIndexes] = useState<number[]>([])

  const [rightResCard, setRightResCard] = useState(false)
  const [isOver, setIsOver] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const navigate = useNavigate()

  // 🧹 cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  // ▶️ кнопка Play
  const handlePlayClick = () => {
    // если мелодия уже выбрана и НЕ угадана — играем её снова
    if (currentMelodyIndex !== null) {
      playMelody(currentMelodyIndex)
      return
    }

    // иначе выбираем новую случайную
    const availableIndexes = melodies
      .map((_, i) => i)
      .filter(i => !playedIndexes.includes(i))

    if (availableIndexes.length === 0) return

    const randomIndex =
      availableIndexes[Math.floor(Math.random() * availableIndexes.length)]

    setCurrentMelodyIndex(randomIndex)
    playMelody(randomIndex)
  }

  const playMelody = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const audio = new Audio(melodies[index].file)
    audio.volume = 0.7
    audioRef.current = audio

    audio.play().catch(console.error)
    setFeedback('idle')

    console.log(`🎵 Проигрывается: ${melodies[index].instrument}`)
  }

  // 🎯 угадывание
  const handleGuess = (instrument: InstrumentName) => {
    if (currentMelodyIndex === null) return

    const correctInstrument = melodies[currentMelodyIndex].instrument
    const isCorrect = instrument === correctInstrument

    console.log(
      `Выбрано: ${instrument}, ожидалось: ${correctInstrument}, ${
        isCorrect ? 'ВЕРНО' : 'НЕВЕРНО'
      }`
    )

    if (!isCorrect) {
      setFeedback('wrong')
      return
    }

    // ✅ правильный ответ
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    setGuessedCorrectly(prev => ({
      ...prev,
      [instrument]: true,
    }))

    setPlayedIndexes(prev => {
      const updated = [...prev, currentMelodyIndex]

      if (updated.length === melodies.length) {
        setIsOver(true)
        setRightResCard(true)
      }

      return updated
    })

    setCurrentMelodyIndex(null)
    setFeedback('correct')
  }

  return (
    <div className="concert-game">
      <Button
        className="backButton"
        bgColor="pink"
        type="type1v2"
        onClick={() => {
          localStorage.setItem('fromGame', 'true')
          navigate(RoutesEnum.MUSIC)
        }}
      >
        НАЗАД
      </Button>

      <ConcertGameResult
        rightResCard={rightResCard}
        closeR={() => setRightResCard(false)}
      />

      <div className="title-text">
        <TitleText feedback={feedback} isOver={isOver} />
      </div>

      <button className="play-btn" onClick={handlePlayClick}>
        ▶<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"> <path d="M75.3175 74.9847C74.5771 74.9904 73.8533 74.7656 73.2462 74.3415C72.8627 74.068 72.5371 73.7212 72.2881 73.3213C72.0391 72.9213 71.8716 72.476 71.7953 72.011C71.7189 71.5461 71.7352 71.0705 71.8433 70.6119C71.9513 70.1532 72.1489 69.7205 72.4248 69.3386C76.4323 63.6771 78.5791 56.9078 78.5674 49.9701C78.5263 42.8461 76.1836 35.9265 71.8891 30.2443C71.316 29.4861 71.0675 28.5312 71.1981 27.5896C71.3287 26.648 71.8278 25.7969 72.5855 25.2235C73.3432 24.6501 74.2976 24.4014 75.2386 24.5321C76.1796 24.6628 77.0301 25.1621 77.6032 25.9204C82.7586 32.7344 85.5989 41.0207 85.7081 49.5665C85.8174 58.1123 83.1899 66.4687 78.2103 73.4124C77.8895 73.8874 77.4592 74.2783 76.9558 74.552C76.4523 74.8256 75.8904 74.9741 75.3175 74.9847Z" fill="#F2D8C2"/> <path d="M89.2828 85.7065C88.7387 85.7087 88.2012 85.5865 87.7114 85.3491C86.867 84.9333 86.2207 84.2008 85.9131 83.3108C85.6055 82.4208 85.6614 81.4453 86.0686 80.5963C90.6545 71.0392 93.0354 60.573 93.0354 49.9713C93.0354 39.3696 90.6545 28.9034 86.0686 19.3463C85.8261 18.9197 85.674 18.4477 85.6218 17.9597C85.5696 17.4717 85.6185 16.9781 85.7653 16.5099C85.9121 16.0416 86.1537 15.6086 86.4751 15.2378C86.7965 14.8671 87.1907 14.5666 87.6333 14.355C88.0758 14.1434 88.5572 14.0253 89.0474 14.0081C89.5376 13.9908 90.026 14.0748 90.4824 14.2547C90.9387 14.4347 91.353 14.7068 91.6997 15.054C92.0463 15.4013 92.3177 15.8162 92.497 16.273C97.339 26.5491 99.8976 37.7531 99.9967 49.1137C100.11 61.0681 97.4832 72.8894 92.3184 83.6696C92.0427 84.2512 91.6151 84.7475 91.0808 85.106C90.5464 85.4646 89.9252 85.672 89.2828 85.7065Z" fill="#F2D8C2"/> <path d="M66.2835 0.334575C65.7127 0.0683671 65.0818 -0.0420952 64.4546 0.0143867C63.8274 0.0708686 63.2263 0.292287 62.7122 0.656192L20.2493 32.1031H3.57131C2.62414 32.1031 1.71576 32.4796 1.04601 33.1498C0.376262 33.82 0 34.7289 0 35.6767V67.8383C0 68.7861 0.376262 69.695 1.04601 70.3652C1.71576 71.0353 2.62414 71.4118 3.57131 71.4118H20.3565L62.7122 99.3924C63.2932 99.7832 63.9763 99.9945 64.6764 99.9999C65.2747 100.003 65.8641 99.8555 66.3906 99.5711C66.9542 99.2626 67.4242 98.8076 67.751 98.2541C68.0779 97.7007 68.2495 97.0693 68.2477 96.4264V3.51501C68.2457 2.85509 68.0611 2.20862 67.7144 1.64725C67.3677 1.08588 66.8724 0.631534 66.2835 0.334575Z" fill="#F2D8C2"/> </svg>
        <span className="play-btn__desc">Нажми!</span>
      </button>

      <div className="instruments-grid">
        {instruments.map(inst =>
          guessedCorrectly[inst.name] ? (
            <UniColorSvg
              key={inst.id}
              instrument={inst.name}
              width={inst.width}
              height={inst.height}
            />
          ) : (
            <UniDarkSvg
              key={inst.id}
              instrument={inst.name}
              width={inst.width}
              height={inst.height}
              onClick={() => handleGuess(inst.name)}
            />
          )
        )}
      </div>
    </div>
  )
}

export default ConcertGame