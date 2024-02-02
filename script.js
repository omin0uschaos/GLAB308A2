const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            belongings: ['Small Hat', 'sunglasses']
        }
    },
    roll (mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`)
    }
}

let inventory = adventurer.inventory;
adventurer.roll();

//create a loop that logs each item in Robin’s inventory.
inventory.forEach(item => {
    console.log(item);
});

class Character {
    constructor (name) {
      this.name = name;
      this.health = 100;
      this.inventory = [];
    }
    static max_health = 100;
    static roles = ["Fighter", "Healer", "Wizard"];
    roll (mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1;
        console.log(`${this.name} rolled a ${result}.`);
        return result; //return the roll value
    }
  }




class Adventurer extends Character {
    constructor (name, role) {
      super(name);
      // Adventurers have specialized roles.
      this.role = role;
      if (!Character.roles.includes(role)) {
        throw new Error(`${role} is not a valid role. Choose from: ${Character.roles.join(", ")}`);
      }
      // Every adventurer starts with a bed and 50 gold coins.
      this.inventory.push("bedroll", "50 gold coins");
    }
    // Adventurers have the ability to scout ahead of them.
    scout () {
      console.log(`${this.name} is scouting ahead...`);
      super.roll();
    }
    attack (target) {
        console.log(`${this.name} steps forward and attacks ${target}`);
        super.roll();
    }
    duel(opponent) {
        if (!(opponent instanceof Adventurer)) {
            console.log("The opponent must be an Adventurer.");
            return;
        }

        console.log(`A duel begins between ${this.name} and ${opponent.name}!`);

        while (this.health > 50 && opponent.health > 50) {
            const myRoll = this.roll(); 
            const opponentRoll = opponent.roll();

            if (myRoll > opponentRoll) {
                opponent.health -= 1;
                console.log(`${this.name} hits ${opponent.name}! (${myRoll} vs ${opponentRoll})`);
            } else if (opponentRoll > myRoll) {
                this.health -= 1;
                console.log(`${opponent.name} hits ${this.name}! (${opponentRoll} vs ${myRoll})`);
            } else {
                console.log("Both adventurers stand their ground.");
            }

            console.log(`${this.name}: ${this.health} health, ${opponent.name}: ${opponent.health} health`);
        }

        const winner = this.health > 50 ? this.name : opponent.name;
        console.log(`${winner} wins the duel!`);
    }
  }

  class Companion extends Character {
        constructor(name, type){
            super(name);
            this.type = type;
        }
  }



  const robin = new Adventurer("Robin", "Wizard");
  const troll = new Adventurer("Troll", "Fighter")
  robin.inventory += ["sword", "potion", "artifact"];
  robin.companion = new Companion("Leo", "Cat");
  robin.companion.companion = new Companion("Frank", "Flea");
  robin.companion.companion.inventory = ["small hat", "sunglasses"];
  
  console.log(robin);
  robin.roll();
  robin.duel(troll);
  robin.companion.roll();