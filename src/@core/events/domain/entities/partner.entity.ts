import { AggregateRoot } from "../../../common/domain/aggregate-root";
import Uuid from "../../../common/domain/value-object/uuid.vo";

export class PartnerId extends Uuid { }

export type PartnerConstructorProps = {
    id?: PartnerId | string;
    name: string;
};

export class Partner extends AggregateRoot {

    id: PartnerId;
    name: string;

    constructor(props: PartnerConstructorProps) {
        super();

        this.id =
            typeof props.id === 'string'
                ? new PartnerId(props.id)
                : props.id ?? new PartnerId();

        this.name = props.name;;

    }

    static create(command: { name: string }) {
        return new Partner({
            name: command.name,
        });
    }


    toJSON() {
        return {
            id: this.id.value,
            name: this.name,
        }
    }

}