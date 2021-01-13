export type StateType = {
    initialSavings: number | null
    monthlyDeposits: number | null
    interestRate: number | null
}

export enum ValueTypes {
    InitialSavings = 'initialSavings',
    MonthlyDeposits = 'monthlyDeposits',
    InterestRate = 'interestRate',
}

export const generateFetchUrl = (state: StateType) =>
    `http://localhost:3001?initialSavings=${state.initialSavings}&monthlyDeposits=${state.monthlyDeposits}&interestRate=${state.interestRate}`

export const calculatePredictionAmounts = (data: number[]) => {
    const amounts = [data[9], data[19], data[29], data[39], data[49]]
    let predictions: string[] = []
    amounts.forEach((amount) => {
        const number = typeof amount === 'number' ? amount.toFixed(0).toString() : 'N/A'
        let newAmount = number.length > 12 ? `${number.slice(0, 11)} +` : number
        predictions.push(newAmount)
    })
    return predictions
}
