export interface Bag {
  id: number;
  label: string;
  image: string;
}

export type SlotContent = number[]; // Теперь слот содержит массив ID
export type BagsList = Array<Bag>