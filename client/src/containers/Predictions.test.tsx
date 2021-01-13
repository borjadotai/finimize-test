import { formatAmount, calculatePredictionAmounts } from './Predictions.helpers'

describe('formatAmount util', () => {
    test('formats a 6 digit value correctly', () => {
        const formattedValue = formatAmount(123456)
        expect(formattedValue).toBe('123,456')
    })
    test('formats a 7 digit value correctly', () => {
        const formattedValue = formatAmount(1234567)
        expect(formattedValue).toBe('1 M')
    })
    test('formats a 10 digit value correctly', () => {
        const formattedValue = formatAmount(1234567890)
        expect(formattedValue).toBe('1 B')
    })
})

describe('calculatePredictionAmounts ', () => {
    test('returns the correct amounts', () => {
        const calculations = calculatePredictionAmounts(mockData)
        expect(calculations).toStrictEqual(['19,400', '36,985', '58,461', '84,686', '116,713'])
    })
})

const mockData = [
    6314.001554865739,
    7654.525384480934,
    9022.106823872611,
    10417.292013460388,
    11840.638117156373,
    13292.71354486723,
    14774.098179487375,
    16285.383608473805,
    17827.173360095177,
    19400.083144449367,
    21004.741099345865,
    22641.788041151147,
    24311.877720697146,
    26015.6770843551,
    27753.866540379044,
    29527.140230625213,
    31336.206307755954,
    33181.78721803885,
    35064.61998985388,
    36985.45652802402,
    38945.06391408661,
    40944.22471262559,
    42983.737283786795,
    45064.416102101204,
    47187.09208174344,
    49352.61290835536,
    51561.843377567304,
    53815.66574035225,
    56114.98005535055,
    58460.70454830635,
    60853.775978758786,
    63295.1500141347,
    65785.80161139223,
    68326.72540636754,
    70918.9361109802,
    73563.46891845616,
    76261.37991672961,
    79013.74651018924,
    81821.66784993716,
    84686.26527273221,
    87608.68274879328,
    90590.08733864098,
    93631.66965916065,
    96734.64435907225,
    99900.25060399759,
    103129.75257131807,
    106424.43995502107,
    109785.62848073608,
    113214.66043116669,
    116712.90518212804,
]
