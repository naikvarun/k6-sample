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
      name: 'sencha',
      suggestedAmount: 3,
      steepingTime: 3,
      waterTemperature: 75,
      type: 'green',
    },
    {
      name: 'gyokuro',
      suggestedAmount: 2,
      steepingTime: 2,
      waterTemperature: 70,
      type: 'green',
    },
    {
      name: 'da hong pao',
      suggestedAmount: 5,
      steepingTime: 3,
      waterTemperature: 99,
      type: 'black',
    },
  ];
  // const { db } = await getConnection();

  console.log('Seed start');
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

  console.log('Seed done');
};
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
