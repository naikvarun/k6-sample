import {TimeService} from "../time-service";
import {faker} from "@faker-js/faker";

export function* makeProductGenerator(totalProducts: number, timeService: TimeService) {
  for (let i = 0; i < totalProducts; i++) {
    yield generateProduct(i + 1, timeService);
  }
}

function generateProduct(productId: number, timeService: TimeService) {
  return {
    id: productId,
    name: faker.commerce.productName(),
    type: faker.commerce.department(),
    price: faker.commerce.price({min: 10, max: 450}),
    created_at: timeService.now()
  }
}
