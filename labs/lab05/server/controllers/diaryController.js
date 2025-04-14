const db = require('../config/db');

// GET /entries
const getAllEntries = (req, res) => {
    db.query('SELECT * FROM entries ORDER BY updated_at DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// GET /entries/:id
const getEntryById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM entries WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Entry Not Found" });
        res.json(results[0]);
    });
};

// POST /entries
const addEntry = (req, res) => {
    const { title, content, mood, tag } = req.body;

    // Basic validation
    if (!title || !content || !mood || !tag) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    db.query(
        'INSERT INTO entries (title, content, mood, tag) VALUES (?, ?, ?, ?)',
        [title, content, mood, tag],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({
                message: "Entry added",
                entryId: result.insertId,
                entry: {
                    id: result.insertId,
                    title,
                    content,
                    mood,
                    tag
                }
            });
        }
    );
};

// PUT /entries/:id
const updateEntry = (req, res) => {
    const { id } = req.params;
    const { title, content, mood, tag } = req.body;

    db.query(
        'UPDATE entries SET title = ?, content = ?, mood = ?, tag = ? WHERE id = ?',
        [title, content, mood, tag, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Entry Not Found" });
            res.json({ message: "Entry Updated" });
        }
    );
};

// DELETE /entries/:id
const deleteEntry = (req, res) => {
    const { id } = req.params;

    db.query(
        'DELETE FROM entries WHERE id = ?', [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Entry Not Found" });
            res.json({ message: "Entry Deleted" });
        }
    );
};

// Export the controller functions
module.exports = {
    getAllEntries,
    getEntryById,
    addEntry,
    updateEntry,
    deleteEntry
};
