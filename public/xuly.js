
var socket = io("http://localhost:3000");

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const originboardCells = { C00: { x: 0, y: 0, data: { color:"black",name: "BlackRookLeft" } }, C10: { x: 1, y: 0, data: { color:"black",name: "BlackKnightLeft" } }, C20: { x: 2, y: 0, data: { color:"black",name: "BlackBishopLeft" } },
C30: { x: 3, y: 0, data: { color:"black",name: "BlackKing" } }, C40: { x: 4, y: 0, data: { color:"black",name: "BlackQueen" } }, C50: { x: 5, y: 0, data: { color:"black",name: "BlackBishopRight" } }, 
C60: { x: 6, y: 0, data: { color:"black",name: "BlackKnightRight" } }, C70: { x: 7, y: 0, data: { color:"black",name: "BlackRookRight" } }, C01: { x: 0, y: 1, data: { color:"black",name: "BlackPawn0" } }, 
C11: { x: 1, y: 1, data: { color:"black",name: "BlackPawn1" } }, C21: { x: 2, y: 1, data: { color:"black",name: "BlackPawn2" } }, C31: { x: 3, y: 1, data: { color:"black",name: "BlackPawn3" } }, 
C41: { x: 4, y: 1, data: { color:"black",name: "BlackPawn4" } }, C51: { x: 5, y: 1, data: { color:"black",name: "BlackPawn5" } }, C61: { x: 6, y: 1, data: { color:"black",name: "BlackPawn6" } }, 
C71: { x: 7, y: 1, data: { color:"black",name: "BlackPawn7" } }, C02: { x: 0, y: 2, data: 0 }, C12: { x: 1, y: 2, data: 0 }, C22: { x: 2, y: 2, data: 0 }, 
C32: { x: 3, y: 2, data: 0 }, C42: { x: 4, y: 2, data: 0 }, C52: { x: 5, y: 2, data: 0 }, C62: { x: 6, y: 2, data: 0 }, C72: { x: 7, y: 2, data: 0 }, 
C03: { x: 0, y: 3, data: 0 }, C13: { x: 1, y: 3, data: 0 }, C23: { x: 2, y: 3, data: 0 }, C33: { x: 3, y: 3, data: 0 }, C43: { x: 4, y: 3, data: 0 }, 
C53: { x: 5, y: 3, data: 0 }, C63: { x: 6, y: 3, data: 0 }, C73: { x: 7, y: 3, data: 0 }, C04: { x: 0, y: 4, data: 0 }, C14: { x: 1, y: 4, data: 0 }, 
C24: { x: 2, y: 4, data: 0 }, C34: { x: 3, y: 4, data: 0 }, C44: { x: 4, y: 4, data: 0 }, C54: { x: 5, y: 4, data: 0 }, C64: { x: 6, y: 4, data: 0 }, 
C74: { x: 7, y: 4, data: 0 }, C05: { x: 0, y: 5, data: 0 }, C15: { x: 1, y: 5, data: 0 }, C25: { x: 2, y: 5, data: 0 }, C35: { x: 3, y: 5, data: 0 }, 
C45: { x: 4, y: 5, data: 0 }, C55: { x: 5, y: 5, data: 0 }, C65: { x: 6, y: 5, data: 0 }, C75: { x: 7, y: 5, data: 0 }, C06: { x: 0, y: 6, data: { color:"white",name: "WhitePawn0" } }, 
C16: { x: 1, y: 6, data: { color:"white",name: "WhitePawn1" } }, C26: { x: 2, y: 6, data: { color:"white",name: "WhitePawn2" } }, C36: { x: 3, y: 6, data: { color:"white",name: "WhitePawn3" } }, 
C46: { x: 4, y: 6, data: { color:"white",name: "WhitePawn4" } }, C56: { x: 5, y: 6, data: { color:"white",name: "WhitePawn5" } }, C66: { x: 6, y: 6, data: { color:"white",name: "WhitePawn6" } }, 
C76: { x: 7, y: 6, data: { color:"white",name: "WhitePawn7" } }, C07: { x: 0, y: 7, data: { color:"white",name: "WhiteRookLeft" } }, C17: { x: 1, y: 7, data: 0 }, 
C27: { x: 2, y: 7, data: { color:"white",name: "WhiteBishopLeft" } }, C37: { x: 3, y: 7, data: { color:"white",name: "WhiteKnightLeft" } }, C47: { x: 4, y: 7, data: { color:"white",name: "WhiteQueen" } }, 
C57: { x: 5, y: 7, data: { color:"white",name: "WhiteBishopRight" } }, C67: { x: 6, y: 7, data: { color:"white",name: "WhiteKnightRight" } }, C77: { x: 7, y: 7, data: { color:"white",name: "WhiteRookRight" } } };  


