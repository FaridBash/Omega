const express=require('express');
require('dotenv').config();
const { graphqlHTTP }=require('express-graphql');
const schema=require('./schema/schema.ts');
const port=process.env.PORT || 5000;
const colors=require('colors');
const app=express();
const cors=require('cors');
const connectDB=require('./config/db')
connectDB();
app.use(cors());
app.use('/graphql', graphqlHTTP({
schema,
graphiql: process.env.Node_EVN='development'
}));

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})