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
		After running through the tour you should be able to start writing your own validating expressions.
	</p>
	<p>
		This example is validating the JSON to see whether the WhatsUp field is really equal to the string E.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Change the <code>E</code> in the expression textbox, on the left, to <code>Evolution</code>.  The bar should become orange.  This indicates that the WhatsUp field in the JSON object <b>is not</b> equal to Evolution.
			</li>
			<li>
				Change the <code>E</code> in the json textbox, on the right, to <code>Evolution</code>.  The bar should become green.  This indicates that the WhatsUp field in the JSON object <b>is</b> equal to Evolution.
			</li>
			<li>
				Change the <code>Evolution</code> string in the expression textbox back to <code>E</code>, but also change the <code>==</code> <i>equal operator</i> to the <code>^=</code> <i>starts with operator</i>. 
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
	"heading": "Strings",
	"text": `
	<p>
		Relapse allows two specifications for string literals.
		<ul>
			<li>raw <code>\`with backticks\`</code></li>
			<li>interpreted <code>"with double quotes"</code></li>
		</ul>
		The raw string is started with a backtick, can contain any UTF8 characters and is only terminated by another backtick.
		The interpreted string is contained within double quotes, can contain backslash escaped characters and cannot contain any new lines.
		The Relapse <a href="http://katydid.github.io/doc/syntax.html">syntax</a> documentation contains more detail on string literals.
	</p>
	<p>
		Fieldnames can be expressed as a string literal with quotes or backticks.
		If the field's name is basic enough, starts with an alphabet letter and is followed by zero or more letters, numbers or underscores, it does not need any quotes or backticks.
	</p>
	<p>
		There are a couple of built in functions for validating strings with special shorthands.
		The block comments <code>/* */</code> should help to clarify what each of the shorthands stand for.
	</p>
	<p>
		The ampersand <code>&amp;</code> is used the indicate <b>and</b>, which will be discussed later, but its use here should be quite clear.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Change the <code>Evolution</code> string in the JSON textbox to <code>Bevolution</code>.  The bar should now be orange.
			</li>
			<li>
				Remove the <code>==</code> equal, <code>^=</code> has prefix and <code>~=</code> regular expression lines in the expression textbox.  The bar should green again.
			</li>
			<li>
				Add your own expression in the expression textbox that makes the bar orange again.  Maybe something like WhatsUp contains Bees.
				Remember to add your own ampersand <code>&amp;</code> operator for your extra expression.
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
	"Survived": 1000000,
}, "", 4);

var numberFieldsTour = { 
	"heading": "Numbers",
	"text": `
	<p>
		Relapse is built for multiple serialization formats which can be more specific about number types than JSON can be.
		The number types include:
		<ul>
			<li>Integer <code>$int</code></li>
			<li>Unsigned integer <code>$uint</code></li>
			<li>Floating point number <code>$double</code></li>
		</ul>
		The JSON parser included in Katydid tries to infer the type of the number.
		All numbers are inferred as type <code>$double</code>, but if the number is a whole number it is also of type <code>$int</code>.
		If the number is an unsigned whole number it is of type <code>$double</code>, <code>$int</code> and <code>$uint</code>.
	</p>
	<p>
		Numbers in Relapse can be wrapped in a type to make the type of the number explicit.
		For example:
		<ul>
			<li><code>int(123)</code></li>
			<li><code>uint(456)</code></li>
			<li><code>double(789)</code></li>
		</ul>
		If the type of the number is not explicitly specified Relapse tries to infer it.
		A whole number is always infered to be of type <code>$int</code> while a floating point number that is not a whole number is infered to be of type <code>$double</code>.
		The type of <code>$uint</code> can not be inferred and should always be specified explicitly.
	</p>
	<p>
		There are a couple of built in functions for validating numbers with special shorthands.
		You should know most of these comparators from math, but the rest are explained using block comments.
	</p>
	<p>
		The ampersand <code>&amp;</code> is used the indicate <b>and</b>, which will be discussed later, but its use here should be quite clear.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Change the Survived field's value in the json textbox to a negative number bigger than <code>-2016</code>.  The bar should become orange.
			</li>
			<li>
				Remove the lines <code>$uint</code>, <code>&gt;</code> and <code>==</code>.  The bar should become green.
			</li>
			<li>
				Change the Survived field's value in the JSON object to a floating point number like <code>0.1</code>.  The bar should be orange.
			</li>
			<li>
				Change the <code>$int</code> to <code>$double</code>.  The bar should become green, but it is still orange.
			</li>
			<li>
				Relapse infers all the whole numbers to be of type int.  So lets make it clear that they are doubles, by wrapping them in double enclosed brackets.
				For example <code>Survived >= double(-2016)</code>.  The bar should become green.
			</li>
			<li>
				Replace the double wrapping with a <code>.0</code>.  This also allows the Relapse parser to infer a number of type double.
				For example <code>Survived >= -2016.0</code>.  The bar should stay green.
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

