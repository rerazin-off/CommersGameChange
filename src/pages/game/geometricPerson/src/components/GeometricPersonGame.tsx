import React, { useState, useRef, useEffect } from 'react';
import {
  BODY_PARTS,
  BODY_PART_NAMES,
  BODY_PART_DESCRIPTIONS,
  SHAPES_BY_PART,
  PERSONALITY_TYPES,
  PERSONALITY_TRAITS,
  BodyPart,
  Shape,
  SelectedShape,
  PersonalityResult
} from './data';
import styles from './styles.module.scss';
import TouchDragShape from './TouchDragShape';

// Импортируем SVG изображения
import CircleSVG from '../img/ellipse.svg';
import SquareSVG from '../img/kvadrat.svg';
import TriangleSVG from '../img/triangle.svg';
import RectangleSVG from '../img/pryamoygolnik.svg';
import OvalSVG from '../img/oval.svg';

type ShapeType = 'circle' | 'square' | 'triangle' | 'rectangle' | 'oval';

interface ResultModalProps {
  result: PersonalityResult;
  selectedShapes: SelectedShape[];
  onClose: () => void;
  onRestart: () => void;
}

const ShapeSVG: React.FC<{ type: ShapeType; className?: string }> = ({ type, className }) => {
  switch (type) {
    case 'circle':
      return <img src={CircleSVG} alt="Круг" className={className} />;
    case 'square':
      return <img src={SquareSVG} alt="Квадрат" className={className} />;
    case 'triangle':
      return <img src={TriangleSVG} alt="Треугольник" className={className} />;
    case 'rectangle':
      return <img src={RectangleSVG} alt="Прямоугольник" className={className} />;
    case 'oval':
      return <img src={OvalSVG} alt="Овал" className={className} />;
    default:
      return null;
  }
};

// ПРОСТОЙ КОМПОНЕНТ ДЛЯ ПЕРЕТАСКИВАНИЯ - ТОЛЬКО ДЛЯ МЫШИ
interface DraggableShapeProps {
  shape: Shape;
  onDragStart: (shape: Shape, clientX: number, clientY: number) => void;
  onDragEnd: () => void;
  isTouchDevice: boolean;
}

const DraggableShape: React.FC<DraggableShapeProps> = ({ shape, onDragStart, onDragEnd, isTouchDevice }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('shapeId', shape.id);
    e.dataTransfer.setData('shapeType', shape.type);
    e.dataTransfer.setData('shapeName', shape.name);

    const dragImage = new Image();
    dragImage.src = shape.type === 'circle' ? CircleSVG :
      shape.type === 'square' ? SquareSVG :
        shape.type === 'triangle' ? TriangleSVG :
          shape.type === 'rectangle' ? RectangleSVG : OvalSVG;
    e.dataTransfer.setDragImage(dragImage, 25, 25);

    onDragStart(shape, e.clientX, e.clientY);
  };

  return (
    <div
      className={styles.draggableShape}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'grab',
      }}
    >
      <div className={styles.shapeVisual}>
        <ShapeSVG type={shape.type as ShapeType} className={styles.cardSVG} />
      </div>
      <div className={styles.shapeInfo}>
        <h4>{shape.name}</h4>
        <p className={styles.shapeType}>
          {shape.type === 'circle' ? 'Круг' :
            shape.type === 'square' ? 'Квадрат' :
              shape.type === 'triangle' ? 'Треугольник' :
                shape.type === 'oval' ? 'Овал' : 'Прямоугольник'}
        </p>
      </div>
      <div className={styles.dragHint}>
        <i className="fas fa-arrows-alt"></i> {isTouchDevice ? 'Нажмите чтобы выбрать' : 'Перетащите'}
      </div>
    </div>
  );
};

interface DropZoneProps {
  bodyPart: BodyPart;
  currentShape: Shape | null;
  onDrop: (bodyPart: BodyPart, shape: Shape | null) => void;
  isHighlighted: boolean;
  isEnabled: boolean;
  isCompleted: boolean;
}

