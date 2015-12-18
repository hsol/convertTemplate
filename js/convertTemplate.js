(function() {
	window.convertTemplate = {
		template : {
			frame : "",
			variable : {},
			head : "{",
			tail : "}"
		},
		from : function(option, simpleFormat) {
			var Response = null;
			var ERROR = {
				status : false,
				message : {
					undefined : "Undefined Error: ",
					noObject : "Can't find option object, please insert your own option.",
					noFrame : "Can't find 'template' in option, please insert your own template.",
					noVar : "Can't find 'variable' in option, please insert your own variable."
				}
			};
			try {
				if (simpleFormat != undefined) {
					var simpleFormat = {
						frame : option,
						variable : simpleFormat
					};
					option = simpleFormat;
				}
				if (option) {
					if (option.frame != undefined) {
						if (option.variable != undefined) {
							convertTemplate.set.frame(option.frame);
							convertTemplate.set.variable(option.variable);
							convertTemplate.set.rule(option.head, option.tail);
							Response = convertTemplate.get.result();
						} else {
							Response = setError(Response, ERROR.message.noVar);
						}
					} else {
						Response = setError(Response, ERROR.message.noFrame);
					}
				} else {
					Response = setError(Response, ERROR.message.noObject);
				}

			} catch (e) {
				Response = setError(Response, ERROR.message.undefined
						+ e.message);
			}
			return Response;

			function setError(Response, message) {
				ERROR.message = message;
				Response = ERROR;
				return Response;
			}
		},
		set : {
			frame : function(frame) {
				convertTemplate.template.frame = frame;
			},
			variable : function(variable) {
				convertTemplate.template.variable = variable;
			},
			rule : function(head, tail) {
				if (head != undefined && tail != undefined) {
					convertTemplate.template.head = head;
					convertTemplate.template.tail = tail;
				}
			}
		},
		get : {
			keys : function(object) {
				if ((typeof object) == 'object') {
					var keys = [];
					for ( var k in object)
						keys.push(k);
					return keys;
				} else if ((typeof object) == 'string') {
					try {
						return this.keys(JSON.parse(object));
					} catch (error) {
						console.error("[convertTemplate.get.keys] "
								+ error.message);
					}
				} else {
					console
							.error("[convertTemplate.get.keys] please insert data typeof 'object' or 'JSON'");
				}
			},
			result : function() {
				var frame = convertTemplate.template.frame;
				var realVar = convertTemplate.get
						.keys(convertTemplate.template.variable);
				var realData = [];
				for ( var index in realVar) {
					realData[index] = convertTemplate.template.variable[realVar[index]];
				}

				for ( var idx in realVar) {
					var regTemp = new RegExp(convertTemplate.template.head
							+ realVar[idx] + convertTemplate.template.tail,
							"gi");
					frame = frame.replace(regTemp, realData[idx]).replace(
							/&lt;/gi, "<").replace(/&gt;/gi, ">");
				}

				return frame;
			}
		}
	};
});