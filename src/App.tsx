import { useEffect, useState } from "react";
import { Repl } from "@electric-sql/pglite-repl";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import Worker from "./db/worker.js?worker";

const db = new PGliteWorker(new Worker());

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    db.query(`
      CREATE TABLE IF NOT EXISTS health_records (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        diagnosis TEXT NOT NULL
      );
    `);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !diagnosis || !age) return;

    await db.query(
      `INSERT INTO health_records (name, age, diagnosis) VALUES ($1, $2, $3)`,
      [name, age, diagnosis]
    );

    setSubmitted(true);
    setName("");
    setAge("");
    setDiagnosis("");

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Add Health Record</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <label>Name: </label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <label>Age: </label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <label>Diagnosis: </label>
            <input
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>
          <button type="submit">Add Record</button>
        </form>
        <div style={{ height: "40px" }}>
          {submitted && <p>Record added!</p>}
        </div>
      </div>
      <h2>Interact with the database using raw SQL queries</h2>
      <div style={{ height: "400px" }}>
        {/* repl component to query db using queries */}
        <Repl pg={db} />
      </div>
    </>
  );
}

export default App;
