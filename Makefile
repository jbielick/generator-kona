TESTS = $$(find test -name *.test.js)

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		$(TESTS) \
		--bail

test-cov:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		-- -u exports \
		$(TESTS) \
		--bail

test-ci:
	@NODE_ENV=test node \
		node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -u exports \
		$(TESTS) \
		--bail

.PHONY: test