import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity,Alert } from 'react-native'
import React,{useState} from 'react'
import CustomHeader from '../components/CustomHeader';
import AccountHistory from '../components/AccountHistory';
import color from '../assets/colors/colors';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";


const data = [
    { id: '1', date: '06.16', name: '비디버거 성수', amount: '-17,400',balance: "143,000" },
    { id: '2', date: '06.16', name: '베트남 쌀국수', amount: '-17,400',balance: "143,000" },
    { id: '3', date: '06.16', name: '임태규', amount: '+50,000',balance: "143,000" },
    { id: '4', date: '06.15', name: '롯데리아', amount: '-50,000',balance: "143,000" },
    { id: '5', date: '06.15', name: '투썸플레이스', amount: '+50,000',balance: "143,000" },
    { id: '6', date: '06.14', name: '나이스두잉', amount: '+50,000',balance: "143,000" },
    { id: '7', date: '06.12', name: '임태규', amount: '+20,000',balance: "143,000" },
    { id: '8', date: '06.11', name: '한원희', amount: '+50,000',balance: "143,000" },
    { id: '9', date: '06.10', name: '남우현', amount: '+11,000',balance: "143,000" },

    // 추가 거래 내역
  ];

  

const ConsumptionSelect = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [selectedIds, setSelectedIds] = useState([]);


    const handleSearch = (text) => {
        setSearchQuery(text);
        filterData(text);
      };
      const handleSelectItem = (id) => {
        if (selectedIds.includes(id)) {
          setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
          if (selectedIds.length >= 5) {
            Alert.alert("거래내역은 최대 5개 까지만 선택가능합니다");
            return;
          }
          setSelectedIds([...selectedIds, id]);
        }
      };
    
      const filterData = (text) => {
        setSearchQuery(text);
        if (text) {
            const newData = data.filter(item =>
            item.name && item.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(newData);
        } else {
            setFilteredData(data);
        }
      };

    return (
        <SafeAreaView style={styles.safe}>
        <CustomHeader title="소비 내역 선택" navigation={navigation} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                style={styles.textInput}
                placeholder="Search here..."
                value={searchQuery}
                onChangeText={handleSearch}
                maxLength={20}  // 최대 글자 수 제한 설정
                />
                <TouchableOpacity onPress={() => filterData(searchQuery)}>
                    <Ionicons name="search" size={20} color="gray" marginRight={6} />
                </TouchableOpacity>
            </View>
            </View>
            <View style={styles.accounthistorycontainer}>
              {filteredData.map((item,index)=>(
                <TouchableOpacity onPress={() => handleSelectItem(item.id)}>
                    <View style={[styles.accountItem, selectedIds.includes(item.id) ? styles.selectedItem : null]}>
                        <AccountHistory key={index} transaction={item}/>
                    </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
        );
}

export default ConsumptionSelect

const styles = StyleSheet.create({
    safe: {
        backgroundColor: color.background,
          },
    scrollContainer: {
            backgroundColor:color.background,
            flexGrow: 1,
            paddingLeft:20,
            paddingRight:20
          },
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f8f8f8'
    },
    accounthistorycontainer: {
      flex: 1,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#ffffff'
    },
    cardBox: {
      width:150,
      height:150,
      fontSize: 18,
      color: '#333',
      alignSelf: 'center',
      marginVertical: 5
    },
    searchMonth: {
      flexDirection:"row",
      padding:20,
      marginRight:2,
      alignSelf:'flex-end',
    },
    textMonth:{
      fontSize:16,
      marginRight:10
    },
    searchBar: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        margin: 5,
        borderRadius: 15,
        alignItems: 'center',
      },
      textInput: {
        flex: 1,
        height: 40,
      },
      itemText: {
        padding: 10,
        fontSize: 18,
      },
      selectedItem: {
        borderRadius:20,
        backgroundColor: "rgba(90,115,245,0.3)", // 선택된 항목의 색상 변경
      },
  });