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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
require("dotenv/config");
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
const region = "ap-south-1";
const BUCKET_NAME = "ravi-test-buket";
const s3 = new aws_sdk_1.default.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
});
const getMultipartPreSignedUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileName, uploadId, partNumber, fileType } = req.body;
    const multipartParams = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        UploadId: uploadId,
        // ContentType: fileType,
    };
    const promises = [];
    for (let index = 0; index < partNumber; index++) {
        promises.push(s3.getSignedUrlPromise("uploadPart", Object.assign(Object.assign({}, multipartParams), { PartNumber: index + 1 })));
    }
    const signedUrl = yield Promise.all(promises);
    const partSignedUrlList = signedUrl.map((signedUrl, index) => {
        return {
            signedUrl: signedUrl,
            partNumber: index + 1,
        };
    });
    res.send({
        parts: partSignedUrlList,
    });
});
exports.default = getMultipartPreSignedUrl;
//# sourceMappingURL=awsUrlGenerate.js.map