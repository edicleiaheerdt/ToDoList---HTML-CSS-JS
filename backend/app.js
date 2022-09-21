const app = require('./index')
const todolist = []
app.listen(3000, err => {
  if (err) throw err
  console.log('Server running in http://127.0.0.1:3000')

  app.get('/', function (req, res) {
    res.send('Hello world!')
  })

  app.get('/listar', function (req, res) {
    res.json(todolist)
  })

  app.post('/salvar', function (req, res) {
    console.log(req.body)
    todolist.push(req.body.item)
  })
})
