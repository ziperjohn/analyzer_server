const fs = require("fs");
const otdrDump = require("./OTDR/otdr11-dump.json");
const otdr = require("./OTDR/otdr11.json");

const samples = 500;

const average = () => {
  let result = {};
  let cycles = Math.floor(otdr.length / samples);
  let otdrData = [];
  let num = 0;
  let fristIndex = 1;
  let lastIndex = cycles + 1;

  let info = {
    maxX: 0,
    maxY: 0,
    minY: 0,
  };

  otdrData.push(otdr[0]);

  for (var c = 0; c < samples; c++) {
    for (var i = fristIndex; i <= lastIndex; i++) {
      num += otdr[i].power;
    }

    result = {};
    result.distance = parseFloat(otdr[lastIndex].distance.toFixed(2));
    result.power = parseFloat((num / cycles).toFixed(2));

    if (result.power > info.maxY) info.maxY = result.power;
    if (result.power < info.minY) info.minY = result.power;

    fristIndex += cycles;
    lastIndex += cycles;
    num = 0;

    otdrData.push(result);
  }

  info.maxX = otdrData[otdrData.length - 1].distance;

  otdrdata = {
    genParams: otdrDump.GenParams,
    fxdParams: otdrDump.FxdParams,
    keyEvents: otdrDump.KeyEvents,
    chart: {
      info: info,
      otdrData: otdrData,
    },
  };

  let data = JSON.stringify(otdrdata);

  fs.writeFile("otdr11.json", data, (err) => {
    if (err) throw err;
    console.log("data write to file");
  });
};

module.exports = {
  average,
};
