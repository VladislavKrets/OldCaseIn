document.querySelector('#lin').addEventListener("mouseup", _MOUSEUP);
document.querySelector('#lin').addEventListener("mousemove", throttle(function (event) {
    _MOUSEMOVE(event);
}, 30));
document.querySelector('#lin').addEventListener("mousedown", _MOUSEDOWN, true);

document.querySelector('#lin').addEventListener("touchend", _MOUSEUP);
document.querySelector('#lin').addEventListener("touchmove", throttle(function (event) {
    _MOUSEMOVE(event);
}, 30));
document.querySelector('#lin').addEventListener("touchstart", _MOUSEDOWN, true);

let currentX = 0
let currentY = 0

$(document).on('click', '#lin', function (event) {
    event.preventDefault();
});

document.querySelector('#panel').addEventListener('mousemove', function (event) {
    if ((mode == 'line_mode' || mode == 'partition_mode') && action == 1) {
        action = 0;
        if (typeof (binder) != 'undefined') {
            binder.remove();
            delete binder;
        }
        $('#linetemp').remove();
        $('#line_construc').remove();
        lengthTemp.remove();
        delete lengthTemp;
    }
});


window.addEventListener('resize', function (event) {
    width_viewbox = $('#lin').width();
    height_viewbox = $('#lin').height();
    document.querySelector('#lin').setAttribute('viewBox', originX_viewbox + ' ' + originY_viewbox + ' ' + width_viewbox + ' ' + height_viewbox)
});

// *****************************************************************************************************
// ******************************        KEYPRESS on KEYBOARD          *********************************
// *****************************************************************************************************
document.addEventListener("keydown", function (event) {
    if (mode != "text_mode") {
        if (event.keyCode == '37') {
            //LEFT
            zoom_maker('zoomleft', 100, 30);
        }
        if (event.keyCode == '38') {
            //UP
            zoom_maker('zoomtop', 100, 30);
        }
        if (event.keyCode == '39') {
            //RIGHT
            zoom_maker('zoomright', 100, 30);
        }
        if (event.keyCode == '40') {
            //DOWN
            zoom_maker('zoombottom', 100, 30);
        }
        if (event.keyCode == '107') {
            //+
            zoom_maker('zoomin', 20, 50);
        }
        if (event.keyCode == '109') {
            //-
            zoom_maker('zoomout', 20, 50);
        }
    }
    // else {
    //   if (action == 1) {
    //     binder.textContent = binder.textContent + event.key;
    //     console.log(field.value);
    //   }
    // }
});

// *****************************************************************************************************
// ******************************        MOUSE MOVE          *******************************************
// *****************************************************************************************************

function _MOUSEMOVE(event) {
    event.preventDefault();
    if (drag === 'on') {
        snap = calcul_snap(event, grid_snap);
        $('#lin').css('cursor', 'move');
        distX = (snap.xMouse - pox) * factor;
        distY = (snap.yMouse - poy) * factor;
        // pox = event.pageX;
        // poy = event.pageY;
        zoom_maker('zoomdrag', distX, distY);
    }
} // END MOUSEMOVE

// *****************************************************************************************************
// *****************************************************************************************************
// *****************************************************************************************************
// ******************************        MOUSE DOWN            *****************************************
// *****************************************************************************************************
// *****************************************************************************************************
// *****************************************************************************************************

function _MOUSEDOWN(event) {
    event.preventDefault();
    action = 0;
    drag = 'on';
    snap = calcul_snap(event, grid_snap);
    pox = snap.xMouse;
    poy = snap.yMouse;
}

//******************************************************************************************************
//*******************  *****  ******        ************************************************************
//*******************  *****  ******  ****  ************************************************************
//*******************  *****  ******  ****  ************************************************************
//*******************  *****  ******        ************************************************************
//*******************         ******  ******************************************************************
//**********************************  ******************************************************************

function _MOUSEUP(event) {
    if (showRib) $('#boxScale').show(200);
    drag = 'off';
    cursor('default');
}
