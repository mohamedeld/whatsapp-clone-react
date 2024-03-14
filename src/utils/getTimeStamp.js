import moment from 'moment';

function getTimeAgo(timestamp) {
  const now = moment();
  const targetTime = moment(timestamp);
  const duration = moment.duration(now.diff(targetTime));

  if (duration.asSeconds() < 60) {
    return `منذ ${Math.floor(duration.asSeconds())}  ثانيه`;
  } else if (duration.asMinutes() < 60) {
    return `منذ ${Math.floor(duration.asMinutes())}  دقيقة`;
  } else if (duration.asHours() < 24) {
    return `منذ ${Math.floor(duration.asHours())}  ساعه`;
  } else if (duration.asDays() < 30) {
    return `منذ ${Math.floor(duration.asDays())}  يوم`;
  } else if (duration.asMonths() < 12) {
    return `منذ ${Math.floor(duration.asMonths())}  شهر`;
  } else {
    return `منذ ${Math.floor(duration.asYears())}  سنة`;
  }
}
export default getTimeAgo;