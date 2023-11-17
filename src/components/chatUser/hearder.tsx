import { useChatUser } from "../../states/chatUserState"


export default function Header(){
    const UserSelected = useChatUser(state => state.userInfo)

    return(
          UserSelected.map(item => {
            return(
                <div className="w-full h-16 border-b-0.5 gap-3    bg-gray-800 border-b-gray-500 flex justify-center items-center">
                <img 
                    src={item.photo} 
                    className="w-10 h-10 rounded-full"
                    />
                   <h1 className="text-white">{item.name}</h1>
            </div>
            )
          })
    )
}