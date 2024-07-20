class Rover {
   constructor(position, mode, generatorWatts = 110) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = generatorWatts;
   }
   receiveMessage(message) {
      message = {}
      
   }
}

module.exports = Rover;