const express = require("express");
const app = express();

const path = require("path");

const port = 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"views")));

// app.use(express.static("frontend"))

let posts = [
    {
        username: "rahul",
        content: "Hii i am rahul",
    },   
    {
        username: "gopal",
        content: "Hii i am gopal",
    },
    {
        username: "ashwin",
        content: "Hii i am ashwin",
    }    
];

app.get("/posts", (req,res) => {
    res.render("index", {posts});

});

//To see POST
app.get("/post/:username/show", (req,res) => {
    let {username} = req.params;
    let post = posts.find( p => p.username === username);
    
    res.render("single_post", { post });
});

//TO Edit Post
app.get("/post/:username/edit", (req,res) => {
    let {username} = req.params
    let post = posts.find( p => p.username === username);
    
    res.render("edit", { post });
})

app.post("/post/:username/edit", (req,res) => {
    let newContent = req.body.content;
    let username = req.params.username;
    let post = posts.find( p => p.username === username);
    console.log(post);;
    post.content = newContent;
    res.redirect("/posts");
});

//To CREATE New post
app.get("/post/new", (req,res) => {
    res.render("form");
})


app.post("/posts", (req,res) => {
    let {username, content} = req.body;
    let post = {
        username: username,
        content: content,
    }
    posts.push(post);
    res.redirect("/posts");
});

//TO DELETE Post
app.get("/post/:username/delete", (req,res) => {
    let username = req.params.username;
    let post = posts.find(p => p.username === username);

    posts = posts.filter( p => p.username !== username );
    res.redirect("/posts");
});

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})