
THREADS=1

.PHONY: d3 octane transducers

all: d3 octane transducers

d3:
	@echo "======================================"
	@echo "                  D3"
	@echo "======================================"
	cd d3 && ./regrtest.py -t $(THREADS) && cd ../

octane:
	@echo "======================================"
	@echo "                Octane"
	@echo "======================================"
	cd octane && ./regrtest.py -t $(THREADS) && cd ../

transducers:
	@echo "======================================"
	@echo "              Transducers"
	@echo "======================================"
	cd transducers && ./regrtest.py -t $(THREADS) && cd ../


clean:
	@./cleanup.js

