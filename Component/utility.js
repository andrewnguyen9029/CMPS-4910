const padToTwo = (number) => (number <=9 ? `0${number}`: number);

export const displayTime = (centiseconds) => {
    let minutes = 0;
    let seconds = 0;
    
    if (centiseconds < 0){
        centiseconds = 0;
    }

    if (centiseconds < 100){
        return `00:00:${padToTwo(centiseconds)}`;
    }

    let remainCentisenconds = centiseconds % 100;
    seconds = (centiseconds - remainCentisenconds) / 100; 

    if (seconds < 60){
        return `00:${padToTwo(seconds)}:${padToTwo(remainCentisenconds)}`; 
    }

    let remianSeconds = seconds % 60;
    minutes = (seconds - remianSeconds) / 60; 

    return `${padToTwo(minutes)}:${padToTwo(remianSeconds)}:${padToTwo(remainCentisenconds)}`;
    //sec = (105 - 5)/100 = 1
    //sec < 60
    //return 00:01:05
};

/*
Created by Andrew Nguyen
*/