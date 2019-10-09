
// tingo config
/* const tingo = require("tingodb")().Db;
const db = new tingo("./database",{});
const col = db.collection("quotes"); */


app.get('/quotes', async(req,res)=>{
    await col.find().toArray((err,data)=>{
        if (!err){
            /* data = JSON.stringify(data.reverse(), null, 2);
            res.send("<pre>"+data+"</pre>") */
            
            
        } else {
            res.send(err.message);
        }
    });
});
app.post('/quotes/create', async(req,res)=>{
    try{
        await col.insertOne(req.body);
        res.redirect('/quotes');
    } catch(err){
        res.send("No quotes created");
    }
    
});
app.get('/quotes/create', (req,res)=>{
    res.sendFile(__dirname + "/form-quote.html");
});
app.get('/quotes/delete/:id', async(req,res)=>{
    await col.deleteOne({"_id":objectId(req.params.id)}, (err)=>{
        res.redirect("/quotes");
    });

});
app.get('/quotes/update/:id/:q', async(req,res)=>{
    try {
        const data = await col.findOne({"_id": objectId(req.params.id)});
        const newData = {...data, quote: req.params.q};
        await col.updateOne({"_id": objectId(req.params.id)}, newData);
        res.redirect('/quotes');
    } catch (error) {
        red.send("No thing was updated");
    }
});
/* const newQuoteButton = `<form action = "/quotes/create">
                                        <input type = "submit" value= "Create new" />
                                    </form>`
            let data = await col.findOne({"_id": objectId(req.params.id)});
            data = `
                <h2>${data.author} - - ${data._id}</h2>
                <p>${data.quote}</p>
                <br>
                <a href = "/quotes/edit/${data._id}">Update </a>
                <br>
                <a href = "/quotes/delete/${data._id}">Delete </a>
                <br>
                <a href = "/quotes/"> Return </a>
                <br>
                <p>Timestamp: ${data.timestamp}</p>
                <hr>
            `;
            res.send(newQuoteButton+data); */
            /* let response = htmlHead() + `
            <body>
                <main>
                    <form action="/quotes/update" method="POST">
                        <input type="text" name="author" value="${data.author}" placeholder = "Author">
                        <br>
                        <input type="text" name="quote" value="${data.quote}" placeholder ="Quotes">
                        <br>
                        <input type = "hidden" name = "id" value = "${data._id}">
                        <input type="submit" value="Update">
                    </form>
                </main>s
            </body>
            </html>
            `;
            res.send(response); */
                    /*  const obj = {
                ...req.body,
                timestamp: Date.now()
            }; */
