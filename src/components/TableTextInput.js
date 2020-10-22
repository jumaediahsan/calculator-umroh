import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import NumberFormat from 'react-number-format';

import styles from '../styles/styles';

/**
 * to be wrapped with redux-form Field component
 */
export default class TableTextInput extends Component {

	handleChange = (e) => {
		console.log('eeeee', e)
		if (this.props.onChangeValue) {
			this.props.onChangeValue(e);
		}
		this.props.input.onChange(e);
	};
	render() {
		const { input, meta, symbolCurrency, disabled, ...inputProps } = this.props;
		return (
			<View style={[styles.inputContainer]}>
				<NumberFormat
					value={input.value}
					displayType={'text'}
					thousandSeparator={true}
					// decimalSeparator={'.'}
					prefix={symbolCurrency ? symbolCurrency : ''}
					decimalScale={2}
					renderText={value => (
						<TextInput
							{...inputProps}
							onChangeText={this.handleChange}
							onBlur={input.onBlur}
							onFocus={input.onFocus}
							value={value}
							style={styles.inputTable}
							keyboardType={'numeric'}
							editable={disabled ? false : true}
						/>
					)}
				/>
				{/* <TextInput
          {...inputProps}
          onChangeText={this.handleChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          style={styles.inputTable}
          keyboardType={'numeric'}
        /> */}
			</View>
		);
	}
}

// TableTextInput.propTypes = {
//   input: React.PropTypes.shape({
//     onBlur: React.PropTypes.func.isRequired,
//     onChange: React.PropTypes.func.isRequired,
//     onFocus: React.PropTypes.func.isRequired,
//     value: React.PropTypes.any.isRequired
//   }).isRequired,
//   meta: React.PropTypes.shape({
//     active: React.PropTypes.bool.isRequired,
//     error: React.PropTypes.string,
//     invalid: React.PropTypes.bool.isRequired,
//     pristine: React.PropTypes.bool.isRequired,
//     visited: React.PropTypes.bool.isRequired
//   }).isRequired
// };
