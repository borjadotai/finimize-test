import React from 'react'
import { render, screen } from '@testing-library/react'
import SavingPrediction from './'

test('SavingPrediction renders the prediction with the expected elements', () => {
    render(<SavingPrediction years="10" amount="300M" />)
    const years = screen.getByText(/IN 10 YEARS/i)
    const amount = screen.getByText(/300M/i)
    expect(years).toBeInTheDocument()
    expect(amount).toBeInTheDocument()
})
