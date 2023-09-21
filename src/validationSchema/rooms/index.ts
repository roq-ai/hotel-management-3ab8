import * as yup from 'yup';

export const roomValidationSchema = yup.object().shape({
  room_number: yup.number().integer().required(),
  room_type: yup.string().required(),
  price: yup.number().integer().required(),
  availability: yup.boolean().required(),
  hotel_id: yup.string().nullable().required(),
});
