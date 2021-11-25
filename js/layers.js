
addLayer("i", {
    name: "Incremental Game", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "white",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "incremental points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('i', 15)) mult = mult.times(upgradeEffect('i', 15))
        mult = mult.times(buyableEffect('i', 21))
        if (hasUpgrade('i', 32)) mult = mult.times(upgradeEffect('i', 32))
        return mult
    },
    passiveGeneration() { return (hasUpgrade('i', 23)) },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for incremental points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    automate()
    {
    if (hasUpgrade('i', 31)) buyBuyable([this.layer], 11)
    if (hasUpgrade('i', 31)) buyBuyable([this.layer], 12)
    if (hasUpgrade('i', 31)) buyBuyable([this.layer], 13)
    if (hasUpgrade('i', 31)) buyBuyable([this.layer], 14)
    if (hasUpgrade('i', 33)) buyBuyable([this.layer], 21)
    if (hasUpgrade('i', 33)) buyBuyable([this.layer], 22)
    if (hasUpgrade('i', 33)) buyBuyable([this.layer], 23)
    if (hasUpgrade('i', 33)) buyBuyable([this.layer], 24)
    },
    buyables: {
    11: {
        cost(x) { return new Decimal(300).pow(x.div(50)).mul(300) },
        title: "Learn Coding",
        unlocked() { return hasUpgrade("i", 15) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Hours of Practice: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Points";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.95).mul((buyableEffect('i', 23))).add(1)
        },
    },
        12: {
        cost(x) { return new Decimal(600).pow(x.div(50)).mul(600) },
        title: "Javascript",
        unlocked() { return (tmp.i.buyables[11].effect||0)>=8 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Lines of Code: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to 3rd upgrade";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.95).mul((buyableEffect('i', 23))).add(1)
        },
    },
        13: {
        cost(x) { return new Decimal(1000).pow(x.div(50)).mul(1000) },
        title: "Python",
        unlocked() { return (tmp.i.buyables[12].effect||0)>=8 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Lines of Code: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to 4th upgrade";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.70).mul((buyableEffect('i', 23))).add(1)
        },
    },
        14: {
        cost(x) { return new Decimal(5000).pow(x.div(50)).mul(5000) },
        title: "C#",
        unlocked() { return (tmp.i.buyables[13].effect||0)>=5 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Lines of Code: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to 5th upgrade";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.70).mul((buyableEffect('i', 23))).add(1)
        },
    },
        21: {
        cost(x) { return new Decimal(1e11).pow(x.div(25)).mul(1e11) },
        title: "Gather Ideas",
        unlocked() { return (hasUpgrade('i', 23))},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Ideas: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Incremental Points";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.95).mul((buyableEffect('i', 24))).add(1)
        },
    },
        22: {
        cost(x) { return new Decimal(1e14).pow(x.div(25)).mul(1e14) },
        title: "Clicker",
        unlocked() { return (hasUpgrade('i', 31))},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Clicked: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to 3rd, 4th, and 5th upgrades";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.80).add(1)
        },
    },
        23: {
        cost(x) { return new Decimal(2e15).pow(x.div(25)).mul(2e15) },
        title: "Passive Income",
        unlocked() { return (tmp.i.buyables[22].effect||0)>=4 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Different Industries: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to the first 4 buyables";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.80).add(1)
        },
    },
        24: {
        cost(x) { return new Decimal(1e30).pow(x.div(25)).mul(1e30) },
        title: "Upgrades",
        unlocked() { return (tmp.i.buyables[23].effect||0)>=10 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Different Upgrades: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to the fifth buyable";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.85).add(1)
        },
    },
        31: {
        cost(x) { return new Decimal(1e35).pow(x.div(1.5)).mul(1e35) },
        title: "Prestige Function",
        unlocked() { return (tmp.i.buyables[23].effect||0)>=10 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            player.points = new Decimal("0")
            player.i.points = new Decimal("0")
            player.i.buyables[11] = new Decimal("0")
            player.i.buyables[12] = new Decimal("0")
            player.i.buyables[13] = new Decimal("0")
            player.i.buyables[14] = new Decimal("0")
            player.i.buyables[21] = new Decimal("0")
            player.i.buyables[22] = new Decimal("0")
            player.i.buyables[23] = new Decimal("0")
            player.i.buyables[24] = new Decimal("0")
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Layers: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to points\n\Resets everything but Upgrades";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul(1e10).pow(0.85).add(1)
        },
    },
    },
    upgrades: 
    {
        11:
        {
            title: "The Beginning of the Idea",
            description: "Double your point gain.",
            cost: new Decimal(4),
        },
        12:
        {
            title: "It's a Great Idea",
            description: "Triple your point gain.",
            cost: new Decimal(8),
            unlocked() { return hasUpgrade("i", 11) },
        },
        13:
        {
            title: "Incremental Game?",
            description: "Boost Point gain based on Incremental Points",
            cost: new Decimal(30),
            unlocked() { return hasUpgrade("i", 12) },
                effect() 
                {
                     return player[this.layer].points.add(1).mul((buyableEffect('i', 12))).mul((buyableEffect('i', 22))).pow(0.5)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14:
        {
            title: "Or Maybe Idle Game",
            description: "Boost Point gain based on Points",
            cost: new Decimal(80),
            unlocked() { return hasUpgrade("i", 13) },
                effect() 
                {
                     return player.points.add(1).mul((buyableEffect('i', 13))).mul((buyableEffect('i', 22))).pow(0.25)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15:
        {
            title: "I should start making the game?",
            description: "Boost Incremental Points based on Incremental Points",
            cost: new Decimal(200),
            unlocked() { return hasUpgrade("i", 14) },
                effect() 
                {
                     return player[this.layer].points.add(1).mul((buyableEffect('i', 14))).mul((buyableEffect('i', 22))).pow(0.20)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23:
        {
            title: "Start making the game",
            description: "Gain 100% of Incremental Points per second, and unlocks cool stuff",
            cost: new Decimal(200000),
            unlocked() { return (tmp.i.buyables[14].effect||0)>=6 },
            branches: [11, 12, 13, 14, 15],
        },
        31:
        {
            title: "Automated Coding Lessons",
            description: "Autobuys the first 4 buyables",
            cost: new Decimal(1e13),
            unlocked() { return (tmp.i.buyables[21].effect||0)>=4 },
            branches: [11, 12, 13, 14, 15, 23],
        },
        32:
        {
            title: "Make Developing Faster",
            description: "Boosts Incremental Points Based On Points",
            cost: new Decimal(1e13),
            unlocked() { return (tmp.i.buyables[23].effect||0)>=1.9 },
            branches: [11, 12, 13, 14, 15, 23],
                effect() 
                {
                     return player.points.add(1).pow(0.15)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        33:
        {
            title: "Pure Automation",
            description: "Automates the second row of buyables",
            cost: new Decimal(1e32),
            unlocked() { return (tmp.i.buyables[24].effect||0)>=2.5 },
            branches: [11, 12, 13, 14, 15, 23],
        },
        41:
        {
            title: "Resets Sound Like a good idea!",
            description: "Unlocks more cool stuff",
            cost: new Decimal(1e35),
            unlocked() { return (tmp.i.buyables[24].effect||0)>=2.5 },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33],
        },
    },
    layerShown(){return true}
})