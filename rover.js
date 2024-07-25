const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position) {  //Might only take position, other values probably come from message and commands?, 
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      this.position = position;
   }
   receiveMessage(messageInput) {
      let results = [];
     //let roverStatus;
     
     for (let i = 0; i < messageInput.commands.length; i++) {
      let actionResult = {completed: false};
      if (messageInput.commands[i].commandType === 'MODE_CHANGE') {
         this.mode = messageInput.commands[i].value;
         actionResult = {
            completed: true
         }
         results.push(actionResult);
      }
      else if (messageInput.commands[i].commandType === 'MOVE' && this.mode === 'NORMAL') { 
         this.position = messageInput.commands[i].value;
         actionResult = {
            completed: true
         }
         results.push(actionResult);

      }
      else if (messageInput.commands[i].commandType === 'MOVE' && this.mode == 'LOW_POWER') { 
         actionResult = {
            completed: false
         }
         results.push(actionResult);
      }
      else if (messageInput.commands[i].commandType === 'STATUS_CHECK') {
            actionResult = {
               completed: true,
               roverStatus: { 
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            }
            results.push(actionResult);
      }

      // results.push(actionResult.completed)
      // results.push(actionResult.roverStatus)
   //     let response = {
   //    message: messageInput.name,
   //    results: results
   //   };
      //results.push(actionResult)
     }
     let response = {
      message: messageInput.name,
      results: results
     };
     
     return response;
   }
}

// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
// let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.





let moveCommand = [new Command('CHANGE_MODE', 'NORMAL'), new Command('MOVE', 123)];
let message4 = new Message('Try to move', moveCommand);
rover.receiveMessage(message4);
let response = rover.receiveMessage(message4);

console.log(rover.position);

module.exports = Rover;