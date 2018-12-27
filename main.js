module.exports.loop = function () {

  var creep = Game.creeps.Charlie;

  if ( creep.memory.working == true && creep.carry.energy == 0 ) {
    creep.memory.working = false;
  } else ( creep.memory.working == false && creep.carryt.energy == creep.carryCapacity ) {

  }

  if ( creep.memory.working == true ) {
    if ( creep.transfer(Game.spawns.HomeVB, RESOURCE_ENERGY ) == ERR_NOT_IN_RANGE ) {
      creep.moveTo(Game.spawns.HomeVB);
    }
  } else {
    var source = creep.pos.findClosestByPath( FIND_SOURCES );
    if ( creep.harvest( source ) == ERR_NOT_IN_RANGE ) {
      creep.moveTo(source)
    }
  }

}
  