const request = require("request")
const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    var firstName = req.body.fname  
    var LastName = req.body.lname    
    var Email = req.body.email  
    var data = {
        members:[{
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:LastName
            }
        }]
    }
    var jsonData = JSON.stringify(data)
    const url = "https://us17.api.mailchimp.com/3.0/lists/e74691dc60"
    const options = {
        method:"POST",
        auth:"Asphy:3a913c0638724936959fcdae681ae2c6-us17"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData)
    request.end()
    console.log(firstName,LastName,Email);
})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT||3000,function(){
    console.log("listening...")
})

//api key
//3a913c0638724936959fcdae681ae2c6-us17
//audience id
//e74691dc60