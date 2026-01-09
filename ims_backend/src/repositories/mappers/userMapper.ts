import { Types } from 'mongoose';

export interface UserDB {
    _id: Types.ObjectId;
    email: string;
    password: string;
}

export const mapItemResponse = (user: UserDB) => {
    return {
        id: user._id.toString(),
        email: user.email,
        password: user.password,
    };
};
