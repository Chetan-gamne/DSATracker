import { View, Text, StyleSheet, StatusBar, Button } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "../../components/Home/Header";
import * as Notification from "expo-notifications";
import { useDispatch, useSelector } from "react-redux";
import { selectNotificationTime } from "../../slices/NotificationSlice";
import { changeNotificationTime } from "../../slices/NotificationSlice";

const ConfigureNotification = () => {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const initialMount = useRef(true);
  const initialMountForRedux = useRef(true);
  const notificationTime = useSelector(selectNotificationTime);
  const dispatch = useDispatch();

  Notification.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const handleNotification = async () => {
    console.log("updated notification time : ", notificationTime);
    await Notification.scheduleNotificationAsync({
      content: {
        title: "DSA Notification",
        body: "Get Up! It's Time to Conquer The World😃",
      },
      trigger: {
        hour: notificationTime.hour,
        minute: notificationTime.minute,
        repeats: true,
      },
    });
  };

  const cancelNotification = async () => {
    await Notification.cancelAllScheduledNotificationsAsync().then(() => {
      console.log("Successfuly cancelled all notification..");
    });
  };

  function onTimeSelected(event, value) {
    console.log(value);
    setTime(value);
    setTimePicker(false);
  }

  useEffect(() => {
    console.log("hour ", time.getHours(), " minute ", time.getMinutes());
    console.log(initialMount.current);
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      dispatch(
        changeNotificationTime({
          hour: time.getHours(),
          minute: time.getMinutes(),
        })
      );
    }
  }, [time]);

  useEffect(() => {
    if (initialMountForRedux.current) {
      initialMountForRedux.current = false;
    } else {
      handleNotification();
    }
  }, [notificationTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.headingStyle}>
        Configure Your Daily Notification Time
      </Text>
      <View>
        <Text style={styles.notificationTimeData}>
          Your Current Notification Time:
          {` ${notificationTime.hour}hr ${notificationTime.minute}min`}
        </Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Show Time Picker" onPress={() => setTimePicker(true)} />
      </View>
      {timePicker && (
        <DateTimePicker
          value={time}
          mode={"time"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onTimeSelected}
        />
      )}
      <Button
        title="Cancel All Notification"
        onPress={() => cancelNotification()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    zIndex: 50,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingTop: StatusBar.currentHeight || 0,
    padding: 10,
  },
  imgStyle: {
    height: 100,
    width: 100,
    resizeMode: "cover",
    borderRadius: 50,
  },
  textStyle: {
    fontSize: 13,
    fontWeight: "700",
  },
  headingStyle: {
    fontSize: 20,
    color: "#71C562",
    fontWeight: "900",
  },
  notificationTimeData: {
    fontSize: 18,
  },
});

export default ConfigureNotification;
