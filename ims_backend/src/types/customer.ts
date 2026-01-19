export interface CustomerFilter {
    $or?: {
        name?: {
            $regex: string;
            $options: string;
        };
        mobile?: {
            $regex: string;
            $options: string;
        };
    }[];
}

export interface Customer {
    id: string;
    name: string;
    address: string;
    mobile: string;
}
