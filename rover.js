const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110) {  //takes position, mode and generatorWatts have defaults, 
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   receiveMessage(message) {
      // message = class message extends Message {
      //    constructor() {
      //       super()
      //    }
      // }
     let output;
     let roverStatus = new Rover(this.position);
   
      // if (message.commands === 'MOVE') {
      //    this.position = message.commands.value;
      //    output["message"] = message.name;
      //    output["results"] = {completed: true};
      //    //return output;
      // } else if (message.commands[1].commandType === 'STATUS_CHECK') {
      //    output['message'] = message.name;
      //    output['results'] = message.commands;
      //    //return output;
      // } else if (message.commands === 'MODE_CHANGE' && this.mode === 'LOW_POWER') {
      //    output['message'] = message.name;
      //    output['results'] = message.commands;
      //    //return output;
      // } else if (message.commands === 'MODE_CHANGE' && this.mode === 'NORMAL') {
      //    output['message'] = message.name;
      //    output['results'] = message.commands;
      //    //return output;
      // }
      // return output;
   }
}
// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
// let message = new Message('Test message with two commands', commands);
// let rover = new Rover(98382);    // Passes 98382 as the rover's position.
// let response = rover.receiveMessage(message);

// console.log(response);
// console.log(message.commands[1].commandType); //isolates commandType
// console.log(message.name)

module.exports = Rover;