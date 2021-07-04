var express = require('express');
var router = express.Router();
var db = require('../lib/database');

router.get('/all', function (req, res, next) {
  db.Notes.findAll()
    .then((notes) => {
      res.status(200).send(notes);
    })
    .catch((err) => {
      // TO-DO: Don't expose the whole error payload
      res.status(500).send(err);
    });
});

router.get('/customer/:customerId', function (req, res, next) {
  db.Notes.findAll({
    where: { customerId: req.params.customerId },
  })
    .then((notes) => {
      res.status(200).send(notes);
    })
    .catch((err) => {
      // TO-DO: Don't expose the whole error payload
      res.status(500).send(err);
    });
});

router.post('/create', async (req, res) => {
  try {
    const note = await db.Notes.create({
      customerId: req.query.customerId,
      note: req.body.note,
    });
    res.status(200).send(note);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/update', async (req, res) => {
  try {
    const note = await db.Notes.findByPk(req.body.id);
    const updated = await note.update({ note: req.body.note });
    res.status(200).send(updated);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const note = await db.Notes.findByPk(req.query.id);
    await note.destroy()
    res.status(200).send(note);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
