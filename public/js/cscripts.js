    //var s = new Sound("js/ss.mp3",100,false);
    //
    //Create the audio tag
      var fileName = 'js/ss';
      var soundFile = document.createElement("audio");
      soundFile.preload = "auto";

      //Load the sound file (using a source element for expandability)
      var src = document.createElement("source");
      src.src = fileName + ".mp3";
      soundFile.appendChild(src);

      //Load the audio tag
      //It auto plays as a fallback
      soundFile.load();
      soundFile.volume = 0.000000;
      soundFile.play();

      //Plays the sound
      function play() {
         //Set the current time for the audio file to the beginning
         soundFile.currentTime = 0.01;
         soundFile.volume = 1;

         //Due to a bug in Firefox, the audio needs to be played after a delay
         setTimeout(function(){soundFile.play();},1);
}

////////////
		  var socket = io();

		  $('form').submit(function(){
        if (sessionStorage.hasOwnProperty('urname')) {
          n = sessionStorage.urname;
        } else {
           n = 'infamous';
           sessionStorage.urname = n;
        }

		    socket.emit('chat message', $('#m').val(), n);
		    $('#m').val('');
		    return false;
		  });
		  socket.on('chat message', function(msg){
		    $('#messages').append($('<li class="msg">').text(msg));
        scrollBottom();
        if (active == false) {
          //s.start();
          play();
        }
		  });

		  socket.on('sys msg', function(msg){
		    $('#messages').append($('<li class="sysmsg">').text("System: "+msg));
        scrollBottom();
		  });

      socket.on('name change', function(msg){
        $('#messages').append($('<li class="sysmsg">').text(msg));
        scrollBottom();
      });

      socket.on('online', function(msg){
        $('#online').html("<h5>Users Online: "+msg+"</h5>");
      });

		  socket.on('reload', function(){
		    location.reload();
		  });

      socket.on('rel', function(msg){
        location.href = msg;
      });

      socket.on('window', function(msg){
        window.open(msg);
      });



      socket.on('type', function(msg){
        var ppls = '';
        var incc = 0;
        for(key in msg) {
          if (msg[key] == true && key != sessionStorage.urname) {
            if (incc == 0) {
              ppls += key + " ";
            } else {
              ppls += ", " + key;
            }
            incc++;
          }
        }
        if (incc > 0) {
          var textt = ppls + 'is typeing ...';
          $('#tty').html(textt);
        } else {
          $('#tty').html('');
        }
      });


      ////////////////////

            var active = true;
            var interval = 60000;
            function away() {
              active = false;
              console.log('away');
              socket.emit('status', active, sessionStorage.urname);
            }

            function isactive() {
                if (active == false) {
                  socket.emit('status', true, sessionStorage.urname);
                  console.log('active');

                }
                active = true;
                clearTimeout(active_timer);
                active_timer = setTimeout(function(){ away(); }, interval );
            }

            var active_timer = setTimeout(function(){ away(); }, interval );

              document.onkeypress = function (e) {
              isactive();
              if ( $('#m').val().length > 0 && active == true) {
                if (sessionStorage.hasOwnProperty('urname')) {
                n = sessionStorage.urname;
              } else {
                 n = 'infamous';
                 sessionStorage.urname = n;
              }
                socket.emit('typeing', sessionStorage.urname);
              } else {
                socket.emit('stoppedtypeing', sessionStorage.urname);
              }
              };

              document.onmousemove = function(e) {
                isactive();
              if ( $('#m').val().length == 0 ) {
                socket.emit('stoppedtypeing', sessionStorage.urname);
              }
              }



///////////////////////////////////


  $('#aa').change(function() {
    if (sessionStorage.hasOwnProperty('urname')) {
    n = sessionStorage.urname;
  } else {
     n = 'infamous';
     sessionStorage.urname = n;
  }
     socket.emit('name change', sessionStorage.urname, $(this).val());

    sessionStorage.urname = $(this).val();
    $(this).val('');
  })


  function scrollBottom() {
    var objDiv = document.getElementById("msg_con");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
