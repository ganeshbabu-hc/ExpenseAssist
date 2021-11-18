import React, {useEffect, useState} from 'react';
import {View, Text, Modal, StyleSheet, Pressable} from 'react-native';
import {getPaymentTypes, IPayment} from '../database/common/PaymentController';
import {colors, formStyles, utils} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IconMap from './IconMap';
import {THEME} from '../utils/Constants';
import t from './translations/Translation';

interface IpaymentDropdown {
  onChange: Function;
  defaultValue?: number;
}

const PaymentsDropdown = ({onChange, defaultValue}: IpaymentDropdown) => {
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
      <Text style={formStyles.inputLabel}>Paid by</Text>
      <Pressable
        style={formStyles.selectBtn}
        onPress={() => {
          setShowModal(true);
        }}>
        <Text style={formStyles.selectBtnLabel}>{getLabel()}</Text>
      </Pressable>
      <Modal
        hardwareAccelerated
        animationType="none"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
                        <Icon
                          name="check"
                          color={colors.theme[THEME].brandDark}
                          size={28}
                        />
                      )}
                    </View>
                    <IconMap
                      name={payment.paymentIcon}
                      color={colors.theme[THEME].textBrandMedium}
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  modalView: {
    minWidth: '75%',
    backgroundColor: 'white',
    borderRadius: utils.inputRadius,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    shadowColor: colors.theme[THEME].brandMedium,
    paddingVertical: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  paymentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    width: '100%',
  },
  paymentCheckWrapper: {
    marginRight: 10,
    width: 30,
  },
  paymentTitle: {
    color: colors.theme[THEME].textDark,
    fontFamily: utils.fontFamily.Bold,
    fontSize: utils.fontSize.large,
    marginLeft: 10,
  },
});

export default PaymentsDropdown;

// getPaymentTypes
