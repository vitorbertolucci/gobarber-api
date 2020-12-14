import { v4 as uuid } from 'uuid';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentsRepostory from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProvider from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProvider from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepostory {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return foundAppointment;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, user_id, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    })

    return appointments
  }

  public async findAllInDayFromProvider({provider_id, day, month, year}: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    })

    return appointments
  }
}

export default FakeAppointmentsRepository;
