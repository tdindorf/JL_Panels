		var p = document.getElementById('pistonG');
		var g = document.getElementById('gas');
		var ex = document.getElementById('exhaust');
		var f = document.getElementById('force');
		var p_l = document.getElementById('piston_label');
		var e_l = document.getElementById('env_label');
		var envir_in = document.getElementById('stop1');
		var envir_out = document.getElementById('stop2');
		var val_red, val_blue;
		var val_plabel, val_elabel;
		var val_stop, val_force, bol_force_show;
		var val_stop_in, val_stop_out;
		var raf;
		var amplitude = 70;
		var period = 16;
		var wy = 2 * Math.PI / (period * 1000);
		var fps = 60;

		function draw() {
		  var s, c, hs, hc;
		  setTimeout(function() {
		    s = Math.sin(Date.now() * wy);
		    c = Math.cos(Date.now() * wy);
		    hs = amplitude * s
		    hc = amplitude * c
		    p.setAttribute('transform', 'translate(0 ' + (50 + hs) + ')');
		    //ex.setAttribute('r', 300 * (0.5 + 0.2 * s));
		    f.setAttribute('transform', 'scale( 1 ' + val_force + ')');
        f.setAttribute('display', bol_force_show);
		    p_l.innerHTML = val_plabel;
		    e_l.innerHTML = val_elabel;
		    envir_in.setAttribute('stop-color', val_stop_in);
		    envir_out.setAttribute('stop-color', val_stop_out);
		    color_gas(s, c, hs);
		    raf = window.requestAnimationFrame(draw);
		    // Drawing code goes here
		  }, 1000 / fps);
		}

		function color_gas(s, c, h) {
		  var v = (170 - h) / 170;
		  var V = 1;
		  val_force = V * Math.pow(v, -1);
		  if (s > -0.2 && c < 0) {
		    val_red = 255;
		    val_blue = 0;
		    val_elabel = 'SOURCE @ TH'
		    val_stop_in = 'pink'
		    val_stop_out = 'red'
		    val_plabel = 'III'
        bol_force_show = 'none'
		    //val_force = -V / Math.pow(v, 1);
		  } else if (s < 0.2 && c > 0) {
		    val_red = 0;
		    val_blue = 255;
		    val_elabel = 'SINK @ TC'
		    val_stop_in = 'aqua'
		    val_stop_out = 'blue'
		    val_plabel = 'I'
        bol_force_show = 'visible'
		    //val_force = -V / Math.pow(v, 1);
		  } else if (s < -0.2 && c < 0) {
		    val_red = Math.round(512 * (0 - c));
		    val_blue = Math.round(-512 * (0.5 + s)); //!!
		    val_elabel = '(insulated)'
		    val_plabel = 'IV'
		    val_stop_in = 'white'
		    val_stop_out = 'white'
        bol_force_show = 'none'
		    //val_force = -V / Math.pow(v, 1.667);
		  } else if (s > 0.2 && c > 0) {
		    val_red = Math.round(512 * (s - 0.5));
		    val_blue = Math.round(255 * (c));
		    val_elabel = '(insulated)'
		    val_plabel = 'II'
		    val_stop_in = 'white'
		    val_stop_out = 'white'
        bol_force_show = 'visible'
		    //val_force = -V / Math.pow(v, 1.667);
		  }
		  g.setAttribute('fill', 'rgb(' + val_red + ', 0,' + val_blue + ')');

		}

		draw();
