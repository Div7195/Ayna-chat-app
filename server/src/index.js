"use strict";
const cors = require('cors');
const ioo = require("socket.io");
module.exports = {
  
  register({ strapi }) {},
 
  bootstrap( { strapi } ) {
    
    // var io = ioo(strapi.server.httpServer, {
    //   cors: { 
    //     origin: "http://localhost:3000",
    //     methods: ["GET", "POST", "PUT"],
    //     credentials: true,
    //   },
    // });
    // io.on("connection", function (socket) { 
    //   socket.on("joinroom", (room) => {
    //       socket.room = room
    //       socket.join(room);
    //       console.log("User Joined Room: " + room);
    //       console.log('socket id is' + socket.id)
          
    //   });
    //   socket.on("sendMessage", async (data) => { 
    //     console.log(data)
    //     let strapiData1 = { 
    //       data: {
    //         senderRole:'user',
    //         body:data.query.body,
    //         chat:parseInt(data.query.chat)
    //       },
    //     };
    //     let strapiData2 = { 
    //       data: {
    //         senderRole:'server',
    //         body:data.query.body,
    //         chat:parseInt(data.query.chat)
    //       },
    //     };
    //     var axios = require("axios");
    //     await axios
    //       .post(`http://localhost:8000/api/messages`, strapiData1)
    //       .then((e) => {
            
    //         console.log(data.query.chat)
    //         io.to(data.query.chat).emit('message', strapiData1);
    //       })
    //       .catch((e) => console.log("error", e.message));

    //       await axios
    //       .post(`http://localhost:8000/api/messages`, strapiData2)
    //       .then((e) => {
            
    //         io.to(data.query.chat).emit('message', strapiData2);
    //       })
    //       .catch((e) => console.log("error", e.message));
    //   });
    // });
  },
};