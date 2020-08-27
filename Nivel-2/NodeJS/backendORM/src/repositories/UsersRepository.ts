import User from '../models/User';
import { parse, isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
class AppointmentsRepository  extends Repository<User> {

}

export default AppointmentsRepository;
