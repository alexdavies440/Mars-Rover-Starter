const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position) {
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      this.position = position;
   }
   receiveMessage(messageInput) { //Parameter name change to avoid confusion with response.message and Message class

      let response = {
         message: messageInput.name,
         results: []
      };

      for (let i = 0; i < messageInput.commands.length; i++) {
         if (messageInput.commands[i].commandType === 'MODE_CHANGE') {
            this.mode = messageInput.commands[i].value;
            let actionResult = {
               completed: true
            }
            response.results.push(actionResult);
         }
         else if (messageInput.commands[i].commandType === 'MOVE' && this.mode === 'NORMAL') {
            this.position = messageInput.commands[i].value;
            let actionResult = {
               completed: true
            }
            response.results.push(actionResult);

         }
         else if (messageInput.commands[i].commandType === 'MOVE' && this.mode == 'LOW_POWER') {
            let actionResult = {
               completed: false
            }
            response.results.push(actionResult);
         }
         else if (messageInput.commands[i].commandType === 'STATUS_CHECK') {
            let actionResult = {
               completed: true,
               roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position }
            }
            response.results.push(actionResult);
         }
      }
      return response;
   }
}

module.exports = Rover;