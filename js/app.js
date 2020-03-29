'use strict'

//Feature #1: Display images

const hornStorage = [];
const keywordArr = [];

console.log('HORN OBJECT', hornStorage)

console.log('KEYWORD ARR', keywordArr)

//renders images on html
ConstructHorn.prototype.render = function (){
  const tpl = $('#photo-template').html();
  let trg = $('main')
  trg.append(Mustache.render(tpl, this))
}

const fetchData = (pageNumber) => {
  const options = {
    method:"get",
    dataType:"JSON",
  };
  // pulls data from json file
  $.ajax(`data/page-${pageNumber}.json`, options)
    .then(hornData => {
      hornData.forEach(hornType => {
        new ConstructHorn(hornType).render();
        if(!keywordArr.includes(hornType.keyword)){keywordArr.push(hornType.keyword)};
        
      })
    filterBox();
    choices();
    numberOfHorns();
  })
  
}

// constructs images and stores them in a arr
function ConstructHorn(eachOne){
  this.image = eachOne.image_url;
  this.title = eachOne.title;
  this.description = eachOne.description;
  this.keyword = eachOne.keyword;
  this.horns = eachOne.horns;
  hornStorage.push(this);
}

// Feature #2: Filter images

// shows list in drop down box
function filterBox() {
  let select = $('#dropdown');
  keywordArr.forEach( word => {
    let $options = $(`<option value=${word}>${word}</option>`);
    select.append($options);
  })
}



// this is fixed. needed to add class to render prototype
const choices = () => {
  $('select').on('change', function(){
    let selected = $(this).val()
    if(selected !== 'default'){
      $('section').hide();
      $(`.${selected}`).show();      
    } else{
      $('section').show()
    }
  })
}

const switchPage = function(){
  $('ul').on('click', 'li', function(){
    $('section').hide();
    fetchData($(this).attr('id'));
 })
 }
 
 const numberOfHorns = () => {

 }

 // start page
 fetchData(1);
 switchPage();
 

// Feature 1: Pagination

// Why are we implementing this feature?
// As a user, I want to have the ability to view additional images so that my view does not become cluttered.
// What are we going to implement?
// Given that a user opens the application in the browser When the user clicks on a button or link to another page Then the other set of images should be dynamically displayed

// How are we implementing it?

// Add navigation for the user to switch between two pages. Each page should render a unique set of images from one of the two provided JSON files.
// Reset the filters, then repopulate them using only keywords from the images currently being displayed.

// Feature 2: Templating

// Why are we implementing this feature?
// As a user, I want all of the images to be displayed in a consistent manner, so that it is easy to scan the collection of images.

// What are we going to implement?
// Given that a user opens the application in the browser When the images are displayed on the screen Then each image should be rendered according to a template

// How are we implementing it?
// Create the appropriate Mustache template in your HTML with the same <h2>, <img>, and <p> elements as the jQuery template from the prior lab.
// Refactor the method that renders your images to use Mustache instead of making a copy with jQuery.

// Feature 3: Styling with Flexbox

// Why are we implementing this feature?
// As a user, I want a simple, clean looking UI so that my photo gallery clearly displays the images.

// What are we going to implement?
// Given that a user opens the application in the browser When the user navigates to the home page Then the images should be displayed in columns, as screen width allows

// How are we implementing it?
// Refactor your CSS to use Flexbox instead of floats. You are welcome to use a combination of floats and Flexbox, as you see fit.

// Feature 4: Sort the images

// Why are we implementing this feature?
// As a user, I want to be able to sort the images so that there is an order to their rendering.

// What are we going to implement?
// Given that a user is presented with sort options When the user clicks on one option Then the images should be sorted accordingly

// How are we implementing it?
// Add the ability for the user to sort the images by either title or by number of horns.
// Sort the images by one of the properties on page load. This should also apply to the second page of images.