import Card from "../../../../components/Card/Card"

export function GameResult({wrongResCard, rightResCard, closeW, closeR}) {
    return (
        <>
        <Card 
            title={'Ура ты молодец'}
            body={''}
            isOpen={rightResCard}
            onClose={closeR}
            type={'gameOver'}
            game={'music'}
        />
        <Card
            title={'не молодец...'}
            body={''}
            isOpen={wrongResCard}
            onClose={closeW}
            error = {true}
            type={'gameOver'}
            game={'music'}
        />
        </>
        
    )
}