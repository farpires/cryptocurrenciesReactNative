import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Form = ({
  currency,
  cryptocurrency,
  setCurrency,
  setCryptocurrency,
  setConsultAPI,
}) => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  useEffect(() => {
    const consultAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const result = await axios.get(url);
      setCryptocurrencies(result.data.Data);
    };
    consultAPI();
  }, []);

  const getCurrency = currencyValue => {
    setCurrency(currencyValue);
  };
  const getCryptoCurrency = cryptoValue => {
    setCryptocurrency(cryptoValue);
  };
  const quotePrice = () => {
    if (currency.trim() === '' || cryptocurrency.trim() === '') {
      shwoAlert();
      return;
    }
    //si pasa , cambiar al stati a pi a true (flag)
    setConsultAPI(true);
  };
  const shwoAlert = () => {
    Alert.alert('Error...', 'the fields are required', [{text: 'OK'}]);
  };

  return (
    <View>
      <Text style={styles.label}>currency</Text>
      <Picker
        itemStyle={{height: 120}}
        selectedValue={currency}
        onValueChange={value => getCurrency(value)}>
        <Picker.Item label=" - select - " value="" />
        <Picker.Item label="United States" value="USD" />
        <Picker.Item label="Mexico" value="MXN" />
        <Picker.Item label="Argentia" value="ARS" />
        <Picker.Item label="Euro" value="EURO" />
        <Picker.Item label="sterling" value="GBP" />
      </Picker>
      <Text style={styles.label}>cryptocurrency</Text>
      <Picker
        selectedValue={cryptocurrency}
        onValueChange={value => getCryptoCurrency(value)}
        itemStyle={{height: 120}}>
        <Picker.Item label=" - select - " value="" />
        {cryptocurrencies.map(crypto => (
          <Picker.Item
            key={crypto.CoinInfo.Id}
            label={crypto.CoinInfo.FullName}
            value={crypto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight style={styles.btnQuote} onPress={() => quotePrice()}>
        <Text style={styles.txtQuote}>Quote</Text>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnQuote: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  txtQuote: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
export default Form;
