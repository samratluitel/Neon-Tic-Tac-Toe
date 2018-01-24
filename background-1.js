(function(global) {
    
// Data type check

function isObject(value, ignoreArray) {
    return typeof value === 'object' && value !== null;
}

function isNumber(value) {
    return typeof value === 'number';
}

function isString(value) {
    return typeof value === 'string';
}

function isFunction(value) {
    return typeof value === 'function';
}

function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

function isNull(value) {
    return value === null;
}

function isUndefined(value) {
    return typeof value === 'undefined';
}

global.isObject = isObject;
global.isNumber = isNumber;
global.isString = isString;
global.isFunction = isFunction;
global.isArray = isArray;
global.isNull = isNull;
global.isUndefined = isUndefined;


/**
 * extend
 */
function extend() {
    var target = arguments[0] || {}, o, p;

    for (var i = 1, len = arguments.length; i < len; i++) {
        o = arguments[i];

        if (!isObject(o)) continue;

        for (p in o) {
            target[p] = o[p];
        }
    }

    return target;
}

global.extend = extend;


// Random

function random(max, min) {
    if (isNaN(Number(max))) return Math.random();
    if (isNaN(Number(min))) min = 0;
    return Math.random() * (max - min) + min;
}

function randInt(max, min) {
    if (isNaN(Number(max))) return NaN;
    if (isNaN(Number(min))) min = 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
}
    
global.random = random;
global.random = randInt;

    
/**
 * Debug
 */
(function(global) {
    
    var limit = 0;
    var count = 0;
    
    function log() {
        if (limit > 0) {
            if (limit === count) return;
            count++;
        }
        window.console.log.apply(window.console, arguments);
    }
    
    log.limit = function(limitCount) {
        limit = limitCount < 0 ? 0 : limitCount;
    };
    
    global.log = log;
    
})(window);


/**
 * Point
 */
function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Point.create = function(o, y) {
    if (isArray(o)) return new Point(o[0], o[1]);
    if (isObject(o)) return new Point(o.x, o.y);
    return new Point(o, y);
};

Point.add = function(p1, p2) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
};

Point.subtract = function(p1, p2) {
    return new Point(p1.x - p2.x, p1.y - p2.y);
};

Point.scale = function(p, scaleX, scaleY) {
    if (isObject(scaleX)) {
        scaleY = scaleX.y;
        scaleX = scaleX.x;
    } else if (!isNumber(scaleY)) {
        scaleY = scaleX;
    }
    return new Point(p.x * scaleX, p.y * scaleY);
};

Point.equals = function(p1, p2) {
    return p1.x == p2.x && p1.y == p2.y;
};

Point.angle = function(p) {
    return Math.atan2(p.y, p.x);
};

Point.distance = function(p1, p2) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    return Math.sqrt(a * a + b * b);
};

Point.dot = function(p1, p2) {
    return p1.x * p2.x + p1.y * p2.y;
};

Point.cross = function(p1, p2) {
    return p1.x * p2.y - p1.y * p2.x;
};

Point.interpolate = function(p1, p2, f) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return new Point(p1.x + dx * f, p1.y + dy * f);
};

// Test
Point.polar = function(length, radian) {
    return new Point(length * Math.sin(radian), length * Math.cos(radian));
};

Point.prototype = {    
    add: function(p) {
        return Point.add(this, p);
    },
    
    subtract: function(p) {
        return Point.subtract(this, p);
    },
    
    scale: function(scaleX, scaleY) {
        return Point.scale(this, scaleX, scaleY);
    },
    
    equals: function(p) {
        return Point.equals(this, p);
    },
    
    angle: function() {
        return Point.angle(this);
    },
    
    distance: function(p) {
        return Point.distance(this, p);
    },
    
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    
    set: function(x, y) {
        if (isObject(x)) {
            y = x.y;
            x = x.x;
        }
        
        this.x = x || 0;
        this.y = y || 0;
        
        return this;
    }
    