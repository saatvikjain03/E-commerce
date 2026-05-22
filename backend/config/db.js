const prisma = require("../prismaClient");

const connectDb = async () => {
    try {
        // Test database connection with a lightweight query
        await prisma.$queryRaw`SELECT 1`;
        console.log("Database (Prisma) connected using DATABASE_URL");
    } catch (err) {
        console.error("Prisma connection error:", err);
        process.exit(1);
    }
};

module.exports = { connectDb };
