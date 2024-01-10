const express = require('express')
const ejs = require('ejs');
const app = express()
const port = 3000


// ejs만 독립적으로 사용한 것이 아니라 express한 것에 추가로 사용하기 때문에 이런식으로 사용함
app.set('view engine', 'ejs')
app.set('views', './views') //화면상에 보여지는 폴더 이름 지정

// 라우팅
app.get('/', (req, res) => {
  res.render('index') // ./views/indes.ejs 경로로 출력한다는 의미
})
app.get('/profile', (req, res) => {
  res.render('profile') 
})
app.get('/map', (req, res) => {
  res.render('map') 
})
app.get('/contact', (req, res) => {
  res.render('contact') 
})
app.get('/contactProc', (req, res) => { // req는 요청값을 받아옴
  req
})

app.listen(port, () => {
  console.log(`Server is Running... http://localhost:${port}`)
})