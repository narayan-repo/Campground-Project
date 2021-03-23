const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

let campgrounds = [
    {
        name: "Thanda Tirpol",
        img : "https://images.unsplash.com/photo-1533597818151-d1071f26fe32?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGdyb3VuZHxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Gorom Baashbagan",
        img: "https://images.unsplash.com/photo-1534685157449-86b12aed151e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtcGdyb3VuZHxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name: "Neutral Room",
        img: "https://images.unsplash.com/photo-1564084372010-3f5f8c6c095a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGdyb3VuZHxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
]

app.get('/',(req, res) => {
    res.render("landing")
})

app.get('/campgrounds',(req, res) => {
    res.render("campgrounds",{campgrounds:campgrounds})
})

app.post('/campgrounds', (req, res) => {
    const name = req.body.name;
    const url = req.body.url;
    const newCampground = {name: name,img: url}
    campgrounds.push(newCampground);
    res.redirect('/')
})

app.get('/campgrounds/new',(req, res) => {
    res.render('new')
})

app.listen(3000,()=>{
    console.log("Server running");
})