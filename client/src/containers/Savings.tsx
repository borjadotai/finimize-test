import React, { useEffect, useState } from 'react'
import { Container, Stack } from '@chakra-ui/react'
import DefaultLayout from '../components/layouts/Default'
import { generateFetchUrl, StateType } from './Savings.helpers'
import SavingsForm from './SavingsForm'
import Predictions from './Predictions'

const Savings = () => {
    // Setting an initial default value to initialise the state and the UI
    const defaultInterestRate = 2
    // Piece of state for api received data with mock data fallback
    const [data, setData] = useState<number[]>([100, 150, 180, 210, 240, 350])
    // Initialise form state
    const [state, setState] = useState<StateType>({
        initialSavings: null,
        monthlyDeposits: null,
        interestRate: defaultInterestRate,
    })
    // Fetch data from api on inputs change
    useEffect(() => {
        fetch(generateFetchUrl(state))
            .then((response) => response.json())
            .then((data) => setData(data))
    }, [state])

    return (
        <DefaultLayout>
            <Container maxWidth={800} pt={6}>
                <Stack direction={['column', 'column', 'column', 'row']} spacing={10} pt={6}>
                    <SavingsForm
                        state={state}
                        setState={setState}
                        defaultInterestRate={defaultInterestRate}
                        data={data}
                    />
                    <Predictions data={data} />
                </Stack>
            </Container>
        </DefaultLayout>
    )
}

export default Savings
