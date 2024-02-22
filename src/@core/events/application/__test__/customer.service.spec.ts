import { MikroORM, MySqlDriver } from "@mikro-orm/mysql";
import { CustomerSchema } from "../../infra/db/schemas";
import { CustomerMysqlRepository } from "../../infra/db/repositories/customer-mysql.repository";
import { Customer } from "../../domain/entities/customer.entity";
import { CustomerService } from "../customer.service";
import { UnitOfWorkMikroOrm } from "../../../common/infra/unit-of-work-mikro-orm";

test('deve listar os customers', async () => {
    const orm = await MikroORM.init<MySqlDriver>({
        entities: [CustomerSchema],
        dbName: 'events',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        type: 'mysql',
        forceEntityConstructor: true,
    })

    await orm.schema.refreshDatabase();
    const em = orm.em.fork();
    const customerRepo = new CustomerMysqlRepository(em);
    const unitOfWork = new UnitOfWorkMikroOrm(em);
    const customerService = new CustomerService(customerRepo, unitOfWork);
    const customer = Customer.create({ name: 'Customer 1', cpf: '00000000191' });
    await customerRepo.add(customer);
    await em.flush();
    await em.clear();

    const customers = await customerService.list();

    console.log(customers);

    orm.close();
});


test('deve registrar um customer ', async () => {
    const orm = await MikroORM.init<MySqlDriver>({
        entities: [CustomerSchema],
        dbName: 'events',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        type: 'mysql',
        forceEntityConstructor: true,
    })

    await orm.schema.refreshDatabase();
    const em = orm.em.fork();
    const customerRepo = new CustomerMysqlRepository(em);
    const unitOfWork = new UnitOfWorkMikroOrm(em);
    const customerService = new CustomerService(customerRepo, unitOfWork);
    await em.flush();
    await em.clear();

    const customer = await customerService.register({ name: 'Customer 1', cpf: '00000000191' });

    expect(customer).toBeInstanceOf(Customer);
    expect(customer).toBeInstanceOf(Customer); // Alteração aqui
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Customer 1');
    expect(customer.cpf.value).toBe('00000000191');

    await em.clear();

    const customerFound = await customerRepo.findById(customer.id);

    expect(customerFound).toBeInstanceOf(Customer);
    expect(customerFound).toBeInstanceOf(Customer); // Alteração aqui
    expect(customerFound.id).toBeDefined();
    expect(customerFound.name).toBe('Customer 1');
    expect(customerFound.cpf.value).toBe('00000000191');

    orm.close();


});
