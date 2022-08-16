import AWS from "aws-sdk"
import { NextFunction, RequestHandler, Request, Response } from "express"
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY

const region = "ap-south-1"
const BUCKET_NAME = "ravi-test-buket"

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
}

export const abortMultiPartUpload: RequestHandler<{}> = async (
  req,
  res,
  next
) => {
  const body = req.body
  try {
    let params = {
      Bucket: BUCKET_NAME,
      Key: body.fileName,
      UploadId: body.uploadId,
    }
    const abortUpload = await s3.abortMultipartUpload(params).promise()
    return res.send({ abortUpload: abortUpload })
  } catch (error) {
    return res.send({ error: error })
  }
}
