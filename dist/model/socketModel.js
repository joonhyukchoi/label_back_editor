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
exports.dbInsert = exports.dbUpdate = exports.dbSearch = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
const url = process.env.MONGODB_URL;
function dbSearch(id, pdfId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield mongodb_1.MongoClient.connect(url);
            const db = conn.db('editors');
            const collection = db.collection('editor');
            const result = yield collection.findOne({ id: id, pdfId: pdfId });
            yield conn.close();
            return result;
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.log('dbSearch function has a problem.', err);
            throw err;
        }
    });
}
exports.dbSearch = dbSearch;
function dbUpdate(id, pdfId, text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield mongodb_1.MongoClient.connect(url);
            const db = conn.db('editors');
            const collection = db.collection('editor');
            const result = yield collection.updateOne({ id: id, pdfId: pdfId }, { $set: { text: text } });
            return result;
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.log('dbUpdate function has a problem.', err);
            throw err;
        }
    });
}
exports.dbUpdate = dbUpdate;
function dbInsert(id, pdfId, text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield mongodb_1.MongoClient.connect(url);
            const db = conn.db('editors');
            const collection = db.collection('editor');
            const result = collection.insertOne({ id: id, pdfId: pdfId, text: text });
            return result;
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.log('dbInsert function has a problem.', err);
            throw err;
        }
    });
}
exports.dbInsert = dbInsert;
