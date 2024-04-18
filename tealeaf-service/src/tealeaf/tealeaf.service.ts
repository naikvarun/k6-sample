import { TeaLeaf, TeaLeafId, TeaLeafType } from './tealeaf.model';
import { tealeafRepo } from './tealeaf.repo';

export async function findAll(): Promise<TeaLeaf[]> {
  return tealeafRepo.findAll();
}
export async function findById(id: TeaLeafId): Promise<TeaLeaf | undefined> {
  return tealeafRepo.findById(id);
}

export async function searchByType(
  type: TeaLeafType
): Promise<TeaLeaf | undefined> {
  return tealeafRepo.searchByType(type);
}

export async function searchByName(name: string): Promise<TeaLeaf | undefined> {
  return tealeafRepo.searchByName(name);
}

export const tealeafService = { findAll, findById, searchByType, searchByName };
