'use strict';
const AuthForm = ({onAuth}) => {
    const userDTO = {};
    const onSubmit = (event) => {
        event.preventDefault();
        onAuth(userDTO);
    };

    const onChangeFactory = field => event => userDTO[field] = event.target.value;

    return <form className="ModalForm" action="/404/auth/" method="POST" onSubmit={onSubmit}>
        <InputField name={'name'} placehoder={'Имя'} required onChange={onChangeFactory('name')}/>
        <InputField name={'email'} placehoder={'Электронная почта'} type={'email'} onChange={onChangeFactory('email')}/>
        <InputField name={'password'} placehoder={'Пароль'} type={'password'} onChange={onChangeFactory('password')}/>
        <button type="submit"><span>Войти</span><i className="fa fa-fw fa-chevron-right"></i></button>
    </form>
};

const InputField = ({onChange, name = null, required = false, type = 'text', placeholder = ''}) => {
    return <div className="Input">
        <input required={required} type={type} placeholder={placeholder} onChange={onChange} name={name}/>
        <label></label>
    </div>
};