import { Dispatch, SetStateAction } from 'react'
import { buildQuery } from '../../utils/buildQuery'

export const defaultInterestRate = 2
export const minInterest = 0
export const maxInterest = 15
export const interestStep = 0.5

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

export const fetchData = (state: StateType, setData: Dispatch<SetStateAction<number[]>>) =>
    fetch(buildQuery(state, 'http://localhost:3001/savings'))
        .then((res) => {
            if (!res.ok) {
                return Promise.reject({
                    code: res.status,
                    message: res.statusText,
                })
            }
            return res.json()
        })
        .then((data) => data && setData(data))
        .catch((error) => console.error(error))
