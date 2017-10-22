function steve(){
    if(!trackerData.items.moonpearl)
	return false;
    if(trackerData.items.glove==2 || (trackerData.items.glove && trackerData.items.hammer))
	return true;
    return trackerData.items.agahnim && trackerData.items.hookshot && (trackerData.items.hammer || trackerData.items.glove || trackerData.items.flippers);
}

function stevelight(){
    return trackerData.items.moonpearl && trackerData.items.hookshot && (trackerData.items.hammer || trackerData.items.glove || trackerData.items.flippers) && (trackerData.items.sword>=2 || trackerData.items.cape);
}

function deathmountain(){
    return trackerData.items.flute || (trackerData.items.glove && trackerData.items.lantern);
}

function deathmountaindarkness(){
    return trackerData.items.glove;
}

// define dungeon chests
var dungeons = new Array;

dungeons[0] = {
    name: "Eastern Palace",
    label: "EP",
    x: "46.8%",
    y: "38.8%",
    image: "boss02.png",
    isBeatable: function(){
		if(trackerData.items.bow)
            if(trackerData.items.lantern)
                return "available";
            else
                return "glitchavailable";
		else
			return "unavailable";
    },
    canGetChest: function(){
        if(trackerData.dungeonchests[0]>2)
            return "available";
        if(trackerData.dungeonchests[0]>1 || trackerData.items.bow)
            if(trackerData.items.lantern)
                return "available";
            else
                return "glitchavailable";
        if(trackerData.dungeonchests[0]>0)
            if(trackerData.items.lantern)
                return "possible"
            else
                return "glitchpossible"
        return "unavailable";
    }
};

dungeons[1] = {
    name: "Desert Palace",
    label: "DP",
    x: "3.8%",
    y: "78.4%",
    image: "boss12.png",
    isBeatable: function(){
		if(!trackerData.items.glove)
			return "unavailable";
		if(!trackerData.items.book && !(trackerData.items.flute && trackerData.items.glove==2 && trackerData.items.mirror))
			return "unavailable";
		if(!trackerData.items.lantern && !trackerData.items.firerod)
			return "unavailable";
		if(trackerData.items.sword==0 && !trackerData.items.hammer && !trackerData.items.bow && !trackerData.items.firerod && !trackerData.items.icerod && !trackerData.items.byrna && !trackerData.items.somaria)
			return "unavailable";
		if(!trackerData.items.boots)
			return "possible";
		return "available";
    },
    canGetChest: function(){
        if(!trackerData.items.book && !(trackerData.items.flute && trackerData.items.glove==2 && trackerData.items.mirror))
            return "unavailable";
        if(trackerData.dungeonchests[1]>1 && trackerData.items.boots)
            return "available"
        if(trackerData.items.boots && (trackerData.items.firerod || trackerData.items.lantern) && trackerData.items.glove)
            if(trackerData.items.sword==0 && !trackerData.items.hammer && !trackerData.items.bow && !trackerData.items.firerod && !trackerData.items.icerod && !trackerData.items.byrna && !trackerData.items.somaria)
                return "possible"
            else
                return "available"
        return "possible";
    }
};

dungeons[2] = {
    name: "Tower of Hera",
    label: "ToH",
    x: "31.0%",
    y: "5.5%",
    image: "boss22.png",
    isBeatable: function(){
		if(!trackerData.items.mirror && !(trackerData.items.hookshot && trackerData.items.hammer))
			return "unavailable";
        if(!deathmountain() && !deathmountaindarkness())
            return "unavailable";
        if(trackerData.items.sword==0 && !trackerData.items.hammer)
            return "unavailable";
        if(!deathmountain())
            return "glitchavailable";
		if(trackerData.items.firerod || trackerData.items.lantern)
			return "available";
		return "possible";
    },
    canGetChest: function(){
        if(!trackerData.items.mirror && !(trackerData.items.hookshot && trackerData.items.hammer))
            return "unavailable";
        if(!deathmountain() && !deathmountaindarkness())
            return "unavailable";
        if(!deathmountain())
            if(trackerData.dungeonchests[2]<2 && (trackerData.items.sword==0 && !trackerData.items.hammer))
                return "glitchpossible";
            else
                return "glitchavailable";
        if(trackerData.items.firerod || trackerData.items.lantern)
            if(trackerData.dungeonchests[2]<2 && (trackerData.items.sword==0 && !trackerData.items.hammer))
                return "possible";
            else
                return "available";
        return "possible";
    }
};

dungeons[3] = {
    name: "Palace of Darkness <img src='/images/lantern.png' class='mini'>",
    label: "PoD",
    x: "97.0%",
    y: "40.0%",
    image: "boss32.png",
    isBeatable: function(){
        if(!trackerData.items.moonpearl || !(trackerData.items.bow) || !trackerData.items.hammer)
            return "unavailable";
        if(!trackerData.items.agahnim && !trackerData.items.glove)
            if(!(trackerData.items.sword>=2 || trackerData.items.cape))
                return "unavailable";
            else
                return "agahnim";
        if(!trackerData.items.lantern)
            return "glitchavailable";
        return "available";
    },
    canGetChest: function(){
		if(!trackerData.items.moonpearl)
			return "unavailable";
        if(!trackerData.items.agahnim && !(trackerData.items.hammer&&trackerData.items.glove) && !(trackerData.items.glove==2 && trackerData.items.flippers))
            if(!(trackerData.items.sword>=2 || trackerData.items.cape))
                return "unavailable";
            else
                return "agahnim";
		if(trackerData.items.bow && (trackerData.dungeonchests[3]>1 || trackerData.items.hammer))
            if(trackerData.items.lantern)
                return "available";
            else
                return "glitchavailable";
        if(trackerData.items.lantern)
            return "possible";
        else
            return "glitchpossible";
    }
};

