ConvertTemplate.js
==================

This is plugin for Javascript and you can use this plugin to convert your template.
You can use this to all characters.
    

HOW TO USE?
-----------
Use function **"from"** in **"convertTemplate"** object.
You can use two format to get result.

First is to list the parameters.

    convertTemplate("TEMPLATE TO CONVERT", {VARIABLES});

Second is to use object.

    convertTemplate({
    	frame: "TEMPLATE TO CONVERT",
    	variable: {VARIABLES},
    	head: "HEAD CHARACTER",
    	tail: "TAIL CHARACTER"
    });
    

EXAMPLE
-------
Convert the text by using the brackets : My job is [job].
> My job is Developer

    convertTemplate.from({
        frame:"My job is [job]",
        variable:{job:"Developer"},
        head:"[",
        tail:"]"
    });

 
Convert the text by using the parenthesis : I love (language)!
> I love javascript!

    convertTemplate.from({
        frame:"I love (language)!",
        variable:{language:"javascript"},
        head:"(",
        tail:")"
    });

Convert the text by using the brace : My name is {name}. and I'm a {gender}

You know what? default character is brace. *"{}"*

> My name is HansolLim. and I'm male

    convertTemplate.from("My name is {name}. and I'm {gender}", {name:"HansolLim",gender:"male"});

 
Meet Hsol in Blog - http://hsol.tistory.com
Meet Hsol on Email - molmoty@gmail.com

Thanks.
    