var boolFieldsJson = JSON.stringify({
	"DragonsExist": false,
}, "", 4);

var booleanTour  = { 
	"heading": "Other Types",
	"text": `
	<p>
	Booleans in Relapse are represented with the two keywords, <code>true</code> and <code>false</code>.
	</p>
	<p>
	Relapse does not only support shorthand operators like <code>==</code>, but also supports more complex functions.
	These complex functions are invoked with the <code>-></code> <i>arrow operator</i>.
	For example <code>== false</code> is equivalent to <code>-> eq($bool, false)</code>.
	This means that the field is of type <code>$bool</code> and is equal to false.
	</p>
	<p>
	Bytes is the last native Relapse type.
	Unfortunately JSON does not have a bytes type, so this tour is not going to cover it in great detail.
	The second field comparison, <code>-> eq(length([]byte{0x1,2,'a'}), 3)</code>, does not even take the field value into account.
	It only checks whether a list of predefined bytes have a length of 3.
	</p>
	<p>
	All these functions are statically typed, but some are overridden with multiple types.
	For example <code>eq</code> can compare any two of the same types.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Change the <code>false</code> boolean in the JSON text box to <code>true</code>.  The bar should become orange.
			</li>
			<li>
				Remove the line containing the ignored field value and change the <code>== false</code> expression to <code>== true</code>.  The bar should stay orange.
			</li>
			<li>
				Finally change the expression <code>-> eq($bool, false)</code> to <code>-> or(eq($bool, false), eq($bool, true))</code>.  The bar should become green.
			</li>
		</ol>
	</p>
	`,
	"relapse": `(
	DragonsExist == false &
	DragonsExist -> eq(length([]byte{0x1,2,'a'}), 3) & // ignores the field value
	DragonsExist -> eq($bool, false)
)`, 
	"input": boolFieldsJson
}

var nameJson = JSON.stringify({
	"DragonsExist": false,
}, "", 4);

var nameTour  = { 
	"heading": "Names",
	"text": `
	<p>
	A fieldname does not just have be an equality comparison.  We have three extra operators:
	<ul>
		<li>or <code>|</code></li>
		<li>not <code>!</code></li>
		<li>any <code>_</code></li>
	</ul>
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Remove <code>DragonsExist</code> from the or.  The bar should become orange.
			</li>
			<li>
				Change the <code>!(_)</code> <i>not any name</i> expression to the <code>_</code> <i>any name</i> expression.  The bar should become green again.
			</li>
			<li>
				Change <code>(MonkeysSmart|_)</code> to <code>!((MonkeysSmart|_))</code>.  The bar should become orange.
				<i>Relapse does not use brackets as a grouping mechanism.  Brackets are paired with their operators.  The <code>!</code> operator will always have brackets and the <code>|</code> operator as well.
				This is why we need two brackets, one for the <code>|</code> and one for the <code>!</code>.</i>
			</li>
		</ol>
	</p>
	`,
	"relapse": `(DragonsExist|MonkeysSmart|!(_)) == false`, 
	"input": nameJson
}

var zanyJson = JSON.stringify({
	"DragonsExist": true,
	"DinosaursAlive": true,
}, "", 4);

var zanyTour = {
	"heading": "*",
	"text": `
	<p>
		The star <code>*</code> character validates zero or more of anything.  This means any structure, list of fields, field value or even an empty structure.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Convince yourself that you cannot change the JSON input to something that is invalid.
				The only way to do that would be to change the JSON to have a syntax error.
			</li>
		</ol>
	</p>
	`,
	"relapse": "*",
	"input": zanyJson,
}

var andOrJson = JSON.stringify({
	"Age": 31,
}, "", 4);