var boardCells = { C00: { x: 0, y: 0, data: { color:"black",name: "BlackRookLeft" } }, C10: { x: 1, y: 0, data: { color:"black",name: "BlackKnightLeft" } }, C20: { x: 2, y: 0, data: { color:"black",name: "BlackBishopLeft" } },
C30: { x: 3, y: 0, data: { color:"black",name: "BlackKing" } }, C40: { x: 4, y: 0, data: { color:"black",name: "BlackQueen" } }, C50: { x: 5, y: 0, data: { color:"black",name: "BlackBishopRight" } }, 
C60: { x: 6, y: 0, data: { color:"black",name: "BlackKnightRight" } }, C70: { x: 7, y: 0, data: { color:"black",name: "BlackRookRight" } }, C01: { x: 0, y: 1, data: { color:"black",name: "BlackPawn0" } }, 
C11: { x: 1, y: 1, data: { color:"black",name: "BlackPawn1" } }, C21: { x: 2, y: 1, data: { color:"black",name: "BlackPawn2" } }, C31: { x: 3, y: 1, data: { color:"black",name: "BlackPawn3" } }, 
C41: { x: 4, y: 1, data: { color:"black",name: "BlackPawn4" } }, C51: { x: 5, y: 1, data: { color:"black",name: "BlackPawn5" } }, C61: { x: 6, y: 1, data: { color:"black",name: "BlackPawn6" } }, 
C71: { x: 7, y: 1, data: { color:"black",name: "BlackPawn7" } }, C02: { x: 0, y: 2, data: 0 }, C12: { x: 1, y: 2, data: 0 }, C22: { x: 2, y: 2, data: 0 }, 
C32: { x: 3, y: 2, data: 0 }, C42: { x: 4, y: 2, data: 0 }, C52: { x: 5, y: 2, data: 0 }, C62: { x: 6, y: 2, data: 0 }, C72: { x: 7, y: 2, data: 0 }, 
C03: { x: 0, y: 3, data: 0 }, C13: { x: 1, y: 3, data: 0 }, C23: { x: 2, y: 3, data: 0 }, C33: { x: 3, y: 3, data: 0 }, C43: { x: 4, y: 3, data: 0 }, 
C53: { x: 5, y: 3, data: 0 }, C63: { x: 6, y: 3, data: 0 }, C73: { x: 7, y: 3, data: 0 }, C04: { x: 0, y: 4, data: 0 }, C14: { x: 1, y: 4, data: 0 }, 
C24: { x: 2, y: 4, data: 0 }, C34: { x: 3, y: 4, data: 0 }, C44: { x: 4, y: 4, data: 0 }, C54: { x: 5, y: 4, data: 0 }, C64: { x: 6, y: 4, data: 0 }, 
C74: { x: 7, y: 4, data: 0 }, C05: { x: 0, y: 5, data: 0 }, C15: { x: 1, y: 5, data: 0 }, C25: { x: 2, y: 5, data: 0 }, C35: { x: 3, y: 5, data: 0 }, 
C45: { x: 4, y: 5, data: 0 }, C55: { x: 5, y: 5, data: 0 }, C65: { x: 6, y: 5, data: 0 }, C75: { x: 7, y: 5, data: 0 }, C06: { x: 0, y: 6, data: { color:"white",name: "WhitePawn0" } }, 
C16: { x: 1, y: 6, data: { color:"white",name: "WhitePawn1" } }, C26: { x: 2, y: 6, data: { color:"white",name: "WhitePawn2" } }, C36: { x: 3, y: 6, data: { color:"white",name: "WhitePawn3" } }, 
C46: { x: 4, y: 6, data: { color:"white",name: "WhitePawn4" } }, C56: { x: 5, y: 6, data: { color:"white",name: "WhitePawn5" } }, C66: { x: 6, y: 6, data: { color:"white",name: "WhitePawn6" } }, 
C76: { x: 7, y: 6, data: { color:"white",name: "WhitePawn7" } }, C07: { x: 0, y: 7, data: { color:"white",name: "WhiteRookLeft" } }, C17: { x: 1, y: 7, data: 0 }, 
C27: { x: 2, y: 7, data: { color:"white",name: "WhiteBishopLeft" } }, C37: { x: 3, y: 7, data: { color:"white",name: "WhiteKnightLeft" } }, C47: { x: 4, y: 7, data: { color:"white",name: "WhiteQueen" } }, 
C57: { x: 5, y: 7, data: { color:"white",name: "WhiteBishopRight" } }, C67: { x: 6, y: 7, data: { color:"white",name: "WhiteKnightRight" } }, C77: { x: 7, y: 7, data: { color:"white",name: "WhiteRookRight" } } };  

