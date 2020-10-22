import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';

import CalculatorPage from './CalculatorPage';

const wrapperCalculatorPage = reduxForm({
	form: 'calculator'
})(CalculatorPage);

const mapStateToProps = (state) => ({
	formState: state.form.calculator,
})

const mapDispatchToProps = (dispatch, props) => {
	let sumJamaah = 0;
	let cursUsd = 0;
	let cursSar = 0;
	let inputTicket = 0;
	let inputVs = 0;
	let inputAirport = 0;
	let inputEquipment = 0;
	let inputHotelMekah = 0;
	let nightHotelMekah = 0;
	let inputEatInMekah = 0;
	let nightEatInMekah = 0;
	let inputHotelMadinah = 0;
	let nightHotelMadinah = 0;
	let inputEatInMadinah = 0;
	let nightEatInMadinah = 0;
	let inputSnack = 0;
	let inputZamzam = 0;
	let inputMutowwif = 0;
	let nightMutowwif = 0;
	let inputTransport = 0;
	let inputPorterBan = 0;
	let inputHandlingSaudi = 0;

	// console.lov()

	return {
		handleChangeOtherValue: (fieldName, opt = null) => (value) => {
			sumJamaah = opt && opt.formState && opt.formState.values && opt.formState.values.sum_jamaah;
			cursUsd = opt && opt.formState && opt.formState.values && opt.formState.values.usd;
			cursSar = opt && opt.formState && opt.formState.values && opt.formState.values.sar;

			inputTicket = opt && opt.formState && opt.formState.values && opt.formState.values.input_ticket;
			let firstReplaceTicket = inputTicket ? inputTicket.replace('$', '') : 0;
			let replaceTicket = inputTicket ? firstReplaceTicket.replace(/,/gi, '') : 0;

			inputVs = opt && opt.formState && opt.formState.values && opt.formState.values.input_vs;
			let firstReplaceVs = inputVs ? inputVs.replace('$ ', '') : 0;
			let replaceVs = inputVs ? firstReplaceVs.replace(/,/gi, '') : 0;
			
			inputAirport = opt && opt.formState && opt.formState.values && opt.formState.values.input_airport;
			let firstReplaceAirport = inputAirport ? inputAirport.replace('$ ', '') : 0;
			let replaceAirport = inputAirport ? firstReplaceAirport.replace(/,/gi, '') : 0;

			inputEquipment = opt && opt.formState && opt.formState.values && opt.formState.values.input_equipment;
			let replaceEquipment = inputEquipment ? inputEquipment.replace(/Rp|,/gi, '') : 0;
		

			inputHotelMekah = opt && opt.formState && opt.formState.values && opt.formState.values.input_HMK;
			let replaceInputHotelMekah = inputHotelMekah ? inputHotelMekah.replace(/SR|,/gi, '') : 0;
			nightHotelMekah = opt && opt.formState && opt.formState.values && opt.formState.values.night_HMK;

			inputEatInMekah = opt && opt.formState && opt.formState.values && opt.formState.values.input_eating_on_MKH;
			let replaceInputEatInMekah = inputEatInMekah ? inputEatInMekah.replace(/SR|,/gi, '') : 0;
			nightEatInMekah = opt && opt.formState && opt.formState.values && opt.formState.values.night_eating_on_MKH;

			inputHotelMadinah = opt && opt.formState && opt.formState.values && opt.formState.values.input_HMDN;
			let replaceInputHotelMadinah = inputHotelMadinah ? inputHotelMadinah.replace(/SR|,/gi, '') : 0;
			nightHotelMadinah = opt && opt.formState && opt.formState.values && opt.formState.values.night_HMDN;

			inputEatInMadinah = opt && opt.formState && opt.formState.values && opt.formState.values.input_eating_on_MDN;
			let replaceInputEatMadinah = inputEatInMadinah ? inputEatInMadinah.replace(/SR|,/gi, '') : 0;
			nightEatInMadinah = opt && opt.formState && opt.formState.values && opt.formState.values.night_eating_on_MDN;

			inputSnack = opt && opt.formState && opt.formState.values && opt.formState.values.input_snack;
			let replaceInputSnack = inputSnack ? inputSnack.replace(/SR|,/gi, '') : 0;

			inputZamzam = opt && opt.formState && opt.formState.values && opt.formState.values.input_zamzam;
			let replaceInputZamzam = inputZamzam ? inputZamzam.replace(/SR|,/gi, '') : 0;

			inputMutowwif = opt && opt.formState && opt.formState.values && opt.formState.values.input_mutowwif;
			let replaceInputMutowwif = inputMutowwif ? inputMutowwif.replace(/SR|,/gi, '') : 0;
			nightMutowwif = opt && opt.formState && opt.formState.values && opt.formState.values.night_mutowwif;

			inputTransport = opt && opt.formState && opt.formState.values && opt.formState.values.input_transport;
			let replaceInputTransport = inputTransport ? inputTransport.replace(/SR|,/gi, '') : 0

			inputPorterBan = opt && opt.formState && opt.formState.values && opt.formState.values.input_porter_ban;
			let replaceInputPorterBan = inputPorterBan ? inputPorterBan.replace(/SR|,/gi, '') : 0;

			inputHandlingSaudi = opt && opt.formState && opt.formState.values && opt.formState.values.input_handling_saudi;
			let replaceInputHandlingSaudi = inputHandlingSaudi ? inputHandlingSaudi.replace(/SR|,/gi, '') : 0;

			switch (fieldName) {
				case 'qty_ticket':
					let amountTicketUsd = `${Number(replaceTicket * value)}`;
					dispatch(change('calculator', 'unit_ticket', 'Pack'))
					dispatch(change('calculator', 'amount_usd_ticket', `${Number(replaceTicket) * Number(value)}`));
					dispatch(change('calculator', 'amount_rp_ticket', `${Number(amountTicketUsd) * Number(cursUsd)}`))
					dispatch(change('calculator', 'amount_sar_ticket', `${Number(amountTicketUsd) * Number(cursUsd) / Number(cursSar)}`))
					break;
				case 'qty_vs':
					let amountVisaUsd = `${Number(replaceVs * value)}`;
					dispatch(change('calculator', 'unit_vs', 'Pack'))
					dispatch(change('calculator', 'amount_usd_vs', `${Number(replaceVs) * Number(value)}`));
					dispatch(change('calculator', 'amount_rp_vs', `${Number(amountVisaUsd) * Number(cursUsd)}`))
					dispatch(change('calculator', 'amount_sar_vs', `${Number(amountVisaUsd) * Number(cursUsd) / Number(cursSar)}`))
					break;
				case 'qty_airport':
					let amountAirportUsd = `${Number(replaceAirport) * Number(value)}`;
					dispatch(change('calculator', 'unit_airport', 'Pack'))
					dispatch(change('calculator', 'amount_usd_airport', `${Number(replaceAirport) * Number(value)}`));
					dispatch(change('calculator', 'amount_rp_airport', `${Number(amountAirportUsd) * Number(cursUsd)}`))
					dispatch(change('calculator', 'amount_sar_airport', `${Number(amountAirportUsd) * Number(cursUsd) / Number(cursSar)}`))
					break;
				case 'qty_equipment':
					let amountEqiupmentUsd = `${Number(replaceEquipment * value)}`
					dispatch(change('calculator', 'unit_equipment', 'Pack'))
					dispatch(change('calculator', 'amount_rp_equipment', `${Number(replaceEquipment) * Number(value)}`))
					dispatch(change('calculator', 'amount_usd_equipment', `${(Number(replaceEquipment) / Number(cursUsd)) * Number(value)}`));
					dispatch(change('calculator', 'amount_sar_equipment', `${Number(amountEqiupmentUsd) / Number(cursSar)}`))
					break;
					
				case 'qty_HMK':
					let amountSarQty =  `${(Number(replaceInputHotelMekah) * Number(nightHotelMekah)) / Number(value)}`
					dispatch(change('calculator', 'unit_HMK', 'Org'))
					dispatch(change('calculator', 'amount_sar_HMK', `${(Number(replaceInputHotelMekah) * Number(nightHotelMekah)) / Number(value)}`));
					dispatch(change('calculator', 'amount_rp_HMK', `${Number(amountSarQty * cursSar)}`))
					dispatch(change('calculator', 'amount_usd_HMK', `${Number(amountSarQty * cursSar) / Number(cursUsd)}`))
					break;
				case 'night_eating_on_MKH':
					let amountSarEatInMekah = `${Number(replaceInputEatInMekah) * Number(value)}`
					dispatch(change('calculator', 'unit_eating_on_MKH', 'Sehari'));
					dispatch(change('calculator', 'qty_eating_on_MKH', '3x'))
					dispatch(change('calculator', 'amount_sar_eating_on_MKH', `${Number(replaceInputEatInMekah) * Number(value)}`));
					dispatch(change('calculator', 'amount_rp_eating_on_MKH', `${Number(amountSarEatInMekah) * Number(cursSar)}`));
					dispatch(change('calculator', 'amount_usd_eating_on_MKH', `${Number(amountSarEatInMekah * cursSar) / Number(cursUsd)}`));
					break;
				case 'qty_HMDN':
					let amountSarQtyMadinah = `${(Number(replaceInputHotelMadinah) * Number(nightHotelMadinah)) / Number(value)}`;
					dispatch(change('calculator', 'unit_HMDN', 'Org'))
					dispatch(change('calculator', 'amount_sar_HMDN', `${(Number(replaceInputHotelMadinah) * Number(nightHotelMadinah)) / Number(value)}`));
					dispatch(change('calculator', 'amount_rp_HMDN', `${Number(amountSarQtyMadinah) * Number(cursSar)}`));
					dispatch(change('calculator', 'amount_usd_HMDN', `${Number(amountSarQtyMadinah * cursSar) / Number(cursUsd)}`));
					break;
				case 'night_eating_on_MDN':
					let amountSarEatInMadinah = `${Number(replaceInputEatMadinah) * Number(value)}`
					dispatch(change('calculator', 'unit_eating_on_MDN', 'Sehari'));
					dispatch(change('calculator', 'qty_eating_on_MDN', '3x'))
					dispatch(change('calculator', 'amount_sar_eating_on_MDN', `${Number(replaceInputEatMadinah) * Number(value)}`));
					dispatch(change('calculator', 'amount_rp_eating_on_MDN', `${Number(amountSarEatInMadinah) * Number(cursSar)}`));
					dispatch(change('calculator', 'amount_usd_eating_on_MDN', `${Number(amountSarEatInMadinah * cursSar) / Number(cursUsd)}`));
					break;
				case 'qty_snack':
					let amountSarQtySnack = `${Number(replaceInputSnack) * Number(value)}`
					dispatch(change('calculator', 'unit_snack', 'Kali'))
					dispatch(change('calculator', 'amount_sar_snack', `${Number(replaceInputSnack) * Number(value)}`));
					dispatch(change('calculator', 'amount_rp_snack', `${Number(amountSarQtySnack) * Number(cursSar)}`));
					dispatch(change('calculator', 'amount_usd_snack', `${Number(amountSarQtySnack * cursSar) / Number(cursUsd)}`));
					break;
				case 'qty_zamzam':
					let amountSarZamzam = `${Number(replaceInputZamzam) * Number(value)}`
					dispatch(change('calculator', 'unit_zamzam', 'Galon'))
					dispatch(change('calculator', 'amount_sar_zamzam', `${Number(replaceInputZamzam) * Number(value)}`));
					dispatch(change('calculator', 'amount_rp_zamzam', `${Number(amountSarZamzam) * Number(cursSar)}`));
					dispatch(change('calculator', 'amount_usd_zamzam', `${Number(amountSarZamzam * cursSar) / Number(cursUsd)}`));
					break;
				case 'night_mutowwif':
					let amountSarMutowwif = `${Number(replaceInputMutowwif * value) / Number(sumJamaah)}`
					dispatch(change('calculator', 'unit_mutowwif', 'Org'))
					dispatch(change('calculator', 'qty_mutowwif', 1))
					dispatch(change('calculator', 'amount_sar_mutowwif', `${Number(replaceInputMutowwif * value) / Number(sumJamaah)}`));
					dispatch(change('calculator', 'amount_rp_mutowwif', `${Number(amountSarMutowwif) * Number(cursSar)}`));
					dispatch(change('calculator', 'amount_usd_mutowwif', `${Number(amountSarMutowwif * cursSar) / Number(cursUsd)}`));
					break;
				case 'input_transport':
					let amountSarTransport = `${(Number(replaceInputTransport) * Number(value)) / Number(sumJamaah)}`
					dispatch(change('calculator', 'unit_transport', 'Unit'))
					dispatch(change('calculator', 'qty_transport', 1))
					dispatch(change('calculator', 'amount_sar_transport', `${(Number(replaceInputTransport) * Number(value)) / Number(sumJamaah)}`));
					dispatch(change('calculator', 'amount_rp_transport', `${Number(amountSarTransport) * Number(cursSar)}`));
					dispatch(change('calculator', 'amount_usd_transport', `${Number(amountSarTransport * cursSar) / Number(cursUsd)}`));
					break;
				case 'qty_porter_ban':
					let amountSarPorterBan = `${Number(value) * Number(replaceInputPorterBan)}`
					dispatch(change('calculator', 'unit_porter_ban', 'Team'))
					dispatch(change('calculator', 'amount_sar_porter_ban', `${Number(value) * Number(replaceInputPorterBan)}`));
					dispatch(change('calculator', 'amount_rp_porter_ban', `${Number(amountSarPorterBan) * Number(cursSar)}`));
					dispatch(change('calculator', 'amount_usd_porter_ban', `${Number(amountSarPorterBan * cursSar) / Number(cursUsd)}`));
					break;
				case 'input_handling_saudi':
					let amountSarHandlingSaudi = `${(Number(replaceInputHandlingSaudi) * Number(value)) / Number(sumJamaah)}`
					dispatch(change('calculator', 'unit_handling_saudi', 'Team'))
					dispatch(change('calculator', 'qty_handling_saudi', 1))
					dispatch(change('calculator', 'amount_sar_handling_saudi', `${(Number(replaceInputHandlingSaudi) * Number(value)) / Number(sumJamaah)}`));
					dispatch(change('calculator', 'amount_rp_handling_saudi', `${Number(amountSarHandlingSaudi) * Number(cursSar)}`));
					dispatch(change('calculator', 'amount_usd_handling_saudi', `${Number(amountSarHandlingSaudi * cursSar) / Number(cursUsd)}`));
					break;

				default:
					break;
			}
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(wrapperCalculatorPage);