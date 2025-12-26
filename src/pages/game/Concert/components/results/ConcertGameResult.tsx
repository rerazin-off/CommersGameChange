import Card from "../../../../../components/Card/Card"

export default function ConcertGameResult({rightResCard, closeR}) {
  return (
    <div className="game-result">
      <Card
        title={'Поздравляем!'}
        body={'У вас отличный слух!'}
        isOpen={rightResCard}
        onClose={closeR}
        type={'gameOver'}
        game={'music'}
      />
    </div>
  )
}