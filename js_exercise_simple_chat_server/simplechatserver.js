"use strict";

// Portti johon otetaan yhteys
// Kehitystyön aikana oli ongelmana, että välillä tuli virheilmoitusta, että portti on käytössä.
// Tästä on helppo muuttaa porttinumeroa.
var port = 8000;

// Luodaan yhteyksille taulukko
var connections = [];

// Vaaditaan net
const net = require('net');

// Ajan formatointi UPTIME-komentoa varten, napattu netistä valmis koodi
function format(seconds){
    function pad(s){
      return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);
  
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }
  
// Luodaan netin avulla serveri
net.createServer(function(socket) {
    socket.setEncoding('utf8');

        // Luodaan uusi käyttäjä user + satunnaisluku
    socket.nick = "user" + (Math.random()*10000).toFixed();
    socket.firstname = "Etunimi";  // Määritetään oletus etu- ja sukunimi
    socket.lastname = "Sukunimi";
    console.log(socket.nick, " liittyi serverille");
    socket.write("Tervetuloa " + socket.nick + "\n Kirjoita HELP saadaksesi ohjeet\n");
    connections.push(socket);

    socket.on('data', function(buffer) {
        console.log("Palvelin vastaanotti viestin: ", buffer);

        var uptime = process.uptime();  // Tämä laskee päälläoloajan.
        
        var command = buffer.toString().trim().split(" ");
        switch(command[0]) {

            // Tein IAM-komennon WHOIS-komennon tietoja varten. Tässä annetaan tiedot, jotka WHOIS kertoo toiselle.
            case 'IAM':
                this.firstname = command[1];
                this.lastname = command[2];
                socket.write("Nimesi on: " + this.firstname + " " + this.lastname + "\r\n");
                console.log("Käyttäjä " + this.nick + " kertoi nimensä " + this.firstname + " " + this.lastname);
                break;
                
            // Siistin Help-komennon tulostetta
            case 'HELP':
                socket.write("\nKomennot ovat:\n HELP\n NICK [käyttäjänimesi]\n IAM [etunimesi] [sukunimesi]\n MSG [käyttäjänimi] [viesti]\n WHOIS [käyttäjänimi]\n USERS\n UPTIME\n" + "\r\n");
                console.log("Ohjeet lähetetty käyttäjälle " + this.nick);
                break;

            // Lisäsin exnickin, jotta serveri voi kertoa kuka vaihtoi nimensä ja mikä on uusi nimi
            case 'NICK':
                this.exnick = this.nick;
                this.nick = command[1];
                socket.write("Uusi käyttäjänimesi on: " + this.nick + "\r\n");
                console.log("Käyttäjä" + this.exnick + " vaihtoi käyttäjänimensä: " + this.nick);
                break;

            
            case 'MSG':
                connections.forEach(function(node){
                    if(node.nick == command[1]) {
                        node.write(socket.nick + " lähetti viestin: " + command.slice(2).join(" ") + "\r\n");
                        console.log("Käyttäjä " + socket.nick + "lähetti viestin käyttäjälle " + node.nick + "\n");
                    }
                });
                break;

            case 'WHOIS':
                connections.forEach(function(node){
                    if(node.nick == command[1]){
                        socket.write("Käyttäjän " + node.nick + " nimi on " + node.firstname + " " + node.lastname + "\r\n" );
                        console.log("Käyttäjä " + socket.nick + " kysyy, että kuka on käyttäjä " + node.nick + "\n");
                    } 
                });
                break;
            
            
            case 'USERS':
                var users = [];
                connections.forEach(function(socket){
                    users.push(socket.nick)
                });
                socket.write("Serverin käyttäjät:\n" + JSON.stringify(users) + "\r\n");
                console.log("Käyttäjä " + this.nick + " kysyi serverin käyttäjiä\n");
                break;

            // Lisäsin huvikseni komennon UPTIME joka kertoo serverin päälläoloajan.
            case 'UPTIME':
                socket.write("Serveri ollut päällä: " + format(uptime) + "\n");
                console.log("Serverin päälläoloaika lähetetty käyttäjälle " + this.nick);
                break;

            // Lisäsin tänne, että oletuksena serveri lähettää kaikki ilman komentoa olevat viestit kaikille.
            // Sain lisättyä myös, että ei lähetetä itselle takaisin. Olen guru :)
            default:
                var current = this.nick; //Napataan käyttäjän nick muuttujaan
                connections.forEach(function(client) {
                    if(current == client.nick)return; // jos client jolle lähetetään on sama kuin oma nick, ei lähetetä viestiä
                    client.write(current + ": " + buffer); // muuten lähetetään nimimerkki ja viesti
                });
                break;
        }   
    });
    
    socket.on('close', function() {
        console.log(socket.nick, " poistui serveriltä");
        connections = connections.filter((node) => {
            return node.nick != socket.nick;
        });
    });
}).listen(port); // Lisäsin tänne portin määrittelyn toisaalla.

console.log("Palvelin on nyt käynnistetty");

// Lisäsin tänne porttinumeron haun.
console.log("Yhteys telnetillä 'telnet localhost " + port + "'");