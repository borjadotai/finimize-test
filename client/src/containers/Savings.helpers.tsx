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
