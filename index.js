const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');
const request = require('request');


var app = express();
app.use(bodyParser.json({limit: '50mb'}));

var port = process.argv[2] || 9001;

var server = app.listen(port, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log('Processor listening at http://%s:%s', host, port);

});

app.post('/', function(req, res) {
		var parsed = '';
		var nerPort = 8000;
		var text = req.body.text.replace(/\n+/gm, function myFunc(x){return' ';});

		if (text.trim()===''){
			res.status(500).json({process:'parsing', input: text, error: 'empty text'});
			return false
		}
		request.post('http://localhost:8001', {form:{input:text}}, function(err,httpResponse,body){ 
			if (err) { console.log(err); res.status(500).json({process:'language-identifier', text: body, error: err}); return false; }
			request.post('http://localhost:8002', {form:{input:body}}, function(err,httpResponse,body){ 
				if (err) { console.log(err); res.status(500).json({process:'tokenizer', text: body, error: err}); return false; }
				request.post('http://localhost:8003', {form:{input:body}}, function(err,httpResponse,body){ 
					if (err) { console.log(err); res.status(500).json({process:'pos-tagger', text: body, error: err}); return false; }
					request.post('http://localhost:8004', {form:{input:body}}, function(err,httpResponse,body){ 
						if (err) { console.log(err); res.status(500).json({process:'constituent-parser rrrr', text: body, error: err}); return false; }
						request.post('http://localhost:8005', {form:{input:body}}, function(err,httpResponse,body){ 
							if (err) { console.log(err); res.status(500).json({process:'ner', text: body, error: err}); return false; }
							request.post('http://localhost:8006', {form:{input:body}}, function(err,httpResponse,body){ 
								if (err) { console.log(err); res.status(500).json({process:'kaf2json', text: body, error: err}); return false; }
								res.status(200).send(body);
							})
						})
					})
				})
			})
		})


});

