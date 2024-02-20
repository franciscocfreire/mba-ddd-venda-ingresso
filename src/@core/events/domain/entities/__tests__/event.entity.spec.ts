import { EventSection } from "../event-section"
import { EventSpot } from "../event-spot"
import { Event } from "../event.entity"
import { PartnerId } from "../partner.entity"

test('deve criar um evento', () => {
    const event = Event.create({
        name: 'Evento 1',
        description: 'Descricao do evento',
        date: new Date(),
        partner_id: new PartnerId()
    })

    const section = EventSection.create({
        name: 'Sessao 1',
        description: 'Descricao da sessao',
        total_spots: 100,
        price: 1000
    });

    event.sections.add(section);

    const spot = EventSpot.create();
    section.spots.add(spot);

    console.dir(event.toJSON(), {depth: 10});
})