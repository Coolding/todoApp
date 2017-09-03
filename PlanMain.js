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


//本文件作用：计划管理主界面，可以通过点击按钮，切换显示远期
//计划，年度计划，月度计划

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高

PlanItem=[],
SwitchDisabled={'远期计划':true,'年度计划':true,'月度计划':true}

export default class PlanMain extends Component {

  constructor(props) {  
    super(props); 
     this.state = {    
         PlanType:'计划浏览',
         
    }; 
  }  
 
 static navigationOptions = {
     header:null
  };

  componentWillMount() {  
      this.switchPlanType('月度计划')  
   }

//切换显示的任务类型
switchPlanType=(PlanType)=>{
      let url="http://todoapp.applinzi.com/kdkibmyluifvjk/getPlans/";
      let formData=new FormData();        
      formData.append("PlanType",PlanType);  
      fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())
        .then(data =>{          
              PlanItem=data;
              this.setState({PlanType:PlanType})
              for (var sw in SwitchDisabled)
              {
                   if(sw==PlanType)
                        SwitchDisabled[sw]=true
                   else
                        SwitchDisabled[sw]=false

              }
             
              this.forceUpdate();
       })      

}

 gotoShowPlanInfos=(ParentPlanID)=>{
   const { params } = this.props.navigation.state;
   if(this.state.PlanType=='远期计划') 
            this.props.navigation.navigate('ShowPlanInfo',{ParentPlanID:ParentPlanID})
   else if(this.state.PlanType=='年度计划') 
            this.props.navigation.navigate('ShowPlanInfo',{ParentPlanID:ParentPlanID})
   else if(this.state.PlanType=='月度计划') 
            this.props.navigation.navigate('ShowPlanInfo',{ParentPlanID:ParentPlanID})


 }



   render() {
    return (
        <View  style={styles.container}>  
            <View style={styles.header}>  
                   <Text style={styles.leftitle}>    </Text>
                  <Text style={styles.headtitle}>{this.state.PlanType}</Text> 
                  <TouchableOpacity   
                    style={{alignSelf:'center',}}            
                    onPress={()=>this.props.navigation.navigate('AddPlan')}>
                          <Text style={styles.leftitle}>添加  </Text> 
                    </TouchableOpacity>
            </View>  

        <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginBottom:10}}>   
                <TouchableOpacity 
                    style={{backgroundColor:'white',justifyContent: 'center',alignItems:'center',marginLeft:1,width:w/3-1,height:30,borderRadius:5,}}
                    onPress={()=>this.switchPlanType('远期计划')}
                    disabled={SwitchDisabled['远期计划']}>
                    <Text style={{color:'black',fontSize:20}}>远期计划</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{backgroundColor:'white',justifyContent: 'center',alignItems:'center',marginLeft:1,width:w/3-1,height:30,borderRadius:5,}}
                    onPress={()=>this.switchPlanType('年度计划')}
                    disabled={SwitchDisabled['年度计划']}>
                    <Text style={{color:'black',fontSize:20}}>年度计划</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{backgroundColor:'white',justifyContent: 'center',alignItems:'center',marginLeft:1,width:w/3-1,height:30,borderRadius:5,}}
                    onPress={()=>this.switchPlanType('月度计划')}
                    disabled={SwitchDisabled['月度计划']}>
                    <Text style={{color:'black',fontSize:20}}>月度计划</Text>
                </TouchableOpacity>
        </View>
         <ScrollView style={{width:w}}>
             {
                PlanItem.map(
                      (Item,index)=>{ 
                          return(
                                <View key={index} style={{backgroundColor:'white',flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center',  width:0.88*w,height:60,marginLeft:0.06*w,marginBottom:0.06*w,borderTopRightRadius:5,borderBottomRightRadius:5,}}>
                                    <View style={{backgroundColor:'#BEB3F7',borderTopLeftRadius:5,borderBottomLeftRadius:5,width:10,height:60}}></View>
                                    <TouchableOpacity 
                                        style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems:'center',width:0.85*w,height:60}}
                                         onPress={()=>this.gotoShowPlanInfos(Item['ID'])}>
                                        <Text style={{width:0.68*w,marginLeft:5}}>{Item['category']}：{Item['Plan']}</Text>

                                    </TouchableOpacity>
                                    
                                </View>  
                          )
                      }
                )
            }
            </ScrollView>
        </View>

    )}
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
    justifyContent: 'space-between', 
    width:w,
    marginBottom:2,
}, 
 
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
}, leftitle: { 
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#ffffff', 
}, 
});

