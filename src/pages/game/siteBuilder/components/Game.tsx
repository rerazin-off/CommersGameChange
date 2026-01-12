import React, { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import Panel from "./Panel";
import "./Game.scss";
import { CustomDragLayer } from "./CustomDragLayer";

export type BlockType =
  | "Header"
  | "Main"
  | "Footer"
  | "Hero"
  | "Section"
  | "Article";

export interface Block {
  id: string;
  type: BlockType;
  content: JSX.Element;
  children?: Block[];
  isCorrect?: boolean;
}

const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

/* ------------------ ИСХОДНЫЕ БЛОКИ ------------------- */

const initialBlocksList: Block[] = [
  { id: generateId(), type: "Header", content: <div>Логотип + Навигация</div> },
  { id: generateId(), type: "Main", content: <div>Главный контент сайта</div> },
  { id: generateId(), type: "Footer", content: <div>Контакты и ссылки</div> },
  { id: generateId(), type: "Hero", content: <div>Большой баннер</div> },
  { id: generateId(), type: "Section", content: <div>Раздел с информацией</div> },
  { id: generateId(), type: "Article", content: <div>Статья с текстом</div> },
];

/* ------------------ DND КАРТОЧКИ ------------------- */

const BlockItem: React.FC<{ block: Block }> = ({ block }) => {
  const [, drag] = useDrag(() => ({
    type: "BLOCK",
    item: { type: "BLOCK", block },
  }));

  return (
    <div ref={drag} className="block-item">
      <strong>{block.type}</strong>
      <div className="block-content">{block.content}</div>
    </div>
  );
};

/* ------------------ МОДАЛКА ИНФОРМАЦИИ ------------------- */

const InfoModal: React.FC<{ open: boolean; onClose: () => void }> = ({
                                                                       open,
                                                                       onClose,
                                                                     }) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    setTimeout(() => dialogRef.current?.focus(), 0);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) =>
    e.target === backdropRef.current && onClose();

  return (
    <div
      ref={backdropRef}
      className="gm-modal-backdrop"
      onMouseDown={onBackdrop}
    >
      <div
        ref={dialogRef}
        className="gm-modal info-modal"
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="gm-modal-close" onClick={onClose}>×</button>

        <h2 style={{fontFamily:'Arial'}}>Информация о блоках</h2>

        <div className="info-scroll">
          <h3 className="titleBlocks" >Header</h3>
          <p>Шапка сайта с логотипом и навигацией.</p>

          <h3 className="titleBlocks" >Main</h3>
          <p>Главная область. В неё входят остальные блоки.</p>

          <h3 className="titleBlocks" >Footer</h3>
          <p>Подвал сайта: контакты, ссылки.</p>

          <h3 className="titleBlocks" >Hero</h3>
          <p>Большой баннер.</p>

          <h3 className="titleBlocks" >Section</h3>
          <p>Раздел для контента.</p>

          <h3 className="titleBlocks" >Article</h3>
          <p>Текстовый блок.</p>
        </div>
      </div>
    </div>
  );
};

/* ------------------ МОДАЛКА ОШИБОК ------------------- */

