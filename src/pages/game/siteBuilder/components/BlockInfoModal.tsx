import React, { useEffect } from "react";
import "./BlockInfoModal.scss";

interface BlockInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const blockDescriptions = [
  {
    type: "Header",
    desc: "Верхняя часть сайта. Содержит логотип, меню навигации. Должен находиться только сверху."
  },
  {
    type: "Main",
    desc: "Основная область контента. Внутрь можно помещать блоки Hero, Section, Article, Sidebar."
  },
  {
    type: "Hero",
    desc: "Большой баннер с заголовком. Обычно идёт первым внутри Main."
  },
  {
    type: "Section",
    desc: "Контентный раздел с текстом или изображениями."
  },
  {
    type: "Article",
    desc: "Статья — текстовый блок."
  },
  {
    type: "Sidebar",
    desc: "Боковая панель бокового меню или доп. информации."
  },
  {
    type: "Footer",
    desc: "Нижняя часть сайта. Контакты, ссылки, копирайт. Должен быть только внизу."
  },
];

const BlockInfoModal: React.FC<BlockInfoModalProps> = ({ isOpen, onClose }) => {

  // Закрытие по Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="info-modal-overlay" onClick={onClose}>
      <div
        className="info-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="info-close" onClick={onClose}>×</button>

        <h2>Информация о блоках</h2>
        <div className="info-list">
          {blockDescriptions.map((b) => (
            <div key={b.type} className="info-item">
              <h3>{b.type}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockInfoModal;
