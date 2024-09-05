require('@nomiclabs/hardhat-waffle')

module.exports = {
	solidity: '0.8.4',
	networks: {
		ropsten: {
			url: 'https://eth-ropsten.alchemyapi.io/v2/pMt5xOjzggdBlomDGeQ4_B1NvO1U2yFO',
			accounts: [
				'379c2ae42fa26707699eb3159cf1824c6fe43195fbc4239038ac5c0f844b4c08',
			],
		},
	},
}
