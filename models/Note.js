const pool = require('../config/database');

class Note {
    static async getAll() {
        const [rows] = await pool.query(
            'SELECT * FROM notes ORDER BY tanggal_dibuat DESC'
        );
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(
            'SELECT * FROM notes WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async create(judul, isi) {
        const [result] = await pool.query(
            'INSERT INTO notes (judul, isi, tanggal_dibuat) VALUES (?, ?, NOW())',
            [judul, isi]
        );
        return result.insertId;
    }

    static async update(id, judul, isi) {
        const [result] = await pool.query(
            'UPDATE notes SET judul = ?, isi = ?, tanggal_diperbarui = NOW() WHERE id = ?',
            [judul, isi, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query(
            'DELETE FROM notes WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    }
}

module.exports = Note;
