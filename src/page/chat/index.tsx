import ChatUser from "../../components/chatUser";
import InfoList from "../../components/infoList";

export default function Chat(){
    return(
            <div className="w-full h-screen flex bg-white overflow-hidden">
                <div className="w-4/12">
                <InfoList />
                </div>

                <div className="w-full  bg-gray-800">
                <ChatUser/>
                </div>
            </div>
    )
}