// Замените компонент DropZone на упрощенную версию - только для пустых состояний
const DropZone: React.FC<DropZoneProps> = ({
                                             bodyPart,
                                             currentShape,
                                             onDrop,
                                             isHighlighted,
                                             isEnabled,
                                             isCompleted,
                                           }) => {
  const handleDrop = (e: React.DragEvent) => {
    if (!isEnabled) return;
    e.preventDefault();
    const shapeId = e.dataTransfer.getData('shapeId');
    const shapeType = e.dataTransfer.getData('shapeType') as ShapeType;
    const shapeName = e.dataTransfer.getData('shapeName');

    const allShapes = SHAPES_BY_PART[bodyPart];
    const shape = allShapes.find(s => s.id === shapeId) || {
      id: shapeId,
      type: shapeType,
      name: shapeName
    };

    onDrop(bodyPart, shape);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isEnabled) return;
    e.preventDefault();
  };

  const getBodyPartIcon = (part: BodyPart) => {
    switch (part) {
      case 'head': return 'user-circle';
      case 'body': return 'user';
      case 'leftArm': return 'hand-paper';
      case 'rightArm': return 'hand-paper';
      case 'leftLeg': return 'walking';
      case 'rightLeg': return 'walking';
      default: return 'question';
    }
  };

  const BODY_PART_NAMES_UPDATED = {
    head: 'Голова',
    body: 'Тело',
    leftArm: 'Левая рука',
    rightArm: 'Правая рука',
    leftLeg: 'Левая нога',
    rightLeg: 'Правая нога'
  };

  return (
    <div className={styles.dropZoneContainer}>
      {/* Показываем дроп-зону ТОЛЬКО если фигуры нет */}
      {!currentShape && (
        <div
          className={`${styles.dropZone} 
                      ${isHighlighted ? styles.highlighted : ''}
                      ${isEnabled ? styles.enabled : styles.disabled}`}
          onDrop={isEnabled ? handleDrop : undefined}
          onDragOver={isEnabled ? handleDragOver : undefined}
          data-body-part={bodyPart}
        >
          <div className={styles.dropZoneContent}>
            <div className={styles.dropZoneIcon}>
              <i className={`fas fa-${getBodyPartIcon(bodyPart)}`}></i>
            </div>
            <span className={styles.dropZoneText}>
              {BODY_PART_NAMES_UPDATED[bodyPart]}
            </span>
          </div>
        </div>
      )}

      {/* Если есть фигура, показываем кнопку удаления поверх фигуры */}
      {currentShape && isEnabled && (
        <button
          className={styles.removeButton}
          onClick={(e) => {
            e.stopPropagation();
            onDrop(bodyPart, null);
          }}
          title="Удалить фигуру"
        >
          <i className="fas fa-trash-alt" style={{
            color: '#ff6b6b',
            fontSize: '12px'
          }}></i>
        </button>
      )}
    </div>
  );
};

