// This amount formatter could be re-used as a util across the project
export const formatAmount = (amount: number) => {
    const number = amount.toFixed(0).toString()
    if (number.length > 3 && number.length < 7) {
        return `${number.slice(0, -3)},${number.slice(number.length - 3)}`
    }
    if (number.length > 6 && number.length < 10) {
        return `${number.slice(0, -6)} M`
    }
    if (number.length >= 10) {
        return `${number.slice(0, -9)} B`
    }
    return number
}

export const calculatePredictionAmounts = (data: number[]) => {
    const amounts = [data[9], data[19], data[29], data[39], data[49]]
    const formattedAmounts = amounts.map((amount) => formatAmount(amount))
    return formattedAmounts
}
