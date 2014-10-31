
THREADS=1

.PHONY: d3 octane

all: d3 octane

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


clean:
	@./cleanup.js

