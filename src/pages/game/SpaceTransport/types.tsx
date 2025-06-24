export type Transport= {
  id: number,
  img: string,
  capacity: number,
  amountFuel: number,
  cost: number,
  numPerson: number,
  active: boolean,
  rangeDays: [number, number],
  currentPlanetId: number,
}

export type PlanetT={
  id: number,
  img: string,
  countPerson: number,
  paths: number[],
  pathsPlanet1: number[],
  pathsPlanet2: number[],
  pathsPlanet3: number[],
}

export type PositionTransport={
  x: number,
  y: number
}