dungeons[4] = {
    name: "Swamp Palace <img src='/images/mirror.png' class='mini'>",
    label: "SP",
    x: "73.5%",
    y: "91.0%",
    image: "boss42.png",
    isBeatable: function(){
		if(!trackerData.items.moonpearl || !trackerData.items.mirror || !trackerData.items.flippers)
			return "unavailable";
		if(!trackerData.items.hammer || !trackerData.items.hookshot)
			return "unavailable";
		if(!trackerData.items.glove && !trackerData.items.agahnim)
            if(!(trackerData.items.sword>=2 || trackerData.items.cape))
                return "unavailable";
            else
                return "agahnim";
		return "available";
	},
    canGetChest: function(){
		if(!trackerData.items.moonpearl || !trackerData.items.mirror || !trackerData.items.flippers)
			return "unavailable";
        if(!steve() && (!trackerData.items.agahnim && (stevelight() || (trackerData.items.hammer && (trackerData.items.sword>=2 || trackerData.items.cape)))))
            return "agahnim";
		if(!steve() && !(trackerData.items.agahnim && trackerData.items.hammer))
			return "unavailable";

		// Here we go...
		if(trackerData.dungeonchests[4]<=2)
			if(trackerData.items.hookshot && trackerData.items.hammer)
				return "available";
			else
				return "unavailable";
		if(trackerData.dungeonchests[4]<=4){
			if(!trackerData.items.hammer)
				return "unavailable";
			if(trackerData.items.hookshot)
				return "available";
			return "possible";
		}
		if(trackerData.dungeonchests[4]==5)
			if(trackerData.items.hammer)
				return "available";
			else
				return "unavailable";
		if(trackerData.items.hammer)
			return "available";
		return "possible";
    }
};

dungeons[5] = {
    name: "Skull Woods",
    label: "SW",
    x: "53.3%",
    y: "5.4%",
    image: "boss52.png",
    isBeatable: function(){
        if(trackerData.items.sword==0)
            return "unavailable";
        if(steve() && trackerData.items.firerod)
            return "available";
        if(stevelight() && trackerData.items.firerod)
            return "agahnim";
        return "unavailable";
    },
    canGetChest: function(){
        if(steve())
            if(trackerData.items.firerod && (trackerData.dungeonchests[5]>1 || trackerData.items.sword>0))
                return "available";
            else
                return "possible";
        if(stevelight())
            return "agahnim";
        return "unavailable";
    }
};

dungeons[6] = {
    name: "Thieves' Town",
    label: "TT",
    x: "56.4%",
    y: "47.9%",
    image: "boss62.png",
    isBeatable: function(){
        if(trackerData.items.sword==0 && !trackerData.items.hammer && !trackerData.items.byrna && !trackerData.items.somaria)
            return "unavailable";
		if(steve())
			return "available";
        if(stevelight())
            return "agahnim";
		return "unavailable";
    },
    canGetChest: function(){
		if(!stevelight() && !steve())
			return "unavailable";
        if(!steve())
            return "agahnim";
		if(trackerData.dungeonchests[6]==1 && !trackerData.items.hammer)
			return "possible";
		return "available";
    }
};

dungeons[7] = {
    name: "Ice Palace (yellow=must bomb jump)",
    label: "IP",
    x: "89.8%",
    y: "85.8%",
    image: "boss72.png",
    isBeatable: function(){
		if(!trackerData.items.moonpearl || trackerData.items.glove!=2 || !trackerData.items.hammer)
			return "unavailable";
		if(!trackerData.items.firerod && !(trackerData.items.bombos && trackerData.items.sword > 0 ))
			return "unavailable";
		if(trackerData.items.hookshot || trackerData.items.somaria)
            if(trackerData.items.flippers)
                return "available";
            else
                return "glitchavailable";
        if(trackerData.items.flippers)
            return "possible";
        else
            return "glitchpossible";
    },
    canGetChest: function(){
		if(!trackerData.items.moonpearl || trackerData.items.glove!=2)
			return "unavailable";
		if(!trackerData.items.firerod && !trackerData.items.bombos)
			return "unavailable";
		if(trackerData.items.hammer)
            if(trackerData.items.flippers)
                return "available";
            else
                return "glitchavailable";
        if(trackerData.items.flippers)
            return "possible";
        else
            return "glitchpossible";
    }
};

