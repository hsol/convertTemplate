convertTemplate = {
		template : {
			frame : "",
			variable : {},
			head : "{",
			tail : "}",
			case : "gi"
		},
		from : function(option, simpleFormat) {
			var Response = null;
			var caseSet = "g i m gi gm im ig mg mi gim gmi img igm mig mgi";
			var ERROR = {
				status : false,
				message : {
					undefined : "Undefined Error: ",
					noObject : "Can't find option object, please insert your own option.",
					noFrame : "Can't find 'template' in option, please insert your own template.",
					noVar : "Can't find 'variable' in option, please insert your own variable.",
					caseMiss : "Case not Correct. Combine with (g, i, m)"
				}
			};
			try {
				var template = convertTemplate.template;
				if (simpleFormat != undefined) {
					var temp = convertTemplate.template;
					temp.frame = option;
					temp.variable = simpleFormat;
					option = temp;
				}
				if (option) {
					if (option.frame != undefined) {
						if (option.variable != undefined) {
							if (option.head == null)
								option.head = template.head;
							if (option.tail == null)
								option.tail = template.tail;
							if (option.case == null)
								option.case = template.case;
							
							if (caseSet.indexOf(option.case) > 0)
							{
								convertTemplate.set.frame(option.frame);
								convertTemplate.set.variable(option.variable);
								convertTemplate.set.rule(option.head, option.tail);
								Response = convertTemplate.get.result();
							}
							else {
								Response = setError(Repsonse, ERROR.message.caseMiss);
							}
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
					frame = frame
							.replace(new RegExp("\\"+convertTemplate.template.head+realVar[idx]+"\\"+convertTemplate.template.tail,convertTemplate.template.case), realData[idx])
							.replace(/&lt;/gi, "<")
							.replace(/&gt;/gi, ">");
				}
				return frame;
			}
		}
	};