// Copyright 2014 Cognitect. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

module transducers {

    interface Goog {
        typeOf(x:any):string;
    }
    declare var goog:Goog;

    interface Transformer<IN, INTER, OUT> {
        init:()=>INTER;
        result:(result:INTER)=>OUT;
        step:(result:INTER, input:IN)=>QQ<INTER>;
    }

    // Note: this is actually a special case of transducer: one that preserves all types
    interface Transducer<IN, INTER, OUT> {
        (xf: Transformer<IN, INTER, OUT>): Transformer<IN, INTER, OUT>;
    }

            // "use strict";

            // goog.provide("com.cognitect.transducers");

    // =============================================================================
    // Build target config

    /** @define {boolean} */
    var TRANSDUCERS_DEV = true;

    /** @define {boolean} */
    var TRANSDUCERS_NODE_TARGET = false;

    /** @define {boolean} */
    var TRANSDUCERS_BROWSER_TARGET = false;

    /** @define {boolean} */
    var TRANSDUCERS_BROWSER_AMD_TARGET = false;

            // goog.scope(function() {
                
            // /**
            //  * @class transducers
            //  */
            // var transducers = com.cognitect.transducers;

    // =============================================================================
    // Utilities

    /*@ isString :: (x:top) => {boolean | true} */
    function isString(x:any) {
        return typeof x === "string";
    }

            // if(typeof Array.isArray != "undefined") {
            //     transducers.isArray = function(x) {
            //         return Array.isArray(x);
            //     }
            // } else {
    /*@ isArray :: (x:top) => {boolean | true} */
    function isArray(x:any) {
        return goog.typeOf(x) === "array";
    }
            // }

    /*@ isObject :: (x:top) => {boolean | true} */
    function isObject(x:any) {
        return goog.typeOf(x) === "object";
    }

            // /*@ isIterable :: (x:{[s:string]:top}) => {top | true} */
            // function isIterable(x:{[s:string]:any}) {
            //     return x["@@iterator"] || x["next"];
            // }

            // transducers.slice = function(arrayLike, start, n) {
            //     if(n == null) {
            //         return Array.prototype.slice.call(arrayLike, start);
            //     } else {
            //         return Array.prototype.slice.call(arrayLike, start, n);
            //     }
            // };

            /**
             * Take a predicate function and return its complement.
             * @method transducers.complement
             * @param {function} a predicate function
             * @return {function} the complement predicate function
             * @example
             *     var isEven = function(n) { return n % 2 == 0; };
             *     var isOdd = transducers.complement(isEven);
             */
            // function complement(f:Function):Function {
            //     return function(varArgs) {
            //         return !f.apply(null, transducers.slice(arguments, 0));
            //     };
            // };

    class Wrap<IN, OUT> implements Transformer<IN, OUT, OUT> {
        /*@ stepFn : (x:OUT, y:IN)=>QQ<Immutable, OUT> */
        public stepFn: (result:OUT, input:IN)=>QQ<OUT>;
        /*@ new(stepFn:(result:OUT, input:IN)=>QQ<Immutable, OUT>) => {void | true} */
        constructor(stepFn:(result:OUT, input:IN)=>QQ<OUT>) {
            this.stepFn = stepFn;
        }

        /*@ init : () : {OUT | true} */
        init():OUT {
            throw new Error("init not implemented");
        }
        /*@ result : (result:OUT) : {OUT | true} */
        result(result:OUT):OUT {
            return result;
        }
        /*@ step : (result:OUT, input:IN) : {QQ<Immutable, OUT> | true} */
        step(result:OUT, input:IN):QQ<OUT> {
            return this.stepFn(result, input);
        }
    }

    /**
     * Take a two-arity reducing function where the first argument is the
     * accumluation and the second argument is the next input and convert
     * it into a transducer transformer object.
     * @method transducers.wrap
     * @param {function} stepFn a two-arity reducing function
     * @return {transducers.Wrap} a transducer transformer object
     * @example
     *     var t = transducers;
     *     var arrayPush = t.wrap(function(arr, x) { arr.push(x); return arr; });
     */
    /*@ wrap :: forall IN OUT . (stepFn: (result:OUT, input:IN)=>QQ<Immutable, OUT>) => {Wrap<Immutable, IN, OUT> | true} */
    function wrap<IN, OUT>(stepFn: (result:OUT, input:IN)=>QQ<OUT>):Wrap<IN, OUT> {
        //TODO
        // if(typeof stepFn === "function") {
            return new Wrap(stepFn);
        // } else {
        //     return <Wrap<IN, OUT>>stepFn;
        // }
    }

    // =============================================================================
    // Main

    class QQ<T> {
        /*@ __transducers_reduced__ : [Mutable] boolean */
        public __transducers_reduced__:boolean;
        public value:T;

        /*@ new(value:T, isReduced:boolean) => {void | true} */
        constructor(value:T, isReduced:boolean) {
            this.__transducers_reduced__ = isReduced;
            this.value = value;
        }
    }

    /**
     * Return a reduced value. Reduced values short circuit transduce.
     * @method transducers.reduced
     * @param {Object} x any JavaScript value
     * @return {transducers.Reduced} a reduced value
     * @example
     *     var reduced = transducers.reduced(1);
     */
    /*@ reduced :: forall T . (x:T) => {QQ<Immutable, T> | true} */
    function reduced<T>(x:T) {
        return new QQ(x, true);
    }

