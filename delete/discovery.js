$(document).ready(function(){
    $('.tap-target').tapTarget();
    $('.tap-target').tapTarget('open');

    $("#info").click(function(){
      
      if($('.tap-target').isOpen){
        $('.tap-target').tapTarget('close');
      }
      else{
        $('.tap-target').tapTarget('open'); 
      }
      
    })
  
  
  });