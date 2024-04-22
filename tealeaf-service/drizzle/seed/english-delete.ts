import 'dotenv/config';
import { tealeaf } from '../../src/db/schema';
import { TeaLeafType } from '../../src/tealeaf/tealeaf.model';
import { generateId } from '../../src/util/id-generator';
import { db } from '../../src/db';
import { eq } from 'drizzle-orm';

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

  await db.delete(tealeaf).where(eq(tealeaf.name, 'english breakfast'))

  console.log('English breakfast tea deleted');
};
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
