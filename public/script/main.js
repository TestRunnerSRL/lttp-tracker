

var itemGrid = [];
var itemLayout = [];
var showchests = true;
var showprizes = true;
var showmedals = true;
var showlabels = true;

var editmode = false;
var selected = {};

var items = itemsInit;
var dungeonchests = dungeonchestsInit;
var dungeonbeaten = dungeonbeatenInit;
var prizes = prizesInit;
var medallions = medallionsInit;

var chestsopenedInit = [];
for(var i = 0; i < chests.length; i++) {
    chestsopenedInit.push(false);
}
var chestsopened = chestsopenedInit;

function setCookie(obj) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    var val = JSON.stringify(obj);
    document.cookie = "key=" + val + ";" + expires + ";path=/";
}

function getCookie() {
    var name = "key=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return {};
}

var cookiekeys = ['ts', 'map', 'iZoom', 'mZoom', 'mOrien', 'mPos', 'chest', 'prize', 'medal', 'label', 'items'];
var cookieDefault = {
    ts:94,
    map:1,
    iZoom:100,
    mZoom:50,
    mOrien:0,
    mPos:0,
    chest:1,
    prize:1,
    medal:1,
    label:1,
    items:defaultItemGrid
}

var cookielock = false;
function loadCookie() {
    if (cookielock)
        return;
    cookielock = true;
    cookieobj = getConfigObjectFromCookie();
    setConfigObject(cookieobj);
    cookielock = false;
}

function setConfigObject(configobj) {
    initGridRow(JSON.parse(JSON.stringify(configobj.items)));

    document.getElementsByName('showmap')[0].checked = !!configobj.map;
    document.getElementsByName('showmap')[0].onchange();
    document.getElementsByName('itemdivsize')[0].value = configobj.iZoom;
    document.getElementsByName('itemdivsize')[0].onchange();
    document.getElementsByName('mapdivsize')[0].value = configobj.mZoom;
    document.getElementsByName('mapdivsize')[0].onchange();

    document.getElementsByName('maporientation')[configobj.mOrien].click();
    document.getElementsByName('mapposition')[configobj.mPos].click();

    document.getElementsByName('showchest')[0].checked = !!configobj.chest;
    document.getElementsByName('showchest')[0].onchange();
    document.getElementsByName('showcrystal')[0].checked = !!configobj.prize;
    document.getElementsByName('showcrystal')[0].onchange();
    document.getElementsByName('showmedallion')[0].checked = !!configobj.medal;
    document.getElementsByName('showmedallion')[0].onchange();
    document.getElementsByName('showlabel')[0].checked = !!configobj.label;
    document.getElementsByName('showlabel')[0].onchange();
}

function updateConfigFromFirebase(configobj) {
    var existingConfig = getConfigObjectFromCookie();
    if(existingConfig.ts < configobj.ts) {
        console.log("Overwriting config with Firebase values");
        setConfigObject(configobj);
        saveCookie();
    }
    else {
        console.log("Ignoring Firebase config values due to older timestamp");
    }
}

function saveConfigToFirebase() {
    var existingConfig = getConfigObject();
    rootRef.child('config').set(existingConfig);
}

function saveCookie() {
    if (cookielock)
        return;
    cookielock = true;

    cookieobj = getConfigObject();
    setCookie(cookieobj);

    cookielock = false;
}

function getConfigObjectFromCookie() {
    configobj = getCookie();

    cookiekeys.forEach(function (key) {
        if (configobj[key] === undefined) {
            configobj[key] = cookieDefault[key];
        }
    });
    return configobj;
}

function getConfigObject() {
    configobj = {};
    configobj.ts = (new Date()).getTime();

    configobj.map = document.getElementsByName('showmap')[0].checked ? 1 : 0;
    configobj.iZoom = document.getElementsByName('itemdivsize')[0].value;
    configobj.mZoom = document.getElementsByName('mapdivsize')[0].value;

    configobj.mOrien = document.getElementsByName('maporientation')[1].checked ? 1 : 0;
    configobj.mPos = document.getElementsByName('mapposition')[1].checked ? 1 : 0;

    configobj.chest = document.getElementsByName('showchest')[0].checked ? 1 : 0;
    configobj.prize = document.getElementsByName('showcrystal')[0].checked ? 1 : 0;
    configobj.medal = document.getElementsByName('showmedallion')[0].checked ? 1 : 0;
    configobj.label = document.getElementsByName('showlabel')[0].checked ? 1 : 0;

    configobj.items = JSON.parse(JSON.stringify(itemLayout));

    return configobj;
}