    /**
     * Check if a value is reduced.
     * @method transducers.isReduced
     * @param {Object} x any JavaScript value
     * @return {Boolean} true if the value is an instance of transducers.Reduced
     *   false otherwise
     * @example
     *     var t = transducers;
     *     t.isReduced(1); // false
     *     t.isReduced(t.reduced(1)); // true
     */
    /*@ isReduced :: forall T . (x:QQ<Immutable, T>) => {boolean | true} */
    function isReduced<T>(x:QQ<T>) {
        return x.__transducers_reduced__; //TODO:(x instanceof Reduced || (x && x.__transducers_reduced__);
    }

    // NOTICE: ensureReduced and unreduced removed as irrelevant to the new formulation of Reduced as QQ

    /*@ deref :: forall T . (x:QQ<Immutable, T>) => {T | true} */
    function deref<T>(x:QQ<T>):T {
        return x.value;
    }

    /**
     * Identity function.
     * @method transducers.identiy
     * @param {Object} x any JavaScript value
     * @return {Object} a JavaScript value
     * @example
     *     transducers.identity(1); // 1
     */
    /*@ identity :: forall T . (x:T) => {T | v = x} */
    function identity<T>(x:T):T {
        return x;
    }
                
            // /**
            //  * Function composition. Take N function and return their composition.
            //  * @method transducers.comp
            //  * @param {Function} varArgs N functions
            //  * @result {Function} a function that represent the composition of the arguments.
            //  * @example
            //  *     var t = transducers;
            //  *     var inc = function(n) { return n + 1 };
            //  *     var double = function(n) { return n * 2 };
            //  *     var incDouble = t.comp(double, inc);
            //  *     incDouble(3); // 8
            //  */
            // transducers.comp = function(varArgs) {
            //     var arglen = arguments.length;
            //     if(arglen == 2) {
            //         var f = arguments[0],
            //             g = arguments[1];
            //         return function(varArgs) {
            //             return f(g.apply(null, transducers.slice(arguments, 0)));
            //         };
            //     } if(arglen > 2) {
            //         return transducers.reduce(transducers.comp, arguments[0], transducers.slice(arguments, 1));
            //     } else {
            //         if(TRANSDUCERS_DEV) {
            //             throw new Error("comp must given at least 2 arguments");
            //         }
            //     }
            // };

    class Map<IN, INTER, OUT, T> implements Transformer<IN, INTER, OUT> {
        public f: (x: IN) => T;
        public xf: Transformer<T, INTER, OUT>;
        /*@ new(f:(x: IN) => T, xf:Transformer<Immutable, T, INTER, OUT>) => {void | true} */
        constructor(f:(x: IN) => T, xf:Transformer<T, INTER, OUT>) {
            this.f = f;
            this.xf = xf;
        }

        /*@ init : () : {INTER | true} */
        init():INTER {
            return this.xf.init();
        }
        /*@ result : (result:INTER) : {OUT | true} */
        result(result:INTER):OUT {
            return this.xf.result(result);
        }
        /*@ step : (result:INTER, input:IN) : {QQ<Immutable, INTER> | true} */
        step(result:INTER, input:IN):QQ<INTER> {
            return this.xf.step(result, this.f(input));
        }
    }

    /**
     * Mapping transducer constructor
     * @method transducers.map 
     * @param {Function} f the mapping operation
     * @return {transducers.Map} returns a mapping transducer
     * @example
     *     var t = transducers;
     *     var inc = function(n) { return n+1; };
     *     var xf = t.map(inc);
     *     t.into([], xf, [1,2,3]); // [2,3,4]
     */
    /*@ map :: forall IN INTER OUT T . (f: (z:IN)=>T) => {(xf: Transformer<Immutable, T, INTER, OUT>) => Map<Immutable, IN, INTER, OUT, T> | true} */
    function map<IN, INTER, OUT, T>(f: (z:IN)=>T): (xf: Transformer<T, INTER, OUT>) => Map<IN, INTER, OUT, T> {
        if(TRANSDUCERS_DEV && (f === null)) {
            throw new Error("At least one argument must be supplied to map");
        } else {
            return function(xf) 
                /*@ <anonymous> (xf: Transformer<Immutable, T, INTER, OUT>) => {Map<Immutable, IN, INTER, OUT, T> | true} */ 
                { return new Map(f, xf); };
        }
    }

    class Filter<IN, INTER, OUT> implements Transformer<IN, INTER, OUT> {
        public pred: (z:IN) => boolean;
        public xf: Transformer<IN, INTER, OUT>;
        /*@ new(pred:(z:IN) => boolean, xf:Transformer<Immutable, IN, INTER, OUT>) => {void | true} */
        constructor(pred: (z:IN) => boolean, xf: Transformer<IN, INTER, OUT>) {
            this.pred = pred;
            this.xf = xf;
        }

        /*@ init : () : {INTER | true} */
        init():INTER {
            return this.xf.init();
        }
        /*@ result : (result:INTER) : {OUT | true} */
        result(result:INTER):OUT {
            return this.xf.result(result);
        }
        /*@ step : (result:INTER, input:IN) : {QQ<Immutable, INTER> | true} */
        step(result:INTER, input:IN):QQ<INTER> {
            if(this.pred(input)) {
                return this.xf.step(result, input);
            } else {
                return new QQ(result, false);
            }
        }
    }

