.PHONY: setup
setup:
	./scripts/setup.sh

.PHONY: setup-msw
setup-msw:
	# setup worker
	npx msw init ./public --save
	mkdir src/mocks
	touch src/mocks/handlers.ts
	touch src/mocks/browser.ts
	touch src/mocks/server.ts
	touch src/mocks/worker.ts

.PHONY: dev
dev:
	npm run dev

.PHONY: lint
lint:
	npm run all

.PHONY: test
test:
	npm run test

# This output is generated inside the .next folder
.PHONY: build
build:
	npm run build

# .PHONY: deploy
# deploy:
# 	npm run export

.PHONY: publish
publish:
	ngrok http 3000