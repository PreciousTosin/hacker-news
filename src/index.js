/* eslint-disable import/no-extraneous-dependencies,default-case,no-fallthrough */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/stylesheets/styles.css';
import newsItemUI from './newsItem';

const $ = require('jquery');
require('isomorphic-fetch');

const newsIds = [];
let pageCount = 0;

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

function loopNews(i) {
  let itemDiv = '';
  let itemUrl = '';
  const hr = document.createElement('hr');
  let h3 = '';
  let h3node = '';
  let itemUrlNode = '';
  for (i; i < 100; i++) {
    retrieveNews(newsIds[i])
      .then((item) => {
        itemDiv = document.createElement('div');
        h3 = document.createElement('h3');
        h3node = document.createTextNode(item.title);
        itemUrl = document.createElement('a');
        itemUrl.setAttribute('href', item.url);
        itemUrl.setAttribute('target', '_blank');
        itemUrlNode = document.createTextNode(item.url);
        itemUrl.appendChild(itemUrlNode);
        h3.appendChild(h3node);
        itemDiv.appendChild(h3);
        itemDiv.appendChild(itemUrl);
        itemDiv.appendChild(hr);
        itemDiv.setAttribute('class', 'cards');
        document.querySelector('.hackernews--container').appendChild(itemDiv);
      })
      .catch(error => console.log(error));
    if (pageCount > 500) break;
    pageCount += 1;
  }
}


/*
* @dev function to add various event handlers
*/
/* function addEvents() {
  document.querySelector('#submit-btn').addEventListener('click', (event) => {
    event.preventDefault();
  });
} */

$(document).ready(() => {
  retrieveNewsIds().then((newsids) => {
    // retrieveNews(newsids[0]).then(item => console.log(item)).catch(error => console.log(error));
    loopNews(pageCount);
  }).catch(error => console.log(error));
  // addEvents();
});
