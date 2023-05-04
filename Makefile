.PHONY: help

help: ## ヘルプコマンド
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build:
	docker compose build --no-cache

install:
	docker compose run --rm front npm install

up:
	docker compose up --remove-orphans

test:
	docker compose run --rm front npm test

test-local:
	cd src/app &&\
	npm run test:local
