import {mart} from "./mart";
import {stage} from "./stage";

async function main() {
  await stage(),
  await mart()

}

main().then().catch(console.error);
