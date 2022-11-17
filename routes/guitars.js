import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

const schema = new mongoose.Schema({ name: 'string', guitarStrings: 'number' });
const Guitar = mongoose.model('Guitar', schema);

router.post('/', async (req, res) => {
  try {
  const guitar = await Guitar.create({ name: req.body.name, guitarStrings: req.body.guitarStrings });
  res.send(guitar);
  } catch (error) {
    res.sendStatus(500);
  }
})

router.get('/', async (req, res) => {
 const guitars = await Guitar.find({});
  res.render ('index', { guitars });
});

router.get('/:id', async (req, res) => {
  const guitar = await Guitar.findOne({ _id: req.params.id });
   res.send(guitar);
 });

 router.put('/:id', async (req, res) => {
  const guitar = await Guitar.updateOne({ _id: req.params.id },
    { name: req.body.name, guitarStrings: req.body.guitarStrings });
   res.send(guitar);
 });

 router.delete('/:id', async (req, res) => {
  const guitar = await Guitar.deleteOne({ _id: req.params.id });
   res.send(guitar);
 });

export default router;