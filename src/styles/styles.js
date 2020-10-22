import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	input: {
		height: 30,
		paddingBottom: 1,
		color: '#FFFFFF',
		fontSize: 14,
		fontWeight: '700'
	},
	borderInput: {  
		flexDirection: 'row', 
		borderBottomWidth: 0.5, 
		borderColor: 'yellow',
		marginLeft: 5,
		paddingBottom: 1
	},
	inputContainer: {
	},
	calculatorHeader: {
		width: '100%',
		height: 100,
		backgroundColor: '#FF4500',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		padding: 20
	},
	wrapSumJamaah: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 15
	},
	wrapCurrency: {
		display: 'flex',
		flexDirection: 'row'
	},
	textHeader: {
		fontSize: 14,
		color: '#FFFFFF',
		fontFamily: 'roboto',
		fontStyle: 'normal',
		fontWeight: '500'
	},
	trStyle: {
		flexDirection: 'row',
		flex: 1,
		height: 35,
		borderWidth: 1,
		borderColor: '#ccc',
	},
	rowTr: {
		height: 35,
		justifyContent: 'center',
		alignItems: 'center'
	},
	trBackground: {
		backgroundColor: '#FFA500'
	},
	tdStyle: {
		height: 35,
		borderRightWidth: 1,
		borderColor: '#ccc',
		alignItems: 'center',
		flexDirection: 'row',
	},
	borderTable1: {
		borderWidth: 1,
		borderColor: '#ccc'
	},
	borderTableOther: {
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderColor: '#ccc'
	},
	right: {
		alignItems: 'flex-end'
	},
	center: {
		alignItems: 'center',
	},
	left: {
		alignItems: 'flex-start'
	},
	flex1: {
		flex: 1
	},
	flexhalf1: {
		flex: 1.5
	},
	flex2: {
		flex: 2
	},
	flexhalf: {
		flex: 0.5
	},
	flex2half: {
		flex: 2.5
	},
	flex3: {
		flex: 3
	},
	whiteColor: {
		color: '#FFFFFF'
	},
	blackColor: {
		color: '#464953'
	},
	brownColor: {
		color: '#8B4513'
	},
	fontSize14: {
		fontSize: 14
	},
	fontSize13: {
		fontSize: 13
	},
	paddingNone: {
		paddingTop: 0,
		paddingBottom: 0,
		paddingRight: 0,
		paddingLeft: 0,
	},
	textHeaderTable: {
		fontSize: 14,
		color: '#fff'
	},
	textTd13: {
		fontSize: 13,
		color: '#000000',
		marginLeft: 5
	},
	textTd12: {
		fontSize: 12.5,
		color: '#000000',
		marginLeft: 5
	},
	noMargin: {
		marginLeft: 0
	},
	inputTable: {
		height: 35,
		paddingBottom: 7,
		color: '#464953',
		fontSize: 14,
		fontWeight: '700',
		alignItems: 'center',
		textAlign: 'right'
	},
	inputTableText: {
		height: 35,
		paddingBottom: 7,
		color: '#464953',
		fontSize: 14,
		fontWeight: '700',
		alignItems: 'center',
		textAlign: 'left'
	},
	inputStyle2: {
		flex: 1
	},
	textTotal: {
		color: '#464953',
		fontSize: 14,
		fontWeight: '700',
	},
	marginRightTable: {
		marginRight: 7
	}
});
