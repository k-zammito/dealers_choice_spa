const { syncAndSeed } = require('./db/index');
const express = require('express');
const app = express();
const chalk = require('chalk')
const path = require('path')

app.use(express.static('/public'))

app.use('/dist', express.static(path.join(__dirname, 'dist'))); // adds static route for webpack

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.use('/', express.static(path.join(__dirname, 'public'))); // need to add photos / css public folder

app.use('/api', require('./api'))

const init = async() => {
    try {
        await syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex) {
        console.log(chalk.magenta(ex));
    }
};

init()
