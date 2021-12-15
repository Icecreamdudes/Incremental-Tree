
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
        if (hasUpgrade('i', 42)) mult = mult.times(upgradeEffect('i', 42))
        mult = mult.times(buyableEffect('i', 41))
        mult = mult.times(layers.cc.effect())
        if (hasUpgrade('cc', 43)) mult = mult.times(upgradeEffect('cc', 43))
        if (hasUpgrade('cc', 72)) mult = mult.times(upgradeEffect('cc', 72))
        if (hasUpgrade('cc', 82)) mult = mult.times(upgradeEffect('cc', 82))
        if (hasUpgrade('cc', 84)) mult = mult.times(upgradeEffect('cc', 84))
        if (hasUpgrade('l', 12)) mult = mult.times(upgradeEffect('l', 12))
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
    if (hasUpgrade('cc', 11)) buyBuyable([this.layer], 31)
    if (hasUpgrade('cc', 11)) buyBuyable([this.layer], 41)
    if (hasUpgrade('cc', 11)) buyBuyable([this.layer], 42)
    if (hasUpgrade('cc', 11)) buyBuyable([this.layer], 11)
    if (hasUpgrade('cc', 11)) buyBuyable([this.layer], 12)
    if (hasUpgrade('cc', 11)) buyBuyable([this.layer], 13)    
    if (hasUpgrade('cc', 11)) buyBuyable([this.layer], 14)
    if (hasUpgrade('cc', 11)) buyBuyable([this.layer], 21)
    if (hasUpgrade('cc', 11)) buyBuyable([this.layer], 22)
    if (hasUpgrade('cc', 11)) buyBuyable([this.layer], 23)
    if (hasUpgrade('cc', 11)) buyBuyable([this.layer], 24)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 11)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 12)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 13)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 14)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 15)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 23)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 31)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 32)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 33)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 41)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 42)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 43)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 51)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 52)
    if (hasUpgrade('cc', 12)) buyUpgrade([this.layer], 61)
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
            return player[this.layer].buyables[this.id].pow(0.95).mul((buyableEffect('i', 23))).mul(player.cc.cookiebibleeffect).add(1)
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
            return player[this.layer].buyables[this.id].pow(0.95).mul((buyableEffect('i', 23))).mul(player.cc.cookiebibleeffect).add(1)
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
            return player[this.layer].buyables[this.id].pow(0.70).mul((buyableEffect('i', 23))).mul(player.cc.cookiebibleeffect).add(1)
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
            return player[this.layer].buyables[this.id].pow(0.70).mul((buyableEffect('i', 23))).mul(player.cc.cookiebibleeffect).add(1)
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
            return player[this.layer].buyables[this.id].pow(0.95).mul((buyableEffect('i', 24))).mul(player.cc.cookiebibleeffect).add(1)
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
            return player[this.layer].buyables[this.id].pow(0.80).mul(player.cc.cookiebibleeffect).add(1)
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
            return player[this.layer].buyables[this.id].pow(0.80).mul(player.cc.cookiebibleeffect).add(1)
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
            if (!hasUpgrade("i", 53))
            {
                return player[this.layer].buyables[this.id].pow(0.85).mul(player.cc.cookiebibleeffect).add(1)
            }
        },
    },
        31: {
        cost(x) { return new Decimal(5e31).pow(x.div(1.5)).mul(5e31) },
        title: "Prestige Function",
        unlocked() { return (hasUpgrade('i', 41)) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            if (!hasUpgrade("i", 52))
            {
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
            }
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
            return player[this.layer].buyables[this.id].mul(1e10).pow(0.97).mul(player.cc.cookiebibleeffect).add(1)
        },
    },
        41: {
        cost(x) { return new Decimal(1e165).pow(x.div(7)).mul(1e165) },
        title: "Make the game look good",
        unlocked() { return (hasUpgrade('i', 51)) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Art Added: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to incremental points";
         },
        branches: [11, 12, 13, 14, 21, 22, 23, 24, 31],
        effect() 
        {
            return player[this.layer].buyables[this.id].mul(4e11).pow(0.971).mul(player.cc.cookiebibleeffect).add(1)
        },
    },
        42: {
        cost(x) { return new Decimal(1e190).pow(x.div(22)).mul(1e190) },
        title: "Test The Game",
        unlocked() { return (tmp.i.buyables[41].effect||0)>=9e10 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            if (player.i.buyables[42] < 1320)
            {
             player[this.layer].points = player[this.layer].points.sub(this.cost())
             setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))             
			}
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Incremental Points\n\
           Hours of Testing: " + player[this.layer].buyables[this.id] + " \n\
           ^" + format(data.effect) + " boost to points";
         },
        branches: ["blue", 11, 12, 13, 14, 21, 22, 23, 24, 31],
        effect() 
        {
            return player[this.layer].buyables[this.id].add(1).pow(0.04)
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
            cost: new Decimal(2e31),
            unlocked() { return (tmp.i.buyables[24].effect||0)>=2.5 },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33],
        },
        42:
        {
            title: "Time for rest can help right?",
            description: "Boost to Points and Incremental Points based on Time Played",
            cost: new Decimal(5e59),
            unlocked() { return (tmp.i.buyables[31].effect||0)>=9e9 },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33],
                effect() 
                {
                     return player.timePlayed
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        43:
        {
            title: "Github",
            description: "^1.03 boost to Point gain",
            cost: new Decimal(1e75),
            unlocked() { return (tmp.i.buyables[31].effect||0)>=1.4e10 },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33],
        },
        51:
        {
            title: "Finish Coding",
            description: "x1e30 boost to Point gain, and unlock new stuff",
            cost: new Decimal(2e87),
            unlocked() { return hasUpgrade("i", 43) },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33, 41, 42, 43],
        },
        52:
        {
            title: "Non Resetting Layers",
            description: "Buying Prestige Functions doesnt reset anything",
            cost: new Decimal(1e240),
            unlocked() { return hasUpgrade("i", 51) },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33, 41, 42, 43],
        },
        61:
        {
            title: "Publish the Game",
            description: "Unlocks a new layer (Finally)",
            cost: new Decimal(1.79e308),
            currencyLocation() {return player}, 
            currencyDisplayName: "points",
            currencyInternalName: "points",
            unlocked() { return hasUpgrade("i", 52) },
            branches: [11, 12, 13, 14, 15, 23, 31, 32, 33, 41, 42, 43],
        },
    },
    layerShown(){return true}
})

