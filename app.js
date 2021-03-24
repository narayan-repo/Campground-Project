const express   = require('express'),
    bodyParser  = require('body-parser'),
    app         = express(),
    mongoose    = require('mongoose');

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

app.use(express.static('public'))

//database connection
mongoose.connect("mongodb://localhost:27017/yelp_camp",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//schema setup
let campground_schema = new mongoose.Schema({
    name: String,
    img: String,
    description: String
})

let Campground = mongoose.model("Campground",campground_schema)

app.get('/',(req, res) => {
    res.render("landing")
})

app.get('/index',(req, res) => {
    Campground.find({},((err, campgrounds) => {
        if(err) throw err;
        res.render("index",{campgrounds:campgrounds})
    }))

})

app.post('/index', (req, res) => {
    const camp_name = req.body.name;
    const camp_url = req.body.url;
    const camp_desc = req.body.description;
    Campground.create(
        {
            name: camp_name,
            img: camp_url,
            description: camp_desc
        }, (err, newCamp) => {
            if(err) throw err;
            console.log(newCamp);
        }
    )
    res.redirect('/index')
})

app.get('/index/new',(req, res) => {
    res.render('new')
})
//SHOW - shows more info about one campground
app.get('/index/:id',(req, res) => {
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if(err)
            console.log(err)
        else
            res.render('show',{campground: foundCampground})
    })
})

app.listen(3000,()=>{
    console.log("Server running");
})