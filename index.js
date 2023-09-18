const express = require('express');
const db = require("./db");
const assets = require('./assets');
const bodyParser = require("body-parser");
const { stringify } = require('nodemon/lib/utils');
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

    const ifReg = await ifAssetRegistered(req.body.stickerId);
    
    if(!ifReg["found"]){
      const id = await getId();
  
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
            // res.send('success');  // this is causing error as you can't have two responses in the same line
            return;                  // also, it's a good practice to return here
          })
          .catch((err) => {
            res.status(500).json({ msg: "something went wrong", err: err });
            // res.send('error');    // similarly here
            return;                  // also, it's a good practice to return here
          });

    }
    else{
      console.log("Asset already registered, so updated sticker ID with : ",ifReg.id );
      res.status(200).json({ msg: ("Asset already registered, so updated sticker ID with : " + ifReg.id )});
    }

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

async function ifAssetRegistered(assetID) {
  stickerId = assetID
  assetID = Number(assetID);
  let returnValue = {};
  await assets
  .findOneAndUpdate( {"assetId" : assetID}, {"stickerId": stickerId})
  .then((data) => {
    if(data!=null){
      console.log("data found -",data);
      returnValue = {"found": true, "id":stringify(data?.assetId)};
    }
    else{
      returnValue = {"found": false, "id":0};
    }
  });
  return returnValue;
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });