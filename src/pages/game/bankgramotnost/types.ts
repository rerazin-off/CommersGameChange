export interface Bag {
  id: number;
  label: string;
  image: string;
  part?: 'left' | 'right';
}

export type SlotContent = number[];
export type BagsList = Array<Bag>;