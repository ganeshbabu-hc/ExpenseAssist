import React, {Component} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HIDE_MODAL} from '../../../redux/constants/StoreConstants';
import {ICommonState} from '../../../redux/reducers/CommonReducer';
import {colors, utils} from '../../styles/theme';

interface IModalContent {
  navigation?: any;
  header?: string;
  closeBtn?: boolean;
  closeCallback?: Function;
  children: any;
}

const ModalContent = ({
  navigation,
  header = '',
  closeBtn = true,
  closeCallback,
  children,
}: IModalContent) => {
  const dispatch = useDispatch();
  const modal: ICommonState = useSelector((state: any) => state.common);
  return (
    <View style={styles.modalView}>
      {header !== '' && (
        <View style={styles.header}>
          <Text style={styles.headerLabel}>{header}</Text>
        </View>
      )}
      <View style={styles.content}>{children}</View>
      <View style={styles.footer}>
        {closeBtn && (
          <Pressable
            onPress={() => {
              dispatch({type: HIDE_MODAL});
            }}
            style={styles.footerCloseBtn}>
            <Text style={styles.btnLabel}>Close</Text>
          </Pressable>
        )}
      </View>
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
    minHeight: 200,
    minWidth: '75%',
    backgroundColor: 'white',
    borderRadius: utils.inputRadius,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: colors.brand.brandMedium,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginVertical: 10,
  },
  content: {},
  footer: {},
  footerCloseBtn: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.brand.brandMedium,
    borderRadius: utils.inputRadius,
    marginVertical: 20,
  },
  headerLabel: {
    color: colors.brand.brandDark,
    fontFamily: utils.fontFamily.Bold,
    fontSize: utils.fontSize.medium,
  },
  btnLabel: {
    fontFamily: utils.fontFamily.Bold,
    fontSize: utils.fontSize.medium,
    color: colors.white,
  },
});
export default ModalContent;
