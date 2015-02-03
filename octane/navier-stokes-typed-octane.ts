/**
 * Copyright 2012 the V8 project authors. All rights reserved.
 * Copyright 2009 Oliver Hunt <http://nerget.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Known Size Number Array
/*@ alias KSNArray[size] = {IArray<number> | (len v) = size} */

/*@ predicate FFvalid(V) = keyVal(V,"rowSize")        ~~ keyVal(V,"width") + 2
                        && keyVal(V,"size")           ~~ keyVal(V,"width") * keyVal(V,"height")
                        && len(keyVal(V,"dens"))      ~~ keyVal(V,"size")
                        && len(keyVal(V,"dens_prev")) ~~ keyVal(V,"size")
                        && len(keyVal(V,"u"))         ~~ keyVal(V,"size")
                        && len(keyVal(V,"u_prev"))    ~~ keyVal(V,"size")
                        && len(keyVal(V,"v"))         ~~ keyVal(V,"size")
                        && len(keyVal(V,"v_prev"))    ~~ keyVal(V,"size") */
module NavierStokes {
    /*@ solver :: FluidField<Immutable> + null */
    var solver:FluidField = null;
    /*@ nsFrameCounter :: number */
    var nsFrameCounter = 0;

    export function runNavierStokes()
    {
        solver.update();
        nsFrameCounter++;

        if(nsFrameCounter===15)
            checkResult(solver.getDens());
    }

    function checkResult(dens) {
    
        var result = 0;
        for (var i=7000;i<7100;i++) {
            result+=~~((dens[i]*10));
        }

        if (result!=74) {
            console.log("checksum failed: " + result);
        }
    }

    export function setupNavierStokes()
    {
        solver = new FluidField(null);
        solver.setResolution(128, 128);
        solver.setIterations(20);
        solver.setDisplayFunction(function(f:Field){});
        solver.setUICallback(prepareFrame);
        solver.reset();
    }

    export function tearDownNavierStokes()
    {
        solver = null;
    }

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

    /*@ framesTillAddingPoints :: number */
    var framesTillAddingPoints = 0;
    /*@ framesBetweenAddingPoints :: number */
    var framesBetweenAddingPoints = 5;

    function prepareFrame(field:Field)
    {
        if (framesTillAddingPoints === 0) {
            addPoints(field);
            framesTillAddingPoints = framesBetweenAddingPoints;
            framesBetweenAddingPoints++;
        } else {
            framesTillAddingPoints--;
        }
    }

    // Code from Oliver Hunt (http://nerget.com/fluidSim/pressure.js) starts here.
    export class FluidField {
        width;
        height;
        rowSize;
        size;
        dens;
        dens_prev;
        u;
        u_prev;
        v;
        v_prev;
        iterations;
        visc;
        dt;
        displayFunc;



        /*@ uiCallback :: (field:Field) => void */
        uiCallback = function(field:Field) {};

        /*@ new (canvas:top, hRes:{number | v > 0}, wRes:{number | v > 0}) => {FluidField<Immutable> | FFvalid(v)} */
        constructor(canvas, hRes, wRes) {
            // TODO: formerly didn't allow hRes*wRes to be >= 1000000
            var width = wRes;
            var height = hRes;
            var size = (width+2)*(height+2);

            this.width = width;
            this.height = height;
            this.rowSize = width + 2;
            this.size = size;
            var dens      = new Array<number>(size);
            var dens_prev = new Array<number>(size);
            var u         = new Array<number>(size);
            var u_prev    = new Array<number>(size);
            var v         = new Array<number>(size);
            var v_prev    = new Array<number>(size);
            for (var i = 0; i < size; i++) {
                dens_prev[i] = 0;
                u_prev[i] = 0;
                v_prev[i] = 0;
                dens[i] = 0;
                u[i] = 0;
                v[i] = 0;
            }
            this.dens = dens;
            this.dens_prev = dens_prev;
            this.u = u;
            this.u_prev = u_prev;
            this.v = v;
            this.v_prev = v_prev;

            this.iterations = 10;
            this.visc = 1/2;//.
            this.dt = 1/10;//.

            /*@ displayFunc :: null + (f:Field<Immutable>) => void */
            this.displayFunc: (f:Field) => void = null;

            
        }

            /*@ addFields : (x:KSNArray[size], s:KSNArray[size], dt:number) : void */
            addFields(x:number[], s:number[], dt:number)
            {
                for (var i=0; i<size ; i++ ) x[i] += dt*s[i];
            }

