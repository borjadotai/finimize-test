const formatAmount = (amount: number) => {
    const number = typeof amount === 'number' ? amount.toFixed(0).toString() : 'N/A'
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
    let predictions: string[] = []
    amounts.forEach((amount) => {
        let formattedAmount = formatAmount(amount)
        predictions.push(formattedAmount)
    })
    return predictions
}
