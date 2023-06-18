/*
In terminal trebuie dat catre instalare:
    npm install mysql
        SAU
    npm install mysql@latest  // pentru baza de date
    npm install jsonwebtoken  //pt jwt
    npm install moment   //pentru a putea scrie data 11 02 2002 nu 2002/02/11
    npm install axios  //Pentru scraping
    npm install cheerio //Tot pt scraping
    npm install bcrypt //parole hashuite
 */

const crypto = require('crypto');

// ----------------------------------- Pentu a face baza de date. Se ruleaza doar bucata asta ------------------------------------------------
/*var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "STUDENT"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});*/

// --------------------------------------------- Conectare la baza de date -----------------------------------------

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "STUDENT",
    database: "mydb"
});
var animalCount = 0;


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!");
});

//drop la tabelul animal (nu trb neap) si facem tabelele animal si users
/*
var sql = "DROP TABLE animal";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
});

var sql1 = "CREATE TABLE animal (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), photo VARCHAR(255), description LONGTEXT, category VARCHAR(255))";
con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});

var sql2 = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255),  email  VARCHAR(255), username VARCHAR(255), password VARCHAR(255), birth Date)";
con.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});*/

const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeAnimalUrls(url, category) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const animalLinks = $("div.line");
        const animalNames = animalLinks.map((i, el) => $(el).text().trim().replace(/\s+/g, ' ')).get();
        const animalNamesEncoded = animalNames.map(name => encodeURIComponent(name));
        const urls = animalNamesEncoded.map(name => `https://www.torontozoo.com/animals/${name}`);
        const animalInfoArray = [];

        for (const url of urls) {
            const animalInfo = await scrapeAnimalInfo(url, category);
            animalInfoArray.push(animalInfo);
        }
    } catch (error) {
        console.log(error);
    }
}
async function scrapeAnimalInfo(url, category) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const animalInfo = {};
        animalInfo.name = $("h1").text().trim();
        animalInfo.photo = "https://www.torontozoo.com" + $("div.img0-wrap").find("img.wid").attr("src");
        animalInfo.description = $(".c1280 .pg").text().trim().replace(/\s+/g, ' '); //daca vei vr vreodata cu tot cu endline uri scoate replace
        animalCount=animalCount+1;
        //const escapedDescription = mysql.escape(animalInfo.description);
        const sql = `INSERT INTO animal (id, name, photo, description, category) VALUES (${animalCount}, '${animalInfo.name.replace(/'/g, "''")}', '${animalInfo.photo}', '${animalInfo.description.replace(/'/g, "''")}', '${category}')`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        return animalInfo;
    } catch (error) {
        console.log(error);
    }
}
// se apeleaza o singura data pentru a pune animalele in baza de date si dupa se comenteaza la loc
/*scrapeAnimalUrls("https://www.torontozoo.com/animals/africa", "africa");
scrapeAnimalUrls("https://www.torontozoo.com/animals/americas", "americas");
scrapeAnimalUrls("https://www.torontozoo.com/animals/australasia", "australasia");
scrapeAnimalUrls("https://www.torontozoo.com/animals/canada", "canadian domain");
scrapeAnimalUrls("https://www.torontozoo.com/animals/discovery", "discovery zone");
scrapeAnimalUrls("https://www.torontozoo.com/animals/eurasia", "eurasia wilds");
scrapeAnimalUrls("https://www.torontozoo.com/animals/indo-malaya", "indo-malaya");
scrapeAnimalUrls("https://www.torontozoo.com/animals/tundra", "tundra trek");

con.query("ALTER TABLE users ADD COLUMN photo VARCHAR(255)", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});

con.query("DELETE FROM users WHERE email = 'ioana_roibu@yahoo.com'", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});*/

//pentru afisare useri
con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});


/*

function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

const password = "admin";
const hashedPassword = hashPassword(password);

var sql2 = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
var values = ['admin@admin.com', hashedPassword, 'admin'];
con.query(sql2, values, function (err, result) {
    if (err) throw err;
    console.log("User inserted");
});


var sql1 = "CREATE TABLE admin (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), password VARCHAR(255))";
con.query(sql1, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});

//pentru sters useri
var sql3 = "DELETE FROM users WHERE id = '8'";
con.query(sql3, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
});
*/
