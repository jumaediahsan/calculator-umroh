import React, { Component } from 'react';
import { Field } from 'redux-form';
import { ScrollView, Text, View, Image, StyleSheet, TouchableOpacity, PermissionsAndroid, ToastAndroid } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import {ViewShot, captureScreen} from "react-native-view-shot";
// import RNFetchBlob from 'react-native-fetch-blob';
// import Share from 'react-native-share';
import numeral from 'numeral'

import MyTextInput from './MyTextInput';
import TableTextInput from './TableTextInput'
import TableTextInputForText from './TableTextInputForText'
import styles from '../styles/styles';
import ShareIcon from '../image/ShareIcon.png'

class CalculatorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dolar: true,
      rupiah: false,
      saudi: false,
      viewShot: {}
    }
  }

  handleSwitchDolar() {
    this.setState({
      dolar: true,
      rupiah: false,
      saudi: false
    })
  }

  handleSwitchRupiah() {
    this.setState({
      rupiah: true,
      dolar: false,
      saudi: false
    })
  }

  handleSwitchSaudi() {
    this.setState({
      saudi: true,
      rupiah: false,
      dolar: false
    })
  }

  testAlert() {
    console.log('aaaaaa')
  }

  // async onShare() {
  //   if (Platform.OS == 'android') {
  //     const granted = await PermissionsAndroid.check(
  //       'android.permission.WRITE_EXTERNAL_STORAGE'
  //     );
  //     if (!granted) {
  //       const response = await PermissionsAndroid.request(
  //         'android.permission.WRITE_EXTERNAL_STORAGE'
  //       );
  //       if (!response) {
  //         return;
  //       }
  //     }
  //   }
  //   // console.log('this.refs.viewShot', this.refs.viewShot !== undefined ? this.refs.viewShot : null)
  //   setTimeout(() => {
  //     // console.log(this.state.viewShot)
  //     this.state.viewShot.capture().then(uri => {
  //       RNFetchBlob.fs.readFile(uri, 'base64')
  //         .then((data) => {
  //           this.setState({ spinner: false })
  //           let shareOptions = {
  //             url: `data:image/png;base64,${data}`,
  //           }
  //           Share.open(shareOptions).then((r) => { console.log(r) }).catch((err) => { err && console.log(err); })
  //         })
  //     });
  //   }, 10);

  //   setTimeout(() => {
  //     this.setState({ showShare: true });
  //   }, 100);
  // }

  async downloadCalculator() {
    if (Platform.OS == 'android') {
      const granted = await PermissionsAndroid.check(
        'android.permission.WRITE_EXTERNAL_STORAGE'
      );
      if (!granted) {
        const response = await PermissionsAndroid.request(
          'android.permission.WRITE_EXTERNAL_STORAGE'
        );
        if (!response) {
          return;
        }
      }
    }
    this.state.viewShot.capture().then(uri => {
      // alert(uri);
      CameraRoll.saveToCameraRoll(uri, 'photo');
      alert('Download Success')
    });
  }

  async takeScreenShot(){
    if (Platform.OS == 'android') {
      const granted = await PermissionsAndroid.check(
        'android.permission.WRITE_EXTERNAL_STORAGE'
      );
      if (!granted) {
        const response = await PermissionsAndroid.request(
          'android.permission.WRITE_EXTERNAL_STORAGE'
        );
        if (!response) {
          return;
        }
      }
    }
    //handler to take screnshot
    captureScreen({
      //either png or jpg or webm (Android). Defaults to png
      format: "jpg",
      //quality 0.0 - 1.0 (default). (only available on lossy formats like jpg)
      quality: 0.8
    })
    .then(uri => {
      CameraRoll.saveToCameraRoll(uri, 'photo');
      alert('Download Success')
    }
      //callback function to get the result URL of the screnshot
      // uri => this.setState({ imageURI : uri }),
      // error => console.error("Oops, Something Went Wrong", error)
    );
  }

  totalUsdArrangement(){
    const { formState } = this.props;
    let total = 0;
    let amountHotelMekah = formState && formState.values && formState.values.amount_usd_HMK ? formState.values.amount_usd_HMK : 0;
    let amountEatInMekah = formState && formState.values && formState.values.amount_usd_eating_on_MKH ? formState.values.amount_usd_eating_on_MKH : 0;
    let amountHotelMadinah = formState && formState.values && formState.values.amount_usd_HMDN ? formState.values.amount_usd_HMDN : 0;
    let amountEatInMadinah = formState && formState.values && formState.values.amount_usd_eating_on_MDN ? formState.values.amount_usd_eating_on_MDN : 0;
    let amountSnack = formState && formState.values && formState.values.amount_usd_snack ? formState.values.amount_usd_snack : 0;
    let amountZamzam = formState && formState.values && formState.values.amount_usd_zamzam ? formState.values.amount_usd_zamzam : 0;
    let amountMutowwif = formState && formState.values && formState.values.amount_usd_mutowwif ? formState.values.amount_usd_mutowwif : 0;
    let amountTransport = formState && formState.values && formState.values.amount_usd_transport ? formState.values.amount_usd_transport : 0;
    let amountPorterBan = formState && formState.values && formState.values.amount_usd_porter_ban ? formState.values.amount_usd_porter_ban : 0;
    let amountHandlingSaudi = formState && formState.values && formState.values.amount_usd_handling_saudi ? formState.values.amount_usd_handling_saudi : 0;

    total = Number(amountHotelMekah) + Number(amountEatInMekah) + Number(amountHotelMadinah) + Number(amountEatInMadinah) + Number(amountSnack) + Number(amountZamzam) + Number(amountMutowwif) + Number(amountTransport) + Number(amountPorterBan) + Number(amountHandlingSaudi);

    return total;
  }

  totalRpArrangement(){
    const { formState } = this.props;
    let total = 0;
    let cursUsd = formState && formState.values && formState.values.usd ? formState.values.usd : 0;
    let totalUsd = this.totalUsdArrangement()
    total = Number(totalUsd) * Number(cursUsd)
    return total;
  }

  totalSarArrangement(){
    const { formState } = this.props;
    let total = 0;
    let cursSar = formState && formState.values && formState.values.sar ? formState.values.sar : 0;
    let totalRp = this.totalRpArrangement()
    total = Number(totalRp) / Number(cursSar)
    return total;
  }

  totalUsdHargaTTL() {
    const { formState } = this.props;
    // console.log('formState', formState)
    let total = 0;
    let ticketTotal = formState && formState.values && formState.values.amount_usd_ticket ? formState.values.amount_usd_ticket : 0;
    let visaTotal = formState && formState.values && formState.values.amount_usd_vs ? formState.values.amount_usd_vs : 0;
    let amountAirport = formState && formState.values && formState.values.amount_usd_airport ? formState.values.amount_usd_airport : 0;
    let amountEquipment = formState && formState.values && formState.values.amount_usd_equipment ? formState.values.amount_usd_equipment : 0;
    let amountHotelMekah = formState && formState.values && formState.values.amount_usd_HMK ? formState.values.amount_usd_HMK : 0;
    let amountEatInMekah = formState && formState.values && formState.values.amount_usd_eating_on_MKH ? formState.values.amount_usd_eating_on_MKH : 0;
    let amountHotelMadinah = formState && formState.values && formState.values.amount_usd_HMDN ? formState.values.amount_usd_HMDN : 0;
    let amountEatInMadinah = formState && formState.values && formState.values.amount_usd_eating_on_MDN ? formState.values.amount_usd_eating_on_MDN : 0;
    let amountSnack = formState && formState.values && formState.values.amount_usd_snack ? formState.values.amount_usd_snack : 0;
    let amountZamzam = formState && formState.values && formState.values.amount_usd_zamzam ? formState.values.amount_usd_zamzam : 0;
    let amountMutowwif = formState && formState.values && formState.values.amount_usd_mutowwif ? formState.values.amount_usd_mutowwif : 0;
    let amountTransport = formState && formState.values && formState.values.amount_usd_transport ? formState.values.amount_usd_transport : 0;
    let amountPorterBan = formState && formState.values && formState.values.amount_usd_porter_ban ? formState.values.amount_usd_porter_ban : 0;
    let amountHandlingSaudi = formState && formState.values && formState.values.amount_usd_handling_saudi ? formState.values.amount_usd_handling_saudi : 0;

    total = Number(ticketTotal) + Number(visaTotal) + Number(amountAirport) + Number(amountEquipment) + Number(amountHotelMekah) + Number(amountEatInMekah) + Number(amountHotelMadinah) + Number(amountEatInMadinah) + Number(amountSnack) + Number(amountZamzam) + Number(amountMutowwif) + Number(amountTransport) + Number(amountPorterBan) + Number(amountHandlingSaudi);

    return total;
  }

  totalRpHargaTTL(){
    const { formState } = this.props;
    let total = 0;
    let cursUsd = formState && formState.values && formState.values.usd ? formState.values.usd : 0;
    let hargaUsd = this.totalUsdHargaTTL()
    total = Number(hargaUsd) * Number(cursUsd)
    return total;
  }

  totalSarHargaTTL(){
    const { formState } = this.props;
    let total = 0;
    let cursSar = formState && formState.values && formState.values.sar ? formState.values.sar : 0;
    let hargaRp = this.totalRpHargaTTL()
    total = Number(hargaRp) / Number(cursSar)
    return total;
  }

  totalUsdAkomodasi(){
    const { formState } = this.props;
    let total = 0;
    let totalHargaTTL = this.totalUsdHargaTTL();
    let hargaTambahan = 200;
    let sumJamaah = formState && formState.values && formState.values.sum_jamaah ? formState.values.sum_jamaah : 0;
    total = (Number(totalHargaTTL) + Number(hargaTambahan)) / Number(sumJamaah) 

    return total;
  }

  totalRpAkomodasi(){
    const { formState } = this.props;
    let total = 0;
    let cursUsd = formState && formState.values && formState.values.usd ? formState.values.usd : 0;
    let hargaUsd = this.totalUsdAkomodasi()
    total = Number(hargaUsd) * Number(cursUsd)
    return total;
  }

  totalSarAkomodasi(){
    const { formState } = this.props;
    let total = 0;
    let cursSar = formState && formState.values && formState.values.sar ? formState.values.sar : 0;
    let hargaRp = this.totalRpAkomodasi()
    total = Number(hargaRp) / Number(cursSar)
    return total;
  }

  totalUsdHargaPack(){
    let total = 0;
    let usdHargaTTL = this.totalUsdHargaTTL()
    let usdAkomodasi = this.totalUsdAkomodasi()
    let barisSum = 15;

    total = (Number(usdHargaTTL) + Number(usdAkomodasi)) / Number(barisSum)

    return total;
  }

  totalRpHargaPack(){
    const { formState } = this.props;
    let total = 0;
    let cursUsd = formState && formState.values && formState.values.usd ? formState.values.usd : 0;
    let hargaUsd = this.totalUsdHargaPack()
    total = Number(hargaUsd) * Number(cursUsd)
    return total;
  }

  totalSarHargaPack(){
    const { formState } = this.props;
    let total = 0;
    let cursSar = formState && formState.values && formState.values.sar ? formState.values.sar : 0;
    let hargaRp = this.totalRpHargaPack()
    total = Number(hargaRp) / Number(cursSar)
    return total;
  }



  render() {
    const { formState } = this.props;
    const { dolar, rupiah, saudi } = this.state
    let labelCurrency = 'USD';
    if (rupiah) {
      labelCurrency = 'Rp'
    } else if (saudi) {
      labelCurrency = 'SAR'
    } else {
      labelCurrency = 'USD'
    }
    const amountHandlingCondition = formState && formState.values && formState.values.amount_usd_handling_saudi;
    return (
      // <ViewShot ref={ref => { this.state.viewShot = ref }} style={{ flex: 1, backgroundColor: '#FFFFFF' }} options={{ format: "jpg", quality: 0.9 }}>
        <View style={[styles.container, {backgroundColor: '#FFFFFF'}]}>
          {/* // <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'} horizontal={true}> */}
          <View style={styles.calculatorHeader}>
            <View style={styles.wrapSumJamaah}>
              <Text style={styles.textHeader}>Jumlah Jamaah   :</Text>
              <View style={styles.borderInput}>
                <View style={{ marginTop: -10 }}>
                  <Field
                    name='sum_jamaah'
                    component={MyTextInput}
                    // placeholder={'Jumlah Jamaah'}
                    onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
                {formState && formState.values && formState.values.sum_jamaah ?
                  <Text style={styles.textHeader}>Orang</Text>
                  : null}
              </View>
            </View>
            <TouchableOpacity onPress={() => this.takeScreenShot()} style={generalStyles.imageOption}>
              <Image source={ShareIcon} />
            </TouchableOpacity>
            <View style={styles.wrapCurrency}>
              <View style={{ flex: 1.5, flexDirection: 'row' }}>
                <Text style={styles.textHeader}>USD</Text>
                <Text style={{ fontSize: 14, color: '#FFFFFF', marginLeft: 67 }}>:</Text>
                <View style={[styles.borderInput]}>
                  {formState && formState.values && formState.values.usd ?
                    <Text style={styles.textHeader}>Rp.</Text>
                    : null
                  }
                  <View style={{ marginTop: -10, marginLeft: -5 }}>
                    <Field
                      name='usd'
                      component={MyTextInput}
                    // placeholder={'Jumlah Jamaah'}
                    // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                    />
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.textHeader}>SAR</Text>
                <Text style={{ fontSize: 14, color: '#FFFFFF', marginLeft: 15 }}>:</Text>
                <View style={styles.borderInput}>
                  {formState && formState.values && formState.values.sar ?
                    <Text style={styles.textHeader}>Rp.</Text>
                    : null
                  }
                  <View style={{ marginTop: -10, marginLeft: -5 }}>
                    <Field
                      name='sar'
                      component={MyTextInput}
                    // placeholder={'Jumlah Jamaah'}
                    // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* table */}
          <ScrollView keyboardShouldPersistTaps={'handled'} style={{ marginTop: 3, marginBottom: 40, flex: 1 }}>
            {/* header */}
            <View style={[styles.trStyle, styles.trBackground]}>
              <View style={[{ flex: 2 }, styles.rowTr]}>
                <Text style={styles.textHeaderTable}>Akomodasi</Text>
              </View>
              <View style={[{ flex: 1.5 }, styles.rowTr]}>
                <Text style={styles.textHeaderTable}>Input</Text>
              </View>
              <View style={[{ flex: 1 }, styles.rowTr]}>
                <Text style={styles.textHeaderTable}>Qty</Text>
              </View>
              <View style={[{ flex: 1 }, styles.rowTr]}>
                <Text style={styles.textHeaderTable}>Unit</Text>
              </View>
              <Menu style={[{ flex: 2 }, styles.rowTr]}>
                <MenuTrigger>
                  <Text style={styles.textHeaderTable}>{labelCurrency}</Text>
                </MenuTrigger>

                <MenuOptions style={{ borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.3)',marginRight: -50, backgroundColor: '#FFFFFF' }}>
                  {rupiah ? null
                    :
                    <MenuOption value={1} style={{ borderBottomWidth: 0.5, borderColor: '#cccccc', padding: 10 }} onSelect={() => this.handleSwitchRupiah()}>
                      <View>
                        <Text>Rupiah</Text>
                      </View>
                    </MenuOption>
                  }
                  {dolar ? null
                    :
                    <MenuOption value={1} style={{ borderBottomWidth: 0.5, borderColor: '#cccccc', padding: 10 }} onSelect={() => this.handleSwitchDolar()}>
                      <View>
                        <Text>Dolar</Text>
                      </View>
                    </MenuOption>
                  }
                  {saudi ? null :
                    <MenuOption value={3} style={{ borderBottomWidth: 0.5, borderColor: '#cccccc', padding: 10 }} onSelect={() => this.handleSwitchSaudi()}>
                      <View>
                        <Text>Riyal Saudi</Text>
                      </View>
                    </MenuOption>
                  }
                </MenuOptions>
              </Menu>

            </View>

            {/* body */}
            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2]}>
                <Text style={styles.textTd13}>Tiket PP</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_ticket'
                    component={TableTextInput}
                    symbolCurrency={'$ '}
                  // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='qty_ticket'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('qty_ticket', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_ticket'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_ticket'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_ticket'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_ticket'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }

            </View>


            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2]}>
                <Text style={styles.textTd13}>Visa Saudi</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_vs'
                    component={TableTextInput}
                    symbolCurrency={'$ '}
                  // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='qty_vs'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('qty_vs', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_vs'
                    component={TableTextInputForText}
                  />
                </View>
              </View>

              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_vs'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_vs'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_vs'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }

            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2]}>
                <Text style={styles.textTd13}>Bandara(Cgk)</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_airport'
                    component={TableTextInput}
                    symbolCurrency={'$ '}
                  // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='qty_airport'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('qty_airport', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_airport'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_airport'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_airport'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_airport'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }

            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2]}>
                <Text style={styles.textTd13}>Perlengkapan</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_equipment'
                    component={TableTextInput}
                    symbolCurrency={'Rp '}
                  // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='qty_equipment'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('qty_equipment', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_equipment'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_equipment'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_equipment'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_equipment'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }
            </View>

            {/* <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2]}>
                <Text style={styles.textTd13}></Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <Text style={styles.textTd13}></Text>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <Text style={styles.textTd13}></Text>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <Text style={styles.textTd13}></Text>
              </View>
              <View style={[styles.tdStyle, styles.flex2]}>
                <Text style={styles.textTd13}></Text>
              </View>
            </View> */}
            {/* close table Pertama */}

            {/* table 2 header */}
            <View style={[styles.trStyle, styles.trBackground]}>
              <View style={[{ flex: 2.5 }, styles.rowTr]}>
                <Text style={styles.textHeaderTable}>Akomodasi</Text>
              </View>
              <View style={[{ flex: 1.5 }, styles.rowTr]}>
                <Text style={styles.textHeaderTable}>Input</Text>
              </View>
              <View style={[{ flex: 1 }, styles.rowTr]}>
                <Text style={styles.textHeaderTable}>Ngt</Text>
              </View>
              <View style={[{ flex: 1 }, styles.rowTr]}>
                <Text style={styles.textHeaderTable}>Qty</Text>
              </View>
              <View style={[{ flex: 1 }, styles.rowTr]}>
                <Text style={styles.textHeaderTable}>Unit</Text>
              </View>
              <View style={[{ flex: 2 }, styles.rowTr]}>
                <Text style={styles.textHeaderTable}>{labelCurrency}</Text>
              </View>
            </View>
            {/* body */}
            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2half]}>
                <Text style={styles.textTd12}>Hotel di Mekah</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_HMK'
                    component={TableTextInput}
                    symbolCurrency={'SR '}
                  // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='night_HMK'
                    component={TableTextInput}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='qty_HMK'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('qty_HMK', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_HMK'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_HMK'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_HMK'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_HMK'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }
            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2half]}>
                <Text style={styles.textTd12}>Makan di Mekah</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_eating_on_MKH'
                    component={TableTextInput}
                    symbolCurrency={'SR '}
                  // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={[styles.flex1]}>
                  <Field
                    name='night_eating_on_MKH'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('night_eating_on_MKH', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={[styles.flex1, styles.right]}>
                  <Field
                    name='qty_eating_on_MKH'
                    component={TableTextInputForText}
                    disabled
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={[styles.flex1]}>
                  <Field
                    name='unit_eating_on_MKH'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_eating_on_MKH'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_eating_on_MKH'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_eating_on_MKH'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }
            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2half]}>
                <Text style={styles.textTd12}>Hotel di Madinah</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_HMDN'
                    component={TableTextInput}
                    symbolCurrency={'SR '}
                  // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='night_HMDN'
                    component={TableTextInput}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='qty_HMDN'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('qty_HMDN', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_HMDN'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_HMDN'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_HMDN'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_HMDN'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }
            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2half]}>
                <Text style={styles.textTd12}>Mkn di Madinah</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_eating_on_MDN'
                    component={TableTextInput}
                    symbolCurrency={'SR '}
                  // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='night_eating_on_MDN'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('night_eating_on_MDN', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={[styles.flex1, styles.right]}>
                  <Field
                    name='qty_eating_on_MDN'
                    component={TableTextInputForText}
                    disabled
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_eating_on_MDN'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_eating_on_MDN'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_eating_on_MDN'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_eating_on_MDN'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }
            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2half]}>
                <Text style={styles.textTd12}>Snack/Nasi Box</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_snack'
                    component={TableTextInput}
                    symbolCurrency={'SR '}
                  // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='night_snack'
                    component={TableTextInput}
                    disabled
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='qty_snack'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('qty_snack', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_snack'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_snack'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_snack'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_snack'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }
            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2half]}>
                <Text style={styles.textTd12}>Air Zamzam</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_zamzam'
                    component={TableTextInput}
                    symbolCurrency={'SR '}
                  // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='night_zamzam'
                    component={TableTextInput}
                    disabled
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='qty_zamzam'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('qty_zamzam', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_zamzam'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_zamzam'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_zamzam'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_zamzam'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }
            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2half]}>
                <Text style={styles.textTd12}>Mutawwif</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_mutowwif'
                    component={TableTextInput}
                    symbolCurrency={'SR '}
                  // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='night_mutowwif'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('night_mutowwif', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='qty_mutowwif'
                    component={TableTextInput}
                    disabled
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_mutowwif'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_mutowwif'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_mutowwif'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_mutowwif'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }
            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2half]}>
                <Text style={styles.textTd12}>Alt. Transport</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_transport'
                    component={TableTextInput}
                    symbolCurrency={'SR '}
                    // onChangeValue={this.props.handleChangeOtherValue('input_transport', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='night_transport'
                    component={TableTextInput}
                    disabled
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='qty_transport'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('input_transport', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_transport'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_transport'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_transport'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_transport'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }
            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2half]}>
                <Text style={styles.textTd12}>Porter Ban. KSA</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_porter_ban'
                    component={TableTextInput}
                    symbolCurrency={'SR '}
                  // onChangeValue={this.props.handleChangeOtherValue('sum_jamaah', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='night_porter_ban'
                    component={TableTextInput}
                    disabled
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='qty_porter_ban'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('qty_porter_ban', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_porter_ban'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_porter_ban'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_porter_ban'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_porter_ban'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }
            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex2half]}>
                <Text style={styles.textTd12}>Handling Saudi</Text>
              </View>
              <View style={[styles.tdStyle, styles.flexhalf1]}>
                <View style={styles.flex1}>
                  <Field
                    name='input_handling_saudi'
                    component={TableTextInput}
                    symbolCurrency={'SR '}
                    // onChangeValue={this.props.handleChangeOtherValue('input_handling_saudi', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='night_handling_saudi'
                    component={TableTextInput}
                    disabled
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='qty_handling_saudi'
                    component={TableTextInput}
                    onChangeValue={this.props.handleChangeOtherValue('input_handling_saudi', { formState: this.props.formState })}
                  />
                </View>
              </View>
              <View style={[styles.tdStyle, styles.flex1]}>
                <View style={styles.flex1}>
                  <Field
                    name='unit_handling_saudi'
                    component={TableTextInputForText}
                  />
                </View>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_usd_handling_saudi'
                      component={TableTextInput}
                      symbolCurrency={'$ '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_rp_handling_saudi'
                      component={TableTextInput}
                      symbolCurrency={'Rp '}
                      disabled
                    />
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex2]}>
                  <View style={[styles.flex1, styles.marginRightTable]}>
                    <Field
                      name='amount_sar_handling_saudi'
                      component={TableTextInput}
                      symbolCurrency={'SR '}
                      disabled
                    />
                  </View>
                </View>
              }
            </View>


            {/* total total  */}
            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex3]}>
                <Text style={styles.textTd12}>Akomodasi Tour Leader + Uang Saku TL 400 Usd</Text>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex1]}>
                  <View style={[styles.flex1, styles.right, styles.marginRightTable]}>
                    <Text style={styles.textTotal}>{numeral(this.totalUsdAkomodasi()).format('$0,0[.]00')}</Text>
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex1]}>
                  <View style={[styles.flex1, styles.right, styles.marginRightTable]}>
                    <Text style={styles.textTotal}>Rp{numeral(this.totalRpAkomodasi()).format('0,0[.]0')}</Text>
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex1]}>
                  <View style={[styles.flex1, styles.right, styles.marginRightTable]}>
                    <Text style={styles.textTotal}>SR{numeral(this.totalSarAkomodasi()).format('0,0[.]00')}</Text>
                  </View>
                </View>
              }
            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex3]}>
                <Text style={styles.textTd12}>L. Arrangement</Text>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex1]}>
                  <View style={[styles.flex1, styles.right, styles.marginRightTable]}>
                    <Text style={styles.textTotal}>{numeral(this.totalUsdArrangement()).format('$0,0[.]00')}</Text>
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex1]}>
                  <View style={[styles.flex1, styles.right, styles.marginRightTable]}>
                    <Text style={styles.textTotal}>Rp{numeral(this.totalRpArrangement()).format('0,0[.]0')}</Text>
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex1]}>
                  <View style={[styles.flex1, styles.right, styles.marginRightTable]}>
                    <Text style={styles.textTotal}>SR{numeral(this.totalSarArrangement()).format('0,0[.]00')}</Text>
                  </View>
                </View>
              }
            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex3]}>
                <Text style={styles.textTd12}>Total Harga/Pack</Text>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex1]}>
                  <View style={[styles.flex1, styles.right, styles.marginRightTable]}>
                    <Text style={styles.textTotal}>{numeral( amountHandlingCondition ? this.totalUsdHargaPack() : 0).format('$0,0[.]00')}</Text>
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex1]}>
                  <View style={[styles.flex1, styles.right, styles.marginRightTable]}>
                    <Text style={styles.textTotal}>Rp{numeral(amountHandlingCondition ? this.totalRpHargaPack() : 0).format('0,0[.]0')}</Text>
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex1]}>
                  <View style={[styles.flex1, styles.right, styles.marginRightTable]}>
                    <Text style={styles.textTotal}>SR{numeral(amountHandlingCondition ? this.totalSarHargaPack() : 0).format('0,0[.]00')}</Text>
                  </View>
                </View>
              }
            </View>

            <View style={[styles.trStyle, styles.paddingNone]}>
              <View style={[styles.tdStyle, styles.flex3]}>
                <Text style={styles.textTd12}>Harga Tanpa TL</Text>
              </View>
              {rupiah || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex1]}>
                  <View style={[styles.flex1, styles.right, styles.marginRightTable]}>
                    <Text style={styles.textTotal}>{numeral(this.totalUsdHargaTTL()).format('$ 0,0[.]00')}</Text>
                  </View>
                </View>
              }
              {dolar || saudi ? null
                :
                <View style={[styles.tdStyle, styles.flex1]}>
                  <View style={[styles.flex1, styles.right, styles.marginRightTable]}>
                    <Text style={styles.textTotal}>Rp{numeral(this.totalRpHargaTTL()).format('0,0[.]0')}</Text>
                  </View>
                </View>
              }
              {dolar || rupiah ? null
                :
                <View style={[styles.tdStyle, styles.flex1]}>
                  <View style={[styles.flex1, styles.right, styles.marginRightTable]}>
                    <Text style={styles.textTotal}>SR{numeral(this.totalSarHargaTTL()).format('0,0[.]00')}</Text>
                  </View>
                </View>
              }
            </View>

            {/* close table Pertama */}
          </ScrollView>
          {/* // </ScrollView> */}
        </View>
      // </ViewShot>

    );
  }
}


export default CalculatorPage;

const generalStyles = StyleSheet.create({
  imageOption: {
    position: "absolute",
    // top: 0,
    right: 0,
    marginRight: 20,
    marginTop: 25,
    height: 18,
    width: 18
  }
})