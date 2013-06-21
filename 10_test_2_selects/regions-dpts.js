regions = {
1: "Alsace",
2: "Picardie",
3: "Midi Pyrénées"
};

departements = {
1: '{"name":"Ain","region":0}',
2: '{"name":"Aisne","region":2}',
9: '{"name":"Ariège","region":3}',
12: '{"name":"Aveyron","region":3}',
31: '{"name":"Haute-Garonne","region":3}',
32: '{"name":"Gers","region":3}',
47: '{"name":"Lot-et-Garonne","region":3}',
60: '{"name":"Oise","region":2}',
65: '{"name":"Hautes-Pyrénées","region":3}',
67: '{"name":"Bas-Rhin","region":1}',
68: '{"name":"Haut-Rhin","region":1}',
80: '{"name":"Somme","region":2}',
81: '{"name":"Tarn","region":3}',
82: '{"name":"Tarn-et-Garonne","region":3}'
};

departementsOld = {
1: "Ain",
2: "Aisne",
3: "Allier",
4: "Alpes de Hautes-Provence",
5: "Hautes-Alpes",
6: "Alpes-Maritimes",
7: "Ardèche",
8: "Ardennes",
9: "Ariège",
10: "Aube",
11: "Aude",
12: "Aveyron",
13: "Bouches-du-Rhône",
14: "Calvados",
15: "Cantal",
16: "Charente",
17: "Charente-Maritime",
18: "Cher",
19: "Corrèze",
"2A": "Corse-du-Sud",
"2B": "Haute-Corse",
21: "Côte-d'Or",
22: "Côtes d'Armor",
23: "Creuse",
24: "Dordogne",
25: "Doubs",
26: "Drôme",
27: "Eure",
28: "Eure-et-Loir",
29: "Finistère",
30: "Gard",
31: "Haute-Garonne",
32: "Gers",
33: "Gironde",
34: "Hérault",
35: "Ille-et-Vilaine",
36: "Indre",
37: "Indre-et-Loire",
38: "Isère",
39: "Jura",
40: "Landes",
41: "Loir-et-Cher",
42: "Loire",
43: "Haute-Loire",
44: "Loire-Atlantique",
45: "Loiret",
46: "Lot",
47: "Lot-et-Garonne",
48: "Lozère",
49: "Maine-et-Loire",
50: "Manche",
51: "Marne",
52: "Haute-Marne",
53: "Mayenne",
54: "Meurthe-et-Moselle",
55: "Meuse",
56: "Morbihan",
57: "Moselle",
58: "Nièvre",
59: "Nord",
60: "Oise",
61: "Orne",
62: "Pas-de-Calais",
63: "Puy-de-Dôme",
64: "Pyrénées-Atlantiques",
65: "Hautes-Pyrénées",
66: "Pyrénées-Orientales",
67: "Bas-Rhin",
68: "Haut-Rhin",
69: "Rhône",
70: "Haute-Saône",
71: "Saône-et-Loire",
72: "Sarthe",
73: "Savoie",
74: "Haute-Savoie",
75: "Paris",
76: "Seine-Maritime",
77: "Seine-et-Marne",
78: "Yvelines",
79: "Deux-Sèvres",
80: "Somme",
81: "Tarn",
82: "Tarn-et-Garonne",
83: "Var",
84: "Vaucluse",
85: "Vendée",
86: "Vienne",
87: "Haute-Vienne",
88: "Vosges",
89: "Yonne",
90: "Territoire-de-Belfort",
91: "Essonne",
92: "Hauts-de-Seine",
93: "Seine-Saint-Denis",
94: "Val-de-Marne",
95: "Val-d'Oise"
};

function resetRegions() {
	$("#regions").html("<option>Choisir une région</option>");
	for (key in regions) {
		// Not safe against XSS 
		// $('#regions').append('<option value="' + key + '">' + regions[key] + '</option>');
		// More secured version
		$('#regions').append($(document.createElement("option")).attr("value",key).text(regions[key])); 
	}
}

function resetDepartements(selectedRegion) {
	console.log("Resetting for selected region:" + selectedRegion);
	$("#departements").html("<option>Choisir un département</option>");
	for (key in departements) {
	    dpt = $.parseJSON(departements[key]);
		console.log(dpt);
		if (selectedRegion != null && selectedRegion == dpt.region) {
			$('#departements').append($(document.createElement("option")).attr("value",key).text(dpt.name)); 
		} else {
			console.log("Selected region: " + selectedRegion + " is != " + dpt.region);
		}
	}
}

$(document).ready(function() {

	resetRegions();
	resetDepartements(null);
	
	$("#regions").change(function() {
		var region = $(this).val();
		resetDepartements(region);
	}).trigger('change');
	
});