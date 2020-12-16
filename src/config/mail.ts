interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'vitorbertolucci@gmail.com',
      name: 'Vítor do GoBarber',
    }
  }
} as IMailConfig;
