/**
 * Basic lib for Shapes and Objects (hosts/services/BA) to be displayed in SVG
 * Requires #svg DOM element
 */
"use strict";



///////////////////////////////////////
// Text wrapping
///////////////////////////////////////
// FIXME text wrapping cannot be implemented cleanly so far (SVG2 proposal, not yet validated or implemented in browsers)
// Relevant: http://tavmjong.free.fr/SVG/TEXT_FLOW/ http://stackoverflow.com/questions/4991171/auto-line-wrapping-in-svg-text
// CSS Shapes won't help (do not apply to SVG) + unsupported outside Chrome...
// Only solution: large portion of JS at the end of http://stackoverflow.com/questions/4991171/auto-line-wrapping-in-svg-text
// Demo (mouse over): http://democra.me/svgtext_clean2.htm
// Another solution to test: http://stackoverflow.com/questions/11007640/fit-text-into-svg-element-using-d3-js
// Demo: http://jsfiddle.net/MJJEc/ slight overflow with Firefox, ensure we add "word-break: break-all" for long names with "_"...

///////////////////////////////////////
// Arrows
///////////////////////////////////////
// SVG markers
// http://www.svgbasics.com/markers.html
// http://stackoverflow.com/questions/11808860/arrow-triangles-on-my-svg-line
// Demo with DnD (D3js)
// http://stackoverflow.com/questions/13165913/draw-an-arrow-between-two-circles
// http://jsfiddle.net/yeQS2/ => time to learn Math again !
// http://jsfiddle.net/7vJmy/2/


