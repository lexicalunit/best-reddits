import express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.create)
  .get('/:id', controller.byId)
  .delete('/:id', controller.delete);