// Event of clicking a chest on the map
function toggleChest(x){
    rootRef.child('chestsopened').child(x).set(!chestsopened[x]);
}

// Highlights a chest location and shows the name as caption
function highlight(x){
    document.getElementById(x).style.backgroundImage = "url(/images/highlighted.png)";
    document.getElementById("caption").innerHTML = chests[x].name;
}

function unhighlight(x){
    document.getElementById(x).style.backgroundImage = "url(/images/poi.png)";
    document.getElementById("caption").innerHTML = "&nbsp;";
}

// Highlights a chest location and shows the name as caption (but for dungeons)
function highlightDungeon(x){
    document.getElementById("dungeon"+x).style.backgroundImage = "url(/images/highlighted.png)";
    document.getElementById("caption").innerHTML = dungeons[x].name;
}

function unhighlightDungeon(x){
    document.getElementById("dungeon"+x).style.backgroundImage = "url(/images/poi.png)";
    document.getElementById("caption").innerHTML = "&nbsp;";
}

function showChest(sender) {
    showchests = sender.checked;
    updateGridItemAll();
    saveCookie();
}

function showCrystal(sender) {
    showprizes = sender.checked;
    updateGridItemAll();
    saveCookie();
}

function showMedallion(sender) {
    showmedals = sender.checked;
    updateGridItemAll();
    saveCookie();
}

function showLabel(sender) {
    showlabels = sender.checked;
    updateGridItemAll();
    saveCookie();
}

function setOrder(H) {
    if (H) {
        document.getElementById('layoutdiv').classList.remove('flexcontainer');
    } 
    else {
        document.getElementById('layoutdiv').classList.add('flexcontainer');
    }
    saveCookie();
}

function setOrientation() {
    
}

function setZoom(target, sender) {
    document.getElementById(target).style.zoom = sender.value / 100;

    //    -moz-transform: scale(0.5);

    document.getElementById(target + 'size').innerHTML = (sender.value) + '%';
    saveCookie();
}

var prevH = false;
function setMapOrientation(H) {
    if (H == prevH) {
        return;
    }
    prevH = H;


    var chest = document.getElementsByClassName("mapspan");
    var i;

    if (H) {
        document.getElementById("mapdiv").classList.remove('mapdiv');
        document.getElementById("mapdiv").classList.add('mapvdiv');
        for (i = 0; i < chest.length; i++) {
            var x = parseFloat(chest[i].style.left) / 100;
            var y = parseFloat(chest[i].style.top) / 100;

            if (x > 0.5) {
                chest[i].style.left = (((x - 0.5) * 2) * 100) + '%';
                chest[i].style.top = (((y / 2) + 0.5) * 100) + '%';
            }
            else {
                chest[i].style.left = ((x  * 2) * 100) + '%';
                chest[i].style.top = ((y / 2) * 100) + '%';
            }
        }
    }
    else {
        document.getElementById("mapdiv").classList.add('mapdiv');
        document.getElementById("mapdiv").classList.remove('mapvdiv');
        for (i = 0; i < chest.length; i++) {
            var x = parseFloat(chest[i].style.left) / 100;
            var y = parseFloat(chest[i].style.top) / 100;

            if (y > 0.5) {
                chest[i].style.left = (((x / 2) + 0.5) * 100) + '%';
                chest[i].style.top = (((y - 0.5) * 2) * 100) + '%';
            }
            else {
                chest[i].style.left = ((x / 2) * 100) + '%';
                chest[i].style.top = ((y * 2) * 100) + '%';
            }
        }
    }
    saveCookie();
}

