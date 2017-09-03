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
  ScrollView,
  Picker,
  DatePickerAndroid,
} from 'react-native';
 
//本文件作用：添加一个子计划
 var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高

export default class AddChildPlan extends Component {
  constructor(props) {  
    super(props); 
     this.state = {
       ParentPlanID:'',
       ChildPlan:0,
       ChildPlanTypeSelected:'远期计划',  //计划类型
       expectCompleteTime:new Date(),

    }; 
  }  

 static navigationOptions = {
     header:null
  };

componentWillMount() {    
    const { params } = this.props.navigation.state;    
    this.setState({ParentPlanID:params.PlanID})
    this.setState({expectCompleteTime:this.state.expectCompleteTime.getFullYear()+'-'+(this.state.expectCompleteTime.getMonth()+1)+'-'+this.state.expectCompleteTime.getDate()})
     
  }

//添加一个子计划
AddOneChildPlan=()=>
{

    let url="http://todoapp.applinzi.com/wuorquiljvuoql/AddaChildPlan/";
    let formData=new FormData();      
    formData.append("ChildPlan",this.state.ChildPlan); 
    formData.append("ChildPlanTypeSelected",this.state.ChildPlanTypeSelected); 
    formData.append("expectCompleteTime",this.state.expectCompleteTime);
     formData.append("PlanID",this.state.ParentPlanID);
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
          .then(data =>{ 
             alert('添加成功')
          })
   
}

    render() {
    return (
         <View>
          <View style={styles.header}>  
                    <Text style={styles.leftitle}>    </Text>
                    <Text style={styles.headtitle}>添加子计划</Text> 
                    <TouchableOpacity   
                    style={{alignSelf:'center',}}            
                    onPress={()=>this.props.navigation.goBack()}>
                          <Text style={styles.leftitle}>返回  </Text> 
                    </TouchableOpacity>
              </View>  
              

               
              <Picker
                //Picker样式 dialog弹窗样式默认  dropdown显示在下边
                //mode = {'dialog'}
                //显示选择内容
                selectedValue={this.state.ChildPlanTypeSelected}
                //选择内容时调用此方法
                onValueChange={(value)=>this.setState({ChildPlanTypeSelected: value})}
                //设置Title 当设置为dialog时有用
                prompt={'请选择计划类别'} >
                <Picker.Item label='远期计划' value='远期计划'/>
                <Picker.Item label='年度计划' value='年度计划'/>
                <Picker.Item label='月度计划' value='月度计划'/>
                <Picker.Item label='近期计划' value='近期计划'/>
                <Picker.Item label='每日计划' value='每日计划'/>
            </Picker>
              <View sytle={{width:180}}>
                <Button title={'预计完成时间：'+this.state.expectCompleteTime} onPress={()=>{
                    DatePickerAndroid.open(
                    ).then(({action,  year, month, day})=>{
                        if(action !== DatePickerAndroid.dismissedAction){
                           this.setState({expectCompleteTime:year+'-'+(month+1)+'-'+day});
                        }
                    })
                }}/>
            </View>
              
                <View  style={{width:w*0.98,marginTop:10,height:40,flexDirection: 'row',alignItems:'flex-start',marginBottom:10}} >
                      <TextInput
                      style={{marginLeft:w*0.02,marginBottom:10,height:40,width:w*0.75, borderColor: 'gray', borderWidth:1,borderRadius:5}}
                      underlineColorAndroid="transparent"
                      placeholder="输入计划内容"
                      selectTextOnFocus={true}
                      clearTextOnFocus={true}
                      onChangeText={(text) =>   this.setState({ChildPlan:text})  }
                        />
               </View>  


               <TouchableOpacity   
                    style={{alignSelf:'center',justifyContent: 'center',width:60,height:35,backgroundColor:"#12B7F5",marginTop:10,borderRadius:5}}            
                    onPress={()=>this.AddOneChildPlan()}>
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
    justifyContent: 'space-between', 
    width:w
}, 
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
},  
leftitle: { 
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#ffffff', 
}
})