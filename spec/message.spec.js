const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function () {
    // EXAMPLES TO PULL FROM:
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);

    it("TEST 4: Throws error if a name is NOT passed into the constructor as the first parameter", function () {
        expect(function () { new Message(); }).toThrow(new Error("name required."));
    });
    it("TEST 5: constructor sets name", function () {
        expect(message.name).toEqual('Test message with two commands');
    });
    it("TEST 6: contains a commands array passed into the constructor as the 2nd argument", function () {
        expect(message.commands).toEqual([new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]);
    });
});
