import express from 'express'
import connectDb from './db/connect.js'
import notFound from './middleware/not-found.js'
import dotenv from 'dotenv'
import errorHandlerMiddleware from './middleware/error-handler.js'
import auth from './routes/auth.route.js'
import jobs from './routes/job.route.js'
import authentication from './middleware/authentication.js'

import helmet from 'helmet'
import cors from 'cors'
import xss from 'xss-clean'
import rateLimiter from 'express-rate-limit'
dotenv.config()
const app = express()

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/auth', auth)
app.use('/jobs', authentication, jobs)

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URL)
    app.listen(process.env.PORT, () =>
      console.log(`Server is listening on port ${process.env.PORT}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
