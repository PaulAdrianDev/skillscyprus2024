function closeOverlay(overlay){
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
}

function openOverlay(overlay){
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "all";
}

function openNavOptions(){
    openOverlay(document.getElementById("navOptions"));
}
function closeNavOptions(){
    if(window.screen.width <= 760)
        closeOverlay(document.getElementById("navOptions"));
}

setRandomColorToTitle();
function setRandomColorToTitle(){
    let options = [
        '<span style="color: #0bfc03">Flavors</span><br>of the <span style="color:red">World</span>',
        '<span style="color: #0345fc">Flavors</span><br>of the <span style="color:red">World</span>',
        'Flavors<br><span style="color:red">of the</span> World',
    ]
    let x = Math.floor( Math.random() * options.length );

    document.getElementById("headerTitle").innerHTML = options[x];
}

