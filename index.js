import express from 'express'
import connectDb from './db/connect.js'
import notFound from './middleware/not-found.js'
import dotenv from 'dotenv'
import errorHandlerMiddleware from './middleware/error-handler.js'
import auth from './routes/auth.route.js'
import jobs from './routes/job.route.js'
dotenv.config()
const app = express()

app.use(express.json())

app.use('/auth', auth)
app.use('/job', jobs)

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
