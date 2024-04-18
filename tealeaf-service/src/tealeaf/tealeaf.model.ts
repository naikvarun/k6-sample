const teaLeafType = ['green', 'black', 'earl grey'] as const;

export function isTeaLeafType(obj: unknown): obj is TeaLeafType {
  return (
    typeof obj === 'string' &&
    (obj === 'green' || obj === 'black' || obj === 'earl grey')
  );
}
export type TeaLeafType = (typeof teaLeafType)[number];

export type TeaLeafId = string;
export type TeaLeaf = {
  id: TeaLeafId;
  name: string;
  suggestedAmount: number;
  steepingTime: number;
  waterTemperature: number;
  type: TeaLeafType;
};
