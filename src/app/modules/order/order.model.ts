import { Aggregate, Schema } from 'mongoose';
import { TOrder } from './order.interface';
import { model } from 'mongoose';
import { NextFunction } from 'express';

const orderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: [true, 'Email is Requered!'] },
    product: { type: String, required: [true, 'Product filled is Required!'] },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must need to be more than 0'],
      max: 10,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is requied'],
      min: [0, 'Total price does not allow negative value'],
    },
    isDeleted: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

//middlewares
orderSchema.pre('find', function (next: NextFunction) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
orderSchema.pre('findOne', function (next: NextFunction) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
orderSchema.pre('aggregate', function (next: NextFunction) {
  const aggregate = this as Aggregate<any[]>;
  aggregate.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//query middleswares

export const Order = model<TOrder>('Order', orderSchema);