    /**
     * Filtering transducer constructor
     * @method transducers.filter
     * @param {Function} pred a predicate function
     * @return {transducers.Filter} returns a filtering transducer
     * @example
     *     var t = transducers;
     *     var isEven = function(n) { return n % 2 == 0; };
     *     var xf = t.filter(isEven);
     *     t.into([], xf, [0,1,2,3,4]); // [0,2,4];
     */
    /*@ filter :: forall IN INTER OUT . (pred: (z:IN)=>boolean) => {(xf: Transformer<Immutable, IN, INTER, OUT>) => Filter<Immutable, IN, INTER, OUT> | true} */
    function filter<IN, INTER, OUT>(pred: (z:IN)=>boolean): (xf: Transformer<IN, INTER, OUT>) => Filter<IN, INTER, OUT> {
        if(TRANSDUCERS_DEV && (typeof pred != "function")) {
            throw new Error("filter must be given a function");
        } else {
            return function(xf) {
                return new Filter(pred, xf);
            };
        }
    }

            // /**
            //  * Similar to filter except the predicate is used to
            //  * eliminate values.
            //  * @method transducers.remove 
            //  * @param {Function} pred a predicate function
            //  * @return {transducers.Filter} returns a removing transducer
            //  * @example
            //  *     var t = transducers;
            //  *     var isEven = function(n) { return n % 2 == 0; };
            //  *     var xf = t.remove(isEven);
            //  *     t.into([], xf, [0,1,2,3,4]); // [1,3];
            //  */
            // transducers.remove = function(pred) {
            //     if(TRANSDUCERS_DEV && (typeof pred != "function")) {
            //         throw new Error("remove must be given a function");
            //     } else {
            //         return transducers.filter(transducers.complement(pred));
            //     }
            // };

    class Take<IN, INTER, OUT> implements Transformer<IN, INTER, OUT> {
        /*@ n : [Mutable] number */
        public n: number;
        public xf: Transformer<IN, INTER, OUT>;
        /*@ new(n:number, xf:Transformer<Immutable, IN, INTER, OUT>) => {void | true} */
        constructor(n:number, xf:Transformer<IN, INTER, OUT>) {
            this.n = n;
            this.xf = xf;
        }

        /*@ init : () : {INTER | true} */
        init():INTER {
            return this.xf.init();
        }
        /*@ result : (result:INTER) : {OUT | true} */
        result(result:INTER):OUT {
            return this.xf.result(result);
        }
        /*@ step : (result:INTER, input:IN) : {QQ<Immutable, INTER> | true} */
        step(result:INTER, input:IN):QQ<INTER> {
            if(this.n > 0) {
                var retval1 = this.xf.step(result, input);
                this.n--;
                return retval1;
            }
            var retval2:QQ<INTER> = reduced(result); //TODO: modified semantics here...
            this.n--;
            return retval2;
        }
    }

    /**
     * A take transducer constructor. Will take n values before
     * returning a reduced result.
     * @method transducers.take
     * @param {Number} n the number of inputs to receive.
     * @return {transducers.Take} a take transducer
     * @example
     *     var t = transducers;
     *     var xf = t.take(3);
     *     t.into([], xf, [0,1,2,3,4,5]); // [0,1,2];
     */
    /*@ take :: forall IN INTER OUT . (n:number) => {(xf: Transformer<Immutable, IN, INTER, OUT>) => Take<Immutable, IN, INTER, OUT> | true} */
    function take<IN, INTER, OUT>(n:number): (xf: Transformer<IN, INTER, OUT>) => Take<IN, INTER, OUT> {
        if(TRANSDUCERS_DEV && (typeof n != "number")) {
            throw new Error("take must be given an integer");
        } else {
            return function(xf) {
                return new Take(n, xf);
            };
        }
    }

    class TakeWhile<IN, INTER, OUT> implements Transformer<IN, INTER, OUT> {
        public pred: (z:IN) => boolean;
        public xf: Transformer<IN, INTER, OUT>;
        /*@ new(pred:(z:IN) => boolean, xf:Transformer<Immutable, IN, INTER, OUT>) => {void | true} */
        constructor(pred: (z:IN) => boolean, xf: Transformer<IN, INTER, OUT>) {
            this.pred = pred;
            this.xf = xf;
        }

        /*@ init : () : {INTER | true} */
        init():INTER {
            return this.xf.init();
        }
        /*@ result : (result:INTER) : {OUT | true} */
        result(result:INTER):OUT {
            return this.xf.result(result);
        }
        /*@ step : (result:INTER, input:IN) : {QQ<Immutable, INTER> | true} */
        step(result:INTER, input:IN):QQ<INTER> {
            if(this.pred(input)) {
                return this.xf.step(result, input);
            } else {
                return reduced(result);
            }
        }
    }

    /**
     * Like the take transducer except takes as long as the pred
     * return true for inputs.
     * @method transducers.takeWhile
     * @param {Function} pred a predicate function
     * @return {transducers.TakeWhile} a takeWhile transducer
     * @example
     *     var t = transducers;
     *     var xf = t.takeWhile(function(n) { return n < 3; });
     *     t.into([], xf, [0,1,2,3,4,5]); // [0,1,2];
     */
    /*@ takeWhile :: forall IN INTER OUT . (pred: (z:IN)=>boolean) => {(xf: Transformer<Immutable, IN, INTER, OUT>) => TakeWhile<Immutable, IN, INTER, OUT> | true} */
    function takeWhile<IN, INTER, OUT>(pred: (z:IN)=>boolean): (xf: Transformer<IN, INTER, OUT>) => TakeWhile<IN, INTER, OUT> {
        if(TRANSDUCERS_DEV && (typeof pred != "function")) {
            throw new Error("takeWhile must given a function");
        } else {
            return function(xf) {
                return new TakeWhile(pred, xf);
            };
        }
    }

