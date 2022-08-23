import "dotenv/config"
import express, { Express, NextFunction, Request, Response } from "express"
const app: Express = express()
const port = process.env.PORT
import awsRouter from "./router/uploadRouter"
app.use(express.json())

// data use
app.use((req: Request, res: Response, next: NextFunction) => {
  res.removeHeader("server")
  res.removeHeader("x-powered-by")
  res.shouldKeepAlive = false

  const allowedOrigin = ["http://localhost:3000"]
  if (req.headers?.origin) {
    const origin = req.headers.origin
    if (allowedOrigin.includes(origin) || origin.endsWith(".ngrok.io")) {
      res.setHeader("Access-Control-Allow-Origin", origin)
    }
  }
  res.setHeader(
    "Access-Control-Allow-Method",
    "PUT,GET,POST,DELETE,OPTIONS,PATCH"
  )
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,range"
  )
  res.setHeader("Access-Control-Expose-Headers", "Content-Range")
  return next()
})

// routers
app.use("/aws", awsRouter)

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})
