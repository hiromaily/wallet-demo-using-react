#------------------------------------------------------------------------------
# Startup
#------------------------------------------------------------------------------
.PHONY: init
init:
	npm create vite
	# After installation
	# cd wallet
  # npm install
  # npm run dev


.PHONY: init-other-way
init-other-way
	npm create vite wallet -- --template react-ts

# See https://blog.devgenius.io/eslint-prettier-typescript-and-react-in-2022-e5021ebca2b1
.PHONY: add-eslint
add-eslint:
	npm install --save-dev eslint
	npm init @eslint/config

.PHONY: add-additional
add-additional:
	npm install --save-dev eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
	npm install --save-dev eslint-plugin-import @typescript-eslint/parser eslint-import-resolver-typescript
	npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-hooks
	touch .prettierrc
	touch .prettierignore

.PHONY: add-jest
add-jest:
	npm install --save-dev jest @types/jest ts-jest ts-node


#------------------------------------------------------------------------------
# Development
#------------------------------------------------------------------------------