    class TakeNth<IN, INTER, OUT> implements Transformer<IN, INTER, OUT> {
        /*@ i : [Mutable] number */
        public i: number;
        public n: number;
        public xf: Transformer<IN, INTER, OUT>;
        /*@ new(n:number, xf:Transformer<Immutable, IN, INTER, OUT>) => {void | true} */        
        constructor(n:number, xf:Transformer<IN, INTER, OUT>) {
            this.i = -1;
            this.n = n;
            this.xf = xf;
        }

        /*@ init : () : {INTER | true} */
        init():INTER {
            return this.xf.init();
        }
        /*@ result : (result:INTER) : {OUT | true} */
        result(result:INTER):OUT {
            return this.xf.result(result);
        }
        /*@ step : (result:INTER, input:IN) : {QQ<Immutable, INTER> | true} */
        step(result:INTER, input:IN):QQ<INTER> {
            this.i++;
            if((this.i % this.n) === 0) {
                return this.xf.step(result, input);
            } else {
                return new QQ(result, false);
            }
        }
    }

    /**
     * A transducer that takes every Nth input
     * @method transducers.takeNth
     * @param {Number} n an integer
     * @return {transducers.TakeNth} a takeNth transducer
     * @example
     *     var t = transducers;
     *     var xf = t.takeNth(3);
     *     t.into([], xf, [0,1,2,3,4,5]); // [2,5];
     */
    /*@ takeNth :: forall IN INTER OUT . (n:number) => {(xf: Transformer<Immutable, IN, INTER, OUT>) => TakeNth<Immutable, IN, INTER, OUT> | true} */
    function takeNth<IN, INTER, OUT>(n:number): (xf: Transformer<IN, INTER, OUT>) => TakeNth<IN, INTER, OUT> {
        if(TRANSDUCERS_DEV && (typeof n != "number")) {
            throw new Error("takeNth must be given a number");
        } else {
            return function(xf) {
                return new TakeNth(n, xf);
            };
        }
    }

    // no maps in JS, perhaps define only if transit or
    // Map available? - David

    class Drop<IN, INTER, OUT> implements Transformer<IN, INTER, OUT> {
        /*@ n : [Mutable] number */
        public n: number;
        public xf: Transformer<IN, INTER, OUT>;
        /*@ new(n:number, xf:Transformer<Immutable, IN, INTER, OUT>) => {void | true} */        
        constructor(n:number, xf:Transformer<IN, INTER, OUT>) {
            this.n = n;
            this.xf = xf;
        }

        /*@ init : () : {INTER | true} */
        init():INTER {
            return this.xf.init();
        }
        /*@ result : (result:INTER) : {OUT | true} */
        result(result:INTER):OUT {
            return this.xf.result(result);
        }
        /*@ step : (result:INTER, input:IN) : {QQ<Immutable, INTER> | true} */
        step(result:INTER, input:IN):QQ<INTER> {
            if(this.n > 0) {
                this.n--;
                return new QQ(result, false);
            } else {
                return this.xf.step(result, input);
            }
        }
    }

    /**
     * A dropping transducer constructor
     * @method transducers.drop
     * @param {Number} n an integer, the number of inputs to drop.
     * @return {transducers.Drop} a dropping transducer
     * @example
     *     var t = transducers;
     *     var xf = t.drop(3);
     *     t.into([], xf, [0,1,2,3,4,5]); // [3,4,5];
     */
    /*@ drop :: forall IN INTER OUT . (n:number) => {(xf: Transformer<Immutable, IN, INTER, OUT>) => Drop<Immutable, IN, INTER, OUT> | true} */
    function drop<IN, INTER, OUT>(n:number): (xf: Transformer<IN, INTER, OUT>) => Drop<IN, INTER, OUT> {
        if(TRANSDUCERS_DEV && (typeof n !== "number")) {
            throw new Error("drop must be given an integer");
        } else {
            return function(xf) {
                return new Drop(n, xf);
            };
        }
    }

    class DropWhile<IN, INTER, OUT> implements Transformer<IN, INTER, OUT> {
        /*@ drop : [Mutable] boolean */
        public drop: boolean;
        public pred: (z:IN) => boolean;
        public xf: Transformer<IN, INTER, OUT>;
        /*@ new(pred:(z:IN) => boolean, xf:Transformer<Immutable, IN, INTER, OUT>) => {void | true} */
        constructor(pred: (z:IN) => boolean, xf: Transformer<IN, INTER, OUT>) {
            this.drop = true;
            this.pred = pred;
            this.xf = xf;
        }

        /*@ init : () : {INTER | true} */
        init():INTER {
            return this.xf.init();
        }
        /*@ result : (result:INTER) : {OUT | true} */
        result(result:INTER):OUT {
            return this.xf.result(result);
        }
        /*@ step : (result:INTER, input:IN) : {QQ<Immutable, INTER> | true} */
        step(result:INTER, input:IN):QQ<INTER> {
            if(this.drop && this.pred(input)) {
                return new QQ(result, false);
            } else {
                if(this.drop) this.drop = false;
                return this.xf.step(result, input);
            }
        }
    }

    /**
     * A dropping transducer that drop inputs as long as
     * pred is true.
     * @method transducers.dropWhile
     * @param {Function} pred a predicate function
     * @return {transducers.DropWhile} a dropWhile transducer
     * @example
     *     var t = transducers;
     *     var xf = t.dropWhile(function(n) { return n < 3; });
     *     t.into([], xf, [0,1,2,3,4,5]); // [3,4,5];
     */
    /*@ dropWhile :: forall IN INTER OUT . (pred: (z:IN)=>boolean) => {(xf: Transformer<Immutable, IN, INTER, OUT>) => DropWhile<Immutable, IN, INTER, OUT> | true} */
    function dropWhile<IN, INTER, OUT>(pred: (z:IN)=>boolean): (xf: Transformer<IN, INTER, OUT>) => DropWhile<IN, INTER, OUT> {
        if(TRANSDUCERS_DEV && (typeof pred != "function")) {
            throw new Error("dropWhile must be given a function");
        } else {
            return function(xf) {
                return new DropWhile(pred, xf);
            };
        }
    }

