import { Water, WaterId, WaterSize } from "./water.model";

const allWaters: {[key: WaterId]: Water} = {
    '1': {id: '1',amount: '100 ml',size: 'small'},
    '2': {id: '2', amount: '200 ml', size: 'medium'},
    '3': {id: '3', amount: '300 ml',size: 'large'}
}

export async function findAll(): Promise<Water[]> {
    return Object.values(allWaters)
}
export async function findById(id: WaterId): Promise<Water|undefined> {
    return id in allWaters?  allWaters[id] : undefined;
}

export async function searchBySize(size:WaterSize): Promise<Water|undefined> {
    return Object.values(allWaters).find(w=>w.size===size)
}

export const waterRepo = {findAll, findById, searchBySize}