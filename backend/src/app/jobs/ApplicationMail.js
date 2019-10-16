import Mail from '../../lib/Mail';

class ApplicationMail {
  get key() {
    return 'Application Mail';
  }

  async handle({ data }) {
    const { application } = data;
    await Mail.sendMail({
      to: `${application.meetup.promoter.name} <${application.meetup.promoter.email}>`,
      subject: 'Novo usuário inscrito',
      template: 'application',
      context: {
        user_name: application.user.name,
        user_email: application.user.email,
        meetup: application.meetup.name,
      },
    });
  }
}

export default new ApplicationMail();
