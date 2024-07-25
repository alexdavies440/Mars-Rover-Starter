const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position) {  //Might only take position, other values probably come from message and commands?, 
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      this.position = position;
   }
   receiveMessage(messageInput) {
     //let message = messageInput.name;
     //let action = {completed: undefined}
     
     //let roverStatus = {};
     let results = [];
     let completed = {}
     

     for (let i = 0; i < messageInput.commands.length; i++) {

      if (messageInput.commands[i].commandType === 'MODE_CHANGE' && messageInput.commands[i].value === 'NORMAL') {
        
         this.mode = messageInput.commands[i].value;

      }
      else if (messageInput.commands[i].commandType === 'MOVE' && this.mode === 'NORMAL') { 
         
         this.position = messageInput.commands[i].value;

      }
      else if (messageInput.commands[i].commandType === 'MOVE' && this.mode == 'LOW_POWER') { 
      }
      else if (messageInput.commands[i].commandType === 'STATUS_CHECK') {
         
      }
   
     }
     let response = {
      message: messageInput.name,
      results: [completed]
     };

     return response;
   }
}

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log(response);

module.exports = Rover;