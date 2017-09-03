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
var circleColor=['#F19834','#AFB341','#D05B97','#52A24E','#E2728E','#7CBEFD','#BEB3F7','#95C550']
 
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
                        <View key={index} style={{flexDirection:'row',height:105}}>
                        <View style={{marginLeft:10}}>
                            <Text></Text>
                                <Text style={{textAlign:'right',fontSize:16}}>{LogItem['RecordTime'].substring(8,10)} </Text>
                                <Text style={{textAlign:'right',fontSize:13}}>{LogItem['RecordTime'].substring(0,7)}</Text>
                        </View>
                            <View>
                                <Image source={require('./imgs/ic_order_shu.png')} style={{height:33,marginLeft:25,flex:1}}/>
                               <View    style={{backgroundColor:circleColor[index % 8],justifyContent: 'center',alignItems: 'center',marginLeft:21,height:8,width:8, borderRadius:4}}>
                                                     <View    style={{backgroundColor:"white",height:4,width:4, borderColor: 'white', borderWidth:0,borderRadius:2}}>
                                                      </View>
                                </View>
                                <Image source={require('./imgs/ic_order_shu.png')} style={{height:33,marginLeft:25,flex:1}}/>
                            </View>
                                <View style={{height:15}}/>
                                        <View style={{backgroundColor:"white",height:75,marginLeft:5,width:(w-110),borderRadius:8}}>
                                            <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',width:(w-110)}}>
                                                <View style={{width:w-170}}><Text style={{marginLeft:5,lineHeight:25}}>{LogItem['Plan']}{LogItem['ChildPlan']?(":"+LogItem['ChildPlan']):""}</Text></View>
                                                <View style={{width:70,marginRight:5}}><Text  style={{lineHeight:25}}>{LogItem['CostTime']}分钟</Text></View>
                                            </View>
                                            <Text style={{marginLeft:5,color:"#A0A0A0",lineHeight:25}}>{LogItem['progress']}</Text>
                                        </View>
                                <View style={{height:15}}/>    
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

