var socket = io();
socket.on("connect", function() {
  console.log("Connected to server");

  socket.emit("createMessage", {
    from: "ahsan@gmail.com",
    text: " hi, how are you"
  });

  socket.on("newMessage", function(message) {
    console.log("newMessage", message);
  });
});

socket.on("disconnect", function() {
  console.log("Connection down");
});

socket.on("newEmail", function(email) {
  console.log("new Email", email);
});
