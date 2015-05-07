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
function Host (id, name, width, height) {

    this.id = id;
    this.name = name;
    this.width = width;
    this.height = height;
    this.x = global_x;
    this.y = global_y;
    global_x = global_x + 5;
    global_y = global_y + 5;

    console.log('Creating Ehost "' + name + '"');
    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute('id', id);
    this.g.setAttribute('class', 'draggable');
    this.g.setAttributeNS(null, "onmousedown", "selectElement(evt)");
    // for DND, see below
    this.g.setAttribute('transform', "matrix(1 0 0 1 0 0)");

    ///////////////////////
    // Main inherited rectangle
    ///////////////////////
    this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.rect.setAttribute('id', id + "-rect");
    this.rect.setAttribute('x', this.x);
    this.rect.setAttribute('y', this.y);
    this.rect.setAttribute('height', this.height);
    this.rect.setAttribute('width', this.width);
    this.rect.setAttribute('rx', 5);
    this.rect.setAttribute('ry', 5);
    this.rect.setAttribute('stroke-width', 2);
    this.rect.setAttribute('stroke', 'black');
    this.rect.setAttribute('fill-opacity', '0.5');
    this.rect.setAttribute('fill', 'transparent');

    ///////////////////////
    // Own status rectangle
    ///////////////////////
    this.ownRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.ownRect.setAttribute('id', id + "-own-rect");
    // Upper right
    this.ownRect.setAttribute('x', this.x + this.width - 15);
    this.ownRect.setAttribute('y', this.y + 15 -10);
    this.ownRect.setAttribute('height', 10);
    this.ownRect.setAttribute('width', 10);
    this.ownRect.setAttribute('rx', 2);
    this.ownRect.setAttribute('ry', 2);
    this.ownRect.setAttribute('stroke-width', 2);
    this.ownRect.setAttribute('stroke', 'black');
    this.ownRect.setAttribute('fill-opacity', '0.8');
    this.ownRect.setAttribute('fill', 'transparent');

    ///////////////////////
    // Text
    ///////////////////////
    this.text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.text.setAttribute('id', id + "-text");
    this.text.setAttribute('x', this.x + (this.width / 2));
    this.text.setAttribute('y', this.y + (this.height / 2));
    // Magic happens !!!, allow easy centering of the text
    this.text.setAttribute('text-anchor', 'middle');
    this.text.innerHTML = this.name;

    var element = document.getElementById("svg");
    element.appendChild(this.g);
    this.g.appendChild(this.rect);
    this.g.appendChild(this.ownRect);
    this.g.appendChild(this.text);
}

// status = UP = 1
// status = DOWN = 2
Host.prototype.setOwnStatus = function (status) {
    if (status == 1) {
        this.ownRect.setAttribute('fill', 'green');
    } else if (status == 2) {
        this.ownRect.setAttribute('fill', 'red');
    } else {
        this.ownRect.setAttribute('fill', 'transparent');
    }

};

// status = OK = 1
// status = WARNING = 2
// status = CRITICAL = 3
Host.prototype.setInheritedStatus = function (status) {
    if (status == 1) {
        this.rect.setAttribute('fill', 'green');
    } else if (status == 2) {
        this.rect.setAttribute('fill', 'orange');
    } else if (status == 3) {
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
    console.log('Set own status up for id "' + id + "'");

    var host = hostList[id];
    if (host) {
        host.setOwnStatus(1);
    } else {
        console.error('No host found for id "' + id + '"');
    }
}

function setOwnStatusDown(id) {
    console.log('Set own status down for id "' + id + "'");

    var host = hostList[id];
    if (host) {
        host.setOwnStatus(2);
    } else {
        console.error('No host found for id "' + id + '"');
    }
}

function setInheritedStatus(id, status) {
    console.log('Set inherited status for id "' + id + "'");

    var host = hostList[id];
    if (host) {
        host.setInheritedStatus(status);
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
// Other source of inspiration is here: http://stackoverflow.com/questions/7777010/svg-dragging-for-group
// + working file here: https://dl.dropboxusercontent.com/u/169269/group_drag.svg

var selectedElement = 0;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;

function selectElement(evt) {
    // Trick here, g is never clicked, only rect or text => we need to rely on parent node
    // to ensure we are move the whole group of elements
    selectedElement = evt.target.parentNode;
    currentX = evt.clientX;
    currentY = evt.clientY;
    // Converts "matrix(1 0 0 1 0 0)" to ["1", "0", "0", "1", "0", "0"]
    /*console.log(selectedElement);
    console.log(selectedElement.parentNode);*/
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