function showSettings(sender) {
    if (editmode) {
        var r, c;
        var startdraw = false;
        for (r = 7; r >= 0 && !startdraw; r--) {
            if (!itemLayout[r] || !itemLayout[r].length) {
                itemGrid[r]['row'].style.display = 'none';
            } else {
                for (c = 0; c < 8; c++) {
                    if (!!itemLayout[r][c] && itemLayout[r][c] != 'blank') {
                        startdraw = true;
                        r++;
                        break;
                    }
                }		

                if (!startdraw) {
                    itemGrid[r]['row'].style.display = 'none';
                    itemGrid[r]['half'].style.display = 'none';
                }	
            }
        }

        for (; r >= 0; r--) {
            itemGrid[r]['row'].style.display = '';	
            itemGrid[r]['button'].style.display = 'none';
        }

        showchests = document.getElementsByName('showchest')[0].checked;
        showprizes = document.getElementsByName('showcrystal')[0].checked;
        showmedals = document.getElementsByName('showmedallion')[0].checked;
        showlabels = document.getElementsByName('showlabel')[0].checked;
        editmode = false;
        updateGridItemAll();
        showTracker('mapdiv', document.getElementsByName('showmap')[0]);
        document.getElementById('itemconfig').style.display = 'none';

        sender.innerHTML = '🔧';
        saveCookie();
    } else {
        var x = document.getElementById("settings");
        if (!x.style.display || x.style.display == 'none') {
            x.style.display = 'initial';
            sender.innerHTML = 'X';
        } else {
            x.style.display = 'none';		
            sender.innerHTML = '🔧';
        } 
    }
}

function showTracker(target, sender) {
    if (sender.checked) {
        document.getElementById(target).style.display = '';
    }
    else {
        document.getElementById(target).style.display = 'none';
    }
}

function clickRowButton(row) {
    if (itemLayout[row].length % 2 == 0) {
        itemGrid[row]['button'].innerHTML = '-';
        itemGrid[row]['button'].style.backgroundColor = 'red';
        itemGrid[row][6]['item'].style.display = '';
        itemGrid[row]['half'].style.display = 'none';	
        itemLayout[row][6] = 'blank';
    } else {
        itemGrid[row]['button'].innerHTML = '+';
        itemGrid[row]['button'].style.backgroundColor = 'green';
        itemGrid[row][6]['item'].style.display = 'none';
        itemGrid[row]['half'].style.display = '';	
        document.getElementById(itemLayout[row][6]).style.opacity = 1;
        itemLayout[row].splice(-1, 1);
    }
    updateGridItem(row, 6);
}


function EditMode() {
    var r, c;

    for (r = 0; r < 8; r++) {
        itemGrid[r]['row'].style.display = '';
        itemGrid[r]['button'].style.display = '';
    }

    showchests = false;
    showprizes = false;
    showmedals = false;
    showlabels = false;
    updateGridItemAll();
    editmode = true;
    updateGridItemAll();
    showTracker('mapdiv', {checked:false});
    document.getElementById('settings').style.display = 'none';
    document.getElementById('itemconfig').style.display = '';

    document.getElementById('settingsbutton').innerHTML = 'Exit Edit Mode';
}


