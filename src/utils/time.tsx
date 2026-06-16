import { format, parseISO } from 'date-fns';

export const parseDateStandard = (dateString: string | undefined | null): Date | undefined => {
    if (!dateString) return undefined
    return parseISO(dateString) 
}

export const parseDate = (dateTime: string) => {
    if (!dateTime) {
        return '-';
    }
    if (isNaN(Date.parse(dateTime))) {
        return '-'
    }
    const parsedDateTime = parseISO(dateTime)
    return format(parsedDateTime, 'dd/MM/yyyy');
};

export const parseDateTime = (dateTime: string) => {
    if (!dateTime) {
        return '-';
    }
    if (isNaN(Date.parse(dateTime))) {
        return '-'
    }
    const parsedDateTime = parseISO(dateTime)
    return format(parsedDateTime, 'dd/MM/yyyy HH:mm');
};

export const parseMonthYear = (date: string) => {
    if (!date) {
        return '-';
    }
    if (isNaN(Date.parse(date))) {
        return '-'
    }
    const parsedDate = parseISO(date)
    return format(parsedDate, 'MMM yyyy');
};