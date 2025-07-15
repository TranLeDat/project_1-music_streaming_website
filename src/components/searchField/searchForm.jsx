import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import  {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputField from '../form-control/inputField/inputField';
import clsx from 'clsx';
import styles from './searchForm.module.scss'


SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};

function SearchForm(props) {

  const schema = yup.object().shape({
    search: yup.string().required('Please enter your word you want to search?'),
  })

  const form = useForm({
    defaultValues:{
      search : '',
    },
    resolver: yupResolver(schema),
    mode: 'onSubmit'
  })

  
  const handleSubmit = async (values) =>{
    const {onSubmit} = props;
    if(onSubmit){
      await onSubmit(values)
    } 
  }

  const {label } = props

  return (
    <>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className={clsx(styles.inputField)}>
          <InputField name='search' label={label} form={form}  />
        </div>
        <button type="submit" className={clsx(styles.btn)}>
            <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </>
  );
}

export default SearchForm;