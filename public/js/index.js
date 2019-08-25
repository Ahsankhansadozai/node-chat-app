var socket = io();
socket.on("connect", function() {
  console.log("Connected to server");
  socket.on("disconnect", function() {
    console.log("Connection down");
  });

  socket.on("newMessage", function(message) {
    console.log("newMessage", message);

    var li = jQuery("<li></li>");
    li.text(`${message.from} : ${message.text}`);

    jQuery("#messages").append(li);
  });
});

socket.on("newEmail", function(email) {
  console.log("new Email", email);
});

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "user",
      text: jQuery("[name=message]").val()
    },
    function() {}
  );
});
