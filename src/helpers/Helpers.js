import moment from 'moment';
export default class Helpers {
  //Validations
  static isEmailValid(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) === true;
  }
  static getGreeting = () => {
    const currentTime = moment();
    const noon = moment('12:00', 'HH:mm');
    const evening = moment('18:00', 'HH:mm');
    if (currentTime.isBefore(noon)) {
      return 'Good morning';
    } else if (currentTime.isBefore(evening)) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };
}
