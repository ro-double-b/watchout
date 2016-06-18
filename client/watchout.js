// start slingin' some d3 here.
// dataset that includes the enimies
  // will be an array of objs
  // each obj will be one eniemi
  // key property
  // cx and cy property
var dataset = [1, 2, 3, 4, 5];
var playerSet = [1];
// var drag = d3.behavior.drag()
//   .on('drag', function(d, i) {
//     d.x += d3.event.dx
//     d.y += d3.event.dy
//     d3.select(this).attr('transform', function(d,i) {
//       return 'translate(' + [d.x, d.y] + ')'
//     });
//   });


var board = d3.select('.board').append('svg')
            .attr('width', 1000)
            .attr('height', 500);

board.on('click', function() {
  var test = d3.mouse(this)
  var playerClick = board.selectAll('.player')
        .attr('cx', test[0])
        .attr('cy', test[1])

});
  

var player = board.selectAll('circle')
  .data(playerSet)
  .enter()
  .append('circle')
  .attr('cx', 500)
  .attr('cy', 250)
  .attr('r', 25)
  .attr('fill', 'red')
  .attr('class', 'player')
  // .attr('transform', 'translate(' + x + ',' + y + ')')
  // .call(drag);

// create multiple enemies based off dataset
// update atts
var enemies = board.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', function(d) { return Math.random() * 1000; })
  .attr('cy', 50)
  .attr('r', 25)
  .attr('class', 'enemies');
// dataset of # enemies
var move = function() {
  for (var i = 0; i < 100; i = i + 10) {
    enemies.transition()
    .delay(750)
    .attr('cy', function(d, i) { return Math.random() * 500; })
    .attr('cx', function(d, i) { return Math.random() * 1000; });
  }
};

move();

setInterval(function() {
  move();
}, 1000);

// on click mouse moves

// interval function that calls every sec to update scoreboard/position



