import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
const PORT = '3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Main Route');
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
