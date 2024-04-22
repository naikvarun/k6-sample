export type TeaLeaf = {
  id: string;
  name: string;
  amount: string;
  type: string
};

export type Water = {
  amount: number;
  temperature: number;
};

export type TeaResponse = {
  teaLeaf: TeaLeaf;
  water: Water;
  steepingTime: number;
};
