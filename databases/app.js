const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true }).then(r => {
    console.log("database connected")
})

let catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat",catSchema);

// var george = new Cat({
//     name: "Ms Norris",
//     age: 9,
//     temperament: "Grouchy"
// });
//
// george.save((err,cat)=>{
//     if(err) throw err;
//     console.log(cat)
// })

Cat.create({
    name: "Snow White",
    age: 11,
    temperament: "Bland"
}, (err,cat)=>{
    if(err) throw err;
    console.log(cat)
})

Cat.find({name: "Nero"}, (err,cats)=>{
    if(err) throw err;
    console.log(cats)
})