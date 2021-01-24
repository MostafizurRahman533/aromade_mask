//Get the button
var mybutton = document.getElementById("myBtn");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}




// interval is in milliseconds. 1000 = 1 second -> so 1000 * 10 = 10 seconds
$('.carousel').carousel({
  interval: 800 * 8
});




// When the document is loaded...
$(document).ready(function() {

    $('#mob-menu-btn').click(function(){
        $('.sports').slideToggle("slow");
    })

    $('#sub-menu').click(function(){
        $('.sports2').slideToggle("slow");
    })

});



  function openNav(){
      document.getElementById("demo2").style.display = "block";
      document.getElementById("demo2").style.marginTop = "30px";
      document.getElementById("demo1").style.display = "none";
      document.body.style.overflow="hidden";
  }
  function closeNav(){
      document.getElementById("demo2").style.display = "none";
      document.getElementById("demo1").style.display = "block";
      document.body.style.overflow="initial";
  }