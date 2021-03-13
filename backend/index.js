const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'));

app.use(express.json()); //Reemplazo de body-parser incluido en ultimas versiones de express

app.get('/', (req, res) => {
  res.send("Hello world ")
})

const routerTasks = require('./router/tasks')
app.use('/tasks', routerTasks)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})