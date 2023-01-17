"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, DB_USER_NAME, DB_PASS_KEY } = process.env;
const app = (0, express_1.default)();
const port = PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const uri = `mongodb+srv://${DB_USER_NAME}:${DB_PASS_KEY}@cluster.mongodb.net/test?retryWrites=true&w=majority`;
const client = new mongodb_1.MongoClient(uri);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            client.connect();
            const places = client.db("travel-guru").collection("places");
            app.get("/allplaces", (req, res) => __awaiter(this, void 0, void 0, function* () {
                const allPlace = yield places.find().project({ name: 1 }).toArray();
                res.send(allPlace);
            }));
        }
        finally {
            client.close();
        }
    });
}
run().catch(console.dir);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({
        message: "form task server is here",
    });
}));
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map