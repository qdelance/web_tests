/**
 * Created by quentin on 28/04/15.
 */
"use strict";

// Default coordinates of added elements
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
    // for DND, see below
    rect.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    rect.setAttribute('class', 'draggable');
    rect.setAttributeNS(null, "onmousedown", "selectElement(evt)");


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

// Code below shamelessly copied from http://www.petercollingridge.co.uk/interactive-svg-components/draggable-svg-element
var selectedElement = 0;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;

function selectElement(evt) {
    selectedElement = evt.target;
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');

    for(var i=0; i<currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
    }

    selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
}

function moveElement(evt){
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;
    currentMatrix[4] += dx;
    currentMatrix[5] += dy;
    var newMatrix = "matrix(" + currentMatrix.join(' ') + ")";

    selectedElement.setAttributeNS(null, "transform", newMatrix);
    currentX = evt.clientX;
    currentY = evt.clientY;
}

function deselectElement(evt){
    if(selectedElement != 0){
        selectedElement.removeAttributeNS(null, "onmousemove");
        selectedElement.removeAttributeNS(null, "onmouseout");
        selectedElement.removeAttributeNS(null, "onmouseup");
        selectedElement = 0;
    }
}