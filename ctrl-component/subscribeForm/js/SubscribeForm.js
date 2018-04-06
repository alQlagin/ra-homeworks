const VALIDITY_VALID = 'is-valid';
const VALIDITY_INVALID = 'is-error';
const VALIDITY_DEFAULT = '';

class SubscribeForm extends React.Component {
  // сейчас висит на blur, для большей интерактивности можно повесить на change
  onEmailUpdate = event => {
    this.setState({
      validity: event.currentTarget.validity.valid ? VALIDITY_VALID : VALIDITY_INVALID,
      touched: true
    })
  };

  onFormSubmit = event => {
    event.preventDefault();
  };

  constructor(props) {
    super(props);
    this.state = {
      validity: VALIDITY_DEFAULT,
      touched: false
    };
  }

  render() {
    return (
      <div className="subscribe__form">
        <form className={`form form--subscribe  ${this.state.touched && this.state.validity}`}
              noValidate
              onSubmit={this.onFormSubmit}>
          <h4 className="form-title">Подписаться:</h4>
          <div className="form-group">
            <label htmlFor="input-email" className="sr-only">Email</label>
            <input type="email" id="input-email" placeholder="Email" className="form-control"
                   onBlur={this.onEmailUpdate}/>
            <div className="form-error">Пожалуйста, проверьте корректность адреса электронной почты</div>
            <button type="submit" className="form-next">
              <i className="material-icons">keyboard_arrow_right</i>
            </button>
          </div>
        </form>
      </div>
    )
  }
}