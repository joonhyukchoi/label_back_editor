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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEditor = exports.findDefaultPage = exports.getSingedUrl = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const socketModel_1 = require("../model/socketModel");
function getSingedUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new client_s3_1.S3Client({ region: 'ap-northeast-2' });
        const command = new client_s3_1.PutObjectCommand({ Bucket: 'label-editor', Key: req.body.fileName, ContentType: 'image/png', ACL: 'public-read' });
        const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: 3600 });
        res.json({ signedUrl });
    });
}
exports.getSingedUrl = getSingedUrl;
function findDefaultPage(userId, pdfId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (userId === undefined || pdfId === undefined || Array.isArray(userId) || Array.isArray(pdfId)) {
            return '';
        }
        const result = yield (0, socketModel_1.dbSearch)(userId, pdfId);
        let defaultPage = '';
        if (result !== null) {
            defaultPage = result['text'];
        }
        return defaultPage;
    });
}
exports.findDefaultPage = findDefaultPage;
function updateEditor(value) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, socketModel_1.dbSearch)(value.id, value.pdfId);
        if (result === null) {
            yield (0, socketModel_1.dbInsert)(value.id, value.pdfId, value.text);
        }
        else {
            yield (0, socketModel_1.dbUpdate)(value.id, value.pdfId, value.text);
        }
    });
}
exports.updateEditor = updateEditor;
