const express = require('express')
const app = express()
const axios = require('axios')
const port = 3000

app.get('/api/movies/:title', (req, res) => {

    axios.get('https://jsonmock.hackerrank.com/api/movies/search/?Title=' + req.params.title).then(function(resposta){

    var obj = {
        moviesByYear: [],
        total: resposta.data.total
    }
    
    for (i in resposta.data.data){

        obj.moviesByYear.push( {
            year: resposta.data.data[i].Year
        })
    } 
    
    obj.moviesByYear = obj.moviesByYear.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))

    var json = JSON.stringify(obj)

    res.status(200).send(json)

    }).catch((err) => {
        if (err){
            console.log(err)
        }
    })
})

app.get('/api/movies', (req, res) => {

    axios.get('https://jsonmock.hackerrank.com/api/movies').then(function(resposta){

    var obj = {
        moviesByYear: [],
        total: resposta.data.total
    }
    
    for (i in resposta.data.data){

        obj.moviesByYear.push( {
            year: resposta.data.data[i].Year  
        })
    }

    obj.moviesByYear = obj.moviesByYear.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))

    var json = JSON.stringify(obj)

    res.status(200).send(json)

    }).catch((err) => {
        if (err){
            console.log(err)
        }
    })
})



app.listen(3000, (req, res) => {
    console.log('Servidor rodando na porta ' + port)
})