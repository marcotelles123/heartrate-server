user: marcotelles123
pass: 
--em branco a senha

curls:
SignUp:
curl -X POST \
  http://127.0.0.1:3334/api/auth/signup \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 50a6e399-3db0-e215-2d13-a9bbddaa712c' \
  -d '{
	"username":"marcotelles123",
	"email":"",
	"password": "",
	"roles": ["user", "moderator"]
}'

SignIN:
curl -X POST \
  http://127.0.0.1:3334/api/auth/signin \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: e5c2ed4f-3cdd-d62c-a80e-fbe70671a168' \
  -d '{
	"username":"marcotelles123",
	"password": ""
}'