app.get('/', function (req, res) {
		res.send(`Example CURL request: <br/><code>curl -XPOST -H "Content-type: application/json" -d "{\\"text\\":\\"Dada (/ˈdɑːdɑː/) or Dadaism was an art movement of the European avant-garde in the early 20th century, with early centers in Zürich, Switzerland at the Cabaret Voltaire (circa 1916); New York Dada began circa 1915,[1] and after 1920 Dada flourished in Paris. Developed in reaction to World War I, the Dada movement consisted of artists who rejected the logic, reason, and aestheticism of modern capitalist society, instead expressing nonsense, irrationality, and anti-bourgeois protest in their works.[2][3][4] The art of the movement spanned visual, literary, and sound media, including collage, sound poetry, cut-up writing, and sculpture. Dadaist artists expressed their discontent with violence, war, and nationalism, and maintained political affinities with the radical left.[5] Cover of the first edition of the publication Dada by Tristan Tzara; Zürich, 1917 There is no consensus on the origin of the movement's name; a common story is that the Austrian artist Richard Huelsenbeck plunged a knife at random into a dictionary, where it landed on dada, a colloquial French term for a hobby horse. Others note that it suggests the first words of a child, evoking a childishness and absurdity that appealed to the group. Still others speculate that the word might have been chosen to evoke a similar meaning (or no meaning at all) in any language, reflecting the movement's internationalism.[6] The roots of Dada lay in pre-war avant-garde. The term anti-art, a precursor to Dada, was coined by Marcel Duchamp around 1913 to characterize works which challenge accepted definitions of art.[7] Cubism and the development of collage and abstract art would inform the movement's detachment from the constraints of reality and convention. The work of French poets, Italian Futurists and the German Expressionists would influence Dada's rejection of the tight correlation between words and meaning.[8][9] Works such as Ubu Roi (1896) by Alfred Jarry, and the ballet Parade (1916–17) by Erik Satie would also be characterized as proto-Dadaist works.[10] The Dada movement's principles were first collected in Hugo Ball's Dada Manifesto in 1916. The Dadaist movement included public gatherings, demonstrations, and publication of art/literary journals; passionate coverage of art, politics, and culture were topics often discussed in a variety of media. Key figures in the movement included Hugo Ball, Marcel Duchamp, Emmy Hennings, Hans Arp, Raoul Hausmann, Hannah Höch, Johannes Baader, Tristan Tzara, Francis Picabia, Huelsenbeck, George Grosz, John Heartfield, Man Ray, Beatrice Wood, Kurt Schwitters, Hans Richter, and Max Ernst, among others. The movement influenced later styles like the avant-garde and downtown music movements, and groups including surrealism, nouveau réalisme, pop art and Fluxus.\\"}" 'http://localhost:9001/'</code><br/><br/>Results:<br/><code>{
							"text"      : "Dada ( / ˈdɑːdɑː / ) or Dadaism was an art movement of the European avant-garde in the early 20th century , with early centers in Zürich , Switzerland at the Cabaret Voltaire ( circa 1916 ) ; New York Dada began circa 1915 , [ 1 ] and after 1920 Dada flourished in Paris . Developed in reaction to World War I , the Dada movement consisted of artists who rejected the logic , reason , and aestheticism of modern capitalist society , instead expressing nonsense , irrationality , and anti-bourgeois protest in their works . [ 2 ] [ 3 ] [ 4 ] The art of the movement spanned visual , literary , and sound media , including collage , sound poetry , cut-up writing , and sculpture . Dadaist artists expressed their discontent with violence , war , and nationalism , and maintained political affinities with the radical left . [ 5 ] Cover of the first edition of the publication Dada by Tristan Tzara ; Zürich , 1917 There is no consensus on the origin of the movement 's name ; a common story is that the Austrian artist Richard Huelsenbeck plunged a knife at random into a dictionary , where it landed on dada , a colloquial French term for a hobby horse . Others note that it suggests the first words of a child , evoking a childishness and absurdity that appealed to the group . Still others speculate that the word might have been chosen to evoke a similar meaning ( or no meaning at all ) in any language , reflecting the movement 's internationalism . [ 6 ] The roots of Dada lay in pre-war avant-garde . The term anti-art , a precursor to Dada , was coined by Marcel Duchamp around 1913 to characterize works which challenge accepted definitions of art . [ 7 ] Cubism and the development of collage and abstract art would inform the movement 's detachment from the constraints of reality and convention . The work of French poets , Italian Futurists and the German Expressionists would influence Dada 's rejection of the tight correlation between words and meaning . [ 8 ] [ 9 ] Works such as Ubu Roi ( 1896 ) by Alfred Jarry , and the ballet Parade ( 1916 – 17 ) by Erik Satie would also be characterized as proto-Dadaist works . [ 10 ] The Dada movement 's principles were first collected in Hugo Ball 's Dada Manifesto in 1916 . The Dadaist movement included public gatherings , demonstrations , and publication of art / literary journals ; passionate coverage of art , politics , and culture were topics often discussed in a variety of media . Key figures in the movement included Hugo Ball , Marcel Duchamp , Emmy Hennings , Hans Arp , Raoul Hausmann , Hannah Höch , Johannes Baader , Tristan Tzara , Francis Picabia , Huelsenbeck , George Grosz , John Heartfield , Man Ray , Beatrice Wood , Kurt Schwitters , Hans Richter , and Max Ernst , among others . The movement influenced later styles like the avant-garde and downtown music movements , and groups including surrealism , nouveau réalisme , pop art and Fluxus . ",
							"language"  : "en",
							"terms"     : {
						 	"t1":
							{
								"type"       :"close",
								"lemma"      :"Dada",
								"text"       :"Dada",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e1"
							},
						 	"t2":
							{
								"type"       :"close",
								"lemma"      :"(",
								"text"       :"(",
								"pos"        :"O",
								"morphofeat" :"("
							},
						 	"t3":
							{
								"type"       :"open",
								"lemma"      :"/",
								"text"       :"/",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t4":
							{
								"type"       :"open",
								"lemma"      :"ˈdɑːdɑː",
								"text"       :"ˈdɑːdɑː",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t5":
							{
								"type"       :"open",
								"lemma"      :"/",
								"text"       :"/",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t6":
							{
								"type"       :"close",
								"lemma"      :")",
								"text"       :")",
								"pos"        :"O",
								"morphofeat" :")"
							},
						 	"t7":
							{
								"type"       :"close",
								"lemma"      :"or",
								"text"       :"or",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t8":
							{
								"type"       :"close",
								"lemma"      :"Dadaism",
								"text"       :"Dadaism",
								"pos"        :"R",
								"morphofeat" :"NNP"
							},
						 	"t9":
							{
								"type"       :"open",
								"lemma"      :"be",
								"text"       :"was",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t10":
							{
								"type"       :"close",
								"lemma"      :"a",
								"text"       :"an",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t11":
							{
								"type"       :"open",
								"lemma"      :"art",
								"text"       :"art",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t12":
							{
								"type"       :"open",
								"lemma"      :"movement",
								"text"       :"movement",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t13":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t14":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t15":
							{
								"type"       :"open",
								"lemma"      :"european",
								"text"       :"European",
								"pos"        :"G",
								"morphofeat" :"JJ",
								"entity"     :"e2"
							},
						 	"t16":
							{
								"type"       :"open",
								"lemma"      :"avantgarde",
								"text"       :"avant-garde",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t17":
							{
								"type"       :"close",
								"lemma"      :"in",
								"text"       :"in",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t18":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t19":
							{
								"type"       :"open",
								"lemma"      :"early",
								"text"       :"early",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t20":
							{
								"type"       :"open",
								"lemma"      :"20th",
								"text"       :"20th",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t21":
							{
								"type"       :"open",
								"lemma"      :"century",
								"text"       :"century",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t22":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t23":
							{
								"type"       :"close",
								"lemma"      :"with",
								"text"       :"with",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t24":
							{
								"type"       :"open",
								"lemma"      :"early",
								"text"       :"early",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t25":
							{
								"type"       :"open",
								"lemma"      :"center",
								"text"       :"centers",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t26":
							{
								"type"       :"close",
								"lemma"      :"in",
								"text"       :"in",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t27":
							{
								"type"       :"close",
								"lemma"      :"Zürich",
								"text"       :"Zürich",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e3"
							},
						 	"t28":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t29":
							{
								"type"       :"close",
								"lemma"      :"Switzerland",
								"text"       :"Switzerland",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e4"
							},
						 	"t30":
							{
								"type"       :"close",
								"lemma"      :"at",
								"text"       :"at",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t31":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t32":
							{
								"type"       :"close",
								"lemma"      :"Cabaret",
								"text"       :"Cabaret",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e5"
							},
						 	"t33":
							{
								"type"       :"close",
								"lemma"      :"Voltaire",
								"text"       :"Voltaire",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e5"
							},
						 	"t34":
							{
								"type"       :"close",
								"lemma"      :"(",
								"text"       :"(",
								"pos"        :"O",
								"morphofeat" :"("
							},
						 	"t35":
							{
								"type"       :"open",
								"lemma"      :"circa",
								"text"       :"circa",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t36":
							{
								"type"       :"close",
								"lemma"      :"1916",
								"text"       :"1916",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t37":
							{
								"type"       :"close",
								"lemma"      :")",
								"text"       :")",
								"pos"        :"O",
								"morphofeat" :")"
							},
						 	"t38":
							{
								"type"       :"close",
								"lemma"      :";",
								"text"       :";",
								"pos"        :"O",
								"morphofeat" :":"
							},
						 	"t39":
							{
								"type"       :"close",
								"lemma"      :"New",
								"text"       :"New",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e6"
							},
						 	"t40":
							{
								"type"       :"close",
								"lemma"      :"York",
								"text"       :"York",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e6"
							},
						 	"t41":
							{
								"type"       :"close",
								"lemma"      :"Dada",
								"text"       :"Dada",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e6"
							},
						 	"t42":
							{
								"type"       :"open",
								"lemma"      :"begin",
								"text"       :"began",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t43":
							{
								"type"       :"open",
								"lemma"      :"circa",
								"text"       :"circa",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t44":
							{
								"type"       :"close",
								"lemma"      :"1915",
								"text"       :"1915",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t45":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t46":
							{
								"type"       :"open",
								"lemma"      :"[",
								"text"       :"[",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t47":
							{
								"type"       :"close",
								"lemma"      :"1",
								"text"       :"1",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t48":
							{
								"type"       :"open",
								"lemma"      :"]",
								"text"       :"]",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t49":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t50":
							{
								"type"       :"close",
								"lemma"      :"after",
								"text"       :"after",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t51":
							{
								"type"       :"close",
								"lemma"      :"1920",
								"text"       :"1920",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t52":
							{
								"type"       :"close",
								"lemma"      :"Dada",
								"text"       :"Dada",
								"pos"        :"R",
								"morphofeat" :"NNP"
							},
						 	"t53":
							{
								"type"       :"open",
								"lemma"      :"flourish",
								"text"       :"flourished",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t54":
							{
								"type"       :"close",
								"lemma"      :"in",
								"text"       :"in",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t55":
							{
								"type"       :"close",
								"lemma"      :"Paris",
								"text"       :"Paris",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e7"
							},
						 	"t56":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t57":
							{
								"type"       :"close",
								"lemma"      :"Developed",
								"text"       :"Developed",
								"pos"        :"R",
								"morphofeat" :"NNP"
							},
						 	"t58":
							{
								"type"       :"close",
								"lemma"      :"in",
								"text"       :"in",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t59":
							{
								"type"       :"open",
								"lemma"      :"reaction",
								"text"       :"reaction",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t60":
							{
								"type"       :"close",
								"lemma"      :"to",
								"text"       :"to",
								"pos"        :"P",
								"morphofeat" :"TO"
							},
						 	"t61":
							{
								"type"       :"close",
								"lemma"      :"World",
								"text"       :"World",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e8"
							},
						 	"t62":
							{
								"type"       :"close",
								"lemma"      :"War",
								"text"       :"War",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e8"
							},
						 	"t63":
							{
								"type"       :"close",
								"lemma"      :"I",
								"text"       :"I",
								"pos"        :"R",
								"morphofeat" :"NNP"
							},
						 	"t64":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t65":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t66":
							{
								"type"       :"close",
								"lemma"      :"Dada",
								"text"       :"Dada",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e9"
							},
						 	"t67":
							{
								"type"       :"open",
								"lemma"      :"movement",
								"text"       :"movement",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t68":
							{
								"type"       :"open",
								"lemma"      :"consist",
								"text"       :"consisted",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t69":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t70":
							{
								"type"       :"open",
								"lemma"      :"artist",
								"text"       :"artists",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t71":
							{
								"type"       :"close",
								"lemma"      :"who",
								"text"       :"who",
								"pos"        :"Q",
								"morphofeat" :"WP"
							},
						 	"t72":
							{
								"type"       :"open",
								"lemma"      :"reject",
								"text"       :"rejected",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t73":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t74":
							{
								"type"       :"open",
								"lemma"      :"logic",
								"text"       :"logic",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t75":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t76":
							{
								"type"       :"open",
								"lemma"      :"reason",
								"text"       :"reason",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t77":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t78":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t79":
							{
								"type"       :"open",
								"lemma"      :"aestheticism",
								"text"       :"aestheticism",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t80":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t81":
							{
								"type"       :"open",
								"lemma"      :"modern",
								"text"       :"modern",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t82":
							{
								"type"       :"open",
								"lemma"      :"capitalist",
								"text"       :"capitalist",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t83":
							{
								"type"       :"open",
								"lemma"      :"society",
								"text"       :"society",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t84":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t85":
							{
								"type"       :"open",
								"lemma"      :"instead",
								"text"       :"instead",
								"pos"        :"A",
								"morphofeat" :"RB"
							},
						 	"t86":
							{
								"type"       :"open",
								"lemma"      :"express",
								"text"       :"expressing",
								"pos"        :"V",
								"morphofeat" :"VBG"
							},
						 	"t87":
							{
								"type"       :"open",
								"lemma"      :"nonsense",
								"text"       :"nonsense",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t88":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t89":
							{
								"type"       :"open",
								"lemma"      :"irrationality",
								"text"       :"irrationality",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t90":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t91":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t92":
							{
								"type"       :"open",
								"lemma"      :"anti-bourgeois",
								"text"       :"anti-bourgeois",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t93":
							{
								"type"       :"open",
								"lemma"      :"protest",
								"text"       :"protest",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t94":
							{
								"type"       :"close",
								"lemma"      :"in",
								"text"       :"in",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t95":
							{
								"type"       :"close",
								"lemma"      :"their",
								"text"       :"their",
								"pos"        :"Q",
								"morphofeat" :"PRP$"
							},
						 	"t96":
							{
								"type"       :"open",
								"lemma"      :"work",
								"text"       :"works",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t97":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t98":
							{
								"type"       :"open",
								"lemma"      :"[",
								"text"       :"[",
								"pos"        :"A",
								"morphofeat" :"RB"
							},
						 	"t99":
							{
								"type"       :"close",
								"lemma"      :"2",
								"text"       :"2",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t100":
							{
								"type"       :"open",
								"lemma"      :"]",
								"text"       :"]",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t101":
							{
								"type"       :"open",
								"lemma"      :"[",
								"text"       :"[",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t102":
							{
								"type"       :"close",
								"lemma"      :"3",
								"text"       :"3",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t103":
							{
								"type"       :"open",
								"lemma"      :"]",
								"text"       :"]",
								"pos"        :"V",
								"morphofeat" :"VBP"
							},
						 	"t104":
							{
								"type"       :"open",
								"lemma"      :"[",
								"text"       :"[",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t105":
							{
								"type"       :"close",
								"lemma"      :"4",
								"text"       :"4",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t106":
							{
								"type"       :"open",
								"lemma"      :"]",
								"text"       :"]",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t107":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"The",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t108":
							{
								"type"       :"open",
								"lemma"      :"art",
								"text"       :"art",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t109":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t110":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t111":
							{
								"type"       :"open",
								"lemma"      :"movement",
								"text"       :"movement",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t112":
							{
								"type"       :"open",
								"lemma"      :"span",
								"text"       :"spanned",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t113":
							{
								"type"       :"open",
								"lemma"      :"visual",
								"text"       :"visual",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t114":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t115":
							{
								"type"       :"open",
								"lemma"      :"literary",
								"text"       :"literary",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t116":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t117":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t118":
							{
								"type"       :"open",
								"lemma"      :"sound",
								"text"       :"sound",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t119":
							{
								"type"       :"open",
								"lemma"      :"medium",
								"text"       :"media",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t120":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t121":
							{
								"type"       :"open",
								"lemma"      :"include",
								"text"       :"including",
								"pos"        :"V",
								"morphofeat" :"VBG"
							},
						 	"t122":
							{
								"type"       :"open",
								"lemma"      :"collage",
								"text"       :"collage",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t123":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t124":
							{
								"type"       :"open",
								"lemma"      :"sound",
								"text"       :"sound",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t125":
							{
								"type"       :"open",
								"lemma"      :"poetry",
								"text"       :"poetry",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t126":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t127":
							{
								"type"       :"open",
								"lemma"      :"cut-up",
								"text"       :"cut-up",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t128":
							{
								"type"       :"open",
								"lemma"      :"writing",
								"text"       :"writing",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t129":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t130":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t131":
							{
								"type"       :"open",
								"lemma"      :"sculpture",
								"text"       :"sculpture",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t132":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t133":
							{
								"type"       :"close",
								"lemma"      :"Dadaist",
								"text"       :"Dadaist",
								"pos"        :"R",
								"morphofeat" :"NNP"
							},
						 	"t134":
							{
								"type"       :"open",
								"lemma"      :"artist",
								"text"       :"artists",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t135":
							{
								"type"       :"open",
								"lemma"      :"express",
								"text"       :"expressed",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t136":
							{
								"type"       :"close",
								"lemma"      :"their",
								"text"       :"their",
								"pos"        :"Q",
								"morphofeat" :"PRP$"
							},
						 	"t137":
							{
								"type"       :"open",
								"lemma"      :"discontent",
								"text"       :"discontent",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t138":
							{
								"type"       :"close",
								"lemma"      :"with",
								"text"       :"with",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t139":
							{
								"type"       :"open",
								"lemma"      :"violence",
								"text"       :"violence",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t140":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t141":
							{
								"type"       :"open",
								"lemma"      :"war",
								"text"       :"war",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t142":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t143":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t144":
							{
								"type"       :"open",
								"lemma"      :"nationalism",
								"text"       :"nationalism",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t145":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t146":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t147":
							{
								"type"       :"open",
								"lemma"      :"maintain",
								"text"       :"maintained",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t148":
							{
								"type"       :"open",
								"lemma"      :"political",
								"text"       :"political",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t149":
							{
								"type"       :"open",
								"lemma"      :"affinity",
								"text"       :"affinities",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t150":
							{
								"type"       :"close",
								"lemma"      :"with",
								"text"       :"with",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t151":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t152":
							{
								"type"       :"open",
								"lemma"      :"radical",
								"text"       :"radical",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t153":
							{
								"type"       :"open",
								"lemma"      :"left",
								"text"       :"left",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t154":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t155":
							{
								"type"       :"close",
								"lemma"      :"[",
								"text"       :"[",
								"pos"        :"O",
								"morphofeat" :"SYM"
							},
						 	"t156":
							{
								"type"       :"close",
								"lemma"      :"5",
								"text"       :"5",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t157":
							{
								"type"       :"open",
								"lemma"      :"]",
								"text"       :"]",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t158":
							{
								"type"       :"close",
								"lemma"      :"Cover",
								"text"       :"Cover",
								"pos"        :"R",
								"morphofeat" :"NNP"
							},
						 	"t159":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t160":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t161":
							{
								"type"       :"open",
								"lemma"      :"1",
								"text"       :"first",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t162":
							{
								"type"       :"open",
								"lemma"      :"edition",
								"text"       :"edition",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t163":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t164":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t165":
							{
								"type"       :"open",
								"lemma"      :"publication",
								"text"       :"publication",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t166":
							{
								"type"       :"close",
								"lemma"      :"Dada",
								"text"       :"Dada",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e10"
							},
						 	"t167":
							{
								"type"       :"close",
								"lemma"      :"by",
								"text"       :"by",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t168":
							{
								"type"       :"close",
								"lemma"      :"Tristan",
								"text"       :"Tristan",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e11"
							},
						 	"t169":
							{
								"type"       :"close",
								"lemma"      :"Tzara",
								"text"       :"Tzara",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e11"
							},
						 	"t170":
							{
								"type"       :"close",
								"lemma"      :";",
								"text"       :";",
								"pos"        :"O",
								"morphofeat" :":"
							},
						 	"t171":
							{
								"type"       :"close",
								"lemma"      :"Zürich",
								"text"       :"Zürich",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e12"
							},
						 	"t172":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t173":
							{
								"type"       :"close",
								"lemma"      :"1917",
								"text"       :"1917",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t174":
							{
								"type"       :"close",
								"lemma"      :"there",
								"text"       :"There",
								"pos"        :"O",
								"morphofeat" :"EX"
							},
						 	"t175":
							{
								"type"       :"open",
								"lemma"      :"be",
								"text"       :"is",
								"pos"        :"V",
								"morphofeat" :"VBZ"
							},
						 	"t176":
							{
								"type"       :"close",
								"lemma"      :"no",
								"text"       :"no",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t177":
							{
								"type"       :"open",
								"lemma"      :"consensus",
								"text"       :"consensus",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t178":
							{
								"type"       :"close",
								"lemma"      :"on",
								"text"       :"on",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t179":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t180":
							{
								"type"       :"open",
								"lemma"      :"origin",
								"text"       :"origin",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t181":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t182":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t183":
							{
								"type"       :"open",
								"lemma"      :"movement",
								"text"       :"movement",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t184":
							{
								"type"       :"close",
								"lemma"      :"'s",
								"text"       :"'s",
								"pos"        :"O",
								"morphofeat" :"POS"
							},
						 	"t185":
							{
								"type"       :"open",
								"lemma"      :"name",
								"text"       :"name",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t186":
							{
								"type"       :"close",
								"lemma"      :";",
								"text"       :";",
								"pos"        :"O",
								"morphofeat" :":"
							},
						 	"t187":
							{
								"type"       :"close",
								"lemma"      :"a",
								"text"       :"a",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t188":
							{
								"type"       :"open",
								"lemma"      :"common",
								"text"       :"common",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t189":
							{
								"type"       :"open",
								"lemma"      :"story",
								"text"       :"story",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t190":
							{
								"type"       :"open",
								"lemma"      :"be",
								"text"       :"is",
								"pos"        :"V",
								"morphofeat" :"VBZ"
							},
						 	"t191":
							{
								"type"       :"close",
								"lemma"      :"that",
								"text"       :"that",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t192":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t193":
							{
								"type"       :"open",
								"lemma"      :"austrian",
								"text"       :"Austrian",
								"pos"        :"G",
								"morphofeat" :"JJ",
								"entity"     :"e13"
							},
						 	"t194":
							{
								"type"       :"open",
								"lemma"      :"artist",
								"text"       :"artist",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t195":
							{
								"type"       :"close",
								"lemma"      :"Richard",
								"text"       :"Richard",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e14"
							},
						 	"t196":
							{
								"type"       :"close",
								"lemma"      :"Huelsenbeck",
								"text"       :"Huelsenbeck",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e14"
							},
						 	"t197":
							{
								"type"       :"open",
								"lemma"      :"plunge",
								"text"       :"plunged",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t198":
							{
								"type"       :"close",
								"lemma"      :"a",
								"text"       :"a",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t199":
							{
								"type"       :"open",
								"lemma"      :"knife",
								"text"       :"knife",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t200":
							{
								"type"       :"close",
								"lemma"      :"at",
								"text"       :"at",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t201":
							{
								"type"       :"open",
								"lemma"      :"random",
								"text"       :"random",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t202":
							{
								"type"       :"close",
								"lemma"      :"into",
								"text"       :"into",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t203":
							{
								"type"       :"close",
								"lemma"      :"a",
								"text"       :"a",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t204":
							{
								"type"       :"open",
								"lemma"      :"dictionary",
								"text"       :"dictionary",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t205":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t206":
							{
								"type"       :"close",
								"lemma"      :"where",
								"text"       :"where",
								"pos"        :"O",
								"morphofeat" :"WRB"
							},
						 	"t207":
							{
								"type"       :"close",
								"lemma"      :"it",
								"text"       :"it",
								"pos"        :"Q",
								"morphofeat" :"PRP"
							},
						 	"t208":
							{
								"type"       :"open",
								"lemma"      :"land",
								"text"       :"landed",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t209":
							{
								"type"       :"close",
								"lemma"      :"on",
								"text"       :"on",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t210":
							{
								"type"       :"open",
								"lemma"      :"dada",
								"text"       :"dada",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t211":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t212":
							{
								"type"       :"close",
								"lemma"      :"a",
								"text"       :"a",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t213":
							{
								"type"       :"open",
								"lemma"      :"colloquial",
								"text"       :"colloquial",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t214":
							{
								"type"       :"open",
								"lemma"      :"french",
								"text"       :"French",
								"pos"        :"G",
								"morphofeat" :"JJ",
								"entity"     :"e15"
							},
						 	"t215":
							{
								"type"       :"open",
								"lemma"      :"term",
								"text"       :"term",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t216":
							{
								"type"       :"close",
								"lemma"      :"for",
								"text"       :"for",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t217":
							{
								"type"       :"close",
								"lemma"      :"a",
								"text"       :"a",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t218":
							{
								"type"       :"open",
								"lemma"      :"hobby",
								"text"       :"hobby",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t219":
							{
								"type"       :"open",
								"lemma"      :"horse",
								"text"       :"horse",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t220":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t221":
							{
								"type"       :"open",
								"lemma"      :"other",
								"text"       :"Others",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t222":
							{
								"type"       :"open",
								"lemma"      :"note",
								"text"       :"note",
								"pos"        :"V",
								"morphofeat" :"VBP"
							},
						 	"t223":
							{
								"type"       :"close",
								"lemma"      :"that",
								"text"       :"that",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t224":
							{
								"type"       :"close",
								"lemma"      :"it",
								"text"       :"it",
								"pos"        :"Q",
								"morphofeat" :"PRP"
							},
						 	"t225":
							{
								"type"       :"open",
								"lemma"      :"suggest",
								"text"       :"suggests",
								"pos"        :"V",
								"morphofeat" :"VBZ"
							},
						 	"t226":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t227":
							{
								"type"       :"open",
								"lemma"      :"1",
								"text"       :"first",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t228":
							{
								"type"       :"open",
								"lemma"      :"word",
								"text"       :"words",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t229":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t230":
							{
								"type"       :"close",
								"lemma"      :"a",
								"text"       :"a",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t231":
							{
								"type"       :"open",
								"lemma"      :"child",
								"text"       :"child",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t232":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t233":
							{
								"type"       :"open",
								"lemma"      :"evoke",
								"text"       :"evoking",
								"pos"        :"V",
								"morphofeat" :"VBG"
							},
						 	"t234":
							{
								"type"       :"close",
								"lemma"      :"a",
								"text"       :"a",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t235":
							{
								"type"       :"open",
								"lemma"      :"childishness",
								"text"       :"childishness",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t236":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t237":
							{
								"type"       :"open",
								"lemma"      :"absurdity",
								"text"       :"absurdity",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t238":
							{
								"type"       :"close",
								"lemma"      :"that",
								"text"       :"that",
								"pos"        :"O",
								"morphofeat" :"WDT"
							},
						 	"t239":
							{
								"type"       :"open",
								"lemma"      :"appeal",
								"text"       :"appealed",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t240":
							{
								"type"       :"close",
								"lemma"      :"to",
								"text"       :"to",
								"pos"        :"P",
								"morphofeat" :"TO"
							},
						 	"t241":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t242":
							{
								"type"       :"open",
								"lemma"      :"group",
								"text"       :"group",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t243":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t244":
							{
								"type"       :"open",
								"lemma"      :"still",
								"text"       :"Still",
								"pos"        :"A",
								"morphofeat" :"RB"
							},
						 	"t245":
							{
								"type"       :"open",
								"lemma"      :"other",
								"text"       :"others",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t246":
							{
								"type"       :"open",
								"lemma"      :"speculate",
								"text"       :"speculate",
								"pos"        :"V",
								"morphofeat" :"VBP"
							},
						 	"t247":
							{
								"type"       :"close",
								"lemma"      :"that",
								"text"       :"that",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t248":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t249":
							{
								"type"       :"open",
								"lemma"      :"word",
								"text"       :"word",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t250":
							{
								"type"       :"close",
								"lemma"      :"may",
								"text"       :"might",
								"pos"        :"O",
								"morphofeat" :"MD"
							},
						 	"t251":
							{
								"type"       :"open",
								"lemma"      :"have",
								"text"       :"have",
								"pos"        :"V",
								"morphofeat" :"VB"
							},
						 	"t252":
							{
								"type"       :"open",
								"lemma"      :"be",
								"text"       :"been",
								"pos"        :"V",
								"morphofeat" :"VBN"
							},
						 	"t253":
							{
								"type"       :"open",
								"lemma"      :"choose",
								"text"       :"chosen",
								"pos"        :"V",
								"morphofeat" :"VBN"
							},
						 	"t254":
							{
								"type"       :"close",
								"lemma"      :"to",
								"text"       :"to",
								"pos"        :"P",
								"morphofeat" :"TO"
							},
						 	"t255":
							{
								"type"       :"open",
								"lemma"      :"evoke",
								"text"       :"evoke",
								"pos"        :"V",
								"morphofeat" :"VB"
							},
						 	"t256":
							{
								"type"       :"close",
								"lemma"      :"a",
								"text"       :"a",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t257":
							{
								"type"       :"open",
								"lemma"      :"similar",
								"text"       :"similar",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t258":
							{
								"type"       :"open",
								"lemma"      :"meaning",
								"text"       :"meaning",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t259":
							{
								"type"       :"close",
								"lemma"      :"(",
								"text"       :"(",
								"pos"        :"O",
								"morphofeat" :"("
							},
						 	"t260":
							{
								"type"       :"close",
								"lemma"      :"or",
								"text"       :"or",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t261":
							{
								"type"       :"open",
								"lemma"      :"no",
								"text"       :"no",
								"pos"        :"A",
								"morphofeat" :"RB"
							},
						 	"t262":
							{
								"type"       :"open",
								"lemma"      :"meaning",
								"text"       :"meaning",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t263":
							{
								"type"       :"close",
								"lemma"      :"at",
								"text"       :"at",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t264":
							{
								"type"       :"close",
								"lemma"      :"all",
								"text"       :"all",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t265":
							{
								"type"       :"close",
								"lemma"      :")",
								"text"       :")",
								"pos"        :"O",
								"morphofeat" :")"
							},
						 	"t266":
							{
								"type"       :"close",
								"lemma"      :"in",
								"text"       :"in",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t267":
							{
								"type"       :"close",
								"lemma"      :"any",
								"text"       :"any",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t268":
							{
								"type"       :"open",
								"lemma"      :"language",
								"text"       :"language",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t269":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t270":
							{
								"type"       :"open",
								"lemma"      :"reflect",
								"text"       :"reflecting",
								"pos"        :"V",
								"morphofeat" :"VBG"
							},
						 	"t271":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t272":
							{
								"type"       :"open",
								"lemma"      :"movement",
								"text"       :"movement",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t273":
							{
								"type"       :"close",
								"lemma"      :"'s",
								"text"       :"'s",
								"pos"        :"O",
								"morphofeat" :"POS"
							},
						 	"t274":
							{
								"type"       :"open",
								"lemma"      :"internationalism",
								"text"       :"internationalism",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t275":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t276":
							{
								"type"       :"close",
								"lemma"      :"[",
								"text"       :"[",
								"pos"        :"O",
								"morphofeat" :"SYM"
							},
						 	"t277":
							{
								"type"       :"close",
								"lemma"      :"6",
								"text"       :"6",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t278":
							{
								"type"       :"open",
								"lemma"      :"]",
								"text"       :"]",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t279":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"The",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t280":
							{
								"type"       :"open",
								"lemma"      :"root",
								"text"       :"roots",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t281":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t282":
							{
								"type"       :"close",
								"lemma"      :"Dada",
								"text"       :"Dada",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e16"
							},
						 	"t283":
							{
								"type"       :"open",
								"lemma"      :"lie",
								"text"       :"lay",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t284":
							{
								"type"       :"close",
								"lemma"      :"in",
								"text"       :"in",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t285":
							{
								"type"       :"open",
								"lemma"      :"pre-war",
								"text"       :"pre-war",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t286":
							{
								"type"       :"open",
								"lemma"      :"avantgarde",
								"text"       :"avant-garde",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t287":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t288":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"The",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t289":
							{
								"type"       :"open",
								"lemma"      :"term",
								"text"       :"term",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t290":
							{
								"type"       :"open",
								"lemma"      :"anti-art",
								"text"       :"anti-art",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t291":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t292":
							{
								"type"       :"close",
								"lemma"      :"a",
								"text"       :"a",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t293":
							{
								"type"       :"open",
								"lemma"      :"precursor",
								"text"       :"precursor",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t294":
							{
								"type"       :"close",
								"lemma"      :"to",
								"text"       :"to",
								"pos"        :"P",
								"morphofeat" :"TO"
							},
						 	"t295":
							{
								"type"       :"close",
								"lemma"      :"Dada",
								"text"       :"Dada",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e17"
							},
						 	"t296":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t297":
							{
								"type"       :"open",
								"lemma"      :"be",
								"text"       :"was",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t298":
							{
								"type"       :"open",
								"lemma"      :"coin",
								"text"       :"coined",
								"pos"        :"V",
								"morphofeat" :"VBN"
							},
						 	"t299":
							{
								"type"       :"close",
								"lemma"      :"by",
								"text"       :"by",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t300":
							{
								"type"       :"close",
								"lemma"      :"Marcel",
								"text"       :"Marcel",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e18"
							},
						 	"t301":
							{
								"type"       :"close",
								"lemma"      :"Duchamp",
								"text"       :"Duchamp",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e18"
							},
						 	"t302":
							{
								"type"       :"close",
								"lemma"      :"around",
								"text"       :"around",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t303":
							{
								"type"       :"close",
								"lemma"      :"1913",
								"text"       :"1913",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t304":
							{
								"type"       :"close",
								"lemma"      :"to",
								"text"       :"to",
								"pos"        :"P",
								"morphofeat" :"TO"
							},
						 	"t305":
							{
								"type"       :"open",
								"lemma"      :"characterize",
								"text"       :"characterize",
								"pos"        :"V",
								"morphofeat" :"VB"
							},
						 	"t306":
							{
								"type"       :"open",
								"lemma"      :"work",
								"text"       :"works",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t307":
							{
								"type"       :"close",
								"lemma"      :"which",
								"text"       :"which",
								"pos"        :"O",
								"morphofeat" :"WDT"
							},
						 	"t308":
							{
								"type"       :"open",
								"lemma"      :"challenge",
								"text"       :"challenge",
								"pos"        :"V",
								"morphofeat" :"VBP"
							},
						 	"t309":
							{
								"type"       :"open",
								"lemma"      :"accepted",
								"text"       :"accepted",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t310":
							{
								"type"       :"open",
								"lemma"      :"definition",
								"text"       :"definitions",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t311":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t312":
							{
								"type"       :"open",
								"lemma"      :"art",
								"text"       :"art",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t313":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t314":
							{
								"type"       :"open",
								"lemma"      :"[",
								"text"       :"[",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t315":
							{
								"type"       :"close",
								"lemma"      :"7",
								"text"       :"7",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t316":
							{
								"type"       :"open",
								"lemma"      :"]",
								"text"       :"]",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t317":
							{
								"type"       :"close",
								"lemma"      :"Cubism",
								"text"       :"Cubism",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e19"
							},
						 	"t318":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t319":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t320":
							{
								"type"       :"open",
								"lemma"      :"development",
								"text"       :"development",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t321":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t322":
							{
								"type"       :"open",
								"lemma"      :"collage",
								"text"       :"collage",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t323":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t324":
							{
								"type"       :"open",
								"lemma"      :"abstract",
								"text"       :"abstract",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t325":
							{
								"type"       :"open",
								"lemma"      :"art",
								"text"       :"art",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t326":
							{
								"type"       :"close",
								"lemma"      :"would",
								"text"       :"would",
								"pos"        :"O",
								"morphofeat" :"MD"
							},
						 	"t327":
							{
								"type"       :"open",
								"lemma"      :"inform",
								"text"       :"inform",
								"pos"        :"V",
								"morphofeat" :"VB"
							},
						 	"t328":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t329":
							{
								"type"       :"open",
								"lemma"      :"movement",
								"text"       :"movement",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t330":
							{
								"type"       :"close",
								"lemma"      :"'s",
								"text"       :"'s",
								"pos"        :"O",
								"morphofeat" :"POS"
							},
						 	"t331":
							{
								"type"       :"open",
								"lemma"      :"detachment",
								"text"       :"detachment",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t332":
							{
								"type"       :"close",
								"lemma"      :"from",
								"text"       :"from",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t333":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t334":
							{
								"type"       :"open",
								"lemma"      :"constraint",
								"text"       :"constraints",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t335":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t336":
							{
								"type"       :"open",
								"lemma"      :"reality",
								"text"       :"reality",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t337":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t338":
							{
								"type"       :"open",
								"lemma"      :"convention",
								"text"       :"convention",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t339":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t340":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"The",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t341":
							{
								"type"       :"open",
								"lemma"      :"work",
								"text"       :"work",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t342":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t343":
							{
								"type"       :"open",
								"lemma"      :"french",
								"text"       :"French",
								"pos"        :"G",
								"morphofeat" :"JJ",
								"entity"     :"e20"
							},
						 	"t344":
							{
								"type"       :"open",
								"lemma"      :"poet",
								"text"       :"poets",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t345":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t346":
							{
								"type"       :"open",
								"lemma"      :"italian",
								"text"       :"Italian",
								"pos"        :"G",
								"morphofeat" :"JJ",
								"entity"     :"e21"
							},
						 	"t347":
							{
								"type"       :"open",
								"lemma"      :"futurist",
								"text"       :"Futurists",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t348":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t349":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t350":
							{
								"type"       :"open",
								"lemma"      :"german",
								"text"       :"German",
								"pos"        :"G",
								"morphofeat" :"JJ",
								"entity"     :"e22"
							},
						 	"t351":
							{
								"type"       :"open",
								"lemma"      :"expressionist",
								"text"       :"Expressionists",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t352":
							{
								"type"       :"close",
								"lemma"      :"would",
								"text"       :"would",
								"pos"        :"O",
								"morphofeat" :"MD"
							},
						 	"t353":
							{
								"type"       :"open",
								"lemma"      :"influence",
								"text"       :"influence",
								"pos"        :"V",
								"morphofeat" :"VB"
							},
						 	"t354":
							{
								"type"       :"close",
								"lemma"      :"Dada",
								"text"       :"Dada",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e23"
							},
						 	"t355":
							{
								"type"       :"close",
								"lemma"      :"'s",
								"text"       :"'s",
								"pos"        :"O",
								"morphofeat" :"POS"
							},
						 	"t356":
							{
								"type"       :"open",
								"lemma"      :"rejection",
								"text"       :"rejection",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t357":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t358":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t359":
							{
								"type"       :"open",
								"lemma"      :"tight",
								"text"       :"tight",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t360":
							{
								"type"       :"open",
								"lemma"      :"correlation",
								"text"       :"correlation",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t361":
							{
								"type"       :"close",
								"lemma"      :"between",
								"text"       :"between",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t362":
							{
								"type"       :"open",
								"lemma"      :"word",
								"text"       :"words",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t363":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t364":
							{
								"type"       :"open",
								"lemma"      :"meaning",
								"text"       :"meaning",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t365":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t366":
							{
								"type"       :"open",
								"lemma"      :"[",
								"text"       :"[",
								"pos"        :"V",
								"morphofeat" :"VB"
							},
						 	"t367":
							{
								"type"       :"close",
								"lemma"      :"8",
								"text"       :"8",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t368":
							{
								"type"       :"open",
								"lemma"      :"]",
								"text"       :"]",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t369":
							{
								"type"       :"open",
								"lemma"      :"[",
								"text"       :"[",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t370":
							{
								"type"       :"close",
								"lemma"      :"9",
								"text"       :"9",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t371":
							{
								"type"       :"open",
								"lemma"      :"]",
								"text"       :"]",
								"pos"        :"V",
								"morphofeat" :"VBP"
							},
						 	"t372":
							{
								"type"       :"open",
								"lemma"      :"work",
								"text"       :"Works",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t373":
							{
								"type"       :"open",
								"lemma"      :"such",
								"text"       :"such",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t374":
							{
								"type"       :"close",
								"lemma"      :"as",
								"text"       :"as",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t375":
							{
								"type"       :"close",
								"lemma"      :"Ubu",
								"text"       :"Ubu",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e24"
							},
						 	"t376":
							{
								"type"       :"close",
								"lemma"      :"Roi",
								"text"       :"Roi",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e24"
							},
						 	"t377":
							{
								"type"       :"close",
								"lemma"      :"(",
								"text"       :"(",
								"pos"        :"O",
								"morphofeat" :"("
							},
						 	"t378":
							{
								"type"       :"close",
								"lemma"      :"1896",
								"text"       :"1896",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t379":
							{
								"type"       :"close",
								"lemma"      :")",
								"text"       :")",
								"pos"        :"O",
								"morphofeat" :")"
							},
						 	"t380":
							{
								"type"       :"close",
								"lemma"      :"by",
								"text"       :"by",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t381":
							{
								"type"       :"close",
								"lemma"      :"Alfred",
								"text"       :"Alfred",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e25"
							},
						 	"t382":
							{
								"type"       :"close",
								"lemma"      :"Jarry",
								"text"       :"Jarry",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e25"
							},
						 	"t383":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t384":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t385":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t386":
							{
								"type"       :"open",
								"lemma"      :"ballet",
								"text"       :"ballet",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t387":
							{
								"type"       :"close",
								"lemma"      :"Parade",
								"text"       :"Parade",
								"pos"        :"R",
								"morphofeat" :"NNP"
							},
						 	"t388":
							{
								"type"       :"close",
								"lemma"      :"(",
								"text"       :"(",
								"pos"        :"O",
								"morphofeat" :"("
							},
						 	"t389":
							{
								"type"       :"close",
								"lemma"      :"1916",
								"text"       :"1916",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t390":
							{
								"type"       :"open",
								"lemma"      :"–",
								"text"       :"–",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t391":
							{
								"type"       :"close",
								"lemma"      :"17",
								"text"       :"17",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t392":
							{
								"type"       :"close",
								"lemma"      :")",
								"text"       :")",
								"pos"        :"O",
								"morphofeat" :")"
							},
						 	"t393":
							{
								"type"       :"close",
								"lemma"      :"by",
								"text"       :"by",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t394":
							{
								"type"       :"close",
								"lemma"      :"Erik",
								"text"       :"Erik",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e26"
							},
						 	"t395":
							{
								"type"       :"close",
								"lemma"      :"Satie",
								"text"       :"Satie",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e26"
							},
						 	"t396":
							{
								"type"       :"close",
								"lemma"      :"would",
								"text"       :"would",
								"pos"        :"O",
								"morphofeat" :"MD"
							},
						 	"t397":
							{
								"type"       :"open",
								"lemma"      :"also",
								"text"       :"also",
								"pos"        :"A",
								"morphofeat" :"RB"
							},
						 	"t398":
							{
								"type"       :"open",
								"lemma"      :"be",
								"text"       :"be",
								"pos"        :"V",
								"morphofeat" :"VB"
							},
						 	"t399":
							{
								"type"       :"open",
								"lemma"      :"characterize",
								"text"       :"characterized",
								"pos"        :"V",
								"morphofeat" :"VBN"
							},
						 	"t400":
							{
								"type"       :"close",
								"lemma"      :"as",
								"text"       :"as",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t401":
							{
								"type"       :"open",
								"lemma"      :"proto-dadaist",
								"text"       :"proto-Dadaist",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t402":
							{
								"type"       :"open",
								"lemma"      :"work",
								"text"       :"works",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t403":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t404":
							{
								"type"       :"close",
								"lemma"      :"[",
								"text"       :"[",
								"pos"        :"O",
								"morphofeat" :"SYM"
							},
						 	"t405":
							{
								"type"       :"close",
								"lemma"      :"10",
								"text"       :"10",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t406":
							{
								"type"       :"open",
								"lemma"      :"]",
								"text"       :"]",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t407":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"The",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t408":
							{
								"type"       :"close",
								"lemma"      :"Dada",
								"text"       :"Dada",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e27"
							},
						 	"t409":
							{
								"type"       :"open",
								"lemma"      :"movement",
								"text"       :"movement",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t410":
							{
								"type"       :"close",
								"lemma"      :"'s",
								"text"       :"'s",
								"pos"        :"O",
								"morphofeat" :"POS"
							},
						 	"t411":
							{
								"type"       :"open",
								"lemma"      :"principle",
								"text"       :"principles",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t412":
							{
								"type"       :"open",
								"lemma"      :"be",
								"text"       :"were",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t413":
							{
								"type"       :"open",
								"lemma"      :"1",
								"text"       :"first",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t414":
							{
								"type"       :"open",
								"lemma"      :"collect",
								"text"       :"collected",
								"pos"        :"V",
								"morphofeat" :"VBN"
							},
						 	"t415":
							{
								"type"       :"close",
								"lemma"      :"in",
								"text"       :"in",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t416":
							{
								"type"       :"close",
								"lemma"      :"Hugo",
								"text"       :"Hugo",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e28"
							},
						 	"t417":
							{
								"type"       :"close",
								"lemma"      :"Ball",
								"text"       :"Ball",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e28"
							},
						 	"t418":
							{
								"type"       :"close",
								"lemma"      :"'s",
								"text"       :"'s",
								"pos"        :"O",
								"morphofeat" :"POS"
							},
						 	"t419":
							{
								"type"       :"close",
								"lemma"      :"Dada",
								"text"       :"Dada",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e29"
							},
						 	"t420":
							{
								"type"       :"close",
								"lemma"      :"Manifesto",
								"text"       :"Manifesto",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e29"
							},
						 	"t421":
							{
								"type"       :"close",
								"lemma"      :"in",
								"text"       :"in",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t422":
							{
								"type"       :"close",
								"lemma"      :"1916",
								"text"       :"1916",
								"pos"        :"O",
								"morphofeat" :"CD"
							},
						 	"t423":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t424":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"The",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t425":
							{
								"type"       :"close",
								"lemma"      :"Dadaist",
								"text"       :"Dadaist",
								"pos"        :"R",
								"morphofeat" :"NNP"
							},
						 	"t426":
							{
								"type"       :"open",
								"lemma"      :"movement",
								"text"       :"movement",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t427":
							{
								"type"       :"open",
								"lemma"      :"include",
								"text"       :"included",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t428":
							{
								"type"       :"open",
								"lemma"      :"public",
								"text"       :"public",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t429":
							{
								"type"       :"open",
								"lemma"      :"gathering",
								"text"       :"gatherings",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t430":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t431":
							{
								"type"       :"open",
								"lemma"      :"demonstration",
								"text"       :"demonstrations",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t432":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t433":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t434":
							{
								"type"       :"open",
								"lemma"      :"publication",
								"text"       :"publication",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t435":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t436":
							{
								"type"       :"open",
								"lemma"      :"art",
								"text"       :"art",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t437":
							{
								"type"       :"open",
								"lemma"      :"/",
								"text"       :"/",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t438":
							{
								"type"       :"open",
								"lemma"      :"literary",
								"text"       :"literary",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t439":
							{
								"type"       :"open",
								"lemma"      :"journal",
								"text"       :"journals",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t440":
							{
								"type"       :"close",
								"lemma"      :";",
								"text"       :";",
								"pos"        :"O",
								"morphofeat" :":"
							},
						 	"t441":
							{
								"type"       :"open",
								"lemma"      :"passionate",
								"text"       :"passionate",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t442":
							{
								"type"       :"open",
								"lemma"      :"coverage",
								"text"       :"coverage",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t443":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t444":
							{
								"type"       :"open",
								"lemma"      :"art",
								"text"       :"art",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t445":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t446":
							{
								"type"       :"open",
								"lemma"      :"politics",
								"text"       :"politics",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t447":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t448":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t449":
							{
								"type"       :"open",
								"lemma"      :"culture",
								"text"       :"culture",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t450":
							{
								"type"       :"open",
								"lemma"      :"be",
								"text"       :"were",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t451":
							{
								"type"       :"open",
								"lemma"      :"topic",
								"text"       :"topics",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t452":
							{
								"type"       :"open",
								"lemma"      :"often",
								"text"       :"often",
								"pos"        :"A",
								"morphofeat" :"RB"
							},
						 	"t453":
							{
								"type"       :"open",
								"lemma"      :"discuss",
								"text"       :"discussed",
								"pos"        :"V",
								"morphofeat" :"VBN"
							},
						 	"t454":
							{
								"type"       :"close",
								"lemma"      :"in",
								"text"       :"in",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t455":
							{
								"type"       :"close",
								"lemma"      :"a",
								"text"       :"a",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t456":
							{
								"type"       :"open",
								"lemma"      :"variety",
								"text"       :"variety",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t457":
							{
								"type"       :"close",
								"lemma"      :"of",
								"text"       :"of",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t458":
							{
								"type"       :"open",
								"lemma"      :"medium",
								"text"       :"media",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t459":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t460":
							{
								"type"       :"open",
								"lemma"      :"key",
								"text"       :"Key",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t461":
							{
								"type"       :"open",
								"lemma"      :"figure",
								"text"       :"figures",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t462":
							{
								"type"       :"close",
								"lemma"      :"in",
								"text"       :"in",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t463":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t464":
							{
								"type"       :"open",
								"lemma"      :"movement",
								"text"       :"movement",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t465":
							{
								"type"       :"open",
								"lemma"      :"include",
								"text"       :"included",
								"pos"        :"V",
								"morphofeat" :"VBD"
							},
						 	"t466":
							{
								"type"       :"close",
								"lemma"      :"Hugo",
								"text"       :"Hugo",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e30"
							},
						 	"t467":
							{
								"type"       :"close",
								"lemma"      :"Ball",
								"text"       :"Ball",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e30"
							},
						 	"t468":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t469":
							{
								"type"       :"close",
								"lemma"      :"Marcel",
								"text"       :"Marcel",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e31"
							},
						 	"t470":
							{
								"type"       :"close",
								"lemma"      :"Duchamp",
								"text"       :"Duchamp",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e31"
							},
						 	"t471":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t472":
							{
								"type"       :"close",
								"lemma"      :"Emmy",
								"text"       :"Emmy",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e32"
							},
						 	"t473":
							{
								"type"       :"close",
								"lemma"      :"hennings",
								"text"       :"Hennings",
								"pos"        :"R",
								"morphofeat" :"NNPS",
								"entity"     :"e32"
							},
						 	"t474":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t475":
							{
								"type"       :"close",
								"lemma"      :"hans",
								"text"       :"Hans",
								"pos"        :"R",
								"morphofeat" :"NNPS",
								"entity"     :"e33"
							},
						 	"t476":
							{
								"type"       :"close",
								"lemma"      :"Arp",
								"text"       :"Arp",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e33"
							},
						 	"t477":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t478":
							{
								"type"       :"close",
								"lemma"      :"Raoul",
								"text"       :"Raoul",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e34"
							},
						 	"t479":
							{
								"type"       :"close",
								"lemma"      :"Hausmann",
								"text"       :"Hausmann",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e34"
							},
						 	"t480":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t481":
							{
								"type"       :"close",
								"lemma"      :"Hannah",
								"text"       :"Hannah",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e35"
							},
						 	"t482":
							{
								"type"       :"close",
								"lemma"      :"Höch",
								"text"       :"Höch",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e35"
							},
						 	"t483":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t484":
							{
								"type"       :"close",
								"lemma"      :"Johannes",
								"text"       :"Johannes",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e36"
							},
						 	"t485":
							{
								"type"       :"close",
								"lemma"      :"Baader",
								"text"       :"Baader",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e36"
							},
						 	"t486":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t487":
							{
								"type"       :"close",
								"lemma"      :"Tristan",
								"text"       :"Tristan",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e37"
							},
						 	"t488":
							{
								"type"       :"close",
								"lemma"      :"Tzara",
								"text"       :"Tzara",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e37"
							},
						 	"t489":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t490":
							{
								"type"       :"close",
								"lemma"      :"Francis",
								"text"       :"Francis",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e38"
							},
						 	"t491":
							{
								"type"       :"close",
								"lemma"      :"Picabia",
								"text"       :"Picabia",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e38"
							},
						 	"t492":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t493":
							{
								"type"       :"close",
								"lemma"      :"Huelsenbeck",
								"text"       :"Huelsenbeck",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e39"
							},
						 	"t494":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t495":
							{
								"type"       :"close",
								"lemma"      :"George",
								"text"       :"George",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e40"
							},
						 	"t496":
							{
								"type"       :"close",
								"lemma"      :"Grosz",
								"text"       :"Grosz",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e40"
							},
						 	"t497":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t498":
							{
								"type"       :"close",
								"lemma"      :"John",
								"text"       :"John",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e41"
							},
						 	"t499":
							{
								"type"       :"close",
								"lemma"      :"Heartfield",
								"text"       :"Heartfield",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e41"
							},
						 	"t500":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t501":
							{
								"type"       :"close",
								"lemma"      :"Man",
								"text"       :"Man",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e42"
							},
						 	"t502":
							{
								"type"       :"close",
								"lemma"      :"Ray",
								"text"       :"Ray",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e42"
							},
						 	"t503":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t504":
							{
								"type"       :"close",
								"lemma"      :"Beatrice",
								"text"       :"Beatrice",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e43"
							},
						 	"t505":
							{
								"type"       :"close",
								"lemma"      :"Wood",
								"text"       :"Wood",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e43"
							},
						 	"t506":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t507":
							{
								"type"       :"close",
								"lemma"      :"Kurt",
								"text"       :"Kurt",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e44"
							},
						 	"t508":
							{
								"type"       :"close",
								"lemma"      :"schwitters",
								"text"       :"Schwitters",
								"pos"        :"R",
								"morphofeat" :"NNPS",
								"entity"     :"e44"
							},
						 	"t509":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t510":
							{
								"type"       :"close",
								"lemma"      :"hans",
								"text"       :"Hans",
								"pos"        :"R",
								"morphofeat" :"NNPS",
								"entity"     :"e45"
							},
						 	"t511":
							{
								"type"       :"close",
								"lemma"      :"Richter",
								"text"       :"Richter",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e45"
							},
						 	"t512":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t513":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t514":
							{
								"type"       :"close",
								"lemma"      :"Max",
								"text"       :"Max",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e46"
							},
						 	"t515":
							{
								"type"       :"close",
								"lemma"      :"Ernst",
								"text"       :"Ernst",
								"pos"        :"R",
								"morphofeat" :"NNP",
								"entity"     :"e46"
							},
						 	"t516":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t517":
							{
								"type"       :"close",
								"lemma"      :"among",
								"text"       :"among",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t518":
							{
								"type"       :"open",
								"lemma"      :"other",
								"text"       :"others",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t519":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							},
						 	"t520":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"The",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t521":
							{
								"type"       :"open",
								"lemma"      :"movement",
								"text"       :"movement",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t522":
							{
								"type"       :"open",
								"lemma"      :"influence",
								"text"       :"influenced",
								"pos"        :"V",
								"morphofeat" :"VBN"
							},
						 	"t523":
							{
								"type"       :"open",
								"lemma"      :"later",
								"text"       :"later",
								"pos"        :"A",
								"morphofeat" :"RB"
							},
						 	"t524":
							{
								"type"       :"open",
								"lemma"      :"style",
								"text"       :"styles",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t525":
							{
								"type"       :"close",
								"lemma"      :"like",
								"text"       :"like",
								"pos"        :"P",
								"morphofeat" :"IN"
							},
						 	"t526":
							{
								"type"       :"close",
								"lemma"      :"the",
								"text"       :"the",
								"pos"        :"D",
								"morphofeat" :"DT"
							},
						 	"t527":
							{
								"type"       :"open",
								"lemma"      :"avantgarde",
								"text"       :"avant-garde",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t528":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t529":
							{
								"type"       :"open",
								"lemma"      :"downtown",
								"text"       :"downtown",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t530":
							{
								"type"       :"open",
								"lemma"      :"music",
								"text"       :"music",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t531":
							{
								"type"       :"open",
								"lemma"      :"movement",
								"text"       :"movements",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t532":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t533":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t534":
							{
								"type"       :"open",
								"lemma"      :"group",
								"text"       :"groups",
								"pos"        :"N",
								"morphofeat" :"NNS"
							},
						 	"t535":
							{
								"type"       :"open",
								"lemma"      :"include",
								"text"       :"including",
								"pos"        :"V",
								"morphofeat" :"VBG"
							},
						 	"t536":
							{
								"type"       :"open",
								"lemma"      :"surrealism",
								"text"       :"surrealism",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t537":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t538":
							{
								"type"       :"open",
								"lemma"      :"nouveau",
								"text"       :"nouveau",
								"pos"        :"G",
								"morphofeat" :"JJ"
							},
						 	"t539":
							{
								"type"       :"open",
								"lemma"      :"réalisme",
								"text"       :"réalisme",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t540":
							{
								"type"       :"close",
								"lemma"      :",",
								"text"       :",",
								"pos"        :"O",
								"morphofeat" :","
							},
						 	"t541":
							{
								"type"       :"open",
								"lemma"      :"pop",
								"text"       :"pop",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t542":
							{
								"type"       :"open",
								"lemma"      :"art",
								"text"       :"art",
								"pos"        :"N",
								"morphofeat" :"NN"
							},
						 	"t543":
							{
								"type"       :"close",
								"lemma"      :"and",
								"text"       :"and",
								"pos"        :"C",
								"morphofeat" :"CC"
							},
						 	"t544":
							{
								"type"       :"close",
								"lemma"      :"Fluxus",
								"text"       :"Fluxus",
								"pos"        :"R",
								"morphofeat" :"NNP"
							},
						 	"t545":
							{
								"type"       :"close",
								"lemma"      :".",
								"text"       :".",
								"pos"        :"O",
								"morphofeat" :"."
							}},
							"entities"    : {
						 	"e1":
							{
								"type"     :"PER",
								"text"     :"Dada",
								"reference":"",
								"resource" :"",
								"terms"    :["t1"]
							},
						 	"e2":
							{
								"type"     :"MISC",
								"text"     :"European",
								"reference":"",
								"resource" :"",
								"terms"    :["t15"]
							},
						 	"e3":
							{
								"type"     :"LOC",
								"text"     :"Zürich",
								"reference":"",
								"resource" :"",
								"terms"    :["t27"]
							},
						 	"e4":
							{
								"type"     :"LOC",
								"text"     :"Switzerland",
								"reference":"",
								"resource" :"",
								"terms"    :["t29"]
							},
						 	"e5":
							{
								"type"     :"MISC",
								"text"     :"Cabaret Voltaire",
								"reference":"",
								"resource" :"",
								"terms"    :["t32","t33"]
							},
						 	"e6":
							{
								"type"     :"ORG",
								"text"     :"New York Dada",
								"reference":"",
								"resource" :"",
								"terms"    :["t39","t40","t41"]
							},
						 	"e7":
							{
								"type"     :"LOC",
								"text"     :"Paris",
								"reference":"",
								"resource" :"",
								"terms"    :["t55"]
							},
						 	"e8":
							{
								"type"     :"MISC",
								"text"     :"World War",
								"reference":"",
								"resource" :"",
								"terms"    :["t61","t62"]
							},
						 	"e9":
							{
								"type"     :"LOC",
								"text"     :"Dada",
								"reference":"",
								"resource" :"",
								"terms"    :["t66"]
							},
						 	"e10":
							{
								"type"     :"LOC",
								"text"     :"Dada",
								"reference":"",
								"resource" :"",
								"terms"    :["t166"]
							},
						 	"e11":
							{
								"type"     :"PER",
								"text"     :"Tristan Tzara",
								"reference":"",
								"resource" :"",
								"terms"    :["t168","t169"]
							},
						 	"e12":
							{
								"type"     :"LOC",
								"text"     :"Zürich",
								"reference":"",
								"resource" :"",
								"terms"    :["t171"]
							},
						 	"e13":
							{
								"type"     :"MISC",
								"text"     :"Austrian",
								"reference":"",
								"resource" :"",
								"terms"    :["t193"]
							},
						 	"e14":
							{
								"type"     :"PER",
								"text"     :"Richard Huelsenbeck",
								"reference":"",
								"resource" :"",
								"terms"    :["t195","t196"]
							},
						 	"e15":
							{
								"type"     :"MISC",
								"text"     :"French",
								"reference":"",
								"resource" :"",
								"terms"    :["t214"]
							},
						 	"e16":
							{
								"type"     :"LOC",
								"text"     :"Dada",
								"reference":"",
								"resource" :"",
								"terms"    :["t282"]
							},
						 	"e17":
							{
								"type"     :"LOC",
								"text"     :"Dada",
								"reference":"",
								"resource" :"",
								"terms"    :["t295"]
							},
						 	"e18":
							{
								"type"     :"PER",
								"text"     :"Marcel Duchamp",
								"reference":"",
								"resource" :"",
								"terms"    :["t300","t301"]
							},
						 	"e19":
							{
								"type"     :"PER",
								"text"     :"Cubism",
								"reference":"",
								"resource" :"",
								"terms"    :["t317"]
							},
						 	"e20":
							{
								"type"     :"MISC",
								"text"     :"French",
								"reference":"",
								"resource" :"",
								"terms"    :["t343"]
							},
						 	"e21":
							{
								"type"     :"MISC",
								"text"     :"Italian",
								"reference":"",
								"resource" :"",
								"terms"    :["t346"]
							},
						 	"e22":
							{
								"type"     :"MISC",
								"text"     :"German",
								"reference":"",
								"resource" :"",
								"terms"    :["t350"]
							},
						 	"e23":
							{
								"type"     :"LOC",
								"text"     :"Dada",
								"reference":"",
								"resource" :"",
								"terms"    :["t354"]
							},
						 	"e24":
							{
								"type"     :"PER",
								"text"     :"Ubu Roi",
								"reference":"",
								"resource" :"",
								"terms"    :["t375","t376"]
							},
						 	"e25":
							{
								"type"     :"PER",
								"text"     :"Alfred Jarry",
								"reference":"",
								"resource" :"",
								"terms"    :["t381","t382"]
							},
						 	"e26":
							{
								"type"     :"PER",
								"text"     :"Erik Satie",
								"reference":"",
								"resource" :"",
								"terms"    :["t394","t395"]
							},
						 	"e27":
							{
								"type"     :"LOC",
								"text"     :"Dada",
								"reference":"",
								"resource" :"",
								"terms"    :["t408"]
							},
						 	"e28":
							{
								"type"     :"LOC",
								"text"     :"Hugo Ball",
								"reference":"",
								"resource" :"",
								"terms"    :["t416","t417"]
							},
						 	"e29":
							{
								"type"     :"LOC",
								"text"     :"Dada Manifesto",
								"reference":"",
								"resource" :"",
								"terms"    :["t419","t420"]
							},
						 	"e30":
							{
								"type"     :"LOC",
								"text"     :"Hugo Ball",
								"reference":"",
								"resource" :"",
								"terms"    :["t466","t467"]
							},
						 	"e31":
							{
								"type"     :"PER",
								"text"     :"Marcel Duchamp",
								"reference":"",
								"resource" :"",
								"terms"    :["t469","t470"]
							},
						 	"e32":
							{
								"type"     :"PER",
								"text"     :"Emmy Hennings",
								"reference":"",
								"resource" :"",
								"terms"    :["t472","t473"]
							},
						 	"e33":
							{
								"type"     :"PER",
								"text"     :"Hans Arp",
								"reference":"",
								"resource" :"",
								"terms"    :["t475","t476"]
							},
						 	"e34":
							{
								"type"     :"PER",
								"text"     :"Raoul Hausmann",
								"reference":"",
								"resource" :"",
								"terms"    :["t478","t479"]
							},
						 	"e35":
							{
								"type"     :"PER",
								"text"     :"Hannah Höch",
								"reference":"",
								"resource" :"",
								"terms"    :["t481","t482"]
							},
						 	"e36":
							{
								"type"     :"PER",
								"text"     :"Johannes Baader",
								"reference":"",
								"resource" :"",
								"terms"    :["t484","t485"]
							},
						 	"e37":
							{
								"type"     :"PER",
								"text"     :"Tristan Tzara",
								"reference":"",
								"resource" :"",
								"terms"    :["t487","t488"]
							},
						 	"e38":
							{
								"type"     :"PER",
								"text"     :"Francis Picabia",
								"reference":"",
								"resource" :"",
								"terms"    :["t490","t491"]
							},
						 	"e39":
							{
								"type"     :"PER",
								"text"     :"Huelsenbeck",
								"reference":"",
								"resource" :"",
								"terms"    :["t493"]
							},
						 	"e40":
							{
								"type"     :"PER",
								"text"     :"George Grosz",
								"reference":"",
								"resource" :"",
								"terms"    :["t495","t496"]
							},
						 	"e41":
							{
								"type"     :"PER",
								"text"     :"John Heartfield",
								"reference":"",
								"resource" :"",
								"terms"    :["t498","t499"]
							},
						 	"e42":
							{
								"type"     :"PER",
								"text"     :"Man Ray",
								"reference":"",
								"resource" :"",
								"terms"    :["t501","t502"]
							},
						 	"e43":
							{
								"type"     :"PER",
								"text"     :"Beatrice Wood",
								"reference":"",
								"resource" :"",
								"terms"    :["t504","t505"]
							},
						 	"e44":
							{
								"type"     :"PER",
								"text"     :"Kurt Schwitters",
								"reference":"",
								"resource" :"",
								"terms"    :["t507","t508"]
							},
						 	"e45":
							{
								"type"     :"PER",
								"text"     :"Hans Richter",
								"reference":"",
								"resource" :"",
								"terms"    :["t510","t511"]
							},
						 	"e46":
							{
								"type"     :"PER",
								"text"     :"Max Ernst",
								"reference":"",
								"resource" :"",
								"terms"    :["t514","t515"]
							}},
							
							"lp"        : [
						{
							"name"     :"opener-sentence-splitter-en",
							"timestamp":"2017-10-24T19:06:51Z",
							"version"  :"0.0.1",
							"layer"    :"text"
						},
						{
							"name"     :"opener-tokenizer-en",
							"timestamp":"2017-10-24T19:06:51Z",
							"version"  :"1.0.1",
							"layer"    :"text"
						},
						{
							"name"     :"ehu-pos-en",
							"timestamp":"2017-10-24T19:06:52+0000",
							"version"  :"1.0",
							"layer"    :"terms"
						},
						{
							"name"     :"ehu-parse-en",
							"timestamp":"now",
							"version"  :"1.0",
							"layer"    :"constituents"
						},
						{
							"name"     :"ixa-pipe-nerc-en-default",
							"timestamp":"2017-10-24T19:06:56+0000",
							"version"  :"1.5.2",
							"layer"    :"entities"
						}]
						}</code>`);
});