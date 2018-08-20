
var socket = io("http://localhost:3000");
function myFunction() {
        
    
}

$(document).ready(function() {
    $(".loginForm").show();
    $(".chatForm").hide();
    $("#btnRegister").click(function() {
        socket.emit("client-send-username", $("#txtUsername").val() );
    });
    socket.on("server-send-dangky-thanhcong", function(data) {
        $(".loginForm").hide(2000);
        $(".chatForm").show(1000);
        $("#currentUser").html(data);
   
    });

    $(".challengeButton").click(function() {
        console.log('clicked btnChallenge');
        // socket.emit("challenging",{challenger : data, targetID :  $(this).attr("name") });
        
    });
    //var Chlgbtn = document.getElementsByClassName("challengeButton");

    // Chlgbtn.onclick= function() {
    //     myFunction();
    // }


    // $(".challengeButton").hide(5000);

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
    console.log(mangUser);
    
    for(i in mangUser) {
        $("#boxContent").append(`<div class='userOnline'> <h5>${i}</h5> <button name='${i}' id='${mangUser[i]}' class='challengeButton'  >Challenge</button> </div>`);
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
    if(window.confirm(`${data.challenger} challenge you to a game !`))
    {
        socket.emit('accepted');
    }
    else{
        socket.emit('declined')
    }

});

socket.on('challenge-status',(data)=>{
    if(data==='accepted') {
        alert('Your opponent accepted the challenge')
    }
    else {
        alert('Your opponent declined the challenge')
    }
})

//<div class="userOnline">Teo Nguyen</div>