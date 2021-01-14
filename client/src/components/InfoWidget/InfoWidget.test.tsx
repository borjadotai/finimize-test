import React from 'react'
import { render, screen } from '@testing-library/react'
import InfoWidget from '.'

test('InfoWidget renders the prediction with the expected elements', () => {
    render(<InfoWidget title="IN 10 YEARS" content="300M" />)
    const years = screen.getByText(/IN 10 YEARS/i)
    const amount = screen.getByText(/300M/i)
    expect(years).toBeInTheDocument()
    expect(amount).toBeInTheDocument()
})