dungeons[8] = {
    name: "Misery Mire <img src='/images/medallion0.png' class='mini'><img src='/images/lantern.png' class='mini'>",
    label: "MM",
    x: "55.8%",
    y: "82.9%",
    image: "boss82.png",
    isBeatable: function(){
		if(!trackerData.items.moonpearl || !trackerData.items.flute || trackerData.items.glove!=2 || !trackerData.items.somaria)
			return "unavailable";
		if(!trackerData.items.boots && !trackerData.items.hookshot)
			return "unavailable";
        // Medallion Check
        if(trackerData.items.sword==0)
            return "unavailable";
		if(!trackerData.items.bombos && !trackerData.items.ether && !trackerData.items.quake)
			return "unavailable";
		if((trackerData.medallions[8]==1 && !trackerData.items.bombos) || (trackerData.medallions[8]==2 && !trackerData.items.ether) || (trackerData.medallions[8]==3 && !trackerData.items.quake))
			return "unavailable";
		if(trackerData.medallions[8]==0 && !(trackerData.items.bombos && trackerData.items.ether && trackerData.items.quake))
			return "possible";

		if(trackerData.items.lantern)
			return "available";
        if(trackerData.items.firerod)
            return "glitchavailable";
		return "glitchpossible";
    },
    canGetChest: function(){
		if(!trackerData.items.moonpearl || !trackerData.items.flute || trackerData.items.glove!=2)
			return "unavailable";
		if(!trackerData.items.boots && !trackerData.items.hookshot)
			return "unavailable";
		// Medallion Check
        if(trackerData.items.sword==0)
            return "unavailable";
		if(!trackerData.items.bombos && !trackerData.items.ether && !trackerData.items.quake)
			return "unavailable";
		if((trackerData.medallions[8]==1 && !trackerData.items.bombos) || (trackerData.medallions[8]==2 && !trackerData.items.ether) || (trackerData.medallions[8]==3 && !trackerData.items.quake))
			return "unavailable";
		if(trackerData.medallions[8]==0 && !(trackerData.items.bombos && trackerData.items.ether && trackerData.items.quake))
			return "possible";
		
		if(!trackerData.items.firerod && !trackerData.items.lantern)
			return "possible";
        if(trackerData.dungeonchests[8]>1)
            return "available"
		if(trackerData.items.somaria)
            if(trackerData.items.lantern)
                return "available";
            else
                return "glitchavailable";
		return "possible";
    }
};

dungeons[9] = {
    name: "Turtle Rock <img src='/images/medallion0.png' class='mini'><img src='/images/lantern.png' class='mini'>",
    label: "TR",
    x: "96.9%",
    y: "7.0%",
    image: "boss92.png",
    isBeatable: function(){
		if(!trackerData.items.moonpearl || !trackerData.items.hammer || trackerData.items.glove!=2 || !trackerData.items.somaria)
			return "unavailable";
		if(!trackerData.items.hookshot && !trackerData.items.mirror)
			return "unavailable";
		if(!trackerData.items.icerod || !trackerData.items.firerod)
			return "unavailable";
		// Medallion Check
        if(trackerData.items.sword==0)
            return "unavailable";
		if(!trackerData.items.bombos && !trackerData.items.ether && !trackerData.items.quake)
			return "unavailable";
		if((trackerData.medallions[9]==1 && !trackerData.items.bombos) || (trackerData.medallions[9]==2 && !trackerData.items.ether) || (trackerData.medallions[9]==3 && !trackerData.items.quake))
			return "unavailable";
		if(trackerData.medallions[9]==0 && !(trackerData.items.bombos && trackerData.items.ether && trackerData.items.quake))
            if(!trackerData.items.lantern)
                return "glitchpossible";
            else
                return "possible";
        if(!trackerData.items.lantern)
            return "glitchavailable";
		return "available";
    },
    canGetChest: function(){
		if(!trackerData.items.moonpearl || !trackerData.items.hammer || trackerData.items.glove!=2 || !trackerData.items.somaria)
			return "unavailable";
		if(!trackerData.items.hookshot && !trackerData.items.mirror)
			return "unavailable";
		// Medallion Check
        if(trackerData.items.sword==0)
            return "unavailable";
		if(!trackerData.items.bombos && !trackerData.items.ether && !trackerData.items.quake)
			return "unavailable";
		if((trackerData.medallions[9]==1 && !trackerData.items.bombos) || (trackerData.medallions[9]==2 && !trackerData.items.ether) || (trackerData.medallions[9]==3 && !trackerData.items.quake))
			return "unavailable";
		if(trackerData.medallions[9]==0 && !(trackerData.items.bombos && trackerData.items.ether && trackerData.items.quake))
            if(!trackerData.items.flute && !trackerData.items.lantern) // dark navigation to DM
                return "glitchpossible";
            else
                return "possible";

		if(!trackerData.items.firerod)
            if(!trackerData.items.flute && !trackerData.items.lantern) // dark navigation to DM
                return "glitchpossible";
            else
                if(trackerData.items.lantern)
                    return "possible";
                else
                    return "glitchpossible"

        if(trackerData.dungeonchests[9]>1)
            if(!trackerData.items.flute && !trackerData.items.lantern) // dark navigation to DM
                return "glitchavailable";
            else
                if(trackerData.items.lantern)
                    return "available";
                else
                    return "glitchavailable"

        if(trackerData.items.icerod) // Last item on Trinexx
            if(!trackerData.items.lantern)
                return "glitchavailable";
            else
                return "available";

        if(!trackerData.items.flute && !trackerData.items.lantern)
            return "glitchpossible";
        else
            if(trackerData.items.lantern)
                    return "possible";
                else
                    return "glitchpossible"
    }
};

//define overworld chests
var chests = new Array;

