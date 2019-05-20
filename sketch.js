let snowflake = [];

function setup()
{
    createCanvas(500, 600).parent("canvas");

    let h = Math.sqrt(3)/2*width;

    let a = new p5.Vector(0, height-h);
    let b = new p5.Vector(width, height-h);
    let c = new p5.Vector(width/2, height);

    snowflake.push(new Side(a, b));
    snowflake.push(new Side(b, c));
    snowflake.push(new Side(c, a));



    noLoop();
}

class Side 
{
    constructor(from, to) {
        this.from = from.copy();
        this.to = to.copy();
    }

    draw() {
        line(this.from.x, this.from.y, this.to.x, this.to.y);        
    }

    generate() {
        let newSides = []
        let v = p5.Vector.sub(this.to, this.from);
        v = v.div(3);

        let a1 = this.from.copy().add(v);
        let b1 = this.to.copy().sub(v);
        let c  = a1.copy().add(v.rotate(-60/180*Math.PI));

        newSides.push(new Side(this.from, a1));
        newSides.push(new Side(b1, this.to));
        newSides.push(new Side(a1, c));
        newSides.push(new Side(c, b1));
        
        return newSides;
    }
}

function mouseClicked()
{
    let newSnowflake = [];
    for(s of snowflake) {
        let ss = s.generate();
        newSnowflake = newSnowflake.concat(ss);
    }
    snowflake = newSnowflake;
    redraw();
}

function draw() 
{
    clear();
    background('black');
    stroke('white');
    for(s of snowflake) {
        s.draw();
    }
}