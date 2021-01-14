import React from 'react'
import { VStack } from '@chakra-ui/react'
import { InfoWidget } from '../../components'
import { calculatePredictionAmounts } from './Predictions.helpers'

type Props = {
    data: number[]
}

const Predictions = ({ data }: Props) => {
    // Calculate prediction numbers for SavingPredictions
    const predictedAmounts = calculatePredictionAmounts(data)

    const savingPredictions = predictedAmounts.map((prediction, i) => (
        <InfoWidget
            title={`IN ${i + 1}0 YEARS`}
            content={`$ ${prediction}`}
            key={`${prediction}-${i}`}
        />
    ))

    return (
        <VStack spacing={4} align="center" minWidth={250}>
            {savingPredictions}
        </VStack>
    )
}

export default Predictions