function createItemTracker(sender) {
    var r;
    for (r = 0; r < 8; r++) {
        itemGrid[r] = [];
        itemLayout[r] = [];

        itemGrid[r]['row'] = document.createElement('table');
        itemGrid[r]['row'].className = 'tracker';
        sender.appendChild(itemGrid[r]['row']);

        var tr = document.createElement('tr');
        itemGrid[r]['row'].appendChild(tr);

        itemGrid[r]['half'] = document.createElement('td');
        itemGrid[r]['half'].className = 'halfcell';
        tr.appendChild(itemGrid[r]['half']);

        var i;
        for (i = 0; i < 7; i++) {	
            itemGrid[r][i] = [];
            itemLayout[r][i] = 'blank';

            itemGrid[r][i]['item'] = document.createElement('td');
            itemGrid[r][i]['item'].className = 'griditem';
            tr.appendChild(itemGrid[r][i]['item']);

            var tdt = document.createElement('table');
            tdt.className = 'lonk';
            itemGrid[r][i]['item'].appendChild(tdt);

                var tdtr1 = document.createElement('tr');
                tdt.appendChild(tdtr1);
                    itemGrid[r][i][0] = document.createElement('th');
                    itemGrid[r][i][0].className = 'corner';
                    itemGrid[r][i][0].onclick = new Function("gridItemClick("+r+","+i+",0)");
                    tdtr1.appendChild(itemGrid[r][i][0]);
                    itemGrid[r][i][1] = document.createElement('th');
                    itemGrid[r][i][1].className = 'corner';
                    itemGrid[r][i][1].onclick = new Function("gridItemClick("+r+","+i+",1)");
                    tdtr1.appendChild(itemGrid[r][i][1]);
                var tdtr2 = document.createElement('tr');
                tdt.appendChild(tdtr2);
                    itemGrid[r][i][2] = document.createElement('th');
                    itemGrid[r][i][2].className = 'corner';
                    itemGrid[r][i][2].onclick = new Function("gridItemClick("+r+","+i+",2)");
                    tdtr2.appendChild(itemGrid[r][i][2]);
                    itemGrid[r][i][3] = document.createElement('th');
                    itemGrid[r][i][3].className = 'corner';
                    itemGrid[r][i][3].onclick = new Function("gridItemClick("+r+","+i+",3)");
                    tdtr2.appendChild(itemGrid[r][i][3]);
        }

        var half = document.createElement('td');
        half.className = 'halfcell';
        tr.appendChild(half);
        itemGrid[r]['button'] = document.createElement('button');
        itemGrid[r]['button'].innerHTML = '-';
        itemGrid[r]['button'].style.backgroundColor = 'red';		
        itemGrid[r]['button'].style.color = 'white';	
        itemGrid[r]['button'].onclick = new Function("clickRowButton(" + r + ")");;
        half.appendChild(itemGrid[r]['button']);
    }
}

function updateGridItem(row, index) {
    var item = itemLayout[row][index];

    if (editmode) {
        if (!item || item == 'blank') {
            itemGrid[row][index]['item'].style.backgroundImage = ("url(/images/blank.png)");
        }
        else if((typeof items[item]) == "boolean"){
            itemGrid[row][index]['item'].style.backgroundImage = "url(/images/" + item + ".png)";
        }
        else{
            itemGrid[row][index]['item'].style.backgroundImage = "url(/images/" + item + itemsMax[item] + ".png)";
        }

        itemGrid[row][index]['item'].style.border = '1px solid white';
        itemGrid[row][index]['item'].style.opacity = 1;

        return;
    }

    itemGrid[row][index]['item'].style.border = '0px';
    itemGrid[row][index]['item'].style.opacity = '';

    if (!item || item == 'blank') {
        itemGrid[row][index]['item'].style.backgroundImage = '';
        return;
    }

    if((typeof items[item]) == "boolean"){
        itemGrid[row][index]['item'].style.backgroundImage = "url(/images/" + item + ".png)";
    }
    else{
        itemGrid[row][index]['item'].style.backgroundImage = "url(/images/" + item + items[item] + ".png)";
    }

    itemGrid[row][index]['item'].className = "griditem " + (!!items[item]);

    if (item.substring(0,4) == "boss"){
        var d = item.substring(4,5);

        if (showlabels) {
            itemGrid[row][index][0].innerText = dungeons[d].label;
        } else {
            itemGrid[row][index][0].innerText = '';
        }

        if (showchests) {
            itemGrid[row][index][2].style.backgroundImage = "url(/images/chest" + dungeonchests[d] + ".png)";
        } else {
            itemGrid[row][index][2].style.backgroundImage = '';
        }

        if (showprizes) {
            itemGrid[row][index][3].style.backgroundImage = "url(/images/dungeon" + prizes[d] + ".png)";
        } else {
            itemGrid[row][index][3].style.backgroundImage = '';
        }

        if (showmedals && d >= 8) {
            itemGrid[row][index][1].style.backgroundImage = "url(/images/medallion" + medallions[d] + ".png)";
        } else {
            itemGrid[row][index][1].style.backgroundImage = '';
        }
    }
}

function updateGridItemAll() {
    for (r = 0; r < 8; r++) {
        for (c = 0; c < 7; c++) {
            updateGridItem(r, c);
        }
    }
}

