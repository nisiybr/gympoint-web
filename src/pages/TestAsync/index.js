import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import api from '~/services/api';

// import { Container } from './styles';

export default function TestAsync() {
  const [students, setStudents] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');
      const { data } = response;

      const dataFormatted = data.map(item => {
        return {
          value: item.id,
          label: `${item.name} - ${item.email}`,
        };
      });

      setStudents(dataFormatted);
    }

    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function filterStudents(inputValue: string) {
    return students.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function loadOptions(inputValue, callback) {
    setTimeout(() => {
      callback(filterStudents(inputValue));
    }, 1000);
  }

  function handleInputChange(newValue: string) {
    const inputValue = newValue.replace(/\W/g, '');
    setInputValue(inputValue);
    return inputValue;
  }

  return (
    <div>
      <pre>inputValue: "{inputValue}"</pre>
      <AsyncSelect
        cacheOptions
        defaultOptions
        onInputChange={handleInputChange}
        loadOptions={loadOptions}
      />
    </div>
  );
}
