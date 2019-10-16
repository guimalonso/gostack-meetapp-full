import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class AvailableController {
  async index(req, res) {
    const { date, page = 1 } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = parseISO(date);

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      limit: 20,
      offset: (page - 1) * 20,
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
    });

    return res.json(meetups);
  }
}

export default new AvailableController();
