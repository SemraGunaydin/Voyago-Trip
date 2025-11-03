import type  { FC } from 'react'
import { Formik,Form, Field, ErrorMessage } from 'Formik';
import { hotelSchema } from '../../utils/schema';
import {inputFields,initialValues } from "../../utils/constants";
import type { HotelFormValues } from '../../types';
import { useCreatePlace } from '../../utils/service';


const HotelForm:FC= () => {
	const {mutate, isPending} = useCreatePlace();
	

const handleSubmit = (values:HotelFormValues) => {
	mutate(values);
};
  return (
	<div className="container">
	  <Formik 
	  initialValues={initialValues}
	  onSubmit={handleSubmit}
	  validationSchema={hotelSchema}
	  >
		<Form className="max-w-2xl mx-auto grid gap-10">
          {inputFields.map((i, key) => (
            <div key={key} className="field relative">
              <label htmlFor={i.name}>{i.label}</label>
              <Field
                id={i.name}
                type={i.type}
                name={i.name}
                className="input"
              />
              <ErrorMessage
                name={i.name}
                component="div"
                className="text-red-500 absolute text-sm -bottom-7"
              />
            </div>
          ))}
			<button 
			disabled={isPending}
			className="my-5 bg-blue-500 py-2 px-6 text-white rounded-md transition hover:bg-blue-600">
				{isPending ? "Sending..." : "Send"}
			</button>
		</Form>
	  </Formik>
	</div>
  )
}

export default HotelForm;