const originPieces={WhiteKing:{type:"King",color:"white",src:"chess_pieces/wk.svg",originX:3,originY:7,x:3,y:7},WhiteQueen:{type:"Queen",color:"white",src:"chess_pieces/wq.svg",originX:4,originY:7,x:4,y:7},
WhiteBishopLeft:{type:"Bishop",color:"white",src:"chess_pieces/wb.svg",originX:2,originY:7,x:2,y:7},WhiteBishopRight:{type:"Bishop",color:"white",src:"chess_pieces/wb.svg",originX:5,originY:7,x:5,y:7},
WhiteKnightLeft:{type:"Knight",color:"white",src:"chess_pieces/wn.svg",originX:3,originY:7,x:1,y:7},WhiteKnightRight:{type:"Knight",color:"white",src:"chess_pieces/wn.svg",originX:6,originY:7,x:6,y:7},
WhiteRookLeft:{type:"Rook",color:"white",src:"chess_pieces/wr.svg",originX:0,originY:7,x:0,y:7},WhiteRookRight:{type:"Rook",color:"white",src:"chess_pieces/wr.svg",originX:7,originY:7,x:7,y:7},
WhitePawn0:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:0,originY:6,x:0,y:6},WhitePawn1:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:1,originY:6,x:1,y:6},
WhitePawn2:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:2,originY:6,x:2,y:6},WhitePawn3:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:3,originY:6,x:3,y:6},
WhitePawn4:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:4,originY:6,x:4,y:6},WhitePawn5:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:5,originY:6,x:5,y:6},
WhitePawn6:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:6,originY:6,x:6,y:6},WhitePawn7:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:7,originY:6,x:7,y:6},
BlackKing:{type:"King",color:"black",src:"chess_pieces/bk.svg",originX:3,originY:0,x:3,y:0},BlackQueen:{type:"Queen",color:"black",src:"chess_pieces/bq.svg",originX:4,originY:0,x:4,y:0},
BlackBishopLeft:{type:"Bishop",color:"black",src:"chess_pieces/bb.svg",originX:2,originY:0,x:2,y:0},BlackBishopRight:{type:"Bishop",color:"black",src:"chess_pieces/bb.svg",originX:5,originY:0,x:5,y:0},
BlackKnightLeft:{type:"Knight",color:"black",src:"chess_pieces/bn.svg",originX:1,originY:0,x:1,y:0},BlackKnightRight:{type:"Knight",color:"black",src:"chess_pieces/bn.svg",originX:6,originY:0,x:6,y:0},
BlackRookLeft:{type:"Rook",color:"black",src:"chess_pieces/br.svg",originX:0,originY:0,x:0,y:0},BlackRookRight:{type:"Rook",color:"black",src:"chess_pieces/br.svg",originX:7,originY:0,x:7,y:0},
BlackPawn0:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:0,originY:1,x:0,y:1},BlackPawn1:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:1,originY:1,x:1,y:1},
BlackPawn2:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:2,originY:1,x:2,y:1},BlackPawn3:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:3,originY:1,x:3,y:1},
BlackPawn4:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:4,originY:1,x:4,y:1},BlackPawn5:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:5,originY:1,x:5,y:1},
BlackPawn6:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:6,originY:1,x:6,y:1},BlackPawn7:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:7,originY:1,x:7,y:1}};

