import moment from 'moment'
import { formatDatePart, formatDateToString, formatNumber, formatTime } from "./functions";

export function calcularGananciasHoy(productos, ventas) {
    let gananciasTotales = 0;
    let costoTotalProductosVendidos = 0;

    const fechaActual = moment();
    const fechaSiguiente = moment(fechaActual).add(1, 'day');

    const ventasDiaActual = ventas?.filter(venta => {
        const ventaDate = moment(venta?.date);
        return ventaDate.isSameOrAfter(fechaActual, 'day') && ventaDate.isBefore(fechaSiguiente, 'day');
    });

    ventasDiaActual.forEach(venta => {
        venta?.products.forEach(productoVenta => {
            const producto = productos?.find(p => p._id === productoVenta.productId);
            if (producto) {
                if (producto?.sellingPrice && producto?.costPrice) {
                    const gananciaPorProducto = (producto?.sellingPrice - producto?.costPrice) * productoVenta?.units;
                    gananciasTotales += gananciaPorProducto;
                    costoTotalProductosVendidos += producto?.sellingPrice * productoVenta?.units;
                }
            }
        });
    });

    // Calculamos la rentabilidad promedio de todos los productos vendidos hoy
    const rentabilidadPromedio = calcularRentabilidad(gananciasTotales, costoTotalProductosVendidos);

    return { gananciasTotales: formatNumber(gananciasTotales), rentabilidadPromedio };
}



export function calcularGananciasSemanaActual(ventas, productos) {
    let gananciasTotales = 0;

    const inicioSemana = moment().startOf('week');
    const finSemana = moment().endOf('week');

    ventas.forEach(venta => {
        const fechaVenta = moment(venta?.date); // Convertir la fecha de venta a un objeto Moment
        // Verificar si la venta ocurrió dentro de la semana actual
        if (fechaVenta.isBetween(inicioSemana, finSemana, null, '[]')) {
            venta?.products.forEach(productoVenta => {
                // Buscar el producto en el array de productos
                const producto = productos?.find(p => p._id === productoVenta?.productId);
                if (producto) {
                    // Verificar si el producto tiene las propiedades necesarias para calcular ganancias
                    if (producto?.sellingPrice && producto?.costPrice) {
                        // Calcular la ganancia por producto: (precio de venta - costo) * unidades
                        const gananciaPorProducto = (producto?.sellingPrice - producto?.costPrice) * productoVenta?.units;
                        // Sumar la ganancia por producto a las ganancias totales
                        gananciasTotales += gananciaPorProducto;
                    }
                }
            });
        }
    });

    return formatNumber(gananciasTotales);
}




export function calcularIngresosBrutosDia(ventas, productos) {
    let ingresosBrutos = 0;

    // Obtener la fecha actual
    const fechaActual = moment();
    const inicioDia = moment(fechaActual).startOf('day');
    const finDia = moment(fechaActual).endOf('day');

    // Filtrar las ventas que ocurrieron dentro del rango de fechas del día actual
    const ventasDiaActual = ventas?.filter(venta => {
        const fechaVenta = moment(venta.date);
        return fechaVenta.isBetween(inicioDia, finDia, null, '[]');
    });

    ventasDiaActual.forEach(venta => {
        venta.products.forEach(productoVenta => {
            // Buscar el producto en el array de productos
            const producto = productos?.find(p => p._id === productoVenta.productId);
            if (producto) {
                // Calcular el ingreso bruto por producto: precio de venta * unidades
                const ingresoPorProducto = producto.sellingPrice * productoVenta.units;
                // Sumar el ingreso bruto por producto a los ingresos brutos totales
                ingresosBrutos += ingresoPorProducto;
            }
        });
    });

    return formatNumber(ingresosBrutos);
}

export function calcularIngresosBrutosSemanaActual(ventas, productos) {
    let ingresosBrutos = 0;

    const inicioSemana = moment().startOf('week');
    const finSemana = moment().endOf('week');

    ventas?.forEach(venta => {
        const fechaVenta = moment(venta.date); // Convertir la fecha de venta a un objeto Moment
        // Verificar si la venta ocurrió dentro de la semana actual
        if (fechaVenta.isBetween(inicioSemana, finSemana, null, '[]')) {
            venta.products.forEach(productoVenta => {
                // Buscar el producto en el array de productos
                const producto = productos?.find(p => p._id === productoVenta.productId);
                if (producto) {
                    // Calcular el ingreso bruto por producto: precio de venta * unidades
                    const ingresoPorProducto = producto.sellingPrice * productoVenta.units;
                    // Sumar el ingreso bruto por producto a los ingresos brutos totales
                    ingresosBrutos += ingresoPorProducto;
                }
            });
        }
    });

    return formatNumber(ingresosBrutos);
}

export function calcularInventaryCost(productos) {
    let cost = 0;
    let ganancias = 0

    productos.forEach(producto => {
        if (producto.costPrice && producto.units > 0) {
            cost += producto.costPrice * producto.units
            ganancias += (producto.sellingPrice - producto.costPrice) * producto.units;
        }
    })
    return { cost: formatNumber(cost), ganancias: formatNumber(ganancias) };
}

export function calcularTotalVedido(productos) {
    let ganancias = 0;
    let articulos = 0

    productos.forEach(producto => {
        if (producto.costPrice && producto.sold > 0) {
            articulos += producto.sold
            ganancias += (producto.sellingPrice - producto.costPrice) * producto.sold;
        }
    })
    return { articulos, ganancias: formatNumber(ganancias) };
}


export function calcularRentabilidad(gananciasTotales, costoTotalProductosVendidos) {
    console.log({ gananciasTotales, costoTotalProductosVendidos })
    // Calculamos la rentabilidad dividiendo las ganancias totales entre el total de ventas
    const rentabilidad = (gananciasTotales / costoTotalProductosVendidos) * 100;

    // Devolvemos la rentabilidad redondeada a dos decimales
    return rentabilidad.toFixed(0);
}

export function calcularRotacionInventario(costOfGoodsSold, averageInventory) {
    if (costOfGoodsSold <= 0 || averageInventory <= 0) {
        return 0;
    }

    return costOfGoodsSold / averageInventory;
}
