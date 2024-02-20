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
    console.dir(event.toJSON(), { depth: 10 });
});

test('deve publicar todos os itens do evento', () => {
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

    event.addSection({
        name: 'Sessao 2',
        description: 'Descricao da sessao 2',
        total_spots: 200,
        price: 2000
    });

    event.publishAll();

    const [section1, section2] = event.sections.values();

    expect(event.is_published).toBe(true);
    expect(section1.is_published).toBe(true);
    expect(section2.is_published).toBe(true);
    [...section1.spots, ...section2.spots].forEach((spot) => {
        expect(spot.is_published).toBe(true);
    });
});