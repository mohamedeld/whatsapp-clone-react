import { createContext, useContext, useState } from "react";

const OpenChat = createContext(undefined);

export default function OpenChatContext({children}){
  const [open,setOpen] = useState(false);  
  return (
    <OpenChat.Provider value={{open,setOpen}}>
      {children}
    </OpenChat.Provider>
  )
}

export function useOpen(){
  const context = useContext(OpenChat);
  if(context === undefined){
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}