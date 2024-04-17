import { Water, WaterId, WaterSize } from "./water.model";
import { waterRepo } from "./water.repo";

export async function findAll(): Promise<Water[]> {
    return waterRepo.findAll();
}
export async function findById(id: WaterId): Promise<Water|undefined> {
    return waterRepo.findById(id);
}

export async function searchBySize(size:WaterSize): Promise<Water|undefined> {
    return waterRepo.searchBySize(size)
}

export const waterService ={findAll, findById, searchBySize}