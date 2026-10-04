import { useState, useRef } from 'react';
import type {Product,GhostElements,TouchesActive,DragSource,DraggedItem } from '../interfaces/interfaces';

interface Params {
  productsAll: Product[];
  onDropOnRefrigerator: (
    refrigeratorIndex: number,
    productIndex: number,
    source: DragSource,
    fromRefrigeratorIndex?: number
  ) => void;
  onDropOnPurpleZone: (
    productIndex: number,
    source: DragSource,
    fromRefrigeratorIndex?: number
  ) => void;
}

export const useDragAndDrop = ({
  productsAll,
  onDropOnRefrigerator,
  onDropOnPurpleZone,
}: Params) => {
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [touchActive, setTouchActive] = useState<TouchesActive | null>(null);
  const [ghostElement, setGhostElement] = useState<GhostElements | null>(null);
  const touchMoveRef = useRef<number | null>(null);

  const handleDragStart = (
    productIndex: number,
    source: DragSource = 'products',
    refrigeratorIndex?: number
  ) => {
    setDraggedItem({ productIndex, source, refrigeratorIndex });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleTouchStart = (
    productIndex: number,
    e: React.TouchEvent,
    source: DragSource = 'products',
    refrigeratorIndex?: number
  ) => {
    e.preventDefault();
    const touch = e.touches[0];
    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();

    setGhostElement({
      src: productsAll[productIndex].src,
      alt: productsAll[productIndex].alt,
      visible: true,
      x: touch.clientX,
      y: touch.clientY,
      offsetX: touch.clientX - rect.left,
      offsetY: touch.clientY - rect.top,
    });

    setTouchActive({
      productIndex,
      element,
      startX: touch.clientX,
      startY: touch.clientY,
      offsetX: touch.clientX - rect.left,
      offsetY: touch.clientY - rect.top,
      source,
      refrigeratorIndex,
    });

    setDraggedItem({ productIndex, source, refrigeratorIndex });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (touchMoveRef.current) cancelAnimationFrame(touchMoveRef.current);

    touchMoveRef.current = requestAnimationFrame(() => {
      if (touchActive && ghostElement) {
        const touch = e.touches[0];
        setGhostElement({
          ...ghostElement,
          x: touch.clientX - ghostElement.offsetX,
          y: touch.clientY - ghostElement.offsetY,
        });
      }
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (touchMoveRef.current) cancelAnimationFrame(touchMoveRef.current);

    if (touchActive) {
      const touch = e.changedTouches[0];
      setGhostElement((prev) => (prev ? { ...prev, visible: false } : null));

      const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
      const refrigeratorElement = dropTarget?.closest('[data-refrigerator]');

      if (refrigeratorElement) {
        const refrigeratorIndex = parseInt(
          refrigeratorElement.getAttribute('data-refrigerator') || '0'
        );
        onDropOnRefrigerator(
          refrigeratorIndex,
          touchActive.productIndex,
          touchActive.source,
          touchActive.refrigeratorIndex
        );
      } else if (dropTarget?.closest('[data-purple-zone]')) {
        onDropOnPurpleZone(
          touchActive.productIndex,
          touchActive.source,
          touchActive.refrigeratorIndex
        );
      } else if (touchActive.source === 'refrigerator') {
        onDropOnPurpleZone(
          touchActive.productIndex,
          touchActive.source,
          touchActive.refrigeratorIndex
        );
      }

      setTouchActive(null);
      setDraggedItem(null);
    }
  };

  const handleDropOnRefrigeratorsArea = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem) return;

    const refrigeratorElements = document.querySelectorAll('[data-refrigerator]');
    let closestRefrigerator: string | null = null;
    let minDistance = Infinity;

    refrigeratorElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestRefrigerator = el.getAttribute('data-refrigerator');
      }
    });

    if (closestRefrigerator !== null) {
      onDropOnRefrigerator(
        parseInt(closestRefrigerator),
        draggedItem.productIndex,
        draggedItem.source,
        draggedItem.refrigeratorIndex
      );
    } else {
      onDropOnPurpleZone(
        draggedItem.productIndex,
        draggedItem.source,
        draggedItem.refrigeratorIndex
      );
    }
    setDraggedItem(null);
  };

  return {
    draggedItem,
    ghostElement,
    handleDragStart,
    handleDragOver,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDropOnRefrigeratorsArea,
  };
};