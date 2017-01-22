window.onload = function() {
  var canvas = document.getElementById("canvas");
  var width = canvas.width = window.innerWidth;
  var height = canvas.height = window.innerHeight;
  var margin_x = 400, margin_y = 100;
  var context = canvas.getContext("2d");
  var tile_width=60, tile_height=60;
  var img;
  var alpha = ["a", "b", "c", "d", "e", "f", "g", "h"];
  var chessBoard = {
    "a" : 0,
    "b" : 1,
    "c" : 2,
    "d" : 3,
    "e" : 4,
    "f" : 5,
    "g" : 6,
    "h" : 7,
    "K" : 0,
    "Q" : 1,
    "R" : 2,
    "N" : 3,
    "B" : 4,
    "P" : 5
  }
  var board = [
    [["R", "B", 0], ["N", "B", 0], ["B", "B", 0], ["Q", "B", 0], ["K", "B", 0], ["B", "B", 0], ["N", "B", 0], ["R", "B", 0]],
    [["P", "B", 0], ["P", "B", 0], ["P", "B", 0], ["P", "B", 0], ["P", "B", 0], ["P", "B", 0], ["P", "B", 0], ["P", "B", 0]],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    [["P", "W", 0], ["P", "W", 0], ["P", "W", 0], ["P", "W", 0], ["P", "W", 0], ["P", "W", 0], ["P", "W", 0], ["P", "W", 0]],
    [["R", "W", 0], ["N", "W", 0], ["B", "W", 0], ["Q", "W", 0], ["K", "W", 0], ["B", "W", 0], ["N", "W", 0], ["R", "W", 0]],
  ];
  var point = {
    x : -1,
    y : -1
  }
  var whitebArray = [];
  var blackbArray = [];
  var selected = false;
  var nplay = "W";
  function drawTile(x, y, color) {
    context.beginPath();
    context.fillStyle = color;
    context.rect(margin_x+tile_width*x, margin_y+tile_height*y, tile_width, tile_height)
    context.fill();
  }
  function placePart(x, y, r, c) {
    x = chessBoard[x];
    if(c == 5) {
      margin = 12;
    } else {
      margin = 7.5;
    }
    context.drawImage(img, c*60+5*(c+1)-margin, r*60, 60, 60, x*60+margin_x-5, y*60+margin_y-2, 60, 60);
  }
  function drawBoard() {
    for(var i=0; i<board.length; i++) {
      for(var j=0; j<board[i].length; j++) {
        if(board[i][j] != "") {
          board[i][j][1] == "B" ? r = 0 : r = 1;
          placePart(alpha[j], i, r, chessBoard[board[i][j][0]]);
        }
      }
    }
  }
  function fillProbs() {
    if(selected) {
      type = board[sy][sx][0];

      if(type == "P") {
        if(board[sy][sx][1] == "B") {
          if(!board[sy][sx][2] && board[sy+1][sx] == "" && board[sy+2][sx] == "") {
            for(var i=2; i<=3; i++) {
              rx = point.x*60+margin_x;
              ry = point.y*(60*i)+margin_y;
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(rx, ry, tile_width, tile_height);
              context.fill();
            }
          } else if(!board[sy][sx][2] && board[sy+1][sx] == "" && board[sy+2][sx] != "") {
            for(var i=2; i<=2; i++) {
              rx = point.x*60+margin_x;
              ry = point.y*(60*i)+margin_y;
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(rx, ry, tile_width, tile_height);
              context.fill();
            }
          } else if(board[sy][sx][2] && board[sy+1][sx] == "") {
              rx = point.x*60+margin_x;
              ry = (point.y+1)*60+margin_y;
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(rx, ry, tile_width, tile_height);
              context.fill();
          }
          if(sy+1 < 8 && sx+1 < 8) {
            if(board[sy+1][sx+1] != "" && board[sy+1][sx+1][1] != board[sy][sx][1]) {
              rx = (point.x+1)*60+margin_x;
              ry = (point.y+1)*60+margin_y;
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect(rx, ry, tile_width, tile_height);
              context.fill();
            }
          }
          if(sy+1 < 8 && sx-1 >= 0) {
            if(board[sy+1][sx-1] != "" && board[sy+1][sx-1][1] != board[sy][sx][1]) {
              rx = (point.x-1)*60+margin_x;
              ry = (point.y+1)*60+margin_y;
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect(rx, ry, tile_width, tile_height);
              context.fill();
            }
          }
        } else if(board[sy][sx][1] == "W") {
          if(!board[sy][sx][2] && board[sy-1][sx] == "" && board[sy-2][sx] == "") {
            for(var i=2; i<=3; i++) {
              rx = point.x*60+margin_x;
              ry = (point.y-i+1)*60+margin_y;
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(rx, ry, tile_width, tile_height);
              context.fill();
            }
          } else if(!board[sy][sx][2] && board[sy-1][sx] == "" && board[sy-2][sx] != "") {
            for(var i=2; i<=2; i++) {
              rx = point.x*60+margin_x;
              ry = (point.y-1)*60+margin_y;
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(rx, ry, tile_width, tile_height);
              context.fill();
            }
          } else if(board[sy][sx][2] && board[sy-1][sx] == "") {
              rx = point.x*60+margin_x;
              ry = (point.y-1)*60+margin_y;
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(rx, ry, tile_width, tile_height);
              context.fill();
          }
          if(sy-1 >= 0 && sx+1 < 8) {
            if(board[sy-1][sx+1] != "" && board[sy-1][sx+1][1] != board[sy][sx][1]) {
              rx = (point.x+1)*60+margin_x;
              ry = (point.y-1)*60+margin_y;
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect(rx, ry, tile_width, tile_height);
              context.fill();
            }
          }
          if(sy-1 >= 0 && sx-1 >= 0) {
            if(board[sy-1][sx-1] != "" && board[sy-1][sx-1][1] != board[sy][sx][1]) {
              rx = (point.x-1)*60+margin_x;
              ry = (point.y-1)*60+margin_y;
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect(rx, ry, tile_width, tile_height);
              context.fill();
            }
          }
        }
      } else if(type == "N") {
          ax = (point.x-1)*60+margin_x;
          ay = (point.y+2)*60+margin_y;
          bx = (point.x-2)*60+margin_x;
          by = (point.y+1)*60+margin_y;
          cx = (point.x+1)*60+margin_x;
          cy = (point.y+2)*60+margin_y;
          dx = (point.x+2)*60+margin_x;
          dy = (point.y+1)*60+margin_y;
          ex = (point.x+2)*60+margin_x;
          ey = (point.y-1)*60+margin_y;
          fx = (point.x+1)*60+margin_x;
          fy = (point.y-2)*60+margin_y;
          gx = (point.x-1)*60+margin_x;
          gy = (point.y-2)*60+margin_y;
          hx = (point.x-2)*60+margin_x;
          hy = (point.y-1)*60+margin_y;
          if(sy+2 < 8 && sy+2 > -1 && sx-1 > -1 && sx-1 < 8) {
            if(board[sy+2][sx-1] == "") {
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(ax, ay, tile_width, tile_height);
              context.fill();
            } else if(board[sy+2][sx-1][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect(ax, ay, tile_width, tile_height);
              context.fill();
            }
          }
          if(sy+1 < 8 && sy+1 > -1 && sx-2 > -1 && sx-2 < 8) {
            if(board[sy+1][sx-2] == "") {
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(bx, by, tile_width, tile_height);
              context.fill();
            } else if(board[sy+1][sx-2][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect(bx, by, tile_width, tile_height);
              context.fill();
            }
          }
          if(sy+2 < 8 && sy+2 > -1 && sx+1 > -1 && sx+1 < 8) {
            if(board[sy+2][sx+1] == "") {
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(cx, cy, tile_width, tile_height);
              context.fill();
            } else if(board[sy+2][sx+1][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect(cx, cy, tile_width, tile_height);
              context.fill();
            }
          }
          if(sy+1 < 8 && sy+1 > -1 && sx+2 > -1 && sx+2 < 8) {
            if(board[sy+1][sx+2] == "") {
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(dx, dy, tile_width, tile_height);
              context.fill();
            } else if(board[sy+1][sx+2][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect(dx, dy, tile_width, tile_height);
              context.fill();
            }
          }
          if(sy-1 < 8 && sy-1 > -1 && sx+2 > -1 && sx+2 < 8) {
            if(board[sy-1][sx+2] == "") {
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(ex, ey, tile_width, tile_height);
              context.fill();
            } else if(board[sy-1][sx+1][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect(ex, ey, tile_width, tile_height);
              context.fill();
            }
          }
          if(sy-2 < 8 && sy-2 > -1 && sx+1 > -1 && sx+1 < 8) {
            if(board[sy-2][sx+1] == "") {
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(fx, fy, tile_width, tile_height);
              context.fill();
            } else if(board[sy-2][sx+1][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect(fx, fy, tile_width, tile_height);
              context.fill();
            }
          }
          if(sy-2 < 8 && sy-2 > -1 && sx-1 > -1 && sx-1 < 8) {
            if(board[sy-2][sx-1] == "") {
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(gx, gy, tile_width, tile_height);
              context.fill();
            } else if(board[sy-2][sx-1][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect(gx, gy, tile_width, tile_height);
              context.fill();
            }
          }
          if(sy-1 < 8 && sy-1 > -1 && sx-2 > -1 && sx-2 < 8) {
            if(board[sy-1][sx-2] == "") {
              context.beginPath();
              context.fillStyle = "rgba(46, 204, 113,0.9)";
              context.rect(hx, hy, tile_width, tile_height);
              context.fill();
            } else if(board[sy-1][sx-2][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect(hx, hy, tile_width, tile_height);
              context.fill();
            }
          }
      } else if(type == "B") {
        bishopArray = [];
        ax = (point.x-1)*60+margin_x;
        ay = (point.y+2)*60+margin_y;
        j = point.x-1;
        for(var i=point.y+1; i<8; i++) {
          if(j >= 0 && board[i][j] == "") {
            bishopArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j--;
          } else {
            if(j >= 0) {
              if(board[i][j][1] != board[point.y][point.x][1]) {
                context.beginPath();
                context.fillStyle = "rgba(231, 76, 60,0.9)";
                context.rect((j)*60+margin_x, (i)*60+margin_y, tile_width, tile_height);
                context.fill();
              }
            }
            break;
          }
        }
        j = point.x+1;
        for(var i=point.y+1; i<8; i++) {
          if(j < 8 && board[i][j] == "") {
            bishopArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j++;
          } else {
            if(j < 8) {
              if(board[i][j][1] != board[point.y][point.x][1]) {
                context.beginPath();
                context.fillStyle = "rgba(231, 76, 60,0.9)";
                context.rect((j)*60+margin_x, (i)*60+margin_y, tile_width, tile_height);
                context.fill();
              }
            }
            break;
          }
        }
        j = point.x+1;
        for(var i=point.y-1; i>=0; i--) {
          if(j < 8 && board[i][j] == "") {
            bishopArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j++;
          } else {
            if(j < 8) {
              if(board[i][j][1] != board[point.y][point.x][1]) {
                context.beginPath();
                context.fillStyle = "rgba(231, 76, 60,0.9)";
                context.rect((j)*60+margin_x, (i)*60+margin_y, tile_width, tile_height);
                context.fill();
              }
            }
            break;
          }
        }
        j = point.x-1;
        for(var i=point.y-1; i>=0; i--) {
          if(j >= 0 && board[i][j] == "") {
            bishopArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j--;
          } else {
            if(j >= 0) {
              if(board[i][j][1] != board[point.y][point.x][1]) {
                context.beginPath();
                context.fillStyle = "rgba(231, 76, 60,0.9)";
                context.rect((j)*60+margin_x, (i)*60+margin_y, tile_width, tile_height);
                context.fill();
              }
            }
            break;
          }
        }
        for(var i=0; i<bishopArray.length; i++) {
          context.beginPath();
          context.fillStyle = "rgba(46, 204, 113,0.9)";
          context.rect(bishopArray[i].x, bishopArray[i].y, tile_width, tile_height);
          context.fill();
        }
      } else if(type == "R") {
        rookArray = [];
        for(var i=point.x+1; i<8; i++) {
          if(board[point.y][i] =="") {
            rookArray.push({
              x : (i)*60+margin_x,
              y : (point.y)*60+margin_y
            })
          } else {
            if(board[point.y][i][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect((i)*60+margin_x, (point.y)*60+margin_y, tile_width, tile_height);
              context.fill();
            }
            break;
          }
        }
        for(var i=point.x-1; i>=0; i--) {
          if(board[point.y][i] =="") {
            rookArray.push({
              x : (i)*60+margin_x,
              y : (point.y)*60+margin_y
            })
          } else {
            if(board[point.y][i][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect((i)*60+margin_x, (point.y)*60+margin_y, tile_width, tile_height);
              context.fill();
            }
            break;
          }
        }
        for(var i=point.y+1; i<8; i++) {
          if(board[i][point.x] =="") {
            rookArray.push({
              x : (point.x)*60+margin_x,
              y : (i)*60+margin_y
            })
          } else {
            if(board[i][point.x][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect((point.x)*60+margin_x, (i)*60+margin_y, tile_width, tile_height);
              context.fill();
            }
            break;
          }
        }
        for(var i=point.y-1; i>= 0; i--) {
          if(board[i][point.x] =="") {
            rookArray.push({
              x : (point.x)*60+margin_x,
              y : (i)*60+margin_y
            })
          } else {
            if(board[i][point.x][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect((point.x)*60+margin_x, (i)*60+margin_y, tile_width, tile_height);
              context.fill();
            }
            break;
          }
        }
        for(var i=0; i<rookArray.length; i++) {
          context.beginPath();
          context.fillStyle = "rgba(46, 204, 113,0.9)";
          context.rect(rookArray[i].x, rookArray[i].y, tile_width, tile_height);
          context.fill();
        }
      } else if(type == "Q") {
        queenArray = [];
        ax = (point.x-1)*60+margin_x;
        ay = (point.y+2)*60+margin_y;
        j = point.x-1;
        for(var i=point.y+1; i<8; i++) {
          if(j >= 0 && board[i][j] == "") {
            queenArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j--;
          } else {
            if(j >= 0) {
              if(board[i][j][1] != board[point.y][point.x][1]) {
                context.beginPath();
                context.fillStyle = "rgba(231, 76, 60,0.9)";
                context.rect((j)*60+margin_x, (i)*60+margin_y, tile_width, tile_height);
                context.fill();
              }
            }
            break;
          }
        }
        j = point.x+1;
        for(var i=point.y+1; i<8; i++) {
          if(j < 8 && board[i][j] == "") {
            queenArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j++;
          } else {
            if(j < 8) {
              if(board[i][j][1] != board[point.y][point.x][1]) {
                context.beginPath();
                context.fillStyle = "rgba(231, 76, 60,0.9)";
                context.rect((j)*60+margin_x, (i)*60+margin_y, tile_width, tile_height);
                context.fill();
              }
            }
            break;
          }
        }
        j = point.x+1;
        for(var i=point.y-1; i>=0; i--) {
          if(j < 8 && board[i][j] == "") {
            queenArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j++;
          } else {
            if(j < 8) {
              if(board[i][j][1] != board[point.y][point.x][1]) {
                context.beginPath();
                context.fillStyle = "rgba(231, 76, 60,0.9)";
                context.rect((j)*60+margin_x, (i)*60+margin_y, tile_width, tile_height);
                context.fill();
              }
            }
            break;
          }
        }
        j = point.x-1;
        for(var i=point.y-1; i>=0; i--) {
          if(j >= 0 && board[i][j] == "") {
            queenArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j--;
          } else {
            if(j >= 0) {
              if(board[i][j][1] != board[point.y][point.x][1]) {
                context.beginPath();
                context.fillStyle = "rgba(231, 76, 60,0.9)";
                context.rect((j)*60+margin_x, (i)*60+margin_y, tile_width, tile_height);
                context.fill();
              }
            }
            break;
          }
        }
        for(var i=point.x+1; i<8; i++) {
          if(board[point.y][i] =="") {
            queenArray.push({
              x : (i)*60+margin_x,
              y : (point.y)*60+margin_y
            })
          } else {
            if(board[point.y][i][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect((i)*60+margin_x, (point.y)*60+margin_y, tile_width, tile_height);
              context.fill();
            }
            break;
          }
        }
        for(var i=point.x-1; i>=0; i--) {
          if(board[point.y][i] =="") {
            queenArray.push({
              x : (i)*60+margin_x,
              y : (point.y)*60+margin_y
            })
          } else {
            if(board[point.y][i][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect((i)*60+margin_x, (point.y)*60+margin_y, tile_width, tile_height);
              context.fill();
            }
            break;
          }
        }
        for(var i=point.y+1; i<8; i++) {
          if(board[i][point.x] =="") {
            queenArray.push({
              x : (point.x)*60+margin_x,
              y : (i)*60+margin_y
            })
          } else {
            if(board[i][point.x][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect((point.x)*60+margin_x, (i)*60+margin_y, tile_width, tile_height);
              context.fill();
            }
            break;
          }
        }
        for(var i=point.y-1; i>= 0; i--) {
          if(board[i][point.x] =="") {
            queenArray.push({
              x : (point.x)*60+margin_x,
              y : (i)*60+margin_y
            })
          } else {
            if(board[i][point.x][1] != board[point.y][point.x][1]) {
              context.beginPath();
              context.fillStyle = "rgba(231, 76, 60,0.9)";
              context.rect((point.x)*60+margin_x, (i)*60+margin_y, tile_width, tile_height);
              context.fill();
            }
            break;
          }
        }
        for(var i=0; i<queenArray.length; i++) {
          context.beginPath();
          context.fillStyle = "rgba(46, 204, 113,0.9)";
          context.rect(queenArray[i].x, queenArray[i].y, tile_width, tile_height);
          context.fill();
        }
      } else if(type == "K") {
        kingArray = [];
        if(point.x+1 < 8 && board[point.y][point.x+1] == "" && !pinned(point.x+1, point.y, -1, 0)) {
          kingArray.push({x : (point.x+1)*60+margin_x, y : (point.y)*60+margin_y});
        }
        if(point.x-1 >= 0 && board[point.y][point.x-1] == "" && !pinned(point.x-1, point.y, 1, 0)) {
          kingArray.push({x : (point.x-1)*60+margin_x, y : (point.y)*60+margin_y});
        }
        if(point.y+1 < 8) {
          if(board[point.y+1][point.x] == "" && !pinned(point.x, point.y+1, 0, -1)) {
              kingArray.push({x : (point.x)*60+margin_x, y : (point.y+1)*60+margin_y});
          }
          if(point.x+1 < 8 && board[point.y+1][point.x+1] == "" && !pinned(point.x+1, point.y+1, -1, -1)) {
            kingArray.push({x : (point.x+1)*60+margin_x, y : (point.y+1)*60+margin_y});
          }
          if(point.x-1 >= 0 && board[point.y+1][point.x-1] == "" && !pinned(point.x-1, point.y+1, 1, -1)) {
            kingArray.push({x : (point.x-1)*60+margin_x, y : (point.y+1)*60+margin_y});
          }
        }
        if(point.y-1 >= 0) {
          if(board[point.y-1][point.x] == "" && !pinned(point.x, point.y-1, 0, 1)) {
            kingArray.push({x : (point.x)*60+margin_x, y : (point.y-1)*60+margin_y});
          }
          if(point.x+1 < 8 && board[point.y-1][point.x+1] == "" && !pinned(point.x+1, point.y-1, -1, 1)) {
            kingArray.push({x : (point.x+1)*60+margin_x, y : (point.y-1)*60+margin_y});
          }
          if(point.x-1 >= 0 && board[point.y-1][point.x-1] == "" && !pinned(point.x-1, point.y-1, 1, 1)) {
            kingArray.push({x : (point.x-1)*60+margin_x, y : (point.y-1)*60+margin_y});
          }
        }
        for(var i=0; i<kingArray.length; i++) {
          context.beginPath();
          context.fillStyle = "rgba(46, 204, 113,0.9)";
          context.rect(kingArray[i].x, kingArray[i].y, tile_width, tile_height);
          context.fill();
        }
      }
    }
  }
  function loadSprite(sprite_sheet) {
    try {
      img = new Image();
      img.src = sprite_sheet;
      img.onload = function() {
        render();
      }
    } catch(e) {
      console.log(e);
    }
  }
  function move(sx, sy, dx, dy) {
    if(sx != -1 && sy != -1 && dx != -1 && dy != -1) {
      type = board[sy][sx][0];

      if(type == "P") {
        if(board[sy][sx][1] == "B") {
          if(!board[sy][sx][2] && board[sy+1][sx] == "" && board[sy+2][sx] == "") {
            if(dx == sx && dy > sy && dy < sy+3) {
              board[sy][sx] = "";
              board[dy][dx] = ["P", "B", 1];
            }
          } else if(!board[sy][sx][2] && board[sy+1][sx] == "" && board[sy+2][sx] != "") {
            if(dx == sx && dy > sy && dy < sy+2) {
              board[sy][sx] = "";
              board[dy][dx] = ["P", "B", 1];
            }
          } else if(board[sy][sx][2] && board[sy+1][sx] == "") {
            if(dx == sx && dy > sy && dy < sy+2) {
              board[sy][sx] = "";
              board[dy][dx] = ["P", "B", 1];
            }
          }
        } else if(board[sy][sx][1] == "W") {
          if(!board[sy][sx][2] && board[sy-1][sx] == "" && board[sy-2][sx] == "") {
            if(dx == sx && dy < sy && dy > sy-3) {
              board[sy][sx] = "";
              board[dy][dx] = ["P", "W", 1];
            }
          } else if(!board[sy][sx][2] && board[sy-1][sx] == "" && board[sy-2][sx] != "") {
            if(dx == sx && dy < sy && dy > sy-2) {
              board[sy][sx] = "";
              board[dy][dx] = ["P", "W", 1];
            }
          } else if(board[sy][sx][2] && board[sy-1][sx] == "") {
            if(dx == sx && dy < sy && dy > sy-2) {
              board[sy][sx] = "";
              board[dy][dx] = ["P", "W", 1];
            }
          }
        }
        if(dy == 7 || dy == 0) {
          board[dy][dx] = ["Q", board[sy][sx][1], 0];
        }
      } else if(type == "N") {
        if((dx == sx-1 && dy == sy+2) || (dx == sx-2 && dy == sy+1) || (dx == sx+1 && dy == sy+2) || (dx == sx+2 && dy == sy+1) || (dx == sx+2 && dy == sy-1) || (dx == sx+1 || dy == sy-2) || (dx == sx-1 && dy == sy-2) || (dx == sx-2 && dy == sy-1)) {
          board[dy][dx] = ["N", board[sy][sx][1], 0];
          board[sy][sx] = "";
        }
      } else if(type == "B") {
        bishopArray = [];
        ax = (point.x-1)*60+margin_x;
        ay = (point.y+2)*60+margin_y;
        j = point.x-1;
        for(var i=point.y+1; i<8; i++) {
          if(j >= 0 && board[i][j] == "") {
            bishopArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j--;
          } else {
            break;
          }
        }
        j = point.x+1;
        for(var i=point.y+1; i<8; i++) {
          if(j < 8 && board[i][j] == "") {
            bishopArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j++;
          } else {
            break;
          }
        }
        j = point.x+1;
        for(var i=point.y-1; i>=0; i--) {
          if(j < 8 && board[i][j] == "") {
            bishopArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j++;
          } else {
            break;
          }
        }
        j = point.x-1;
        for(var i=point.y-1; i>=0; i--) {
          if(j >= 0 && board[i][j] == "") {
            bishopArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j--;
          } else {
            break;
          }
        }
        for(var i=0; i<bishopArray.length; i++) {
          gx = Math.floor((bishopArray[i].x+5-margin_x)/60);
          gy = Math.floor((bishopArray[i].y+2-margin_y)/60);
          if(gy == dy && gx == dx) {
            board[dy][dx] = ["B", board[sy][sx][1], 0];
            board[sy][sx] = "";
          }
        }
      } else if(type == "R") {
        rookArray = [];
        for(var i=point.x+1; i<8; i++) {
          if(board[point.y][i] =="") {
            rookArray.push({
              x : (i)*60+margin_x,
              y : (point.y)*60+margin_y
            })
          } else {
            break;
          }
        }
        for(var i=point.x-1; i>=0; i--) {
          if(board[point.y][i] =="") {
            rookArray.push({
              x : (i)*60+margin_x,
              y : (point.y)*60+margin_y
            })
          } else {
            break;
          }
        }
        for(var i=point.y+1; i<8; i++) {
          if(board[i][point.x] =="") {
            rookArray.push({
              x : (point.x)*60+margin_x,
              y : (i)*60+margin_y
            })
          } else {
            break;
          }
        }
        for(var i=point.y-1; i>= 0; i--) {
          if(board[i][point.x] =="") {
            rookArray.push({
              x : (point.x)*60+margin_x,
              y : (i)*60+margin_y
            })
          } else {
            break;
          }
        }
        for(var i=0; i<rookArray.length; i++) {
          gx = Math.floor((rookArray[i].x+5-margin_x)/60);
          gy = Math.floor((rookArray[i].y+2-margin_y)/60);
          if(gy == dy && gx == dx) {
            board[dy][dx] = ["R", board[sy][sx][1], 0];
            board[sy][sx] = "";
          }
        }
      } else if(type == "Q") {
        queenArray = [];
        ax = (point.x-1)*60+margin_x;
        ay = (point.y+2)*60+margin_y;
        j = point.x-1;
        for(var i=point.y+1; i<8; i++) {
          if(j >= 0 && board[i][j] == "") {
            queenArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j--;
          } else {
            break;
          }
        }
        j = point.x+1;
        for(var i=point.y+1; i<8; i++) {
          if(j < 8 && board[i][j] == "") {
            queenArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j++;
          } else {
            break;
          }
        }
        j = point.x+1;
        for(var i=point.y-1; i>=0; i--) {
          if(j < 8 && board[i][j] == "") {
            queenArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j++;
          } else {
            break;
          }
        }
        j = point.x-1;
        for(var i=point.y-1; i>=0; i--) {
          if(j >= 0 && board[i][j] == "") {
            queenArray.push({
              x : (j)*60+margin_x,
              y : (i)*60+margin_y
            });
            j--;
          } else {
            break;
          }
        }
        for(var i=point.x+1; i<8; i++) {
          if(board[point.y][i] =="") {
            queenArray.push({
              x : (i)*60+margin_x,
              y : (point.y)*60+margin_y
            })
          } else {
            break;
          }
        }
        for(var i=point.x-1; i>=0; i--) {
          if(board[point.y][i] =="") {
            queenArray.push({
              x : (i)*60+margin_x,
              y : (point.y)*60+margin_y
            })
          } else {
            break;
          }
        }
        for(var i=point.y+1; i<8; i++) {
          if(board[i][point.x] =="") {
            queenArray.push({
              x : (point.x)*60+margin_x,
              y : (i)*60+margin_y
            })
          } else {
            break;
          }
        }
        for(var i=point.y-1; i>= 0; i--) {
          if(board[i][point.x] =="") {
            queenArray.push({
              x : (point.x)*60+margin_x,
              y : (i)*60+margin_y
            })
          } else {
            break;
          }
        }
        for(var i=0; i<queenArray.length; i++) {
          gx = Math.floor((queenArray[i].x+5-margin_x)/60);
          gy = Math.floor((queenArray[i].y+2-margin_y)/60);
          if(gy == dy && gx == dx) {
            board[dy][dx] = ["Q", board[sy][sx][1], 0];
            board[sy][sx] = "";
          }
        }
      } else if(type == "K") {
        kingArray = [];
        if(point.x+1 < 8 && board[point.y][point.x+1] == "" && !pinned(point.x+1, point.y, -1, 0)) {
          kingArray.push({x : (point.x+1)*60+margin_x, y : (point.y)*60+margin_y});
        }
        if(point.x-1 >= 0 && board[point.y][point.x-1] == "" && !pinned(point.x-1, point.y, 1, 0)) {
          kingArray.push({x : (point.x-1)*60+margin_x, y : (point.y)*60+margin_y});
        }
        if(point.y+1 < 8) {
          if(board[point.y+1][point.x] == "" && !pinned(point.x, point.y+1, 0, -1)) {
              kingArray.push({x : (point.x)*60+margin_x, y : (point.y+1)*60+margin_y});
          }
          if(point.x+1 < 8 && board[point.y+1][point.x+1] == "" && !pinned(point.x+1, point.y+1, -1, -1)) {
            kingArray.push({x : (point.x+1)*60+margin_x, y : (point.y+1)*60+margin_y});
          }
          if(point.x-1 >= 0 && board[point.y+1][point.x-1] == "" && !pinned(point.x-1, point.y+1, 1, -1)) {
            kingArray.push({x : (point.x-1)*60+margin_x, y : (point.y+1)*60+margin_y});
          }
        }
        if(point.y-1 >= 0) {
          if(board[point.y-1][point.x] == "" && !pinned(point.x, point.y-1, 0, 1)) {
            kingArray.push({x : (point.x)*60+margin_x, y : (point.y-1)*60+margin_y});
          }
          if(point.x+1 < 8 && board[point.y-1][point.x+1] == "" && !pinned(point.x+1, point.y-1, -1, 1)) {
            kingArray.push({x : (point.x+1)*60+margin_x, y : (point.y-1)*60+margin_y});
          }
          if(point.x-1 >= 0 && board[point.y-1][point.x-1] == "" && !pinned(point.x-1, point.y-1, 1, 1)) {
            kingArray.push({x : (point.x-1)*60+margin_x, y : (point.y-1)*60+margin_y});
          }
        }
        for(var i=0; i<kingArray.length; i++) {
          gx = Math.floor((kingArray[i].x+5-margin_x)/60);
          gy = Math.floor((kingArray[i].y+2-margin_y)/60);
          if(gy == dy && gx == dx) {
            board[dy][dx] = ["K", board[sy][sx][1], 0];
            board[sy][sx] = "";
          }
        }
      }
    }
  }
  function check_king() {
      var king_pos = {};
      for(var i=0; i<board.length; i++) {
        for(var j=0; j<board[i].length; j++) {
          if(board[i][j][0] == "K" && board[i][j][1] == nplay) {
            king_pos.x = j;
            king_pos.y = i;
          }
        }
      }
      var j=king_pos.x-1;
      for(var i=king_pos.y+1; i<8; i++) {
        if(j >= 0) {
          if((board[i][j][0] == "B" && board[i][j][1] != nplay) || (board[i][j][0] == "Q" && board[i][j][1] != nplay)) {
            return true;
            break;
          }
          j--;
        } else {
          break;
        }
      }
      j = king_pos.x+1;
      for(var i=king_pos.y+1; i<8; i++) {
        if(j < 8) {
          if((board[i][j][0] == "B" && board[i][j][1] != nplay) || (board[i][j][0] == "Q" && board[i][j][1] != nplay)) {
            return true;
            break;
          }
          j++;
        } else {
          break;
        }
      }
      j = king_pos.x+1;
      for(var i=king_pos.y-1; i>=0; i--) {
        if(j < 8) {
          if((board[i][j][0] == "B" && board[i][j][1] != nplay) || (board[i][j][0] == "Q" && board[i][j][1] != nplay)) {
            return true;
            break;
          }
          j++;
        } else {
          break;
        }
      }
      j = king_pos.x-1;
      for(var i=king_pos.x-1; i>=0; i--) {
        if(j >= 0) {
          if((board[i][j][0] == "B" && board[i][j][1] != nplay) || (board[i][j][0] == "Q" && board[i][j][1] != nplay)) {
            return true;
            break;
          }
          j--;
        } else {
          break;
        }
      }
      for(var i=king_pos.x+1; i<8; i++) {
        if((board[king_pos.y][i][0] == "R" && board[king_pos.y][i][1] != nplay) || (board[king_pos.y][i][0] == "Q" && board[king_pos.y][i][1] != nplay)) {
          return true;
          break;
        } else if(board[king_pos.y][i] != "") {
          break;
        }
      }
      for(var i=king_pos.x-1; i>=0; i--) {
        if((board[king_pos.y][i][0] == "R" && board[king_pos.y][i][1] != nplay) || (board[king_pos.y][i][0] == "Q" && board[king_pos.y][i][1] != nplay)) {
          return true;
          break;
        } else if(board[king_pos.y][i] != "") {
          break;
        }
      }
      for(var i=king_pos.y+1; i<8; i++) {
        if((board[i][king_pos.x][0] == "R" && board[i][king_pos.x][1] != nplay) || (board[i][king_pos.x][0] == "Q" && board[i][king_pos.x][1] != nplay)) {
          return true;
          break;
        } else if(board[i][king_pos.x] != "") {
          break;
        }
      }
      for(var i=king_pos.y-1; i>= 0; i--) {
        if((board[i][king_pos.x][0] == "R" && board[i][king_pos.x][1] != nplay) || (board[i][king_pos.x][0] == "Q" && board[i][king_pos.x][1] != nplay)) {
          return true;
          break;
        } else if(board[i][king_pos.x] != "") {
          break;
        }
      }
      if(king_pos.y+1 < 8 && king_pos.x+1 < 8) {
        if(board[king_pos.y+1][king_pos.x+1][0] == "P" && board[king_pos.y+1][king_pos.x+1][1] != nplay) {
          return true;
        }
      }
      if(king_pos.y+1 < 8 && king_pos.x-1 >= 0) {
        if(board[king_pos.y+1][king_pos.x-1][0] == "P" && board[king_pos.y+1][king_pos.x-1][1] != nplay) {
          return true;
        }
      }
      if(king_pos.y-1 >= 0 && king_pos.x+1 < 8) {
        if(board[king_pos.y-1][king_pos.x+1][0] == "P" && board[king_pos.y-1][king_pos.x+1][1] != nplay) {
          return true;
        }
      }
      if(king_pos.y-1 >= 0 && king_pos.x-1 >= 0) {
        if(board[king_pos.y-1][king_pos.x-1][0] == "P" && board[king_pos.y-1][king_pos.x-1][1] != nplay) {
          return true;
        }
      }
      if(king_pos.x+1 < 8 && king_pos.y+2 < 8) {
        if(board[king_pos.y+2][king_pos.x+1][0] == "N" && board[king_pos.y+2][king_pos.x+1][1] != nplay) {
          return true;
        }
      }
      if(king_pos.x+2 < 8 && king_pos.y+1 < 8) {
        if(board[king_pos.y+1][king_pos.x+2][0] == "N" && board[king_pos.y+1][king_pos.x+2][1] != nplay) {
          return true;
        }
      }
      if(king_pos.x-1 >= 0 && king_pos.y+2 < 8) {
        if(board[king_pos.y+2][king_pos.x-1][0] == "N" && board[king_pos.y+2][king_pos.x-1][1] != nplay) {
          return true;
        }
      }
      if(king_pos.x-2 >= 0 && king_pos.y+1 < 8) {
        if(board[king_pos.y+1][king_pos.x-2][0] == "N" && board[king_pos.y+1][king_pos.x-2][1] != nplay) {
          return true;
        }
      }
      if(king_pos.x+1 < 8 && king_pos.y-2 >= 0) {
        if(board[king_pos.y-2][king_pos.x+1][0] == "N" && board[king_pos.y-2][king_pos.x+1][1] != nplay) {
          return true;
        }
      }
      if(king_pos.x+2 < 8 && king_pos.y-1 >= 0) {
        if(board[king_pos.y-1][king_pos.x+2][0] == "N" && board[king_pos.y-1][king_pos.x+2][1] != nplay) {
          return true;
        }
      }
      if(king_pos.x-1 >= 0 && king_pos.y-2 >= 0) {
        if(board[king_pos.y-2][king_pos.x-1][0] == "N" && board[king_pos.y-2][king_pos.x-1][1] != nplay) {
          return true;
        }
      }
      if(king_pos.x-2 >= 0 && king_pos.y-1 >= 0) {
        if(board[king_pos.y-1][king_pos.x-2][0] == "N" && board[king_pos.y-1][king_pos.x-2][1] != nplay) {
          return true;
        }
      }
      return false;
  }
  function pinned(x, y, ox, oy) {
    var j=x-1;
    for(var i=y+1; i<8; i++) {
      if(j >= 0) {
        if((board[i][j][0] == "B" && board[i][j][1] != board[y+oy][x+ox][1]) || (board[i][j][0] == "Q" && board[i][j][1] != board[y+oy][x+ox][1])) {
          return true;
          break;
        }
        j--;
      } else {
        break;
      }
    }
    j = x+1;
    for(var i=y+1; i<8; i++) {
      if(j < 8) {
        if((board[i][j][0] == "B" && board[i][j][1] != board[y+oy][x+ox][1]) || (board[i][j][0] == "Q" && board[i][j][1] != board[y+oy][x+ox][1])) {
          return true;
          break;
        }
        j++;
      } else {
        break;
      }
    }
    j = x+1;
    for(var i=y-1; i>=0; i--) {
      if(j < 8) {
        if((board[i][j][0] == "B" && board[i][j][1] != board[y+oy][x+ox][1]) || (board[i][j][0] == "Q" && board[i][j][1] != board[y+oy][x+ox][1])) {
          return true;
          break;
        }
        j++;
      } else {
        break;
      }
    }
    j = x-1;
    for(var i=y-1; i>=0; i--) {
      if(j >= 0) {
        if((board[i][j][0] == "B" && board[i][j][1] != board[y+oy][x+ox][1]) || (board[i][j][0] == "Q" && board[i][j][1] != board[y+oy][x+ox][1])) {
          return true;
          break;
        }
        j--;
      } else {
        break;
      }
    }
    for(var i=x+1; i<8; i++) {
      if((board[y][i][0] == "R" && board[y][i][1] != board[y+oy][x+ox][1]) || (board[y][i][0] == "Q" && board[y][i][1] != board[y+oy][x+ox][1])) {
        return true;
        break;
      } else if(board[y][i] != "") {
        break;
      }
    }
    for(var i=x-1; i>=0; i--) {
      if((board[y][i][0] == "R" && board[y][i][1] != board[y+oy][x+ox][1]) || (board[y][i][0] == "Q" && board[y][i][1] != board[y+oy][x+ox][1])) {
        return true;
        break;
      } else if(board[y][i] != "") {
        break;
      }
    }
    for(var i=y+1; i<8; i++) {
      if((board[i][x][0] == "R" && board[i][x][1] != board[y+oy][x+ox][1]) || (board[i][x][0] == "Q" && board[i][x][1] != board[y+oy][x+ox][1])) {
        return true;
        break;
      } else if(board[i][x] != "") {
        break;
      }
    }
    for(var i=point.y-1; i>= 0; i--) {
      if((board[i][x][0] == "R" && board[i][x][1] != board[y+oy][x+ox][1]) || (board[i][x][0] == "Q" && board[i][x][1] != board[y+oy][x+ox][1])) {
        return true;
        break;
      } else if(board[i][x] != "") {
        break;
      }
    }
    if(y+1 < 8 && x+1 < 8) {
      if(board[y+1][x+1][0] == "P" && board[y+1][x+1][1] != board[y+oy][x+ox][1]) {
        return true;
      }
    }
    if(y+1 < 8 && x-1 >= 0) {
      if(board[y+1][x-1][0] == "P" && board[y+1][x-1][1] != board[y+oy][x+ox][1]) {
        return true;
      }
    }
    if(y-1 >= 0 && x+1 < 8) {
      if(board[y-1][x+1][0] == "P" && board[y-1][x+1][1] != board[y+oy][x+ox][1]) {
        return true;
      }
    }
    if(y-1 >= 0 && x-1 >= 0) {
      if(board[y-1][x-1][0] == "P" && board[y-1][x-1][1] != board[y+oy][x+ox][1]) {
        return true;
      }
    }
    if(x+1 < 8 && y+2 < 8) {
      if(board[y+2][x+1][0] == "N" && board[y+2][x+1][1] != board[y+oy][x+ox][1]) {
        return true;
      }
    }
    if(x+2 < 8 && y+1 < 8) {
      if(board[y+1][x+2][0] == "N" && board[y+1][x+2][1] != board[y+oy][x+ox][1]) {
        return true;
      }
    }
    if(x-1 >= 0 && y+2 < 8) {
      if(board[y+2][x-1][0] == "N" && board[y+2][x-1][1] != board[y+oy][x+ox][1]) {
        return true;
      }
    }
    if(x-2 >= 0 && y+1 < 8) {
      if(board[y+1][x-2][0] == "N" && board[y+1][x-2][1] != board[y+oy][x+ox][1]) {
        return true;
      }
    }
    if(x+1 < 8 && y-2 >= 0) {
      if(board[y-2][x+1][0] == "N" && board[y-2][x+1][1] != board[y+oy][x+ox][1]) {
        return true;
      }
    }
    if(x+2 < 8 && y-1 >= 0) {
      if(board[y-1][x+2][0] == "N" && board[y-1][x+2][1] != board[y+oy][x+ox][1]) {
        return true;
      }
    }
    if(x-1 >= 0 && y-2 >= 0) {
      if(board[y-2][x-1][0] == "N" && board[y-2][x-1][1] != board[y+oy][x+ox][1]) {
        return true;
      }
    }
    if(x-2 >= 0 && y-1 >= 0) {
      if(board[y-1][x-2][0] == "N" && board[y-1][x-2][1] != board[y+oy][x+ox][1]) {
        return true;
      }
    }
    return false;
  }
  function attack(x, y) {
    if(board[point.y][point.x][0] == "P") {
      if(board[point.y][point.x][1] == "B") {
        if(sy+1 < 8 && sx+1 < 8) {
          if(board[sy+1][sx+1] != "" && board[sy+1][sx+1][1] != board[sy][sx][1]) {
            if(x == sx+1 && y == sy+1) {
              if(y == 7 || y == 0) {
                board[sy+1][sx+1] = ["Q", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              } else {
                board[sy+1][sx+1] = ["P", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              }
            }
          }
        }
        if(sy+1 < 8 && sx-1 >= 0) {
          if(board[sy+1][sx-1] != "" && board[sy+1][sx-1][1] != board[sy][sx][1]) {
            if(x == sx-1 && y == sy+1) {
              if(y == 7 || y == 0) {
                board[sy+1][sx-1] = ["Q", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              } else {
                board[sy+1][sx-1] = ["P", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              }
            }
          }
        }
      } else {
        if(sy-1 >= 0 && sx+1 < 8) {
          if(board[sy-1][sx+1] != "" && board[sy-1][sx+1][1] != board[sy][sx][1]) {
            if(x == sx+1 && y == sy-1) {
              if(y == 7 || y == 0) {
                board[sy-1][sx+1] = ["Q", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              } else {
                board[sy-1][sx+1] = ["P", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              }
            }
          }
        }
        if(sy-1 >= 0 && sx-1 >= 0) {
          if(board[sy-1][sx-1] != "" && board[sy-1][sx-1][1] != board[sy][sx][1]) {
            if(x == sx-1 && y == sy-1) {
              if(y == 7 || y == 0) {
                board[sy-1][sx-1] = ["Q", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              } else {
                board[sy-1][sx-1] = ["P", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              }
            }
          }
        }
      }
    } else if(board[point.y][point.x][0] == "N") {
      if((x == point.x-1 && y == point.y+2) || (x == point.x-2 && y == point.y+1) || (x == point.x+1 && y == point.y+2) || (x == point.x+2 && y == point.y+1) || (x == point.x+2 && y == point.y-1) || (x == point.x+1 || y == point.y-2) || (x == point.x-1 && y == point.y-2) || (x == point.x-2 && y == point.y-1)) {
        board[y][x] = ["N", board[point.y][point.x][1], 1];
        board[point.y][point.x] = "";
      }
    } else if(board[point.y][point.x][0] == "B") {
      j = point.x-1;
      for(var i=point.y+1; i<8; i++) {
        if(j >= 0 && board[i][j] == "") {
          j--;
        } else {
          if(j >= 0) {
            if(board[i][j][1] != board[point.y][point.x][1]) {
              if(x == j && y == i) {
                board[i][j] = ["B", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              }
            }
          }
          break;
        }
      }
      j = point.x+1;
      for(var i=point.y+1; i<8; i++) {
        if(j < 8 && board[i][j] == "") {
          j++;
        } else {
          if(j < 8) {
            if(board[i][j][1] != board[point.y][point.x][1]) {
              if(x == j && y == i) {
                board[i][j] = ["B", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              }
            }
          }
          break;
        }
      }
      j = point.x+1;
      for(var i=point.y-1; i>=0; i--) {
        if(j < 8 && board[i][j] == "") {
          j++;
        } else {
          if(j < 8) {
            if(board[i][j][1] != board[point.y][point.x][1]) {
              if(x == j && y == i) {
                board[i][j] = ["B", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              }
            }
          }
          break;
        }
      }
      j = point.x-1;
      for(var i=point.y-1; i>=0; i--) {
        if(j >= 0 && board[i][j] == "") {
          j--;
        } else {
          if(j >= 0) {
            if(board[i][j][1] != board[point.y][point.x][1]) {
              if(x == j && y == i) {
                board[i][j] = ["B", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              }
            }
          }
          break;
        }
      }
    } else if(board[point.y][point.x][0] == "R") {
      for(var i=point.x+1; i<8; i++) {
        if(board[point.y][i] =="") {
        } else {
          if(board[point.y][i][1] != board[point.y][point.x][1]) {
            if(x == i && y == point.y) {
              board[y][x] = ["R", board[point.y][point.x][1], 1];
              board[point.y][point.x] = "";
            }
          }
          break;
        }
      }
      for(var i=point.x-1; i>=0; i--) {
        if(board[point.y][i] =="") {
        } else {
          if(board[point.y][i][1] != board[point.y][point.x][1]) {
            if(x == i && y == point.y) {
              board[y][x] = ["R", board[point.y][point.x][1], 1];
              board[point.y][point.x] = "";
            }
          }
          break;
        }
      }
      for(var i=point.y+1; i<8; i++) {
        if(board[i][point.x] =="") {
        } else {
          if(board[i][point.x][1] != board[point.y][point.x][1]) {
            if(x == point.x && y == i) {
              board[y][x] = ["R", board[point.y][point.x][1], 1];
              board[point.y][point.x] = "";
            }
          }
          break;
        }
      }
      for(var i=point.y-1; i>= 0; i--) {
        if(board[i][point.x] =="") {
        } else {
          if(board[i][point.x][1] != board[point.y][point.x][1]) {
            if(x == point.x && y == i) {
              board[y][x] = ["R", board[point.y][point.x][1], 1];
              board[point.y][point.x] = "";
            }
          }
          break;
        }
      }
    } else if(board[point.y][point.x][0] == "Q") {
      j = point.x-1;
      for(var i=point.y+1; i<8; i++) {
        if(j >= 0 && board[i][j] == "") {
          j--;
        } else {
          if(j >= 0) {
            if(board[i][j][1] != board[point.y][point.x][1]) {
              if(x == j && y == i) {
                board[y][x] = ["Q", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              }
            }
          }
          break;
        }
      }
      j = point.x+1;
      for(var i=point.y+1; i<8; i++) {
        if(j < 8 && board[i][j] == "") {
          j++;
        } else {
          if(j < 8) {
            if(board[i][j][1] != board[point.y][point.x][1]) {
              if(x == j && y == i) {
                board[y][x] = ["Q", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              }
            }
          }
          break;
        }
      }
      j = point.x+1;
      for(var i=point.y-1; i>=0; i--) {
        if(j < 8 && board[i][j] == "") {
          j++;
        } else {
          if(j < 8) {
            if(board[i][j][1] != board[point.y][point.x][1]) {
              if(x == j && y == i) {
                board[y][x] = ["Q", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              }
            }
          }
          break;
        }
      }
      j = point.x-1;
      for(var i=point.y-1; i>=0; i--) {
        if(j >= 0 && board[i][j] == "") {
          j--;
        } else {
          if(j >= 0) {
            if(board[i][j][1] != board[point.y][point.x][1]) {
              if(x == j && y == i) {
                board[y][x] = ["Q", board[point.y][point.x][1], 1];
                board[point.y][point.x] = "";
              }
            }
          }
          break;
        }
      }
      for(var i=point.x+1; i<8; i++) {
        if(board[point.y][i] =="") {
        } else {
          if(board[point.y][i][1] != board[point.y][point.x][1]) {
            if(x == i && y == point.y) {
              board[y][x] = ["Q", board[point.y][point.x][1], 1];
              board[point.y][point.x] = "";
            }
          }
          break;
        }
      }
      for(var i=point.x-1; i>=0; i--) {
        if(board[point.y][i] =="") {
        } else {
          if(board[point.y][i][1] != board[point.y][point.x][1]) {
            if(x == i && y == point.y) {
              board[y][x] = ["Q", board[point.y][point.x][1], 1];
              board[point.y][point.x] = "";
            }
          }
          break;
        }
      }
      for(var i=point.y+1; i<8; i++) {
        if(board[i][point.x] =="") {
        } else {
          if(board[i][point.x][1] != board[point.y][point.x][1]) {
            if(x == point.x && y == i) {
              board[y][x] = ["Q", board[point.y][point.x][1], 1];
              board[point.y][point.x] = "";
            }
          }
          break;
        }
      }
      for(var i=point.y-1; i>= 0; i--) {
        if(board[i][point.x] =="") {
        } else {
          if(board[i][point.x][1] != board[point.y][point.x][1]) {
            if(x == point.x && y == i) {
              board[y][x] = ["Q", board[point.y][point.x][1], 1];
              board[point.y][point.x] = "";
            }
          }
          break;
        }
      }
    } else if(board[point.y][point.x][0] == "K") {
      if((x == point.x+1 && y == point.y && !pinned(point.x+1, point.y, -1, 0)) || (x == point.x-1 && y == point.y && !pinned(point.x-1, point.y, 1, 0)) || (x == point.x && y == point.y+1 && !pinned(point.x, point.y+1, 0, -1)) || (x == point.x+1 && y == point.y+1 && !pinned(point.x+1, point.y+1, -1, -1)) || (x == point.x-1 && y == point.y+1 && !pinned(point.x-1, point.y+1, 1, -1)) || (x == point.x && y == point.y-1 && !pinned(point.x, point.y-1, 0, 1)) || (x == point.x+1 && y == point.y-1 && !pinned(point.x+1, point.y-1, -1, 1)) || (x == point.x-1 && y == point.y-1 && !pinned(point.x-1, point.y-1, 1, 1))) {
        board[y][x] = ["K", board[point.y][point.x][1], 1];
        board[point.y][point.x] = "";
      }
    }
  }
  window.onmousedown = function(e) {
    if((e.clientX > margin_x && e.clientX < margin_x+480) && (e.clientY > margin_y && e.clientY < margin_y+480)) {
      kx = Math.floor((e.clientX+5-margin_x)/60);
      ky = Math.floor((e.clientY+2-margin_y)/60);
      if(board[ky][kx][1] == nplay || board[ky][kx] == "") {
        sx = kx;
        sy = ky;
      }
      if(board[sy][sx] != "" && board[ky][kx][1] == nplay) {
        point.x = sx;
        point.y = sy;
        selected = true;
      } else {
        if(board[sy][sx] == "") {
          move(point.x, point.y, sx, sy);
          if(nplay == "W") {
            nplay = "B";
          } else {
            nplay = "W";
          }
          if(check_king()) {
            console.log("Check ! > "+nplay);
          }
          selected = false;
        } else if(board[ky][kx][1] != board[point.y][point.x][1]) {
          attack(kx, ky);
          if(nplay == "W") {
            nplay = "B";
          } else {
            nplay = "W";
          }
          if(check_king()) {
            console.log("Check ! > "+nplay);
          }
        } else if(board[sy][sx][1] == nplay) {
          if(board[sy][sx] != "") {
            point.x = sx;
            point.y = sy;
            selected = true;
          }
        }
      }
    } else {
      point.x = -1;
      point.y = -1;
      selected = false;
    }
  }

  loadSprite("chess.png");

  function render() {
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.fillStyle = "rgb(44, 62, 80)";
    context.rect(0, 0, width, height);
    context.fill();
    for(var i=0; i<8; i++) {
      for(var j=0; j<8; j++) {
        if(i%2 == 0) {
          if(j%2 == 0) {
            drawTile(i, j, "#FFF");
          } else {
            drawTile(i, j, "#000");
          }
        } else {
          if(j%2 != 0) {
            drawTile(i, j, "#FFF");
          } else {
            drawTile(i, j, "#000");
          }

        }
      }
    }
    if(point.x >= 0 && point.y >= 0) {
      var rx = point.x*60+margin_x;
      var ry = point.y*60+margin_y;
      context.beginPath();
      context.fillStyle = "rgba(46, 204, 113,0.8)";
      context.rect(rx, ry, tile_width, tile_height);
      context.fill();
      fillProbs();
    }
    drawBoard();
    requestAnimationFrame(render);
  }
}