var Pieces={WhiteKing:{type:"King",color:"white",src:"chess_pieces/wk.svg",originX:3,originY:7,x:3,y:7},WhiteQueen:{type:"Queen",color:"white",src:"chess_pieces/wq.svg",originX:4,originY:7,x:4,y:7},
WhiteBishopLeft:{type:"Bishop",color:"white",src:"chess_pieces/wb.svg",originX:2,originY:7,x:2,y:7},WhiteBishopRight:{type:"Bishop",color:"white",src:"chess_pieces/wb.svg",originX:5,originY:7,x:5,y:7},
WhiteKnightLeft:{type:"Knight",color:"white",src:"chess_pieces/wn.svg",originX:3,originY:7,x:1,y:7},WhiteKnightRight:{type:"Knight",color:"white",src:"chess_pieces/wn.svg",originX:6,originY:7,x:6,y:7},
WhiteRookLeft:{type:"Rook",color:"white",src:"chess_pieces/wr.svg",originX:0,originY:7,x:0,y:7},WhiteRookRight:{type:"Rook",color:"white",src:"chess_pieces/wr.svg",originX:7,originY:7,x:7,y:7},
WhitePawn0:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:0,originY:6,x:0,y:6},WhitePawn1:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:1,originY:6,x:1,y:6},
WhitePawn2:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:2,originY:6,x:2,y:6},WhitePawn3:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:3,originY:6,x:3,y:6},
WhitePawn4:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:4,originY:6,x:4,y:6},WhitePawn5:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:5,originY:6,x:5,y:6},
WhitePawn6:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:6,originY:6,x:6,y:6},WhitePawn7:{type:"Pawn",color:"white",src:"chess_pieces/wp.svg",originX:7,originY:6,x:7,y:6},
BlackKing:{type:"King",color:"black",src:"chess_pieces/bk.svg",originX:3,originY:0,x:3,y:0},BlackQueen:{type:"Queen",color:"black",src:"chess_pieces/bq.svg",originX:4,originY:0,x:4,y:0},
BlackBishopLeft:{type:"Bishop",color:"black",src:"chess_pieces/bb.svg",originX:2,originY:0,x:2,y:0},BlackBishopRight:{type:"Bishop",color:"black",src:"chess_pieces/bb.svg",originX:5,originY:0,x:5,y:0},
BlackKnightLeft:{type:"Knight",color:"black",src:"chess_pieces/bn.svg",originX:1,originY:0,x:1,y:0},BlackKnightRight:{type:"Knight",color:"black",src:"chess_pieces/bn.svg",originX:6,originY:0,x:6,y:0},
BlackRookLeft:{type:"Rook",color:"black",src:"chess_pieces/br.svg",originX:0,originY:0,x:0,y:0},BlackRookRight:{type:"Rook",color:"black",src:"chess_pieces/br.svg",originX:7,originY:0,x:7,y:0},
BlackPawn0:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:0,originY:1,x:0,y:1},BlackPawn1:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:1,originY:1,x:1,y:1},
BlackPawn2:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:2,originY:1,x:2,y:1},BlackPawn3:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:3,originY:1,x:3,y:1},
BlackPawn4:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:4,originY:1,x:4,y:1},BlackPawn5:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:5,originY:1,x:5,y:1},
BlackPawn6:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:6,originY:1,x:6,y:1},BlackPawn7:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:7,originY:1,x:7,y:1}};


