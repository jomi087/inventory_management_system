export const mapCustomerResponse = (customer: any) => ({
    id: customer._id.toString(),
    name: customer.name,
    address: customer.address,
    mobile: customer.mobile,
});
