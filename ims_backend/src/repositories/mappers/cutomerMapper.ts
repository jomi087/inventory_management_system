import { ICustomer } from "../../models/customerModel";

export const mapCustomerResponse = (customer: ICustomer) => ({
    id: customer._id.toString(),
    name: customer.name,
    address: customer.address,
    mobile: customer.mobile,
});