    var NONE = {};

    class PartitionBy<IN, INTER, OUT> implements Transformer<IN, INTER, OUT> {
        public f: (z:IN) => any;
        public xf: Transformer<Array<IN>, INTER, OUT>;
        /*@ a : [Mutable] Array<Mutable, IN> */
        public a: Array<IN>;
        /*@ pval : [Mutable] top */
        public pval: any;
        /*@ new(f:(z:IN) => top, xf:Transformer<Immutable, Array<Mutable,IN>, INTER, OUT>) => {void | true} */
        constructor(f: (z:IN) => any, xf: Transformer<Array<IN>, INTER, OUT>) {
            this.f = f;
            this.xf = xf;
            this.a = [];
            this.pval = NONE;
        }

        /*@ init : () : {INTER | true} */
        init():INTER {
            return this.xf.init();
        }
        /*@ result : (result:INTER) : {OUT | true} */
        result(result:INTER):OUT {
            if(this.a.length > 0) {
                result = this.xf.step(result, this.a).value;
                this.a = [];
            }
            return this.xf.result(result);
        }
        /*@ step : (result:INTER, input:IN) : {QQ<Immutable, INTER> | true} */
        step(result:INTER, input:IN):QQ<INTER> {
            var pval = this.pval,
                val  = this.f(input);

            this.pval = val;

            // NOTE: we should probably allow someone to define
            // equality? - David
            if((pval === NONE) ||
               (pval === val)) {
                this.a.push(input);
                return new QQ(result, false);
            } else {
                var ret = this.xf.step(result, this.a);
                this.a = [];
                if(!isReduced(ret)) {
                    this.a.push(input);
                }
                return ret;
            }
        }
    }

    /**
     * A partitioning transducer. Collects inputs into
     * arrays as long as predicate remains true for contiguous
     * inputs.
     * @method transducers.partitionBy
     * @param {Function} f a partition function. When the result
     *   for an input changes from the previous result will create
     *   a partition.
     * @return {transducers.PartitionBy} a partitionBy transducer
     * @example
     *     var t = transducers;
     *     var xf = t.partitionBy(function(x) { return typeof x == "string"; });
     *     t.into([], xf, [0,1,"foo","bar",2,3,"bar","baz"]); // [[0,1],["foo","bar"],[2,3],["bar","baz"]];
     */
    /*@ partitionBy :: forall IN INTER OUT . (f: (z:IN)=>top) => {(xf: Transformer<Immutable, Array<Mutable, IN>, INTER, OUT>) => PartitionBy<Immutable, IN, INTER, OUT> | true} */
    function partitionBy<IN, INTER, OUT>(f: (z:IN)=>any): (xf: Transformer<Array<IN>, INTER, OUT>) => PartitionBy<IN, INTER, OUT> {
        if(TRANSDUCERS_DEV && (typeof f != "function")) {
            throw new Error("partitionBy must be given an function");
        } else {
            return function(xf) {
                return new PartitionBy(f, xf);
            };
        }
    }

    class PartitionAll<IN, INTER, OUT> implements Transformer<IN, INTER, OUT> {
        public n: number;
        public xf: Transformer<Array<IN>, INTER, OUT>;
        /*@ a : [Mutable] Array<Mutable, IN> */
        public a: Array<IN>;
        /*@ new(n:number, xf:Transformer<Immutable, Array<Mutable,IN>, INTER, OUT>) => {void | true} */        
        constructor(n:number, xf:Transformer<Array<IN>, INTER, OUT>) {
            this.n = n;
            this.xf = xf;
            this.a = [];
        }

        /*@ init : () : {INTER | true} */
        init():INTER {
            return this.xf.init();
        }
        /*@ result : (result:INTER) : {OUT | true} */
        result(result:INTER):OUT {
            if(this.a.length > 0) {
                result = this.xf.step(result, this.a).value;
                this.a = [];
            }
            return this.xf.result(result);
        }
        /*@ step : (result:INTER, input:IN) : {QQ<Immutable, INTER> | true} */
        step(result:INTER, input:IN):QQ<INTER> {
            this.a.push(input);
            if(this.n === this.a.length) {
                var a = this.a;
                this.a = [];
                return this.xf.step(result, a);
            } else {
                return new QQ(result, false);
            }
        }
    }

    /**
     * A partitioning transducer. Collects inputs into
     * arrays of size N.
     * @method transducers.partitionAll
     * @param {Number} n an integer
     * @return {transducers.PartitionAll} a partitionAll transducer
     * @example
     *     var t = transducers;
     *     var xf = t.partitionAll(3);
     *     t.into([], xf, [0,1,2,3,4,5]); // [[0,1,2],[3,4,5]]
     */
    /*@ partitionAll :: forall IN INTER OUT . (n:number) => {(xf: Transformer<Immutable, Array<Mutable, IN>, INTER, OUT>) => PartitionAll<Immutable, IN, INTER, OUT> | true} */
    function partitionAll<IN, INTER, OUT>(n:number): (xf: Transformer<Array<IN>, INTER, OUT>) => PartitionAll<IN, INTER, OUT> {
        if(TRANSDUCERS_DEV && (typeof n != "number")) {
            throw new Error("partitionAll must be given a number");
        } else {
            return function(xf) {
                return new PartitionAll(n, xf);
            };
        }
    }

