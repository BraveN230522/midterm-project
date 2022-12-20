"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const multer_1 = __importDefault(require("multer"));
// import bodyParser from 'body-parser'
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const upload = (0, multer_1.default)();
// for parsing application/json
app.use(express_1.default.json());
// for parsing application/xwww-
app.use(express_1.default.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.single('undefined'));
app.use(express_1.default.static('public'));
app.use((0, morgan_1.default)('combined'));
(0, routes_1.route)(app);
app.get('/users', function (req, res) {
    res.status(200);
    res.json(db_1.USERS);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