// FIXME we should unify Triangle and Custom (all SVG polygon)
// FIXME we could also probably refactor all shapes (at least for the text position which is the same)
function Custom(id, name, x, y, width, height, color, fontColor, opacity, points) {

    this.id = id;
    this.name = name;
    this.width = width;
    this.height = height;
    // x, y returned by Map server (we need to calculate "real" x, y for SVG, see below
    this.x = x;
    this.y = y;

    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute('id', id);
    this.g.setAttribute('class', 'draggable');
    this.g.setAttributeNS(null, "onmousedown", "selectElement(evt)");
    // for DND, see below
    this.g.setAttribute('transform', "matrix(1 0 0 1 0 0)");

    ///////////////////////
    // Main inherited rectangle
    ///////////////////////
    this.polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.polygon.setAttribute('id', id + "-rect");

    // We convert the Map server "points" attribute to a SVG compliant STR
    var pointsStr = points.replace(/\//g, ' ');

    this.polygon.setAttribute('points', pointsStr);
    // Use 2 instead of 1 to prevent bad blurring http://stackoverflow.com/questions/18019453/svg-rectangle-blurred-in-all-browsers
    this.polygon.setAttribute('stroke-width', 2);
    this.polygon.setAttribute('stroke', 'black');
    this.polygon.setAttribute('fill-opacity', opacity);
    // Use transparent instead of none, so that inner rectangle gets draggable...
    this.polygon.setAttribute('fill', color);

    ///////////////////////
    // Text
    ///////////////////////
    this.text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.text.setAttribute('id', id + "-text");
    this.text.innerHTML = this.name;
    this.text.setAttribute('fill', fontColor);
    this.text.setAttribute('x', this.x); // no need to substract anything for text due to text-anchor
    this.text.setAttribute('y', this.y + 5); // FIXME not vertical centered, we should substract font-size
    // Magic happens !!!, allow easy centering of the text
    this.text.setAttribute('text-anchor', 'middle');


    var element = document.getElementById("svg");
    element.appendChild(this.g);
    this.g.appendChild(this.polygon);
    this.g.appendChild(this.text);
}
Custom.prototype.constructor = Custom;

function Triangle(id, name, x, y, width, height, color, fontColor, opacity) {

    this.id = id;
    this.name = name;
    this.width = width;
    this.height = height;
    // x, y returned by Map server (we need to calculate "real" x, y for SVG, see below
    this.x = x;
    this.y = y;

    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute('id', id);
    this.g.setAttribute('class', 'draggable');
    this.g.setAttributeNS(null, "onmousedown", "selectElement(evt)");
    // for DND, see below
    this.g.setAttribute('transform', "matrix(1 0 0 1 0 0)");

    ///////////////////////
    // Main inherited rectangle
    ///////////////////////
    this.polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.polygon.setAttribute('id', id + "-rect");
    // We need to define 3 points
    // Top
    var p1x = x;
    var p1y = y - height/2;
    // Lower right
    var p2x = x + width/2;
    var p2y = y + height/2;
    // Lower left
    var p3x = x - width/2;
    var p3y = y + height/2;
    this.polygon.setAttribute('points', p1x + ',' + p1y + ' ' + p2x + ',' + p2y + ' ' + p3x + ',' + p3y);
    // Use 2 instead of 1 to prevent bad blurring http://stackoverflow.com/questions/18019453/svg-rectangle-blurred-in-all-browsers
    this.polygon.setAttribute('stroke-width', 2);
    this.polygon.setAttribute('stroke', 'black');
    this.polygon.setAttribute('fill-opacity', opacity);
    // Use transparent instead of none, so that inner rectangle gets draggable...
    this.polygon.setAttribute('fill', color);

    ///////////////////////
    // Text
    ///////////////////////
    this.text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.text.setAttribute('id', id + "-text");
    this.text.innerHTML = this.name;
    this.text.setAttribute('fill', fontColor);
    this.text.setAttribute('x', this.x); // no need to substract anything for text due to text-anchor
    this.text.setAttribute('y', this.y + 5); // FIXME not vertical centered, we should substract font-size
    // Magic happens !!!, allow easy centering of the text
    this.text.setAttribute('text-anchor', 'middle');

    var element = document.getElementById("svg");
    element.appendChild(this.g);
    this.g.appendChild(this.polygon);
    this.g.appendChild(this.text);
}
Triangle.prototype.constructor = Triangle;

function Ellipse(id, name, x, y, width, height, color, fontColor, opacity) {

    this.id = id;
    this.name = name;
    this.width = width;
    this.height = height;
    // x, y returned by Map server (we need to calculate "real" x, y for SVG, see below
    this.x = x;
    this.y = y;

    this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.g.setAttribute('id', id);
    this.g.setAttribute('class', 'draggable');
    this.g.setAttributeNS(null, "onmousedown", "selectElement(evt)");
    // for DND, see below
    this.g.setAttribute('transform', "matrix(1 0 0 1 0 0)");

    ///////////////////////
    // Main inherited rectangle
    ///////////////////////
    this.ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    this.ellipse.setAttribute('id', id + "-rect");
    this.ellipse.setAttribute('cx', this.x);
    this.ellipse.setAttribute('cy', this.y);
    this.ellipse.setAttribute('ry', this.height / 2);
    this.ellipse.setAttribute('rx', this.width / 2);
    // Use 2 instead of 1 to prevent bad blurring http://stackoverflow.com/questions/18019453/svg-rectangle-blurred-in-all-browsers
    this.ellipse.setAttribute('stroke-width', 2);
    this.ellipse.setAttribute('stroke', 'black');
    this.ellipse.setAttribute('fill-opacity', opacity);
    // Use transparent instead of none, so that inner rectangle gets draggable...
    this.ellipse.setAttribute('fill', color);

    ///////////////////////
    // Text
    ///////////////////////
    this.text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.text.setAttribute('id', id + "-text");
    this.text.innerHTML = this.name;
    this.text.setAttribute('fill', fontColor);
    this.text.setAttribute('x', this.x); // no need to substract anything for text due to text-anchor
    this.text.setAttribute('y', this.y + 5); // FIXME not vertical centered, we should substract font-size
    // Magic happens !!!, allow easy centering of the text
    this.text.setAttribute('text-anchor', 'middle');


    var element = document.getElementById("svg");
    element.appendChild(this.g);
    this.g.appendChild(this.ellipse);
    this.g.appendChild(this.text);
}
Ellipse.prototype.constructor = Ellipse;

function Rectangle(id, name, x, y, width, height, color, fontColor, opacity) {

    this.id = id;
    this.name = name;
    this.width = width;
    this.height = height;
    // x, y returned by Map server (we need to calculate "real" x, y for SVG, see below
    this.x = x;
    this.y = y;

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
    this.rect.setAttribute('x', this.x - (this.width / 2));
    this.rect.setAttribute('y', this.y - (this.height / 2));
    this.rect.setAttribute('height', this.height);
    this.rect.setAttribute('width', this.width);
    this.rect.setAttribute('rx', 5);
    this.rect.setAttribute('ry', 5);
    // Use 2 instead of 1 to prevent bad blurring http://stackoverflow.com/questions/18019453/svg-rectangle-blurred-in-all-browsers
    this.rect.setAttribute('stroke-width', 2);
    this.rect.setAttribute('stroke', 'black');
    this.rect.setAttribute('fill-opacity', opacity);
    // Use transparent instead of none, so that inner rectangle gets draggable...
    this.rect.setAttribute('fill', color);

    ///////////////////////
    // Text
    ///////////////////////
    this.text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.text.setAttribute('id', id + "-text");
    this.text.innerHTML = this.name;
    this.text.setAttribute('fill', fontColor);
    this.text.setAttribute('x', this.x); // no need to substract anything for text due to text-anchor
    this.text.setAttribute('y', this.y + 5); // FIXME not vertical centered, we should substract font-size
    // Magic happens !!!, allow easy centering of the text
    this.text.setAttribute('text-anchor', 'middle');


    var element = document.getElementById("svg");
    element.appendChild(this.g);
    this.g.appendChild(this.rect);
    this.g.appendChild(this.text);
}
Rectangle.prototype.constructor = Rectangle;

// Setting propre inheritance in JS is a pain
// We have no class inheritance but rather an object from objact (AKA prototype) inheritance
// ES5 introduced Object.create()
// ES6 will add more classical "class"
// In the meantime, the best doc I found is: http://markdalgleish.com/2012/10/a-touch-of-class-inheritance-in-javascript/
function Element(id, name, x, y, width, height) {

    this.id = id;
    this.name = name;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    console.log('Creating element "' + name + '"');
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
    this.rect.setAttribute('x', this.x - (this.width / 2));
    this.rect.setAttribute('y', this.y - (this.height / 2));
    this.rect.setAttribute('height', this.height);
    this.rect.setAttribute('width', this.width);
    this.rect.setAttribute('rx', 5);
    this.rect.setAttribute('ry', 5);
    // Use 2 instead of 1 to prevent bad blurring http://stackoverflow.com/questions/18019453/svg-rectangle-blurred-in-all-browsers
    this.rect.setAttribute('stroke-width', 2);
    this.rect.setAttribute('stroke', 'black');
    this.rect.setAttribute('fill-opacity', '0.5');
    // Use transparent instead of none, so that inner rectangle gets draggable...
    this.rect.setAttribute('fill', 'transparent');

    ///////////////////////
    // Item icon
    ///////////////////////
    this.image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    this.image.setAttribute('id', id + "-image");
    // FIXME remove magic numbers...
    this.image.setAttribute('x', this.x - 36/2);
    this.image.setAttribute('y', this.y - 36/2);
    this.image.setAttribute('height', 36);
    this.image.setAttribute('width', 36);
    this.image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'img/host.png');

    ///////////////////////
    // Text
    ///////////////////////
    this.text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.text.setAttribute('id', id + "-text");
    this.text.innerHTML = this.name;
    this.text.setAttribute('x', this.x);
    this.text.setAttribute('y', this.y + this.height / 2 - 10); // 10 = font size ; 5 = extra space between text and bottom of the shape
    // Magic happens !!!, allow easy centering of the text
    this.text.setAttribute('text-anchor', 'middle');


    var element = document.getElementById("svg");
    element.appendChild(this.g);
    this.g.appendChild(this.rect);
    this.g.appendChild(this.image);
    this.g.appendChild(this.text);
}
Element.prototype.constructor = Element;

