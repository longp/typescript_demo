git clone -> npm install 

make sure to create .env with variables 

npm run tsc

npm start or npm run dev


routes are 

POST /candidate 

with candidate body example:
{
  "id": "ae588a6b-4540-5714-bfe2-a5c2a65f547a",
  "name": "John Coder",
  "skills": ["javascript", "es6", "nodejs", "express"]
}


GET /candidate/search?skill={skill1},{skill2}

will return a single candidate object:

{
  "id": "ae588a6b-4540-5714-bfe2-a5c2a65f547a",
  "name": "John Coder",
  "skills": ["javascript", "es6", "nodejs", "express"]
}