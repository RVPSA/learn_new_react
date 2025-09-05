// import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import WaitingRoom from "./Components/WaitingRoom";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatRoom from "./Components/ChatRoom";

function App() {
  const [connection, setconnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatRoom) => {
    try {
      //Initiate Connection
      const conn = new HubConnectionBuilder()
        .withUrl("https://localhost:44355/chat")
        .configureLogging(LogLevel.Information)
        .build();

      //Setup handler
      conn.on("ReceiveMessage", (username, msg) => {
        console.log("Message ", msg);
        //setMessages((messages) => [...messages, { username, msg }]);
      });

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages((messages) => [...messages, { username, msg }]);
        console.log(messages);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", { username, chatRoom });

      setconnection(conn);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message)=>{
    try{
      await connection.invoke("SendMessage",message)
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <>
      <Container>
        <Row className="px-5 my-5">
          <Col sm="12">
            <h1 className="font-weight-light">Welcome to the F1 Chat App</h1>
          </Col>
        </Row>
        {!connection ? (
          <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
        ) : (
          <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
        )}
      </Container>
    </>
  );
}

export default App;
