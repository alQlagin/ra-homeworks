'use strict';
const AuthForm = ({onAuth}) => {
  const userDTO = {
    name: '',
    password: '',
    email: ''
  };
  const onSubmit = (event) => {
    event.preventDefault();
    onAuth(userDTO);
  };

  const onChangeFactory = (field, filter = null) => event => {
    filter && filter(event.target);
    userDTO[field] = event.target.value;
  };

  return <form className="ModalForm" action="/404/auth/" method="POST" onSubmit={onSubmit}>
    <InputField name="name" placehoder="Имя" required onChange={onChangeFactory('name')}/>
    <InputField name="email" placehofder="Электронная почта" type="email"
                onChange={onChangeFactory('email', Filters.email)}/>
    <InputField name="password" placehoder="Пароль" type="password"
                onChange={onChangeFactory('password', Filters.password)}/>
    <button type="submit"><span>Войти</span><i className="fa fa-fw fa-chevron-right"></i></button>
  </form>
};

const InputField = ({onChange, name = null, required = false, type = 'text', placeholder = ''}) => {
  return <div className="Input">
    <input required={required} type={type} placeholder={placeholder} onChange={onChange} name={name}/>
    <label></label>
  </div>
};

const Filters = {
  email: (input) => input.value = input.value.replace(/[^a-z0-9@\._\-]/ig, ''),
  password: (input) => input.value = input.value.replace(/[^a-z0-9_]/ig, ''),
};