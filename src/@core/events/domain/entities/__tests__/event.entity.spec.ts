import { Event } from "../event.entity"
import { PartnerId } from "../partner.entity"

test('deve criar um evento', () => {
    const event = Event.create({
        name: 'Evento 1',
        description: 'Descricao do evento',
        date: new Date(),
        partner_id: new PartnerId()
    })

    event.addSection({
        name: 'Sessao 1',
        description: 'Descricao da sessao',
        total_spots: 100,
        price: 1000
    });

    const [section] = event.sections;

    expect(event.sections.size).toBe(1);
    expect(event.total_spots).toBe(100);
    expect(section.spots.size).toBe(100);
    console.dir(event.toJSON(), {depth: 10});
})