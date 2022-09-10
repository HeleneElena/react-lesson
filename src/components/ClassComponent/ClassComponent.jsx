import React from 'react';
import PropTypes from 'prop-types';
import {min, max} from '../../data';
import style from './ClassComponent.module.css';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * max - min) + min,
      result: `Загадано число от ${min} до ${max}. У вас 5 попыток!`,
      count: 0,
      textBtn: 'Угадать',
    };
  }

  handleChange = e => {
    this.setState(state => ({
      userNumber: e.target.value,
      count: state.count + 1,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
  
    this.setState(state => {
      if (state.userNumber === '' || (min > state.userNumber > max || state.userNumber === ' ')) {
        return {
          count: state.count,
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
        result: `Поздравляем, вы угадали! Это ${state.userNumber},
                  попыток ${state.count}`,
        userNumber: '',
        textBtn: 'Сыграть ещё',
      };
    });
    this.handleSubmit();
  };

  handleNewGame = () => {
    this.setState({
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * max - min) + min,
      result: 'Загадано число от 1 до 10. У вас 5 попыток!',
      count: 0,
    });
    this.handleSubmit();
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result} </p>
        { 
          this.state.count < 5 &&
            <form className={style.form} onSubmit={this.handleSubmit} >
              <label className={style.label} htmlFor='user_number'>
                Введите число
              </label>

              <input onChange={this.handleChange} value={this.state.userNumber} 
                className={style.input} type='number' id='user_number'>
              </input>

              <button className={style.btn}>
                {this.state.textBtn}
              </button>
            </form>
        }
        { 
          this.state.count === 5 &&
          <form className={style.form} onSubmit={this.handleSubmit} >
            <p>Ваши 5 попыток закончились!</p>
            <button onClick={this.handleNewGame} className={style.btn}>
              Сыграть ещё
            </button>   
          </form>  
        }
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};