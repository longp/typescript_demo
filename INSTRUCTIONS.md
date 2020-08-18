# Task description

Your task is to implement a Web API that finds the best person for a job. The API should support the following requests:

`POST /candidates` – add a candidate to the database (kept in memory). The request body is JSON shaped, as follows:

```json
{
  "id": "ae588a6b-4540-5714-bfe2-a5c2a65f547a",
  "name": "Jimmy Coder",
  "skills": ["javascript", "es6", "nodejs", "express"]
}
```

In the example above, the candidate has four skills. The Content-Type header will be set to application/json in every such POST request.

The server should respond with a success code in the 200–299 range (for example, "200 OK" is fine). The response body is disregarded by the client and can be empty.

`GET /candidates/search?skills=javascript,express,mongodb` – find and return the candidate that has the most skills from the given set (comma-separated). In this example, we request three skills. If a candidate possesses all of the listed skills (3 out of 3), or has more than the other candidates, then he/she is considered the best and should be returned. The response should have Content-Type set to application/json and the response body should be of the same shape as the request body for POST /candidates, that is:

```json
{
  "id": "ae588a6b-4540-5714-bfe2-a5c2a65f547a",
  "name": "John Coder",
  "skills": ["javascript", "es6", "nodejs", "express"]
}
```

The HTTP response code must be 200 if a candidate is found with at least one matching skill, or 404 if no suitable candidates exist.

Added candidates should be kept in memory; no database/storage back-end is available.

Each search request should return the candidate with the best coverage of the requested skills – if five different skills are requested, then a candidate who has four of them is better than a candidate who has only three of them, and so on.

If two or more candidates have the same coverage (for example, both have seven out of ten requested skills), any of these candidates may be returned – additional skills (which were not requested) do not matter.

If no candidates match any skills, or no candidates exist at all, then the response must have an HTTP status code of 404. The response body is not important in such cases.

If the request is invalid (has no body in the case of POST, or no `?skills=...` in GET) then status code 400 (Bad Request) must be returned.

HTTP 5xx error codes are considered errors and must not be returned.

## Input guarantees

For simplicity, assume the following to be true:

- Each candidate has a unique id – the server will never receive two POSTs with the same id;
- id is any string from 1 to 100 characters;
- name is any string from 1 to 100 characters;
- skills is an array of strings from 1 to 100 characters, being letters, numbers or hyphens `([a-zA-Z0-9-]+)`, with a maximum of 10,000 elements); elements in the array or in query strings are not duplicated (there is no `[ "skill1", "skill2", "skill1" ]`).

## Additional examples

### Example 1

With no candidates added, our request `GET /candidates/search?skills=javascript,react,typescript` should result in a 404 response code.

### Example 2

If we add a candidate such as:

```json
{
  "id": "person1",
  "name": "Amy Fish",
  "skills": ["scala", "go"]
}
```

then a search for /candidates/search?skills=go,elixir,erlang should return:

```json
{
  "id": "person1",
  "name": "Amy Fish",
  "skills": ["scala", "go"]
}
```

### Example 3

If we add two candidates:

- candidate1 with skills `[ "nodejs", "mongodb", "redis", "socketio" ]`
- candidate2 with skills `[ "nodejs", "express" ]`

then a search for skills express,mongodb,redis must return the data of candidate1, since he possesses two skills from the list (mongodb and redis), while candidate2 knows only express from the list.