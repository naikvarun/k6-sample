import {faker} from "@faker-js/faker";
import {TimeService} from "../time-service";

export function* makeUserGenerator(count: number,timeService: TimeService) {
  for(let i=0; i<count; i++) {
    yield generate(i+1, timeService);
  }
}

function generate(user_id: number, timeService: TimeService) {
  const email_parts = faker.internet.email().split('@');
  const email = `${email_parts[0]}+${user_id}@${email_parts[1]}`;
  const sex = faker.person.sex()
  return {
    id: user_id,
    "created_at":  timeService.now(),
    "updated_at": timeService.now(),
    "name": faker.person.fullName(),
    "title": faker.person.prefix(sex === 'male' ? 'male' : sex === 'female' ? 'female' : undefined),
    "age": faker.number.int({min: 18, max: 65}),
    "email": email,
    "telephone": faker.phone.number({style: "human"}),
    "gender": sex,
    "language": faker.helpers.arrayElement(['spanish', 'english', 'french', 'marathi']),
    "occupation": faker.person.jobTitle(),
    "address": {
      "street_number": faker.number.int({min: 1, max: 1000}),
      "street_name": faker.location.street(),
      "city": faker.location.city(),
      "state": faker.location.state(),
      "postal_code": faker.location.zipCode(),
    }
  };

}
