var welcomeJson = JSON.stringify({
	"WhatsUp": "E",
}, "", 4);

var welcomeTour = { 
	"heading": "Welcome",
	"text": `
	<p>
		Welcome to a tour of the Relapse validation language.
	</p>
	<p>
		The tour is interactive, so when typing in the textboxes Relapse will compile and try to validate the input.
		This will result in the display of a green bar for valid, orange bar for invalid and red bar for a syntax or other error.
	</p>
	<p>
		The examples in the tour are meant to be a walk through of all the features of Relapse.
		Running through the tour should allow you to start writing your own validating expressions.
	</p>
	<p>
		This example is validating the JSON to see whether the WhatsUp field is really equal to the string E.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Change the E on the left hand side to Evolution.  You should see the bar become orange.  This indicates that the WhatsUp field in the JSON IS NOT equal to Evolution.
			</li>
			<li>
				Change the E in the JSON the right hand side to Evolution.  You should see the bar become green.  This indicates that the WhatsUp field in the JSON IS equal to Evolution.
			</li>
			<li>
				Change the Evolution on the left hand side back to E, but also change the == to ^= (which indicates has prefix). The bar should become green, indicating that the WhatsUp field in the JSON has a prefix of E.
			</li>
		</ol>
	</p>
	`,
	"relapse": `WhatsUp == "E"`, 
	"input": welcomeJson
}

var stringFieldsJson = JSON.stringify({
	"WhatsUp": "Evolution",
}, "", 4);

var stringFieldsTour = { 
	"heading": "Validating String Fields",
	"text": `
	<p>
		There are a couple of built in functions for validating strings with special shorthands.
		The block comments /* */ should help to clarify what each of the shorthands stand for.
	</p>
	<p>
		The ampersand & is used the indicate <b>and</b>, which will be discussed later, but it should be quite clear.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Change the Evolution string in the JSON text box on the right to Bevolution.  The bar should now be orange.
			</li>
			<li>
				Remove the equal, has prefix and regular expression lines on the right.  The bar should green again.
			</li>
			<li>
				Add your own expression that makes the bar orange again.  Maybe something like WhatsUp contains Bees.
			</li>
		</ol>
	</p>
	`,
	"relapse": `(
	WhatsUp == "Evolution" /*equal*/ &
	WhatsUp ^= "Evo" /*has prefix*/ &
	WhatsUp *= "volutio" /*contains*/ &
	WhatsUp $= "tion" /*has suffix*/ &
	WhatsUp != "Hello World" /*not equal*/ &
	WhatsUp ~= "^Evo.*tion$" /*matches regular expression*/ &
	WhatsUp :: $string /*type of*/
)`, 
	"input": stringFieldsJson
}

var numberFieldsJson = JSON.stringify({
	"Survived": 100000000,
}, "", 4);

var numberFieldsTour = { 
	"heading": "Validating Number Fields",
	"text": `
	<p>
		There are a couple of built in functions for validating numbers with special shorthands.
		You should know most of these comparotors from math, but the rest are explained using block comments.
	</p>
	<p>
		The ampersand & is used the indicate <b>and</b>, which will be discussed later, but it should be quite clear.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Change the Survived field's value in the right hand side JSON to a negative number bigger than -2016.  The bar should be orange.
			</li>
			<li>
				Remove the lines $uint, > and ==.  The bar should be green.
			</li>
			<li>
				Change the Survived field's value in the right hand side JSON to a floating point number like 0.1.  The bar should be orange.
			</li>
			<li>
				Change the $int to $double.  The bar should become green, but it is still orange.
			</li>
			<li>
				Relapse infers all the numbers as integers.  So lets make it clear that they are doubles, by rapping them in double enclosed brackets.
				For example Survived >= double(-2016).  The bar should become green.
			</li>
		</ol>
	</p>
	`,
	"relapse": `(
	Survived > 999999 &
	Survived >= -2016 &
	Survived == 1000000 &
	Survived <= 1000000 &
	Survived < 100000000 &
	Survived :: $uint /*type of uint*/ &
	Survived :: $int /*type of int*/
)`, 
	"input": numberFieldsJson
}

var workInProgressTour = { 
	"heading": "Work in Progress",
	"text": `
	`,
	"relapse": ``, 
	"input": ``
}


var tours = [
	welcomeTour,
	stringFieldsTour,
	numberFieldsTour,
	workInProgressTour
]

function tourinit() {
	var mode = "json";
	var katydidCodeMirror = CodeMirror(document.getElementById("lefttextarea"), {
  		mode:  "katydidmode",
  		value: 'loading...',
  		viewportMargin: Infinity
	});
	var codeMirrors = {"katydid": katydidCodeMirror};
	var inputCodeMirror = CodeMirror(document.getElementById("righttextarea"), {
  		mode:  {name: "javascript", json: true},
  		value: 'loading...',
  		viewportMargin: Infinity
	});
	codeMirrors[mode] = inputCodeMirror;
	$("#mode" + mode).addClass("active");
	$("#inputheading").text(mode + " input");

	$("#validateButton").click(function(ev) { 
		ev.preventDefault();
		validateCode(mode, codeMirrors);
	});

	setHeightDefault();
	$("#autosizeButton").click(function(ev) {
		ev.preventDefault();
		wasChecked = $("#autosizeButton").hasClass("active");
		if (wasChecked) {
			$("#autosizeButton").removeClass("active");
			setHeightDefault();
		} else {
			$("#autosizeButton").addClass("active");
			setHeightAuto();
		}
	});

	for (var key in codeMirrors) {
		codeMirrors[key].on('keyup', function(instance, event) {
    		validateCode(mode, codeMirrors);
		});		
	}

	var tourNumber = parseInt(getUrlParameter("tour"));
	if (isNaN(tourNumber)) {
		tourNumber = 0;
	}
	var tour = tours[tourNumber];
	$("#tourheading").text(tour.heading);
	document.getElementById("tourtext").innerHTML = tour["text"];
	document.getElementById("tourprogress").setAttribute("style", `width: ` + (tourNumber+1)*100/tours.length + `%;`);
	codeMirrors["katydid"].setValue(tour["relapse"]);
	codeMirrors["json"].setValue(tour["input"]);
	if ((tourNumber+1) < tours.length) {
		document.getElementById("nextref").setAttribute("href", "./index.html?tour="+(tourNumber+1));
	} else {
		document.getElementById("nextButton").style.visibility = "hidden";
	}
}
