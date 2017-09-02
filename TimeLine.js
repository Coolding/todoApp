import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  ScrollView,
} from 'react-native';

 
var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height; 
 
export default class TimeLine extends Component {
  constructor(props) {
    super(props);    
    this.state={   
        ExeLog:[]      
      }
  } 
   

   componentWillMount() {
    let url="http://todoapp.applinzi.com/queorqljbvmaluzoqn/GETPlanExeLog/";
    let formData=new FormData();        
    formData.append("PlanID","");  
    formData.append("ChildPlanID","");      
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())
          .then(data =>{ 
            this.setState({ExeLog:data})
            })
    
  }
 


   render() {
    return (
    <View  style={styles.container}>  
            <View style={styles.header}>  
                  <Text style={styles.headtitle}>计划执行日志</Text> 
            </View>  
   <ScrollView>
   {
           this.state.ExeLog.map(
                (LogItem,index)=>{ 
                   return(
                        <View key={index} style={{flexDirection:'row',height:75}}>
                        <View style={{marginLeft:10}}>
                            <Text></Text>
                                <Text style={{textAlign:'right',fontSize:16}}>{LogItem['RecordTime'].substring(8,10)} </Text>
                                <Text style={{textAlign:'right',fontSize:13}}>{LogItem['RecordTime'].substring(0,7)}</Text>
                        </View>
                            <View>
                                <Image source={require('./imgs/ic_order_shu.png')} style={{height:20,marginLeft:25,flex:1}}/>
                                <Image source={require('./imgs/ic_order_status_tijiao.png')} style={{width:30,height:30,marginLeft:10}}/>
                                <Image source={require('./imgs/ic_order_shu.png')} style={{height:20,marginLeft:25,flex:1}}/>
                            </View>
                                <View style={{height:5}}/>
                                        <View style={{backgroundColor:"white",height:65,marginLeft:5,width:(w-110),borderRadius:5}}>
                                            <Text style={{marginLeft:5}}>{LogItem['ChildPlan']}</Text>
                                        </View>
                                <View style={{height:5}}/>    
                        </View>
                   )}
           )
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

