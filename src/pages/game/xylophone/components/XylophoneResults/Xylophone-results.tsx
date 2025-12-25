import Card from "../../../../../components/Card/Card"
import './XylophoneResultsStyles.scss'

export function GameResult({wrongResCard, rightResCard, closeW, closeR}) {
  return (
    <div className="game-result">
      <Card
        title={'Поздравляем!'}
        body={'Мелодия сыграна верно!'}
        isOpen={rightResCard}
        onClose={closeR}
        type={'gameOver'}
        game={'music'}
      />
      <Card
        title={'Увы...'}
        body={'Мелодии не совпадают...'}
        isOpen={wrongResCard}
        onClose={closeW}
        error = {true}
        type={'gameOver'}
        game={'music'}
      />
    </div>
  )
}