            /*@ set_bnd : (b:number, x:KSNArray[size]) : void */
            set_bnd(b:number, x:number[])
            {
                if (b===1) {
                    for (var i = 1; i <= width; i++) {
                        x[i] =  x[i + rowSize];
                        x[i + (height+1) *rowSize] = x[i + height * rowSize];
                    }
                    for (var j = 1; j <= height; j++) {
                        x[j * rowSize] = -x[1 + j * rowSize];
                        x[(width + 1) + j * rowSize] = -x[width + j * rowSize];
                    }
                } else if (b === 2) {
                    for (var i = 1; i <= width; i++) {
                        x[i] = -x[i + rowSize];
                        x[i + (height + 1) * rowSize] = -x[i + height * rowSize];
                    }

                    for (var j = 1; j <= height; j++) {
                        x[j * rowSize] =  x[1 + j * rowSize];
                        x[(width + 1) + j * rowSize] =  x[width + j * rowSize];
                    }
                } else {
                    for (var i = 1; i <= width; i++) {
                        x[i] =  x[i + rowSize];
                        x[i + (height + 1) * rowSize] = x[i + height * rowSize];
                    }

                    for (var j = 1; j <= height; j++) {
                        x[j * rowSize] =  x[1 + j * rowSize];
                        x[(width + 1) + j * rowSize] =  x[width + j * rowSize];
                    }
                }
                var maxEdge = (height + 1) * rowSize;
                x[0]                 = 1/2 * (x[1] + x[rowSize]);//.
                x[maxEdge]           = 1/2 * (x[1 + maxEdge] + x[height * rowSize]);//.
                x[(width+1)]         = 1/2 * (x[width] + x[(width + 1) + rowSize]);//.
                x[(width+1)+maxEdge] = 1/2 * (x[width + maxEdge] + x[(width + 1) + height * rowSize]);//.
            }

            lin_solve(b:number, x:number[], x0:number[], a:number, c:number)
            {
                if (a === 0 && c === 1) {
                    for (var j=1 ; j<=height; j++) {
                        var currentRow = j * rowSize;
                        ++currentRow;
                        for (var i = 0; i < width; i++) {
                            x[currentRow] = x0[currentRow];
                            ++currentRow;
                        }
                    }
                    set_bnd(b, x);
                } else {
                    var invC = 1 / c;
                    for (var k=0 ; k<iterations; k++) {
                        for (var j=1 ; j<=height; j++) {
                            var lastRow = (j - 1) * rowSize;
                            var currentRow = j * rowSize;
                            var nextRow = (j + 1) * rowSize;
                            var lastX = x[currentRow];
                            ++currentRow;
                            for (var i=1; i<=width; i++) {
                                x[currentRow] = (x0[currentRow] + a*(lastX+x[++currentRow]+x[++lastRow]+x[++nextRow])) * invC;
                                lastX = x[currentRow];
                            }
                        }
                        set_bnd(b, x);
                    }
                }
            }

            /* diffuse : (b:number, x:KSNArray[size], x0:KSNArray[size], dt:number) : void */
            diffuse(b:number, x:number[], x0:number[], dt:number)
            {
                var a = 0;
                lin_solve(b, x, x0, a, 1 + 4*a);
            }

            /* lin_solve2 : (x:KSNArray[size], x0:KSNArray[size], y:KSNArray[size], y0:KSNArray[size], a:number, c:number) : void */
            lin_solve2(x:number[], x0:number[], y:number[], y0:number[], a:number, c:number)
            {
                if (a === 0 && c === 1) {
                    for (var j=1 ; j <= height; j++) {
                        var currentRow = j * rowSize;
                        ++currentRow;
                        for (var i = 0; i < width; i++) {
                            x[currentRow] = x0[currentRow];
                            y[currentRow] = y0[currentRow];
                            ++currentRow;
                        }
                    }
                    set_bnd(1, x);
                    set_bnd(2, y);
                } else {
                    var invC = 1/c;
                    for (var k=0 ; k<iterations; k++) {
                        for (var j=1 ; j <= height; j++) {
                            var lastRow = (j - 1) * rowSize;
                            var currentRow = j * rowSize;
                            var nextRow = (j + 1) * rowSize;
                            var lastX = x[currentRow];
                            var lastY = y[currentRow];
                            ++currentRow;
                            for (var i = 1; i <= width; i++) {
                                x[currentRow] = (x0[currentRow] + a * (lastX + x[currentRow] + x[lastRow] + x[nextRow])) * invC;
                                lastX = x[currentRow];
                                y[currentRow] = (y0[currentRow] + a * (lastY + y[++currentRow] + y[++lastRow] + y[++nextRow])) * invC;
                                lastY = y[currentRow];
                            }
                        }
                        set_bnd(1, x);
                        set_bnd(2, y);
                    }
                }
            }

