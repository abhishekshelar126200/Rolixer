const express=require('express');
const mongoose=require('mongoose');
const Products=require('./models/transaction');
const cors=require('cors');
const app=express();
const axios = require('axios');
const path = require('path');


mongoose.connect('mongodb://localhost:27017/ProductsTransactions')
.then(()=>{console.log('Connect To Database')});
app.use(cors());

app.get('/transactionTable/:month',async (req,res)=>{
    const month=parseInt(req.params.month);
    const searchText=(req.query.q).toLowerCase();
    
    const data=await Products.find({
            $expr: { 
                $eq: [{ $month: "$dateOfSale" }, month]  // Match documents where the month is October
            }
        }
    );

    const divideResult= [];
    for (let i = 0; i < data.length; i += 4) {
        divideResult.push(data.slice(i, i + 4));
    }

    if(searchText!=null)
    {
        const flattenItems=divideResult.flat();
        const result = flattenItems.filter(item =>
            item.title.toLowerCase().includes(searchText) ||
            item.description.toLowerCase().includes(searchText) ||
            item.category.toLowerCase().includes(searchText) ||
            item.price.toString().includes(searchText)
        );
        const actualResult= [];
        for (let i = 0; i < result.length; i += 5) {
            actualResult.push(result.slice(i, i + 5));
        }
        res.send(actualResult);
    }
    else{
        
        res.send(divideResult);
    }
    

    
});

app.get('/transactionStatistic/:month',async (req,res)=>{
    const month=parseInt(req.params.month);
    
    const data=await Products.find({
            $expr: { 
                $eq: [{ $month: "$dateOfSale" }, month]  // Match documents where the month is October
            }
        }
    );

    let sale=0;
    let sold=0;
    let notSold=0;
    data.map((product)=>{
        if(product.sold)
        {
            sale+=product.price;
            sold+=1;
        }
        else{
            notSold+=1;
        }
    }) 
    const statistic={
        sale:sale,
        sold:sold,
        notSold:notSold
    }


    res.send(statistic);
});


app.get('/transactionBarChart/:month',async (req,res)=>{
    const month=parseInt(req.params.month);
    const data=await Products.find({
            $expr: { 
                $eq: [{ $month: "$dateOfSale" }, month]  // Match documents where the month is October
            }
        }
    );
    const priceRanges={'0-100':0,'101-200':0,'201-300':0,'301-400':0,'401-500':0,'501-600':0,'601-700':0,'701-800':0,'801-900':0,'901-above':0};
    data.map((product)=>{
        if(product.price>0 && product.price<=100)
        {
            priceRanges['0-100']+=1;
        }
        else if(product.price>100 && product.price<=200)
        {
            priceRanges['101-200']+=1;
        }
        else if(product.price>200 && product.price<=300)
        {
            priceRanges['201-300']+=1;
        }
        else if(product.price>300 && product.price<=400)
        {
            priceRanges['301-400']+=1;
        }
        else if(product.price>400 && product.price<=500)
        {
            priceRanges['401-500']+=1;
        }
        else if(product.price>500 && product.price<=600)
        {
            priceRanges['501-600']+=1;
        }
        else if(product.price>600 && product.price<=700)
        {
            priceRanges['601-700']+=1;
        }
        else if(product.price>700 && product.price<=800)
        {
            priceRanges['701-800']+=1;
        }
        else if(product.price>800 && product.price<=900)
        {
            priceRanges['801-900']+=1;
        }
        else if(product.price>900)
        {
            priceRanges['901-above']+=1;
        }
    });
    let tempLabels=[]
    for(let key in priceRanges)
    {
      tempLabels.push(priceRanges[key]);
    }
    res.send(tempLabels);

});

app.get('/transactionPieChart/:month',async (req,res)=>{
    const month=parseInt(req.params.month);
    
    const data=await Products.find({
            $expr: { 
                $eq: [{ $month: "$dateOfSale" }, month]  // Match documents where the month is October
            }
        }
    );

    let temp = {};
    data.map((product) => {
        if (!temp[product.category]) {
            temp[product.category] = 0; // Initialize to 0 if not already set
        }
        temp[product.category] += 1; // Increment count
    });
    let result=[];
    for(let key in temp)
    {
        let tempData={name:"",value:0}
        tempData['name']=key;
        tempData['value']+=temp[key];
        result.push(tempData);
    }

    res.send(result);
});

app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(5000);