const ErrorModal: React.FC<{
  errors: string[];
  open: boolean;
  onClose: () => void;
}> = ({ errors, open, onClose }) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    setTimeout(() => dialogRef.current?.focus(), 0);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) =>
    e.target === backdropRef.current && onClose();

  return (
    <div
      ref={backdropRef}
      className="gm-modal-backdrop"
      onMouseDown={onBackdrop}
    >
      <div
        ref={dialogRef}
        className="gm-modal"
        tabIndex={-1}
      >
        <button className="gm-modal-close" onClick={onClose}>×</button>

        <h3>Ошибки структуры</h3>

        <ul>
          {errors.map((err, i) => (
            <li key={i} style={{fontFamily:"Arial"}}>{err}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ------------------ МОДАЛКА УСПЕХА ------------------- */

const SuccessModal: React.FC<{ open: boolean; onClose: () => void }> = ({
                                                                          open,
                                                                          onClose,
                                                                        }) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    setTimeout(() => dialogRef.current?.focus(), 0);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) =>
    e.target === backdropRef.current && onClose();

  return (
    <div
      ref={backdropRef}
      className="gm-modal-backdrop"
      onMouseDown={onBackdrop}
    >
      <div
        ref={dialogRef}
        className="gm-modal success-modal"
        tabIndex={-1}
      >
        <button className="gm-modal-close" onClick={onClose}>×</button>

        <h2>🎉 Отличная работа!</h2>
        <p>Вы правильно собрали структуру сайта!</p>
      </div>
    </div>
  );
};

/* ------------------ ОСНОВНАЯ ЛОГИКА ИГРЫ ------------------- */

const GameContent: React.FC = () => {
  const [panelBlocks, setPanelBlocks] = useState<Block[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<Block[]>(initialBlocksList);
  const [errors, setErrors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const existsInMain = (type: BlockType) =>
    panelBlocks.some((b) => b.type === "Main" && b.children?.some((c) => c.type === type));

  const existsTopLevel = (type: BlockType) =>
    panelBlocks.some((b) => b.type === type);

  const handleDropTopLevel = (block: Block) => {
    if (["Header", "Footer"].includes(block.type)) {
      if (existsTopLevel(block.type) || existsInMain(block.type)) return;
    }

    setPanelBlocks((prev) => [...prev, block]);
    setAvailableBlocks((prev) => prev.filter((b) => b.id !== block.id));
  };

  const handleDropInside = (block: Block, parentId: string) => {
    const newBlock: Block = {
      id: generateId(),
      type: block.type,
      content: block.content,
      children: [],
    };

    setPanelBlocks((prev) => {
      return prev.map((b) => {
        if (b.id === parentId) {
          return {
            ...b,
            children: [...(b.children || []), newBlock]
          };
        }
        return b;
      });
    });

    setAvailableBlocks((prev) => prev.filter((b) => b.id !== block.id));
  };

  const removeBlock = (id: string) => {
    let removed: Block | null = null;

    const removeRec = (arr: Block[]): Block[] =>
      arr
        .filter((b) => {
          if (b.id === id) {
            removed = b;
            return false;
          }
          return true;
        })
        .map((b) => ({
          ...b,
          children: b.children ? removeRec(b.children) : [],
        }));

    setPanelBlocks((prev) => removeRec(prev));

    if (removed) {
      setAvailableBlocks((prev) => [
        ...prev,
        { id: generateId(), type: removed.type, content: removed.content },
      ]);
    }
  };

  const moveBlock = (dragIndex: number, hoverIndex: number) => {
    setPanelBlocks((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      const [draggedBlock] = newBlocks.splice(dragIndex, 1);
      newBlocks.splice(hoverIndex, 0, draggedBlock);
      return newBlocks;
    });
  };

  /* ---------- ОБНОВЛЕННАЯ ФУНКЦИЯ ПРОВЕРКИ СТРУКТУРЫ ---------- */

  const checkStructure = () => {
    const newBlocks: Block[] = [];
    const problems: string[] = [];

    const headerIndex = panelBlocks.findIndex((b) => b.type === "Header");
    const footerIndex = panelBlocks.findIndex((b) => b.type === "Footer");
    const mainIndex = panelBlocks.findIndex((b) => b.type === "Main");

    if (headerIndex === -1) problems.push("Отсутствует Header.");
    if (footerIndex === -1) problems.push("Отсутствует Footer.");
    if (mainIndex === -1) problems.push("Отсутствует Main.");

    // Проверяем, есть ли блоки Hero, Section, Article вне Main
    const insideMainBlocks = ["Hero", "Section", "Article"];

    panelBlocks.forEach((block) => {
      if (insideMainBlocks.includes(block.type)) {
        problems.push(`${block.type} должен находиться внутри Main.`);
      }
    });

    panelBlocks.forEach((block, index) => {
      let correctTop = true;

      if (block.type === "Header" && index !== 0) {
        correctTop = false;
        problems.push("Header должен быть первым.");
      }

      if (block.type === "Footer" && index !== panelBlocks.length - 1) {
        correctTop = false;
        problems.push("Footer должен быть последним.");
      }

      if (block.type === "Main" && (index === 0 || index === panelBlocks.length - 1)) {
        correctTop = false;
        problems.push("Main не должен быть первым или последним.");
      }

      let childrenChecked: Block[] | undefined = undefined;

      if (block.type === "Main") {
        if (block.children?.length) {
          childrenChecked = block.children.map((child) => {
            const ok = insideMainBlocks.includes(child.type);
            if (!ok) problems.push(`${child.type} — неверный блок внутри Main.`);

            return { ...child, isCorrect: ok };
          });
        }
      } else if (block.children?.length) {
        block.children.forEach((c) =>
          problems.push(`${c.type} не может быть внутри ${block.type}.`)
        );
        childrenChecked = block.children.map((c) => ({ ...c, isCorrect: false }));
      }

      newBlocks.push({
        ...block,
        isCorrect: correctTop,
        children: childrenChecked,
      });
    });

    setPanelBlocks(newBlocks);
    setErrors(problems);

    if (problems.length > 0) {
      setIsModalOpen(true);
    } else {
      setIsSuccessOpen(true);
    }
  };

  const resetAll = () => {
    setPanelBlocks([]);
    setAvailableBlocks(
      initialBlocksList.map((b) => ({ ...b, id: generateId() }))
    );
    setErrors([]);
    setIsModalOpen(false);
    setIsSuccessOpen(false);
  };

  return (
    <div className="game-container">
      <ErrorModal
        errors={errors}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <SuccessModal
        open={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />

      <InfoModal open={isInfoOpen} onClose={() => setIsInfoOpen(false)} />

      <div className="sidebar">
        <h3>Блоки</h3>

        {availableBlocks.map((b) => (
          <BlockItem key={b.id} block={b} />
        ))}

        <button className="info-button" onClick={() => setIsInfoOpen(true)}>
          Информация о блоках
        </button>
      </div>

      <div className="main-panel">
        <h3>Панель сборки</h3>

        <Panel
          blocks={panelBlocks}
          onDropTopLevel={handleDropTopLevel}
          onDropInside={handleDropInside}
          onRemove={removeBlock}
          onReorder={moveBlock}
        />

        <div className="bottom-right-buttons">
          <button className="check-button" onClick={checkStructure}>
            Проверить
          </button>

          <button className="reset-button" onClick={resetAll}>
            Сбросить / Обновить
          </button>
        </div>
      </div>
    </div>
  );
};

const Game: React.FC = () => (
  <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
    <GameContent />
    <CustomDragLayer />
  </DndProvider>
);

export default Game;