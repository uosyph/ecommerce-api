"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = __importDefault(require("./handlers/users"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
const PORT = '3000';
const corsConfig = {
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsConfig));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Main Route');
});
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
