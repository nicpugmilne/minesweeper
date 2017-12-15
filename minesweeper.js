$(document).ready(function() {

  var gemCounter = 0
  var bombCounter = 0
  var rows = 6;
  var columns = 6;

  //Creating the grid

  var $row = $("<div />", {
    class: 'row'
  });
  var $square = $("<div />", {
    class: 'square'
  });
  for (var i = 0; i < columns; i++) {
    $row.append($square.clone());
  }
  for (var i = 0; i < rows; i++) {
    $("#wrapper").append($row.clone());
  }

  //Game logic

  $( ".square" ).each(function() {
    var randomNumber = Math.floor((Math.random() * 10));
    var bomb = $("<i class='fa fa-2x fa-bomb' aria-hidden='true'></i>").hide()
    var gem =  $("<i class='fa fa-2x fa-diamond' aria-hidden='true'></i>").hide()
    $('#highScoreCount').html("High Score : " + localStorage.getItem('highScore'))
    $('#gemCount').html("Gem Count: " + gemCounter)
    if (randomNumber <= 2) {
      $( this ).append(bomb).addClass('hasBomb');
      console.log('Bomb has been appended')
    } else {
      $( this ).append(gem).addClass('hasGem');
      console.log('Gem has been appended')
    }
  });

  $( ".square" ).click(function() {
    if ($( this ).hasClass('hasBomb')) {
      $('.hasBomb').children().show()
      $('#gemCount').hide()
      $('#gameOver').html("Game Over!").append("<button type='button' id='restart'>Restart</button>")
      $(".square").unbind("click")
      if (gemCounter >= localStorage.getItem('highScore')) {
          localStorage.setItem('highScore', gemCounter)
      }
    } else {
      $( this ).children().show();
      gemCounter++
      $('#gemCount').html("Gem Count: " + gemCounter)
    }
  });

  $(document).on('click', '#restart', function() {
    location.reload(true)
  })
});
