## Things in d3 that refscript does not handle yet (with example source files):

  - optional parameters like 'end' in 'substring' (core/vendor.ts:6)
  - `(<Array<T>>[]).slice` (core/array.ts)
  - `in` expressions (core/vendor.ts)
  - EventTarget (selection/* ??)
  - Date (time/time.ts)
  - window and document (core/document.ts)
  - Cannot call 'toRsExp' on SyntaxKind CommaExpression (arrays/shuffle.ts:6)


## Done

```
src-ts/
  arrays/
    ascending.ts
    descending.ts
    min.ts
    max.ts
    permute.ts
    merge.ts
    keys.ts
    shuffle.ts
    pairs.ts
    quantile.ts
    sum.ts              [overload, isNan, HOF]
    zip.ts              [TODO: https://github.com/UCSD-PL/RefScript/issues/32]
    mean.ts             [isNaN]
    median.ts           [isNan, TODO: #39,#40]
    extent.ts
```


## Issues

- [#39](https://github.com/UCSD-PL/RefScript/issues/39)
- [#40](https://github.com/UCSD-PL/RefScript/issues/40)

## Interesting Features

* type test (isNan, d3_number)
* overloads and dynamic-arguments-check
* arithmetic array index invariants 


## Code Transforms

You can transform

	var i = -1;
    while (cond (++i)){ body(i) }

Into 

    var i = 0 
    while(cond(i)){
	  body(i)
      i++;
    }
  
