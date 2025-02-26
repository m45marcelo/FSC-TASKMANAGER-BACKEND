const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        await mongoose.connect(`mongodb+srv://m45marcelo:${process.env.DB_PASSWORD}@cluster0.onzem.mongodb.net/seuBancoDeDados?retryWrites=true&w=majority&appName=Cluster0`, {
        });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Encerra o processo em caso de falha
    }
};

module.exports = connectToDatabase;
