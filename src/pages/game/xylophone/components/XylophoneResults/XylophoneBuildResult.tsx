import React from 'react'
import './XylophoneResultsStyles.scss'

interface XylophoneBuildResultProps {
  isCorrect: boolean
  onRetry: () => void
  onContinue: () => void
}

const XylophoneBuildResult: React.FC<XylophoneBuildResultProps> = ({
  isCorrect,
  onRetry,
  onContinue
}) => {
  return (
    <div className={`xb-res ${isCorrect ? "xb-res--success" : "xb-res--error"}`}>
      <div className="xb-res__content">
        {isCorrect ? (
          <>
            <div className="xb-res__icon">🎉</div>
            <h2 className="xb-res__title">Отличная работа!</h2>
            <p className="xb-res__message">
              Ксилофон собран правильно! Теперь можешь играть на нем!
            </p>
          </>
        ) : (
          <>
            <div className="xb-res__icon">🤔</div>
            <h2 className="xb-res__title">Упс…</h2>
            <p className="xb-res__message">
              Ксилофон собран неверно. Попробуй расставить клавиши по порядку!
            </p>
          </>
        )}

        <div className="xb-res__buttons">
          {isCorrect ? (
            <button
              className="xb-res__button xb-res__button--continue"
              onClick={onContinue}
            >
              Продолжить играть
            </button>
          ) : (
            <button
              className="xb-res__button xb-res__button--retry"
              onClick={onRetry}
            >
              Попробовать снова
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default XylophoneBuildResult;