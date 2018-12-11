const express = require('express')
const Prometheus = require('prom-client')
const app = express();
const port = process.env.PORT || 8000;

const counter = new Prometheus.Counter({
  name: 'http_page_hit',
  help: 'Total number of page hits'
})

app.get('/', (req, res, next) => {
   counter.inc();
    res.send(`Page hit count : ${counter.hashMap[''].value}`)
    next()
})
app.get('/metrics', (req, res) => {
    res.set('Content-Type', Prometheus.register.contentType)
    res.end(Prometheus.register.metrics())
})
app.listen(port, () => {
    console.log(`app listening on port ${port}!`)
})