Element.prototype.setInheritedStatus = function (status) {
    if (status == 0) {
        this.rect.setAttribute('fill', 'green');
    } else if (status == 1) {
        this.rect.setAttribute('fill', 'yellow');
    } else if (status == 2) {
        this.rect.setAttribute('fill', 'red');
    } else if (status == 3) {
        this.rect.setAttribute('fill', 'blue');
    } else {
        this.rect.setAttribute('fill', 'transparent');
    }

};

// Prototype
function ElementWithOwnStatus(id, name, x, y, width, height) {

    console.log('Creating element with own status with name "' + name + '"');
    Element.call(this, id, name, x, y, width, height);

    ///////////////////////
    // Own status rectangle
    ///////////////////////
    this.ownRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.ownRect.setAttribute('id', id + "-own-rect");
    // Upper right
    this.ownRect.setAttribute('x', this.x + this.width / 2 - 5 - 14);
    this.ownRect.setAttribute('y', this.y - this.height / 2 + 5);
    this.ownRect.setAttribute('height', 14);
    this.ownRect.setAttribute('width', 14);
    this.ownRect.setAttribute('rx', 2);
    this.ownRect.setAttribute('ry', 2);
    this.ownRect.setAttribute('stroke-width', 2);
    this.ownRect.setAttribute('stroke', 'black');
    this.ownRect.setAttribute('fill-opacity', '1');
    this.ownRect.setAttribute('fill', 'transparent');

    this.g.appendChild(this.ownRect);
}

