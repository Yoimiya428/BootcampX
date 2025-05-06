const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;

const queryString = `
SELECT students.id as id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
  .then((res) => {
    res.rows.forEach((row) => {
      console.log(`${row.name} has an id of ${row.id} and was in the ${row.cohort} cohort`);
    });
  })
  .catch((err) => console.error("query error", err.stack));