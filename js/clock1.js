const rad = 57.2958;
var i = 0;

const PI = Math.PI, PI2 = PI * 2;
function convert(deg) {
    return deg * Math.PI / 180;
}
function sin(d) {
    return (d > PI * 2) ? Math.sin(convert(d)) : Math.sin(d);
}
function tan(d) {
    return (d > PI * 2) ? Math.tan(convert(d)) : Math.tan(d);
}
function cos(d) {
    return (d > PI * 2) ? Math.cos(convert(d)) : Math.cos(d);
}
function acos(d) {
    return Math.acos(d) * rad;
}
function asin(d) {
    return Math.asin(d) * rad;
}
function atan(d) {
    return Math.atan(d) * rad;
}
function multi(a, b) {
    var res = [];
    // noinspection StatementWithEmptyBodyJS
    for (var i = 0; i < a.length; res[i] = [
        a[i][0] * b[0][0] + a[i][1] * b[0][1],
        a[i][0] * b[1][0] + a[i][1] * b[1][1]], i++);
    return res;
}
function draw(ctx) {
    ctx.moveTo(this.v[0][0], this.v[0][1]);
    ctx.beginPath();
    // noinspection StatementWithEmptyBodyJS
    for (var i = 0; i < this.v.length;
         ctx.lineTo(this.v[i][0], this.v[i][1]), i++);
    ctx.fillStyle = (this.fillStyle != undefined) ? this.fillStyle : 'black';
    if (this.fill) ctx.fill();
    if (this.close) {
        ctx.closePath();
        ctx.stroke();
        return 1;
    }
    ctx.stroke();
    return 0;
}
function rotate2D(theta) {
    clear();
    return multi(this.v, [
        [cos(theta), sin(theta)],
        [-sin(theta), cos(theta)]
    ]);
}
function Circle(r, separations, x, y, start, stop) {
    this.r = r;
    this.x = x || 0;
    this.y = y || 0;
    start = start || 0;
    stop = stop || PI * 2;
    var sep = stop / separations;
    var c = 0;
    var ang = start || 0;
    this.v = [];
    while (ang < stop) {
        this.v[c] = [cos(ang) * this.r, sin(ang) * this.r];
        ++c;
        ang += sep;
    }
    this.draw = draw;
    this.rotate = rotate2D;
}
function setGrad() {
    if (this.grad) {
        for (i in this.grad) {
            this.radial.addColorStop(i, this.grad[i])
        }
    }
    return this.radial;
}
function RadialGrad(pos, ctx) {
    this.grad = {};
    pos = pos || {
            x: 0,
            y: 0,
            r: 50,
            x1: 0,
            y1: 0,
            r1: 20
        };
    // Enable for second vertexes
    this.radial = ctx.createRadialGradient(pos.x, pos.y, pos.r, pos.x1, pos.y1, pos.r1);
    this.getGrad = setGrad;
}
function MinHand(ctx) {

    var r = 8, h = r / 2;
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(0, 0, r, convert(130), convert(40), false);
        ctx.lineTo(Math.acos(convert(44)) + 4, 70);
        ctx.lineJoin = 'round';
        ctx.lineTo(Math.acos(convert(44)) + 14, 72);
        ctx.lineTo(0, 100);
        ctx.lineTo(Math.acos(convert(44)) - 14, 72);
        ctx.lineTo(Math.acos(convert(44)) - 4, 70);
        ctx.lineTo(Math.cos(40) * r, Math.sin(40) * r);
        ctx.moveTo(Math.cos(40) * h, Math.sin(40) * h);
        ctx.arc(0, 0, h, convert(130), convert(40), false);
        ctx.lineTo(-Math.cos(40) * h, 69);
        ctx.lineTo(Math.cos(40) * (h - 1), 69);
        ctx.lineTo(Math.cos(40) * (h), Math.sin(40) * h);
        ctx.stroke();
    }
}
function SecondHand(ctx) {
    ctx.beginPath();
    ctx.arc(0, 0, 12, 225 / rad, 315 / rad, true);
    ctx.lineTo(Math.cos(315 / rad) * 12, -20);
    ctx.arc(0, 0, 21, 315 / rad, 30 / rad, false);
    ctx.lineTo(0, 40);
    ctx.lineTo(Math.cos(150 / rad) * 21, Math.sin(150 / rad) * 21);
    ctx.arc(0, 0, 21, 150 / rad, 250 / rad, false);
    ctx.closePath();
    ctx.moveTo(Math.cos(250 / rad) * 21, -32);
    ctx.arc(0, 0, 32, 225 / rad, 150 / rad, true);
    ctx.lineTo(0, 60);
    ctx.lineTo(Math.cos(30 / rad) * 32, Math.sin(30 / rad) * 32);
    ctx.arc(0, 0, 32, 30 / rad, 225 / rad, true);
    ctx.moveTo(Math.cos(250 / rad) * 21, Math.sin(250 / rad) * 21);
    ctx.lineTo(Math.cos(225 / rad) * 12, -20);
    ctx.closePath();
    var grad = ctx.createRadialGradient(0, 0, 20, 0, 0, 10);
    grad.addColorStop(0, '#000');
    grad.addColorStop(0, '#9c9c9c');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.closePath();
    ctx.fill();
}
function clear(ctx, canvas) {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
}
!(function (secH, minH, days, months, js, win, doc, al, log) {
    var ctx = secH.getContext('2d');
    ctx.translate(secH.width / 2, secH.height / 2);
    ctx.scale(0.3, 0.3);
    var angle = (PI * 2 ) / 60;

    function add(itm) {
        itm.draw(ctx);
    }

    var init, minit = init = false;

    function Hand(ang) {
        ctx.rotate(ang);
        this.draw = function () {
            init = true;
            var sec = new SecondHand(ctx);
        }
    }

    function Clock() {

    }

    function drawHand(s) {

    }

    function second() {
        clear(ctx, secH);
        var date = new Date();
        var sec = date.getSeconds();
        if (!init) {
            ctx.rotate(angle * (sec + 29));
        }
        add(new Hand(angle));
    }

    function min() {

    }

    setInterval(second, 1000);
})
(
    document.getElementById('canvas'),
    document.getElementById('can2'),
    ['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun'],
    ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'july', 'agu', 'sep', 'oct', 'nov', 'dec'],
    jQuery,
    window,
    document,
    alert,
    console.log
);