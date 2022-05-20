const otdr1 = require("./OTDR/otdr1.json");
const otdr2 = require("./OTDR/otdr2.json");
const otdr3 = require("./OTDR/otdr3.json");
const otdr4 = require("./OTDR/otdr4.json");
const otdr5 = require("./OTDR/otdr5.json");
const otdr6 = require("./OTDR/otdr6.json");
const otdr7 = require("./OTDR/otdr7.json");
const otdr8 = require("./OTDR/otdr8.json");
const otdr9 = require("./OTDR/otdr9.json");
const otdr10 = require("./OTDR/otdr10.json");

const portStatusList = ["ON", "ECHO", "OFF", "ERROR"]; // Analyzer port state
const fwVersion = "0.1.0"; // Analyzer firmware version

let oldPortList = [
  { id: 0, status: "ON" },
  { id: 1, status: "ON" },
  { id: 2, status: "ECHO" },
  { id: 3, status: "ON" },
  { id: 4, status: "ECHO" },
  { id: 5, status: "ON" },
  { id: 6, status: "ON" },
  { id: 7, status: "ON" },
  { id: 8, status: "ON" },
  { id: 9, status: "ON" },
  { id: 10, status: "ERROR" },
  { id: 11, status: "ERROR" },
  { id: 12, status: "OFF" },
  { id: 13, status: "ERROR" },
  { id: 14, status: "OFF" },
  { id: 15, status: "OFF" },
  { id: 16, status: "OFF" },
  { id: 17, status: "ERROR" },
  { id: 18, status: "OFF" },
  { id: 19, status: "OFF" },
];

const portListSecondPart = [
  { id: 10, status: "ERROR" },
  { id: 11, status: "ERROR" },
  { id: 12, status: "OFF" },
  { id: 13, status: "ERROR" },
  { id: 14, status: "OFF" },
  { id: 15, status: "OFF" },
  { id: 16, status: "OFF" },
  { id: 17, status: "ERROR" },
  { id: 18, status: "OFF" },
  { id: 19, status: "OFF" },
];

const getRandomInt = () => {
  return Math.floor(Math.random() * 2);
};

const getRandomFloat = () => {
  return (Math.random() * (50 - 5) + 5).toFixed(2) * -1.0;
};

const getOTDRdataFromFile = (selectedPort) => {
  switch (selectedPort) {
    case 0:
      return otdr1;
    case 1:
      return otdr2;
    case 2:
      return otdr3;
    case 3:
      return otdr4;
    case 4:
      return otdr5;
    case 5:
      return otdr6;
    case 6:
      return otdr7;
    case 7:
      return otdr8;
    case 8:
      return otdr9;
    case 9:
      return otdr10;
    default:
      return [];
  }
};

const createEmptyData = () => {
  return {
    isKeyVerified: false,
    fwVersion: "0.0.0",
    portList: [],
    pointList: [],
    eventList: [],
    info: {},
  };
};

const createFakeData = (isKeyVerified, selectedPort, sendNewPortList) => {
  const newPortList = [];

  for (let i = 0; i < 10; i++) {
    newPortList.push({
      id: i,
      status: portStatusList[getRandomInt()],
      // status: portStatusTestList[i],
    });
  }

  newPortList.push(...portListSecondPart);

  if (sendNewPortList) {
    oldPortList = newPortList;
  }

  var otdr = getOTDRdataFromFile(selectedPort);

  var data = {
    isKeyVerified: isKeyVerified,
    fwVersion: fwVersion,
    portList: sendNewPortList ? newPortList : oldPortList,
    pointList: selectedPort == null ? [] : otdr.pointList,
    eventList: selectedPort == null ? [] : otdr.eventList,
    info: selectedPort == null ? {} : otdr.info,
  };

  return data;
};

module.exports = {
  createFakeData,
  createEmptyData,
};
