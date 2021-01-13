import React from 'react'
import { VStack } from '@chakra-ui/react'
import SavingPrediction from '../components/SavingPrediction'
import { calculatePredictionAmounts } from './Predictions.helpers'

type Props = {
    data: number[]
}

const Predictions = ({ data }: Props) => {
    // Calculate prediction numbers for SavingPredictions
    const predictedAmounts = calculatePredictionAmounts(data)

    return (
        <VStack spacing={4} align="center" minWidth={250}>
            <SavingPrediction years="10" amount={predictedAmounts[0]} />
            <SavingPrediction years="20" amount={predictedAmounts[1]} />
            <SavingPrediction years="30" amount={predictedAmounts[2]} />
            <SavingPrediction years="40" amount={predictedAmounts[3]} />
            <SavingPrediction years="50" amount={predictedAmounts[4]} />
        </VStack>
    )
}

export default Predictions
