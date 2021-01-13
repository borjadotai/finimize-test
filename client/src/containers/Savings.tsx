import React, { useEffect, useState } from 'react'
import { Container, Heading, VStack } from '@chakra-ui/react'
import Input from '../components/Input'
import Slider from '../components/Slider'
import LineChart from '../components/LineChart'
import DefaultLayout from '../components/layouts/Default'

type StateType = {
    initialSavings: number | null
    monthlyDeposits: number | null
    interestRate: number | null
}

enum ValueTypes {
    InitialSavings = 'initialSavings',
    MonthlyDeposits = 'monthlyDeposits',
    InterestRate = 'interestRate',
}

const Savings = () => {
    // Setting an initial default value to initialise the state and the UI
    const defaultInterestRate = 2
    // Piece of state for api received data with fake data fallback
    const [data, setData] = useState<number[]>([100, 150, 180, 210, 240, 350])

    const [state, setState] = useState<StateType>({
        initialSavings: null,
        monthlyDeposits: null,
        interestRate: defaultInterestRate,
    })

    const handleChange = (type: ValueTypes, val: number) =>
        state[type] !== val && setState({ ...state, [type]: val })

    useEffect(() => {
        fetch(
            `http://localhost:3001?initialSavings=${state.initialSavings}&monthlyDeposits=${state.monthlyDeposits}&interestRate=${state.interestRate}`
        )
            .then((response) => response.json())
            .then((data) =>
                Array.isArray(data)
                    ? setData(data)
                    : console.log('Oh boy, something went wrong with the api calculations!')
            )
    }, [state])

    return (
        <DefaultLayout>
            <Container pt={6}>
                <VStack spacing={4}>
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
                        label="Interest Rate"
                        name="Interest Rate"
                        defaultValue={defaultInterestRate}
                        min={0}
                        max={15}
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
            </Container>
        </DefaultLayout>
    )
}

export default Savings
