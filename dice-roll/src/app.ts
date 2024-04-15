/*app.ts*/
import express, { Express } from 'express';
const PORT: number = parseInt(process.env.PORT || '8080');
const app: Express = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

function getRandomNumber(min: number, max: number) {
  const rand = Math.floor(Math.random() * (max - min) + min);
  console.log(`Rolled: ${rand}`)
  return rand;
}

app.get('/rolldice', (req, res) => {
    const tea = req.query.tea;
    console.log('Rolling dice');
    const roll = getRandomNumber(1, 6);
    console.log(`Received tea: ${tea}`)
    res.json({roll, tea})
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
