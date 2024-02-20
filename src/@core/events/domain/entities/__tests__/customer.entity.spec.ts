import { Customer, CustomerId } from "../customer.entity"

test('deve criar um cliente', () => {
    const customer = Customer.create({
        name: 'João',
        cpf: '99346413050',
    });

    console.log(customer);
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBeDefined();
    expect(customer.id).toBeInstanceOf(CustomerId);
    expect(customer.name).toBe('João');
    expect(customer.cpf.value).toBe('99346413050');
    

    
});