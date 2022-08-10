

const formatDate: (dateStr: string) => string = (dateStr) => {
    const date = new Date(dateStr);
    if(isToday(date)) return date.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: '2-digit' });
    if(isInLastWeek(date) &&  new Date().getDate() - date.getDate() === 1) return "Yesterday";
    if(isInLastWeek(date)) return date.toLocaleString('en-us', {weekday:'long'});
    if(isInCurrentYear(date)) return `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDate()).slice(-2)}`;
    return `${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}`;
}

const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() ===  today.getDate() &&
                                    date.getMonth() === today.getMonth() &&
                                    date.getFullYear() === today.getFullYear()
}

const isInLastWeek: (date: Date) => boolean = (date) => {
    return date.getTime() - getLastWeek().getTime() < (7*24*60*60*1000) && date > getLastWeek();
}


const isInCurrentYear: (date: Date) => boolean = (date: Date) => {
    return date.getFullYear() === new Date().getFullYear();
}

const getLastWeek = () => {
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()-6);
    return nextweek;
}


export default formatDate;