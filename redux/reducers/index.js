import { combineReducers } from 'redux';
import { SpeakersReducer,loginReducer,profileReducer, KeyStatisticsReducer, LatestMembersReducer, AttendeesReducer, ProductsReducer, SponsorsReducer, CompaniesReducer, ExhibitorsReducer, MyMeetingsReducer, UserDetailReducer, EventReducer,RefreshReducer} from './icreducers';

export default combineReducers({ 
            login:loginReducer,
            profile:profileReducer,
            keystatistics:KeyStatisticsReducer,
            LatestMembers:LatestMembersReducer,
            Attendees:AttendeesReducer,
            Products:ProductsReducer,
            Speakers:SpeakersReducer,
            Sponsors:SponsorsReducer,
            Companies:CompaniesReducer,
            Exhibitors:ExhibitorsReducer,
            MyMeetings:MyMeetingsReducer,
            UserDetail:UserDetailReducer,
            Event:EventReducer,
            refreshRequired:RefreshReducer,
});
