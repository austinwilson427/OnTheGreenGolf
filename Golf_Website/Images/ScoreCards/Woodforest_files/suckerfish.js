$(document).ready(function(){
   $("#maintab-nav > li > ul").fadeOut("fast");
   $("#maintab-nav li").hover(
      function(){ $(this).find("ul:first").fadeIn("fast"); }, 
      function(){ $(this).find("ul:first").fadeOut("fast"); } 
   );
   if (document.all) {
      $("#maintab-nav li").hoverClass ("hover");
   }
});
$.fn.hoverClass = function(c) {
   return this.each(function(){
      $(this).hover( 
         function() { $(this).addClass(c);  },
         function() { $(this).removeClass(c); }
      );
   });
};
/* Code found at: http://be.twixt.us/jquery/suckerFish.php
Date: unknown
Tweaked by: Ethan Kent - http://www.ethanmultimedia.com/
For jQuery version: 1.2.6
Date: June 19th, 2008
*/