chests[0] = {
    name: "King's Tomb <img src='/images/boots.png' class='mini'> + <img src='/images/glove2.png' class='mini'>/<img src='/images/mirror.png' class='mini'>",
    x: "30.8%",
    y: "29.6%",
    isOpened: false,
    isAvailable: function(){
		if(!trackerData.items["boots"])
			return "unavailable";
		if ( (steve() && trackerData.items["mirror"]) || trackerData.items["glove"]==2 )
			return "available";
        if (stevelight() && trackerData.items.mirror)
            return "agahnim";
		return "unavailable";
    }
};

chests[1] = {
    name: "Light World Swamp (2)",
    x: "23.4%",
    y: "93.4%",
    isOpened: false,
    isAvailable: function(){
	return "available";
    }
};

chests[2] = {
    name: "Link's Hoose",
    x: "27.4%",
    y: "67.9%",
    isOpened: true,
    isAvailable: function(){
	return "available";
    }
};

chests[3] = {
    name: "Spiral Cave",
    x: "39.9%",
    y: "9.3%",
    isOpened: false,
    isAvailable: function(){
	if ( (trackerData.items["hookshot"] || (trackerData.items["mirror"]&&trackerData.items["hammer"])))
        if (deathmountain())
            return "available";
        else if (deathmountaindarkness())
            return "glitchavailable";
	return "unavailable";
    }
};

chests[4] = {
    name: "Mimic Cave (<img src='/images/mirror.png' class='mini'> outside of Turtle Rock)(Yellow = <img src='/images/medallion0.png' class='mini'> unkown OR possible w/out <img src='/images/firerod.png' class='mini'>)",
    x: "42.6%",
    y: "9.3%",
    isOpened: false,
    isAvailable: function(){
		if(!trackerData.items.moonpearl || !trackerData.items.hammer || trackerData.items.glove!=2 || !trackerData.items.somaria || !trackerData.items.mirror)
			return "unavailable";
		// Medallion Check
		if(!trackerData.items.bombos && !trackerData.items.ether && !trackerData.items.quake)
			return "unavailable";
		if((trackerData.medallions[9]==1 && !trackerData.items.bombos) || (trackerData.medallions[9]==2 && !trackerData.items.ether) || (trackerData.medallions[9]==3 && !trackerData.items.quake))
			return "unavailable";
		if(trackerData.medallions[9]==0 && !(trackerData.items.bombos && trackerData.items.ether && trackerData.items.quake))
            if(!trackerData.items.flute && !trackerData.items.lantern)
                return "glitchpossible";
            else
                return "possible";

		if(trackerData.items.firerod)
            if(!trackerData.items.flute && !trackerData.items.lantern)
                return "glitchavailable";
            else
                return "available";
        if(!trackerData.items.flute && !trackerData.items.lantern)
            return "glitchpossible";
        else
            return "possible";
    }
};

chests[5] = {
    name: "Tavern",
    x: "8.1%",
    y: "57.8%",
    isOpened: false,
    isAvailable: function(){
	return "available";
    }
};

chests[6] = {
    name: "Chicken House <img src='/images/bomb.png' class='mini'>",
    x: "4.4%",
    y: "54.2%",
    isOpened: false,
    isAvailable: function(){
	return "available";
    }
};

chests[7] = {
    name: "Bombable Hut <img src='/images/bomb.png' class='mini'>",
    x: "55.4%",
    y: "57.8%",
    isOpened: false,
    isAvailable: function(){
		if(steve())
			return "available";
        if(stevelight())
            return "agahnim";
		return "unavailable";
    }
};

chests[8] = {
    name: "C House",
    x: "60.8%",
    y: "47.9%",
    isOpened: false,
    isAvailable: function(){
		if(steve())
			return "available";
        if(stevelight())
            return "agahnim";
		return "unavailable";
    }
};

chests[9] = {
    name: "Aginah's Cave <img src='/images/bomb.png' class='mini'>",
    x: "10.0%",
    y: "82.6%",
    isOpened: false,
    isAvailable: function(){
		return "available";
    }
};

chests[10] = {
    name: "West of Mire (2)",
    x: "51.7%",
    y: "79.5%",
    isOpened: false,
    isAvailable: function(){
		if( trackerData.items["flute"] && trackerData.items["moonpearl"] && trackerData.items["glove"]==2 )
			return "available";
		return "unavailable";
    }
};

chests[11] = {
    name: "DW Death Mountain (2) : Don't need <img src='/images/moonpearl.png' class='mini'>",
    x: "92.8%",
    y: "14.7%",
    isOpened: false,
    isAvailable: function(){
		if( trackerData.items["glove"]==2 && (trackerData.items["hookshot"] || (trackerData.items["mirror"]&&trackerData.items["hammer"])) )
            if (deathmountain() && trackerData.items.moonpearl)
                return "available";
            else
                return "glitchavailable";
		return "unavailable";
    }
};

chests[12] = {
    name: "Sahasrahla's Hut (3) <img src='/images/bomb.png' class='mini'>/<img src='/images/boots.png' class='mini'>",
    x: "40.7%",
    y: "41.4%",
    isOpened: false,
    isAvailable: function(){
	return "available";
    }
};

