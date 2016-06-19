var dataset = [1, 2, 3, 4, 5];
var playerSet = [{'x': 500, 'y': 300}];
var drag = d3.behavior.drag()
  .on('drag', function() {
    player.attr('x', function(d) { return d3.event.x - 60 })
    .attr('y', function(d) { return d3.event.y - 31 });
    playerSet[0].x = d3.event.x - 60;
    playerSet[0].y = d3.event.y - 31;
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

    var collisionFlag = false;
    // checks if a collision is true; sets flag to true
    if (Math.abs((player[0][0].y.animVal.value + 31) - enemies[0][i].y.animVal.value) <= 63 && Math.abs((player[0][0].x.animVal.value + 60) - enemies[0][i].x.animVal.value) <= 120) {
      currentScore = 0;
      collision++;
      // collisionFlag = true;
    }
    // if (collisionFlag && Math.abs(player[0][0].y.animVal.value - enemies[0][i].y.animVal.value) < 50 && Math.abs(player[0][0].x.animVal.value - enemies[0][i].x.animVal.value) < 50) {
    //   collisionFlag = false;
    // }
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

// var rotateEst = 0

var player = board.selectAll('image')
  .data(playerSet)
  .enter()
  .append('image')
  .attr('width', 120)
  .attr('height', 63)
  .attr('xlink:href', 'falcon.gif')
  .attr('class', 'player')
  .attr('x', function(d) { return d.x; })
  .attr('y', function(d) { return d.y; })
  .call(drag)



var enemies = board.selectAll('image')
  .data(dataset)
  .enter()
  .append('image')
  .attr('width', 50)
  .attr('height', 50)
  .attr('xlink:href', 'ninjastar.png')
  .attr('class', 'enemies')
  .attr('class', 'anticlockwise')
  .attr('x', function(d) { return Math.random() * 1000; })
  .attr('y', function(d) { return Math.random() * 667; })

  // .attr('transform','');
  // .attr('transform', function(d, i) {
  //       console.log(enemies[0][i].x.animVal.value);
  //   return 'translate(' + enemies[0][i].x.animVal.value + ',' + enemies[0][i].y.animVal.value + ') rotate(180)'});

  // .attr('transform', function(d, i) {
  //   return 'translate(' + d.attr("x") + ', 0) rotate(180)';
  // });


  // console.log(enemies[0][1].y.animVal.value);


var move = function() {

  enemies.transition()
  .delay(750)
  .attr('y', function(d, i) { return Math.random() * 667; })
  .attr('x', function(d, i) { return Math.random() * 1000; });
  // .style('transform','rotate(' + rotateEst++ + 'deg)');

  // if (rotateEst > 75) {
  //   rotateEst = 0
  // }
  // rotateEst = rotateEst + 10;

};

// var spin = function() {

//   player.transition()
//   .attr('transform', function(d, i) {
//     console.log(player[0][i].x.animVal.value);

//     return 'translate(500,300) rotate(45, 31, 60)'});

// };

// // move();

// setInterval(function() {
//   spin();
// }, 1000);

setInterval(function() {
  move();
}, 1000);

setInterval(function() {
  checkCollision();
}, 100);
