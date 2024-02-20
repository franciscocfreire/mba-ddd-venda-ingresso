import { Name } from "./name.vo"

test('deve criar um nome valido', () => {
    const name = new Name('aaaa');
    expect(name.value).toBe('aaaa');
})