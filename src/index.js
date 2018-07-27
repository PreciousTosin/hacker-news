/* eslint-disable import/no-extraneous-dependencies,default-case,no-fallthrough */
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/stylesheets/styles.css';

const $ = require('jquery');
require('isomorphic-fetch');

const newsIds = [];

function retrieveNewsIds() {

}

/*
* @dev function to add various event handlers
*/
function addEvents() {
  document.querySelector('#submit-btn').addEventListener('click', (event) => {
    event.preventDefault();
  });
}

$(document).ready(() => {
  addEvents();
});
