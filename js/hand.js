function Hand() {
    this.draw = function () {

        ctx.rotate((pi * 2 ) * (new Date().getSeconds() / 60 ) - pi / 2);
        ctx.beginPath();
        // Center Arc
        ctx.arc(0, 0, 12, 225 / rad, 315 / rad, true);

        // line to second arc
        ctx.lineTo(Math.cos(315 / rad) * 12, -20);

        // first hals of second arc
        ctx.arc(0, 0, 21, 315 / rad, 30 / rad, false);

        // line to second base of second arc
        ctx.lineTo(0, 40);
        //line to second arc
        ctx.lineTo(Math.cos(150 / rad) * 21, Math.sin(150 / rad) * 21);

        // arc to the perp of first arc
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
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.closePath();
        ctx.fill()


    }
}