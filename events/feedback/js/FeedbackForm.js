'use strict';
const FeedbackForm = ({data, onSubmit}) => {
  const outData = Object.assign({}, data);

  // фабрика обработчиков изменения полей
  const onChangeFactory = field => value => {
    outData[field] = value;
  };

  // обработываем отправку формы
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(JSON.stringify(outData));
  };

  return <form className="content__form contact-form" onSubmit={handleSubmit}>
    <div className="testing">
      <p>Чем мы можем помочь?</p>
    </div>
    <Salutation value={data.salutation} onChange={onChangeFactory('salutation')}/>
    <InputField name={'name'} placeholder={'Имя'} onChange={onChangeFactory('name')} value={data.name}/>
    <InputField name={'email'} placeholder={'Адрес электронной почты'} onChange={onChangeFactory('email')}
                type={'email'} value={data.email}/>
    <SelectField placeholder={'Чем мы можем помочь?'} value={data.subject} name={'subject'}
                 onChange={onChangeFactory('subject')}
                 options={['У меня проблема', 'У меня важный вопрос']}
    />
    <TextField name={'message'} placeholder={'Ваше сообщение'} onChange={onChangeFactory('message')}
               value={data.message}/>

    <Snacks value={data.snacks} onChange={onChangeFactory('snacks')}/>
    <button className="contact-form__button" type="submit">Отправить сообщение!</button>
    <output id="result"/>
  </form>
};

const Salutation = ({value, onChange}) => {
  // хелперы
  const isChecked = inputValue => inputValue.toLowerCase() === value.toLowerCase();
  // в onChange пробрасываем значение, чтобы не зависить от реализации
  const handleChange = event => onChange(event.target.value);

  // собираем контролы
  const options = [{
    id: 'salutation-mr',
    value: 'Мистер'
  }, {
    id: 'salutation-mrs',
    value: 'Мисис'
  }, {
    id: 'salutation-ms',
    value: 'Мис'
  }].map(option => <RadioBox
    id={option.id}
    isChecked={isChecked(option.value)}
    label={option.value}
    name={'salutation'}
    onChange={handleChange}
    value={option.value}
  />);
  return <div className="contact-form__input-group">{options}</div>
};


const Snacks = ({value, onChange}) => {
  // не надо мутировать входной массив - лучше кешировать
  let outData = [...value];
  //хелперы
  const isChecked = inputValue => {
    return outData.indexOf(inputValue) > -1;
  };
  // обрабротка именений checkbox
  const handleChange = event => {
    const {checked: targetChecked, value: targetValue} = event.target;
    // если поставили галочку и в outData элемента нет, то добавим
    if (targetChecked && !isChecked(targetValue))
      outData = [...value, targetValue];

    // если сняли галочку и в outData есть элемента, то уберем
    if (!targetChecked && isChecked(targetValue))
      outData = outData.filter(v => v !== targetValue);

    // прокинуть значение наверх
    onChange(outData);
  };

  // собираем контролы
  const options = [{
    id: 'snacks-pizza',
    value: 'пицца',
    label: 'Пиццу'
  }, {
    id: 'snacks-cake',
    value: 'пирог',
    label: 'Пирог'
  }].map(option => <RadioBox
    id={option.id}
    isChecked={isChecked(option.value)}
    label={option.value}
    multiple
    name={'snacks'}
    onChange={handleChange}
    value={option.value}
  />);
  return <div className="contact-form__input-group">
    <p className="contact-form__label--checkbox-group">Хочу получить:</p>
    {options}
  </div>
};

// обертки для html контролов с классами и разметкой

// универсалный компонент для radio / checkbox в зависимости от multiple
const RadioBox = ({
                    id = '',
                    isChecked = false,
                    label = '',
                    multiple = false,
                    name = '',
                    onChange,
                    value = '',
                  }) => {
  const type = multiple ? 'checkbox' : 'radio';
  return <span>
        <input className={'contact-form__input contact-form__input--' + type}
               defaultChecked={isChecked}
               onChange={onChange}
               id={id}
               name={name}
               type={type} value={value}/>
        <label className={'contact-form__label contact-form__label--' + type} htmlFor={id}>{label}</label>
    </span>
};

const InputField = ({onChange, name = null, required = false, type = 'text', placeholder = '', value = ''}) => {
  return <div className="contact-form__input-group">
    <label className="contact-form__label" htmlFor={name}>{placeholder}</label>
    <input className="contact-form__input contact-form__input--text" id={name} name={name} type={type}
           onChange={event => onChange(event.target.value)}
           defaultValue={value}/>
  </div>
};


const TextField = ({onChange, name = null, required = false, type = 'text', placeholder = '', value = ''}) => {
  return <div className="contact-form__input-group">
    <label className="contact-form__label" htmlFor={name}>{placeholder}</label>
    <textarea className="contact-form__input contact-form__input--textarea" id={name} name={name}
              onChange={event => onChange(event.target.value)}
              defaultValue={value} rows="6"
              cols="65"/>
  </div>
};
const SelectField = ({onChange, name = null, required = false, type = 'text', placeholder = '', value = '', options = []}) => {
  const optionElements = options.map(data => <SelectOption data={data}/>).filter(el => null !== el);
  if (!optionElements.length) return null;

  return <div className="contact-form__input-group">
    <label className="contact-form__label" htmlFor={name}>{placeholder}</label>
    <select defaultValue={value} className="contact-form__input contact-form__input--select" id={name} name={name}
            onChange={event => onChange(event.target.value)}>
      {optionElements}
    </select>
  </div>
};

const SelectOption = ({data}) => {
  if (!data) return null;
  if (typeof data === 'string') {
    data = {
      value: data,
      title: data
    }
  }
  return <option value={data.value}>{data.title}</option>
};