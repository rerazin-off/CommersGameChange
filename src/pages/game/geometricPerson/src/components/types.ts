export type BodyPart = 'head' | 'body' | 'arms' | 'legs';
export type ShapeType = 'circle' | 'square' | 'triangle' | 'oval' | 'rectangle';

export interface Shape {
  id: string;
  type: ShapeType;
  name: string;
  color: string;
  description: string;
  svg: string; // Путь к SVG изображению
}

export interface SelectedShape {
  bodyPart: BodyPart;
  shape: Shape | null;
}

export interface PersonalityResult {
  type: string;
  description: string;
  traits: string[];
  advice: string[];
}