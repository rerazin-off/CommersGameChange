export interface InformPanelProps {
  currentLevel: {
    id: number,
    aliens: [string],
    planets: [string],
    code: [number],
    correctAnswer: [string],
    instruction: any,
  },
  selectedValues: Record<number, string>;
  onSelectChange: (commandId: number, value: string) => void;
  switchNextLevel: () => void;
  disabledBtn: boolean;
}

export interface CommandType{
  id: number,
  name: string,
  options: [string],
}

export interface LevelType{
  id: number,
  aliens: [string],
  planets: [string],
  code: [number],
  correctAnswer: [string],
  instruction: any,
}