import { model, Schema } from 'mongoose';

const revenueSchema = new Schema({
  totalrevenue: {
    type: [Number, 'Total revenue must be a number!'],
    required: [true, 'Total revenue is required!'],
  },
});

export const Revenue = model('Revenue', revenueSchema);