    class Keep<IN, INTER, OUT> implements Transformer<IN, INTER, OUT> {
        public f: (z:IN) => any;
        public xf: Transformer<IN, INTER, OUT>;
        /*@ new(f:(z:IN) => top, xf:Transformer<Immutable, IN, INTER, OUT>) => {void | true} */
        constructor(f: (z:IN) => any, xf: Transformer<IN, INTER, OUT>) {
            this.f = f;
            this.xf = xf;
        }

        /*@ init : () : {INTER | true} */
        init():INTER {
            return this.xf.init();
        }
        /*@ result : (result:INTER) : {OUT | true} */
        result(result:INTER):OUT {
            return this.xf.result(result);
        }
        /*@ step : (result:INTER, input:IN) : {QQ<Immutable, INTER> | true} */
        step(result:INTER, input:IN):QQ<INTER> {
            var v = this.f(input);
            if(v === null) {
                return new QQ(result, false);
            } else {
                return this.xf.step(result, input);
            }
        }
    }

    /**
     * A keeping transducer. Keep inputs as long as the provided
     * function does not return null or undefined.
     * @method transducers.keep
     * @param {Function} f a function
     * @return {transducers.Keep} a keep transducer
     * @example
     *     var t = transducers;
     *     var xf = t.keep(function(x) { if(typeof x == "string") return "cool"; });
     *     t.into([], xf, [0,1,"foo",3,4,"bar"]); // ["foo","bar"]
     */
    /*@ keep :: forall IN INTER OUT . (f: (z:IN)=>top) => {(xf: Transformer<Immutable, IN, INTER, OUT>) => Keep<Immutable, IN, INTER, OUT> | true} */
    function keep<IN, INTER, OUT>(f: (z:IN)=>any): (xf: Transformer<IN, INTER, OUT>) => Keep<IN, INTER, OUT> {
        if(TRANSDUCERS_DEV && (typeof f != "function")) {
            throw new Error("keep must be given a function");
        } else {
            return function(xf) {
                return new Keep(f, xf);
            };
        }
    }

    class KeepIndexed<IN, INTER, OUT> implements Transformer<IN, INTER, OUT> {
        /*@ i : [Mutable] number */
        public i: number;
        public f: (idx:number, z:IN) => any;
        public xf: Transformer<IN, INTER, OUT>;
        /*@ new(f:(idx:number, z:IN) => top, xf:Transformer<Immutable, IN, INTER, OUT>) => {void | true} */
        constructor(f: (idx:number, z:IN) => any, xf: Transformer<IN, INTER, OUT>) {
            this.i = -1;
            this.f = f;
            this.xf = xf;
        }

        /*@ init : () : {INTER | true} */
        init():INTER {
            return this.xf.init();
        }
        /*@ result : (result:INTER) : {OUT | true} */
        result(result:INTER):OUT {
            return this.xf.result(result);
        }
        /*@ step : (result:INTER, input:IN) : {QQ<Immutable, INTER> | true} */
        step(result:INTER, input:IN):QQ<INTER> {
            this.i++;
            var v:any = this.f(this.i, input);
            if(v === null) {
                return new QQ(result, false);
            } else {
                return this.xf.step(result, input);
            }
        }
    }

    /**
     * Like keep but the provided function will be passed the
     * index as the first argument.
     * @method transducers.keepIndexed
     * @param {Function} f a function
     * @return {transducers.KeepIndexed} a keepIndexed transducer
     * @example
     *     var t = transducers;
     *     var xf = t.keepIndexed(function(i, x) { if(typeof x == "string") return "cool"; });
     *     t.into([], xf, [0,1,"foo",3,4,"bar"]); // ["foo","bar"]
     */
    /*@ keepIndexed :: forall IN INTER OUT . (f: (idx:number, z:IN)=>top) => {(xf: Transformer<Immutable, IN, INTER, OUT>) => KeepIndexed<Immutable, IN, INTER, OUT> | true} */
    function keepIndexed<IN, INTER, OUT>(f: (idx:number, z:IN)=>any): (xf: Transformer<IN, INTER, OUT>) => KeepIndexed<IN, INTER, OUT> {
        if(TRANSDUCERS_DEV && (typeof f != "function")) {
            throw new Error("keepIndexed must be given a function");
        } else {
            return function(xf) {
                return new KeepIndexed(f, xf);
            };
        }
    }

    // randomSample
    // iteration

            // /**
            //  * Given a transformer returns a transformer which preserves
            //  * reduced by wrapping one more time. See cat.
            //  * @method transducers.preservingReduced
            //  * @param {transformer} xf a transformer
            //  * @return {transformer} a transformer which preserves reduced
            //  */
            // /*@ preservingReduced :: forall IN INTER OUT . (xf: Transformer<Immutable, IN, INTER, OUT>) => {Transformer<Immutable, IN, INTER, OUT> | true} */
            // function preservingReduced<IN, INTER, OUT>(xf: Transformer<IN, INTER, OUT>) {
            //     return {
            //         init: function() {
            //             return xf.init();
            //         },
            //         result: function(result:OUT) {
            //             return result;
            //         },
            //         step: function(result:OUT, input:IN) {
            //             var ret = xf.step(result, input);
            //             if(isReduced(ret)) {
            //                 return reduced(ret);
            //             } else {
            //                 return new QQ(ret, false);
            //             }
            //         }
            //     }
            // }

