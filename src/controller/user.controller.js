import User from "../model/user.model.js";

export const createUser = async (req, res) => {
  try {
    // Destructure customer and order details from the request body
    const {
      name,
      email,
      phone,
      country,
      city,
      state,
      zipCode,
      deliveryMethod,
      orderDetails,
      paymentStatus,
    } = req.body;

    console.log(name,
      email,
      phone,
      country,
      city,
      state,
      zipCode,
      deliveryMethod,
      orderDetails,
      paymentStatus,)

    // Basic validation for required customer fields
    if (!name || !email || !phone || !country || !city || !state || !zipCode) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Optionally validate orderDetails and paymentStatus here if required
    if (!orderDetails || !paymentStatus) {
      return res.status(400).json({ message: "Order details and payment status are required." });
    }

    // Create a new User (or Order) document with customer and order info
    const newUser = new User({
      name,
      email,
      phone,
      country,
      city,
      state,
      zipCode,
      deliveryMethod,
      orderDetails,
      paymentStatus,
    });

    // Save document to database
    const savedUser = await newUser.save();

    // Send success response
    res.status(201).json({ message: "Order submitted successfully!", user: savedUser });

  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists." });
    } else {
      console.log(error.message);
      res.status(500).json({ message: "An error occurred", error: error.message });
    }
  }
};


// import User from "../model/user.model.js";

// export const createUser = async (req, res) => {
//   try {
//     const { name, email, phone, country, city, state, zipCode, deliveryMethod } = req.body;

//     console.log(name, email, phone, country, city, state, zipCode, deliveryMethod);

//     if (!name || !email || !phone || !country || !city || !state || !zipCode) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const newUser = new User({
//       name,
//       email,
//       phone,
//       country,
//       city,
//       state,
//       zipCode,
//       deliveryMethod,
      
//     });

    

//     const savedUser = await newUser.save();
//     res.status(201).json({ message: "Order submitted successfully!", user: savedUser });
//   } catch (error) {
//     if (error.code === 11000) {
//       res.status(400).json({ message: "Email already exists." });
//     } else {
//         console.log(error.message);
//       res.status(500).json({ message: "An error occurred", error: error.message });
//     }
//   }
// };
