import 'dotenv/config';
import { tealeaf } from '../../src/db/schema';
import { TeaLeafType } from '../../src/tealeaf/tealeaf.model';
import { generateId } from '../../src/util/id-generator';
import { db } from '../../src/db';

if (!('DATABASE_URL' in process.env))
  throw new Error('DATABASE_URL not found on .env.development');

const main = async () => {
  const teaLeaves = [
    {
      name: 'english breakfast',
      suggestedAmount: 5,
      steepingTime: 3,
      waterTemperature: 99,
      type: 'black',
    }
  ];
  // const { db } = await getConnection();

  await db.insert(tealeaf).values(
    teaLeaves.map((w) => ({
      id: generateId(),
      name: w.name,
      suggestedAmount: w.suggestedAmount,
      steepingTime: w.steepingTime,
      waterTemperature: w.waterTemperature,
      type: w.type as TeaLeafType,
    }))
  );

  console.log('English breakfast tea inserted');
};
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
