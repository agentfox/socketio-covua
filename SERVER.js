var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set('view engine', 'ejs');
app.set("views","./views")
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000,()=>{ console.log("Server running on port 3000"); });
const util = require('util')
var RoomsList = {};
var mangUser = {};


io.on("connection", function(socket) {
    
    
    socket.on("client-send-username",function(data) {

    if ( mangUser[`'${data}'`] || data=="" ) {
        socket.emit("server-send-dangky-thatbai");   
    }
    else {
        mangUser[`${data}`]=socket.id;
        socket.Username = data;
        socket.emit("server-send-dangky-thanhcong",data);
        io.sockets.emit("danh-sach-dang-online", mangUser);
         
    }  
    });

    socket.on("logout", function () {
        delete mangUser[`${socket.Username}`] ;       
        socket.broadcast.emit("danh-sach-dang-online",mangUser);

    });

    /*socket.on("user-send-message", function (tinnhan) {
        var tinnhan_daydu = [socket.Username,tinnhan];
        io.sockets.emit("tin-nhan-chung",tinnhan_daydu);
    });*/
    socket.on("user-send-message", function (tinnhan) { 
        io.sockets.emit("tin-nhan-chung",{ un:socket.Username, mes:tinnhan });
    });

    socket.on("dang-go-chu", function () { 
        socket.broadcast.emit("no-dang-go-chu",socket.Username);
    });
    socket.on("dung-go-chu", function () { 
        socket.broadcast.emit("no-dung-go-chu",socket.Username);
    });

    socket.on('challenging',(data)=>{   // challenger ask for a match
        console.log("vao challenging",data);
        console.log(mangUser[`${data.target}`]);
        io.to(`${ mangUser[`${data.target}`] }`).emit('wanna-fight', {challenger : data.challenger });        
    })

    socket.on('accepted',(cha)=> {  // target reply
        io.to(`${mangUser[`${cha}`]}`).emit('challenge-status',{status :'accepted',target : socket.Username });
        socket.myGame = `${socket.Username}-${cha}`;
        socket.challenger = `${cha}`;
        socket.join(`${socket.Username}-${cha}`); // target join room
        //socket.leave(`${mangUser[`${socket.Username}`]}`); // roi phong cua no


        RoomsList[`${socket.Username}-${cha}`] = {
            challenger : cha,
            challengerID : mangUser[`${cha}`],
            target : socket.Username,
            targetID : mangUser[`${socket.Username}`],
            originPieces : {WhiteKing:{type:"King",color:"white",src:"chess_pieces/wk.svg",originX:3,originY:7,x:3,y:7},WhiteQueen:{type:"Queen",color:"white",src:"chess_pieces/wq.svg",originX:4,originY:7,x:4,y:7},
            WhiteBishopLeft:{type:"Bishop",color:"white",src:"chess_pieces/wb.svg",originX:2,originY:7,x:2,y:7},WhiteBishopRight:{type:"Bishop",color:"white",src:"chess_pieces/wb.svg",originX:5,originY:7,x:5,y:7},
            WhiteKnightLeft:{type:"Knight",color:"white",src:"chess_pieces/wn.svg",originX:1,originY:7,x:1,y:7},WhiteKnightRight:{type:"Knight",color:"white",src:"chess_pieces/wn.svg",originX:6,originY:7,x:6,y:7},
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
            BlackPawn6:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:6,originY:1,x:6,y:1},BlackPawn7:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:7,originY:1,x:7,y:1}},

            Pieces : {WhiteKing:{type:"King",color:"white",src:"chess_pieces/wk.svg",originX:3,originY:7,x:3,y:7},WhiteQueen:{type:"Queen",color:"white",src:"chess_pieces/wq.svg",originX:4,originY:7,x:4,y:7},
            WhiteBishopLeft:{type:"Bishop",color:"white",src:"chess_pieces/wb.svg",originX:2,originY:7,x:2,y:7},WhiteBishopRight:{type:"Bishop",color:"white",src:"chess_pieces/wb.svg",originX:5,originY:7,x:5,y:7},
            WhiteKnightLeft:{type:"Knight",color:"white",src:"chess_pieces/wn.svg",originX:1,originY:7,x:1,y:7},WhiteKnightRight:{type:"Knight",color:"white",src:"chess_pieces/wn.svg",originX:6,originY:7,x:6,y:7},
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
            BlackPawn6:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:6,originY:1,x:6,y:1},BlackPawn7:{type:"Pawn",color:"black",src:"chess_pieces/bp.svg",originX:7,originY:1,x:7,y:1}},
            
            originBoardCells : { C00: { x: 0, y: 0, data: { color:"black",name: "BlackRookLeft" } }, C10: { x: 1, y: 0, data: { color:"black",name: "BlackKnightLeft" } }, C20: { x: 2, y: 0, data: { color:"black",name: "BlackBishopLeft" } },
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
            C76: { x: 7, y: 6, data: { color:"white",name: "WhitePawn7" } }, C07: { x: 0, y: 7, data: { color:"white",name: "WhiteRookLeft" } }, C17: { x: 1, y: 7, data: { color:"white",name: "WhiteKnightLeft" } }, 
            C27: { x: 2, y: 7, data: { color:"white",name: "WhiteBishopLeft" } }, C37: { x: 3, y: 7, data: { color:"white",name: "WhiteKing" } }, C47: { x: 4, y: 7, data: { color:"white",name: "WhiteQueen" } }, 
            C57: { x: 5, y: 7, data: { color:"white",name: "WhiteBishopRight" } }, C67: { x: 6, y: 7, data: { color:"white",name: "WhiteKnightRight" } }, C77: { x: 7, y: 7, data: { color:"white",name: "WhiteRookRight" } } },

            boardCells : { C00: { x: 0, y: 0, data: { color:"black",name: "BlackRookLeft" } }, C10: { x: 1, y: 0, data: { color:"black",name: "BlackKnightLeft" } }, C20: { x: 2, y: 0, data: { color:"black",name: "BlackBishopLeft" } },
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
            C76: { x: 7, y: 6, data: { color:"white",name: "WhitePawn7" } }, C07: { x: 0, y: 7, data: { color:"white",name: "WhiteRookLeft" } }, C17: { x: 1, y: 7, data: { color:"white",name: "WhiteKnightLeft" } }, 
            C27: { x: 2, y: 7, data: { color:"white",name: "WhiteBishopLeft" } }, C37: { x: 3, y: 7, data: { color:"white",name: "WhiteKing" } }, C47: { x: 4, y: 7, data: { color:"white",name: "WhiteQueen" } }, 
            C57: { x: 5, y: 7, data: { color:"white",name: "WhiteBishopRight" } }, C67: { x: 6, y: 7, data: { color:"white",name: "WhiteKnightRight" } }, C77: { x: 7, y: 7, data: { color:"white",name: "WhiteRookRight" } } },

            moveCounter : 0,

        }


        let theGame = RoomsList[`${socket.Username}-${cha}`]; // challenger challengerID target targetID 
    //--------------------------------------------originBoardCells  o-riginPieces boardCells moveCounter 

        let makeNewGame = () => {
            
            theGame.Pieces=theGame.originPieces;
            theGame.moveCounter = 0;
            theGame.boardCells = theGame.originBoardCells;
        }
        let checkPawnMoves = (pawn) => {  // tra ve cac o co the di duoc
            let moves = [];
            let Pawn = theGame.Pieces[pawn.name];
            if(Pawn.y!==0 && Pawn.y!==7) {
                if(Pawn.x===Pawn.originX && Pawn.y===Pawn.originY) {  // tot o vi tri ban dau
                    if(Pawn.color==="white") {
                        let trai = theGame.boardCells[`C${Pawn.x-1}${Pawn.y-1}`];
                        let giua = theGame.boardCells[`C${Pawn.x  }${Pawn.y-1}`];
                        let phai = theGame.boardCells[`C${Pawn.x+1}${Pawn.y-1}`];
                        let tren = theGame.boardCells[`C${Pawn.x  }${Pawn.y-2}`];
                        if( trai && trai.data.color==="black") {
                            moves.push([trai.x,trai.y])
                        }
                        if( giua && giua.data===0 ) {
                            moves.push([giua.x,giua.y])
                        }
                        if( phai && phai.data.color==="black") {
                            moves.push([phai.x,phai.y])
                        }
                        if( tren && tren.data===0 ) {
                            moves.push([tren.x,tren.y])
                        }
                    }
                    else {
                        
                        
                        let trai = theGame.boardCells[`C${Pawn.x-1}${Pawn.y+1}`];
                        let giua = theGame.boardCells[`C${Pawn.x  }${Pawn.y+1}`];
                        let phai = theGame.boardCells[`C${Pawn.x+1}${Pawn.y+1}`];
                        let tren = theGame.boardCells[`C${Pawn.x  }${Pawn.y+2}`];
                        if( trai && trai.data.color==="white") {
                            moves.push([trai.x,trai.y])
                        }
                        if( giua && giua.data===0 ) {
                            moves.push([giua.x,giua.y])
                        }
                        if( phai && phai.data.color==="white") {
                            moves.push([phai.x,phai.y])
                        }
                        if( tren && tren.data===0 ) {
                            moves.push([tren.x,tren.y])
                        }
                        
                    }
                }
                else {
                    if(Pawn.color==="white") {
                        let trai = theGame.boardCells[`C${Pawn.x-1}${Pawn.y-1}`];
                        let giua = theGame.boardCells[`C${Pawn.x  }${Pawn.y-1}`];
                        let phai = theGame.boardCells[`C${Pawn.x+1}${Pawn.y-1}`];
                        if( trai && trai.data.color==="black") {
                            moves.push([trai.x,trai.y])
                        }
                        if( giua && giua.data===0 ) {
                            moves.push([giua.x,giua.y])
                        }
                        if( phai && phai.data.color==="black") {
                            moves.push([phai.x,phai.y])
                        }
                    }
                    else {
                        let trai = theGame.boardCells[`C${Pawn.x-1}${Pawn.y+1}`];
                        let giua = theGame.boardCells[`C${Pawn.x  }${Pawn.y+1}`];
                        let phai = theGame.boardCells[`C${Pawn.x+1}${Pawn.y+1}`];
                        if( trai && trai.data.color==="white") {
                            moves.push([trai.x,trai.y])
                        }
                        if( giua && giua.data===0 ) {
                            moves.push([giua.x,giua.y])
                        }
                        if( phai && phai.data.color==="white") {
                            moves.push([phai.x,phai.y])
                        }
                        
                    }
                }
            }
            return moves;
        }
        
        let checkRookMoves = (rook) => {
            let moves = [];
            let Rook = theGame.Pieces[rook.name];
                    
                    
                for(let m = Rook.x-1; m>=0;m-- ) {  // trai
                    let trai = theGame.boardCells[`C${m}${Rook.y}`];
                    if(trai.data.color  && trai.data.color!==Rook.color) {
                        moves.push([trai.x,trai.y]);
                        break;
                    }
                    else if (trai && trai.data===0) {
                        moves.push([trai.x,trai.y]);
                    }
                    else {break;}
                }
                for(let m = Rook.x+1; m<8;m++ ) { // phai
                    let phai = theGame.boardCells[`C${m}${Rook.y}`];
                    
                    if(phai.data.color  && phai.data.color!==Rook.color) {
                        moves.push([phai.x,phai.y]);
                        break;
                    }
                    else if (phai && phai.data===0) {
                        moves.push([phai.x,phai.y]);
                    }
                    else {break;}
                }
                for(let m = Rook.y-1; m>=0;m = m-1 ) { // tren
        
                    let tren = theGame.boardCells[`C${Rook.x}${m}`];
                    if( tren.data.color  &&  tren.data.color!==Rook.color) {
                        moves.push([tren.x,tren.y]);
                        break;
                    }
                    else if (tren && tren.data===0) {
                        moves.push([tren.x,tren.y]);
                    }
                    else {break;}
                }
                for(let m = Rook.y+1; m < 8; m++ ) { //duoi
                    let duoi = theGame.boardCells[`C${Rook.x}${m}`];
                    if( duoi.data.color && duoi.data.color!==Rook.color) {
                        moves.push([duoi.x,duoi.y]);
                        break;
                    }
                    else if (duoi && duoi.data===0) {
                        moves.push([duoi.x,duoi.y]);
                    }
                    else {break;}
                }
                    
            return moves;
        }
        
        let checkKnightMoves=(knight)=> {
            let moves = [];
            let Knight = theGame.Pieces[knight.name];
            let rawMoves=[];
            if(theGame.boardCells[`C${Knight.x-2}${Knight.y-1}`]) { rawMoves.push([Knight.x-2,Knight.y-1]);}
            if(theGame.boardCells[`C${Knight.x+2}${Knight.y-1}`]) { rawMoves.push([Knight.x+2,Knight.y-1]);}
            if(theGame.boardCells[`C${Knight.x-2}${Knight.y+1}`]) { rawMoves.push([Knight.x-2,Knight.y+1]);}
            if(theGame.boardCells[`C${Knight.x+2}${Knight.y+1}`]) { rawMoves.push([Knight.x+2,Knight.y+1]);}
            if(theGame.boardCells[`C${Knight.x+1}${Knight.y-2}`]) { rawMoves.push([Knight.x+1,Knight.y-2]);}
            if(theGame.boardCells[`C${Knight.x+1}${Knight.y+2}`]) { rawMoves.push([Knight.x+1,Knight.y+2]);}
            if(theGame.boardCells[`C${Knight.x-1}${Knight.y-2}`]) { rawMoves.push([Knight.x-1,Knight.y-2]);}
            if(theGame.boardCells[`C${Knight.x-1}${Knight.y+2}`]) { rawMoves.push([Knight.x-1,Knight.y+2]);}
            rawMoves.filter(k=> {
                if(  theGame.boardCells[`C${k[0]}${k[1]}`].data.color!==Knight.color || theGame.boardCells[`C${k[0]}${k[1]}`].data===0 ) {
                    moves.push(k);
                }
            })
            return moves;   
        }
        let checkBishopMoves = (bishop,n) => {
            let moves = [];
            let Bishop = theGame.Pieces[bishop.name];
            if (n === undefined) {
                n = 7;
            } 
                    for(let a=1; a <= n;a++) {
                            let cell4h30 = theGame.boardCells[`C${Bishop.x+a}${Bishop.y+a}`] ;
                                if (cell4h30 && cell4h30.data===0) { 
                                    moves.push([Bishop.x+a,Bishop.y+a])}
                                else if (cell4h30 && cell4h30.data.color && cell4h30.data.color=== Bishop.color)    
                                    {break;   }
                                else if (cell4h30 && cell4h30.data.color && cell4h30.data.color!== Bishop.color)    
                                    {moves.push([Bishop.x+a,Bishop.y+a]) ; break;   }
                    }
                    for(let a=1; a <= n;a++) {
                        let cell7h30 = theGame.boardCells[`C${Bishop.x-a}${Bishop.y+a}`] ;
                            if (cell7h30 && cell7h30.data===0) { 
                                moves.push([Bishop.x-a,Bishop.y+a])}
                            else if (cell7h30 && cell7h30.data.color && cell7h30.data.color=== Bishop.color)    
                                {break;   }
                            else if (cell7h30 && cell7h30.data.color && cell7h30.data.color!== Bishop.color)    
                                {moves.push([Bishop.x-a,Bishop.y+a]) ; break;   }
                    }
                    for(let a=1; a <= n;a++) {
                        let cell1h30 = theGame.boardCells[`C${Bishop.x+a}${Bishop.y-a}`] ;
                            if (cell1h30 && cell1h30.data===0) { 
                                moves.push([Bishop.x+a,Bishop.y-a])}
                            else if (cell1h30 && cell1h30.data.color && cell1h30.data.color=== Bishop.color)    
                                {break;   }
                            else if (cell1h30 && cell1h30.data.color && cell1h30.data.color!== Bishop.color)    
                                {moves.push([Bishop.x+a,Bishop.y-a]) ; break;   }
                    }
                    for(let a=1; a <= n;a++) {
                        let cell10h30 = theGame.boardCells[`C${Bishop.x-a}${Bishop.y-a}`] ;
                            if (cell10h30 && cell10h30.data===0) { 
                                moves.push([Bishop.x-a,Bishop.y-a])}
                            else if (cell10h30 && cell10h30.data.color && cell10h30.data.color=== Bishop.color)    
                                {break;   }
                            else if (cell10h30 && cell10h30.data.color && cell10h30.data.color!== Bishop.color)    
                                {moves.push([Bishop.x-a,Bishop.y-a]) ; break;   }
                    }
        
            return moves; 
        }
        
        let checkQueenMoves = (queen)=> {
            let moves = [];
            let bishop = checkBishopMoves(queen);
            let rook = checkRookMoves(queen);
            moves = moves.concat(bishop,rook);
            return moves;
        }
        let checkKingMoves = (king)=> {
            let moves = [];
            let King = theGame.Pieces[king.name]
            moves = checkBishopMoves(king,1);
        
            // trai
                let trai = theGame.boardCells[`C${King.x-1}${King.y}`];
                if( trai && trai.data.color!==King.color|| trai && trai.data===0) {
                    moves.push([trai.x,trai.y]);
                    
                }
            
            // phai
                let phai = theGame.boardCells[`C${King.x+1}${King.y}`];
                if(phai && phai.data.color!==King.color || phai && phai.data===0) {
                    moves.push([phai.x,phai.y]); 
                }
            
            // tren
                let tren = theGame.boardCells[`C${King.x}${King.y-1}`];
                if(tren && tren.data.color!==King.color || tren && tren.data===0) {
                    moves.push([tren.x,tren.y]);   
                }
            
            //duoi
                let duoi = theGame.boardCells[`C${King.x}${King.y+1}`];
                if(duoi && duoi.data.color!==King.color || duoi&& duoi.data===0) {
                    moves.push([duoi.x,duoi.y]);
                    
                }
            
                return moves;
        
        }
        let possibleMoves = (data) => {
            let moves=[];
            if(theGame.Pieces[data.name])
                {if(theGame.Pieces[data.name].type==="Pawn") {
                    moves=checkPawnMoves(data);
                    
                }
                else if(theGame.Pieces[data.name].type==="Rook") {
                    moves=checkRookMoves(data);
                }
                else if(theGame.Pieces[data.name].type==="Knight") {
                    moves=checkKnightMoves(data);
                }
                else if(theGame.Pieces[data.name].type==="Bishop") {
                    moves=checkBishopMoves(data);
                }
                else if(theGame.Pieces[data.name].type==="Queen") {
                    moves=checkQueenMoves(data);
                }
                else if(theGame.Pieces[data.name].type==="King") {
                    moves=checkKingMoves(data);
                }
                else {console.log("wrong name");
                }}
            return moves;
        }
        let legalCheck = (data) => {
            let moves;
            console.log(`410 ${util.inspect(data, false, null)}`);
            
            if ((theGame.moveCounter===0 || theGame.moveCounter%2 ===0) && data.color==='white' )
                {moves = possibleMoves(data);}
            else if ( theGame.moveCounter%2 ===1 && data.color==='black' )
                {moves = possibleMoves(data);}
            else { moves = [] };
            console.log(`417 ${moves}`);
            
            for(let m = 0; m<moves.length ; m++) {
                if(data.nextX===moves[m][0] && data.nextY===moves[m][1] ) {
                    let c = theGame.boardCells[`C${data.nextX}${data.nextY}`].data;
                    if(c.color && c.color !== data.color) {
                        if (theGame.Pieces[`${c.name}`].type==='King') {
                            io.in(socket.myGame).emit('GameOver', c.color);
                            makeNewGame();
                        }
                        delete theGame.Pieces[`${c.name}`];
                    }
                    theGame.Pieces[data.name].x=data.nextX;
                    theGame.Pieces[data.name].y=data.nextY;
                    theGame.boardCells[`C${data.x}${data.y}`].data = 0;
                    theGame.boardCells[`C${data.nextX}${data.nextY}`].data = { color : data.color, name :data.name }  ; // data: { color:"black",name: "BlackKing" } }
                    theGame.moveCounter+=1;
                    return true;
                    break;
                }
            }
            return false;
            
        }
        //000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
        socket.on('picked',(data,fn)=>{

            if(data) {
                let a = possibleMoves(data);
                fn(a)
                }
        })
        socket.on('moved', function (data,fn) {
            
            if(data ) { 
                
                if(data.sender===socket.challenger && data.color === 'white' ){
                    
                    
                    if (legalCheck(data)) {
                    fn("Valid");
                    io.in(socket.myGame).emit('everyBodyMove', data);
                    }else
                    {fn("Invalid");}
                }
                else if(data.sender!==socket.challenger && data.color === 'black' ){
                    
                    if (legalCheck(data)) {
                        fn("Valid");
                        io.in(socket.myGame).emit('everyBodyMove', data);
                    }else
                    {fn("Invalid");}
                }
                else {
                    fn("Invalid");
                }
            }
            else {  fn("Invalid"); }
        });



    })
    socket.on('declined',(cha)=> {  // target reply
        io.to(`${mangUser[`${cha}`]}`).emit('challenge-status',{status :'declined',target : socket.Username });
    })




    socket.on('join-room',(target)=> {  // challenger join room
        socket.myGame = `${target}-${socket.Username}`;
        socket.challenger = `${socket.Username}`;
        socket.join(`${target}-${socket.Username}`);
        //socket.leave(`${mangUser[`${socket.Username}`]}`);

        // OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
        
        
        let theGame = RoomsList[`${target}-${socket.Username}`]; // challenger challengerID target targetID 
        //--------------------------------------------originBoardCells  o-riginPieces boardCells moveCounter

        var makeNewGame = () => {
            theGame.Pieces = theGame.originPieces;
            theGame.moveCounter = 0;
            theGame.boardCells = theGame.originBoardCells;
        }
        var checkPawnMoves = (pawn) => {  // tra ve cac o co the di duoc
            let moves = [];
            let Pawn = theGame.Pieces[pawn.name];
            if(Pawn.y!==0 && Pawn.y!==7) {
                if(Pawn.x===Pawn.originX && Pawn.y===Pawn.originY) {  // tot o vi tri ban dau
                    if(Pawn.color==="white") {
                        let trai = theGame.boardCells[`C${Pawn.x-1}${Pawn.y-1}`];
                        let giua = theGame.boardCells[`C${Pawn.x  }${Pawn.y-1}`];
                        let phai = theGame.boardCells[`C${Pawn.x+1}${Pawn.y-1}`];
                        let tren = theGame.boardCells[`C${Pawn.x  }${Pawn.y-2}`];
                        if( trai && trai.data.color==="black") {
                            moves.push([trai.x,trai.y])
                        }
                        if( giua && giua.data===0 ) {
                            moves.push([giua.x,giua.y])
                        }
                        if( phai && phai.data.color==="black") {
                            moves.push([phai.x,phai.y])
                        }
                        if( tren && tren.data===0 ) {
                            moves.push([tren.x,tren.y])
                        }
                    }
                    else {
                        
                        
                        let trai = theGame.boardCells[`C${Pawn.x-1}${Pawn.y+1}`];
                        let giua = theGame.boardCells[`C${Pawn.x  }${Pawn.y+1}`];
                        let phai = theGame.boardCells[`C${Pawn.x+1}${Pawn.y+1}`];
                        let tren = theGame.boardCells[`C${Pawn.x  }${Pawn.y+2}`];
                        if( trai && trai.data.color==="white") {
                            moves.push([trai.x,trai.y])
                        }
                        if( giua && giua.data===0 ) {
                            moves.push([giua.x,giua.y])
                        }
                        if( phai && phai.data.color==="white") {
                            moves.push([phai.x,phai.y])
                        }
                        if( tren && tren.data===0 ) {
                            moves.push([tren.x,tren.y])
                        }
                        
                    }
                }
                else {
                    if(Pawn.color==="white") {
                        let trai = theGame.boardCells[`C${Pawn.x-1}${Pawn.y-1}`];
                        let giua = theGame.boardCells[`C${Pawn.x  }${Pawn.y-1}`];
                        let phai = theGame.boardCells[`C${Pawn.x+1}${Pawn.y-1}`];
                        if( trai && trai.data.color==="black") {
                            moves.push([trai.x,trai.y])
                        }
                        if( giua && giua.data===0 ) {
                            moves.push([giua.x,giua.y])
                        }
                        if( phai && phai.data.color==="black") {
                            moves.push([phai.x,phai.y])
                        }
                    }
                    else {
                        let trai = theGame.boardCells[`C${Pawn.x-1}${Pawn.y+1}`];
                        let giua = theGame.boardCells[`C${Pawn.x  }${Pawn.y+1}`];
                        let phai = theGame.boardCells[`C${Pawn.x+1}${Pawn.y+1}`];
                        if( trai && trai.data.color==="white") {
                            moves.push([trai.x,trai.y])
                        }
                        if( giua && giua.data===0 ) {
                            moves.push([giua.x,giua.y])
                        }
                        if( phai && phai.data.color==="white") {
                            moves.push([phai.x,phai.y])
                        }
                        
                    }
                }
            }
            return moves;
        }
        
        var checkRookMoves = (rook) => {
            let moves = [];
            let Rook = theGame.Pieces[rook.name];
                    
                    
                for(let m = Rook.x-1; m>=0;m-- ) {  // trai
                    let trai = theGame.boardCells[`C${m}${Rook.y}`];
                    if(trai.data.color  && trai.data.color!==Rook.color) {
                        moves.push([trai.x,trai.y]);
                        break;
                    }
                    else if (trai && trai.data===0) {
                        moves.push([trai.x,trai.y]);
                    }
                    else {break;}
                }
                for(let m = Rook.x+1; m<8;m++ ) { // phai
                    let phai = theGame.boardCells[`C${m}${Rook.y}`];
                    
                    if(phai.data.color  && phai.data.color!==Rook.color) {
                        moves.push([phai.x,phai.y]);
                        break;
                    }
                    else if (phai && phai.data===0) {
                        moves.push([phai.x,phai.y]);
                    }
                    else {break;}
                }
                for(let m = Rook.y-1; m>=0;m = m-1 ) { // tren
        
                    let tren = theGame.boardCells[`C${Rook.x}${m}`];
                    if( tren.data.color  &&  tren.data.color!==Rook.color) {
                        moves.push([tren.x,tren.y]);
                        break;
                    }
                    else if (tren && tren.data===0) {
                        moves.push([tren.x,tren.y]);
                    }
                    else {break;}
                }
                for(let m = Rook.y+1; m < 8; m++ ) { //duoi
                    let duoi = theGame.boardCells[`C${Rook.x}${m}`];
                    if( duoi.data.color && duoi.data.color!==Rook.color) {
                        moves.push([duoi.x,duoi.y]);
                        break;
                    }
                    else if (duoi && duoi.data===0) {
                        moves.push([duoi.x,duoi.y]);
                    }
                    else {break;}
                }
                    
            return moves;
        }
        
        var checkKnightMoves=(knight)=> {
            let moves = [];
            let Knight = theGame.Pieces[knight.name];
            let rawMoves=[];
            if(theGame.boardCells[`C${Knight.x-2}${Knight.y-1}`]) { rawMoves.push([Knight.x-2,Knight.y-1]);}
            if(theGame.boardCells[`C${Knight.x+2}${Knight.y-1}`]) { rawMoves.push([Knight.x+2,Knight.y-1]);}
            if(theGame.boardCells[`C${Knight.x-2}${Knight.y+1}`]) { rawMoves.push([Knight.x-2,Knight.y+1]);}
            if(theGame.boardCells[`C${Knight.x+2}${Knight.y+1}`]) { rawMoves.push([Knight.x+2,Knight.y+1]);}
            if(theGame.boardCells[`C${Knight.x+1}${Knight.y-2}`]) { rawMoves.push([Knight.x+1,Knight.y-2]);}
            if(theGame.boardCells[`C${Knight.x+1}${Knight.y+2}`]) { rawMoves.push([Knight.x+1,Knight.y+2]);}
            if(theGame.boardCells[`C${Knight.x-1}${Knight.y-2}`]) { rawMoves.push([Knight.x-1,Knight.y-2]);}
            if(theGame.boardCells[`C${Knight.x-1}${Knight.y+2}`]) { rawMoves.push([Knight.x-1,Knight.y+2]);}
            rawMoves.filter(k=> {
                if(  theGame.boardCells[`C${k[0]}${k[1]}`].data.color!==Knight.color || theGame.boardCells[`C${k[0]}${k[1]}`].data===0 ) {
                    moves.push(k);
                }
            })
            return moves;   
        }
        var checkBishopMoves = (bishop,n) => {
            let moves = [];
            let Bishop = theGame.Pieces[bishop.name];
            if (n === undefined) {
                n = 7;
            } 
                    for(let a=1; a <= n;a++) {
                            let cell4h30 = theGame.boardCells[`C${Bishop.x+a}${Bishop.y+a}`] ;
                                if (cell4h30 && cell4h30.data===0) { 
                                    moves.push([Bishop.x+a,Bishop.y+a])}
                                else if (cell4h30 && cell4h30.data.color && cell4h30.data.color=== Bishop.color)    
                                    {break;   }
                                else if (cell4h30 && cell4h30.data.color && cell4h30.data.color!== Bishop.color)    
                                    {moves.push([Bishop.x+a,Bishop.y+a]) ; break;   }
                    }
                    for(let a=1; a <= n;a++) {
                        let cell7h30 = theGame.boardCells[`C${Bishop.x-a}${Bishop.y+a}`] ;
                            if (cell7h30 && cell7h30.data===0) { 
                                moves.push([Bishop.x-a,Bishop.y+a])}
                            else if (cell7h30 && cell7h30.data.color && cell7h30.data.color=== Bishop.color)    
                                {break;   }
                            else if (cell7h30 && cell7h30.data.color && cell7h30.data.color!== Bishop.color)    
                                {moves.push([Bishop.x-a,Bishop.y+a]) ; break;   }
                    }
                    for(let a=1; a <= n;a++) {
                        let cell1h30 = theGame.boardCells[`C${Bishop.x+a}${Bishop.y-a}`] ;
                            if (cell1h30 && cell1h30.data===0) { 
                                moves.push([Bishop.x+a,Bishop.y-a])}
                            else if (cell1h30 && cell1h30.data.color && cell1h30.data.color=== Bishop.color)    
                                {break;   }
                            else if (cell1h30 && cell1h30.data.color && cell1h30.data.color!== Bishop.color)    
                                {moves.push([Bishop.x+a,Bishop.y-a]) ; break;   }
                    }
                    for(let a=1; a <= n;a++) {
                        let cell10h30 = theGame.boardCells[`C${Bishop.x-a}${Bishop.y-a}`] ;
                            if (cell10h30 && cell10h30.data===0) { 
                                moves.push([Bishop.x-a,Bishop.y-a])}
                            else if (cell10h30 && cell10h30.data.color && cell10h30.data.color=== Bishop.color)    
                                {break;   }
                            else if (cell10h30 && cell10h30.data.color && cell10h30.data.color!== Bishop.color)    
                                {moves.push([Bishop.x-a,Bishop.y-a]) ; break;   }
                    }
        
            return moves; 
        }
        
        var checkQueenMoves = (queen)=> {
            let moves = [];
            let bishop = checkBishopMoves(queen);
            let rook = checkRookMoves(queen);
            moves = moves.concat(bishop,rook);
            return moves;
        }
        var checkKingMoves = (king)=> {
            let moves = [];
            let King = theGame.Pieces[king.name]
            moves = checkBishopMoves(king,1);
        
            // trai
                let trai = theGame.boardCells[`C${King.x-1}${King.y}`];
                if( trai && trai.data.color!==King.color|| trai && trai.data===0) {
                    moves.push([trai.x,trai.y]);
                    
                }
            
            // phai
                let phai = theGame.boardCells[`C${King.x+1}${King.y}`];
                if(phai && phai.data.color!==King.color || phai && phai.data===0) {
                    moves.push([phai.x,phai.y]); 
                }
            
            // tren
                let tren = theGame.boardCells[`C${King.x}${King.y-1}`];
                if(tren && tren.data.color!==King.color || tren && tren.data===0) {
                    moves.push([tren.x,tren.y]);   
                }
            
            //duoi
                let duoi = theGame.boardCells[`C${King.x}${King.y+1}`];
                if(duoi && duoi.data.color!==King.color || duoi&& duoi.data===0) {
                    moves.push([duoi.x,duoi.y]);
                    
                }
            
                return moves;
        
        }
        var possibleMoves = (data) => {
            let moves=[];
            if(theGame.Pieces[data.name])
                {if(theGame.Pieces[data.name].type==="Pawn") {
                    moves=checkPawnMoves(data);
                    
                }
                else if(theGame.Pieces[data.name].type==="Rook") {
                    moves=checkRookMoves(data);
                }
                else if(theGame.Pieces[data.name].type==="Knight") {
                    moves=checkKnightMoves(data);
                }
                else if(theGame.Pieces[data.name].type==="Bishop") {
                    moves=checkBishopMoves(data);
                }
                else if(theGame.Pieces[data.name].type==="Queen") {
                    moves=checkQueenMoves(data);
                }
                else if(theGame.Pieces[data.name].type==="King") {
                    moves=checkKingMoves(data);
                }
                else {console.log("wrong name");
                }}
            return moves;
        }
        var legalCheck = (data) => {
            let moves;

            if ((theGame.moveCounter===0 || theGame.moveCounter%2 ===0) && data.color==='white' )
                {moves = possibleMoves(data);}
            else if ( theGame.moveCounter%2 ===1 && data.color==='black' )
                {moves = possibleMoves(data);}
            else { moves = [] };
            console.log(`813 ${moves}`);
            
            for(let m = 0; m<moves.length ; m++) {
                if(data.nextX===moves[m][0] && data.nextY===moves[m][1] ) {
                    let c = theGame.boardCells[`C${data.nextX}${data.nextY}`].data;
                    console.log(c);
                    
                    if(c.color && c.color !== data.color) {
                        if (theGame.Pieces[`${c.name}`].type==='King') {
                            io.in(socket.myGame).emit('GameOver', socket.Username);
                            makeNewGame();
                            return false;
                        }
                        delete theGame.Pieces[`${c.name}`];
                    }
                    theGame.Pieces[data.name].x=data.nextX;
                    theGame.Pieces[data.name].y=data.nextY;
                    theGame.boardCells[`C${data.x}${data.y}`].data = 0;
                    theGame.boardCells[`C${data.nextX}${data.nextY}`].data = { color : data.color, name :data.name }  ; // data: { color:"black",name: "BlackKing" } }
                    theGame.moveCounter+=1;
                    console.log(theGame.moveCounter);
                    
                    return true;
                    break;
                }
            }
            return false;
        
        }
        //00000000000000000000000000000000000000000000000000000000000000000000000000000000000
        socket.on('picked',(data,fn)=>{

            if(data) {
                let a = possibleMoves(data);
                fn(a)
                }
        })
        socket.on('moved', function (data,fn) {
            if(data ) { 
                if(data.sender===socket.challenger && data.color === 'white' ){
                    
                    if ( legalCheck(data)===true) {
                        fn("Valid");
                        console.log('853 vao valid');
                        
                        io.in(socket.myGame).emit('everyBodyMove', data);
                    }else
                    { console.log('vao invalid');
                    
                        fn("Invalid");}
                }
                else if(data.sender!==socket.challenger && data.color === 'black' ){
                    if (legalCheck(data)) {
                    fn("Valid");
                    io.in(socket.myGame).emit('everyBodyMove', data);
                    }else
                    {fn("Invalid");}
                }
                else {
                    fn("Invalid");
                }
            }
            else {  fn("Invalid"); }
        });

    })
    

 
    // -----------chess-end------------------------------------

    socket.on('disconnect', function () {

        delete mangUser[`${socket.Username}`] ;       
        socket.broadcast.emit("danh-sach-dang-online",mangUser);
    });


});

app.get("/", function(req,res) {
    res.render('trangchu');
});

