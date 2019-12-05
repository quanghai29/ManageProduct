var express =require('express');
var exphbs = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs(
    {
        defaultLayout: 'main.hbs',
        layoutsDir: 'views/_layout'
    })
);
app.set('view engine', 'hbs');
app.use(express.static('public'));

//-- Trang đăng nhập
app.get('/',(req,res)=>{
    res.end('login');
})

//middle ware
app.use('/admin',require('./routes/admin/index.js'));


//listen port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})