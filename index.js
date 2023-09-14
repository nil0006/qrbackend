const express = require('express');
const db = require("./db");
const assets = require('./assets');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
db.conn.once("open", () => {
    console.log("connected");
  });
app.get('/', (req, res) => {
  res.send('hello darkness')

});
app.post('/save' ,bodyParser.json(), async(req,res)=>{
    console.log(req.body);
    const id = await getId()
    let asset = new assets({
        assetId: id,
        stickerId: req.body.stickerId,
        isActive: req.body.isActive,
        date:req.body.date

      });
      asset
        .save()
        .then(() => {
          console.log("item saved");
          res.status(200).json({ msg: "success" });
          res.send('success')
        })
        .catch((err) => {
          res.status(500).json({ msg: "something went wrong", err: err });
          res.send('error')
        });
})

async function getId(){
    await assets
    .find()
    .sort({ assetId: -1 })
    .then((data) => {
      if (data.length > 0) {
        uuid = data[0].assetId + 1;
      } else {
        uuid = 1;
      }
    });
    console.log(uuid);
  return uuid;

}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });