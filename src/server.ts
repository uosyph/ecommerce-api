import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import product_routes from './handlers/products';
import user_route from './handlers/users';
import order_routes from './handlers/orders';
import dashboard_routes from './services/dashboard';

const app: express.Application = express();
const PORT = '3000';

const corsConfig = {
    optionsSuccessStatus: 200,
};

app.use(cors(corsConfig));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Main Route');
});

app.use('/users', user_route);
app.use('/products', product_routes);
app.use('/orders', order_routes);
dashboard_routes(app);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
