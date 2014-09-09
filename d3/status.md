## Things in d3 that refscript does not handle yet (with example source files):

optional parameters like 'end' in 'substring' (core/vendor.ts:6)
(<Array<T>>[]).slice (core/array.ts)
"in" expressions (core/vendor.ts)
EventTarget (selection/* ??)
Date (time/time.ts)
window and document (core/document.ts)
Cannot call 'toRsExp' on...
    SyntaxKind BitwiseOrExpression (arrays/shuffle.ts:5)
    SyntaxKind CommaExpression (arrays/shuffle.ts:6)
    SyntaxKind PlusExpression (arrays/quantile.ts:7)


## Done

    src-ts/arrays/ascending.ts
    src-ts/arrays/descending.ts
    src-ts/arrays/min.ts
    src-ts/arrays/permute.ts



-----------------------------------------
## From old `TODO.markdown` file

#### JS -> TS

    + extent.js	 // dynamic check on the number of arguments
    + median.js	 // dynamic check on the number of arguments 
    + index.js	 // multiple imports dependent on functionality of unstable files
    + nest.js	 // Strange and large requires greater familiarity with ts


#### TS -> RS 

    + min.js, mean.js, max.ts, sum.js   // difficulty with overloaded functions; dynamic check on the number of arguments
    + entries.ts	                    // clones dictionaries.


**Todo**

    transpose.ts [zip.ts]

    6    21    170    values.ts
    6    23    163    keys.ts
    6    26    193    entries.ts
    6    26    218    permute.ts
    7    50    239    pairs.ts
    9    39    245    shuffle.ts
    10   50    324    quantile.ts

    15   56    356    sum.ts
    15   102   499    max.ts
    15   102   530    min.ts
    16   65    432    zip.ts
    16   73    421    mean.ts
    20   73    618    median.ts
    22   59    409    merge.ts
    23   129   647    possibleExtent.ts
    24   96    832    index.ts
    26   122   768    range.ts
    27   148   736    extent.ts
    29   96    735    set.ts
    50   201   1214   bisect.ts
    67   213   1894   map.ts
    99   258   2179   nest.ts
    555  2230  14937  total

