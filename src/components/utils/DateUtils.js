import moment from 'moment';

export function getDueDate(leasedStartDate) {
    if (leasedStartDate < new Date().getTime()) {
        const dateDifferenceInMilliSec = new Date(moment(leasedStartDate).format('ll')).getTime() - new Date().getTime();
        const numberOfDaysAfterLeased = Math.floor(dateDifferenceInMilliSec / (1000 * 60 * 60 * 24));
        const dueDate = Math.floor(14 - (Math.abs(numberOfDaysAfterLeased) % 14) + 1);
        console.log(numberOfDaysAfterLeased, dueDate)
        return dueDate;
    }
}
