import 'dotenv/config';
import { water } from '../../src/db/schema';
import { WaterSize } from '../../src/water/water.model';
import { generateId } from '../../src/util/id-generator';
import { db } from '../../src/db';

if (!('DATABASE_URL' in process.env))
  throw new Error('DATABASE_URL not found on .env.development');

const main = async () => {
  const waterData = [
    { amount: '100 ml', size: 'small' },
    { amount: '200 ml', size: 'medium' },
    { amount: '300 ml', size: 'large' },
  ];
  // const { db } = await getConnection();

  console.log('Seed start');
  await db.insert(water).values(
    waterData.map((w) => ({
      id: generateId(),
      amount: w.amount,
      size: w.size as WaterSize,
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
