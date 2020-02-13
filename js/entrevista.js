var nro_decision = 1;
var recorrido = [1];

$(document).ready(function() {
  $("#modal-decision").modal({
    endingTop: "30%",
    opacity: 0.8
  });

  $("#next_button").click(function() {
    //Pauso el video
    var video = document.getElementsByTagName("video")[0];
    if(video != undefined){
      video.pause();
    }
    //Cargo la nueva decision
    $("#decision").load(
      "view/entrevista/decision/decision_" + nro_decision + ".html"
    );
    //Muestro la decision
    $("#modal-decision").modal("open");
  });

  $("#finish_button").click(function() {});
});

function IrA(nro_video) {
  $.ajax({
    url: "controller/entrevista/siguiente.php",
    method: "POST",
    data: { nro_video: nro_video },
    cache: "false",
    success: function(resultado) {
      var registro = JSON.parse(resultado);
      console.log(registro);
      //Oculto la decision
      $("#modal-decision").modal("close");
      if (registro.error) {
        alert("Esta queriendo acceder a un video inexistente");
      } else {
        if (registro.tiene_siguiente) {
          nro_decision = registro.nro_decision;
        } else {
          $("#next").fadeOut("slow", "swing");
          $("#finish").fadeIn("slow");
        }
        $("html").animate({ scrollTop: 0 }, 800);
        $("#video").load("view/entrevista/video/video_" + nro_video + ".html");
        //Reproducir el video
        var video = document.getElementsByTagName("video")[0];
        if(video != undefined){
          video.play();
        }
        recorrido.push(nro_video);
        console.log(recorrido);
      }
    }
  });
};

function volver() {
  var vid = document.getElementById("video-1");
  $("#modal-decision").modal("close");
  $("#content").focus();
  vid.load();
  vid.play();
}