$(document).ready(function() {
    $(".loginForm").show();
    $(".chatForm").hide();
    $("#btnRegister").click(function() {
        socket.emit("client-send-username", $("#txtUsername").val() );
    });
    socket.on("server-send-dangky-thanhcong", function(data) {
        $(".loginForm").hide();
        $(".chatForm").show(1000);
        $("body").css("background-image"," none")
        $("body").css("background-color"," #3CAEA3")
        $("#currentUser").html(data);
        socket.Username = data;
        console.log(socket.Username);
        
        $("#challengeButton").click(function() {
            var target = prompt("Your opponent's name", "Harry Potter");
    
            if (target != null) {
                socket.emit("challenging",{challenger : data,target : target});
            }
            
        });
   
    });

    $("#btnLogout").click(function() {
        socket.emit("logout");
        $(".loginForm").show(2000);
        $(".chatForm").hide(1000);
        

    });

    $("#txtMessage").focusin(function (params) {
        socket.emit("dang-go-chu");
    });
    $("#txtMessage").focusout(function (params) {
        socket.emit("dung-go-chu");
    });


    $("#btnSend").click(function() {
        socket.emit("user-send-message", $("#txtMessage").val() );
        $("#txtMessage").val("");
    });


});
socket.on("server-send-dangky-thatbai", function() {
    alert('Ten dang nhap da ton tai.');
});

socket.on("danh-sach-dang-online", function(mangUser) {
    $("#boxContent").html("");
    
    for(i in mangUser) {
        $("#boxContent").append(`<div class='userOnline'> <h5>${i}</h5>  </div>`); // <button name='${i}' id='${mangUser[i]}' class='challengeButton'  >Challenge</button>
    }

});


socket.on("tin-nhan-chung", function(data) {
   $("#listMessage").append("<p>"+data.un+" :"+data.mes +"</p>");
   
});

socket.on("no-dang-go-chu", function(gochu) {
    $("#"+gochu).remove(); 
    $("#listMessage").append("<p  class='bacham' id ="+gochu+" >"+gochu+ " : " +"<span></span><span></span><span></span></p>");
    
});

socket.on("no-dung-go-chu", function(gochu) {
    $("#"+gochu).remove();   
});

socket.on("wanna-fight", function(data) {
    // console.log('vao wanafight',data);
    
    $('#ModalCenter').modal('show');
    var tick;
    let TimeOut = () => {
          tick = setTimeout(()=>{
                        console.log("tu choi");
                        socket.emit('declined',data.challenger)
                        delete data.challenger
                    },10000)
    }
    TimeOut()
    // after 10s the request will be declined
    

    $('.accept').click(()=>{
        console.log("chap nhan");
        $("#container").css("background-image"," none")
        $("#container").css("background-color"," white")
        socket.emit('accepted',data.challenger)
        renderChessboard();
        clearTimeout(tick)
    })


});

socket.on('challenge-status',(data)=>{
    console.log('vao challege status');
    
    if(data.status==='accepted') {
        $("#container").css("background-image"," none")
        $("#container").css("background-color"," white")
        alert('Your opponent accepted the challenge')
        alert('You go first on white side ')
        socket.emit('join-room',data.target)
        renderChessboard();
    }
    else {
        alert('Your opponent declined the challenge')
    }
})

