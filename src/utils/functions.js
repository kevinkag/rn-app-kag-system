export function formatNumber(number) {
    // Convertir el número a string para poder manipularlo
    let formattedNumber = number.toString();

    // Agregar comas para separar los miles
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedNumber;
}
// Función para formatear la hora (HH:MM)
export function formatTime(date) {
    const formattedDate = new Date(date);

    let hour = formattedDate.getHours();
    const minute = formattedDate.getMinutes().toString().padStart(2, '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';

    // Convertir la hora al formato de 12 horas
    hour = hour % 12;
    hour = hour ? hour : 12; // Hora '0' se convierte a '12'

    return `${hour}:${minute} ${ampm}`;
}

// Función para formatear la parte de la fecha (weekday, day month)
export function formatDatePart(date) {
    const formattedDate = new Date(date);

    const options = { weekday: 'short', day: 'numeric', month: 'numeric' };
    return formattedDate.toLocaleDateString('es-ES', options);
}

// Función para formatear el año (YY)
export function formatYear(date) {
    const formattedDate = new Date(date);

    const year = formattedDate.getFullYear().toString().slice(-2); // Obtener solo los últimos dos dígitos del año
    return year;
}

// Función principal para formatear la fecha completa
export function formatDateToString(date) {
    const formattedDate = new Date(date);
    const timePart = formatTime(formattedDate);
    const datePart = formatDatePart(formattedDate);
    const yearPart = formatYear(formattedDate);
    return `${timePart}. ${datePart}, ${yearPart}`;
}
