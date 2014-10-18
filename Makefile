
THREADS=1

.PHONY: d3

all: d3

d3:
	cd d3 && ./regrtest.py -t $(THREADS) && cd ../

clean:
	@./cleanup.js

