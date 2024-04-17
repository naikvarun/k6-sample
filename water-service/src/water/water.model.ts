const waterSizes = ['small', 'medium', 'large'] as const;

export function isWaterSize(obj: unknown) : obj is WaterSize {
    return typeof obj === 'string' &&  (obj === 'small' || obj === 'medium' || obj === 'large');
}
export type WaterSize = typeof waterSizes[number]
export type WaterId = string
export type Water = {
    id: WaterId,
    amount: string,
    size: WaterSize
}