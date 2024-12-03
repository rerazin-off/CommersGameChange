import classes from "./FirstCorpus.module.scss";
import {BackButton} from '../../components/Button/BackButton/BackButton.tsx';

export const FirstCorpus = () => {
    return (
        <div className= {classes.korpus_1}>
            <div className= {classes.container}>
                <div className= {classes.bloc}>
                    <div className= {classes.text}>
                        <h1>ПЛАНЕТА <br /> <span>1</span>  КОРПУС</h1>
                        <p>На планете первого корпуса вас ждут следующие специальности: <br/>
                        -Информационные системы и программирование; <br/>
                        -Операционная деятельность в логистике; <br/>
                        -Экономика и бухгалтерский учет (по отраслям); <br/>
                        -Юриспруденция.</p>
                        <BackButton>Назад</BackButton>
                    </div>
                    <div className= {classes.planet}>
                        {/* <!-- тут будут 4 компонента gps и кнопка "вперед", в разных классах --> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
