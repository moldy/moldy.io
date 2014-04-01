build:
	@npm install
	@./node_modules/.bin/bower install --allow-root --config.interactive=false

clean:
	@rm -rf node_modules bower_components .tmp

release:
	@make clean
	@make build

.PHONY: build clean release