let renderChessboard = () => {
    // -------------------- Create the chess board --------------------
    var width = window.innerWidth;
    var height = window.innerHeight;
    var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
    });
    var layer = new Konva.Layer();
    for (let i = 0; i <4 ; i++)
    { 
        for (let j = 0; j <4 ; j++)
        { 
        var rect1 = new Konva.Rect({
            x: i*160 ,
            y: j*160 ,
            width: 80,
            height: 80,
            fill: 'gray'
        });
        var rect2 = new Konva.Rect({
            x: i*160 + 80 ,
            y: j*160 + 80,
            width: 80,
            height: 80,
            fill: 'gray'
        });
        

        // add the shape to the layer
        layer.add(rect1);
        layer.add(rect2);
        // add the layer to the stage
        stage.add(layer);
        }
    }
    //-----------------------------------------------------------------

    // ---------------------Create the chess pieces ------------------- 
    var bound = function(pos) { var newY,newX; if(pos.y>0&&pos.y
    <560) { newY=pos.y }else if(pos.y <=0 ) { newY=0 ; }else { newY=560; } if(pos.x>0&&pos.x
        <560) { newX=pos.x }else if(pos.x <=0 ) { newX=0 ; }else { newX=560; } return { x: newX, y: newY }; } ;
    
        for(let i in Pieces) {
            let imgTest = new Image();
            imgTest.src = Pieces[i].src;
            imgTest.onload = function() {
            
                let piece = new Konva.Image({
                    x: Pieces[i].x*80,
                    y: Pieces[i].y*80,
                    image: imgTest,
                    width: 80,
                    height: 80,
                    draggable: true,
                    dragBoundFunc: function(pos) {
                    return bound(pos)
                    },
                    id : i
                });


                piece.on('dragstart', function() {
                    console.log('vao dragstart chua');
                    
                    socket.emit('picked', {name : i,color : Pieces[i].color} ,(resData) => {
                            if(resData) {
                                console.log(resData);
                               
                                for (let i=0;i<resData.length;i++) {
                                    let moveCircle = new Konva.Circle({
                                        x: resData[i][0]*80  + 40 ,
                                        y: resData[i][1]*80 + 40,
                                        radius: 10,
                                        fill: 'pink',
                                        })
                                        // add the shape to the layer
                                        layer.add(moveCircle);

                                        // add the layer to the stage
                                        stage.add(layer);
                                        
                                        // moveCircle.show();
                                        // layer.draw();

                                }    
                                
                            }
                            
                        
                    } ) 

                });
                
                piece.on('dragend', function() {  // mover
                    
                    
                    let  nxtx = Math.floor(0.5+(piece.attrs.x-0)/80)
                    let  nxty = Math.floor(0.5+piece.attrs.y/80)
                    
                    let cir = stage.find('Circle'); // remove possible moves hint
                    cir.hide();
                    layer.draw();
                    // send the data of the move  and wait for validation ------------------------
                    socket.emit('moved',{ sender : socket.Username, name : i,color: Pieces[i].color, type: Pieces[i].type,x: Pieces[i].x , y: Pieces[i].y, nextX : nxtx , nextY : nxty },(resData) => {

                             if (resData==="Invalid")
                                {console.log('khong dc di nhu the');
                                    piece.setPosition({
                                            x : Pieces[i].x*80,
                                            y : Pieces[i].y*80 
                                            });
                                    // add the shape to the layer
                                    layer.add(piece);
                                    // add the layer to the stage
                                    stage.add(layer);}
                            else console.log(typeof resData);
                            
                        
                        });

                    // ----------------------------------------------------------

                });
            // add the shape to the layer
            layer.add(piece);
            // add the layer to the stage
            stage.add(layer);

            }   // imgtest onload
        }// for loop to create pieces

                    socket.on('everyBodyMove',(data)=> {
                                                                    
                        // Event was emitted successfully
                        let oldX =  data.x;
                        let oldY =  data.y;
                        let newX =  data.nextX;
                        let newY =  data.nextY;
                        let imageOfPiece = stage.find(`#${data.name}`)[0];
                        let theMovedPiece = Pieces[`${data.name}`];
                        console.log(boardCells[`C${newX}${newY}`].data);
                        
                        if( boardCells[`C${newX}${newY}`].data.name && Pieces[`${boardCells[`C${newX}${newY}`].data.name}`]   ) { //&& Pieces[`${boardCells[`C${newX}${newY}`].data.name}`].color !== theMovedPiece.color
                            console.log('chem nhau roi'); 
                            var shape = stage.find(`#${ boardCells[`C${newX}${newY}`].data.name }`)[0];
                                shape.hide();  
                                layer.draw(); 
                            delete Pieces[`  ${ boardCells[`C${newX}${newY}`].data.name }  `]
                            
                        }
                        boardCells[`C${oldX}${oldY}`].data=0;

                        theMovedPiece.x = newX;
                        theMovedPiece.y = newY; // add new pos to the originPieces
                        imageOfPiece.position({
                            x : theMovedPiece.x*80,
                            y : theMovedPiece.y*80 
                            });
                        
                        boardCells[`C${newX}${newY}`].data = { color:theMovedPiece.color,name: data.name }

                        // add the shape to the layer
                        layer.add(imageOfPiece);
                        // add the layer to the stage
                        stage.add(layer);
                        
            })
            
      
};

socket.on('GameOver',(data)=> {
    alert(`GameOver. !${data} is the winner!`);
    Pieces = {...originPieces};
    boardCells = {...originboardCells};
    renderChessboard();
    
})