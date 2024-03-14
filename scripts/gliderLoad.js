document.addEventListener('keydown', (function(e) {
if (e.keyCode === 37) {
 // Previous
 // console.log("prev");
 window._.scrollItem("prev")
}
if (e.keyCode === 39) {
 // Next
 // console.log("next");
 window._.scrollItem("next")
}
}));

function goToNumerics(){
  window._.scrollItem(0)
}

function goToML(){
  window._.scrollItem(1)
}

function goToSensors(){
  window._.scrollItem(2)
}

window.addEventListener('load',function(){
  // document.querySelector('.glider').addEventListener('glider-slide-visible', function(event){
  //     var glider = Glider(this);
  //     console.log('Slide Visible %s', event.detail.slide)
  // });
  // document.querySelector('.glider').addEventListener('glider-slide-hidden', function(event){
  //     console.log('Slide Hidden %s', event.detail.slide)
  // });
  // document.querySelector('.glider').addEventListener('glider-refresh', function(event){
  //     console.log('Refresh')
  // });
  // document.querySelector('.glider').addEventListener('glider-loaded', function(event){
  //     console.log('Loaded')
  // });

  window._ = new Glider(document.querySelector('.glider'), {
      slidesToShow: 1, //'auto',
      itemWidth: 800,
      draggable: false,
      scrollLock: false,
      dots: '#dots',
      rewind: false,
      arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
      },

  });
});