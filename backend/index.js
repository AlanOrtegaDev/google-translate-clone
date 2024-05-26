import express from 'express'
import * as deepl from 'deepl-node'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 4000
const authKey = process.env.DEEPL_API_KEY
const translator = new deepl.Translator(authKey)

app
  .use(
    cors({
      origin: '*',
    })
  )
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

app.post('/translate', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')

  const { text, targetLang, sourceLang } = req.body

  try {
    const result = await translator.translateText(text, sourceLang, targetLang)

    res.json({
      success: true,
      result: result,
    })
  } catch (error) {
    res.json({
      success: false,
      error: {
        message: error.message,
      },
    })
  }
})

app.listen(port, () => {
  console.log('Server listening port:', port)
})
