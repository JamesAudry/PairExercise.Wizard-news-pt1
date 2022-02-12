const express = require("express");
const app = express();


const morgan = require('morgan')
const postBank = require('./postBank')
const publicDir = express.static('public')
// app.use(express.static('public'));




app.use(publicDir)



app.use(morgan('dev'))

app.get('/', (req, res, next) => { 
  let posts = postBank.list()

  
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`
res.send(html);

});
    


app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
if (!post.id) {
  // throw new Error('Not Found')
  
  // If the post wasn't found, set the HTTP status to 404 and send Not Found HTML
  res.status(404)
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <header><img src="/logo.png"/>Wizard News</header>
    <div class="not-found">
      <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
      <iframe src="https://giphy.com/embed/p3RblYx4T7vmU" width="480" height="378" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      <p><a href="https://giphy.com/gifs/harry-potter-dumbledore-p3RblYx4T7vmU">via GIPHY</a></p>
    </div>
  </body>
  </html>`
  res.send(html)
} else {
    const html = `<!DOCTYPE html>
    <html>
    <head>
    <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
          <div class='news-item'>
            <p>
              ${post.title} <small>(by ${post.name})</small>
            </p>
            <p>
              ${post.content}
            </p>
          </div>
      </div>
    </body>
    </html>`
    res.send(html)
}

});

app.get('/stuff', (req, res) => {
  res.send('<img src="logo.png" alt="">')
});

const PORT = 1337 



app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});