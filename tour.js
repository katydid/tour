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
		The examples in the tour are meant to do a walk through most of the features of Relapse.
		Running through the tour should allow you to start writing your own validating expressions.
	</p>
	<p>
		This example is validating the JSON to see whether the WhatsUp field is really equal to the string E.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Change the E on the left hand side to Evolution.  You should see the bar become orange.  This indicates that the WhatsUp field in the JSON object <b>is not</b> equal to Evolution.
			</li>
			<li>
				Change the E in the JSON the right hand side to Evolution.  You should see the bar become green.  This indicates that the WhatsUp field in the JSON object <b>is</b> equal to Evolution.
			</li>
			<li>
				Change the Evolution on the left hand side back to E, but also change the == <i>equal operator</i> to the ^= <i>starts with operator</i>. 
				The bar should become green, indicating that the WhatsUp field in the JSON object has a prefix of E.
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
		The ampersand & is used the indicate <b>and</b>, which will be discussed later, but its use here should be quite clear.
	</p>
	<p>
		Relapse allows two specifications of string literals.
		<ul>
			<li>raw - \`with backticks\`</li>
			<li>intepreted - "with double quotes"</li>
		</ul>
		The raw string is started with a backtick, can contain any UTF8 characters and is only terminated by another backtick.
		The intepreted string is contained within double quotes, can contain backslash escaped characters and cannot contain new lines.
		The Relapse <a href="http://katydid.github.io/doc/syntax.html">syntax</a> documentation contains more detail on string literals.
	</p>
	<p>
		Field's names can be expressed as a string literal with quotes or backticks.
		If the field's name is basic enough, starts with an alphabet letter and is followed by zero or more letters, numbers of underscores, it does not need any quotes or backticks.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Change the Evolution string in the JSON text box on the right to Bevolution.  The bar should now be orange.
			</li>
			<li>
				Remove the == equal, ^= has prefix and ~= regular expression lines on the right.  The bar should green again.
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
	"WhatsUp" != "Hello World" /*not equal*/ &
	WhatsUp ~= "^Evo.*tion$" /*matches regular expression*/ &
	\`WhatsUp\` :: $string /*type of*/
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
		The ampersand & is used the indicate <b>and</b>, which will be discussed later, but its use here should be quite clear.
	</p>
	<p>
		Relapse is built for multiple serialization formats which can be more specific about number types than JSON can be.
		The number types include:
		<ul>
			<li>$int - Integer</li>
			<li>$uint - Unsigned Integer</li>
			<li>$double - Floating point number</li>
		</ul>
		The JSON parser included in Katydid tries to infer the type of the number.
		All numbers are infered as type $double, but if the number is a whole number it is also of type $int.
		If the number is an unsigned whole number it is of type $double, $int and $uint.
	</p>
	<p>
		Numbers in Relapse can be wrapped in a type to make the type of the number explicit.
		For example:
		<ul>
			<li>int(123)</li>
			<li>uint(456)</li>
			<li>double(789)</li>
		</ul>
		If the type of the number is not explicity specified Relapse tries to infer it.
		A whole number is always infered to be of type $int while a floating point number that is not a whole number is infered to be of type $double.
		The type of $uint can not be infered and should always be specified explicity.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Change the Survived field's value in the right hand side JSON to a negative number bigger than -2016.  The bar should become orange.
			</li>
			<li>
				Remove the lines $uint, > and ==.  The bar should become green.
			</li>
			<li>
				Change the Survived field's value in the JSON object to a floating point number like 0.1.  The bar should be orange.
			</li>
			<li>
				Change the $int to $double.  The bar should become green, but it is still orange.
			</li>
			<li>
				Relapse infers all the whole numbers to be of $int.  So lets make it clear that they are doubles, by wrapping them in double enclosed brackets.
				For example Survived >= double(-2016).  The bar should become green.
			</li>
		</ol>
	</p>
	`,
	"relapse": `(
	Survived > 999999 &
	Survived >= -2016 &
	Survived == int(1000000) &
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
	$("#inputheading").text(mode);

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
