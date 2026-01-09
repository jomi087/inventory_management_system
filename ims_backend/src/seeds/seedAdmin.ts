import 'dotenv/config';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel';
import { logger } from '../config/logger';
import { connectDB } from '../config/db';

const seedAdmin = async () => {
    try {
        connectDB().catch((err) => {
            logger.error('Server startup failed', err);
            process.exit(1);
        });

        const existingUser = await UserModel.findOne({
            email: process.env.OWNER_EMAIL!,
        });

        if (existingUser) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(
            process.env.OWNER_PASSWORD!,
            10
        );

        await UserModel.create({
            email: process.env.OWNER_EMAIL!,
            password: hashedPassword,
        });

        console.log('Admin user seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin user:', error);
        process.exit(1);
    }
};

seedAdmin();