function setGridItem(item, row, index) {
    var previtem = itemLayout[row][index];
    itemLayout[row][index] = item;
    if (item != 'blank')
        document.getElementById(item).style.opacity = 0.25;
    updateGridItem(row, index)
}

function initGridRow(itemsets) {
    var r, c;
    var startdraw = false;
    for (r = 7; r >= 0 && !startdraw; r--) {
        if (!itemsets[r] || !itemsets[r].length) {
            itemGrid[r]['row'].style.display = 'none';
            itemGrid[r]['half'].style.display = 'none';
        } else {
            for (c = 0; c < 8; c++) {
                if (!!itemsets[r][c] && itemsets[r][c] != 'blank') {
                    startdraw = true;
                    r++;
                    break;
                }
            }	

            if (!startdraw) {
                itemGrid[r]['row'].style.display = 'none';
                itemGrid[r]['half'].style.display = 'none';
            }			
        }
    }

    for (; r >= 0; r--) {
        itemGrid[r]['row'].style.display = '';	

        if (itemsets[r].length % 2 != 0) {
            itemGrid[r]['half'].style.display = 'none';
            itemGrid[r][6]['item'].style.display = '';
        } else {
            clickRowButton(r);
        }
        itemGrid[r]['button'].style.display = 'none';

        for (c = 0; c < 7; c++) {
            if (itemsets[r][c]) {
                setGridItem(itemsets[r][c], r, c);
            } 
        }
    }
}

function gridItemClick(row, col, corner) {
    if (editmode) {		
        if (selected.item) {
            document.getElementById(selected.item).style.border = '1px solid white';
            var old = itemLayout[row][col];

            if (old == selected.item) {
                selected = {};
                return;
            }

            if (selected.item != 'blank') {
                document.getElementById(selected.item).style.opacity = 0.25;

                var r,c;
                var found = false;
                for (r = 0; r < 8; r++) {
                    for (c = 0; c < 7; c++) {
                        if (itemLayout[r][c] == selected.item) {
                            itemLayout[r][c] = 'blank';
                            found = true;
                            break;
                        }
                    }

                    if (found)
                        break;
                }
            }

            itemLayout[row][col] = selected.item;
            updateGridItem(row, col);

            document.getElementById(old).style.opacity = 1;

            selected = {};
        } else if (selected.row !== undefined) {
            itemGrid[selected.row][selected.col]['item'].style.border = '1px solid white';

            var temp = itemLayout[row][col]
            itemLayout[row][col] = itemLayout[selected.row][selected.col];
            itemLayout[selected.row][selected.col] = temp;
            updateGridItem(row, col);
            updateGridItem(selected.row, selected.col);

            selected = {};
        } else {
            itemGrid[row][col]['item'].style.border = '3px solid yellow';
            selected = {row:row, col:col};		
        }
        return;
    }

    var item = itemLayout[row][col];

    if(item.substring(0,4) == "boss"){
        var d = item.substring(4,5);

        if (corner == 1 && showmedals && d >= 8) {
            rootRef.child('medallions').child(d).set( (medallions[d] + 1) % 4 );
        } 
        else if (corner == 2 && showchests) {
            var chestitem = 'chest' + d;
            var newVal = dungeonchests[d] - 1;
            if(newVal < 0) {
                newVal = itemsMax[chestitem];
            }
            rootRef.child('dungeonchests').child(d).set(newVal);
        } 
        else if (corner == 3 && showprizes) {
            rootRef.child('prizes').child(d).set( (prizes[d] + 1) % 5 );
        } 
        else {
            var newVal = items[item] + 1;
            if(newVal > itemsMax[item]){
                newVal = itemsMin[item];
            }
            rootRef.child('items').child(item).set(newVal);
            rootRef.child('dungeonbeaten').child(d).set(!dungeonbeaten[d]);
        }
    }
    else if((typeof items[item]) == "boolean"){
        rootRef.child('items').child(item).set(!items[item]);
    }
    else{
        var newVal = items[item] + 1;
        if(newVal > itemsMax[item]){
            newVal = itemsMin[item];
        }
        rootRef.child('items').child(item).set(newVal);
    }
}

function updateMedallionsAll() {
    updateMedallions(8);
    updateMedallions(9);
    refreshDungeonsAndChests();
}

