'use strict'

//Feature #1: Display images

const keywordArr = [];
let monsters = [];

console.log('HORN OBJECT', monsters)

console.log('KEYWORD ARR', keywordArr)

// Feature 2: Templating

//renders images on html
ConstructHorn.prototype.render = function (){
  const tpl = $('#photo-template').html(); // template
  let trg = $('main') //target / container
  trg.append(Mustache.render(tpl, this)); // data is "this"
  
}

// sorts arr in a-z
const sortArr = (arr) => {
  arr.sort();
  return arr;
}

// gets the data from selected JSON file and 
const fetchData = (pageNumber) => {
  const options = {
    method:"get",
    dataType:"JSON",
  };
  // pulls data from json file
  $.ajax(`data/page-${pageNumber}.json`, options)
    .then(data => {
      data.forEach(hornType => {
        new ConstructHorn(hornType).render();
        if(!keywordArr.includes(hornType.keyword)){keywordArr.push(hornType.keyword)};

      })
      choices();
      sortArr(keywordArr);
      filterBox();
      
  })
}

// constructs images and stores them in a arr
function ConstructHorn(eachOne){
  // Object.keys(eachOne);
  this.image = eachOne.image_url;
  this.title = eachOne.title;
  this.description = eachOne.description;
  this.keyword = eachOne.keyword;
  this.horns = eachOne.horns;
  monsters.push(this);
}

// Feature #2: Filter images

// shows list in drop down box
function filterBox() {
  let select = $('#dropdown');
  select.empty();
  select.append(`<option value="default">Filter by Keyword</option>`)
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
      $(`.${selected}`).fadeIn();      
    } else{
      $('section').fadeIn()
    }
  })
}

// Feature 1: Pagination

// event listener that handles click that decide what page to load.
const switchPage = function(){
  $('ul').on('click', 'li', function(){
    $('section').remove();
    fetchData($(this).attr('id'));
 })
 }
 
// Feature 4: Sort the images
const sortByNameAndNumber = () =>{
  $('input').on('change', function(){
    const $sortBy = $(this).attr('id');

    console.log(monsters);

    $('section').remove();
    sortArr(monster[0])

    console.log(monsters)

    ConstructHorn.render();

  })
}

// sortByNameAndNumber();

// Why are we implementing this feature?
// As a user, I want to be able to sort the images so that there is an order to their rendering.

// What are we going to implement?
// Given that a user is presented with sort options When the user clicks on one option Then the images should be sorted accordingly

// How are we implementing it?
// Add the ability for the user to sort the images by either title or by number of horns.
// Sort the images by one of the properties on page load. This should also apply to the second page of images.


// start page
fetchData(1);
switchPage();
