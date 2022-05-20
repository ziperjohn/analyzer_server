const WebSocket = require("ws");
const DataService = require("./dataService");

const wss = new WebSocket.Server({ port: 8082 });
const key = "123456789"; // Analyzer key
const timeInterval = 5000; // refrech interval 5s

wss.on("connection", (ws, req) => {
  // Save client data to ws object
  ws.uuid = req.headers["sec-websocket-key"];
  ws.isKeyVerified = false;
  ws.selectedPort = null;

  console.log(`Client ${ws.uuid} connected!`);

  const sendData = () =>
    ws.send(
      JSON.stringify(
        DataService.createFakeData(ws.isKeyVerified, ws.selectedPort, true)
      )
    );

  var interval = setInterval(sendData, timeInterval);

  ws.on("message", (message) => {
    var data = JSON.parse(message);

    // keys dont match => send to app isKeyVerified: false, and terminate connection
    if (data.key !== key) {
      ws.send(JSON.stringify(DataService.createEmptyData()));
      ws.terminate();
      return;
    } else if (ws.selectedPort != data.selectedPort) {
      ws.selectedPort = data.selectedPort;
      ws.isKeyVerified = true;

      ws.send(
        JSON.stringify(
          DataService.createFakeData(ws.isKeyVerified, ws.selectedPort, false)
        )
      );
      console.log("Port dont match");
    } else {
      ws.selectedPort = data.selectedPort;
      ws.isKeyVerified = true;

      ws.send(
        JSON.stringify(
          DataService.createFakeData(ws.isKeyVerified, ws.selectedPort, true)
        )
      );
      console.log("Port match");
    }

    // Keys match => send data to app
  });

  ws.on("error", () => {
    console.log("ERROR!");
  });

  // Connection closed => set isKeyVerified to false and clear interval
  ws.on("close", () => {
    console.log(`Client ${ws.uuid} disconnected!`);
    isKeyVerified = false;
    clearInterval(interval);
  });
});
