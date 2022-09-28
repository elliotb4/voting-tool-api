# voting-tool-api

API portion of voting tool appliation for my MSc project

## start API
run `node index` in root directory:

## API Endpoint
`http://localhost:8080/preflib`
### Individual Results
Make a POST request to the endpoint with a ballot set number in the body
Example:
>{
>    "set": "25"
>}
### Condorcet Efficiency
Make a GET request to the endpoint
