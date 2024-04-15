"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*app.ts*/
const express_1 = __importDefault(require("express"));
const PORT = parseInt(process.env.PORT || '8080');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
function getRandomNumber(min, max) {
    const rand = Math.floor(Math.random() * (max - min) + min);
    console.log(`Rolled: ${rand}`);
    return rand;
}
app.get('/rolldice', (req, res) => {
    const tea = req.query.tea;
    console.log('Rolling dice');
    const roll = getRandomNumber(1, 6);
    console.log(`Received tea: ${tea}`);
    res.json({ roll, tea });
});
app.listen(PORT, () => {
    console.log(`Listening for requests on http://localhost:${PORT}`);
});
