export const getDataTypeFromField = (field) => {
    let dataType
    switch (field) {
        case 'name':
            dataType = 'string'
            break;
        case 'units'|| 'costPrice' || 'sellingPrice':
            dataType = 'number'
            break;
        default:
            dataType = 'string'
            break;
    }

}

export function sortArrayByFieldAndOrder(array, field, order) {
    // Convertir los valores numéricos a strings
    array.forEach(obj => {
        if (typeof obj[field] === 'number') {
            obj[field] = String(obj[field]);
        }
    });

    // Función de comparación para el ordenamiento
    const compare = (a, b) => {
        let valueA = a[field];
        let valueB = b[field];

        // Convertir a números si son strings que representan números
        if (!isNaN(valueA) && !isNaN(valueB)) {
            valueA = parseFloat(valueA);
            valueB = parseFloat(valueB);
        }

        if (valueA < valueB) {
            return order === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    };

    // Ordenar el array
    array.sort(compare);

    return array;
}

export const sortObjectsByUnitsAscending = (array) => {
    const sortedArray = array.slice().sort((a, b) => {
      const unitsA = String(a.units);
      const unitsB = String(b.units);
  
      if (unitsA < unitsB) return -1;
      if (unitsA > unitsB) return 1;
      return 0;
    });
  
    return sortedArray;
  }