const playButton = document.querySelector('#play');
const Higher = document.querySelector('#Higher');
const lyrics = document.querySelector('#lyrics');

playButton.addEventListener('click', function() {
  lyrics.classList.add('animation-started');
  Higher.play();
});


//testing - remove when done
const stylingButton = document.querySelector('#styling');
const words = document.querySelectorAll('span');

stylingButton.addEventListener('click', function() {
  lyrics.classList.add('animation-started');
  words.forEach(function(word) {
  	word.setAttribute('style', 'opacity: 1 !important; animation: none !important;');
  });

});
