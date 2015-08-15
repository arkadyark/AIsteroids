module.exports = (function() {
    function Display(canvas) {
        this.canvas = canvas;
        width = canvas.getAttribute('width');
        height = canvas.getAttribute('height');
        this.context = this.canvas.getContext('2d')
    }

    Display.prototype = {
        render : function(world, winner) {
            this.context.rect(0, 0, width, height)
            this.context.fillStyle = "black";
            this.context.fill();
        }
    }

    return Display;
})()
