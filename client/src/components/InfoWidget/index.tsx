import React from 'react'
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react'

type Props = {
    title: string
    content: string
}

const InfoWidget = ({ title, content }: Props) => (
    <Stat width="100%" maxHeight={100} borderWidth={2} borderColor="grey2" borderRadius={8} p={5}>
        <StatLabel>{title}</StatLabel>
        <StatNumber>{content}</StatNumber>
    </Stat>
)

export default InfoWidget
