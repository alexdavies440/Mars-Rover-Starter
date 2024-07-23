const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position) {  //Might only take position, other values probably come from message and commands?, 
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      this.position = position;
   }
   receiveMessage(message) {
      let returnMessage = message.name;
      let results = [];
      let roverStatus = new Rover();
      let response = {};
      response.returnMessage = returnMessage;
         if ('STATUS_CHECK') {  //for some reaon this is not finding this true
            results.completed = true;
            results.roverStatus = roverStatus;
         }
      response.results = results;
      return response;
   }
}
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);

  let command3 = [new Command('STATUS_CHECK')]
  let message3 = new Message('check status', command3)

  console.log(rover.receiveMessage(message3));


//IN CASE I END UP NEEDING THIS...

//   class Response {
//    constructor(returnMessage, results) {
//       this.returnMessage = returnMessage;
//       this.results = results;
//    }
// }

module.exports = Rover;