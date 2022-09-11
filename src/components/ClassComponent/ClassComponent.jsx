import React from 'react';
import PropTypes from 'prop-types';
import style from './ClassComponent.module.css';
import {Heart} from './../Heart/Heart';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() * (props.max - props.min) + props.min),
      result: `Загадано число от ${props.min} до ${props.max}. У вас 6 попыток!`,
      count: 0,
      isStatus: false,
    };
  }

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState(((state, props) => {
      if (state.isStatus) {
        return {
          userNumber: '',
          randomNumber:
          Math.floor(Math.random() * (props.max - props.min) + props.min),
          result: `Загадано число от ${props.min} до ${props.max}. У вас 6 попыток!`,
          count: 0,
          isStatus: false,
        };
      }
    }));
  
    this.setState(state => {
      if (state.userNumber.trim() === '' || 
        !(state.userNumber >= this.props.min && state.userNumber <= this.props.max)) {
        return {
          count: state.count,
        };
      }

      if (state.userNumber > state.randomNumber && state.count < 5) {
        return {
          result: `${state.userNumber} больше, чем загаданное, у вас осталось ${5 - state.count} попыток`,
          userNumber: '',
          count: state.count + 1,
        };
      }

      if (state.userNumber < state.randomNumber && state.count < 5) {
        return {
          result: `${state.userNumber} меньше, чем загаданное, у вас осталось ${5 - state.count} попыток`,
          userNumber: '',
          count: state.count + 1,
        };
      }

      if (state.count === 5) {
        return {
          result: `У вас закончились попытки. Попробуйте еще!`,
          userNumber: '',
          count: state.count,
          isStatus: true,
        };
      }

      return {
        result: `Поздравляем, вы угадали! Это ${state.userNumber},
                  попыток ${state.count}`,
        userNumber: '',
        isStatus: true,
      };
    }); 
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit} >
          <div className={style.position}>
            <Heart />
          </div>
          <label className={style.label} htmlFor='user_number'>
            Введите число
          </label>

          <input onChange={this.handleChange} 
            value={this.state.userNumber}
            disabled={this.state.isStatus}
            className={style.input} type='number' id='user_number'>
          </input>

          <button className={style.btn}>
            {this.state.isStatus ? 'Сыграть ещё' : 'Угадай'}
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