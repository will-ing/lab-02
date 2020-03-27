'use strict'

//Feature #1: Display images

// Why are we implementing this feature?
// As a user, I want to view the images on the page so that I can browse the photo collection.



// What are we going to implement?
// Given that a user opens the application in the browser When the user navigates to the home page Then the photo gallery should display all of the images in the gallery

// How are we implementing it?
// Use AJAX, specifically $.ajax(), to read the provided JSON file.
// Each object should become a new instance of a constructor function. Refer to the data to determine the necessary properties.
// Use jQuery to make a copy of the HTML template of the photo component. For each object, fill in the duplicated template with its properties, then append the copy to the DOM.
constructHorn.prototype.render = function (){
  const tpl = $('#photo-template').html();
  const $createSection = $('<section></section>');
  $createSection.html(tpl);
  $createSection.find('h2').text(this.title);
  $createSection.find('img').attr('src', this.image);
  $createSection.find('p').text(this.description);
  $('main').append($createSection)
} // got help from Jesse Pena



$.ajax('data/page-1.json', {METHOD: 'GET', DATATYPE: 'JSON'})
.then(hornData => {
  hornData.forEach(hornType => {
    new constructHorn(hornType).render();
  })
})

const hornStorage = [];
console.log('HORN OBJECT', hornStorage)

console.log('THIS ONE', )


function constructHorn(eachOne){
  this.image = eachOne.image_url;
  this.title = eachOne.title;
  this.description = eachOne.description;
  this.keyword = eachOne.keyword;
  this.horns = eachOne.horns;
  hornStorage.push(this);
}


// Feature #2: Filter images

// Why are we implementing this feature?
// As a user, I want to be able to filter the images so that I can view only images that match a keyword.

// What are we going to implement?
// Given that a user clicks on the dropdown menu When the user selects one of the options Then only the images whose keyword matches the option should be displayed

// How are we implementing it?
// Create a <select> element which contains unique <option> elements extracted dynamically from the JSON file, one for each keyword.
// Use an event handler to respond when the user chooses an option from the select menu. Hide all of the images, then show those whose keyword matches the option chosen.

// Feature #3: Style the application

// Why are we implementing this feature?
// As a user, I want a simple, clean looking UI so that my photo gallery clearly displays the images in a grid like pattern.

// What are we going to implement?
// Given that a user opens the application in the browser When the user navigates to the home page Then the images should be displayed in rows across the screen

// How are we implementing it?
// Style your application using floats.
// Utilize at least one Google font.