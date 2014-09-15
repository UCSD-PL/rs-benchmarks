#! /bin/sh

node ../../TypeScript/built/local/tsc.js -removeComments --module commonjs -noImplicitAny  src/compiler/core.ts src/compiler/sys.ts src/compiler/types.ts src/compiler/scanner.ts src/compiler/parser.ts src/compiler/binder.ts src/compiler/checker.ts src/compiler/emitter.ts src/compiler/commandLineParser.ts src/compiler/tsc.ts src/compiler/diagnosticInformationMap.generated.ts --init-stats  -out built/local/tsc.js
