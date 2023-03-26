const Card = require('../models/card');
const { SUCCESS } = require('../utils/constans');
const ErrorCode = require('../errors/ErrorCode');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorOwner = require('../errors/ErrorOwner');

// GET /cards
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};
// POST /cards
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(SUCCESS).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode('Переданы некорректные данные при создании'));
      } else {
        next(err);
      }
    });
};
// PUT /cards/:cardId/likes
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new ErrorNotFound('Карточки с данным _id не сущeствует');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorCode('Переданы некорректные данные для удаления лайка'));
      } else {
        next(err);
      }
    });
};
// DELETE /cards/:cardId/likes
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound('Карточки с данным _id не сущeствует');
      } else if (card.owner.valueOf() === req.user._id) {
        Card.deleteOne({ _id: req.params.cardId })
          .then(() => res.send({ data: card }));
      } else {
        throw new ErrorOwner('Нет прав на удаление карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorCode('Переданы некорректные данные при создании'));
      } else next(err);
    });
};
// DELETE /cards/:cardId
module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new ErrorNotFound('Карточки с данным _id не сущeствует');
    } return res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ErrorCode('Переданы некорректные данные для постановки лайка'));
    } else {
      next(err);
    }
  });
