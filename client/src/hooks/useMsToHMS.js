import moment from "moment";

const useMsToHMS = () => {
  const convertTicker = (diff) => {
    let seconds = parseInt((diff/1000) % 60),
    minutes = parseInt((diff/(1000 * 60)) % 60),
    hours = parseInt((diff/(1000 * 60 * 60)) % 24);
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    if (hours > 0) {
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      return hours + ":" + minutes + ":" + seconds ;
    } else {
      return minutes + ":" + seconds ;
    }
  };

  const convertReadable = (diff) => {
    let minutes = parseInt((diff/(1000 * 60)) % 60),
    hours = parseInt((diff/(1000 * 60 * 60)) % 24);

    if (minutes == 0 && hours == 0){
      return "<1 minute"
    } else {
      return hours + ` hour${hours !== 1 && "s"}, ` + minutes + ` minute${minutes !== 1 && "s" }`
    }
  };
  
  return { convertTicker, convertReadable };
};

export default useMsToHMS;