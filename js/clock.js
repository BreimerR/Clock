(function (jq, doc, win, log, al, cos, sin) {

    function join(v, ctx) {
        //noinspection StatementWithEmptyBodyJS
        for (var i = 0; i < v.length; i++) {
            ctx.lineTo(parseFloat(v[i][0]), parseInt(v[i][1]));
        }
    }


    function Circle(ctx) {
        this.x = this.y = 0;
        this.r = 20;
        this.grad = 'black';
        this.fill = false;
        this.draw = function () {
            ctx.beginPath();
            ctx.strokeStyle = this.grad;
            ctx.arc(this.x, this.y, this.r - this.width / 2, 0, Math.PI * 2, true);
            if (this.fill) {
                ctx.fillStyle = this.fill;
                ctx.fill();
                return this;
            }
            ctx.lineWidth = this.width ? this.width : 1;
            ctx.stroke();
        }
    }

    function position(x, y) {
        this.ctx.moveTo(x, y)
    }

    function setGrad() {
        if (this.grad) {
            for (i in this.grad) {
                this.radial.addColorStop(i, this.grad[i])
            }
        }
        return this.radial;
    }

    function Rect(h, w) {
        this.h = h;
        this.w = w;
        this.lineWidth = 1;
        this.grad = 'black';
        this.draw = function (ctx) {
            this.ctx = ctx;
            this.pos = position;
            this.pos(0, 0);
            join([
                [w, 0],
                [w, -h],
                [0, -h]
            ], ctx);
            if (this.fill) {
                ctx.fillStyle = this.grad;
                ctx.fill();
                return 1;
            } else {
                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = this.grad;
                ctx.stroke();
                return 0;
            }
        }
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

    function LinearGrad(pos, ctx) {
        this.grad = {};
        pos = pos || {x: 0, y: 0, x1: 0, y1: 100};
        this.radial = ctx.createLinearGradient(pos.x, pos.y, pos.x1, pos.y1);
        this.getGrad = setGrad;
    }

    function add(e) {
        e.draw();
    }

    function Clock() {
        this.can = jq('#canvas');
        var $t = this.can[0],
            ctx = $t.getContext('2d'),
            w = $t.width, h = $t.height,
            center = {
                x: $t.width / 2,
                y: $t.height / 2
            }, t = 0;
        // Move point 0,0 to center of the canvas;
        ctx.translate(center.x, center.y);

  /*      var time = new Date(),
            day = days[time.getDay() - 1],
            hr = time.getHours(), min = time.getMinutes(),
            sec = time.getSeconds(),
            date = time.getDate(),
            monthI = time.getMonth() + 1,
            month = months[monthI - 1];*/

        function createClock() {
            var frame = new Circle(ctx);
            frame.r = w / 2;
            frame.width = 20;
            pos = jq.extend({
                x1: 0,
                y1: 0,
                r1: 60
            }, frame);
            var radialG = new RadialGrad(pos, ctx);
            radialG.grad = {
                0: '#e6e6e6',
                0.25: '#3b3b3b',
                0.5: '#000000',
                0.75: '#3b3b3b',
                1: '#e6e6e6'
            };
            var linearG = new LinearGrad({x: 0, y: -frame.r * 2, x1: 0, y1: 0}, ctx);
            linearG.grad = {
                0: '#000000',
                0.25: '#2e2e2e',
                0.5: '#616161',
                0.75: '#949494',
                1: '#e6e6e6'
            };
            frame.grad = radialG.getGrad();
            add(frame);

            var depth = new Circle(ctx);
            depth.r = w / 2 - 20;
            depth.width = 5;

            var depthG = new LinearGrad({x: 0, y: -(w / 2 - 20), x1: 0, y1: 0}, ctx);
            depthG.grad = {
                0: '#b1b2b6',
                0.25: '#9e9fa4',
                0.5: '#393939',
                0.75: '#000000',
                0.875: '#000000',
                1: '#c5c5c5'
            };
            depth.grad = depthG.getGrad();
            add(depth);

            var center = new Circle(ctx);


        }

        function addHands() {

        }

        function animateHands() {

        }

        function drawTimeCapsule() {
            var h = 20, w1 = 35, w2 = 24, ang = atan(h / (w1 - w2) / 2);
            var x = 0, y = 0, v = [
                [w1, -(120 - h / 2)],
                [w1 - tan(ang) * h, -(120 - h / 2) + h],
                [-(w1 - tan(ang) * h), -(120 - h / 2) + h]
            ];
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'blue';
            ctx.moveTo(-w1, -(120 - h / 2));
            join(v);
            ctx.lineJoin = 'round';
            ctx.stroke();
        }


        function addSeconds() {

        }

        function animateTimeCapsule() {

        }

        function addMin() {

        }


        function addHours() {

        }


        function addEventHandlers() {

        }

        function createDateHolder() {
            var holder = new Rect(20, 10);

        }

        function updateDateHolder() {

        }

        this.draw = function () {
            createClock();
            //  createDateHolder();
            //addHours();

        }
    }


    /* var inner = new Circle(50);
     inner.fill = '#6f6f6f';
     inner.draw();
     hands();
     var innerTop = new Circle(10);
     innerTop.fill = '#8e8e96';
     innerTop.draw();
     var innerToper = new Circle(5);
     innerToper.fill = '#ffffff';
     innerToper.draw();


     // replace ums with triangles
     /!*(function() {

     var nums = [12],
     angle = 0,
     numeralWidth = 0;


     nums.forEach(function (num) {
     angle = Math.PI / 6 * (num - 3);
     numeralWidth = ctx.measureText(num).width;
     ctx.font = '18px Arial';
     ctx.fillStyle = 'black';
     ctx.fillText(num,
     Math.cos(angle) * 118 -
     numeralWidth / 2,
     Math.sin(angle) * 118 +
     20 / 3);
     });
     })();*!/
     function valHolder() {
     ctx.font = '20px Arial italic';
     ctx.fillStyle = '#fbf9ff';
     ctx.fillText(12, -24 / 2, -90);
     ctx.fillStyle = '#000000';
     ctx.fillText('B', -12 / 2, 45);

     }

     valHolder();

     function timeCaps() {
     var canvas = document.getElementById('canvas');
     if (canvas.getContext) {
     var ctx = canvas.getContext('2d');
     ctx.beginPath();
     ctx.fillStyle = '#6e6e6e';
     ctx.moveTo(0, -120);
     ctx.lineTo(-10, -140);
     ctx.lineTo(10, -140);
     ctx.fill();
     }
     }

     timeCaps();

     function recs() {
     ctx.beginPath();
     ctx.fillStyle = 'black';
     ctx.rect(-1.5, 120, 3, 20);
     ctx.fill();

     ctx.beginPath();
     ctx.fillStyle = 'black';
     ctx.rect(120, -1.5, 20, 3);
     ctx.fill();

     ctx.beginPath();
     ctx.fillStyle = 'black';
     ctx.rect(-140, -1.5, 20, 3);
     ctx.fill();
     }

     recs();
     function hands() {
     ctx.beginPath();
     ctx.fillStyle = '#3b3b3b';
     ctx.rect(4, -1.5, 110, 3);
     ctx.fill();
     }*/

    var clock = new Clock();
    add(clock);
    var time = new Date();

    var hr = time.getHours();
    //


})(jQuery, document, window, console.log, alert, Math.cos, Math.sin);