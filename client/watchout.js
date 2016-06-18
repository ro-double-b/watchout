// start slingin' some d3 here.
// dataset that includes the enimies
  // will be an array of objs
  // each obj will be one eniemi
  // key property
  // cx and cy property
var dataset = [1, 2, 3, 4, 5];
var playerSet = [{'x':500, 'y':250}];
var drag = d3.behavior.drag()
  .on('drag', function() {
    player.attr('cx', d3.event.x)
    .attr('cy', d3.event.y);
  });


  //   var dx = d3.event.dx
  //   var dy = d3.event.dy
  //   console.log(dx)
  //   d3.select('.player').attr('transform', function(d,i) {
  //     return 'translate(' + dx + ',' + dy +')' })
    // });
  // });


var board = d3.select('.board').append('svg')
            .attr('width', 1000)
            .attr('height', 500);

// board.on('click', function() {
//   var test = d3.mouse(this)
//   var playerClick = board.selectAll('.player')
//         .attr('cx', test[0])
//         .attr('cy', test[1])

// });
  

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
  // .attr('transform', function(d) {
  //   'translate(' + d.cx + ',' + d.cy + ')'})

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

