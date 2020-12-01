const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

stockList = [
    {id: "bf9b7803-60d0-596c-4cad-5c3781ba47bf", code: "NIO", reason: "chinese ev good base", win: 1, conviction: 5},
    {id: "b380cbf1-dfe8-4c25-f835-528739fc436a", code: "TSLA", reason: "just felt like it", win: 0, conviction: 1},
    {id: "1189c1de-aca2-2db4-7880-156044f2f7b1", code: "AAPL", reason: "triangle breakout", win: 0, conviction: 4}, 
    {id: "1ce093fb-c8a4-7025-e4ca-e6d4c81e3eba", code: "BHVN", reason: "tight penant", win: 1, conviction: 3},
    {id: "86d4651b-212c-2490-8660-0649848a7e58", code: "MTCH", reason: "cup and handle breakout", win: 1, conviction: 4},
];

app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/api/stocks', function(req,res){
    res.send(stockList);
});

app.post('/api/stocks', function(req,res){
    stockList.push(req.body.data);
    const ret = true;
    console.log(stockList[stockList.length - 1]);
    res.send(ret);
});

app.put('/api/stocks', function(req,res){
    const index = stockList.findIndex(x => x.id == req.body.data.id);
    console.log(req.body.data.id);
    const ret = true;
    stockList[index] = req.body.data;
    res.send(ret);
});


const port = process.env.port || 3000;
app.listen(port, () => {
    console.log('listening to port 3000');
});