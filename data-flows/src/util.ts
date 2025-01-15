import {faker} from '@faker-js/faker'

const msForSecs = (sec: number) => sec * 1000;
export const sleepRandom = () => sleep(faker.number.int({min: msForSecs(10), max: msForSecs(30)}));



const sleep = (ms : number)=> new Promise(r => setTimeout(r, ms));
