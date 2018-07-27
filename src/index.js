/* eslint-disable import/no-extraneous-dependencies,default-case,no-fallthrough */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/stylesheets/styles.css';

const $ = require('jquery');
require('isomorphic-fetch');

const newsIds = [];
let pageCount = 0;
let limit = 100;


function retrieveNewsIds() {
  return new Promise((resolve, reject) => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then(response => response.json())
      .then((data) => {
        // console.log(data);
        data.forEach((result) => {
          newsIds.push(result);
        });
        return newsIds;
      })
      .then(newsData => resolve(newsData))
      .catch(error => reject(error));
  });
}

function retrieveNews(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then(response => response.json())
      .then(data => data)
      .then(newsItem => resolve(newsItem))
      .catch(error => reject(error));
  });
}

function loopNews(i, countLimit) {
  let itemDiv = '';
  let itemUrl = '';
  let hr = '';
  let h3 = '';
  let h3node = '';
  let itemUrlNode = '';
  for (i; i < countLimit; i++) {
    if (pageCount > 500) return;
    retrieveNews(newsIds[i])
      .then((item) => {
        itemDiv = document.createElement('div');
        h3 = document.createElement('h3');
        h3node = document.createTextNode(item.title);
        itemUrl = document.createElement('a');
        itemUrl.setAttribute('href', item.url);
        itemUrl.setAttribute('target', '_blank');
        itemUrlNode = document.createTextNode(item.url);
        hr = document.createElement('hr');
        itemUrl.appendChild(itemUrlNode);
        h3.appendChild(h3node);
        itemDiv.appendChild(h3);
        itemDiv.appendChild(itemUrl);
        itemDiv.appendChild(hr);
        itemDiv.setAttribute('class', 'cards');
        document.querySelector('.hackernews--container').appendChild(itemDiv);
      })
      .catch(error => console.log(error));
    pageCount += 1;
    console.log(pageCount);
  }
}

window.onscroll = (ev) => {
  if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
    console.log('you\'re at the bottom of the page', pageCount);
    limit += 100;
    loopNews(pageCount, limit);
  }
};

$(document).ready(() => {
  retrieveNewsIds().then((newsids) => {
    // retrieveNews(newsids[0]).then(item => console.log(item)).catch(error => console.log(error));
    loopNews(pageCount, 100);
  }).catch(error => console.log(error));
  // addEvents();
});
