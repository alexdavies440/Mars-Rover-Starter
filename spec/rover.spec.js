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
  test1("constructor sets position and default values for mode and generatorWatts", function() {
    expect(rover.position).toEqual(98382);
    expect(rover.generatorWatts).toEqual(110);
  });
  test2("response returned by receiveMessage contains the name of the message", function() {
    expect(rover.receiveMessage(message).message).toEqual('Test message with two commands'); 
  });
  test3("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    expect(rover.receiveMessage(message).results.length).toEqual(2); 
  });
  
  
  test4("responds correctly to the status check command", function() {
   
  }); 
  test5("responds correctly to the mode change command", function() {
    
  });
  
  test6("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    
  });


  it("responds with the position for the move command", function() {
      
  });
});
