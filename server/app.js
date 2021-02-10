const express = require('express')
const moongose = require('mongoose')
const config = require('config')

const app = express()

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/classroom", require("./routes/classroom.routes"))
app.use("/api/student", require("./routes/student.routes"))
app.use("/api/test", require("./routes/test.routes"))

const PORT = config.get('port') || 4200

async function start (){
  try {
    await moongose.connect(config.get('dbURL'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(`Server Error ${e.message}`)
    process.exit(1)
  }
}

start()

