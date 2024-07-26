const Command = require('../command.js');

describe("Command class", function () {

  it("TEST 1: throws error if command type is NOT passed into constructor as the first parameter", function () {
    expect(function () { new Command(); }).toThrow(new Error("Command type required."));
  });
  it("TEST 2: constructor sets command type", function () {
    let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
    expect(modeCommand.commandType).toEqual('MODE_CHANGE');
  });
  it("TEST 3: constructor sets a value passed in as the 2nd argument", function () {
    let moveCommand = new Command('MOVE', 12000);
    expect(moveCommand.value).toEqual(12000);
  });
});