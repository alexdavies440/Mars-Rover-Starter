const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  //EXAMPLES TO PULL FROM:
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
  
  it("TEST 7: constructor sets position and default values for mode and generatorWatts", function() {
    expect(rover.position).toEqual(98382);
    expect(rover.generatorWatts).toEqual(110);
  });
  it("TEST 8: response returned by receiveMessage contains the name of the message", function() {
    expect(rover.receiveMessage(message).message).toEqual('Test message with two commands'); 
  });
  it("TEST 9: response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    expect(rover.receiveMessage(message).results.length).toEqual(2); 
  });
  it("TEST 10: responds correctly to the status check command", function() {
    let statusCommand = [new Command('STATUS_CHECK')];
    let statusMessage = new Message('Check status', statusCommand);
    let rover = new Rover(222);
    let response = rover.receiveMessage(statusMessage)
    expect(response).toEqual({
      message: 'Check status',
      results: [
         {
            completed: true, 
            roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 222 }
         }
      ]
   })
  }); 
  it("TEST 11: responds correctly to the mode change command", function() {

    let modeCommand = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message2 = new Message('Change mode to LOW_POWER', modeCommand);
    rover.receiveMessage(message2);
    
    expect(rover.mode).toEqual('LOW_POWER');
    expect(rover.receiveMessage(message2)).toEqual({
      message: 'Change mode to LOW_POWER',
      results: [
        {completed: true}
      ]
    })
  });
  it("TEST 12: responds with a false completed value when attempting to move in LOW_POWER mode", function() {

    let moveCommand = [new Command('MOVE', 123)]
    let message3 = new Message('Try to move', moveCommand)
    let response = rover.receiveMessage(message3);
    expect(rover.mode).toEqual('LOW_POWER');
    expect(response).toEqual({
      message: 'Try to move',
      results: [
        {
          completed: false
        }
      ]
    })
  });
  it("TEST 13: responds with the position for the move command", function() {

    let rover = new Rover(98382); // STARTING POSITION 
    let moveCommand = [new Command('CHANGE_MODE', 'NORMAL'), new Command('MOVE', 123)]; //ENDING POSITION
    let message4 = new Message('Try to move', moveCommand);
    rover.receiveMessage(message4);
    
    expect(rover.receiveMessage(message4)).toEqual({
      message: 'Try to move',
      results: [
        {
          completed: true
        }
      ]
    })
    expect(rover.position).toEqual(123);

  });
});