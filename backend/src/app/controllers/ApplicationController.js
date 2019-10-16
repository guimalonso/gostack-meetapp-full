import * as Yup from 'yup';
import { isBefore } from 'date-fns';
import { Op } from 'sequelize';
import Application from '../models/Application';
import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';
import Queue from '../../lib/Queue';
import ApplicationMail from '../jobs/ApplicationMail';

class ApplicationController {
  async index(req, res) {
    const applications = await Application.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: [
            'id',
            'name',
            'description',
            'location',
            'date',
            'user_id',
          ],
          order: ['date'],
          where: {
            date: {
              [Op.gte]: new Date().getTime(),
            },
          },
          include: [
            {
              model: User,
              as: 'promoter',
              attributes: ['name'],
            },
            {
              model: File,
              as: 'banner',
              attributes: ['path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(applications);
  }

  async store(req, res) {
    // Basic Validation
    const schema = Yup.object().shape({
      meetup_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { meetup_id } = req.body;
    const user_id = req.userId;

    const meetup = await Meetup.findOne({
      where: { id: meetup_id },
      attributes: ['user_id', 'date'],
    });

    // Verify if the user is owner of the meetup
    if (user_id === meetup.user_id) {
      return res
        .status(401)
        .json({ error: 'You cannot apply to a meetup promoted by yourself.' });
    }

    // Verify if a past date was given
    if (isBefore(meetup.date, new Date())) {
      return res
        .status(400)
        .json({ error: 'This meetup has already finished.' });
    }

    // Verify if the user has already applied to the same meetup
    const hasAlreadyApplied = await Application.findOne({
      where: { user_id, meetup_id },
    });

    if (hasAlreadyApplied) {
      return res.status(401).json({
        error: 'You cannot apply to a meetup you have already applied.',
      });
    }

    // Verify if the user has already applied to a meetup that will occur at the same time
    const sameTimeMeetup = await Application.findOne({
      where: { user_id },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: { date: meetup.date },
        },
      ],
    });

    if (sameTimeMeetup) {
      return res.status(401).json({
        error:
          'You have already applied to another meetup that will occur at the same time.',
      });
    }

    const application = await Application.create({ user_id, meetup_id });

    const newApplication = await Application.findOne({
      where: { id: application.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['user_id', 'name'],
          include: {
            model: User,
            as: 'promoter',
            attributes: ['name', 'email'],
          },
        },
      ],
    });

    await Queue.add(ApplicationMail.key, {
      application: newApplication,
    });

    return res.json(application);
  }

  async delete(req, res) {
    const application = await Application.findByPk(req.query.id);

    await application.destroy();

    return res.json('Ok');
  }
}

export default new ApplicationController();
