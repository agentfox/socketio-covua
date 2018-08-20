var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set('view engine', 'ejs');
app.set("views","./views")
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUser = {};

io.on("connection", function(socket) {
    console.log('da ket noi voi ' + socket.id);
    console.log(socket.adapter.rooms);
    
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
    //------------chess ----------------------------------------
    socket.on('challenging',(data)=>{
        console.log(` da len server ${data}`);
        
        io.to(`${data.targetID}`).emit('wanna-fight', {challenger : data.challenger });
        socket.on('accepted',()=> {
            socket.emit('challenge-status','accepted');
        })
        socket.on('declined',()=> {
            socket.emit('challenge-status','declined')
        })
    })
    

    // -----------chess-end------------------------------------
    socket.on('disconnect', function () {
        socket.broadcast.emit("no-dung-go-chu",socket.Username);
    });



});

app.get("/", function(req,res) {
    res.render('trangchu');
});