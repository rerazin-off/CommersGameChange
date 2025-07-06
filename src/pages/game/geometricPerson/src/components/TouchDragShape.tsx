import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import CircleSVG from '../img/ellipse.svg';
import SquareSVG from '../img/kvadrat.svg';
import TriangleSVG from '../img/triangle.svg';
import RectangleSVG from '../img/pryamoygolnik.svg';
import OvalSVG from '../img/oval.svg';
import { Shape } from './data';

type ShapeType = 'circle' | 'square' | 'triangle' | 'rectangle' | 'oval';

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

interface TouchDragShapeProps {
  shape: Shape;
  onDrop: (shape: Shape, dropZoneId: string) => void;
}

const TouchDragShape: React.FC<TouchDragShapeProps> = ({ shape, onDrop }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragVisualRef = useRef<HTMLDivElement | null>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const isTouchActiveRef = useRef(false);
  const touchIdRef = useRef<number | null>(null);
  const originalElementRef = useRef<HTMLDivElement | null>(null);
  const originalOpacityRef = useRef<string>('1');
  const originalVisibilityRef = useRef<string>('visible');

  // Функция для сброса состояния
  const resetTouchState = () => {
    setIsDragging(false);
    isTouchActiveRef.current = false;
    touchIdRef.current = null;

    // Восстанавливаем видимость оригинального элемента
    if (originalElementRef.current) {
      originalElementRef.current.style.opacity = originalOpacityRef.current;
      originalElementRef.current.style.visibility = originalVisibilityRef.current;
      originalElementRef.current.classList.remove(styles.dragging);
      originalElementRef.current.style.pointerEvents = 'auto';
    }

    // Убираем подсветку
    document.querySelectorAll(`.${styles.dropZone}.${styles.highlighted}`).forEach(el => {
      el.classList.remove(styles.highlighted);
    });

    // Удаляем визуальный элемент если есть
    if (dragVisualRef.current && document.body.contains(dragVisualRef.current)) {
      document.body.removeChild(dragVisualRef.current);
      dragVisualRef.current = null;
    }

    // Восстанавливаем скроллинг
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // ЗАЩИТА ОТ МУЛЬТИТАЧА: если уже есть активное касание или больше одного пальца
    if (isTouchActiveRef.current || e.touches.length > 1) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Устанавливаем флаг и запоминаем ID касания
    isTouchActiveRef.current = true;
    touchIdRef.current = e.touches[0].identifier;

    e.stopPropagation();
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);

    // Сохраняем ссылку на оригинальный элемент и его стили
    originalElementRef.current = e.currentTarget as HTMLDivElement;
    originalOpacityRef.current = originalElementRef.current.style.opacity || '1';
    originalVisibilityRef.current = originalElementRef.current.style.visibility || 'visible';

    // Делаем оригинальный элемент полупрозрачным и некликабельным
    originalElementRef.current.style.opacity = '0.3';
    originalElementRef.current.style.pointerEvents = 'none';
    originalElementRef.current.classList.add(styles.dragging);

    // Создаем визуальный элемент
    const dragVisual = document.createElement('div');
    dragVisual.className = styles.dragVisual;
    dragVisual.style.position = 'fixed';
    dragVisual.style.left = `${touch.clientX - 40}px`;
    dragVisual.style.top = `${touch.clientY - 40}px`;
    dragVisual.style.width = '80px';
    dragVisual.style.height = '80px';
    dragVisual.style.zIndex = '10000';
    dragVisual.style.pointerEvents = 'none';
    dragVisual.style.opacity = '0.9';
    dragVisual.style.background = 'white';
    dragVisual.style.borderRadius = '10px';
    dragVisual.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    dragVisual.style.transition = 'transform 0.1s ease';
    dragVisual.style.display = 'flex';
    dragVisual.style.alignItems = 'center';
    dragVisual.style.justifyContent = 'center';

    const img = document.createElement('img');
    img.src = shape.type === 'circle' ? CircleSVG :
      shape.type === 'square' ? SquareSVG :
        shape.type === 'triangle' ? TriangleSVG :
          shape.type === 'rectangle' ? RectangleSVG : OvalSVG;
    img.style.width = '60px';
    img.style.height = '60px';
    img.style.objectFit = 'contain';

    dragVisual.appendChild(img);
    document.body.appendChild(dragVisual);
    dragVisualRef.current = dragVisual;

    // Предотвращаем скроллинг
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    setPosition({ x: touch.clientX - 40, y: touch.clientY - 40 });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // ЗАЩИТА ОТ МУЛЬТИТАЧА: если больше одного пальца
    if (e.touches.length > 1) {
      resetTouchState();
      return;
    }

    // Проверяем, что это наше касание
    const currentTouch = Array.from(e.touches).find(t => t.identifier === touchIdRef.current);
    if (!currentTouch || !isDragging || !dragVisualRef.current) {
      resetTouchState();
      return;
    }

    e.preventDefault();
    const x = currentTouch.clientX - 40;
    const y = currentTouch.clientY - 40;

    // Плавное движение визуального элемента
    dragVisualRef.current.style.left = `${x}px`;
    dragVisualRef.current.style.top = `${y}px`;
    setPosition({ x, y });

    // Подсвечиваем drop-зону под пальцем
    const elements = document.elementsFromPoint(currentTouch.clientX, currentTouch.clientY);
    const dropZone = elements.find(el => el.classList.contains(styles.dropZone));

    // Убираем подсветку со всех
    document.querySelectorAll(`.${styles.dropZone}.${styles.highlighted}`).forEach(el => {
      el.classList.remove(styles.highlighted);
    });

    if (dropZone && dropZone.classList.contains(styles.enabled)) {
      dropZone.classList.add(styles.highlighted);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // ЗАЩИТА ОТ МУЛЬТИТАЧА: если все еще есть касания (не последний палец)
    if (e.touches.length > 0) {
      resetTouchState();
      return;
    }

    // Находим наше касание среди завершенных
    const endedTouch = Array.from(e.changedTouches).find(t => t.identifier === touchIdRef.current);
    if (!endedTouch || !isDragging || !dragVisualRef.current) {
      resetTouchState();
      return;
    }

    e.preventDefault();

    // Находим drop-зону
    const elements = document.elementsFromPoint(endedTouch.clientX, endedTouch.clientY);
    const dropZone = elements.find(el => el.classList.contains(styles.dropZone));

    if (dropZone && dropZone.classList.contains(styles.enabled)) {
      const dropZoneId = dropZone.getAttribute('data-body-part');
      if (dropZoneId) {
        // Успешный дроп - полностью скрываем оригинальный элемент
        if (originalElementRef.current) {
          originalElementRef.current.style.opacity = '0';
          originalElementRef.current.style.visibility = 'hidden';
        }

        // Плавно скрываем визуальный элемент
        if (dragVisualRef.current) {
          dragVisualRef.current.style.transition = 'all 0.3s ease';
          dragVisualRef.current.style.opacity = '0';
          dragVisualRef.current.style.transform = 'scale(0.5)';
        }

        // Вызываем callback с небольшой задержкой для анимации
        setTimeout(() => {
          onDrop(shape, dropZoneId);
          resetTouchState();
        }, 300);
        return;
      }
    }

    // Если дроп не удался, плавно возвращаем визуальный элемент к оригиналу
    if (dragVisualRef.current && originalElementRef.current) {
      const originalRect = originalElementRef.current.getBoundingClientRect();
      dragVisualRef.current.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
      dragVisualRef.current.style.left = `${originalRect.left + 10}px`;
      dragVisualRef.current.style.top = `${originalRect.top + 10}px`;
      dragVisualRef.current.style.opacity = '0';
      dragVisualRef.current.style.transform = 'scale(0.8)';

      // Восстанавливаем оригинальный элемент
      originalElementRef.current.style.transition = 'opacity 0.3s ease';
      originalElementRef.current.style.opacity = originalOpacityRef.current;

      setTimeout(() => {
        resetTouchState();
      }, 400);
    } else {
      resetTouchState();
    }
  };

  // Обработчик для отмены при любых проблемах
  const handleTouchCancel = () => {
    resetTouchState();
  };

  // Добавляем глобальные обработчики для дополнительной защиты
  useEffect(() => {
    // Сброс при потере фокуса окном
    const handleWindowBlur = () => {
      resetTouchState();
    };

    // Сброс при скролле
    const handleTouchStartGlobal = (e: TouchEvent) => {
      if (isTouchActiveRef.current && e.touches.length > 1) {
        resetTouchState();
        e.preventDefault();
      }
    };

    // Сброс при изменении ориентации
    const handleOrientationChange = () => {
      resetTouchState();
    };

    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('orientationchange', handleOrientationChange);
    document.addEventListener('touchstart', handleTouchStartGlobal, { passive: false });

    return () => {
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.removeEventListener('touchstart', handleTouchStartGlobal);

      // Очистка при размонтировании
      resetTouchState();
    };
  }, []);

  return (
    <div
      ref={originalElementRef}
      className={`${styles.draggableShape} ${isDragging ? styles.dragging : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none',
        WebkitTouchCallout: 'none',
        transition: 'opacity 0.3s ease',
      }}
    >
      <div className={styles.shapeVisual}>
        <ShapeSVG type={shape.type as ShapeType} className={styles.cardSVG} />
      </div>
      <div className={styles.shapeInfo}>
        <h4>{shape.name}</h4>
      </div>
      <div className={styles.dragHint}>
        <i className="fas fa-arrows-alt"></i> Нажмите и перетащите
      </div>
    </div>
  );
};

export default TouchDragShape;