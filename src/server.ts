import express, {request, response} from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app: express.Application = express();
const PORT: string = '3000';

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Main Route');
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});