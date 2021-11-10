import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HIDE_MODAL} from '../../../redux/constants/StoreConstants';
import {ICommonState} from '../../../redux/reducers/CommonReducer';

interface IAppModal {
  navigation?: any;
}

const AppModal = ({navigation}: IAppModal) => {
  const dispatch = useDispatch();
  const modal: ICommonState = useSelector((state: any) => state.common);
  return (
    <>
      <Modal
        hardwareAccelerated
        animationType="none"
        transparent={true}
        visible={modal.showModal}
        onRequestClose={() => {
          dispatch({type: HIDE_MODAL});
        }}>
        <View style={styles.centeredView}>
          {modal.modalContent !== null && <modal.modalContent />}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});
export default AppModal;
