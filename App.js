import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Header from './components/header';
import Form from './components/form';
import PriceQuote from './components/priceQuote';

const App = () => {
  const [currency, setCurrency] = useState('');
  const [cryptocurrency, setCryptocurrency] = useState('');
  const [consultAPI, setConsultAPI] = useState(false);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const cryptocurrencyQuote = async () => {
      if (consultAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;
        const result = await axios.get(url);
        //ocultar el spinner y mostrar el resultado
        setLoading(true);
        setTimeout(() => {
          setResult(result.data.DISPLAY[cryptocurrency][currency]);
          setConsultAPI(false);
          setLoading(false);
        }, 3000);
      }
    };
    cryptocurrencyQuote();
  }, [consultAPI]);

  // mostrar el spinner o el resultado
  const components = loading ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <PriceQuote result={result} />
  );
  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.image}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.contents}>
          <Form
            currency={currency}
            cryptocurrency={cryptocurrency}
            setCurrency={setCurrency}
            setCryptocurrency={setCryptocurrency}
            setConsultAPI={setConsultAPI}
          />
        </View>
        <View style={{marginTop: 30}}>{components}</View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contents: {
    marginHorizontal: '2.5%',
  },
});

export default App;
