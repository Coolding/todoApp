/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
 
//本文件作用：主界面点击月度计划时，不显示下面的分类，直接跳转显示每一项具体的计划任务
//因月度计划数量不多，故直接显示即可

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高



export default class ShowMonthPlanDetail extends Component {

  constructor(props) {  
    super(props); 
     this.state = {
        PlanItem:[]
    }; 
  }  


 
 static navigationOptions = {
     header:null
  };

  componentWillMount() {  
 
        let url="http://todoapp.applinzi.com/uqwoeirqljlzcuvoq/ShowMonthPlanDetail/";
        let formData=new FormData();        
        fetch(url,{method:"GET",headers:{}}).then(response => response.json())
        .then(data =>{          
             this.setState({PlanItem:data})
       })
    
}



  render() {
    return (
        <View  style={styles.container}>  
            <View style={styles.header}>  
                  <Text style={styles.headtitle}>月度计划</Text> 
            </View>  
        <ScrollView>
        {
          this.state.PlanItem.map(
                 (Item,index)=>{ 
                          return(
                              <Text key={index}>{Item['Plan']}：{Item['ChildPlan']}</Text>


                           )
            })
        }
        </ScrollView>
        </View>

    )
  }

}






const styles = StyleSheet.create({
   container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f4f6f6',
    //marginBottom: 100,
  },
    header: { 
    flexDirection: 'row',
    height: 40, 
    backgroundColor: '#12B7F5', 
    justifyContent: 'center', 
    width:w,
    marginBottom:w*0.06,
}, 
 
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
}, 
});

