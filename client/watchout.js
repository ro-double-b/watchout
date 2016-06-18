// start slingin' some d3 here.
// dataset that includes the enimies
  // will be an array of objs
  // each obj will be one eniemi

var dataset = [1, {'cy': 500, 'cx': 500}, {'cy': 500, 'cx': 500}, {'cy': 500, 'cx': 500}];
var playerSet = [{'x': 500, 'y': 250}];
var drag = d3.behavior.drag()
  .on('drag', function() {
    player.attr('cx', d3.event.x)
    .attr('cy', d3.event.y);
    playerSet[0].x = d3.event.x;
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

  //iterate over array of enemies attributes
  //check to see if any toutch
  //if they do its a collsion

  for (var i = 1; i < dataset.length; i++) {
    if (Math.abs(playerSet[0].y - enemies[0][i].cy.animVal.value) <= 50 && Math.abs(playerSet[0].x - enemies[0][i].cx.animVal.value) <= 50) {
      currentScore = 0;
      collision++;  
  }

  }
  
  d3.select('div.current').select('span').text(currentScore);
  d3.select('div.highscore').select('span').text(highScore);
  d3.select('div.collisions').select('span').text(collision);
  // hello.data([2, 3, 4]).text(currentScore);

  // d3.select('body').selectAll('span').data(currentScore).text(function(d) { return d; });
};



var board = d3.select('.board').append('svg')
            .attr('width', 1000)
            .attr('height', 500);


var player = board.selectAll('circle')
  .data(playerSet)
  .enter()
  .append('circle')
  .attr('r', 25)
  .attr('fill', 'red')
  .attr('class', 'player')
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .call(drag);



var enemies = board.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', function(d) { return Math.random() * 1000; })
  .attr('cy', function(d) { return Math.random() * 500; })
  .attr('r', 25)
  .attr('class', 'enemies');
// dataset of # enemies
var move = function() {

  enemies.transition()
  .delay(750)
  .attr('cy', function(d, i) { return Math.random() * 500; })
  .attr('cx', function(d, i) { return Math.random() * 1000; });


};

move();

setInterval(function() {
  move();
}, 3000);

setInterval(function() {
  checkCollision();
}, 100);
