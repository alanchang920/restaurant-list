const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const handlebars = require('handlebars')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



app.use(express.static('public'), bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

handlebars.registerHelper('ifActive', function (sort, target, options) {
  if (sort === target) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

app.use(routes)


app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})