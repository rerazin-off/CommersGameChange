export interface Bag {
  id: number;
  label: string;
  image: string;
  part?: 'left' | 'right'; // Добавляем информацию о части чемодана
}

export type SlotContent = number[];
export type BagsList = Array<Bag>;