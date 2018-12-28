var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");

module.exports.loop = function() {

  for ( let name in Memory.creeps ) {
    if ( Game.creeps[name] === undefined ) {
      delete Memory.creeps[name];
    }
  }

  for (let name in Game.creeps) {

    var creep = Game.creeps[name];

    if ( creep.memory.role === "harvester" ) {
      roleHarvester.run(creep);
    } else if ( creep.memory.role === "upgrader" ) {
      roleUpgrader.run(creep);
    }

  }

  var minimumNumberOfHarvesters = 10;
  var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === "harvester");
  var name = undefined;

  if ( numberOfHarvesters < minimumNumberOfHarvesters ) {
    name = Game.spawns.HomeVB.createCreep( [ WORK, WORK, CARRY, MOVE ], undefined, { role: "harvester", working: false } );
  } else {
    name = Game.spawns.HomeVB.createCreep( [ WORK, CARRY, MOVE, MOVE ], undefined, { role: "upgrader", working: false } );
  }

 

  if ( !(name < 0) ) {
    console.log( "Spawned new creep: " + name );
  }
};
