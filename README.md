##Misc benchmarks for [RefScript](https://github.com/UCSD-PL/RefScript)

### Run

To run all tests:
```
$ make all
```

To run tests in a particular project (e.g. `d3`): 
```
$ make d3
```

To clean the output files:
```
$ make clean
```


### Adding new tests

Currently only `d3` is supported.

To add new tests:

1. copy the files `d3/regrtest.py`, `d3/rtest.py` and `d3/pmap.py` to the project folder,
1. update the paths in the end of file `regrtest.py`, and
1. add a case in the `Makefile`
