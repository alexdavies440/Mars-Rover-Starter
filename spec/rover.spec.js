const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
  
//console.log(response);
  it("constructor sets position and default values for mode and generatorWatts", function() {
    expect(rover.position).toEqual(98382);
    expect(rover.generatorWatts).toEqual(110);
  });
  it("response returned by receiveMessage contains the name of the message", function() {
    expect(rover.receiveMessage(message).memo).toEqual('Test message with two commands'); 
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    expect(rover.receiveMessage(message).results.length).toEqual(2); 
  });
  // it("responds correctly to the status check command", function() {
  //   expect(response).toEqual(rover.receiveMessage(message));            //May come back to this one...
  // });
  let command3 = [new Command('STATUS_CHECK')]
  let message3 = new Message('check status', command3)
  it("responds correctly to the status check command", function() {
    if (message3.commands.commandType === "STATUS_CHECK") {
      expect(rover.receiveMessage(message3)).toBe({completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 98382}});
    }
  }); //may come back to this one
  let command2 = new Command('MODE_CHANGE', 'NORMAL')
  it("responds correctly to the mode change command", function() {
    expect(rover.receiveMessage('test message',command2)).toEqual("{completed: true}")
  });
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    expect(rover.receiveMessage(message)).toEqual("{completed: false}")
  });

let moveCommand = new Command('MOVE', 12000);
let message2 = new Message('Move to position 12000', moveCommand);
  it("responds with the position for the move command", function() {
    if (rover.receiveMessage(message2)) {
      expect(rover.position).toEqual(12000);
    }
  });
});
