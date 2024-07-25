const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {
  // EXAMPLES TO PULL FROM: 
  let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
  let moveCommand = new Command('MOVE', 12000);
  // TEST 1
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error("Command type required."));
  });  
  // TEST 2     
  it("constructor sets command type", function() {
    expect(modeCommand.commandType).toEqual('MODE_CHANGE');
  });
  // TEST 3
  it("constructor sets a value passed in as the 2nd argument", function() {
    expect(moveCommand.value).toEqual(12000);
  });
  });