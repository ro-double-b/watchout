// start slingin' some d3 here.
// dataset that includes the enimies
  // will be an array of objs
  // each obj will be one eniemi

var dataset = [1, {'cy': 500, 'cx': 500}];
var playerSet = [{'x': 500, 'y': 250}];
var drag = d3.behavior.drag()
  .on('drag', function() {
    player.attr('cx', d3.event.x)
    .attr('cy', d3.event.y);
    playerSet[0].x = d3.event.x;
    playerSet[0].y = d3.event.y;
    checkCollision();
  });

var checkCollision = function(enemy) {

  if (Math.abs(playerSet[0].y - enemies.attr('cy')) <= 50 && Math.abs(playerSet[0].x - enemies.attr('cx')) <= 50) {
  console.log('is this working');
    }
  }

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
}, 5000);

setInterval(function() {
  checkCollision();
}, 1000);
