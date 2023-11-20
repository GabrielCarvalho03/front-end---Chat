import ChatUser from "../../components/chatUser";
import InfoList from "../../components/infoList";
import { useChatUser } from "../../states/chatUserState";
import { Profiler } from "../profile";

export default function Chat(){
    const userProfile = useChatUser(state => state.userProfile)
    return(
            <div className="w-full h-screen flex bg-white overflow-hidden">
                <div className="w-4/12">
                {userProfile  ?<Profiler/> :<InfoList />}
                </div>

                <div className="w-full  bg-gray-800">
                <ChatUser/>
                </div>
            </div>
    )
}