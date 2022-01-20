import {GET_COMMONICLIST, GET_NEWSDETAILS, GET_DEALSDETAILS, GET_REPORTSDETAILS} from '../action/types'
import { AsyncStorage } from 'react-native';

const CommonListInitialState = {
    newsList: [],
    dealsList: [],
    reportsList: []

};
const DetailInitialState = {
    newsDetail: null,
    dealsDetail: null,
    reportsDetail: null
};

const loginInitialState = {

    IsValidUser:false,
    common:{
        IsValidUser:false,
        user:{
            avatar:'',
            displayname:''
        },
        UserDetails:[
            {
                DisplayName:''
            }
        ]
    }
}

const profileInitialState = {
    isLoading:true
     
}

export const loginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        case 'GET_LOGIN':
            return {
                isLoading:false,
                common: action.payload ,
                cookie: action.payload.cookie
            };
        
        case 'GET_LOGOUT': 
                return loginInitialState
        default:
            return state;
    }
}



export const UserDetailReducer = (state = profileInitialState, action) => {
    switch (action.type) {
        case 'GET_UserDetail':
            return {
                isLoading:false,
                common: action.payload 
            }; 
        default:
            return state;
    }
}

export const profileReducer = (state = profileInitialState, action) => {
    switch (action.type) {
        case 'GET_PROFILE':
            return {
                ...state,
                common: action.payload 
            };
         
        default:
            return state;
    }
}
export const KeyStatisticsReducer = (state = profileInitialState, action) => {
    switch (action.type) {
        case 'GET_Statistics':
            console.log('get stats ')
            console.log(action.payload)
            if(action.payload.statistics){
                return {
                    isLoading:false,
                    common: action.payload 
                };
            }else{
                return {
                    isLoading:true,
                    common: action.payload 
                };
            }
         
        default:
            return state;
    }
}
export const LatestMembersReducer = (state = profileInitialState, action) => {
    switch (action.type) {
        case 'GET_LatestMembers':
            if(action.payload.latestmembers){
                return {
                    isLoading:false,
                    common: action.payload 
                };
            }else{
                return {
                    isLoading:true,
                    common: action.payload 
                };
            }
         
        default:
            return state;
    }
}
export const AttendeesReducer = (state = profileInitialState, action) => {
    switch (action.type) {
        case 'GET_Attendees':
            if(action.payload.attendees == null || action.payload.attendees){
                return {
                    isLoading:false,
                    common: action.payload 
                };
            }else{
                return {
                    isLoading:true,
                    common: action.payload 
                };
            }
         
        default:
            return state;
    }
}

export const SpeakersReducer = (state = profileInitialState, action) => {
    switch (action.type) {
        case 'GET_Speakers':
            if(action.payload.speakers_list == null || action.payload.speakers_list){
                return {
                    isLoading:false,
                    common: action.payload 
                };
            }else{
                return {
                    isLoading:true,
                    common: action.payload 
                };
            }
        default:
            return {
                isLoading:true
            };
    }
}


export const CompaniesReducer = (state = profileInitialState, action) => {
    switch (action.type) {
        case 'GET_Companies':
            return {
                 isLoading:false,
                common: action.payload 
            };
         
        default:
            return state;
    }
}

export const ExhibitorsReducer = (state = profileInitialState, action) => {
    switch (action.type) {
        case 'GET_Exhibitors':
            if(action.payload.exhibitor){
                return {
                    isLoading:false,
                    common: action.payload 
                };
            }else{
                return {
                    isLoading:true,
                    common: action.payload 
                };
            }
            
         
        default:
            return state;
    }
}



export const SponsorsReducer = (state = profileInitialState, action) => {
 
    switch (action.type) {
        case 'GET_Sponsors':
            if(action.payload.status == 'ok'){
                return {
                    isLoading:false,
                    common: action.payload 
                };
            }else{
                return {
                    isLoading:true,
                    common: action.payload 
                };
            }
         
        default:
            return state;
    }
}




export const ProductsReducer = (state = profileInitialState, action) => {
    switch (action.type) {
        case 'GET_Products':
            if(action.payload.products == null || action.payload.products){
                return {
                    isLoading:false,
                    common: action.payload 
                };
            }else{
                return {
                    isLoading:true,
                    common: action.payload 
                };
            }
            
         
        default:
            return state;
    }
}

export const MyMeetingsReducer = (state = profileInitialState, action) => {
    switch (action.type) {
        case 'GET_MyMeetings':
            return {
                isLoading:false,
                common: action.payload 
            };
         
        default:
            return state;
    }
}

export const EventReducer = (state = { isLoading:true}, action) => {
    switch (action.type) {
        case 'GET_Event':
            if(action.payload.event){
                return {
                    isLoading:false,
                    common: action.payload 
                };
            }else{
                return {
                    isLoading:true,
                    common: action.payload 
                };
            }
         
        default:
            return state;
    }
}



export const RefreshReducer = (state = false, action) => {
    switch (action.type) {
        case 'GET_Refresh':
            return action.payload; 
        default:
            return state;
    }
}
