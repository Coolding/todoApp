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
  TextInput,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
 

 var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高

export default class RecordPlanExeInfo extends Component {
  constructor(props) {  
    super(props); 
     this.state = {
       PlanExeInfo:'',
       PlanCostTime:0,

    }; 
  }  

 static navigationOptions = {
     header:null
  };

componentWillMount() {      
  }

//记录计划执行情况
  record=()=>{
    const { params } = this.props.navigation.state;  
    let url="http://todoapp.applinzi.com/lkjqkrjuouzlxcvjat/RecordPlanExeProgress/";
    let formData=new FormData();      
    formData.append("ChildID",params.ChildID); 
    formData.append("ID",params.ID); 
    formData.append("PlanCostTime",this.state.PlanCostTime); 
    formData.append("PlanExeInfo",this.state.PlanExeInfo);  

    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
          .then(data =>{ 

          })

  }


    render() {
    return (
         <View>
          <View style={styles.header}>  
                    <Text style={styles.headtitle}>记录计划执行情况</Text> 
              </View>  

              <View  style={{width:w*0.98,marginTop:10,height:40,flexDirection: 'row',alignItems:'flex-start',marginBottom:10}} >
                      <TextInput
                      style={{marginLeft:w*0.02,marginBottom:10,height:40,width:w*0.75, borderColor: 'gray', borderWidth:1,borderRadius:5}}
                      underlineColorAndroid="transparent"
                      placeholder="输入计划执行的情况"
                      selectTextOnFocus={true}
                      clearTextOnFocus={true}
                      onChangeText={(text) =>   this.setState({PlanExeInfo:text})  }
                        />
               </View>  
                <View  style={{width:w*0.98,marginTop:10,height:40,flexDirection: 'row',alignItems:'flex-start',marginBottom:10}} >
                      <TextInput
                      style={{marginLeft:w*0.02,marginBottom:10,height:40,width:w*0.75, borderColor: 'gray', borderWidth:1,borderRadius:5}}
                      underlineColorAndroid="transparent"
                      placeholder="输入今日所花费的时间（分钟）"
                      selectTextOnFocus={true}
                      clearTextOnFocus={true}
                      onChangeText={(text) =>   this.setState({PlanCostTime:text})  }
                        />
               </View>  
               <TouchableOpacity   
                    style={{alignSelf:'center',justifyContent: 'center',width:60,height:35,backgroundColor:"#12B7F5",marginTop:10,borderRadius:5}}            
                    onPress={()=>this.record()}>
                        <Text style={{color:'white',textAlign:'center'}}>提交</Text> 
              </TouchableOpacity>
     </View>  
          
    )}

}




const styles = StyleSheet.create({
 
  textViewStyle:{
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor:"white",
    marginLeft:w*0.01,
    marginRight:w*0.01,
    marginBottom:0,
    marginTop:2,
    height:80,
    borderWidth:0,
    borderRadius:5,
  },
  textStyle:{
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
    //padding:10,
    //borderWidth:1,
  	//borderRadius:5,
    //borderColor:"white"
},
    header: { 
    flexDirection: 'row',
    height: 40, 
    backgroundColor: '#12B7F5', 
    justifyContent: 'center', 
    width:w
}, 
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
},  
})