import { IRepository } from '../../../common/domain/repository-interface';
import { SpotReservation } from '../entities/sport-reservation.entity';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISpotReservationRepository
  extends IRepository<SpotReservation> {}