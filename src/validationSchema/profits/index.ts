import * as yup from 'yup';

export const profitValidationSchema = yup.object().shape({
  month: yup.date().required(),
  total_profit: yup.number().integer().required(),
  hotel_id: yup.string().nullable().required(),
});
