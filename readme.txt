Hice dos versiones de la app.

ts_app en typescript
js_app en javascript

Aproveché la situación para hacer cosas distintas en cada proyecto. ts_app apunta a resolver exclusivamente lo pedido en el enunciado del ejercicio. En cambio js_app es un proyecto pensado para cubrir más necesidades y está encarado de manera más genérica, pensando en una app que puede crecer en features.

Tests
ts_app tiene unit y mutation testing y js app tiene end two end testing (en otra situación la app tendría los dos tipos de test)


TS_APP README
mutation score 
	93.91%
coverage
	90.2% Statements 
	88.24% Branches 
	78.43% Functions 
	92.22% Lines


start
> npm start

test
> jest

mutation test
> npx stryker run





JS_APP README
mutation score

coverage 
	93.63% Statements 
	83.33% Branches 
	91.57% Functions 
	95.44% Lines

start (requiere mongod)
> npm start

test 
> npm test

mutation test
> npm test:mutant

endpoints: apiary