var andOrTour = {
	"heading": "And and Or",
	"text": `
	<p>
		The <code>&amp;</code> <i>And</i> and the <code>|</code> <i>Or</i> operator act as logic operators.
		These operators need to be in parentheses.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Change the value of <code>Age</code> in the JSON textbox to <code>33</code>.  The bar should become orange.
			</li>
			<li>
				Change the <code>&amp;</code> operators to <code>|</code> operators.  The bar should become green.
			</li>
			<li>
				Remove the parentheses.  The bar should become red.
			</li>
			<li>
				Using one name and one value, reproduce the original logic using the <code>and</code>, <code>gt</code>, <code>lt</code> and <code>eq</code> functions as well as the <code>-></code> operator.
			</li>
		</ol>
	</p>
	`,
	"relapse": "(Age > 30 & Age < 32 & Age == 31)",
	"input": andOrJson,
}

var structJson = JSON.stringify({
	"Wish": {
		"Dart": "Poison",
	},
}, "", 4);

var structTour = {
	"heading": "Structures :",
	"text": `
	<p>
		The <code>:</code> infix operator is given name on the left and a value on the right, where a value can be a value, structure, list or any type of children.
		The <code>:</code> operator is not always necessary, for instance with the use of shorthand functions, complex functions and other operators that will be covered later.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Remove the <code>:</code> operator next to the <code>==</code> operator. The bar should stay green, since the colon is redundant.
			</li>
		</ol>
	</p>
	`,
	"relapse": 'Wish: Dart: == "Poison"',
	"input": structJson,
}

var emptyJson = JSON.stringify({
	"Wish": {
		"Dart": "Poison",
	},
}, "", 4);

var emptyTour = {
	"heading": "<empty>",
	"text": `
	<p>
		The <code>&lt;empty&gt;</code> operator is used to indicate a field without a value, like in XML, or a value, since a value does not have any children.
		It can even indicate an empty structure.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				In the JSON textbox, change <code>"Dart": "Poison"</code> to <code>"Dart": { "Poison": {} }</code>.  The bar should stay green.
			</li>
			<li>
				Replace <code>&lt;empty&gt;</code> with <code>*</code>.  The bar should stay green, since <code>*</code> includes <code>&lt;empty&gt;</code>.
			</li>
			<li>
				Change the <code>*</code> back to <code>&lt;empty&gt;</code> and change the empty structure in the JSON on the right to an empty array.  The bar should stay green.
			</li>
			<li>
				Add an element in the array.  The bar should become orange.
			</li>
		</ol>
	</p>
	`,
	"relapse": 'Wish: Dart: Poison: <empty>',
	"input": emptyJson,
}

var concatJson = JSON.stringify({
	"History": [
        "Giant Lizards",
        "Meteor",
        "Lizards Dead",
        "Katydids Alive"
    ],
}, "", 4);

var concatTour = {
	"heading": "Order [,]",
	"text": `
	<p>
		An ordered list can be created using the <code>[</code> <i>open bracket</i>, <code>,</code> <i>comma</i> and <code>]</code> <i>close bracket</i> operators.
		This is also called the Concat operator, since it concatenates two patterns together.
	</p>
	<p>
		When a Katydid parser parses an array it typically returns an array element as an int representing the index with a child representing the value.
		We can ignore the index value using the <code>_</code> operator.  There should always be at least two elements in the ordered list.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Remove the <code>:</code> operator next to the <code>[</code> operator. The bar should stay green, since the colon is redundant.
			</li>
			<li>
				Swap the lines containing the underscores.  The bar should become orange, since the order is not the same as in the JSON.
			</li>
			<li>
				Replace each line that contains underscores with <code>*,</code>.  The bar should become green.
			</li>
			<li>
				Add extra elements in the <code>History</code> array in the JSON textbox.  The bar should become orange if put the new elements at the start of the array.
			</li>
		</ol>
	</p>
	`,
	"relapse": `History: [
	0: == "Giant Lizards",
	_ == "Meteor",
	2:*,
	_: *= "Alive",
]
	`,
	"input": concatJson,
}

var zeroOrMoreJson = JSON.stringify({
	"History": [
        "Giant Lizards",
        "Meteor",
        "Lizards Dead",
        "Katydids Alive"
    ],
}, "", 4);

var zeroOrMoreTour = {
	"heading": "Zero or more ()*",
	"text": `
	<p>
		Placing an expression inside parentheses and adding a <code>*</code> operator as a suffix indicates a zero or more expression.
		This means that you expect this expression to repeat zero or more times.
	</p>
	<p>
		In this example the <code>History</code> field contains an array with zero or more elements, where each element is of type string.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Change <code>_ :: $string</code> to <code>_ *= "Lizards"</code>.  The bar should become orange.
			</li>
			<li>
				Change the JSON by removing all the elements in the array that do not contain the string "Lizards".
				The bar should become green again.
			</li>
			<li>
				Zero or more works well in conjunction with the Concat operator.  So lets change the <code>(_ *= "Lizards")*</code> expression
				to <code>[1 *= "Lizards", (_ *= "Lizards")*]</code>.  The bar should become orange.
			</li>
			<li>
				Change the index of <code>1</code> to a number that makes the bar green again.
			</li>
			<li>
				Add more elements to the array in the JSON, while keeping the bar green.
			</li>
		</ol>
	</p>
	`,
	"relapse": 'History: (_ :: $string)*',
	"input": zeroOrMoreJson,
}

