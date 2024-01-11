const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs');
const app = express()
const port = 3000

require('dotenv').config() //환경변수를 읽어들이는 모듈
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL) // MySQL연결
console.log('Connected to PlanetScale!')


// ejs만 독립적으로 사용한 것이 아니라 express한 것에 추가로 사용하기 때문에 이런식으로 사용함
app.set('view engine', 'ejs')
app.set('views', './views') //화면상에 보여지는 폴더 이름 지정

app.use(bodyParser.urlencoded({ extended: false }))

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
app.post('/contactProc', (req, res) => { //요청값 전송
  const name = req.body.name; // req는 요청값을 받아옴
  const phone = req.body.phone;
  const email = req.body.email;
  const memo = req.body.memo;

  a = `${name} ${phone} ${email} ${memo}`


  // sql문 작성
  sql = `insert into contact(name, phone, email, memo, redate) 
        values('${name}','${phone}','${email}','${memo}',now() )`

  // 실제 DB에 저장. 쿼리하기
  connection.query(sql, (err, result) => {
    if(err) throw err; //오류 난경우. 예외처리
    console.log('자료 1개를 삽입하였습니다.')
    res.send("<script> alert('문의사항이 등록되었습니다.'); location.href='/'</script>");
  })


  
})

app.listen(port, () => {
  console.log(`Server is Running... http://localhost:${port}`)
})