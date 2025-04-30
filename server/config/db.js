const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB 연결됨: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB 연결 오류: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;