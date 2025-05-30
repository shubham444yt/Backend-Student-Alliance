import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  size: { type: String },
  image: { type: String },
  quantity: { type: Number, required: true },
});

const OrderDetailsSchema = new mongoose.Schema({
  items: { type: [ItemSchema], required: true },
  subtotal: { type: Number, required: true },
  discount: { type: Number, required: true },
  shippingFee: { type: Number, required: true },
  total: { type: Number, required: true },
  orderDate: { type: Date, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  deliveryMethod: {
    type: String,
    enum: ['Delivery', 'Pick up'],
    default: 'Delivery'
  },
  orderDetails: { type: OrderDetailsSchema, required: true },
  paymentStatus: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update 'updatedAt' on every save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, required: true },
//     country: { type: String, required:true },
//     city: { type: String, required:true },
//     state: { type: String, required:true },
//     zipCode: { type: String, required:true },
//     deliveryMethod: { 
//         type: String, 
//         enum: ['Delivery', 'Pick up'], 
//         default: 'Delivery' 
//     },
//     createdAt: { 
//         type: Date, 
//         default: Date.now 
//     },
//     updatedAt: { 
//         type: Date, 
//         default: Date.now 
//     }
// });

// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;