chests[13] = {
    name: "Byrna Spike Cave",
    x: "78.6%",
    y: "14.9%",
    isOpened: false,
    isAvailable: function(){
	if( trackerData.items["moonpearl"] && trackerData.items["glove"] && trackerData.items["hammer"] )
        if (deathmountain())
            return "available";
        else if (deathmountaindarkness())
            return "glitchavailable";
	return "unavailable";
    }
};

chests[14] = {
    name: "Kakariko Well (4 + <img src='/images/bomb.png' class='mini'>)",
    x: "1.7%",
    y: "41.0%",
    isOpened: false,
    isAvailable: function(){
	return "available";
    }
};

chests[15] = {
    name: "Thieves' Hut (4 + <img src='/images/bomb.png' class='mini'>)",
    x: "6.4%",
    y: "41.0%",
    isOpened: false,
    isAvailable: function(){
	return "available";
    }
};

chests[16] = {
    name: "Hype Cave! <img src='/images/bomb.png' class='mini'> (NPC + 4 <img src='/images/bomb.png' class='mini'>)",
    x: "80.0%",
    y: "77.1%",
    isOpened: false,
    isAvailable: function(){
	if( steve() || (trackerData.items.agahnim && trackerData.items.moonpearl && trackerData.items.hammer) )
		return "available";
    if( stevelight() ||  (trackerData.items.moonpearl && trackerData.items.hammer && (trackerData.items.sword>=2 || trackerData.items.cape)) )
        return "agahnim";
	return "unavailable";
    }
};

chests[17] = {
    name: "Death Mountain East (5 + 2 <img src='/images/bomb.png' class='mini'>)",
    x: "41.4%",
    y: "17.1%",
    isOpened: false,
    isAvailable: function(){
	if( (trackerData.items["hookshot"] || (trackerData.items["mirror"]&&trackerData.items["hammer"])) )
        if( deathmountain())
            return "available";
        else if( deathmountaindarkness())
            return "glitchavailable";
	return "unavailable";
		
    }
};

chests[18] = {
    name: "West of Sanctuary <img src='/images/boots.png' class='mini'>",
    x: "19.5%",
    y: "29.3%",
    isOpened: false,
    isAvailable: function(){
	if(trackerData.items.boots)
			return "available";
		return "unavailable";

    }
};

chests[19] = {
    name: "Minimoldorm Cave (NPC + 4) <img src='/images/bomb.png' class='mini'>",
    x: "32.6%",
    y: "93.4%",
    isOpened: false,
    isAvailable: function(){
	return "available";
    }
};

chests[20] = {
    name: "Ice Rod Cave <img src='/images/bomb.png' class='mini'>",
    x: "44.7%",
    y: "76.9%",
    isOpened: false,
    isAvailable: function(){
	return "available";
    }
};

chests[21] = {
    name: "Cave Under Rock (bottom chest) <img src='/images/hookshot.png' class='mini'>/<img src='/images/boots.png' class='mini'>",
    x: "91.6%",
    y: "8.6%",
    isOpened: false,
    isAvailable: function(){
	if(trackerData.items.moonpearl && trackerData.items.glove==2 && (trackerData.items.hookshot || (trackerData.items.mirror&&trackerData.items.hammer&&trackerData.items.boots)))
        if (deathmountain())
            return "available";
        else
            return "glitchavailable";
    return "unavailable";
    }
};

chests[22] = {
    name: "Cave Under Rock (3 top chests) <img src='/images/hookshot.png' class='mini'>",
    x: "91.6%",
    y: "3.4%",
    isOpened: false,
    isAvailable: function(){
	if( trackerData.items.moonpearl && trackerData.items.glove==2 && trackerData.items.hookshot)
        if (deathmountain())
            return "available";
        else
            return "glitchavailable";
		return "unavailable";
    }
};

chests[23] = {
    name: "Treasure Chest Minigame: Pay 30 rupees",
    x: "52.1%",
    y: "46.4%",
    isOpened: false,
    isAvailable: function(){
	if(steve())
		return "available";
    if(stevelight())
        return "agahnim";
	return "unavailable";

    }
};

chests[24] = {
    name: "Bottle Vendor: Pay 100 rupees",
    x: "4.5%",
    y: "46.8%",
    isOpened: false,
    isAvailable: function(){
	return "available";
    }
};

chests[25] = {
    name: "Sahasrahla <img src='/images/pendant0.png' class='mini'>",
    x: "40.7%",
    y: "46.7%",
    isOpened: false,
    isAvailable: function(){
		for(var k=0; k<10; k++)
			if(trackerData.prizes[k]==1 && trackerData.items["boss"+k]==2)
				return "available";
		return "unavailable";
    }
};

chests[26] = {
    name: "Stump Kid",
    x: "65.5%",
    y: "68.6%",
    isOpened: false,
    isAvailable: function(){
	if( steve() || (trackerData.items.agahnim && trackerData.items.moonpearl && trackerData.items.hammer) )
		return "available";
    if( stevelight() || (trackerData.items.moonpearl && trackerData.items.hammer && (trackerData.items.sword>=2 || trackerData.items.cape)) )
        return "agahnim";
	return "unavailable";
    }
};

chests[27] = {
    name: "Bug Kid <img src='/images/bottle0.png' class='mini'>",
    x: "7.8%",
    y: "52.1%",
    isOpened: false,
    isAvailable: function(){
	if(trackerData.items.bottle)
		return "available";
	return "unavailable";
    }
};