            // /**
            //  * Given a transformer return a concatenating transformer
            //  * @method transducers.cat
            //  * @param {transformer} xf a transformer
            //  * @return {transformer} a concatenating transformer
            //  */
            // function cat<IN, INTER, OUT>(xf: Transformer<IN, INTER, OUT>) {
            //     var rxf = preservingReduced(xf);
            //     return {
            //         init: function() {
            //             return xf.init();
            //         },
            //         result: function(result:INTER) {
            //             return xf.result(result);
            //         },
            //         step: function(result:INTER, input:IN) {
            //             return reduce(rxf, result, input);
            //         }
            //     }
            // }

            // /**
            //  * A mapping concatenating transformer
            //  * @method transducers.mapcat
            //  * @param {Function} f the mapping function
            //  * @return {Transducer} a mapping concatenating transducer
            //  * @example
            //  *     var t = transducers;
            //  *     var reverse = function(arr) { var arr = Array.prototype.slice.call(arr, 0); arr.reverse(); return arr; }
            //  *     var xf = t.mapcat(reverse);
            //  *     t.into([], xf, [[3,2,1],[6,5,4]]); // [1,2,3,4,5,6]
            //  */
            // transducers.mapcat = function(f) {
            //     return transducers.comp(transducers.map(f), transducers.cat);
            // };

    /*@ stringReduce :: forall INTER OUT . (xf:Transformer<Immutable, string, INTER, OUT>, init:INTER, str:string) => {OUT | true} */
    function stringReduce<INTER, OUT>(xf:Transformer<string, INTER, OUT>, init:INTER, str:string) {
        var acc = init;
        var shouldBreak = false;
        for(var i = 0; i < str.length; i++) {
            var wrappedAcc = xf.step(acc, str.charAt(i));
            shouldBreak = isReduced(wrappedAcc);
            acc = deref(wrappedAcc);
        }
        return xf.result(acc);
    }

    /*@ arrayReduce :: forall IN INTER OUT . (xf:Transformer<Immutable, IN, INTER, OUT>, init:INTER, array:Array<Immutable, IN>) => {OUT | true} */
    function arrayReduce<IN, INTER, OUT>(xf:Transformer<IN, INTER, OUT>, init:INTER, array:IN[]) {
        var acc = init;
        var shouldBreak = false;
        for(var i = 0; i < array.length && !shouldBreak; i++) {
            var wrappedAcc = xf.step(acc, array[i]);
            shouldBreak = isReduced(wrappedAcc);
            acc = deref(wrappedAcc);
        }
        return xf.result(acc);
    }

            // /*@ objectReduce :: forall INTER OUT . (xf:Transformer<Immutable, Array<Immutable, top>, INTER, OUT>, init:INTER, ob:{[key:string]:top}) => {OUT | true} */
            // function objectReduce<INTER, OUT>(xf:Transformer<any[], INTER, OUT>, init:INTER, ob:{[key:string]:any}) {
            //     var acc = init;
            //     var shouldBreak = false;
            //     for(var p in ob) {
            //         if(ob.hasOwnProperty(p)) {
            //             var wrappedAcc = xf.step(acc, [p, ob[p]]);
            //             shouldBreak = isReduced(wrappedAcc);
            //             acc = deref(wrappedAcc);
            //         }
            //     }
            //     return xf.result(acc);
            // }

            // transducers.iterableReduce = function(xf, init, iter) {
            //     if(iter["@@iterator"]) {
            //         iter = iter["@@iterator"]();
            //     }

            //     var acc  = init,
            //         step = iter.next();
                
            //     while(!step.done) {
            //         acc = xf.step(acc, step.value);
            //         if(transducers.isReduced(acc)) {
            //             acc = transducers.deref(acc);
            //             break;
            //         }
            //         step = iter.next();
            //     }

            //     return xf.result(acc);
            // };

    /**
     * Given a transducer, an intial value and a 
     * collection - returns the reduction.
     * @method transducers.reduce
     * @param {Transducer|Function} xf a transducer or two-arity function
     * @param {Object} init any JavaScript value
     * @param {String|Array|Object|Iterable} coll any iterable JavaScript value
     * @return {Object} a iterable JavaScript value: string, array
     *   iterable, or object.
     */
    /*@ reduce :: forall IN INTER OUT . (xf: Transformer<Immutable, IN, INTER, OUT>, init:INTER, coll:Array<Immutable, IN>) => {OUT | true} */
    function reduce(xf:any, init:any, coll:any):any {
        // if(coll) {
        //     xf = typeof xf === "function" ? wrap(xf) : xf;
        //     if(isString(coll)) {
        //         return stringReduce(xf, init, coll);
        //     } else if(isArray(coll)) {
                return arrayReduce(xf, init, coll);
        //     } else if(isIterable(coll)) {
        //         return iterableReduce(xf, init, coll);
        //     } else if(isObject(coll)) {
        //         return objectReduce(xf, init, coll);
        //     } else {
        //         throw new Error("Cannot reduce instance of " + coll.constructor.name);
        //     }
        // }
        // return undefined
    }

