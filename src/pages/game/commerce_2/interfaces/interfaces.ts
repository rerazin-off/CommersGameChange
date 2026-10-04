import type React from 'react';

export type DragSource = 'products' | 'refrigerator' | 'purple';



export interface Product {
  src: string;
  alt: string;
  category: string;
  bakaleyaGroup?: string;
}

export interface Refrigerator {
  src: string;
  alt: string;
  categories: string[];
  width: number;
  height: number;
}

export interface MatchedItem {
  productIndex: number;
  refrigeratorIndex: number;
  isCorrect: boolean;
}
export interface DraggedItem {
  productIndex: number;
  source: DragSource;
  refrigeratorIndex?: number;
}

export interface ImageCardProps {
  src: string;
  alt: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  isMatched?: boolean;
  style?: React.CSSProperties;
  isCorrect?: boolean;
}
export interface GhostElements{
  src: string;
  alt: string;
  visible: boolean;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}
export interface TouchesActive{
  productIndex: number;
    element: HTMLElement;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
    source: 'products' | 'refrigerator' | 'purple';
    refrigeratorIndex?: number;
}