const GeometricPersonDisplay: React.FC<{
  selectedShapes: SelectedShape[];
  currentStep: BodyPart;
  highlightedPart: BodyPart | null;
  onDrop: (bodyPart: BodyPart, shape: Shape | null) => void;
}> = ({ selectedShapes, currentStep, highlightedPart, onDrop }) => {
  const headShape = selectedShapes.find(s => s.bodyPart === 'head')?.shape;
  const bodyShape = selectedShapes.find(s => s.bodyPart === 'body')?.shape;
  const leftArmShape = selectedShapes.find(s => s.bodyPart === 'leftArm')?.shape;
  const rightArmShape = selectedShapes.find(s => s.bodyPart === 'rightArm')?.shape;
  const leftLegShape = selectedShapes.find(s => s.bodyPart === 'leftLeg')?.shape;
  const rightLegShape = selectedShapes.find(s => s.bodyPart === 'rightLeg')?.shape;

  const isDropZoneEnabled = (bodyPart: BodyPart): boolean => {
    return bodyPart === currentStep;
  };

  return (
    <div className={styles.geometricPerson}>
      {/* Голова */}
      <div className={styles.personHead}>
        <div className={styles.shapeContainer}>
          {headShape ? (
            <ShapeSVG type={headShape.type as ShapeType} className={styles.headSVG} />
          ) : (
            <div className={styles.placeholder}>
              <i className="fas fa-user-circle"></i>
            </div>
          )}
        </div>
        <DropZone
          bodyPart="head"
          currentShape={headShape}
          onDrop={onDrop}
          isHighlighted={highlightedPart === 'head'}
          isEnabled={isDropZoneEnabled('head')}
        />
      </div>

      {/* Торс и руки */}
      <div className={styles.torsoSection}>
        {/* Левая рука */}
        <div className={styles.leftArm}>
          <div className={styles.shapeContainer}>
            {leftArmShape ? (
              <ShapeSVG type={leftArmShape.type as ShapeType} className={styles.armSVG} />
            ) : (
              <div className={styles.placeholder}>
                <i className="fas fa-arrow-left"></i>
              </div>
            )}
          </div>
          <DropZone
            bodyPart="leftArm"
            currentShape={leftArmShape}
            onDrop={onDrop}
            isHighlighted={highlightedPart === 'leftArm'}
            isEnabled={isDropZoneEnabled('leftArm')}
          />
        </div>

        {/* Тело */}
        <div className={styles.body}>
          <div className={styles.shapeContainer}>
            {bodyShape ? (
              <ShapeSVG type={bodyShape.type as ShapeType} className={styles.bodySVG} />
            ) : (
              <div className={styles.placeholder}>
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>
          <DropZone
            bodyPart="body"
            currentShape={bodyShape}
            onDrop={onDrop}
            isHighlighted={highlightedPart === 'body'}
            isEnabled={isDropZoneEnabled('body')}
          />
        </div>

        {/* Правая рука */}
        <div className={styles.rightArm}>
          <div className={styles.shapeContainer}>
            {rightArmShape ? (
              <ShapeSVG type={rightArmShape.type as ShapeType} className={styles.armSVG} />
            ) : (
              <div className={styles.placeholder}>
                <i className="fas fa-arrow-right"></i>
              </div>
            )}
          </div>
          <DropZone
            bodyPart="rightArm"
            currentShape={rightArmShape}
            onDrop={onDrop}
            isHighlighted={highlightedPart === 'rightArm'}
            isEnabled={isDropZoneEnabled('rightArm')}
          />
        </div>
      </div>

      {/* Ноги */}
      <div className={styles.legsSection}>
        <div className={styles.leftLeg}>
          <div className={styles.shapeContainer}>
            {leftLegShape ? (
              <ShapeSVG type={leftLegShape.type as ShapeType} className={styles.legSVG} />
            ) : (
              <div className={styles.placeholder}>
                <i className="fas fa-arrow-down"></i>
              </div>
            )}
          </div>
          <DropZone
            bodyPart="leftLeg"
            currentShape={leftLegShape}
            onDrop={onDrop}
            isHighlighted={highlightedPart === 'leftLeg'}
            isEnabled={isDropZoneEnabled('leftLeg')}
          />
        </div>
        <div className={styles.rightLeg}>
          <div className={styles.shapeContainer}>
            {rightLegShape ? (
              <ShapeSVG type={rightLegShape.type as ShapeType} className={styles.legSVG} />
            ) : (
              <div className={styles.placeholder}>
                <i className="fas fa-arrow-down"></i>
              </div>
            )}
          </div>
          <DropZone
            bodyPart="rightLeg"
            currentShape={rightLegShape}
            onDrop={onDrop}
            isHighlighted={highlightedPart === 'rightLeg'}
            isEnabled={isDropZoneEnabled('rightLeg')}
          />
        </div>
      </div>
    </div>
  );
};

const ResultModal: React.FC<ResultModalProps> = ({ result, selectedShapes, onClose, onRestart }) => {
  const shapeStats = selectedShapes.reduce((acc, item) => {
    if (item.shape) {
      acc[item.shape.type] = (acc[item.shape.type] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const sortedShapes = Object.entries(shapeStats).sort((a, b) => b[1] - a[1]);
  const mostCommonShape = sortedShapes[0];

  const getShapeDescription = (shapeType: string) => {
    const shapeInfo = PERSONALITY_TRAITS[shapeType as keyof typeof PERSONALITY_TRAITS];
    return shapeInfo ? shapeInfo.description : '';
  };

  const getShapeLabel = (type: string) => {
    switch (type) {
      case 'circle': return 'Круг';
      case 'square': return 'Квадрат';
      case 'triangle': return 'Треугольник';
      case 'oval': return 'Овал';
      case 'rectangle': return 'Прямоугольник';
      default: return '';
    }
  };

  return (
    <div className={styles.resultModal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2><i className="fas fa-user-astronaut"></i> Результат анализа</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className={styles.finalPerson}>
          <div className={styles.personVisual}>
            <GeometricPersonDisplay
              selectedShapes={selectedShapes}
              currentStep="head"
              highlightedPart={null}
              onDrop={() => {}}
            />

            <div className={styles.shapeStats}>
              <h4>Статистика выбора:</h4>
              <div className={styles.statsGrid}>
                {Object.entries(shapeStats).map(([type, count]) => (
                  <div key={type} className={styles.statItem}>
                    <div className={styles.statShape}>
                      <ShapeSVG type={type as ShapeType} className={styles.statSVG} />
                    </div>
                    <div className={styles.statCount}>{count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.personInfo}>
            <div className={styles.personalityType}>
              <h3>Тип личности:</h3>
              <div className={styles.typeBadge}>{result.type}</div>
            </div>

            <div className={styles.description}>
              <p>{result.description}</p>
              {mostCommonShape && (
                <div className={styles.shapeExplanation}>
                  <h4>Анализ выбора фигур:</h4>
                  <p>Вы чаще всего выбирали <strong>{getShapeLabel(mostCommonShape[0])}</strong> ({mostCommonShape[1]} раз).</p>
                  <p>{getShapeDescription(mostCommonShape[0])}</p>
                </div>
              )}
            </div>

            <div className={styles.traits}>
              <h4>Основные черты:</h4>
              <div className={styles.traitsList}>
                {result.traits.map((trait, index) => (
                  <div key={index} className={styles.traitBadge}>
                    <i className="fas fa-star"></i> {trait}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.adviceSection}>
              <h4><i className="fas fa-lightbulb"></i> Рекомендации для развития:</h4>
              <div className={styles.adviceList}>
                {result.advice.map((item, index) => (
                  <div key={index} className={styles.adviceItem}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalControls}>
          <button className={styles.button} onClick={onClose}>
            Закрыть
          </button>
          <button className={styles.buttonPrimary} onClick={onRestart}>
            <i className="fas fa-redo"></i> Начать заново
          </button>
        </div>
      </div>
    </div>
  );
};

const GeometricPersonGame: React.FC = () => {
  const NEW_BODY_PARTS: BodyPart[] = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];

  const [currentStep, setCurrentStep] = useState<BodyPart>('head');
  const [selectedShapes, setSelectedShapes] = useState<SelectedShape[]>([
    { bodyPart: 'head', shape: null },
    { bodyPart: 'body', shape: null },
    { bodyPart: 'leftArm', shape: null },
    { bodyPart: 'rightArm', shape: null },
    { bodyPart: 'leftLeg', shape: null },
    { bodyPart: 'rightLeg', shape: null }
  ]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [draggingShape, setDraggingShape] = useState<Shape | null>(null);
  const [highlightedPart, setHighlightedPart] = useState<BodyPart | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const progress = ((NEW_BODY_PARTS.indexOf(currentStep) + 1) / NEW_BODY_PARTS.length) * 100;

  const handleDragStart = (shape: Shape, clientX: number, clientY: number) => {
    setDraggingShape(shape);
    setHighlightedPart(currentStep);
  };

  const handleDragEnd = () => {
    setDraggingShape(null);
    setHighlightedPart(null);
  };

  const handleDrop = (bodyPart: BodyPart, shape: Shape | null) => {
    if (bodyPart !== currentStep) return;

    if (shape) {
      setSelectedShapes(prev =>
        prev.map(item =>
          item.bodyPart === bodyPart
            ? { ...item, shape }
            : item
        )
      );

      const currentIndex = NEW_BODY_PARTS.indexOf(bodyPart);
      if (currentIndex < NEW_BODY_PARTS.length - 1) {
        const nextPart = NEW_BODY_PARTS[currentIndex + 1];
        setCurrentStep(nextPart);
      }
    } else {
      setSelectedShapes(prev =>
        prev.map(item =>
          item.bodyPart === bodyPart
            ? { ...item, shape: null }
            : item
        )
      );
    }
    setHighlightedPart(null);
  };

  const handleTouchDrop = (shape: Shape, dropZoneId: string) => {
    const bodyPart = dropZoneId as BodyPart;
    if (bodyPart !== currentStep) return;

    setSelectedShapes(prev =>
      prev.map(item =>
        item.bodyPart === bodyPart
          ? { ...item, shape }
          : item
      )
    );

    const currentIndex = NEW_BODY_PARTS.indexOf(bodyPart);
    if (currentIndex < NEW_BODY_PARTS.length - 1) {
      const nextPart = NEW_BODY_PARTS[currentIndex + 1];
      setCurrentStep(nextPart);
    }
    setHighlightedPart(null);
  };

  const analyzePersonality = (shapes: SelectedShape[]): PersonalityResult => {
    const shapeCounts: Record<string, number> = {};
    shapes.forEach(item => {
      if (item.shape) {
        shapeCounts[item.shape.type] = (shapeCounts[item.shape.type] || 0) + 1;
      }
    });

    const circleCount = shapeCounts.circle || 0;
    const squareCount = shapeCounts.square || 0;
    const triangleCount = shapeCounts.triangle || 0;
    const ovalCount = shapeCounts.oval || 0;
    const rectangleCount = shapeCounts.rectangle || 0;

    if (circleCount >= 4) return PERSONALITY_TYPES.creative;
    if (squareCount >= 4) return PERSONALITY_TYPES.organizer;
    if (triangleCount >= 4) return PERSONALITY_TYPES.leader;
    if (ovalCount >= 4) return PERSONALITY_TYPES.diplomat;
    if (rectangleCount >= 4) return PERSONALITY_TYPES.realist;

    if (circleCount >= 3 && squareCount >= 2) return PERSONALITY_TYPES.creativeOrganizer;
    if (triangleCount >= 3 && ovalCount >= 2) return PERSONALITY_TYPES.dynamicDiplomat;
    if (squareCount >= 3 && rectangleCount >= 2) return PERSONALITY_TYPES.structuredRealist;

    const dominantType = Object.entries(shapeCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'circle';

    return {
      type: 'Универсальная личность',
      description: `Вы выбрали разнообразные формы. Ваши выборы показывают сбалансированность и адаптивность.`,
      traits: ['Адаптивность', 'Гибкость', 'Универсальность', 'Открытость'],
      advice: [
        'Продолжайте развивать разные стороны личности',
        'Используйте свои сильные стороны в различных ситуациях',
        'Экспериментируйте с новыми подходами',
        'Балансируйте между разными стилями мышления'
      ]
    };
  };

  const handleRestart = () => {
    setCurrentStep('head');
    setSelectedShapes([
      { bodyPart: 'head', shape: null },
      { bodyPart: 'body', shape: null },
      { bodyPart: 'leftArm', shape: null },
      { bodyPart: 'rightArm', shape: null },
      { bodyPart: 'leftLeg', shape: null },
      { bodyPart: 'rightLeg', shape: null }
    ]);
    setShowResult(false);
    setResult(null);
    setHighlightedPart(null);
  };

  const currentShapes = SHAPES_BY_PART[currentStep] || [];

  const BODY_PART_NAMES_UPDATED = {
    head: 'Голова',
    body: 'Тело',
    leftArm: 'Левая рука',
    rightArm: 'Правая рука',
    leftLeg: 'Левая нога',
    rightLeg: 'Правая нога'
  };

  const BODY_PART_DESCRIPTIONS_UPDATED = {
    head: 'Выберите форму головы',
    body: 'Выберите форму тела',
    leftArm: 'Выберите форму для левой руки',
    rightArm: 'Выберите форму для правой руки',
    leftLeg: 'Выберите форму для левой ноги',
    rightLeg: 'Выберите форму для правой ноги'
  };

  const isAllPartsFilled = selectedShapes.every(item => item.shape !== null);

  return (
    <div className={styles.gameContainer}>
      <div className={styles.header}>
        <h1><i className="fas fa-shapes"></i> Геометрический Человек</h1>
        <p>Перетащите фигуры на части тела чтобы собрать человека</p><br/>
        <p>В конце сбоки нажмите на зелёные круги ниже чтобы перемещаться между частями тела и редактировать их</p>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.steps}>
          {NEW_BODY_PARTS.map((part) => {
            const isActive = part === currentStep;
            const isCompleted = selectedShapes.find(s => s.bodyPart === part)?.shape !== null;

            return (
              <div key={part} className={styles.step} onClick={() => {
                const filledCount = selectedShapes.filter(s => s.shape !== null).length;
                const partIndex = NEW_BODY_PARTS.indexOf(part);
                if (partIndex <= filledCount) {
                  setCurrentStep(part);
                }
              }}>
                <div
                  className={`${styles.stepNumber} ${
                    isActive ? styles.active :
                      isCompleted ? styles.completed : ''
                  }`}
                >
                  {isCompleted ? <i className="fas fa-check"></i> :
                    NEW_BODY_PARTS.indexOf(part) + 1}
                </div>
                <span className={styles.stepName}>{BODY_PART_NAMES_UPDATED[part]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.gameArea}>
        <div className={styles.assemblyPanel}>
          <h2><i className="fas fa-user"></i> Поле сборки</h2>

          <div className={styles.personPreview}>
            <GeometricPersonDisplay
              selectedShapes={selectedShapes}
              currentStep={currentStep}
              highlightedPart={highlightedPart}
              onDrop={handleDrop}
            />
          </div>

          <div className={styles.currentStepInfo}>
            <h3>Текущий шаг: <span>{BODY_PART_NAMES_UPDATED[currentStep]}</span></h3>
            <p>{BODY_PART_DESCRIPTIONS_UPDATED[currentStep]}</p>
          </div>
        </div>

        <div className={styles.shapesPanel}>
          <h2><i className="fas fa-shapes"></i> Фигуры</h2>
          <div className={styles.shapesHint}>
            <i className="fas fa-info-circle"></i>
            <span>Зажмите фигуру и перетащите на часть тела</span>
          </div>

          {currentShapes.length > 0 ? (
            <div className={styles.shapesGrid}>
              {currentShapes.map(shape => (
                isTouchDevice ? (
                  <TouchDragShape
                    key={shape.id}
                    shape={shape}
                    onDrop={handleTouchDrop}
                  />
                ) : (
                  <DraggableShape
                    key={shape.id}
                    shape={shape}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    isTouchDevice={isTouchDevice}
                  />
                )
              ))}
            </div>
          ) : (
            <div className={styles.noShapes}>
              <i className="fas fa-exclamation-triangle"></i>
              <p>Нет доступных фигур для этой части тела</p>
              <p>Проверьте файл data.ts</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.buttonPrimary}
          onClick={() => {
            const personalityResult = analyzePersonality(selectedShapes);
            setResult(personalityResult);
            setShowResult(true);
          }}
          disabled={!isAllPartsFilled}
        >
          <i className="fas fa-chart-bar"></i> Анализировать личность
        </button>

        <button
          className={styles.button}
          onClick={handleRestart}
        >
          <i className="fas fa-redo"></i> Начать заново
        </button>
      </div>

      {showResult && result && (
        <ResultModal
          result={result}
          selectedShapes={selectedShapes}
          onClose={() => setShowResult(false)}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default GeometricPersonGame;