            /* diffuse2 : (x:KSNArray[size], x0:KSNArray[size], y:KSNArray[size], y0:KSNArray[size], dt:number) : void */
            diffuse2(x:number[], x0:number[], y:number[], y0:number[], dt:number)
            {
                var a = 0;
                lin_solve2(x, x0, y, y0, a, 1 + 4 * a);
            }

            /* advect : (b:number, d:KSNArray[size], d0:KSNArray[size], u:KSNArray[size], v:KSNArray[size], dt:number) : void */
            advect(b:number, d:number[], d0:number[], u:number[], v:number[], dt:number)
            {
                var Wdt0 = dt * width;
                var Hdt0 = dt * height;
                var Wp5 = width + 1/2;//.
                var Hp5 = height + 1/2;//.
                for (var j = 1; j<= height; j++) {
                    var pos = j * rowSize;
                    for (var i = 1; i <= width; i++) {
                        var x:any = i - Wdt0 * u[++pos];
                        var y:any = j - Hdt0 * v[pos];
                        if (x < 1/2)//.
                            x = 1/2;//.
                        else if (x > Wp5)
                            x = Wp5;
                        var i0 = x | 0;
                        var i1 = i0 + 1;
                        if (y < 1/2)//.
                            y = 1/2;//.
                        else if (y > Hp5)
                            y = Hp5;
                        var j0 = y | 0;
                        var j1 = j0 + 1;
                        var s1 = x - i0;
                        var s0 = 1 - s1;
                        var t1 = y - j0;
                        var t0 = 1 - t1;
                        var row1 = j0 * rowSize;
                        var row2 = j1 * rowSize;
                        d[pos] = s0 * (t0 * d0[i0 + row1] + t1 * d0[i0 + row2]) + s1 * (t0 * d0[i1 + row1] + t1 * d0[i1 + row2]);
                    }
                }
                set_bnd(b, d);
            }

            /* project : (u:KSNArray[size], v:KSNArray[size], p:KSNArray[size], div:KSNArray[size]) : void */
            project(u:number[], v:number[], p:number[], div:number[])
            {
                var h = -(1/2) / Math.sqrt(width * height);//.
                for (var j = 1 ; j <= height; j++ ) {
                    var row = j * rowSize;
                    var previousRow = (j - 1) * rowSize;
                    var prevValue = row - 1;
                    var currentRow = row;
                    var nextValue = row + 1;
                    var nextRow = (j + 1) * rowSize;
                    for (var i = 1; i <= width; i++ ) {
                        div[++currentRow] = h * (u[++nextValue] - u[++prevValue] + v[++nextRow] - v[++previousRow]);
                        p[currentRow] = 0;
                    }
                }
                set_bnd(0, div);
                set_bnd(0, p);

                lin_solve(0, p, div, 1, 4 );
                var wScale = 1/2 * width;//.
                var hScale = 1/2 * height;//.
                for (var k = 1; k<= height; k++ ) {
                    var prevPos = k * rowSize - 1;
                    var currentPos = k * rowSize;
                    var nextPos = k * rowSize + 1;
                    var prevRow = (k - 1) * rowSize;
                    var currentRow = k * rowSize;
                    var nextRow = (k + 1) * rowSize;

                    for (var i = 1; i<= width; i++) {
                        u[++currentPos] -= wScale * (p[++nextPos] - p[++prevPos]);
                        v[currentPos]   -= hScale * (p[++nextRow] - p[++prevRow]);
                    }
                }
                set_bnd(1, u);
                set_bnd(2, v);
            }

            /* dens_step : (x:KSNArray[size], x0:KSNArray[size], u:KSNArray[size], v:KSNArray[size], dt:number) : void */
            dens_step(x:number[], x0:number[], u:number[], v:number[], dt:number)
            {
                addFields(x, x0, dt);
                diffuse(0, x0, x, dt );
                advect(0, x, x0, u, v, dt );
            }

