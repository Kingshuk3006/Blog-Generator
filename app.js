const express = require ('express');
const bodyParser = require ('body-parser');
const ejs = require ('ejs');
const _ = require('lodash');
const { redirect } = require('express/lib/response');

const homeContent =
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin word';

const aboutContent =
  "here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a d";

const contactContent =
  'm ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null';

const app = express ();

let posts = [];

app.set ('view engine', 'ejs');

app.use (bodyParser.urlencoded ({extended: true}));

app.use (express.static ('public'));

app.get ('/', (req, res) => {
  res.render ('home', {
    heading: 'Home',
    content: homeContent,
    posts: posts,
  });
});
app.get ('/about', (req, res) => {
  res.render ('about', {heading: 'About', content: aboutContent});
});
app.get ('/contact', (req, res) => {
  res.render ('contact', {heading: 'Contact', content: contactContent});
});
app.get ('/compose', (req, res) => {
  res.render ('compose');
});
app.get ('/posts/:postText', function(req, res){
   let routeParameter = _.lowerCase(req.params.postText);
   posts.forEach(function(post){
       const textHeading = _.lowerCase(post.textTittle);
       if(textHeading===routeParameter){
          res.render('posts', {heading:post.textTittle, content:post.textBody})
       }     
   })
});
app.post ('/compose', (req, res) => {
  let textTittle = req.body.textTittle;
  let textBody = req.body.textBody;
  const post = {
    textBody: textBody,
    textTittle: textTittle,
  };
  posts.push (post);
  res.redirect ('/');
});

app.listen (3000);
