const db = require('../config/db');
const data = require('../data/staticData');

exports.insertStaticData = (req, res) => {
  const insertQueries = [];

  for (const category in data) {
    data[category].forEach(item => {
      insertQueries.push([category, item.title, item.tag]);
    });
  }

  const sql = 'INSERT INTO projects (category, title, tag) VALUES ?';

  db.query(sql, [insertQueries], (err, result) => {
    if (err) return res.status(500).send('Database insert failed');
    res.send('Static data inserted successfully');
  });
};

exports.getAllProjects = (req, res) => {
  db.query('SELECT * FROM projects', (err, results) => {
    if (err) return res.status(500).send('Database fetch failed');
    res.json(results);
  });
};
