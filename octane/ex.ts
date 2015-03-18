
/*@ alias pos = {number | v >  0 } */
/*@ alias nat = {number | v >= 0 } */

/*@ addPoints :: ({v:Field<Mutable> | offset(v,"w") = 128 && offset(v,"h") = 128}) => void */
function addPoints(field:Field) {
    var n = 64;
    for (var i = 1; i <= n; i++) {
        field.setVelocity(i, i, n, n);
        field.setDensity(i, i, 5);
        field.setVelocity(i, n - i, -n, -n);
        field.setDensity(i, n - i, 20);
        field.setVelocity(128 - i, n + i, -n, -n);
        field.setDensity(128 - i, n + i, 30);
    }
}

class Field {
    /*@ rowSize : [Immutable] {v:number | v = this.w + 2} */
    private rowSize;
    /*@ w : [Immutable] pos */
    private w;
    /*@ h : [Immutable] pos */
    private h;
    /*@ dens : [Immutable] {v:IArray<number> | (len v) = (this.h + 2) * (this.w + 2)} */
    private dens;
    /*@ u    : [Immutable] {v:IArray<number> | (len v) = (this.h + 2) * (this.w + 2)} */
    private u;
    /*@ ww    : [Immutable] {v:IArray<number> | (len v) = (this.h + 2) * (this.w + 2)} */
    private ww;

    /*@ new (rowSize: {v:number | v = w+2}, 
             w:       pos, 
             h:       pos, 
             dens:    {v:IArray<number> | (len v) = (h+2) * (w+2)},
             u:       {v:IArray<number> | (len v) = (h+2) * (w+2)},
             ww:       {v:IArray<number> | (len v) = (h+2) * (w+2)}) => {Field<M> | offset(v,"w") = w && offset(v,"h") = h } */
    constructor(rowSize:number, w:number, h:number, dens:number[], u:number[], ww:number[]) {
        this.rowSize = rowSize;
        this.w = w;
        this.h = h;
        this.dens = dens;
        this.u = u;
        this.ww = ww;
    }

                /*@ setDensity : (x:{v:nat | v <= this.w}, y:{v:nat | v <= this.h}, d:number) : void */
            public setDensity(x:number, y:number, d:number) {
                this.dens[(x + 1) + (y + 1) * this.rowSize] = d;
            }
            /*@ getDensity : (x:{v:nat | v <= this.w}, y:{v:nat | v <= this.h}) : number */
            public getDensity(x:number, y:number) {
                return this.dens[(x + 1) + (y + 1) * this.rowSize];
            }
            /*@ setVelocity : (x:{v:nat | v <= this.w}, y:{v:nat | v <= this.h}, xv:number, yv:number) : void */
            public setVelocity(x:number, y:number, xv:number, yv:number) {
                this.u[(x + 1) + (y + 1) * this.rowSize] = xv;
                this.ww[(x + 1) + (y + 1) * this.rowSize] = yv;
            }
            /*@ getXVelocity : (x:{v:nat | v <= this.w}, y:{v:nat | v <= this.h}) : number */
            public getXVelocity(x:number, y:number) {
                return this.u[(x + 1) + (y + 1) * this.rowSize];
            }
            /*@ getYVelocity : (x:{v:nat | v <= this.w}, y:{v:nat | v <= this.h}) : number */
            public getYVelocity(x:number, y:number) {
                return this.ww[(x + 1) + (y + 1) * this.rowSize];
            }
}
