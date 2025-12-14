$(window).on('load', function () {
  $('.loading').fadeOut('fast');
  $('.container').fadeIn('fast');
});

$(document).ready(function () {

  var vw;
  var balloonCount = 11;
  var maxMessages = $('.message p').length;

  /* ---------------- INITIAL STATE ---------------- */
  $('.balloons').hide();      // 🎈 balloons hidden initially
  $('.cake').hide();
  $('.fuego').hide();
  $('.message').hide();

  /* ---------------- HELPERS ---------------- */
  function centerBalloons() {
    vw = $(window).width() / 2;
    for (let i = 1; i <= balloonCount; i++) {
      $('#b' + i)
        .stop(true, true)
        .animate({
          top: 240,
          left: vw - 550 + (i * 100)
        }, 600);
    }
  }

  function balloonLoop(id) {
    function animate() {
      $('#' + id).animate({
        left: Math.random() * 1000,
        bottom: Math.random() * 500
      }, 10000, animate);
    }
    animate();
  }

  $(window).resize(centerBalloons);

  /* ---------------- EVENTS ---------------- */

  $('#turn_on').click(function () {
    $('#bulb_yellow').addClass('bulb-glow-yellow');
    $('#bulb_red').addClass('bulb-glow-red');
    $('#bulb_blue').addClass('bulb-glow-blue');
    $('#bulb_green').addClass('bulb-glow-green');
    $('#bulb_pink').addClass('bulb-glow-pink');
    $('#bulb_orange').addClass('bulb-glow-orange');
    $('body').addClass('peach');

    $(this).fadeOut('slow').delay(5000).promise().done(function () {
      $('#play').fadeIn('slow');
    });
  });

  $('#play').click(function () {
    $('.song')[0].play();

    $('#bulb_yellow').addClass('bulb-glow-yellow-after');
    $('#bulb_red').addClass('bulb-glow-red-after');
    $('#bulb_blue').addClass('bulb-glow-blue-after');
    $('#bulb_green').addClass('bulb-glow-green-after');
    $('#bulb_pink').addClass('bulb-glow-pink-after');
    $('#bulb_orange').addClass('bulb-glow-orange-after');

    $('body')
      .css('background-color', '#FFF')
      .addClass('peach-after');

    $(this).fadeOut('slow').delay(6000).promise().done(function () {
      $('#bannar_coming').fadeIn('slow');
    });
  });

  $('#bannar_coming').click(function () {
    $('.bannar').addClass('bannar-come');
    $(this).fadeOut('slow').delay(6000).promise().done(function () {
      $('#balloons_flying').fadeIn('slow');
    });
  });

  $('#balloons_flying').click(function () {

    $('.balloons').show();   // 🎈 SHOW balloons only here

    $('.balloon-border').animate({ top: -500 }, 8000);

    for (let i = 1; i <= balloonCount; i++) {
      $('#b' + i)
        .addClass(i % 2 === 0
          ? 'balloons-rotate-behaviour-two'
          : 'balloons-rotate-behaviour-one');

      balloonLoop('b' + i);
    }

    $(this).fadeOut('slow').delay(5000).promise().done(function () {
      $('#cake_fadein').fadeIn('slow');
    });
  });

  $('#cake_fadein').click(function () {
    $('.cake').fadeIn('slow');
    $(this).fadeOut('slow').delay(3000).promise().done(function () {
      $('#light_candle').fadeIn('slow');
    });
  });

  $('#light_candle').click(function () {
    $('.fuego').fadeIn('slow');
    $(this).fadeOut('slow').promise().done(function () {
      $('#wish_message').fadeIn('slow');
    });
  });

  $('#wish_message').click(function () {

    // 🛑 stop all balloon movements
    for (let i = 1; i <= balloonCount; i++) {
      $('#b' + i).stop(true, true);
    }

    centerBalloons();

    $('.balloons').css('opacity', '0.9');
    $('.balloons h2').fadeIn(3000);

    $(this).fadeOut('slow').delay(3000).promise().done(function () {
      $('#story').fadeIn('slow');
    });
  });

  $('#story').click(function () {
    $(this).fadeOut('slow');

    $('.cake').fadeOut('fast').promise().done(function () {
      $('.message').fadeIn('slow');
    });

    function msgLoop(i) {
      if (i > maxMessages) return;

      $('.message p').hide();
      $('.message p:nth-child(' + i + ')')
        .fadeIn('slow')
        .delay(1200)
        .fadeOut('slow', function () {
          msgLoop(i + 1);
        });
    }

    msgLoop(1);
  });

});

