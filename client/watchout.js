var dataset = [1, 2, 3, 4, 5];
var playerSet = [{'x': 500, 'y': 300}];
var drag = d3.behavior.drag()
  .on('drag', function() {
    player.attr('x', d3.event.x)
    .attr('y', d3.event.y);
    playerSet[0].x = d3.event.x + 100;
    playerSet[0].y = d3.event.y;
  });

var currentScore = 0;
var highScore = currentScore;
var collision = 0;

var scoreNode = d3.select('body').select('div.scoreboard').select('div.current').select('span');

var checkCollision = function() {
  currentScore++;
  if (currentScore > highScore) {
    highScore = currentScore;
  }

  for (var i = 1; i < dataset.length; i++) {

    var collisionFlag = false
    // checks if a collision is true; sets flag to true
    if (!collisionFlag && Math.abs(player[0][0].y.animVal.value - enemies[0][i].y.animVal.value) <= 50 && Math.abs(player[0][0].x.animVal.value - enemies[0][i].x.animVal.value) <= 50) {
      collisionFlag = true;
    }
    if (collisionFlag && Math.abs(player[0][0].y.animVal.value - enemies[0][i].y.animVal.value) < 50 && Math.abs(player[0][0].x.animVal.value - enemies[0][i].x.animVal.value) < 50) {
      currentScore = 0;
      collision++;
      collisionFlag = false;
    }
  }
  
  d3.select('div.current').select('span').text(currentScore);
  d3.select('div.highscore').select('span').text(highScore);
  d3.select('div.collisions').select('span').text(collision);
};

var board = d3.select('.board').append('svg')
  .attr('width', 1000)
  .attr('height', 667)
  .style('background', 'url(BGspace.jpeg)')
  .style('background-size', 'contain');

var player = board.selectAll('image')
  .data(playerSet)
  .enter()
  .append('image')
  .attr('width', 75)
  .attr('height', 70)
  .attr('xlink:href', 'falcon.gif')
  .attr('class', 'player')
  .attr('x', function(d) { return d.x; })
  .attr('y', function(d) { return d.y; })
  .call(drag);


var enemies = board.selectAll('image')
  .data(dataset)
  .enter()
  .append('image')
  .attr('width', 50)
  .attr('height', 50)
  .attr('xlink:href', 'asteroid.png')
  .attr('class', 'enemies')
  .attr('x', function(d) { return Math.random() * 1000; })
  .attr('y', function(d) { return Math.random() * 667; });

var move = function() {

  enemies.transition()
  .delay(750)
  .attr('y', function(d, i) { return Math.random() * 667; })
  .attr('x', function(d, i) { return Math.random() * 1000; });
};

move();

setInterval(function() {
  move();
}, 3000);

setInterval(function() {
  checkCollision();
}, 100);
