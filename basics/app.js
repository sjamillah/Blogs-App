const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const blogroutes = require('./routes/blogRoutes');
const dotenv = require('dotenv');

dotenv.config();

// express app( invokation )
const app = express();

// connect to database
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine( have to first install ejs)
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// // mongoose and mongo sandbox routes
// // we add blogs used the Blog model constructor coz it has the needed structure for our model i.e schema and then later save it
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog 2',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// });

// // find all the blogs saved and we use the Blog model
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// // find a single blog
// app.get('/single-blog', (req, res) => {
//     Blog.findById('68ca85c9684915f62bd71d4f')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })

// routes
app.get('/', (req, res) => {
    // res.send('<p>Welcome here</p>');
    // res.sendFile('./views/index.html', { root: __dirname })
    // first database before connecting to mongodb
    // const blogs = [
    //     {
    //         title: "Getting Started with Node.js",
    //         snippet: "Learn the basics of Node.js and how to set up your first server...",
    //         body: "Node.js is a runtime environment that lets you run JavaScript outside the browser. It’s fast, lightweight, and great for building scalable network applications. In this guide, we’ll cover installation, creating your first app, and understanding the event-driven model."
    //     },
    //     {
    //         title: "Why Learn Express?",
    //         snippet: "Express makes server-side development in Node much simpler...",
    //         body: "Express is a web framework for Node.js that provides a set of features for building web and mobile applications. It simplifies routing, handling requests, and managing middleware. Whether you’re building a small API or a large app, Express keeps your code clean and maintainable."
    //     },
    //     {
    //         title: "Introduction to Lodash",
    //         snippet: "A utility library that makes JavaScript easier to work with...",
    //         body: "Lodash provides a wide range of functions that make working with arrays, objects, and strings much easier. Instead of writing loops and helper functions manually, you can use Lodash methods like _.map, _.filter, and _.cloneDeep to write cleaner and more efficient code."
    //     },
    //     {
    //         title: "Understanding Nodemon",
    //         snippet: "Save time in development with automatic server restarts...",
    //         body: "Nodemon is a tool that automatically restarts your Node.js app whenever file changes are detected. This means you don’t have to keep stopping and restarting your server manually. It’s perfect for speeding up development and testing new changes quickly."
    //     }
    //     ];

    // res.render('index', { title: 'Home', blogs })
    // we redirected after connecting to a mongodb database so we'll get the blogs created
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    // res.send('<p>Welcome to the about</p>');
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: 'About' })
})
// // redirects for the first express to redirect
// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })

// blog routes
app.use('/blogs', blogroutes);

// 404 page
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: '404' })
})