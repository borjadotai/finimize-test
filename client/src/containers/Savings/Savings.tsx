import React, { useEffect, useState } from 'react'
import { Container, Stack } from '@chakra-ui/react'
import DefaultLayout from '../../components/layouts/Default'
import { defaultInterestRate, fetchData, StateType } from './Savings.helpers'
import SavingsForm from './SavingsForm'
import Predictions from '../Predictions'

const Savings = () => {
    // Piece of state for api received data with mock data fallback
    const [annualSavings, setAnnualSavings] = useState<number[]>(
        Array.from({ length: 50 }, () => 0)
    )
    // Initialise form state
    const [formState, setFormState] = useState<StateType>({
        initialSavings: null,
        monthlyDeposits: null,
        interestRate: defaultInterestRate,
    })
    // Fetch data from api on inputs change
    useEffect(() => {
        if (formState.interestRate && formState.monthlyDeposits) {
            fetchData(formState, setAnnualSavings)
        }
    }, [formState])

    return (
        <DefaultLayout>
            <Container maxWidth={800} pt={6}>
                <Stack direction={['column', 'column', 'column', 'row']} spacing={10} pt={6}>
                    <SavingsForm state={formState} setState={setFormState} data={annualSavings} />
                    <Predictions data={annualSavings} />
                </Stack>
            </Container>
        </DefaultLayout>
    )
}

export default Savings
