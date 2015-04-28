/**
 * Created by quentin on 28/04/15.
 */
"use strict";

var global_x = 15;
var global_y = 15;

function addHost(hostname) {

    console.log('Adding hostname "' + hostname + '"');

    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute('id', hostname);
    rect.setAttribute('x', global_x);
    global_x = global_x + 5;
    rect.setAttribute('y', global_y);
    global_y = global_y + 5;
    rect.setAttribute('height', 50);
    rect.setAttribute('width', 50);
    rect.setAttribute('rx', 5);
    rect.setAttribute('ry', 5);
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('fill', 'transparent');


    var element = document.getElementById("svg");
    element.appendChild(rect);

    rect.setAttribute('stroke-width', 2);

}

function removeHost(hostname) {

    console.log('Removing hostname "' + hostname + '"');

    var element = document.getElementById(hostname);
    if (element) {
        element.removeChild(element);
    } else {
        console.error('No element found with name "' + hostname + '"');
    }


}

