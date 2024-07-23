const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position) {  //Might only take position, other values probably come from message and commands?, 
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      this.position = position;
   }
   receiveMessage(messageInput) {
     let message = messageInput.name;
     let action = {completed: false}
     let roverStatus = {};
     let results = [];
     let response = {}

     for (let i = 0; i < messageInput.commands.length; i++) {
      if (messageInput.commands[i].commandType === 'MOVE' && this.mode !== 'LOW_POWER') {
         this.position = messageInput.commands[i].value;
         action.completed = true 
         results.push(action)
      }
      else if (messageInput.commands[i].commandType === 'MOVE' && this.mode == 'LOW_POWER') {
         action.completed = false; 
         results.push(action)
      }
      else if (messageInput.commands[i].commandType === 'MODE_CHANGE') {
         let modes = ['NORMAL', 'LOW_POWER'];
         let dichotamy = (modes.indexOf(this.mode) + 3) % 2
         this.mode = modes[dichotamy]
         action.completed = true; 
         results.push(action)
      }
      else if (messageInput.commands[i].commandType === 'STATUS_CHECK') {
         roverStatus.mode = this.mode;
         roverStatus.generatorWatts = this.generatorWatts;
         roverStatus.position = this.position;
         action.completed = true; 
         results.push(action)
         results.roverStatus = roverStatus;
      }
     }

     response.message = message;
     response.results = results;
      return response;
   }
}
//let commands = 
let message = new Message('a message', [new Command('STATUS_CHECK'), new Command('MOVE', 888)])
let message2 = new Message('a message', [new Command('STATUS_CHECK'), new Command('MOVE', 555)])
let test = new Rover(123);
console.log(test.receiveMessage(message));
console.log(test.receiveMessage(message2))
//console.log(test)

//IN CASE I END UP NEEDING THIS...

//   class Response {
//    constructor(returnMessage, results) {
//       this.returnMessage = returnMessage;
//       this.results = results;
//    }
// }

module.exports = Rover;