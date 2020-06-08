import { AsyncStorage } from "react-native";
import { Creators as actionsDonations } from "./donations.reducer";
import api from "../../../services/api";

export function dispatchFetchDonations() {
  return async function (dispatch, getState) {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

      dispatch(actionsDonations.fetchMyDonations());

      const { status, data } = await api.get(
        `/users/${userId}/books/donations`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (status === 200) {
        dispatch(actionsDonations.fetchMyDonationsSuccess(data));
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log("ERROR", err);
      dispatch(actionsDonations.fetchMyDonationsError(err));
    }
  };
}
