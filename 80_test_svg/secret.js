/**
 * Created by quentin on 28/04/15.
 */
"use strict";

// Default coordinates of added elements
var global_x = 15;
var global_y = 15;
var id = 1;
// id => Host instance
var hostList = {};

// Prototype
function Host (id, name, x, y) {

    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;

    console.log('Creating host "' + name + '"');
    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.rect.setAttribute('id', id);
    this.rect.setAttribute('x', global_x);
    global_x = global_x + 5;
    this.rect.setAttribute('y', global_y);
    global_y = global_y + 5;
    this.rect.setAttribute('height', y);
    this.rect.setAttribute('width', x);
    this.rect.setAttribute('rx', 5);
    this.rect.setAttribute('ry', 5);
    this.rect.setAttribute('stroke', 'black');
    this.rect.setAttribute('fill', 'transparent');
    // for DND, see below
    this.rect.setAttribute('transform', "matrix(1 0 0 1 0 0)");
    this.rect.setAttribute('class', 'draggable');
    this.rect.setAttributeNS(null, "onmousedown", "selectElement(evt)");


    var element = document.getElementById("svg");
    element.appendChild(this.rect);

    this.rect.setAttribute('stroke-width', 2);
}

// status = UP = 1
// status = DOWN = 2
Host.prototype.setOwnStatus = function (status) {
    if (status == 1) {
        this.rect.setAttribute('fill', 'green');
    } else if (status == 2) {
        this.rect.setAttribute('fill', 'red');
    } else {
        this.rect.setAttribute('fill', 'transparent');
    }

};

function addHost(id, hostname) {

    console.log('Adding host "' + hostname + '" with id "' + id + "'");

    var host = new Host(id, hostname, 88, 88);
    hostList[id] = host;

}

function setOwnStatusUp(id) {
    console.log('Set up for id "' + id + "'");

    var host = hostList[id];
    if (host) {
        host.setOwnStatus(1);
    } else {
        console.error('No host found for id "' + id + '"');
    }
}

function setOwnStatusDown(id) {
    console.log('Set down for id "' + id + "'");

    var host = hostList[id];
    if (host) {
        host.setOwnStatus(2);
    } else {
        console.error('No host found for id "' + id + '"');
    }
}

function removeHost(id) {

    console.log('Removing host with id "' + id + '"');

    var element = document.getElementById(id);
    if (element) {
        // DOM limitation, cannot remove an element directly without refering to its parent
        element.parentNode.removeChild(element);
    } else {
        console.error('No element found with id "' + id + '"');
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