addLayer("cc", {
    name: "Cookie Clicker", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "<img src='resources/cookielayersymbol.png' style='width:calc(80%);height:calc(80%);margin:10%'></img>",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        sugarlumps: new Decimal(0),
        heavenlychips: new Decimal(0),
        wrinklerjuice: new Decimal(0),
        xcookies: new Decimal(0),
        ycookies: new Decimal(0),
        zcookies: new Decimal(0),
        x: new Decimal(0),
        y: new Decimal(0),
        xlumps: new Decimal(0),
        ylumps: new Decimal(0),
        zlumps: new Decimal(0),
        autowalkingdirection: new Decimal(0),
        cookiebibles: new Decimal(0),
        cookiebibleeffect: new Decimal(0),
        cultists: new Decimal(0),
        cultisteffect: new Decimal(0),
        cookieblood: new Decimal(0),
        cookiebloodeffect: new Decimal(0),
        ritualactive: new Decimal(0),
        patreonsubscribers: new Decimal(0),
        patreoneffect: new Decimal(0),
        cookietime: new Decimal(0)
    }},
    color: "#654321",
    requires: new Decimal(1.79e308), // Can be a function that takes requirement increases into account
    resource: "Cookies", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.044, // Prestige currency exponent

    passiveGeneration() { return (hasUpgrade('cc', 13)) },
    branches: ["i"],
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(buyableEffect('cc', 11))
        if (hasUpgrade('cc', 31)) mult = mult.times(upgradeEffect('cc', 31))
        if (hasUpgrade('cc', 32)) mult = mult.times(upgradeEffect('cc', 32))
        if (hasUpgrade('cc', 33)) mult = mult.times(upgradeEffect('cc', 33))
        if (hasUpgrade('cc', 41)) mult = mult.times(upgradeEffect('cc', 41))
        if (hasUpgrade('cc', 52)) mult = mult.times(upgradeEffect('cc', 52))
        if (hasUpgrade('cc', 73)) mult = mult.times(upgradeEffect('cc', 73))
	    if (hasUpgrade('cc', 102)) mult = mult.times(0.01)
        if (hasUpgrade('cc', 122)) mult = mult.times(upgradeEffect('cc', 122))
        if (hasUpgrade('l', 13)) mult = mult.times(upgradeEffect('l', 13))
        if (hasUpgrade('cc', 222)) mult = mult.times(upgradeEffect('cc', 222))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: Reset for Cookies", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
		effect() 
        {
			return new Decimal.add(player.cc.points.pow(0.5), 1);
		},
        effectDescription(){
                let eff = layers.cc.effect()
                return "which multiplies incremental point gain by x" + format(eff)
        },
    automate()
    {
        if (hasUpgrade('cc', 22)) buyBuyable([this.layer], 11)
        if (hasUpgrade('cc', 22)) buyBuyable([this.layer], 12)
        if (hasUpgrade('cc', 22)) buyBuyable([this.layer], 13)
        if (hasUpgrade('cc', 22)) buyBuyable([this.layer], 14)
        if (hasUpgrade('cc', 51)) buyBuyable([this.layer], 21)
        if (hasUpgrade('cc', 51)) buyBuyable([this.layer], 22)
        if (hasUpgrade('cc', 51)) buyBuyable([this.layer], 23)
        if (hasUpgrade('cc', 51)) buyBuyable([this.layer], 24)
        if (hasUpgrade('cc', 71)) buyBuyable([this.layer], 31)
        if (hasUpgrade('cc', 71)) buyBuyable([this.layer], 32)
        if (hasUpgrade('cc', 71)) buyBuyable([this.layer], 33)
        if (hasUpgrade('cc', 71)) buyBuyable([this.layer], 34)
        if (hasUpgrade('cc', 111)) buyBuyable([this.layer], 51)
        if (hasUpgrade('cc', 111)) buyBuyable([this.layer], 52)
        if (hasUpgrade('cc', 111)) buyBuyable([this.layer], 53)
        if (hasUpgrade('cc', 113)) buyBuyable([this.layer], 41)
        if (hasUpgrade('cc', 113)) buyBuyable([this.layer], 61)
        if (hasUpgrade('cc', 113)) buyBuyable([this.layer], 71)
        if (hasUpgrade('cc', 113)) buyBuyable([this.layer], 72)
        if (hasUpgrade('cc', 113)) buyBuyable([this.layer], 73)
        if (hasUpgrade('cc', 201)) buyBuyable([this.layer], 81)
        if (hasUpgrade('cc', 201)) buyBuyable([this.layer], 82)
        if (hasUpgrade('cc', 201)) buyBuyable([this.layer], 83)
        if (hasUpgrade('cc', 201)) buyBuyable([this.layer], 111)
        if (hasUpgrade('cc', 201)) buyBuyable([this.layer], 112)
        if (hasUpgrade('cc', 201)) buyBuyable([this.layer], 113)
        if (hasUpgrade('cc', 221)) buyBuyable([this.layer], 121)
        if (hasUpgrade('cc', 221)) buyBuyable([this.layer], 122)
    },
    buyables:
    {
        11: {
        cost(x) { return new Decimal(4).pow(x.div(40)).mul(4) },
        title: "Cursor",
        unlocked() { return hasUpgrade("cc", 12) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookies";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 12))).pow(0.95).add(1)
        },
    },
        12: {
        cost(x) { return new Decimal(200).pow(x.div(20)).mul(200) },
        title: "Grandma",
        unlocked() { return (tmp.cc.buyables[11].effect||0)>=40 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + format(player[this.layer].buyables[this.id]) + " \n\
           x" + format(data.effect) + " boost to Cursors";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 13))).pow(0.95).add(1)
        },
        },
        13: {
        cost(x) { return new Decimal(8000).pow(x.div(19)).mul(8000) },
        title: "Cookie Farm",
        unlocked() { return (tmp.cc.buyables[12].effect||0)>=6 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Grandmas";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 14))).pow(0.95).add(1)
        },
        },
        14: {
        cost(x) { return new Decimal(1e10).pow(x.div(16)).mul(1e10) },
        title: "Cookie Mine",
        unlocked() { return (tmp.cc.buyables[12].effect||0)>=25 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Farms";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 21))).pow(0.95).add(1)
        },
        },
        21: {
        cost(x) { return new Decimal(1e14).pow(x.div(14)).mul(1e14) },
        title: "Cookie Factory",
        unlocked() { return (tmp.cc.buyables[14].effect||0)>=7 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Mines";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 22))).pow(0.95).add(1)
        },
        },
        22: {
        cost(x) { return new Decimal(1e18).pow(x.div(13)).mul(1e18) },
        title: "Cookie Bank",
        unlocked() { return (tmp.cc.buyables[21].effect||0)>=4 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Factories \n\Also produces Sugar Lumps";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 23))).pow(0.95).add(1)
        },
        },
        23: {
        cost(x) { return new Decimal(1e23).pow(x.div(12)).mul(1e23) },
        title: "Cookie Temple",
        unlocked() { return (tmp.cc.buyables[22].effect||0)>=5 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Banks";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 24))).pow(0.95).add(1)
        },
        },
        24: {
        cost(x) { return new Decimal(1e29).pow(x.div(11)).mul(1e29) },
        title: "Cookie Wizard Tower",
        unlocked() { return (tmp.cc.buyables[23].effect||0)>=4.5 },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Temples";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.95).add(1)
        },
        },
        31: {
        cost(x) { return new Decimal(1000).pow(x.div(20)).mul(1000) },
        title: "Cookie Shipment",
        unlocked() { return (tmp.cc.buyables[24].effect||0)>=3.8 },
        canAfford() { return player.cc.sugarlumps.gte(this.cost()) },
        buy() {
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Sugar Lumps";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 32))).pow(0.5).add(1)
        },
        },
        32: {
        cost(x) { return new Decimal(10000).pow(x.div(18)).mul(10000) },
        title: "Cookie Alchemy Lab",
        unlocked() { return (tmp.cc.buyables[31].effect||0)>=4.5 },
        canAfford() { return player.cc.sugarlumps.gte(this.cost()) },
        buy() {
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Shipments";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 33))).pow(0.5).add(1)
        },
        },
        33: {
        cost(x) { return new Decimal(100000).pow(x.div(16)).mul(100000) },
        title: "Cookie Alchemy Lab",
        unlocked() { return (tmp.cc.buyables[32].effect||0)>=4.0 },
        canAfford() { return player.cc.sugarlumps.gte(this.cost()) },
        buy() {
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Alchemy Labs";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 34))).pow(0.5).add(1)
        },
        },
        34: {
        cost(x) { return new Decimal(1000000).pow(x.div(13)).mul(1000000) },
        title: "Cookie Time Machine",
        unlocked() { return (tmp.cc.buyables[33].effect||0)>=3.4 },
        canAfford() { return player.cc.sugarlumps.gte(this.cost()) },
        buy() {
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Alchemy Labs";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.5).add(1)
        },
        },
        41: {
        cost(x) { return new Decimal(1e38).pow(x.div(3.55)).mul(1e38) },
        title: "Cookie Ascension",
        unlocked() { return (tmp.cc.buyables[34].effect||0)>=2.4 },
        canAfford() { return player.cc.points.gte(this.cost()) },
        buy() {
            player.cc.points = player.cc.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            if (!hasUpgrade("cc", 113))
            {
            player.cc.points = new Decimal("0")
            player.cc.sugarlumps = new Decimal("0")
            player.cc.buyables[11] = new Decimal("0")
            player.cc.buyables[12] = new Decimal("0")
            player.cc.buyables[13] = new Decimal("0")
            player.cc.buyables[14] = new Decimal("0")
            player.cc.buyables[21] = new Decimal("0")
            player.cc.buyables[22] = new Decimal("0")
            player.cc.buyables[23] = new Decimal("0")
            player.cc.buyables[24] = new Decimal("0")
            player.cc.buyables[31] = new Decimal("0")
            player.cc.buyables[32] = new Decimal("0")
            player.cc.buyables[33] = new Decimal("0")
            player.cc.buyables[34] = new Decimal("0")
            }
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Heavenly Chips per second ";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul(1).pow(1.5)
        },
        },
        51: {
        cost(x) { return new Decimal(1000).pow(x.div(20)).mul(1000) },
        title: "Cookie Antimatter Condenser",
        unlocked() { return (tmp.cc.buyables[41].effect||0)>=2.5 },
        canAfford() { return player.cc.heavenlychips.gte(this.cost()) },
        buy() {
            player.cc.heavenlychips = player.cc.heavenlychips.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Heavenly Chips\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Heavenly Chips";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 52))).pow(0.8).add(1)
        },
        },
        52: {
        cost(x) { return new Decimal(10000).pow(x.div(18)).mul(10000) },
        title: "Cookie Prism",
        unlocked() { return (tmp.cc.buyables[51].effect||0)>=4.2 },
        canAfford() { return player.cc.heavenlychips.gte(this.cost()) },
        buy() {
            player.cc.heavenlychips = player.cc.heavenlychips.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Heavenly Chips\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Antimatter Condensers";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 53))).pow(0.8).add(1)
        },
        },
        53: {
        cost(x) { return new Decimal(100000).pow(x.div(15)).mul(100000) },
        title: "Cookie Chancemaker",
        unlocked() { return (tmp.cc.buyables[52].effect||0)>=5.18 },
        canAfford() { return player.cc.heavenlychips.gte(this.cost()) },
        buy() {
            player.cc.heavenlychips = player.cc.heavenlychips.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Heavenly Chips\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Prism";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.8).add(1)
        },
        },
        61: {
        cost(x) { return new Decimal(1e17).pow(x.div(5)).mul(1e17) },
        title: "Wrinkler",
        unlocked() { return hasUpgrade("cc", 102) },
        canAfford() { return player.cc.sugarlumps.gte(this.cost()) },
        buy() {
            player.cc.sugarlumps = player.cc.sugarlumps.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Wrinkler Juice per Second";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 71))).pow(1.5)
        },
        },
        71: {
        cost(x) { return new Decimal(1000).pow(x.div(14)).mul(1000) },
        title: "Cookie Antimatter Condenser",
        unlocked() { return hasUpgrade("cc", 111) },
        canAfford() { return player.cc.wrinklerjuice.gte(this.cost()) },
        buy() {
            player.cc.wrinklerjuice = player.cc.wrinklerjuice.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Wrinkler Juice\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Wrinklers";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 72))).pow(0.7).add(1)
        },
        },
        72: {
        cost(x) { return new Decimal(100000).pow(x.div(12)).mul(100000) },
        title: "Cookie Javascript Console",
        unlocked() { return (tmp.cc.buyables[71].effect||0)>=6.6 },
        canAfford() { return player.cc.wrinklerjuice.gte(this.cost()) },
        buy() {
            player.cc.wrinklerjuice = player.cc.wrinklerjuice.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Wrinkler Juice\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Antimatter Condensers";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 73))).pow(0.7).add(1)
        },
        },
        73: {
        cost(x) { return new Decimal(100000000).pow(x.div(8)).mul(100000000) },
        title: "Cookie Idleverse",
        unlocked() { return (tmp.cc.buyables[71].effect||0)>=4.89 },
        canAfford() { return player.cc.wrinklerjuice.gte(this.cost()) },
        buy() {
            player.cc.wrinklerjuice = player.cc.wrinklerjuice.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Wrinkler Juice\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Antimatter Condensers";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.7).add(1)
        },
        },
        81: {
        cost(x) { return new Decimal(100).pow(x.div(20)).mul(100) },
        title: "X Cookie Grandma",
        unlocked() { return hasUpgrade("cc", 121) },
        canAfford() { return player.cc.xcookies.gte(this.cost()) },
        buy() {
            player.cc.xcookies = player.cc.xcookies.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " X Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Sugar Lumps";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 112))).pow(0.8).add(1)
        },
        },
        82: {
        cost(x) { return new Decimal(100).pow(x.div(20)).mul(100) },
        title: "Y Cookie Grandma",
        unlocked() { return hasUpgrade("cc", 121) },
        canAfford() { return player.cc.ycookies.gte(this.cost()) },
        buy() {
            player.cc.ycookies = player.cc.ycookies.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Y Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Heavenly Chips";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 112))).pow(0.7).add(1)
        },
        },
        83: {
        cost(x) { return new Decimal(200).pow(x.div(10)).mul(200) },
        title: "Z Cookie Grandma",
        unlocked() { return hasUpgrade("cc", 121) },
        canAfford() { return player.cc.zcookies.gte(this.cost()) },
        buy() {
            player.cc.zcookies = player.cc.zcookies.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Z Cookies\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to X and Y Cookies";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].mul((buyableEffect('cc', 112))).pow(0.3).add(1)
        },
        },
        91: {
        cost(x) { return new Decimal(0) },
        title: "Walk Right",
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.cc.x = player.cc.x.add(1)
        },
        },
        92: {
        cost(x) { return new Decimal(0) },
        title: "Walk Left",
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.cc.x = player.cc.x.add(-1)
        },
        },
        93: {
        cost(x) { return new Decimal(0) },
        title: "Walk Forward",
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.cc.y = player.cc.y.add(1)
        },
        },
        94: {
        cost(x) { return new Decimal(0) },
        title: "Walk Backward",
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.cc.y = player.cc.y.add(-1)
        },
        },
        101: {
        cost(x) { return new Decimal(0) },
        title: "Reset Position",
        canAfford() { return player.points.gte(this.cost()) },
        buy() {
            player.cc.x = player.cc.x.sub(player.cc.x)
            player.cc.y = player.cc.y.sub(player.cc.y)
            player.cc.z = player.cc.z.sub(player.cc.z)
            player.cc.autowalkingdirection = new Decimal(0)
        },
        },
        111: {
        cost(x) { return new Decimal(1e9).pow(x.div(18)).mul(1e9) },
        title: "X Cookie Wrinkler",
        unlocked() { return hasUpgrade("cc", 181) && hasUpgrade("cc", 182)},
        canAfford() { return player.cc.xlumps.gte(this.cost()) },
        buy() {
            player.cc.xlumps = player.cc.xlumps.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " X Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Dimensional Cookies";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.5).add(1)
        },
        },
        112: {
        cost(x) { return new Decimal(1e9).pow(x.div(18)).mul(1e9) },
        title: "Y Cookie Wrinkler",
        unlocked() { return hasUpgrade("cc", 181) && hasUpgrade("cc", 182) },
        canAfford() { return player.cc.ylumps.gte(this.cost()) },
        buy() {
            player.cc.ylumps = player.cc.ylumps.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Y Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Dimensional Grandmas";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.4).add(1)
        },
        },
        113: {
        cost(x) { return new Decimal(1e9).pow(x.div(18)).mul(1e9) },
        title: "Z Cookie Wrinkler",
        unlocked() { return hasUpgrade("cc", 181) && hasUpgrade("cc", 182) },
        canAfford() { return player.cc.zlumps.gte(this.cost()) },
        buy() {
            player.cc.zlumps = player.cc.zlumps.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Z Sugar Lumps\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to autowalking";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.45).add(1)
        },
        },
        121: {
        cost(x) { return new Decimal(100).pow(x.div(20)).mul(100) },
        title: "Priest Grandma",
        unlocked() { return hasUpgrade("cc", 192) },
        canAfford() { return player.cc.cookiebibles.gte(this.cost()) },
        buy() {
            player.cc.cookiebibles = player.cc.cookiebibles.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cookie Bibles\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           x" + format(data.effect) + " boost to Cookie Bible income";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.6).add(1)
        },
        },
        122: {
        cost(x) { return new Decimal(400).pow(x.div(5)).mul(400) },
        title: "Sacrifice Cultists",
        unlocked() { return (tmp.cc.buyables[121].effect||0)>=4.8 },
        canAfford() { return player.cc.cultists.gte(this.cost()) },
        buy() {
            player.cc.cultists = player.cc.cultists.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + " Cultists\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Cookie Blood per second";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(1.5).times(0.1)
        },
        },
        131: {
        cost(x) { return },
        title: "Cookie Ritual Activation",
        unlocked() { return (tmp.cc.buyables[122].effect||0)>=0.27 },
        canAfford() { return true },
        buy() {
                player.cc.ritualactive = new Decimal(1)
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cookie Blood effect boosts Cultist, but Divides Cookie Blood gain by 2. Ritual Active: " + format(player.cc.ritualactive);
         },
        },
        132: {
        cost(x) { return },
        title: "Cookie Ritual Deactivation",
        unlocked() { return (tmp.cc.buyables[122].effect||0)>=0.27 },
        canAfford() { return true },
        buy() {
                player.cc.ritualactive = new Decimal(0)
        },
        },
        141: {
        cost(x) { return new Decimal(10).pow(x.div(20)).mul(10) },
        title: "Advertise Your Patreon",
        unlocked() { return hasUpgrade("l", 14) },
        canAfford() { return player.l.points.gte(this.cost()) },
        buy() {
            player.l.points = player.l.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
         display() 
         { // Everything else displayed in the buyable button after the title
           let data = tmp[this.layer].buyables[this.id]
           return "Cost: " + format(data.cost) + "$\n\
           Amount: " + player[this.layer].buyables[this.id] + " \n\
           +" + format(data.effect) + " Patreon Subscribers per Second";
         },
        effect() 
        {
            return player[this.layer].buyables[this.id].pow(0.8).times(0.01)
        },
        },
    },
    upgrades: 
    {
        11:
        {
            title: "Automation^2",
            description: "Automates all the buyables",
            cost: new Decimal(1),
        },
        12:
        {
            title: "Automation^3",
            description: "Autobuys all the upgrades",
            cost: new Decimal(6),
        },
        13:
        {
            title: "Automation^4",
            description: "Passively Generate Cookies",
            cost: new Decimal(100),
        },
        21:
        {
            title: "Cookie-Point Synergy",
            description: "Cookies also boost Point gain",
            cost: new Decimal(1e12),
            unlocked() { return (tmp.cc.buyables[14].effect||0)>=5 },
                effect() 
                {
                     return player.cc.points.add(1).pow(0.499)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22:
        {
            title: "Cookie Engineer",
            description: "Automates the First row of buyables",
            cost: new Decimal(1e16),
            unlocked() { return (tmp.cc.buyables[14].effect||0)>=24 },
        },
        31:
        {
            title: "Point-Cookie Synergy",
            description: "Points boost Cookie gain",
            cost: new Decimal(1e16),
            unlocked() { return (tmp.cc.buyables[21].effect||0)>=3 },
                effect() 
                {
                     return player.points.add(1).pow(0.0005)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        32:
        {
            title: "Incremental Point-Cookie Synergy",
            description: "Incremental Points boost Cookie gain",
            cost: new Decimal(1e16),
            unlocked() { return (tmp.cc.buyables[21].effect||0)>=3 },
                effect() 
                {
                     return player.points.add(1).pow(0.0007)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        33:
        {
            title: "Cookie-Cookie Synergy",
            description: "Cookies boost Cookie gain",
            cost: new Decimal(1e16),
            unlocked() { return (tmp.cc.buyables[21].effect||0)>=3 },
                effect() 
                {
                     return player.cc.points.add(1).pow(0.008)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        41:
        {
            title: "Sugar Lumps-Cookie Synergy",
            description: "Sugar Lumps boost Cookie gain",
            cost: new Decimal(10),
            unlocked() { return (tmp.cc.buyables[22].effect||0)>=1.9 },
                effect() 
                {
                     return player.cc.sugarlumps.add(1).pow(0.23456789)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        42:
        {
            title: "Sugar Lumps-Point Synergy",
            description: "Sugar Lumps boost Point gain",
            cost: new Decimal(50),
            unlocked() { return (tmp.cc.buyables[22].effect||0)>1.9 },
                effect() 
                {
                     return player.cc.sugarlumps.add(1).pow(2.1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        43:
        {
            title: "Sugar Lumps-Incremental Point Synergy",
            description: "Sugar Lumps boost Incremental Point gain",
            cost: new Decimal(250),
            unlocked() { return (tmp.cc.buyables[22].effect||0)>=1.9 },
                effect() 
                {
                     return player.cc.sugarlumps.add(1).pow(1.8)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        51:
        {
            title: "Cookie Lord",
            description: "Automates the Second row of buyables",
            cost: new Decimal(1e34),
            unlocked() { return (tmp.cc.buyables[24].effect||0)>=2 },
        },
        52:
        {
            title: "Cookie Master",
            description: "Boost Cookie Gain based on Time Played",
            cost: new Decimal(100000),
            unlocked() { return (tmp.cc.buyables[24].effect||0)>=2 },
                effect() 
                {
                     return player.timePlayed
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        61:
        {
            title: "Points-Sugar Lumps Synergy",
            description: "Points boost Sugar Lumps Gain",
            cost: new Decimal(150000),
            unlocked() { return (tmp.cc.buyables[33].effect||0)>=2.4 },
                effect() 
                {
                     return player.points.add(1).pow(0.0003)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        62:
        {
            title: "Inremental Points-Sugar Lumps Synergy",
            description: "Incremental Points boost Sugar Lumps Gain",
            cost: new Decimal(250000),
            unlocked() { return (tmp.cc.buyables[33].effect||0)>=2.4 },
                effect() 
                {
                     return player.i.points.add(1).pow(0.00035)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        63:
        {
            title: "Cookies-Sugar Lumps Synergy",
            description: "Cookies boost Sugar Lumps Gain",
            cost: new Decimal(450000),
            unlocked() { return (tmp.cc.buyables[33].effect||0)>=2.4 },
                effect() 
                {
                     return player.cc.points.add(1).pow(0.004)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        64:
        {
            title: "Sugar Lumps-Sugar Lumps Synergy",
            description: "Sugar Lumps boost Sugar Lumps Gain",
            cost: new Decimal(1000000),
            unlocked() { return (tmp.cc.buyables[33].effect||0)>=2.4 },
                effect() 
                {
                     return player.cc.sugarlumps.add(1).pow(0.05)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Sugar Lumps",
            currencyInternalName: "sugarlumps",
        },
        71:
        {
            title: "Cookie God",
            description: "Automates the Third row of buyables",
            cost: new Decimal(20),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=1 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        72:
        {
            title: "Heavenly Chip-Points and Incremental Points Synergy",
            description: "Boosts Points and Incremental Points based on Heavenly Chips",
            cost: new Decimal(100),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=1 },
                effect() 
                {
                     return player.cc.heavenlychips.add(1).pow(0.8)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        73:
        {
            title: "Heavenly Chip-Cookies Synergy",
            description: "Boosts Cookies based on Heavenly Chips",
            cost: new Decimal(100),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=1 },
                effect() 
                {
                     return player.cc.heavenlychips.add(1).pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        74:
        {
            title: "Heavenly Chip-Sugar Lumps Synergy",
            description: "Boosts Sugar Lumps based on Heavenly Chips",
            cost: new Decimal(100),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=1 },
                effect() 
                {
                     return player.cc.heavenlychips.add(1).pow(0.2)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        81:
        {
            title: "Heavenly Chip-Points Synergy",
            description: "Boosts Points based on Heavenly Chips",
            cost: new Decimal(2500),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=2.5 },
                effect() 
                {
                     return player.cc.heavenlychips.add(1).pow(0.9)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        82:
        {
            title: "Heavenly Chip-Incremental Points Synergy",
            description: "Boosts Incremental Points based on Heavenly Chips",
            cost: new Decimal(2500),
            unlocked() { return (tmp.cc.buyables[41].effect||0)>=2.5 },
                effect() 
                {
                     return player.cc.heavenlychips.add(1).pow(0.88)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        83:
        {
            title: "Incremental Points and Cookies-Point Synergy",
            description: "Boosts Points based on Incremental Points and Cookies",
            cost: new Decimal(10000),
            unlocked() { return (tmp.cc.buyables[51].effect||0)>=3.44 },
                effect() 
                {
                     return player.i.points.add(1).pow(0.001).mul(player.cc.points.add(1).pow(0.08))
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        84:
        {
            title: "Points and Cookies-Incremental Point Synergy",
            description: "Boosts Incremental Points based on Points and Cookies",
            cost: new Decimal(10000),
            unlocked() { return (tmp.cc.buyables[51].effect||0)>=3.44 },
                effect() 
                {
                     return player.points.add(1).pow(0.0003).mul(player.cc.points.add(1).pow(0.08))
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        91:
        {
            title: "Cookie Immortality",
            description: "Boosts Heavenly Chips and Sugar Lumps based on time played",
            cost: new Decimal(25000),
            unlocked() { return (tmp.cc.buyables[52].effect||0)>=2.7 },
                effect() 
                {
                     let a = player.timePlayed
                     return a/10000
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        92:
        {
            title: "Cookie Holy Lords",
            description: "Boosts Heavenly Chips and Sugar Lumps based on amount of Cursors",
            cost: new Decimal(1000000),
            unlocked() { return (tmp.cc.buyables[53].effect||0)>=4 },
                effect() 
                {
                     return player[this.layer].buyables[11].pow(0.25)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        93:
        {
            title: "Cookie Jesus",
            description: "Boosts Heavenly Chips and Sugar Lumps based on amount of Grandmas",
            cost: new Decimal(1e7),
            unlocked() { return (tmp.cc.buyables[53].effect||0)>=7 },
                effect() 
                {
                     return player[this.layer].buyables[12].pow(0.3)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        101:
        {
            title: "The Grandmas are Mad...",
            description: "Boosts Points based on amount of Grandmas",
            cost: new Decimal(1e10),
            unlocked() { return (tmp.cc.buyables[53].effect||0)>=11 },
                effect() 
                {
                     return player[this.layer].buyables[12].pow(0.9)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        102:
        {
            title: "START THE GRANDMAPOCALYPSE",
            description: "THIS UPGRADE HAS NO OFF BUTTON. BE WARNED. SLOWS COOKIE GAIN BY 100 AND INCREASES SUGAR LUMP GAIN BY 10. IT IS UNCERTAIN ABOUT WHAT IS GOING TO HAPPEN NEXT.",
            cost: new Decimal(1e10),
            unlocked() { return (tmp.cc.buyables[53].effect||0)>=11 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
        },
        111:
        {
            title: "Cookie Devil",
            description: "Automates the Fifth row of buyables",
            cost: new Decimal(1e125),
            unlocked() { return (tmp.cc.buyables[61].effect||0)>=4 },
        },
        112:
        {
            title: "Cookie Goku",
            description: "Boosts Wrinkler Juice based on time played",
            cost: new Decimal(5000),
            unlocked() { return (tmp.cc.buyables[71].effect||0)>=2.7 },
                effect() 
                {
                     let a = player.timePlayed
                     return a
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Wrinkler Juice",
            currencyInternalName: "wrinklerjuice",
        },
        113:
        {
            title: "Cookie Rick Astley",
            description: "Autobuys Final 2 Rows of Cookie Buyables, and Cookie Ascensions do not reset everything and automates Cookie Ascensions.",
            cost: new Decimal(100000000),
            unlocked() { return (tmp.cc.buyables[73].effect||0)>=1.9 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Wrinkler Juice",
            currencyInternalName: "wrinklerjuice",
        },
        121:
        {
            title: "Unlock the second quarter of this layer (COOL)",
            description: "Unlocks a new tab",
            cost: new Decimal(1e9),
            unlocked() { return (tmp.cc.buyables[73].effect||0)>=1.9 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Wrinkler Juice",
            currencyInternalName: "wrinklerjuice",
        },
        122:
        {
            title: "Break the laws of Cookie Physics",
            description: "Boosts Cookies based on Cookie Ascensions, and start producing dimensional cookies",
            cost: new Decimal(1e9),
            unlocked() { return hasUpgrade("cc", 121) },
                effect() 
                {
                     return player[this.layer].buyables[41].pow(2)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Wrinkler Juice",
            currencyInternalName: "wrinklerjuice",
        },
        131:
        {
            title: "X cookie synergy",
            description: "Boosts X Cookies based on X Cookie Grandmas",
            cost: new Decimal(1000),
            unlocked() { return (tmp.cc.buyables[81].effect||0)>=11 },
                effect() 
                {
                     return player[this.layer].buyables[81].pow(0.95)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "X Cookies",
            currencyInternalName: "xcookies",
        },
        132:
        {
            title: "Y cookie synergy",
            description: "Boosts Y Cookies based on Y Cookie Grandmas",
            cost: new Decimal(1000),
            unlocked() { return (tmp.cc.buyables[82].effect||0)>=8.55 },
                effect() 
                {
                     return player[this.layer].buyables[82].pow(0.90)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Y Cookies",
            currencyInternalName: "ycookies",
        },
        133:
        {
            title: "Z cookie synergy",
            description: "Boosts Z Cookies based on Z Cookie Grandmas",
            cost: new Decimal(1000),
            unlocked() { return (tmp.cc.buyables[83].effect||0)>=2.7 },
                effect() 
                {
                     return player[this.layer].buyables[83].pow(0.90)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Cookies",
            currencyInternalName: "zcookies",
        },
        141:
        {
            title: "Look for Dimensional Sugar Lumps?",
            description: "Boost all Dimensional Cookie gain by 10 and unlocks a new tab",
            cost: new Decimal(25000),
            unlocked() { return (tmp.cc.buyables[83].effect||0)>=3.15 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Cookies",
            currencyInternalName: "zcookies",
        },
        151:
        {
            title: "X cookie booster",
            description: "Boosts Sugar Lumps based on X Cookies",
            cost: new Decimal(500000),
            unlocked() { return (tmp.cc.buyables[81].effect||0)>=11 },
                effect() 
                {
                     return player[this.layer].xcookies.pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "X Sugar Lumps",
            currencyInternalName: "xlumps",
        },
        152:
        {
            title: "Y cookie booster",
            description: "Boosts Heavenly Chips based on Y Cookies",
            cost: new Decimal(500000),
            unlocked() { return (tmp.cc.buyables[82].effect||0)>=8.55 },
                effect() 
                {
                     return player[this.layer].ycookies.pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Y Sugar Lumps",
            currencyInternalName: "ylumps",
        },
        153:
        {
            title: "Z cookie booster",
            description: "Boosts X and Y Cookies based on Z Cookies",
            cost: new Decimal(500000),
            unlocked() { return (tmp.cc.buyables[83].effect||0)>=2.7 },
                effect() 
                {
                     return player[this.layer].zcookies.pow(0.2)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Sugar Lumps",
            currencyInternalName: "zlumps",
        },
        161:
        {
            title: "X sugar lumps booster",
            description: "Boosts X Cookies based on X Sugar Lumps",
            cost: new Decimal(1000000),
            unlocked() { return hasUpgrade("cc", 151) },
                effect() 
                {
                     return player[this.layer].xlumps.pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "X Sugar Lumps",
            currencyInternalName: "xlumps",
        },
        162:
        {
            title: "Y sugar lumps booster",
            description: "Boosts Y Cookies based on Y Sugar Lumps",
            cost: new Decimal(1000000),
            unlocked() { return hasUpgrade("cc", 152) },
                effect() 
                {
                     return player[this.layer].ylumps.pow(0.4)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Y Sugar Lumps",
            currencyInternalName: "ylumps",
        },
        163:
        {
            title: "Z sugar lumps booster",
            description: "Boosts Z Cookies based on Z Sugar Lumps",
            cost: new Decimal(1000000),
            unlocked() { return hasUpgrade("cc", 153) },
                effect() 
                {
                     return player[this.layer].zlumps.pow(0.2)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Sugar Lumps",
            currencyInternalName: "zlumps",
        },
        171:
        {
            title: "Train your mind to make you automatically run",
            description: "Automatically Walks 10 Meters Per Second, always produce Z sugar lumps",
            cost: new Decimal(2000000),
            unlocked() { return hasUpgrade("cc", 161) && hasUpgrade("cc", 162) && hasUpgrade("cc", 163) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Sugar Lumps",
            currencyInternalName: "zlumps",
        },
        181:
        {
            title: "Sugar Lump flavored Gatorade",
            description: "Autowalks Forward Faster based on Sugar Lumps",
            cost: new Decimal(1e9),
            unlocked() { return hasUpgrade("cc", 171) },
                effect() 
                {
                     return player[this.layer].ylumps.pow(0.05)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Y Sugar Lumps",
            currencyInternalName: "ylumps",
        },
        182:
        {
            title: "Ascended Heavenly Chip Shoes",
            description: "Autowalks Right Faster based on Heavenly Chips",
            cost: new Decimal(1e9),
            unlocked() { return hasUpgrade("cc", 171) },
                effect() 
                {
                     return player[this.layer].zlumps.pow(0.08)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "X Sugar Lumps",
            currencyInternalName: "xlumps",
        },
        191:
        {
            title: "The Big Boost",
            description: "Boosts Autowalking Speed based on time played",
            cost: new Decimal(5e10),
            unlocked() { return hasUpgrade("cc", 181) && hasUpgrade("cc", 182) },
                effect() 
                {
                     let a = player.timePlayed
                     return a/10
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Sugar Lumps",
            currencyInternalName: "zlumps",
        },
        192:
        {
            title: "Unlock the third quarter of this layer",
            description: "Unlocks the Church",
            cost: new Decimal(1e14),
            unlocked() { return hasUpgrade("cc", 191) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Z Sugar Lumps",
            currencyInternalName: "zlumps",
        },
        201:
        {
            title: "Cookie Trollge",
            description: "Automates buying Dimensional Grandmas and Dimensional Wrinklers",
            cost: new Decimal(50000),
            unlocked() { return (tmp.cc.buyables[122].effect||0)>=0.27 },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Cookie Bibles",
            currencyInternalName: "cookiebibles",
        },
        202:
        {
            title: "Blood Donation",
            description: "Boosts Cookie Blood Gain based on Cultists",
            cost: new Decimal(4000),
            unlocked() { return hasUpgrade("cc", 201) },
                effect() 
                {
                     return player[this.layer].cultists.pow(0.3)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Cultists",
            currencyInternalName: "cultists",
        },
        203:
        {
            title: "The New Testament",
            description: "Boosts Cookie Blood Gain based on Cookie Bibles",
            cost: new Decimal(500000),
            unlocked() { return hasUpgrade("cc", 202) },
                effect() 
                {
                     return player[this.layer].cookiebibles.pow(0.26)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Cookie Bibles",
            currencyInternalName: "cookiebibles",
        },
        204:
        {
            title: "Revelation",
            description: "Boost Cultists based on Cultists",
            cost: new Decimal(250000),
            unlocked() { return hasUpgrade("cc", 203) },
                effect() 
                {
                     return player[this.layer].cultists.pow(0.35)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Cultists",
            currencyInternalName: "cultists",
        },
        211:
        {
            title: "SUMMON THE COOKIE GOD OF GODS",
            description: "???",
            cost: new Decimal(1e308),
            unlocked() { return hasUpgrade("cc", 204) },
        },
        221:
        {
            title: "The Final Cookie",
            description: "Automatically buys Church Buyables",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("cc", 211) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Patreon Subscribers",
            currencyInternalName: "patreonsubscribers",
        },
        222:
        {
            title: "Heralds",
            description: "Boosts Cookies Based on Patreon Subscribers",
            cost: new Decimal(1e30),
            unlocked() { return hasUpgrade("cc", 221) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Heavenly Chips",
            currencyInternalName: "heavenlychips",
                effect() 
                {
                     return player[this.layer].patreonsubscribers.pow(1.00)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        223:
        {
            title: "Money is Power",
            description: "Boosts Patreon Subscribers based on $",
            cost: new Decimal(1500),
            unlocked() { return hasUpgrade("cc", 222) },
            currencyLocation() { return player[this.layer] },
            currencyDisplayName: "Patreon Subscribers",
            currencyInternalName: "patreonsubscribers",
                effect() 
                {
                     return player.l.points.pow(0.3)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
        update(delta) {
        {
            let mult = new Decimal(1)
            mult = mult.times(buyableEffect('cc', 31))
            if (hasUpgrade('cc', 61)) mult = mult.times(upgradeEffect('cc', 61))
            if (hasUpgrade('cc', 62)) mult = mult.times(upgradeEffect('cc', 62))
            if (hasUpgrade('cc', 63)) mult = mult.times(upgradeEffect('cc', 63))
            if (hasUpgrade('cc', 64)) mult = mult.times(upgradeEffect('cc', 64))
            if (hasUpgrade('cc', 73)) mult = mult.times(upgradeEffect('cc', 73))
            if (hasUpgrade('cc', 91)) mult = mult.times(upgradeEffect('cc', 91))
            if (hasUpgrade('cc', 92)) mult = mult.times(upgradeEffect('cc', 92))
            if (hasUpgrade('cc', 93)) mult = mult.times(upgradeEffect('cc', 93))
	        if (hasUpgrade('cc', 102)) mult = mult.times(10)
            mult = mult.times(buyableEffect('cc', 81))
            if (hasUpgrade('cc', 151)) mult = mult.times(upgradeEffect('cc', 151))
            player.cc.sugarlumps = player.cc.sugarlumps.add(tmp.cc.buyables[22].effect.add(-1).mul(delta).mul(mult))
            
            let heavenlymult = new Decimal(1)
            if (hasUpgrade('cc', 91)) heavenlymult = heavenlymult.times(upgradeEffect('cc', 91))
            if (hasUpgrade('cc', 92)) heavenlymult = heavenlymult.times(upgradeEffect('cc', 92))
            if (hasUpgrade('cc', 93)) heavenlymult = heavenlymult.times(upgradeEffect('cc', 93))
            heavenlymult = heavenlymult.times(buyableEffect('cc', 82))
            if (hasUpgrade('cc', 152)) heavenlymult = heavenlymult.times(upgradeEffect('cc', 152))
            player.cc.heavenlychips = player.cc.heavenlychips.add(tmp.cc.buyables[41].effect.mul(buyableEffect('cc', 51)).mul(delta).mul(heavenlymult))
       
            let wrinklermult = new Decimal(1)
            if (hasUpgrade('cc', 112)) wrinklermult = wrinklermult.times(upgradeEffect('cc', 112))
            player.cc.wrinklerjuice = player.cc.wrinklerjuice.add(tmp.cc.buyables[61].effect.mul(delta).mul(wrinklermult))

            let grandmaincome = new Decimal(1)
            player.cc.buyables[12] = player.cc.buyables[12].add(player.cc.wrinklerjuice.mul(delta))

            let xcookiesmult = new Decimal(0)
            if (hasUpgrade('cc', 122)) xcookiesmult = xcookiesmult.add(1)
            xcookiesmult = xcookiesmult.times(buyableEffect('cc', 83))
            if (hasUpgrade('cc', 131)) xcookiesmult = xcookiesmult.times(upgradeEffect('cc', 131))
            if (hasUpgrade('cc', 141)) xcookiesmult = xcookiesmult.times(10)
            if (hasUpgrade('cc', 153)) xcookiesmult = xcookiesmult.times(upgradeEffect('cc', 153))
            if (hasUpgrade('cc', 161)) xcookiesmult = xcookiesmult.times(upgradeEffect('cc', 161))
            xcookiesmult = xcookiesmult.times(buyableEffect('cc', 111))
            xcookiesmult = xcookiesmult.times(player.cc.cultisteffect)
            player.cc.xcookies = player.cc.xcookies.add(xcookiesmult.mul(delta))

            let ycookiesmult = new Decimal(0)
            if (hasUpgrade('cc', 122)) ycookiesmult = ycookiesmult.add(1)
            ycookiesmult = ycookiesmult.times(buyableEffect('cc', 83))
            if (hasUpgrade('cc', 132)) ycookiesmult = ycookiesmult.times(upgradeEffect('cc', 132))
            if (hasUpgrade('cc', 141)) ycookiesmult = ycookiesmult.times(10)
            if (hasUpgrade('cc', 153)) ycookiesmult = ycookiesmult.times(upgradeEffect('cc', 153))
            if (hasUpgrade('cc', 162)) ycookiesmult = ycookiesmult.times(upgradeEffect('cc', 162))
            ycookiesmult = ycookiesmult.times(buyableEffect('cc', 111))
            ycookiesmult = ycookiesmult.times(player.cc.cultisteffect)
            player.cc.ycookies = player.cc.ycookies.add(ycookiesmult.mul(delta))

            let zcookiesmult = new Decimal(0)
            if (hasUpgrade('cc', 122)) zcookiesmult = zcookiesmult.add(1)
            if (hasUpgrade('cc', 133)) zcookiesmult = zcookiesmult.times(upgradeEffect('cc', 133))
            if (hasUpgrade('cc', 141)) zcookiesmult = zcookiesmult.times(10)
            if (hasUpgrade('cc', 163)) zcookiesmult = zcookiesmult.times(upgradeEffect('cc', 163))
            zcookiesmult = zcookiesmult.times(buyableEffect('cc', 111))
            zcookiesmult = zcookiesmult.times(player.cc.cultisteffect)
            player.cc.zcookies = player.cc.zcookies.add(zcookiesmult.mul(delta))

            let xlumpsmult = new Decimal(0)
            if ((player.cc.x > 0) && (player.cc.y > 0)) xlumpsmult = xlumpsmult.add(player.cc.x)
            if ((player.cc.x > 0) && (player.cc.y < 0)) xlumpsmult = xlumpsmult.add(player.cc.x)
            if ((player.cc.x < 0) && (player.cc.y > 0)) xlumpsmult = xlumpsmult.add(player.cc.x.times(-1))
            xlumpsmult = xlumpsmult.times(player.cc.cultisteffect)
            player.cc.xlumps = player.cc.xlumps.add(xlumpsmult.mul(delta))

            let ylumpsmult = new Decimal(0)
            if ((player.cc.x > 0) && (player.cc.y > 0)) ylumpsmult = ylumpsmult.add(player.cc.y)
            if ((player.cc.x < 0) && (player.cc.y < 0)) ylumpsmult = ylumpsmult.add(player.cc.y.times(-1))
            ylumpsmult = ylumpsmult.times(player.cc.cultisteffect)
            player.cc.ylumps = player.cc.ylumps.add(ylumpsmult.mul(delta))

            let zlumpsmult = new Decimal(0)
            if ((player.cc.x > 0) && (player.cc.y < 0)) zlumpsmult = zlumpsmult.add(player.cc.y.mul(player.cc.x).pow(0.5))
            if ((player.cc.x < 0) && (player.cc.y < 0)) zlumpsmult = zlumpsmult.add(player.cc.y.mul(player.cc.x).pow(0.5))
            if ((player.cc.x < 0) && (player.cc.y > 0)) zlumpsmult = zlumpsmult.add(player.cc.y.mul(player.cc.x).pow(0.5))
            if (hasUpgrade('cc', 171)) zlumpsmult = zlumpsmult.add(player.cc.y.mul(player.cc.x).pow(0.5))
            zlumpsmult = zlumpsmult.times(player.cc.cultisteffect)
            player.cc.zlumps = player.cc.zlumps.add(zlumpsmult.mul(delta))

            let autowalkright = new Decimal(0)
            if (hasUpgrade('cc', 171)) autowalkright = autowalkright.add(10)
            if (hasUpgrade('cc', 182)) autowalkright = autowalkright.times(upgradeEffect('cc', 182))
            if (hasUpgrade('cc', 191)) autowalkright = autowalkright.times(upgradeEffect('cc', 191))
            autowalkright = autowalkright.times(buyableEffect('cc', 113))

            let autowalkforward = new Decimal(0)
            if (hasUpgrade('cc', 171)) autowalkforward = autowalkforward.add(10)
            if (hasUpgrade('cc', 181)) autowalkforward = autowalkforward.times(upgradeEffect('cc', 181))
            if (hasUpgrade('cc', 191)) autowalkforward = autowalkforward.times(upgradeEffect('cc', 191))
            autowalkforward = autowalkforward.times(buyableEffect('cc', 113))

            player.cc.x = player.cc.x.add(autowalkright.mul(delta))
            player.cc.y = player.cc.y.add(autowalkforward.mul(delta))

            let cookiebibleincome = new Decimal(0)
            if (hasUpgrade('cc', 192)) cookiebibleincome = cookiebibleincome.add(1)
            cookiebibleincome = cookiebibleincome.times(buyableEffect('cc', 121))
            cookiebibleincome = cookiebibleincome.times(player.cc.cookiebloodeffect)
            player.cc.cookiebibles = player.cc.cookiebibles.add(cookiebibleincome.mul(delta))

            player.cc.cookiebibleeffect = player.cc.cookiebibles.pow(0.5).add(1)

            let cultistincome = new Decimal(0)
            if (hasUpgrade('cc', 192)) cultistincome = cultistincome.add(player.cc.cookiebibles).pow(0.1)
            if (hasUpgrade('cc', 204)) cultistincome = cultistincome.times(upgradeEffect('cc', 204))
            if (player.cc.ritualactive > 0.5)
            {
                        cultistincome = cultistincome.times(player.cc.ritualactive.times(player.cc.cookiebloodeffect))
			}
            player.cc.cultists = player.cc.cultists.add(cultistincome.mul(delta))

            player.cc.cultisteffect = player.cc.cultists.pow(0.45).add(1)

            let cookiebloodincome = new Decimal(0)
            cookiebloodincome = cookiebloodincome.add(buyableEffect('cc', 122))
            if (hasUpgrade('cc', 202)) cookiebloodincome = cookiebloodincome.times(upgradeEffect('cc', 202))
            if (hasUpgrade('cc', 203)) cookiebloodincome = cookiebloodincome.times(upgradeEffect('cc', 203))
            player.cc.cookieblood = player.cc.cookieblood.add(cookiebloodincome.mul(delta))
            player.cc.cookieblood = player.cc.cookieblood.div(player.cc.ritualactive.mul(delta).add(1))

            player.cc.cookiebloodeffect = player.cc.cookieblood.pow(0.7).add(1)
            if (player.cc.cookiebloodeffect > 100000)
            {
                  player.cc.cookiebloodeffect = new Decimal(17000000).pow(0.7).add(1).times(player.cc.cookieblood.pow(0.001).add(1))           
			}

            let patreonsubscribersincome = new Decimal(0)
            patreonsubscribersincome = patreonsubscribersincome.add(buyableEffect('cc', 141))
            if (hasUpgrade('cc', 223)) patreonsubscribersincome = patreonsubscribersincome.times(upgradeEffect('cc', 223))
            player.cc.patreonsubscribers = player.cc.patreonsubscribers.add(patreonsubscribersincome.mul(delta))

            player.cc.patreoneffect = player.cc.patreonsubscribers.pow(0.1).mul(0.1).add(1)
            
        }
    },
            
        microtabs: {
        stuff: {
                    "Upgrades": {
                content: [
                    ["blank", "15px"],
                    "upgrades"
                ]
            },
            "Cookie Clicker": {
            unlocked() { return hasUpgrade("cc", 12) },
                content: [
                    ["blank", "15px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                    ["row", [["buyable", 21], ["buyable", 22], ["buyable", 23], ["buyable", 24]]],
                    ["row", [["buyable", 31], ["buyable", 32], ["buyable", 33], ["buyable", 34]]],
                    ["row", [["buyable", 41]]],
                    ["row", [["buyable", 51], ["buyable", 52], ["buyable", 53]]],
                    ["row", [["buyable", 61]]],
                    ["row", [["buyable", 71], ["buyable", 72], ["buyable", 73]]],
                ]
            },
                "Extended Cookie Clicker": {
                unlocked() { return hasUpgrade("cc", 121) },
                content: [
                    ["display-text", () => "You have " + format(player.cc.xcookies) + " X Cookies"],
                    ["display-text", () => "You have " + format(player.cc.ycookies) + " Y Cookies"],
                    ["display-text", () => "You have " + format(player.cc.zcookies) + " Z Cookies"],
                    ["row", [["buyable", 81], ["buyable", 82], ["buyable", 83]]],
                    ["row", [["upgrade", 122]]],
                    ["row", [["upgrade", 131], ["upgrade", 132], ["upgrade", 133]]],
                    ["row", [["upgrade", 141]]],
                ]
            },
                "Exploration": {
                unlocked() { return hasUpgrade("cc", 141) },
                content: [
                    ["display-text", () => "You have " + format(player.cc.xcookies) + " X Cookies"],
                    ["display-text", () => "You have " + format(player.cc.ycookies) + " Y Cookies"],
                    ["display-text", () => "You have " + format(player.cc.zcookies) + " Z Cookies"],
                    ["display-text", () => "You have " + format(player.cc.xlumps) + " X Sugar Lumps"],
                    ["display-text", () => "You have " + format(player.cc.ylumps) + " Y Sugar Lumps"],
                    ["display-text", () => "You have " + format(player.cc.zlumps) + " Z Sugar Lumps"],
                    ["blank", "15px"],
                    ["display-text", () => "You walked " + format(player.cc.x) + " Meters Right"],
                    ["display-text", () => "You walked " + format(player.cc.y) + " Meters Forward"],
                    ["row", [["buyable", 91], ["buyable", 92], ["buyable", 93], ["buyable", 94]]],
                    ["row", [["buyable", 101]]],
                    ["display-text", () => "Lump Generation Formula: P + P = xy, P + N = xz, N + N = yz, N + P = xz"],
                    ["display-text", () => "X Sugar Lumps are gained based on how much you traveled right, Y Sugar Lumps are gained based on how much you traveled forward, Z Sugar Lumps are gained based on both positions"],
                    ["row", [["upgrade", 151], ["upgrade", 152], ["upgrade", 153]]],
                    ["row", [["upgrade", 161], ["upgrade", 162], ["upgrade", 163]]],
                    ["row", [["upgrade", 171]]],
                    ["row", [["upgrade", 181], ["upgrade", 182]]],
                    ["row", [["buyable", 111], ["buyable", 112], ["buyable", 113]]],
                    ["row", [["upgrade", 191], ["upgrade", 192]]],
                ]
            },
                "Cookie Church": {
                unlocked() { return hasUpgrade("cc", 192) },
                content: [
                    ["display-text", () => "You have " + format(player.cc.xcookies) + " X Cookies"],
                    ["display-text", () => "You have " + format(player.cc.ycookies) + " Y Cookies"],
                    ["display-text", () => "You have " + format(player.cc.zcookies) + " Z Cookies"],
                    ["display-text", () => "You have " + format(player.cc.xlumps) + " X Sugar Lumps"],
                    ["display-text", () => "You have " + format(player.cc.ylumps) + " Y Sugar Lumps"],
                    ["display-text", () => "You have " + format(player.cc.zlumps) + " Z Sugar Lumps"],
                    ["blank", "15px"],
                    ["display-text", () => "You have " + format(player.cc.cookiebibles) + " Cookie Bibles and a x" + format(player.cc.cookiebibleeffect) + " boost to all layer 1 buyables except the last one"],
                    ["display-text", () => "You have " + format(player.cc.cultists) + " Cultists and a x" + format(player.cc.cultisteffect) + " boost to all layer all Dimensional cookies and Lumps"],
                    ["display-text", () => "You have " + format(player.cc.cookieblood) + " Cookie Blood and a x" + format(player.cc.cookiebloodeffect) + " boost to Cookie Bible production"],
                    ["row", [["buyable", 121], ["buyable", 122]]],
                    ["row", [["buyable", 131], ["buyable", 132]]],
                    ["row", [["upgrade", 201], ["upgrade", 202], ["upgrade", 203], ["upgrade", 204]]],
                    ["row", [["upgrade", 211]]],
                ]
            },
                "Patreon (SUS)": {
                unlocked() { return hasUpgrade("l", 14) },
                content: 
                [
                    ["display-text", () => "You have " + format(player.cc.patreonsubscribers) + " Patreon Subscribers and a x" + format(player.cc.patreoneffect) + " boost to $ gain"],
                    ["display-text", () => "Your Salary is " + format(player.l.$persecond.mul(3600)) + "$ per hour"],
                    ["row", [["buyable", 141]]],
                    ["row", [["upgrade", 221], ["upgrade", 222], ["upgrade", 223]]],
                ]
            },
        },
    },

        tabFormat: [
        "main-display",
        "prestige-button",
        ["display-text", () => "You have " + format(player.cc.sugarlumps) + " Sugar Lumps"],
        ["display-text", () => "You have " + format(player.cc.heavenlychips) + " Heavenly Chips"],
        ["display-text", () => "You have " + format(player.cc.wrinklerjuice) + " Wrinkler Juice, which produces free Grandmas"],
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    layerShown(){return hasUpgrade("i", 61)},
})
addLayer("l", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        $persecond: new Decimal(0),
        savedmoney: new Decimal(0),
        savedmoneyeffect: new Decimal(0),
        cookietime: new Decimal(0),
        cookietimeeffect: new Decimal(0)
    }},
    color: "green",
    resource: "$", 
    row: "side",
    branches: ["i"],
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Life")
    },
    tabFormat: [
        "main-display",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    upgrades: 
    {
        11:
        {
            title: "Big Mac",
            description: "Boosts Points based on $",
            cost: new Decimal(4.95),
                effect() 
                {
                     return player[this.layer].points.pow(10).mul(1e10)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12:
        {
            title: "Notebook",
            cost: new Decimal(7.49),
            unlocked() { return hasUpgrade("l", 11) },
            description: "Boosts Incremental Points based on $",
                effect() 
                {
                     return player[this.layer].points.pow(9.5).mul(1e10)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13:
        {
            title: "Headphones",
            cost: new Decimal(19.99),
            unlocked() { return hasUpgrade("l", 12) },
            description: "Boosts Cookies based on $",
                effect() 
                {
                     return player[this.layer].points.pow(2.4).mul(1e1)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14:
        {
            title: "A Patreon Account (AYO?) (The Final Quarter of the Cookie Clicker Layer)",
            cost: new Decimal(29.99),
            unlocked() { return hasUpgrade("l", 13) },
            description: "Unlocks a new tab in the Cookie Clicker layer",
        },
        21:
        {
            title: "Chromebook",
            description: "Boosts $ based on $",
            unlocked() { return hasUpgrade("l", 14) },
            cost: new Decimal(139.99),
                effect() 
                {
                     return player[this.layer].points.pow(0.02)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22:
        {
            title: "Finish the Cookie Clicker Layer",
            description: "Get Ready for another layer...",
            unlocked() { return hasUpgrade("l", 21) },
            cost: new Decimal(250),
        },
    },
    buyables:
    {
        11: {
        cost(x) { return },
        title: "Deposit Money into Savings Account",
        unlocked() { return hasUpgrade("l", 12) },
        canAfford() { return true },
        buy() {
        player.l.savedmoney = player.l.savedmoney.add(player.l.points)
        player.l.points = new Decimal(0)
        },
    },
    },
        
        update(delta) 
        {
            player.l.$persecond = player.points.log10(1).log10(1).pow(0.5).div(500).mul(player.cc.patreoneffect)
            if (hasUpgrade("l", 21)) player.l.$persecond = player.l.$persecond.mul(upgradeEffect("l", 21))
            player.l.points = player.l.points.add(player.l.$persecond.mul(delta))
            player.l.savedmoneyeffect = player.l.savedmoney.pow(10.5).add(1)

            let cookietimeincome = new Decimal(0)
            if (hasUpgrade("l", 22)) cookietimeincome = cookietimeincome.add(1)
            player.l.cookietime = player.l.cookietime.add(cookietimeincome.mul(delta))

            player.l.cookietimeeffect = player.l.cookietime.pow(4).add(1)
        },
    microtabs: 
    {
        stuff: 
        {
          "Finance": {
          content: [
          ["blank", "15px"],
          ["display-text", () => "You Gain Dollars Based on the Log10(Log10)^0.5/500 of Points you have"],
          ["display-text", () => format(player.l.$persecond) + "$ per second"],
          ["display-text", () => "Your Salary is " + format(player.l.$persecond.mul(3600)) + "$ per hour"],
          ["display-text", () => "You Specifically Have " + format(player.l.points) + "$"],   
          ["display-text", () => "You Have " + format(player.l.savedmoney) + "$ in your Savings Account and a x" + format(player.l.savedmoneyeffect) + " boost to Points"],   
          ["row", [["buyable", 11]]],
          ]
          },
          "Supermarket": 
          {
          content: [
          ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
          ["row", [["upgrade", 21], ["upgrade", 22]]],
          ]
          },
                "The List of Games Made": {
                unlocked() { return hasUpgrade("l", 22) },
                content: 
                [
                    ["blank", "15px"],
                    ["display-text", () => "Cookie Clicker Time: " + formatTime(player.l.cookietime) + " -> x" + format(player.l.cookietimeeffect) + " boost to Points"],
                ]
            },
        },
    },
    layerShown(){return hasUpgrade("cc", 211)}
            
},
)