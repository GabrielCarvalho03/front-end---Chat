import { useState } from "react";
import { useChatUser } from "../../states/chatUserState";

import Done from "../../assets/Done.svg";
import back from "../../assets/Back.svg";
import { socket } from "../../services/socket";

export const Profiler = () => {
  const loggedUser = JSON.parse(localStorage.getItem("logged") ?? "");
  const setUserProfile = useChatUser((state) => state.setUserProfile);
  const [infoUser, setInfoUser] = useState({
    name: loggedUser.name,
    email: loggedUser.email,
  });

  const editName =() => {
    socket.emit("editNameProfile", {
      actualNameUser: loggedUser.name, 
      name: infoUser.name,
    } , (data:any) =>{
      localStorage.setItem('logged', JSON.stringify(data))
      window.location.reload()
    });
  };

  const editEmail = async () => {
    socket.emit("editEmailProfile", {
      actualEmailUser: loggedUser.email, 
      email: infoUser.email,
    }, (data:any) =>{
      console.log(data)
      localStorage.setItem('logged', JSON.stringify(data))});

  };

  return (
    <>
      <div className="w-full h-20 pl-5 bg-gray-700 flex items-center">
        <img
          onClick={() => setUserProfile(false)}
          className=" cursor-pointer"
          src={back}
          width={25}
          alt=""
        />

        <h1 className="text-xl text-white font-semibold ">Perfil</h1>
      </div>
      <div className="w-full  flex flex-col items-center">
        <div className="mt-10">
          <img src={loggedUser.photo} className="w-28 h-28 rounded-full" />
        </div>
      </div>

      <form className="ml-2 ">
        <h1 className="mt-10 text-primary">seu nome</h1>
        <div className="w-full flex tems-center gap-3">
          <input
            value={infoUser?.name}
            onChange={(e) =>
              setInfoUser({
                ...infoUser,
                name: e.target.value,
              })
            }
            className="w-10/12 h-10 text-black px-4 bg-transparent outline-none border-b-0.5 border-gray-400 i"
            type="text"
            placeholder={loggedUser.name}
          />
            <img 
            onClick={()=>editName()}
            className="mt-6 cursor-pointer" src={Done} width={20} alt="" />
        </div>

        <h1 className="mt-10 text-primary">seu email</h1>
        <div className="w-full flex tems-center gap-3">
          <input
            value={infoUser?.email}
            onChange={(e) =>
              setInfoUser({
                ...infoUser,
                email: e.target.value,
              })
            }
            className="w-10/12 h-10 text-black px-4 bg-transparent outline-none border-b-0.5 border-gray-400 i"
            type="text"
            placeholder={loggedUser.email}
          />
          <img
            onClick={() => editEmail()}
            className="mt-6 cursor-pointer"
            src={Done}
            width={20}
            alt=""
          />
        </div>

        <h1 className="mt-10 text-primary">seu nome de usuário</h1>
        <input
          disabled={true}
          className="w-10/12 h-10 text-black px-4 bg-transparent outline-none border-b-0.5 border-gray-400 cursor-not-allowed "
          type="text"
          placeholder={`@${loggedUser.userName}`}
        />
        <h1 className=" text-gray-400">
          Pelo seu nome de usuário é que outras pessoas vão te achar!{" "}
        </h1>
      </form>
    </>
  );
};