function updateMedallions(d) {
    // Update availability of dungeon boss AND chests
    if(dungeonbeaten[d])
        document.getElementById("bossMap"+d).className = "mapspan boss opened";
    else
        document.getElementById("bossMap"+d).className = "mapspan boss " + dungeons[d].isBeatable();

    if(dungeonchests[d] > 0)
        document.getElementById("dungeon"+d).className = "mapspan 1dungeon " + dungeons[d].canGetChest();
    // TRock medallion affects Mimic Cave
    if(d == 9){
        refreshChests();
    }
    // Change the mouseover text on the map
    var dungeonName;
    if(d == 8)
        dungeonName = "Misery Mire";
    else
        dungeonName = "Turtle Rock";
    dungeons[d].name = dungeonName + " <img src='images/medallion"+medallions[d]+".png' class='mini'><img src='images/lantern.png' class='mini'>";
}

function updatePrizesAll() {
    // Update Sahasralah, Fat Fairy, and Master Sword Pedestal - will be done in chest refresh
    refreshDungeonsAndChests();
}

function refreshChests() {
    for(k=0; k<chests.length; k++){
        if(chestsopened[k])
            document.getElementById(k).className = "mapspan chest opened";
        else
            document.getElementById(k).className = "mapspan chest " + chests[k].isAvailable();
    }
}

function refreshDungeonsAndChests() {
    updateGridItemAll();
    refreshChests();

    for(k=0; k<dungeons.length; k++){
        if(dungeonbeaten[k])
            document.getElementById("bossMap"+k).className = "mapspan boss opened";
        else
            document.getElementById("bossMap"+k).className = "mapspan boss " + dungeons[k].isBeatable();
        if(dungeonchests[k])
            document.getElementById("dungeon"+k).className = "mapspan dungeon " + dungeons[k].canGetChest();
        else
            document.getElementById("dungeon"+k).className = "mapspan dungeon opened";
    }
}

function itemConfigClick (sender) {
    var item = sender.id;

    if (selected.item) {
        document.getElementById(selected.item).style.border = '0px';
        sender.style.border = '3px solid yellow';
        selected = {item:item};	
    } else if (selected.row !== undefined) {
        itemGrid[selected.row][selected.col]['item'].style.border = '1px solid white';
        var old = itemLayout[selected.row][selected.col];

        if (old == item) {
            selected = {};
            return;
        }

        if (item != 'blank') {
            sender.style.opacity = 0.25;

            var r,c;
            var found = false;
            for (r = 0; r < 8; r++) {
                for (c = 0; c < 7; c++) {
                    if (itemLayout[r][c] == item) {
                        itemLayout[r][c] = 'blank';
                        updateGridItem(r, c);
                        found = true;
                        break;
                    }
                }

                if (found)
                    break;
            }
        }

        itemLayout[selected.row][selected.col] = item;
        updateGridItem(selected.row, selected.col);

        document.getElementById(old).style.opacity = 1;

        selected = {};
    } else {
        sender.style.border = '3px solid yellow';
        selected = {item:item}
    }
}

function populateMapdiv() {
    var mapdiv = document.getElementById('mapdiv');

    // Initialize all chests on the map
    for(k=0; k<chests.length; k++){
        var s = document.createElement('span');
        s.style.backgroundImage = 'url(/images/poi.png)';
        s.style.color = 'black';
        s.id = k;
        s.onclick = new Function('toggleChest('+k+')');
        s.onmouseover = new Function('highlight('+k+')');
        s.onmouseout = new Function('unhighlight('+k+')');
        s.style.left = chests[k].x;
        s.style.top = chests[k].y;
        if(chestsopened[k])
            s.className = "mapspan chest opened";
        else
            s.className = "mapspan chest " + chests[k].isAvailable();
        mapdiv.appendChild(s);
    }

    // Dungeon bosses & chests
    for(k=0; k<dungeons.length; k++){
        var s = document.createElement('span');
        s.style.backgroundImage = 'url(/images/' + dungeons[k].image + ')';
        s.id = 'bossMap' + k;
        s.onmouseover = new Function('highlightDungeon('+k+')');
        s.onmouseout = new Function('unhighlightDungeon('+k+')');
        s.style.left = dungeons[k].x;
        s.style.top = dungeons[k].y;
        s.className = "mapspan boss " + dungeons[k].isBeatable();
        mapdiv.appendChild(s);

        s = document.createElement('span');
        s.style.backgroundImage = 'url(/images/poi.png)';
        s.id = 'dungeon' + k;
        s.onmouseover = new Function('highlightDungeon('+k+')');
        s.onmouseout = new Function('unhighlightDungeon('+k+')');
        s.style.left = dungeons[k].x;
        s.style.top = dungeons[k].y;
        s.className = "mapspan dungeon " + dungeons[k].canGetChest();
        mapdiv.appendChild(s);
    }
}

