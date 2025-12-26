type TitleProps = {
  feedback: 'idle' | 'wrong' | 'correct'
  isOver: boolean
}

export const TitleText: React.FC<TitleProps> = ({ feedback, isOver }) => {
  if (isOver) {
    return <h1>У вас отличный слух!</h1>
  }

  if (feedback === 'wrong') {
    return (
      <h1>
        <span style={{ color: 'darkred' }}>НЕВЕРНО</span>, попробуйте снова
      </h1>
    )
  }

  if (feedback === 'correct') {
    return <h1>Вы <span style={{ color: 'darkgreen' }} >Правы!</span></h1>
  }

  return <h1>Отгадайте музыкальный инструмент</h1>
}
