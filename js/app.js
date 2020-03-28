'use strict'

//Feature #1: Display images

const hornStorage = [];
const keywordArr = [];

console.log('HORN OBJECT', hornStorage)

console.log('KEYWORD ARR', keywordArr)

//renders images on html
constructHorn.prototype.render = function (){
  const tpl = $('#photo-template').html();
  const $createSection = $(`<section class=${this.keyword}></section>`);
  $createSection.html(tpl);
  $createSection.find('h2').text(this.title);
  $createSection.find('img').attr('src', this.image);
  $createSection.find('p').text(this.description);
  $('main').append($createSection)
} // got help from Jesse Pena. The key was to use .html


// pulls data from json file
$.ajax('data/page-1.json', {METHOD: 'GET', DATATYPE: 'JSON'})
.then(hornData => {
  hornData.forEach(hornType => {
    new constructHorn(hornType).render();
    if(!keywordArr.includes(hornType.keyword)){keywordArr.push(hornType.keyword)};
    
  })
  filterBox();
  choices();
})


// constructs images and stores them in a arr
function constructHorn(eachOne){
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
    console.log($(this).val())
    let selected = $(this).val()
    if(selected !== 'default'){
      $('section').hide();
      console.log(`section id="${this.value}"`);
      $(`.${this.value}`).show();
    } else{
      $('section').show()
    }
  })
}



// Feature #3: Style the application

// Why are we implementing this feature?
// As a user, I want a simple, clean looking UI so that my photo gallery clearly displays the images in a grid like pattern.

// What are we going to implement?
// Given that a user opens the application in the browser When the user navigates to the home page Then the images should be displayed in rows across the screen

// How are we implementing it?
// Style your application using floats.
// Utilize at least one Google font.