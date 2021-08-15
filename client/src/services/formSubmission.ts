import axios from 'axios';
import dotenv from 'dotenv';
import { ApplicationI } from '../interfaces/Application';
dotenv.config();

const formUrl =  process.env.REACT_APP_FORM_SPARK_ENDPOINT || '';

export const submitForm = async (formData: ApplicationI) => {
  try {
    const response = await axios.post(formUrl, formData)
    return response.data;
  } catch (error) {
    console.log(`Could not submit form, error: ${error}`)
    return error;
  }
}