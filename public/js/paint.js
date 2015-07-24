
    function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    $('#color').val(color);
    return color;
}

  var amount = 500;
  var camount = 0;
  var color2;

  		c = $g.canvas;
  		c.setarea('c1');
      c.resize();
      c.draw.fRec('#ffffff',0,0,10000,10000);

  		mousedown = false;

  		var mr = parseInt($('#cont').css('margin-left')) + parseInt($('#cont').css('padding-left'));
  		var mt = parseInt($('#cont').css('margin-top')) + parseInt($('#cont').css('padding-top'));
  		color,size,brush;
  		$( 'canvas' ).on( "mousedown", function( event ) {
  			mousedown = true;
  			color = $('#color').val();
  			size = $('#size').val();
  			brush = $('#brush').val();
  				if (brush == 'rb') {
  					//c.draw.circlef(color,c.getMousePos(event).x,c.getMousePos(event).y, size/2);
            socket.emit('paint_circle_rb', color,c.getMousePos(event).x,c.getMousePos(event).y, size/2);


  				} else if (brush == 'sb') {
            socket.emit('paint_circle_sb', color, (c.getMousePos(event).x - (size/2) ) , (c.getMousePos(event).y - (size/2) ), size,size);

  					//c.draw.fRec(color,(c.getMousePos(event).x) - (size/2) ,(c.getMousePos(event).y) - (size/2), size,size);
  				} else if (brush == 'clo') {
            socket.emit('paint_clouds', color,c.getMousePos(event).x,c.getMousePos(event).y, size/2);

  				//	c.draw.clouds(color,c.getMousePos(event).x,c.getMousePos(event).y, size/2);
  				} else if (brush == 'blur') {
            //c.draw.blur(color,c.getMousePos(event).x,c.getMousePos(event).y, size/2);
            socket.emit('paint_blur', color,c.getMousePos(event).x,c.getMousePos(event).y, size/2);


          } else if (brush == 'rand') {
            color2 = getRandomColor();
            camount = 0;
            c.draw.blur(color2,c.getMousePos(event).x,c.getMousePos(event).y, size/2);

          }

		});
		$( 'canvas' ).on( "mouseup", function( event ) {
  			mousedown = false;
		});

		$( 'canvas' ).on( "mouseout", function( event ) {
  			//mousedown = false;
		});

		$( document ).on( "mouseup", function( event ) {
  			mousedown = false;
		});



		$( 'canvas' ).on( "mousemove", function( event ) {
			if (mousedown) {
  				if (brush == 'rb') {
  				//	c.draw.circlef(color,c.getMousePos(event).x,c.getMousePos(event).y, size/2);
            socket.emit('paint_circle_rb', color,c.getMousePos(event).x,c.getMousePos(event).y, size/2);


  				} else if (brush == 'sb') {
            socket.emit('paint_square_sb', color, (c.getMousePos(event).x - (size/2) ) , (c.getMousePos(event).y - (size/2) ), size,size);

  				//	c.draw.fRec(color,(c.getMousePos(event).x) - (size/2) ,(c.getMousePos(event).y) - (size/2), size,size);
  				} else if (brush == 'clo') {
            socket.emit('paint_clouds', color,c.getMousePos(event).x,c.getMousePos(event).y, size/2);

  					//c.draw.clouds(color,c.getMousePos(event).x,c.getMousePos(event).y, size/2);
  				} else if (brush == 'blur') {
            socket.emit('paint_blur', color,c.getMousePos(event).x,c.getMousePos(event).y, size/2);


          //  c.draw.blur(color,c.getMousePos(event).x,c.getMousePos(event).y, size/2);

          }  else if (brush == 'rand') {
            if (camount >= amount) {
              color2 = getRandomColor();
              camount = 0;
            }
            c.draw.blur(color2,c.getMousePos(event).x,c.getMousePos(event).y, size/2);
            camount++;

          }
			}
		});

    $('canvas').bind('mousewheel', function(e){
        if(e.originalEvent.wheelDelta /120 > 0) {
            $('#size').val(parseInt($('#size').val()) + 1);
                  // sssize = $('#size').val();
                  // $('#brsize').width(sssize);
                  // $('#brsize').height(sssize);
        }
        else{
            $('#size').val(parseInt($('#size').val()) - 1);
                  // sssize = $('#size').val();
                  // $('#brsize').width(sssize);
                  // $('#brsize').height(sssize);
        }
    });

    // $(document).ready(function() {
    //   sssize = $('#size').val();
    //   $('#brsize').width(sssize);
    //   $('#brsize').height(sssize);
    // })
    // $('#size').change(function() {
    //         sssize = $('#size').val();
    //         $('#brsize').width(sssize);
    //         $('#brsize').height(sssize);
    // })


function download(canvas, filename) {

    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'),
        e;

    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL();

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {

        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
                         0, 0, 0, 0, 0, false, false, false,
                         false, 0, null);

        lnk.dispatchEvent(e);

    } else if (lnk.fireEvent) {

        lnk.fireEvent("onclick");
    }
}

	$('#dl').click(function(){
		var cc = document.getElementById('c1');
		download(cc, 'canvas.png');
	})

	$('#clr').click(function(){

    socket.emit('paint_clr');

	})

    $('#hangmanClear').on('click',function(){
    socket.emit('paint_hang_clr');


    })


socket.on('paint_clr_sent', function(){
  c.clr();
  c.draw.fRec('#ffffff',0,0,10000,10000);
});

socket.on('paint_hang_clr_sent', function(){
         c.draw.fRec('#ffffff',0,0,1000000,(c.area.height - 60));



        console.log(1);
          var start = {
            x: c.area.width - 250,
            y:0,
            x2:0,
            y2:(c.area.height - 60)
          }
          var end = {
            x: c.area.width - 250,
            y: c.area.height,
            x2:(c.area.width),
            y2:(c.area.height - 60)
          }

         c.draw.fRec('#ffffff',0,start.y2,end.x,end.y);


          c.draw.lineTo(start.x,start.y, end.x, end.y);
          c.draw.lineTo(start.x2,start.y2, end.x2, end.y2);

});


		  socket.on('paint_circle_sent_rb', function(color,mx,my, size){
		    c.draw.circlef(color,mx,my, size);
		  });

		  socket.on('paint_square_sent_sb', function(color,mx,my, size,size){
		    c.draw.fRec(color,mx,my, size,size);
		  });

		  socket.on('paint_clouds_sent', function(color,mx,my, size){
		    c.draw.clouds(color,mx,my, size);
		  });

		  socket.on('paint_blur_sent', function(color,mx,my, size){
		    c.draw.blur(color,mx,my, size);
		  });