chests[28] = {
    name: "Show the Purple Chest to Gary",
    x: "65.2%",
    y: "52.2%",
    isOpened: false,
    isAvailable: function(){
	if(trackerData.items.moonpearl && trackerData.items.glove==2)
		return "available";
	return "unavailable";
    }
};

chests[29] = {
    name: "Fugitive under the bridge <img src='/images/flippers.png' class='mini'>",
    x: "35.4%",
    y: "69.7%",
    isOpened: false,
    isAvailable: function(){
	if(trackerData.items.flippers)
		return "available";
	return "glitchavailable";
    }
};

chests[30] = {
    name: "Ether Tablet <img src='/images/sword2.png' class='mini'><img src='/images/book.png' class='mini'>",
    x: "21.0%",
    y: "3.0%",
    isOpened: false,
    isAvailable: function(){
	if( trackerData.items.sword>=2 && trackerData.items.book && (deathmountain()) && (trackerData.items.mirror || (trackerData.items.hookshot&&trackerData.items.hammer)) )
		return "available";
	if( trackerData.items.sword>=2 && trackerData.items.book && (deathmountaindarkness()) && (trackerData.items.mirror || (trackerData.items.hookshot&&trackerData.items.hammer)) )
        return "glitchavailable";
    if( trackerData.items.book && (deathmountain()) && (trackerData.items.mirror || (trackerData.items.hookshot&&trackerData.items.hammer)) )
        return "possible";
    if( trackerData.items.book && (deathmountaindarkness()) && (trackerData.items.mirror || (trackerData.items.hookshot&&trackerData.items.hammer)) )
        return "glitchpossible";
	return "unavailable";
    }
};

chests[31] = {
    name: "Bombos Tablet <img src='/images/mirror.png' class='mini'><img src='/images/sword2.png' class='mini'><img src='/images/book.png' class='mini'>",
    x: "11.0%",
    y: "92.2%",
    isOpened: false,
    isAvailable: function(){
	if( (steve() || (trackerData.items.agahnim && trackerData.items.moonpearl && trackerData.items.hammer)) && trackerData.items.mirror && trackerData.items.sword>=2 && trackerData.items.book )
		return "available";
	if( (stevelight() || (trackerData.items.moonpearl && trackerData.items.hammer && (trackerData.items.sword>=2 || trackerData.items.cape))) && trackerData.items.mirror && trackerData.items.sword>=2 && trackerData.items.book )
        return "agahnim";
    if( (steve() || (trackerData.items.agahnim && trackerData.items.moonpearl && trackerData.items.hammer)) && trackerData.items.mirror && trackerData.items.book )
        return "possible";
	return "unavailable";
    }
};

chests[32] = {
    name: "Catfish",
    x: "96.0%",
    y: "17.2%",
    isOpened: false,
    isAvailable: function(){
	if( trackerData.items.moonpearl && trackerData.items.glove && (trackerData.items.agahnim || trackerData.items.hammer || (trackerData.items.glove==2 && trackerData.items.flippers)) )
		return "available";
	if( trackerData.items.moonpearl && trackerData.items.glove  && (trackerData.items.sword>=2 || trackerData.items.cape))
        return "agahnim";
	return "unavailable";
    }
};

chests[33] = {
    name: "King Zora: Pay 500 rupees",
    x: "47.5%",
    y: "12.1%",
    isOpened: false,
    isAvailable: function(){
	if( trackerData.items.flippers || trackerData.items.glove )
		return "available";
	return "glitchavailable";
    }
};

chests[34] = {
    name: "Lost Old Man",
    x: "20.8%",
    y: "20.4%",
    isOpened: false,
    isAvailable: function(){
	if( deathmountain() )
		return trackerData.items.lantern ? "available" : "glitchavailable";
    if( deathmountaindarkness() )
        return "glitchavailable";
	return "unavailable";
    }
};

chests[35] = {
    name: "Witch: Give her <img src='/images/mushroom.png' class='mini'>",
    x: "40.8%",
    y: "32.5%",
    isOpened: false,
    isAvailable: function(){
	if(trackerData.items.mushroom)
		return "available";
	return "unavailable";
    }
};

chests[36] = {
    name: "Forest Hideout",
    x: "9.4%",
    y: "13.0%",
    isOpened: false,
    isAvailable: function(){
		return "available";
    }
};

chests[37] = {
    name: "Lumberjack Tree <img src='/images/agahnim1.png' class='mini'><img src='/images/boots.png' class='mini'>",
    x: "15.1%",
    y: "7.6%",
    isOpened: false,
    isAvailable: function(){
	if( trackerData.items.agahnim && trackerData.items.boots )
		return "available";
    if( trackerData.items.boots && (trackerData.items.sword>=2 || trackerData.items.cape) )
        return "agahnim";
	return "possible";
    }
};

chests[38] = {
    name: "Spectacle Rock Cave",
    x: "24.3%",
    y: "14.8%",
    isOpened: false,
    isAvailable: function(){
	if( deathmountain() )
		return "available";
    if( deathmountaindarkness() )
        return "glitchavailable";
	return "unavailable";
    }
};