var interleaveJson = JSON.stringify({
	"DragonsExist": false,
    "WhatsUp": "E",
    "MonkeysSmart": true
}, "", 4);

var interleaveTour = {
	"heading": "Interleave {;}",
	"text": `
	<p>
		Interleaved fields, where order does not matter, can be created using the <code>{</code> <i>open curly</i>, <code>;</code> <i>semicolon</i> and <code>}</code> <i>close curly</i> operators.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Remove the last semicolon.  The bar should stay green, since you are allowed to include or forget the last semicolon. 
			</li>
			<li>
				Remove the lines containing <code>$bool</code> and replace them with one line <code>_ :: $bool;</code>.
				The bar becomes orange, since we are only specifying one interleave field of type <code>$bool</code>.
			</li>
			<li>
				Replace <code>_ :: $bool</code> with <code>(_ :: $bool)*</code>.  The bar becomes green again.
				Our validator now describes a structure with one field named WhatsUp of type <code>$string</code> and some interleaved fields of type <code>$bool</code>.
			</li>
		</ol>
	</p>
	`,
	"relapse": `{
	MonkeysSmart :: $bool;
	DragonsExist :: $bool;
	WhatsUp :: $string;
}`,
	"input": interleaveJson,
}

var optionalJson = JSON.stringify({
	"DragonsExist": false,
    "WhatsUp": "E",
    "MonkeysSmart": true
}, "", 4);

var optionalTour = {
	"heading": "Optional ()?",
	"text": `
	<p>
		Placing an expression inside parentheses and adding a <code>?</code> operator as a suffix indicates an optional expression.
	</p>
	<p>
		The optional operator is just syntactic sugar.
		The following two expressions are equivalent.
		<ul>
			<li><code>(expression)?</code></li>
			<li><code>(expression|&lt;empty&gt;)</code></li>
		</ul>
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Remove the DragonsExist field from the JSON.  The bar should become orange, since the field is not optional.
			</li>
			<li>
				Make the DragonsExist field optional.  The bar should become green.
			</li>
			<li>
				Replace one of the optional expressions with is syntactic sugar equivalent.  The bar should stay green.
			</li>
		</ol>
	</p>
	`,
	"relapse": `{
	(MonkeysSmart :: $bool)?;
	DragonsExist :: $bool;
	(WhatsUp :: $string)?;
}`,
	"input": optionalJson,
}

var containsJson = JSON.stringify({
	"DragonsExist": false,
    "WhatsUp": "E",
    "MonkeysSmart": true
}, "", 4);

var containsTour = {
	"heading": ".Contains",
	"text": `
	<p>
		Placing a <code>.</code> operator in front of an expression indicates that the structure contains a the expression.
		This is especially useful when you only care about a single field.
	</p>
	<p>
		The contains operator is just syntactic sugar.
		The following two expressions are equivalent.
		<ul>
			<li><code>.expression</code></li>
			<li><code>[*, expression, *]</code></li>
		</ul>
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Remove the <code>.</code> operator.  The bar should become orange.
			</li>
			<li>
				Use the <code>.</code> operator to create a new validation expression for one of the other fields.  The bar should become green again.
			</li>
		</ol>
	</p>
	`,
	"relapse": `.WhatsUp == "E"`,
	"input": containsJson,
}

var notJson = JSON.stringify({
	"DragonsExist": false,
    "WhatsUp": "E",
    "MonkeysSmart": true
}, "", 4);