function populateItemconfig() {
    var grid = document.getElementById('itemconfig');

    var i = 0;

    var row;

    for (var key in items) {
        if (i % 10 == 0){
            row = document.createElement('tr');
            grid.appendChild(row);
        }
        i++;

        var rowitem = document.createElement('td');
        rowitem.className = 'corner';
        rowitem.id = key;
        rowitem.style.backgroundSize = '100% 100%';
        rowitem.onclick = new Function('itemConfigClick(this)');
        if((typeof items[key]) == "boolean"){
            rowitem.style.backgroundImage = "url(/images/" + key + ".png)";
        }
        else{
            rowitem.style.backgroundImage = "url(/images/" + key + itemsMax[key] + ".png)";
        }
        row.appendChild(rowitem);
    }		
}

function enterPasscode() {
    var passcode = document.getElementById('entryPasscodeInput').value;
    rootRef.child('editors').child(uid).set(passcode, function(error) {
        if(error) {
            console.log("Did not add to editors");
            console.log(error);
        }
        else {
            console.log("Added to editors successfully");
        }
    });
}

function createRoom() {
    var editors = {};
    var passcode = document.getElementById('passcodeInput').value;
    editors[uid] = true;
    rootRef.set({
        owner: uid,
        editors: editors,
        passcode: passcode,
        items: itemsInit,
        dungeonchests: dungeonchestsInit,
        dungeonbeaten: dungeonbeatenInit,
        prizes: prizesInit,
        medallions: medallionsInit,
        chestsopened: chestsopenedInit
    });
}

function resetFirebase() {
    rootRef.child('items').set(itemsInit);
    rootRef.child('dungeonchests').set(dungeonchestsInit);
    rootRef.child('dungeonbeaten').set(dungeonbeatenInit);
    rootRef.child('prizes').set(prizesInit);
    rootRef.child('medallions').set(medallionsInit);
    rootRef.child('chestsopened').set(chestsopenedInit);
}


function initTracker() {
    createItemTracker(document.getElementById('itemdiv'));
    populateMapdiv();
    populateItemconfig();

    loadCookie();
    saveCookie();

    rootRef.child('items').on('value', function(snapshot) {
        items = snapshot.val();
        updateAll();
        document.getElementById('createRoomPanel').hidden = !!items;
    });
    rootRef.child('dungeonchests').on('value', function(snapshot) {
        dungeonchests = snapshot.val();
        updateAll();
    });
    rootRef.child('dungeonbeaten').on('value', function(snapshot) {
        dungeonbeaten = snapshot.val();
        updateAll();
    });
    rootRef.child('prizes').on('value', function(snapshot) {
        prizes = snapshot.val();
        updateAll();
    });
    rootRef.child('medallions').on('value', function(snapshot) {
        medallions = snapshot.val();
        updateAll();
    });
    rootRef.child('chestsopened').on('value', function(snapshot) {
        chestsopened = snapshot.val();
        updateAll();
    });
    rootRef.child('config').on('value', function(snapshot) {
        updateConfigFromFirebase(snapshot.val());
    });
}

function updateAll() {
    if(items && dungeonchests && dungeonbeaten && prizes && medallions && chestsopened) {
        updateMedallionsAll();
    }
}

function confirmSaveConfigToFirebase() {
    var confirm = window.confirm("Do you want to push your configuration to all other users of your tracker? This will overwrite their settings. (Use this to get a remote browser to match how this browser appears.)");
    if(confirm) {
        saveConfigToFirebase();
    }
}
