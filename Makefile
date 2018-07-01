install:
	npm install

start:
	npm run start

build:
	rm -rf build
	npm run build

lint:
	npm run eslint .
