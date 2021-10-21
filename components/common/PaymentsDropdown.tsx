import {Picker} from '@react-native-community/picker';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {getPaymentTypes, IPayment} from '../database/common/PaymentController';
import {formStyles} from '../styles/common';

const PaymentsDropdown = ({onChange}) => {
  const [paymentId, setPaymentId] = useState(1);
  const [paymentList, setPaymentList] = useState<IPayment[]>([]);
  const onChangeHandle = (selectedPaymentId: any) => {
    setPaymentId(selectedPaymentId);
    onChange(selectedPaymentId);
  };

  const setPaymentTypes = async () => {
    const paymentsTypes: IPayment[] = await getPaymentTypes();
    setPaymentList(paymentsTypes);
  };

  useEffect(() => {
    setPaymentTypes();
  }, []);
  return (
    <View style={[formStyles.inputWrapper, formStyles.halfWidth]}>
      <Text style={formStyles.inputLabel}>Pay type</Text>
      <View style={formStyles.select}>
        <Picker
          selectedValue={paymentId}
          style={formStyles.pickerItemStyle}
          itemStyle={formStyles.pickerItemStyle}
          onValueChange={itemValue => onChangeHandle(itemValue)}>
          {paymentList.map(payment => {
            return (
              <Picker.Item
                key={payment.paymentId}
                label={payment.title}
                value={payment.paymentId}
              />
            );
          })}
        </Picker>
      </View>
    </View>
  );
};

export default PaymentsDropdown;

// getPaymentTypes
