import React from 'react'
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react'

type Props = {
    years: string
    amount: string
}

const SavingPrediction = ({ years, amount }: Props) => {
    return (
        <Stat
            width="100%"
            maxHeight={100}
            borderWidth={2}
            borderColor="grey2"
            borderRadius={8}
            p={5}
        >
            <StatLabel>IN {years} YEARS</StatLabel>
            <StatNumber>$ {amount}</StatNumber>
        </Stat>
    )
}

export default SavingPrediction
