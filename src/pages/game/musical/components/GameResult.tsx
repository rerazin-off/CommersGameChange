import Card from "../../../../components/Card/Card"

export function GameResult({wrongResCard, rightResCard, closeW, closeR}) {
    return (
        <>
        <Card 
            title={'Поздравляем!'}
            body={'Инструменты отсортированы правильно'}
            isOpen={rightResCard}
            onClose={closeR}
            type={'gameOver'}
            game={'music'}
        />
        <Card
            title={'Увы...'}
            body={'Не все инструменты распределены верно. Попробуйте еще.'}
            isOpen={wrongResCard}
            onClose={closeW}
            error = {true}
            type={'gameOver'}
            game={'music'}
        />
        </>
        
    )
}