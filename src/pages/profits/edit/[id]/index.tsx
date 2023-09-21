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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getProfitById, updateProfitById } from 'apiSdk/profits';
import { profitValidationSchema } from 'validationSchema/profits';
import { ProfitInterface } from 'interfaces/profit';
import { HotelInterface } from 'interfaces/hotel';
import { getHotels } from 'apiSdk/hotels';

function ProfitEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ProfitInterface>(
    () => (id ? `/profits/${id}` : null),
    () => getProfitById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ProfitInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateProfitById(id, values);
      mutate(updated);
      resetForm();
      router.push('/profits');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ProfitInterface>({
    initialValues: data,
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
              label: 'Update Profit',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Profit
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(ProfitEditPage);
