import React, { Dispatch, SetStateAction } from 'react'
import { Heading, VStack } from '@chakra-ui/react'
import { Input, Slider, LineChart } from '../../components'
import {
    StateType,
    ValueTypes,
    defaultInterestRate,
    minInterest,
    maxInterest,
    interestStep,
} from './Savings.helpers'

type Props = {
    state: StateType
    setState: Dispatch<SetStateAction<StateType>>
    data: number[]
}

const SavingsForm = ({ state, setState, data }: Props) => {
    const handleChange = (type: ValueTypes, val: number) =>
        state[type] !== val && setState({ ...state, [type]: val })

    return (
        <VStack spacing={4} minWidth={550}>
            <Heading as="h1">Interest Rate Calculator</Heading>
            <Input
                label="Initial Savings amount"
                name="Initial Savings"
                type="number"
                min="0"
                placeholder="5000"
                onChange={(e) => handleChange(ValueTypes.InitialSavings, parseInt(e.target.value))}
            />
            <Input
                label="Monthly Deposit"
                name="Monthly Deposit"
                type="number"
                min="0"
                placeholder="100"
                onChange={(e) => handleChange(ValueTypes.MonthlyDeposits, parseInt(e.target.value))}
            />
            <Slider
                label={`Interest Rate (${state.interestRate}%)`}
                name="Interest Rate"
                defaultValue={defaultInterestRate}
                min={minInterest}
                max={maxInterest}
                step={interestStep}
                onChangeEnd={(val) => handleChange(ValueTypes.InterestRate, val)}
            />
            <LineChart
                title="Savings Over time"
                xAxisData={Array.from({ length: 50 }, (_, i) => i + 1)}
                yAxisData={data}
                xLabel="Years"
                yLabel="Amount"
            />
        </VStack>
    )
}

export default SavingsForm