ElementWithOwnStatus.prototype = Object.create(Element.prototype);
ElementWithOwnStatus.prototype.constructor = ElementWithOwnStatus;

ElementWithOwnStatus.prototype.setOwnStatus = function (status) {
    if (status == 0) {
        this.ownRect.setAttribute('fill', 'green');
    } else if (status == 1) {
        this.ownRect.setAttribute('fill', 'yellow');
    } else if (status == 2) {
        this.ownRect.setAttribute('fill', 'red');
    } else if (status == 3) {
        this.ownRect.setAttribute('fill', 'blue');
    } else if (status == 4) {
        this.ownRect.setAttribute('fill', '#00FF00');
    } else {
        this.ownRect.setAttribute('fill', 'transparent');
    }
};

function Host(id, name, x, y, width, height) {

    console.log('Creating host "' + name + '"');
    ElementWithOwnStatus.call(this, id, name, x, y, width, height);

    this.image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'img/host.png');

}
Host.prototype = Object.create(ElementWithOwnStatus.prototype);
Host.prototype.constructor = Host;

function Service(id, name, x, y, width, height) {

    console.log('Creating service "' + name + '"');
    ElementWithOwnStatus.call(this, id, name, x, y, width, height);

    this.image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'img/service.png');

}
Service.prototype = Object.create(ElementWithOwnStatus.prototype);
Service.prototype.constructor = Service;

function BA(id, name, x, y, width, height) {

    console.log('Creating ba "' + name + '"');
    Element.call(this, id, name, x, y, width, height);

    this.image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'img/ba.png');

}
BA.prototype = Object.create(Element.prototype);
BA.prototype.constructor = BA;

function setOwnStatusUp(id) {
    console.log('Set own status up for id "' + id + '"');

    var element = elementList[id];
    if (element) {
        if (typeof element.setOwnStatus == 'function') {
            element.setOwnStatus(0);
        } else {
            console.warn('This element has no own status');
        }
    } else {
        console.error('No element found for id "' + id + '"');
    }
}

function setOwnStatusDown(id) {
    console.log('Set own status down for id "' + id + '"');

    var element = elementList[id];
    if (element) {
        if (typeof element.setOwnStatus == 'function') {
            element.setOwnStatus(2);
        } else {
            console.warn('This element has no own status');
        }
    } else {
        console.error('No element found for id "' + id + '"');
    }
}

function setInheritedStatus(id, status) {
    console.log('Set inherited status for id "' + id + '"');

    var element = elementList[id];
    if (element) {
        element.setInheritedStatus(status);
    } else {
        console.error('No element found for id "' + id + '"');
    }
}



function removeElement(id) {

    console.log('Removing element with id "' + id + '"');

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