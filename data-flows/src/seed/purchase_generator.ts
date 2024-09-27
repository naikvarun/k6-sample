import {faker} from "@faker-js/faker";
import {TimeService} from "../time-service";

export function* makePurchaseGenerator(totalUsers: number,totalProducts: number, timeService: TimeService) {
  for (let i=0;i<totalUsers;i++) {
    yield makePurchase(i+1, totalProducts, timeService);
  }
}



function makePurchase(user_id: number, totalProducts: number ,timeService: TimeService) {
  const purchases = []
  const lastUserIdDigit = user_id % 10;
  let purchaseCount = 1
  if (lastUserIdDigit === 5) {
    purchaseCount = 0
  } else if (lastUserIdDigit === 6) {
    purchaseCount = 1
  } else if (lastUserIdDigit === 7) {
    purchaseCount = 2
  }

  let i = 0;
  while (purchaseCount >  0) {
    const time_a = faker.date.between({ from: '2000-01-01', to: timeService.now() });
    const time_b = faker.date.between({ from: '2000-01-01', to: timeService.now() });

    const product_id = faker.number.int({min: 1, max: totalProducts})
    const created_at = time_a <= time_b ? time_a : time_b;
    const updated_at = timeService.now()
    const added_to_cart = faker.date.between({ from: created_at, to: Date.now() });
    const purchased_at = created_at !== undefined && faker.datatype.boolean({
      probability: 0.70
    }) ? faker.date.between({from: added_to_cart, to: timeService.now()}) : undefined
    const returned_at = purchased_at !==  undefined && faker.datatype.boolean({probability: 0.15}) ? faker.date.between({from: purchased_at, to: timeService.now()}) : undefined;
    purchases.push({
      id: `U${user_id}P${i}`,
      product_id: product_id,
      user_id: user_id,
      created_at, updated_at, added_to_cart,
      purchased_at, returned_at
    });
    purchaseCount -=1
    i+=1
  }
  return purchases;
}
