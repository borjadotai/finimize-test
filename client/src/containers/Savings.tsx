import React, { useEffect, useState } from 'react'
import { Container, Stack, Heading, VStack } from '@chakra-ui/react'
import Input from '../components/Input'
import Slider from '../components/Slider'
import LineChart from '../components/LineChart'
import SavingPrediction from '../components/SavingPrediction'
import DefaultLayout from '../components/layouts/Default'
import {
    calculatePredictionAmounts,
    generateFetchUrl,
    StateType,
    ValueTypes,
} from './Savings.helpers'

const Savings = () => {
    // Setting an initial default value to initialise the state and the UI
    const defaultInterestRate = 2
    // Piece of state for api received data with fake data fallback
    const [data, setData] = useState<number[]>([100, 150, 180, 210, 240, 350])
    // Calculate prediction numbers for SavingPredictions
    const predictedAmounts = calculatePredictionAmounts(data)

    const [state, setState] = useState<StateType>({
        initialSavings: null,
        monthlyDeposits: null,
        interestRate: defaultInterestRate,
    })

    const handleChange = (type: ValueTypes, val: number) =>
        state[type] !== val && setState({ ...state, [type]: val })

    useEffect(() => {
        fetch(generateFetchUrl(state))
            .then((response) => response.json())
            .then((data) =>
                Array.isArray(data)
                    ? setData(data)
                    : console.log('Oh boy, something went wrong with the api calculations!')
            )
    }, [state])

    return (
        <DefaultLayout>
            <Container maxWidth={800} pt={6}>
                <Stack direction={['column', 'column', 'column', 'row']} spacing={10} pt={6}>
                    <VStack spacing={4} minWidth={550}>
                        <Heading as="h1">Interest Rate Calculator</Heading>
                        <Input
                            label="Initial Savings amount"
                            name="Initial Savings"
                            placeholder="5000"
                            onChange={(e) =>
                                handleChange(ValueTypes.InitialSavings, parseInt(e.target.value))
                            }
                        />
                        <Input
                            label="Monthly Deposit"
                            name="Monthly Deposit"
                            placeholder="100"
                            onChange={(e) =>
                                handleChange(ValueTypes.MonthlyDeposits, parseInt(e.target.value))
                            }
                        />
                        <Slider
                            label={`Interest Rate (${state.interestRate}%)`}
                            name="Interest Rate"
                            defaultValue={defaultInterestRate}
                            min={0}
                            max={5}
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
                    <VStack spacing={4} align="center" minWidth={250}>
                        <SavingPrediction years="10" amount={predictedAmounts[0]} />
                        <SavingPrediction years="20" amount={predictedAmounts[1]} />
                        <SavingPrediction years="30" amount={predictedAmounts[2]} />
                        <SavingPrediction years="40" amount={predictedAmounts[3]} />
                        <SavingPrediction years="50" amount={predictedAmounts[4]} />
                    </VStack>
                </Stack>
            </Container>
        </DefaultLayout>
    )
}

export default Savings
