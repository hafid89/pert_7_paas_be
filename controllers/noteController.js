const Note = require('../models/Note');

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.getAll();
        res.json({
            success: true,
            data: notes
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data notes'
        });
    }
};

const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.getById(id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note tidak ditemukan'
            });
        }
        res.json({
            success: true,
            data: note
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data note'
        });
    }
};

const createNote = async (req, res) => {
    try {
        const { judul, isi } = req.body;
        if (!judul || !isi) {
            return res.status(400).json({
                success: false,
                message: 'Judul dan isi harus diisi'
            });
        }
        const id = await Note.create(judul, isi);
        res.status(201).json({
            success: true,
            message: 'Note berhasil dibuat',
            data: { id }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal membuat note'
        });
    }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, isi } = req.body;
        if (!judul || !isi) {
            return res.status(400).json({
                success: false,
                message: 'Judul dan isi harus diisi'
            });
        }
        const affectedRows = await Note.update(id, judul, isi);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Note tidak ditemukan'
            });
        }
        res.json({
            success: true,
            message: 'Note berhasil diupdate'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengupdate note'
        });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Note.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Note tidak ditemukan'
            });
        }
        res.json({
            success: true,
            message: 'Note berhasil dihapus'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus note'
        });
    }
};

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};
