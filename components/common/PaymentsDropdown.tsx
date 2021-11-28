import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import {
  getPaymentTypes,
  IPayment,
} from '../database/common/PaymentController';
import IconMap from './IconMap';
import t from './translations/Translation';
import { GetStyle, GetTheme } from '../styles/GetThemeHook';
import { paymentStyles } from '../styles/commonStyles';

interface IpaymentDropdown {
  onChange: Function;
  defaultValue?: number;
}

const PaymentsDropdown = ({ onChange, defaultValue }: IpaymentDropdown) => {
  const styles = GetStyle(paymentStyles);
  const { colors, formStyles } = GetTheme();
  const [paymentId, setPaymentId] = useState(defaultValue);
  const [paymentList, setPaymentList] = useState<IPayment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const onChangeHandle = (selectedPaymentId: any) => {
    setPaymentId(selectedPaymentId);
    onChange(selectedPaymentId);
  };

  const getLabel = (): string => {
    let label = '';
    paymentList.forEach((payment: IPayment) => {
      if (payment.paymentId === paymentId) {
        label = payment.title;
        return;
      }
    });
    return label;
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
      <Text style={formStyles.inputLabel}>{t('paidBy')}</Text>
      <Pressable
        style={formStyles.selectBtn}
        onPress={() => {
          setShowModal(true);
        }}>
        <Text style={formStyles.selectBtnLabel}>{t(getLabel())}</Text>
      </Pressable>
      <Modal
        hardwareAccelerated
        animationType="none"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeBtn}
              onPress={() => {
                setShowModal(false);
              }}>
              <IconMap name={'close'} color={colors.textCardGray} />
            </Pressable>
            {paymentList.map((payment: IPayment) => {
              return (
                <Pressable
                  key={payment.paymentId}
                  onPress={() => {
                    onChangeHandle(payment.paymentId);
                    setShowModal(false);
                  }}>
                  <View style={styles.paymentWrapper}>
                    <View style={styles.paymentCheckWrapper}>
                      {payment.paymentId === paymentId && (
                        <IconMap
                          name="check-circle"
                          color={colors.textBrandMedium}
                          size={28}
                        />
                      )}
                    </View>
                    <IconMap
                      name={payment.paymentIcon}
                      color={colors.textCardGray}
                    />
                    <Text style={styles.paymentTitle}>{t(payment.title)}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentsDropdown;

// getPaymentTypes
