const express = require("express")
const app = express();

// Run MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/role-admin')
// const connection = mongoose.connection
// connection.once('open', ()=>{console.log('Database running Successfully')});

const port = process.env.PORT?.toString || "3030"

app.listen(port, ()=> {console.log(`Server is now running on port ${port}`)})