            /* vel_step : (u:KSNArray[size], v:KSNArray[size], u0:KSNArray[size], v0:KSNArray[size], dt:number) : void */
            vel_step(u:number[], v:number[], u0:number[], v0:number[], dt:number)
            {
                addFields(u, u0, dt );
                addFields(v, v0, dt );
                var temp = u0; u0 = u; u = temp;
                // var
                temp = v0; v0 = v; v = temp;
                diffuse2(u,u0,v,v0, dt);
                project(u, v, u0, v0);
                // var
                temp = u0; u0 = u; u = temp;
                // var
                temp = v0; v0 = v; v = temp;
                advect(1, u, u0, u0, v0, dt);
                advect(2, v, v0, u0, v0, dt);
                project(u, v, u0, v0 );
            }

            queryUI(d:number[], u:number[], v:number[])
            {
                for (var i = 0; i < size; i++)
                    u[i] = v[i] = d[i] = 0;//.
                uiCallback(new Field(rowSize, width, height, d, u, v));
            } 

            /*@ update : () : {void | true} */
            public update() 
            {
                queryUI(dens_prev, u_prev, v_prev);
                vel_step(u, v, u_prev, v_prev, dt);
                dens_step(dens, dens_prev, u, v, dt);
                displayFunc(new Field(rowSize, width, height, dens, u, v));
            }
            public setDisplayFunction(func:(f:Field) => void) {
                displayFunc = func;
            }
            
            /*@ iterations : () : {number | true} */
            public iterations() { return iterations; }
            /*@ setIterations : (number) => {void | true} */
            public setIterations(iters:number) 
            {
                if (iters > 0 && iters <= 100)
                    iterations = iters;
            }
            public setUICallback(callback:(f:Field) => void) {
                uiCallback = callback;
            }
            /*@ reset : () : {void | true} */
            public reset()
            {
                dens      = new Array<number>(size);
                dens_prev = new Array<number>(size);
                u         = new Array<number>(size);
                u_prev    = new Array<number>(size);
                v         = new Array<number>(size);
                v_prev    = new Array<number>(size);
                for (var i = 0; i < size; i++) {
                    dens_prev[i] = 0;
                    u_prev[i] = 0;
                    v_prev[i] = 0;
                    dens[i] = 0;
                    u[i] = 0;
                    v[i] = 0;
                }
            }
            /*@ getDens () => KSNArray[size] */
            public getDens()
            {
                return dens;
            }
    }

    export class Field {
        private final rowSize;
        private final w;
        private final h;
        private final dens;
        private final u;
        private final v;

        /*@ new (rowSize:{number | v = width+2}, 
                 width:  {number | 0 < v}, 
                 height: {number | 0 < v}, 
                 dens:   {IArray<number> | (len v) = (width+2)*(height+2)}, 
                 u:      {IArray<number> | (len v) = (len dens)}, 
                 v:      {IArray<number> | (len v) = (len dens)}) => void */
        constructor(rowSize:number, width:number, height:number, dens:number[], u:number[], v:number[]) {
            this.rowSize = rowSize;
            this.w = width;
            this.h = height;
            this.dens = dens;
            this.u = u;
            this.v = v;
        }

            /*@ setDensity : (x:{number | 0 <= v && v < width}, y:{number | 0 <= v && v < height}, d:number) : void */
            public setDensity(x:number,y:number,d:number):void {
                dens[(x + 1) + (y + 1) * rowSize] = d;
            }
            /*@ getDensity : (x:{number | 0 <= v && v < width}, y:{number | 0 <= v && v < height}) : number */
            public getDensity(x:number, y:number):number {
                return dens[(x + 1) + (y + 1) * rowSize];
            }
            /*@ setVelocity : (x:{number | 0 <= v && v < width}, y:{number | 0 <= v && v < height}, xv:number, yv:number) : void */
            public setVelocity(x:number, y:number, xv:number, yv:number):void {
                u[(x + 1) + (y + 1) * rowSize] = xv;
                v[(x + 1) + (y + 1) * rowSize] = yv;
            }
            /*@ getXVelocity : (x:{number | 0 <= v && v < width}, y:{number | 0 <= v && v < height}) : number */
            public getXVelocity(x:number, y:number):number {
                return u[(x + 1) + (y + 1) * rowSize];
            }
            /*@ getYVelocity : (x:{number | 0 <= v && v < width}, y:{number | 0 <= v && v < height}) : number */
            public getYVelocity(x:number, y:number):number {
                return v[(x + 1) + (y + 1) * rowSize];
            }
            /*@ width : () : {number | true} */    
            public width():number { return width; }
            /*@ height : () : {number | true} */
            public height():number { return height; }
    }
}