var notTour = {
	"heading": "Not !()",
	"text": `
	<p>
		Placing an expression inside parentheses and adding an <code>!</code> operator as a prefix indicates the compliment of the expression.
		This means that you expect to validate everything that does not match the expression.
		In other words <code>!(*)</code> doesn't validate any input.
	</p>
	<p>
		This can sometimes be counter intuitive.
		For example: <code>WhatsUp != "E"</code> is not the same as <code>!(WhatsUp == "E")</code>
		<ul>
			<li><code>WhatsUp != "E"</code>, means that there is one field named WhatsUp which has a value that is not equal to the string "E".</li>
			<li><code>!(WhatsUp == "E")</code>, means that any input will be matched as long as its not one field named WhatsUp that has a string value that is equal to "E".</li>
		</ul>
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Add the <code>.</code> operator in front of the field name.  The bar should become orange.
			</li>
			<li>
				Remove the <code>!</code> and the parentheses.  The bar should become green again.
			</li>
			<li>
				Change the <code>==</code> operator to the <code>!=</code> operator.  The bar should become orange again.
			</li>
		</ol>
	</p>
	`,
	"relapse": `!(WhatsUp == "E")`,
	"input": notJson,
}

var refsJson = JSON.stringify({
	"Family": {
        "Class": "Insecta",
        "Order": {
            "Superorder": {
                "Subclass": "Pterygota",
                "Infraclass": "Polyneoptera",
            },
            "Order": "Orthoptera"
        },
        "Suborder": "Ensifera",
        "Family": "Tettigoniidae",
    }
}, "", 4);

var refsTour = {
	"heading": "References # @ =",
	"text": `
	<p>
		Using references allows you to write recursive expressions.
	</p>
	<p>
		The expression below is validating structures where the species' family contains an Order of Orthoptera or recursively contains an Order which contains an Order with the value of Orthoptera.
	</p>
	<p>
		<ul>
			<li><code>#</code> is used to name a reference</li>
			<li><code>=</code> is used to assign an expression to a reference</li>
			<li><code>@</code> is used to reference an expression</li>
		</ul>
	</p>
	<p>
		Every expression you write without defining a reference is equivalent to <code>#main = expression</code>.
	</p>
	<p>
		Exercises:
		<ol>
			<li>
				Add <code>#main =</code> as a prefix to the expression that starts with <code>Family</code>.  The bar should stay green.
			</li>
			<li>
				Replace <code>@order</code> in the <code>#main</code> expression with the expression assigned to <code>#order</code>.  The bar should stay green.
			</li>
		</ol>
	</p>
	`,
	"relapse": `Family: @order
#order = ( .Order == "Orthoptera" | .Order: @order )`,
	"input": refsJson,
}

var finalJsonTour = {
	"heading": "Write your own valid JSON",
	"text": `
	<p>
		Write some JSON that will validate against the provided expression.
	</p>
	<p>
		An answer, valid JSON, will be provided on the next page.
	</p>`,
	"relapse": `{
	WhatsUp *= "E";
	History [
		0 ^= "Dino",
		*,
		_ == "Katydids Alive",
	];
	"Survived" > 1000000;
}`,
	"input": "{}",
}

finalExprJson = JSON.stringify({
	"WhatsUp": "Evolution",
 	"History": [
  		"Dinosaurs",
      	"Meteor",
      	"Dinosaurs Dead",
      	"Katydids Alive"
  	],
  	"Survived": 10000000
}, "", 4);

var finalExprTour = {
	"heading": "Write your own validation expression",
	"text": `
	<p>
		Write a validation expression that validates the provided JSON.
	</p>
	<p>
		You validation expression should not use any <code>*</code> operators.
	</p>
	<p>
		An answer will be provided on the next page.
	</p>`,
	"relapse": ``,
	"input": finalExprJson,
}

var goodbyeJson = JSON.stringify({
	"WhatsUp": "RelapsE",
}, "", 4);

var goodbyeTour = { 
	"heading": "Thank you",
	"text": `
	<p>
		Thank you for taking a tour of Relapse.
	</p>
	<p>
		More documentation can be found <a href="http://katydid.github.io/">here</a>
	</p>
	`,
	"relapse": `{
	"WhatsUp" == "Evolution";
	History [
		0 ^= "Dino",
		1 == "Meteor",
		2 ^= "Dino",
		3 $= "Alive",
	];
	"Survived" > 0;
}`, 
	"input": goodbyeJson
}

var tours = [
	welcomeTour,
	stringFieldsTour,
	numberFieldsTour,
	booleanTour,
	nameTour,
	zanyTour,
	andOrTour,
	structTour,
	emptyTour,
	concatTour,
	zeroOrMoreTour,
	interleaveTour,
	optionalTour,
	containsTour,
	notTour,
	refsTour,
	finalJsonTour,
	finalExprTour,
	goodbyeTour
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
	$("#autosizeButton").addClass("active");
	setHeightAuto();

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
	validateCode(mode, codeMirrors);
}
