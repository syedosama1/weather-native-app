import { View, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { deviceHeight, deviceWidth } from "./Dimensions";
import Icon from "react-native-vector-icons/Ionicons";
import { API_KEY } from "./Constants";

export default function Details(props) {
  const [data, setData] = useState(null); // Initialize data as null
  const { name } = props.route.params;
  const latitude = 44.34;
  const longitude = 10.99;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&q=${name}&appid=${API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Add this line to log the data
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [name]);

  const Data = ({ title, value }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "gray", fontSize: 22 }}>{title}</Text>
      <Text style={{ color: "white", fontSize: 22 }}>{value}</Text>
    </View>
  );

  return (
    <View>
      <Image
        source={require("../assets/images/images1.jpg")}
        style={{ height: deviceHeight, width: deviceWidth }}
        imageStyle={{ opacity: 0.6, backgroundColor: "black" }}
      />
      <View
        style={{
          position: "absolute",
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: deviceWidth - 20,
          }}
        >
          <Icon name="menu" size={46} color="white" />
          <Image
            source={require("../assets/images/user1.jpg")}
            style={{ height: 46, width: 46, borderRadius: 50 }}
          />
        </View>

        {data ? ( // Conditionally render when 'data' is defined
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: deviceHeight - 100,
            }}
          >
            <View>
              <Text style={{ color: "white", fontSize: 40 }}>{name}</Text>
              <Text
                style={{ fontSize: 22, color: "white", textAlign: "center" }}
              >
                {data?.weather[0].main}
              </Text>
            </View>

            <Text style={{ color: "white", fontSize: 64 }}>
              {(data.main.temp - 273).toFixed(2)}&deg; C
            </Text>

            <View>
              <Text style={{ color: "white", fontSize: 22, marginBottom: 16 }}>
                Weather Details
              </Text>
              <View style={{ width: deviceWidth - 60 }}>
                <Data value={data?.wind.speed} title="Wind" />
                <Data value={data?.main.pressure} title="Pressure" />
                <Data value={`${data?.main.humidity}%`} title="Humidity" />
                <Data value={data?.visibility} title="Visibility" />
              </View>
            </View>
          </View>
        ) : (
          <Text
            style={{
              color: "white",
              fontSize: 22,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            No Data found{" "}
          </Text> // Show a loading message when 'data' is null
        )}
      </View>
    </View>
  );
}
