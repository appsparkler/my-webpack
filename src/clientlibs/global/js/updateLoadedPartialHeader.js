checkIfBigHeader();

function checkIfBigHeader(){
    var globalNavigation = document.getElementsByClassName("global-navigation")[0];

    if(globalNavigation){
        var biggerHeader = globalNavigation.childNodes[1].className.indexOf('global-nav');
        if(biggerHeader===-1){
            initialiseVueNavigation();
            addStyleForNewHeader();
        }
     }else{
		setTimeout( function(){ checkIfBigHeader(); }, 50 );	
    }
}


function initialiseVueNavigation(){
			var NavigationV2ElementExists = document.getElementById("navigation-v2");
			if (NavigationV2ElementExists) {
					checkFortwoHeader();
			}else{   
				setTimeout( function(){initialiseVueNavigation();}, 50 );
			}
}


function checkFortwoHeader(){
    var navParent = document.getElementById("navigation-v2");
    var preloaderNav = document.getElementById("navigation-v2-preloader");
	var navbarComp = document.getElementsByClassName("navbar-component");
    
    if(navParent.firstElementChild.className.indexOf('navbar-component')===0){
        preloaderNav.style.display = "none";
        preloaderNav.parentNode.removeChild(preloaderNav);
	}else{
		setTimeout( function(){ checkFortwoHeader(); }, 100 );
	}
}

function addStyleForNewHeader(){
	var css = '@media (min-width: 641px){'+
		'body .template .container {'+
			'padding-top: 59px;'+
        '} }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}
