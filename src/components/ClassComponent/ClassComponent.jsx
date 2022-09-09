import React from 'react';
import PropTypes from 'prop-types';
import style from './ClassComponent.module.css';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNumber: '',
      randomNumber:
         Math.floor(Math.random() * this.props.max - this.props.min) +
         this.props.min,
      result: 'Результат',
      count: 0,
    };
  }

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: 'Введите число',
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше, чем загаданное`,
          userNumber: ''
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше, чем загаданное`,
          userNumber: ''
        };
      }

      return {
        result: `Вы угадали, это ${state.userNumber},
                  попыток ${state.count}`,
        userNumber: '',
      };
    });
  };

  handleNewGame = () => {
    this.setState((state, props) => ({
      randomNumber:
        Math.floor(Math.random() * props.max - props.min) + props.min,
      count: 0,
    }));
  };


  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result} </p>

        <form className={style.form} onSubmit={this.handleSubmit} >

          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input onChange={this.handleChange} value={this.state.userNumber} 
            className={style.input} type='number' id='user_number'>
          </input>

          <button className={style.btn}>Угадать</button>
          <button onClick={this.handleNewGame} className={style.btn}>
            Сыграть ещё
          </button>    
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
