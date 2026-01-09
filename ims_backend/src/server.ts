import { app } from "./app";
import { connectDB } from "./config/db";
import { logger } from "./config/logger";

const PORT = process.env.PORT;

connectDB().catch((err) => {
    logger.error('Server startup failed', err);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})