chests[39] = {
    name: "South of Grove <img src='/images/mirror.png' class='mini'>",
    x: "14.1%",
    y: "84.1%",
    isOpened: false,
    isAvailable: function(){
	if( trackerData.items.mirror && (steve() || (trackerData.items.agahnim && trackerData.items.moonpearl && trackerData.items.hammer)) )
		return "available";
    if( trackerData.items.mirror && (stevelight() || (trackerData.items.moonpearl && trackerData.items.hammer && (trackerData.items.sword>=2 || trackerData.items.cape) )))
        return "agahnim";
	return "unavailable";
    }
};

chests[40] = {
    name: "Graveyard Cliff Cave <img src='/images/mirror.png' class='mini'>",
    x: "28.1%",
    y: "27.0%",
    isOpened: false,
    isAvailable: function(){
	if( steve() && trackerData.items.mirror )
		return "available";
    if(stevelight() && trackerData.items.mirror )
        return "agahnim";
	return "unavailable";
    }
};

chests[41] = {
    name: "Checkerboard Cave <img src='/images/mirror.png' class='mini'>",
    x: "8.8%",
    y: "77.3%",
    isOpened: false,
    isAvailable: function(){
	if( trackerData.items.flute && trackerData.items.glove==2 && trackerData.items.mirror )
		return "available";
	return "unavailable";
    }
};

chests[42] = {
    name: "<img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'><img src='/images/hammer.png' class='mini'>!!!!!!!!",
    x: "65.8%",
    y: "60.1%",
    isOpened: false,
    isAvailable: function(){
	if( trackerData.items.moonpearl && trackerData.items.glove==2 && trackerData.items.hammer )
		return "available";
	return "unavailable";
    }
};

chests[43] = {
    name: "Library <img src='/images/boots.png' class='mini'>",
    x: "7.7%",
    y: "65.9%",
    isOpened: false,
    isAvailable: function(){
	if(trackerData.items.boots)
		return "available";
	return "possible";
    }
};

chests[44] = {
    name: "Mushroom",
    x: "6.2%",
    y: "8.6%",
    isOpened: false,
    isAvailable: function(){
		return "available";
    }
};

chests[45] = {
    name: "Spectacle Rock <img src='/images/mirror.png' class='mini'>",
    x: "25.4%",
    y: "8.5%",
    isOpened: false,
    isAvailable: function(){
	if( deathmountain() )
		if(trackerData.items.mirror)
			return "available";
		else
			return "possible";
    if( deathmountaindarkness() )
        if(trackerData.items.mirror)
            return "glitchavailable";
        else
            return "glitchpossible";
	return "unavailable";
    }
};

chests[46] = {
    name: "Floating Island <img src='/images/mirror.png' class='mini'>",
    x: "40.2%",
    y: "3.0%",
    isOpened: false,
    isAvailable: function(){
		if((trackerData.items.glove || trackerData.items.flute) && (trackerData.items.hookshot || (trackerData.items.hammer && trackerData.items.mirror)) )
            if(trackerData.items.mirror && trackerData.items.moonpearl && trackerData.items.glove==2)
                if(!trackerData.items.flute && !trackerData.items.lantern)
                    return "glitchavailable"
                else
                    return "available";
            else
                if(!trackerData.items.flute && !trackerData.items.lantern)
                    return "glitchpossible";
                else
                    return "possible";
        return "unavailable";
	}
};

chests[47] = {
    name: "Race Minigame <img src='/images/bomb.png' class='mini'>/<img src='/images/boots.png' class='mini'>",
    x: "1.8%",
    y: "69.8%",
    isOpened: false,
    isAvailable: function(){
		return "available";
    }
};

chests[48] = {
    name: "Desert West Ledge <img src='/images/book.png' class='mini'>/<img src='/images/mirror.png' class='mini'>",
    x: "1.5%",
    y: "91.0%",
    isOpened: false,
    isAvailable: function(){
	if( trackerData.items.book || (trackerData.items.flute && trackerData.items.glove==2 && trackerData.items.mirror) )
		return "available";
	return "possible";
    }
};

chests[49] = {
    name: "Lake Hylia Island <img src='/images/mirror.png' class='mini'>",
    x: "36.1%",
    y: "82.9%",
    isOpened: false,
    isAvailable: function(){
		if(trackerData.items.flippers)
			if( trackerData.items.moonpearl && trackerData.items.mirror && (trackerData.items.agahnim || trackerData.items.glove==2 || (trackerData.items.glove&&trackerData.items.hammer)) )
				return "available";
            else if( trackerData.items.moonpearl && trackerData.items.mirror && (trackerData.items.sword>=2 || trackerData.items.cape) )
                return "agahnim";
			else
				return "possible";
		return "glitchpossible";
	}
};

chests[50] = {
    name: "Bumper Cave <img src='/images/cape.png' class='mini'>",
    x: "67.1%",
    y: "15.2%",
    isOpened: false,
    isAvailable: function(){
		if(steve())
			if(trackerData.items.cape && trackerData.items.glove)
				return "available";
			else
				return "possible";
        if(stevelight() && trackerData.items.cape && trackerData.items.glove)
            return "agahnim";
		return "unavailable";
    }
};