            // /**
            //  * Given a transducer, a builder function, an initial value
            //  * and a iterable collection - returns the reduction.
            //  * collection - returns the reduction.
            //  * @method transducers.transduce
            //  * @param {Transducer} xf a transducer
            //  * @param {Transducer|Function} f a transducer or two-arity function
            //  * @param {Object} init any JavaScript value
            //  * @param {String|Array|Object|Iterable} coll any iterable JavaScript value
            //  * @return {Object} a JavaScript value.
            //  * @example
            //  *     var t = transducers;
            //  *     var inc = function(n) { return n+1; };
            //  *     var isEven = function(n) { return n % 2 == 0; };
            //  *     var apush = function(arr,x) { arr.push(x); return arr; };
            //  *     var xf = t.comp(t.map(inc),t.filter(isEven));
            //  *     t.transduce(xf, apush, [], [1,2,3,4]); // [2,4]
            //  */
            // function transduce(xf:any, f:any, init:any, coll:any) {
            //     f = typeof f === "function" ? wrap(f) : f;
            //     xf = xf(f);
            //     return reduce(xf, init, coll);
            // }

            // transducers.stringAppend = function(string, x) {
            //     return string + x;
            // };

    /*@ arrayPush :: forall T . (arr:Array<Mutable, T>, x:T) => {Array<Mutable, T> | true} */
    function arrayPush<T>(arr:T[], x:T) {
        arr.push(x);
        return arr;
    }

            // transducers.addEntry = function(obj, entry) {
            //     obj[entry[0]] = entry[1];
            //     return obj;
            // };

            // /**
            //  * Reduce a value into the given empty value using a transducer.
            //  * @method transducers.into
            //  * @param {String|Array|Object} empty a JavaScript collection
            //  * @param {Transducer} xf a transducer
            //  * @param {Iterable} coll any iterable JavaScript value: array, string,
            //  *   object, or iterable.
            //  * @return {Object} a JavaScript value.
            //  * @example
            //  *     var t = transducers;
            //  *     var inc = function(n) { return n+1; };
            //  *     var isEven = function(n) { return n % 2 == 0; };
            //  *     var apush = function(arr,x) { arr.push(x); return arr; };
            //  *     var xf = t.comp(t.map(inc),t.filter(isEven));
            //  *     t.into([], xf, [1,2,3,4]); // [2,4]
            //  */
            // transducers.into = function(empty, xf, coll) {
            //     if(transducers.isString(empty)) {
            //         return transducers.transduce(xf, transducers.stringAppend, empty, coll);
            //     } else if(transducers.isArray(empty)) {
            //         return transducers.transduce(xf, transducers.arrayPush, empty, coll);
            //     } else if(transducers.isObject(empty)) {
            //         return transducers.transduce(xf, transducers.addEntry, empty, coll);
            //     }
            // };

    class Completing<IN, INTER, OUT> implements Transformer<IN, INTER, OUT> {
        public cf: (z:INTER) => OUT;
        public xf: Transformer<IN, INTER, any>;
        /*@ new(cf:(z:INTER) => OUT, xf:Transformer<Immutable, IN, INTER, top>) => {void | true} */
        constructor(cf: (z:INTER) => OUT, xf: Transformer<IN, INTER, any>) {
            this.cf = cf;
            this.xf = xf;
        }

        /*@ init : () : {INTER | true} */
        init():INTER {
            return this.xf.init();
        }
        /*@ result : (result:INTER) : {OUT | true} */
        result(result:INTER):OUT {
            return this.cf(result);
        }
        /*@ step : (result:INTER, input:IN) : {QQ<Immutable, INTER> | true} */
        step(result:INTER, step:IN):QQ<INTER> {
            return this.xf.step(result, step);
        }
    }

            // /**
            //  * A completing transducer constructor. Useful to provide cleanup
            //  * logic at the end of a reduction/transduction.
            //  * @method transducers.completing
            //  * @param {Transducer} xf a transducer
            //  * @param {Function} cf a function to apply at the end of the reduction/transduction
            //  * @return {Transducer} a transducer
            //  */
            // function completing<IN, INTER, OUT>(xf: any, cf: (z:INTER) => OUT): Completing<IN, INTER, OUT> {
            //     var wxf:Transformer<IN, INTER, OUT> = typeof xf === "function" ? wrap(xf) : xf;
            //     cf = cf || identity;
            //     if(TRANSDUCERS_DEV && (wxf != null) && !isObject(wxf)) {
            //         throw new Error("completing must be given a transducer as first argument");
            //     } else {
            //         return new Completing(cf, wxf);
            //     }
            // }

            /**
             * Convert a transducer transformer object into a function so
             * that it can be used with existing reduce implementation i.e. native,
             * Underscore, lodash
             * @method transducers.toFn
             * @param {Transducer} xf a transducer
             * @param {Function} builder a function which take the accumulator and the
             *   the next input and return a new accumulator value.
             * @return {Function} a two-arity function compatible with existing reduce
             *   implementations
             * @example
             *     var t = transducers;
             *     var arr = [0,1,2,3,4,5],
             *     var apush = function(arr, x) { arr.push(x); return arr; },
             *     var xf = t.comp(t.map(inc),t.filter(isEven));
             *     arr.reduce(t.toFn(xf, apush), []); // [2,4,6]
             */
            // function toFn<IN, INTER, OUT>(xf: Transducer<IN, INTER, OUT>, builder:any) {
            //     if(typeof builder === "function") {
            //         builder = wrap(builder);
            //     }
            //     var rxf = xf(builder);
            //     return rxf.step.bind(rxf);
            // }

    // =============================================================================
    // Utilities

    /**
     * A transformer which simply returns the first input.
     * @method transducers.first
     * @return {Transducer} a transducer transformer
     */
    var first:Wrap<any, any> = wrap(function(result:any, input:any) 
        /*@ <anonymous> (result:top, input:top) => {QQ<Immutable, top> | true} */ 
        { return reduced(input); }
    );

    // =============================================================================
    // Exporting
    // NOTICE: this section was removed as irrelevant to the JS->RS port
}
