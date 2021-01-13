import React, { Dispatch, SetStateAction } from 'react'
import { Heading, VStack } from '@chakra-ui/react'
import Input from '../components/Input'
import Slider from '../components/Slider'
import LineChart from '../components/LineChart'
import { StateType, ValueTypes } from './Savings.helpers'

type Props = {
    state: StateType
    setState: Dispatch<SetStateAction<StateType>>
    defaultInterestRate: number
    data: number[]
}

const SavingsForm = ({ state, setState, defaultInterestRate, data }: Props) => {
    const handleChange = (type: ValueTypes, val: number) =>
        state[type] !== val && setState({ ...state, [type]: val })

    return (
        <VStack spacing={4} minWidth={550}>
            <Heading as="h1">Interest Rate Calculator</Heading>
            <Input
                label="Initial Savings amount"
                name="Initial Savings"
                placeholder="5000"
                onChange={(e) => handleChange(ValueTypes.InitialSavings, parseInt(e.target.value))}
            />
            <Input
                label="Monthly Deposit"
                name="Monthly Deposit"
                placeholder="100"
                onChange={(e) => handleChange(ValueTypes.MonthlyDeposits, parseInt(e.target.value))}
            />
            <Slider
                label={`Interest Rate (${state.interestRate}%)`}
                name="Interest Rate"
                defaultValue={defaultInterestRate}
                min={0}
                max={10}
                step={0.5}
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
