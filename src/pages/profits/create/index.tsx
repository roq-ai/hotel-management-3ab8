import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createProfit } from 'apiSdk/profits';
import { profitValidationSchema } from 'validationSchema/profits';
import { HotelInterface } from 'interfaces/hotel';
import { getHotels } from 'apiSdk/hotels';
import { ProfitInterface } from 'interfaces/profit';

function ProfitCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProfitInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProfit(values);
      resetForm();
      router.push('/profits');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProfitInterface>({
    initialValues: {
      month: new Date(new Date().toDateString()),
      total_profit: 0,
      hotel_id: (router.query.hotel_id as string) ?? null,
    },
    validationSchema: profitValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Profits',
              link: '/profits',
            },
            {
              label: 'Create Profit',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Profit
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="month" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Month
            </FormLabel>
            <DatePicker
              selected={formik.values?.month ? new Date(formik.values?.month) : null}
              onChange={(value: Date) => formik.setFieldValue('month', value)}
            />
          </FormControl>

          <NumberInput
            label="Total Profit"
            formControlProps={{
              id: 'total_profit',
              isInvalid: !!formik.errors?.total_profit,
            }}
            name="total_profit"
            error={formik.errors?.total_profit}
            value={formik.values?.total_profit}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_profit', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<HotelInterface>
            formik={formik}
            name={'hotel_id'}
            label={'Select Hotel'}
            placeholder={'Select Hotel'}
            fetcher={getHotels}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/profits')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'profit',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProfitCreatePage);
