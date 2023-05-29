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
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const method_override_1 = __importDefault(require("method-override"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// eslint-disable-next-line import/namespace
const socketController_1 = require("../controllers/socketController");
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get('/health_check', (req, res) => {
    res.send('health check success!!');
});
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use((0, method_override_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.post('/users/sign', socketController_1.getSingedUrl);
// export const server = HTTPS.createServer(
//   {
//     ca: fs.readFileSync(ENCRYPT_URL.CA_URL),
//     key: fs.readFileSync(path.resolve(process.cwd(), ENCRYPT_URL.KEY_URL), 'utf8').toString(),
//     cert: fs.readFileSync(path.resolve(process.cwd(), ENCRYPT_URL.CERT_URL), 'utf8').toString(),
//   },
//   app
// );
exports.server = http_1.default.createServer(app);
const io = new socket_io_1.Server(exports.server, {});
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const query = socket.handshake.query;
    const defaultPage = yield (0, socketController_1.findDefaultPage)(query.userId, query.pdfId);
    io.emit('updateEditorOnce', defaultPage, () => {
        socket.on('updateEditor', (value) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, socketController_1.updateEditor)(value);
        }));
    });
    socket.on('disconnect', () => {
        // eslint-disable-next-line no-console
        console.log('user disconnected : ', socket.id, ' at ', new Date());
    });
}));
