const express = require('express');
const session = require('express-session');
const url = require('url');
const router =  express.Router();
let parts;
let query;


var mapa =[
        [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [ 1,11,11,11,11,12,11,11,11,11,11,11,11,11,11,11,11,11,11,12,11,11,11,11,11,11,11,11,11,11,11,11,4,11,11,11,1],
        [ 1,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,1],
        [ 1,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,1],
        [ 1,12,11,11,0,0,0,0,3,0,0,3,3,0,3,3,3,0,0,3,3,3,3,3,0,0,0,0,0,0,11,11,11,11,11,11,1],
        [ 1,11,11,11,0,5,10,10,3,3,0,0,3,0,3,3,0,0,0,0,3,3,3,3,0,0,0,0,0,11,11,11,11,11,11,11,1],
        [ 1,11,11,11,0,10,2,2,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,11,11,11,11,11,11,11,1],
        [ 1,11,11,11,3,10,2,2,2,10,0,3,3,3,0,0,0,0,3,0,0,3,0,0,0,0,3,11,11,11,11,11,0,11,11,11,1],
        [ 1,11,11,11,3,3,10,2,2,2,3,2,2,2,3,0,0,3,0,0,0,0,3,0,0,3,11,11,11,11,11,0,3,11,11,11,1],
        [ 1,11,11,11,3,3,3,10,2,2,2,2,2,2,2,3,0,0,3,3,0,3,0,0,0,11,12,11,11,11,3,0,3,11,11,11,1],
        [ 1,11,11,11,3,3,0,3,10,2,2,2,2,2,2,3,0,0,0,0,0,0,0,0,11,11,11,11,11,3,3,0,3,11,11,11,1],
        [ 1,11,11,11,3,3,0,3,3,10,2,2,2,10,3,0,0,0,0,3,0,0,3,11,11,11,11,11,0,3,3,0,0,11,11,11,1],
        [ 1,11,11,11,0,0,0,0,0,3,10,2,2,2,10,0,0,0,0,0,3,3,11,11,11,11,11,0,0,0,0,3,0,11,11,11,1],
        [ 1,11,11,11,3,3,0,3,0,0,0,10,2,2,2,10,0,0,0,0,0,11,11,11,11,11,3,0,3,0,0,3,0,11,11,11,1],
        [ 1,11,11,11,3,3,0,3,3,0,3,0,10,2,2,2,10,0,0,3,11,11,11,11,11,3,3,0,3,3,0,0,0,11,11,11,1],
        [ 1,11,11,11,3,3,0,3,3,0,3,3,0,10,2,2,2,10,3,11,12,11,11,11,0,3,0,0,0,0,0,0,0,12,11,11,1],
        [ 1,11,11,11,3,3,0,3,3,0,3,3,0,3,10,2,10,3,11,11,11,11,11,0,0,0,0,0,0,0,3,3,3,11,11,11,1],
        [ 1,11,11,12,3,3,0,0,0,0,3,3,0,3,3,10,3,11,11,11,11,11,3,0,0,3,3,3,3,0,3,3,3,11,11,11,1],
        [ 1,11,11,11,3,3,3,0,3,3,3,3,0,0,0,3,12,11,11,11,11,3,3,0,0,3,3,0,0,0,0,3,3,11,11,11,1],
        [ 1,11,11,11,3,3,3,0,0,0,0,0,0,3,0,11,11,11,11,11,3,10,3,0,0,3,3,0,3,3,0,3,3,11,11,11,1],
        [ 1,11,11,11,0,0,0,0,0,3,3,0,3,3,11,11,11,11,11,3,10,2,10,0,0,3,3,0,3,3,0,3,3,11,11,11,1],
        [ 1,11,11,11,0,0,0,3,0,0,3,0,3,11,11,11,11,11,3,10,2,2,2,10,0,3,0,0,3,3,0,3,3,11,11,11,1],
        [ 1,11,11,11,3,3,0,3,0,0,0,0,11,11,11,11,11,0,0,3,10,2,2,2,10,0,0,0,0,3,0,3,3,11,11,11,1],
        [ 1,11,11,11,3,3,0,3,3,3,0,12,11,11,11,11,3,3,0,0,0,10,2,2,2,10,3,3,0,0,0,0,0,11,11,11,1],
        [ 1,11,11,11,3,3,0,3,3,3,11,11,11,11,11,3,0,0,3,0,0,3,2,2,2,2,10,3,0,0,0,3,3,11,11,11,1],
        [ 1,11,11,11,3,3,0,3,3,11,11,11,11,11,0,0,0,0,0,0,3,2,2,2,2,2,2,10,3,0,0,3,3,11,11,11,1],
        [ 1,11,12,11,0,3,0,3,11,11,11,11,11,0,0,0,3,3,0,0,3,2,2,2,2,2,2,2,10,3,3,3,3,11,11,11,1],
        [ 1,8,8,8,0,0,0,11,11,11,11,11,3,0,3,0,0,0,3,0,0,3,2,2,2,3,2,2,2,10,3,3,3,11,11,11,1],
        [ 1,8,8,8,8,0,11,11,11,11,11,3,0,0,3,0,0,3,0,0,0,0,3,3,3,0,10,2,2,2,10,3,3,11,11,11,1],
        [ 1,8,8,8,8,9,11,11,11,11,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,10,2,2,10,3,0,11,11,12,1],
        [ 1,8,8,8,8,8,8,11,11,0,3,3,3,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,10,10,0,0,0,11,11,11,1],
        [ 1,8,9,8,8,8,8,8,0,0,3,3,0,0,0,3,3,3,3,0,0,0,0,0,0,0,3,0,0,3,0,0,0,11,11,11,1],
        [ 1,8,8,8,8,8,8,8,8,0,3,3,0,0,0,3,3,3,3,3,7,0,3,3,3,0,3,3,0,3,0,0,0,11,11,11,1],
        [ 1,8,8,8,9,8,8,8,8,9,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,11,11,11,11,1],
        [ 1,8,8,8,8,8,8,8,8,8,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,1],
        [ 1,8,8,8,8,8,8,8,8,8,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,1],
        [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];



const host = 'localhost';
const porta = 3000;

var app = express();

app.use(session({ secret: 'rpg', resave: false, saveUninitialized: true }));

console.log(__dirname);

app.use(express.static(__dirname));

app.get('/jogar', function(req, res, next) {

	if (req.session.mapa == null) {

		
		console.log("inicializou a sessao");
		req.session.mapa = mapa;
	}if(req.session.player == null){
        req.session.player = [35,1];
    }
	
	console.log(req.session.mapa);
	var array = req.session.mapa;
	
	res.setHeader('Content-Type', 'text/plain'); 

	res.statusCode = 200;
   res.setHeader('Content-Type', 'text/html');

    
    res.write('<html>');
    res.write(`<link rel="stylesheet" href="/css.css" media="screen" charset="utf-8">`);
    res.write('<body>');
		res.write('<table>');
	
	for (var i = 0; i < array.length; i++) {
		res.write('<tr>');
		for (var j = 0; j < array[i].length; j++) {
            if(i == req.session.player[0] && j == req.session.player[1] && array[i][j]==0) {
                res.write(`<td class='grama'><div class='player'; style='top:`+i*32+`px;'></div>`);
            }else if(i == req.session.player[0] && j == req.session.player[1] && array[i][j]==8) {
                res.write(`<td class='ciment'><div class='player'; style='top:`+i*32+`px;'></div>`);
            }else if(i == req.session.player[0] && j == req.session.player[1] && array[i][j]==11) {
                res.write(`<td class='mid'><div class='player'; style='top:`+i*32+`px;'></div>`);
            }else if(i == req.session.player[0] && j == req.session.player[1] && array[i][j]==3) {
                res.write(`<td class='grama'><div class='player' style='top:`+i*32+`px;';><div class='arbusto2'></div></div>`);
            }else if(i == req.session.player[0] && j == req.session.player[1] && array[i][j]==2) {
                res.write(`<td class='agua'><div class='player'; style='top:`+i*32+`px;'></div>`);
            }else if(i == req.session.player[0] && j == req.session.player[1] && array[i][j]==10) {
                res.write(`<td class='ensop'><div class='player'; style='top:`+i*32+`px;'></div>`);
            }else if(i == req.session.player[0] && j == req.session.player[1] && array[i][j]==12) {
                res.write(`<td class='mid'><div class='player';><div class='torre';></div></div>`);
                }else if(array[i][j]==0){
                    res.write(`<td class="grama">`);
                }else if (array[i][j]==1){
                    res.write(`<td class="muro">`);
                }else if(array[i][j]==2){
                    res.write(`<td class="agua">`);
                }else if(array[i][j]==3){
                    res.write(`<td class='grama'><div class='arbusto2';></div>`);
                }else if(array[i][j]==4){
                    res.write(`<td class="mid"><div class='boss';></div>`);
                }else if(array[i][j]==5){
                    res.write(`<td class='grama'><div class='arvore';></div>`);
                }else if(array[i][j]==6){
                    res.write(`<td class='grama'><div class='arvore1';></div>`);
                }else if(array[i][j]==7){
                    res.write(`<td class='grama'><div class='torre';></div>`);
                }else if(array[i][j]==8){
                    res.write(`<td class='ciment'>`);
                }else if(array[i][j]==9){
                    res.write(`<td class='ciment'><div class='torre';></div>`);
                }else if(array[i][j]==10){
                    res.write(`<td class='ensop'>`);
                }else if(array[i][j]==11){
                    res.write(`<td class='mid'>`);
                }else if(array[i][j]==12){
                    res.write(`<td class='mid'><div class='torre';></div>`);
                }else if(array[i][j]==13){
                    res.write(`<td class='grama'><div class='arbusto2';><div class='torre';></div></div>`);
                }else if(array[i][j]==14){
                    
                }

      res.write(`<a href=/get/${i}/${j} style='top:`+i*32+`px;'>`);
			res.write(`${array[i][j]}`);
			res.write('</a>');
			res.write('</td>');
		
		}

		res.write('</tr>');
	}
	
	res.write('</table>');
    res.write('</body>');
    res.write('</html>');
    res.end();
	
});


app.get('/get/*', function(req, res, next) {
	array = req.session.mapa;
	
	var obj = req.url.split('/');
    console.log(obj);
	
	var linha = obj[2];
	var coluna = obj[3];
  
 //    res.setHeader('Content-Type', 'text/plain'); 
	// res.statusCode = 200;
 //    res.setHeader('Content-Type', 'text/html');
    
 //    res.write('<html>');
 //    res.write(`<link rel="stylesheet" href="/css.css" media="screen" charset="utf-8">`);
 //    res.write('<body>');
	
	// res.write(`<p> Linha: ${linha}, coluna: ${coluna}</p>`);
	// res.write(`<p> Valor original: ${array[linha][coluna]}</p>`);
	
	// array[linha][coluna] = 14;
	req.session.player = [linha, coluna];
	// res.write(`<p> Novo valor: ${array[linha][coluna]}</p>`);
	// res.write('<a href="http://localhost:3000">voltar</a>');
	
 //    res.write('</body>');
 //    res.write('</html>');
 //    res.end	();
	res.redirect("/jogar");
});


app.listen(3000, () => {
  console.log('Escutando localhost:3000');
})