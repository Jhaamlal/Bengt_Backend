import AWS from "aws-sdk"
import { NextFunction, RequestHandler, Request, Response } from "express"
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY

const region = process.env.S3_REGION!
const BUCKET_NAME = process.env.BUCKET_NAME!

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
})
interface Iparams {
  Bucket: string
  Key: string
  Expires: any
  // ACL: string
}
export const multiPart: RequestHandler<{}> = async (req, res, next) => {
  const body = req.body
  try {
    const ttl = 20 * 60 * 100
    const todayInNumber: number = Date.now()
    const expires = todayInNumber + ttl
    let params: Iparams = {
      Bucket: BUCKET_NAME,
      Key: body.fileName,
      Expires: expires,
      // ACL: "public-read",
    }
    const multipartUpload = await s3.createMultipartUpload(params).promise()

    // return {
    //   statusCode: 200,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": true,
    //   },
    //   body: JSON.stringify({ uploadId: multipartUpload }),
    // }
    return res.send({ uploadId: multipartUpload })
  } catch (err) {
    console.log(err)
    // return {
    //   statusCode: 500,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": true,
    //   },
    //   body: JSON.stringify({ error: err }),
    // }
    return res.send({ error: err })
  }
}
