import { create } from "zustand";
type UserInfoItem = {
    name: string , 
    photo: string, 
}

export type allMessagesProps ={
    text: string
 to?:{
    email?:string,
   photo?: string,
   socketId: string
 }
 }


type useChatUserType =  {
    userInfo : UserInfoItem[];
    setUserInfo : (item: UserInfoItem) => void,
    idChatRom:string, 
    setIdChatRom : (item:string) => void, 
    allMessages : allMessagesProps[], 
    setAllMessages : (item : allMessagesProps[]) => void, 
    userProfile: boolean, 
    setUserProfile : (item: boolean) => void
}

const useChatUser = create<useChatUserType>((set) =>{
    return{
        userInfo: [],
        setUserInfo:(item) => set(() => ({userInfo: [ item]})), 
        idChatRom:"", 
        setIdChatRom : (item) => set(() => ({idChatRom: item})), 
        allMessages : [], 
        setAllMessages : (item : allMessagesProps[]) => set(() => ({allMessages: [...item]})), 
        userProfile: false, 
        setUserProfile : (item: boolean) => set(()=> ({userProfile: item}))
    }
})


export {useChatUser}