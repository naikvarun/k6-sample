export interface TimeService {
  now(): Date;
}


export class DatFlowTimeService  implements TimeService {
  now() {
    return new Date();
  }
}
