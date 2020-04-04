'use strict'

//Feature #1: Display images

const keywordArr = [];

console.log('HORN OBJECT', ConstructHorn)

console.log('KEYWORD ARR', keywordArr)

// Feature 2: Templating

//renders images on html
ConstructHorn.prototype.render = function (){
  const tpl = $('#photo-template').html();
  let trg = $('main')
  trg.append(Mustache.render(tpl, this))
}

// sorts arr in a-z
const sortArr = (arr) => {
  arr.sort();
  return arr;
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
      choices();
      numberOfHorns();
      sortArr(ConstructHorn.name);
      sortArr(keywordArr);
      filterBox();
  })
}

// constructs images and stores them in a arr
function ConstructHorn(eachOne){
  this.image = eachOne.image_url;
  this.title = eachOne.title;
  this.description = eachOne.description;
  this.keyword = eachOne.keyword;
  this.horns = eachOne.horns;
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

// Feature 1: Pagination

// event listener that handles click that decide what page.
const switchPage = function(){
  $('ul').on('click', 'li', function(){
    $('section').remove();
    fetchData($(this).attr('id'));
 })
 }
 
// Feature 4: Sort the images

const sortByNameAndNumber = (obj) =>{
  $('name').on('change', function(){
    return obj.horns 
  })
}

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
