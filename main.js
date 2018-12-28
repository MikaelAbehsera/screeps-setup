// import modules
var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");

module.exports.loop = function () {
  // check for memory entries of died creeps by iterating over Memory.creeps
  for (let name in Memory.creeps) {
    // and checking if the creep is still alive
    if (Game.creeps[name] === undefined) {
      // if not, delete the memory entry
      delete Memory.creeps[name];
    }
  }

  // for every creep name in Game.creeps
  for (let name in Game.creeps) {
    // get the creep object
    var creep = Game.creeps[name];

    // if creep is harvester, call harvester script
    if (creep.memory.role === "harvester") {
      roleHarvester.run(creep);
    }
    // if creep is upgrader, call upgrader script
    else if (creep.memory.role === "upgrader") {
      roleUpgrader.run(creep);
    }
    // if creep is builder, call builder script
    else if (creep.memory.role === "builder") {
      roleBuilder.run(creep);
    }
  }


  var minimumNumberOfHarvesters = 10;
  var minimumNumberOfUpgraders = 1;
  var minimumNumberOfBuilders = 1;


  var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role === "harvester");
  var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role === "harvester");
  var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role === "harvester");
  var name = undefined;

  if (numberOfHarvesters < minimumNumberOfHarvesters) {
    name = Game.spawns.HomeVB.createCreep([WORK, WORK, CARRY, MOVE], undefined, {
      role: "harvester",
      working: false
    });
  } else if (numberOfUpgraders < minimumNumberOfUpgraders) {
    name = Game.spawns.HomeVB.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {
      role: "upgrader",
      working: false
    });
  } else if (numberOfBuilders < minimumNumberOfBuilders) {
    name = Game.spawns.HomeVB.createCreep([WORK, WORK, CARRY, MOVE], undefined, {
      role: "builder",
      working: false
    });
  } else {
    name = Game.spawns.HomeVB.createCreep([WORK, WORK, CARRY, MOVE], undefined, {
      role: "builder",
      working: false
    });
  }



  if (!(name < 0)) {
    console.log("Spawned new creep: " + name);
  }
};