chests[51] = {
    name: "Pyramid",
    x: "79.0%",
    y: "43.5%",
    isOpened: false,
    isAvailable: function(){
	if( trackerData.items.agahnim || (trackerData.items.glove&&trackerData.items.hammer&&trackerData.items.moonpearl) || (trackerData.items.glove==2&&trackerData.items.moonpearl&&trackerData.items.flippers) )
			return "available";
    if (trackerData.items.sword>=2 || trackerData.items.cape)
		return "agahnim";
    return "unavailable";
    }
};

chests[52] = {
    name: "Dig Game: Pay 80 rupees",
    x: "52.9%",
    y: "69.2%",
    isOpened: false,
    isAvailable: function(){
		if( steve() || (trackerData.items.agahnim && trackerData.items.moonpearl && trackerData.items.hammer) )
			return "available";
        if( stevelight() || trackerData.items.moonpearl && trackerData.items.hammer && (trackerData.items.sword>=2 || trackerData.items.cape))
            return "agahnim";
		return "unavailable";
    }
};

chests[53] = {
    name: "Zora River Ledge <img src='/images/flippers.png' class='mini'>",
    x: "47.5%",
    y: "17.3%",
    isOpened: false,
    isAvailable: function(){
		if(trackerData.items.flippers)
			return "available";
		if(trackerData.items.glove)
			return "possible";
		return "unavailable";
    }
};

chests[54] = {
    name: "Buried Item <img src='/images/shovel.png' class='mini'>",
    x: "14.4%",
    y: "66.2%",
    isOpened: false,
    isAvailable: function(){
		if(trackerData.items.shovel)
			return "available";
		return "unavailable";
	}
};

chests[55] = {
    name: "Escape Sewer (4) <img src='/images/bomb.png' class='mini'>/<img src='/images/boots.png' class='mini'>",
    x: "26.8%",
    y: "32.4%",
    isOpened: false,
    isAvailable: function(){
		return "available";
    }
};

chests[56] = {
    name: "Castle Secret Entrance (2)",
    x: "29.8%",
    y: "41.8%",
    isOpened: false,
    isAvailable: function(){
		return "available";
    }
};

chests[57] = {
    name: "Hyrule Castle (3)",
    x: "24.9%",
    y: "44.1%",
    isOpened: false,
    isAvailable: function(){
		return "available";
    }
};

chests[58] = {
    name: "Sanctuary",
    x: "23.0%",
    y: "28.0%",
    isOpened: true,
    isAvailable: function(){
		return "available";
    }
};

chests[59] = {
    name: "Mad Batter <img src='/images/hammer.png' class='mini'>/<img src='/images/mirror.png' class='mini'> + <img src='/images/powder.png' class='mini'>",
    x: "16.0%",
    y: "58.0%",
    isOpened: false,
    isAvailable: function(){
		if(trackerData.items.powder && (trackerData.items.hammer || (trackerData.items.glove==2 && trackerData.items.mirror && trackerData.items.moonpearl)))
			return "available";
		return "unavailable";
    }
};

chests[60] = {
    name: "Take the frog home (<img src='/images/mirror.png' class='mini'> or save and quit)",
    x: "15.2%",
    y: "51.8%",
    isOpened: false,
    isAvailable: function(){
		if(trackerData.items.moonpearl && trackerData.items.glove==2)
			return "available";
		return "unavailable";
    }
};

chests[61] = {
    name: "Fat Fairy: Buy OJ bomb from Dark Link's House after <img src='/images/crystal0.png' class='mini'>5 <img src='/images/crystal0.png' class='mini'>6 (2 trackerData.items)",
    x: "73.5%",
    y: "48.5%",
    isOpened: false,
    isAvailable: function(){
		//crystal check
		var crystalCount = 0;
		for(var k=0; k<10; k++)
			if(trackerData.prizes[k]==4 && trackerData.items["boss"+k]==2)
				crystalCount++;
		
		if(!trackerData.items.moonpearl || crystalCount<2)
			return "unavailable";
		if(trackerData.items.hammer && (trackerData.items.agahnim || trackerData.items.glove))
			return "available";
		if(trackerData.items.agahnim && trackerData.items.mirror && steve())
			return "available";
        if((trackerData.items.hammer && (trackerData.items.sword>=2 || trackerData.items.cape)) || (trackerData.items.mirror && (steve() || stevelight())))
            return "agahnim";
		return "unavailable";
    }
};


chests[62] = {
    name: "Master Sword Pedestal <img src='/images/pendant0.png' class='mini'><img src='/images/pendant1.png' class='mini'><img src='/images/pendant2.png' class='mini'> (can check with <img src='/images/book.png' class='mini'>)",
    x: "2.5%",
    y: "3.2%",
    isOpened: false,
    isAvailable: function(){
		var pendantCount = 0;
		for(var k=0; k<10; k++)
			if((trackerData.prizes[k]==1 || trackerData.prizes[k]==2) && trackerData.items["boss"+k]==2)
				if(++pendantCount==3)
					return "available";
        if (trackerData.items.book)
          return "possible";
        else 
          return "unavailable";            
    }
};


chests[63] = {
    name: "Waterfall of the Wishing (2)  <img src='/images/flippers.png' class='mini'>",
    x: "44.9%",
    y: "14.7%",
    isOpened: false,
    isAvailable: function(){
		if(trackerData.items.flippers)
            return "available";
        if(trackerData.items.moonpearl)
            return "glitchavailable";
		return "unavailable";
    }
};

