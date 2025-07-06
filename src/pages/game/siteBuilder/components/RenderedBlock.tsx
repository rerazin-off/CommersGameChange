import React from "react";
import "./RenderedBlock.scss";

interface Props {
  type: string;
}

const RenderedBlock: React.FC<Props> = ({ type }) => {
  switch (type) {
    case "Header":
      return (
        <header className="rb header">
          <div className="header-logo">СФЕРА</div>

          <nav className="header-nav">
            <span>О нас</span>
            <span>Услуги</span>
            <span>Календарь мероприятий</span>
            <span>Отзывы</span>
          </nav>

          <div className="header-actions">
            <span className="phone">+7 999 136 21 14</span>
            <button className="btn">Записаться</button>
          </div>
        </header>
      );

    case "Hero":
      return (
        <section className="rb hero">
          <div className="hero-content">
            <h1>СФЕРА</h1>
            <p>Мультимедийный парк профориентации</p>
            <button>О нас</button>
          </div>
          <img className="hero-graphic" src="./src/pages/game/siteBuilder/Photo.png" alt="" />
        </section>
      );

    case "Section":
      return (
        <section className="rbbbbbbsection">
          <div className="rb section">
            <h2>Кто мы?</h2>
            <div className="section-box">
              Мультимедийный парк профориентации «Сфера» — центр,
              функционирующий на базе ГБПОУ «Нижегородский Губернский колледж»
              с 2015 года.
            </div>
          </div>
          <img className="sect" src="./src/pages/game/siteBuilder/IMG_7957.jpg" alt="" />
        </section>
      );

    case "Article":
      return (
        <article className="rb article">
          <h3>Отзыв</h3>
          <p>
            «Сфера» — это современный и полезный мультимедийный парк
            профориентации. Здесь в доступной и интересной форме помогают
            определиться с профессией: VR-экскурсии, интерактивные пробы,
            тесты и мастер-классы делают процесс обучения живым и понятным.
          </p>
          <span className="author">— Студент НГК</span>
        </article>
      );

    case "Footer":
      return (
        <footer className="rb footer">
          <div className="footer-logo">СФЕРА</div>

          <nav className="footer-nav">
            <span>О нас</span>
            <span>Контакты</span>
            <span>Политика</span>
          </nav>

          <div className="footer-copy">
            © 2024 СФЕРА
          </div>
        </footer>
      );

    case "Main":
      return (
        <div className="rb main">
          <span>main</span>
        </div>
      );

    default:
      return <div className="rb unknown">{type}</div>;
  }
};

export default RenderedBlock;
