const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase()
})
app.set('view engine', 'hbs');


app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url} ${req.connection.remoteAddress}`;

  fs.appendFile('server.log', log + '\n');
  next();
});


// app.use((req, res ,next)=>{
//   res.render('maintanance.hbs',{
//     pageTitle: "Maitanance page"
//   });
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle: "Home page",
        welcomeMessage: "Welcom bro!"
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About page"
    });
});


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to hande request"
    });
});


app.listen(3000, ()=>{
    console.log("Server is running");
});
